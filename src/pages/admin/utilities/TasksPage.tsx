import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Modal, Form, Input, InputNumber, DatePicker, Select,
    Card, Row, Col, Statistic, Typography, Progress,
    Avatar, Tooltip, Checkbox, Badge, Divider
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    UserOutlined,
    TeamOutlined,
    ProjectOutlined,
    ThunderboltOutlined,
    CalendarOutlined,
    SearchOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { 
    getAppointmentByTeacherAPI,
    getTaskPrioritiesAPI,
    getAppointmentCategoriesAPI,
    addAppointmentAPI,
    updateAppointmentAPI,
    deleteAppointmentAPI 
} from '../../../services/admin/tasks.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [priorities, setPriorities] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            // Loading tasks for a default teacher (ID: 1) or all if supported
            const teacherID = 1; 
            const [taskRes, priRes, catRes] = await Promise.all([
                getAppointmentByTeacherAPI(teacherID),
                getTaskPrioritiesAPI(),
                getAppointmentCategoriesAPI()
            ]);
            setTasks(Array.isArray(taskRes.data) ? taskRes.data : []);
            setPriorities(Array.isArray(priRes.data) ? priRes.data : []);
            setCategories(Array.isArray(catRes.data) ? catRes.data : []);
        } catch {
            message.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSave = async (values: any) => {
        setLoading(true);
        try {
            const payload = {
                ...values,
                startDate: values.dateRange?.[0]?.toISOString(),
                endDate: values.dateRange?.[1]?.toISOString(),
                isDone: values.percentComplete === 100,
            };
            if (editingId) await updateAppointmentAPI({ ...payload, appointmentID: editingId });
            else await addAppointmentAPI(payload);
            message.success('Task saved successfully');
            setIsModalOpen(false);
            fetchData();
        } catch {
            message.error('Failed to save task');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { 
            title: 'Task & Progress', 
            key: 'task',
            width: 350,
            render: (_: any, r: any) => (
                <Space direction="vertical" size={4} style={{ width: '100%' }}>
                    <Space>
                        <Text strong style={{ fontSize: 14 }}>{r.subject}</Text>
                        {r.isDone && <CheckCircleOutlined style={{ color: '#10b981' }} />}
                    </Space>
                    <Progress 
                        percent={r.percentComplete} 
                        size="small" 
                        strokeColor={r.percentComplete === 100 ? '#10b981' : 'var(--primary-color)'}
                    />
                    <Text type="secondary" style={{ fontSize: 11 }}>{r.description}</Text>
                </Space>
            )
        },
        { 
            title: 'Assigned To', 
            dataIndex: 'listAssigned', 
            key: 'assigned',
            render: (list: any[]) => (
                <Avatar.Group maxCount={3} size="small">
                    {list?.map((a, i) => (
                        <Tooltip title={a.teacherName} key={i}>
                            <Avatar icon={<UserOutlined />} style={{ backgroundColor: a.isDone ? '#10b981' : '#6366f1' }} />
                        </Tooltip>
                    ))}
                    {!list?.length && <Avatar icon={<UserOutlined />} />}
                </Avatar.Group>
            )
        },
        { 
            title: 'Priority', 
            dataIndex: 'taskPriorityID', 
            key: 'priority',
            render: (v: number) => {
                const p = priorities.find(p => p.id === v);
                return <Tag color={v === 1 ? 'red' : v === 2 ? 'orange' : 'blue'}>{p?.name || 'Normal'}</Tag>;
            }
        },
        { 
            title: 'Deadline', 
            dataIndex: 'endDate', 
            key: 'deadline',
            render: (v: string) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 12 }}><CalendarOutlined /> {dayjs(v).format('DD/MM/YYYY')}</Text>
                    {dayjs(v).isBefore(dayjs()) && !tasks.find(t => t.endDate === v)?.isDone && 
                        <Text type="danger" style={{ fontSize: 10 }}>Overdue</Text>
                    }
                </Space>
            )
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} onClick={() => {
                        setEditingId(record.appointmentID);
                        form.setFieldsValue({
                            ...record,
                            dateRange: [dayjs(record.startDate), dayjs(record.endDate)]
                        });
                        setIsModalOpen(true);
                    }} />
                    <Popconfirm title="Delete task?" onConfirm={() => deleteAppointmentAPI(record.appointmentID).then(fetchData)}>
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div className="fade-in">
            <div style={{ 
                marginBottom: 24, padding: '24px', background: 'var(--primary-gradient)', 
                borderRadius: 'var(--radius-lg)', color: '#fff', boxShadow: 'var(--shadow-lg)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div>
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Tasks & Operations</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Orchestrate institutional workflows, teacher appointments, and project deadlines</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} onClick={() => { setEditingId(null); form.resetFields(); setIsModalOpen(true); }} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Create Task
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="In Progress" value={tasks.filter(t => !t.isDone).length} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Completed" value={tasks.filter(t => t.isDone).length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Overdue" value={tasks.filter(t => dayjs(t.endDate).isBefore(dayjs()) && !t.isDone).length} prefix={<ExclamationCircleOutlined />} valueStyle={{ color: '#ef4444' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Efficiency" value={87} suffix="%" prefix={<ThunderboltOutlined />} valueStyle={{ color: '#fbbf24' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                    <Space>
                        <Select defaultValue="all" style={{ width: 150 }}>
                            <Option value="all">All Status</Option>
                            <Option value="pending">In Progress</Option>
                            <Option value="done">Completed</Option>
                        </Select>
                        <Select placeholder="Category" style={{ width: 150 }} allowClear>
                            {categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                        </Select>
                    </Space>
                    <Input placeholder="Search tasks..." prefix={<SearchOutlined />} style={{ width: 300 }} />
                </div>
                <Table 
                    columns={columns} 
                    dataSource={tasks} 
                    rowKey="appointmentID" 
                    loading={loading} 
                    className="premium-table"
                />
            </Card>

            <Modal 
                title={editingId ? 'Edit Task Details' : 'Design New Task'} 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                width={700}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ percentComplete: 0 }}>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="subject" label="Task Subject" rules={[{ required: true }]}>
                                <Input placeholder="e.g. Prepare Monthly Examination Papers" prefix={<ProjectOutlined />} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="dateRange" label="Execution Period" rules={[{ required: true }]}>
                                <DatePicker.RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="appointmentCategoryID" label="Category">
                                <Select placeholder="Select category">
                                    {categories.map(c => <Option key={c.id} value={c.id}>{c.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="taskPriorityID" label="Priority">
                                <Select placeholder="Select priority">
                                    {priorities.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="percentComplete" label="Completion Progress (%)">
                                <InputNumber min={0} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="description" label="Detailed Instructions">
                        <Input.TextArea rows={4} placeholder="Describe the task goals and requirements..." />
                    </Form.Item>
                    <Form.Item name="allDay" valuePropName="checked">
                        <Checkbox>This is an all-day event</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TasksPage;

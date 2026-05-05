import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Card, Row, Col, Statistic, Typography, Tabs, 
    Tooltip, Modal, Form, Input, Select, Avatar, List, InputNumber
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined,
    CommentOutlined,
    TeamOutlined,
    UserOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    FilterOutlined,
    MessageOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { 
    getFeedbackInfoAPI, 
    feedbackToStudentsAPI,
    feedbackToClassAPI,
    updateFeedbackStatusAPI,
    deleteGeneralFeedbackAPI 
} from '../../../services/admin/feedbacks.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const FeedbacksPage: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res: any = await getFeedbackInfoAPI();
            const list = Array.isArray(res) ? res : (res.data || []);
            setFeedbacks(list);
        } catch {
            message.error('Failed to load feedbacks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleCreate = async (values: any) => {
        setLoading(true);
        try {
            if (values.targetType === 'student') {
                await feedbackToStudentsAPI({ ...values, toUserIDs: values.targetID });
            } else {
                await feedbackToClassAPI({ ...values, classID: values.targetID });
            }
            message.success('Feedback submitted successfully');
            setIsModalOpen(false);
            form.resetFields();
            fetchData();
        } catch {
            message.error('Failed to submit feedback');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { 
            title: 'Feedback', 
            key: 'content',
            width: 450,
            render: (_: any, r: any) => (
                <Space align="start" size={12}>
                    <Avatar icon={<MessageOutlined />} style={{ backgroundColor: 'var(--primary-color)' }} />
                    <Space direction="vertical" size={0}>
                        <div style={{ marginBottom: 4 }}>
                            <Tag color="purple">{r.category || 'General'}</Tag>
                            <Tag color="cyan">{r.fbType}</Tag>
                        </div>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 4, maxWidth: 350 }}>
                            {r.fBcontent}
                        </Paragraph>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                            {dayjs(r.crtdDate).format('DD/MM/YYYY HH:mm')}
                        </Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Target', 
            key: 'target',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{r.className || 'Individual'}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>ID: {r.classID || r.toUserIDs}</Text>
                </Space>
            )
        },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: (v: string) => (
                <Tag color={v === 'Resolved' ? 'green' : 'orange'} icon={v === 'Resolved' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}>
                    {v || 'Under Review'}
                </Tag>
            )
        },
        {
            title: 'Actions', key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="Update Status">
                        <Button type="text" icon={<EditOutlined />} />
                    </Tooltip>
                    <Popconfirm title="Delete this feedback?" onConfirm={() => {}}>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Quality Control & Feedbacks</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Monitor academic satisfaction, student concerns, and resolution status</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ borderRadius: 10, fontWeight: 600 }}>
                    New Feedback
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Feedbacks" value={feedbacks.length} prefix={<CommentOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Pending Review" value={feedbacks.filter(f => !f.status || f.status === 'Pending').length} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#f59e0b' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Resolved" value={feedbacks.filter(f => f.status === 'Resolved').length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Quality Score" value={94} suffix="%" prefix={<SafetyCertificateOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Tabs defaultActiveKey="all" className="premium-tabs">
                    <TabPane tab={<span><CommentOutlined /> All Activity</span>} key="all">
                        <Table 
                            columns={columns} 
                            dataSource={feedbacks} 
                            rowKey={(r, i) => i} 
                            loading={loading} 
                            className="premium-table"
                            scroll={{ x: 1000 }}
                        />
                    </TabPane>
                    <TabPane tab={<span><UserOutlined /> Student Specific</span>} key="students">
                        <Table 
                            columns={columns} 
                            dataSource={feedbacks.filter(f => f.toUserIDs)} 
                            rowKey={(r, i) => i} 
                            className="premium-table"
                        />
                    </TabPane>
                    <TabPane tab={<span><TeamOutlined /> Class Wide</span>} key="classes">
                        <Table 
                            columns={columns} 
                            dataSource={feedbacks.filter(f => f.classID)} 
                            rowKey={(r, i) => i} 
                            className="premium-table"
                        />
                    </TabPane>
                </Tabs>
            </Card>

            <Modal 
                title="Submit New Feedback" 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalOpen(false)}>Cancel</Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>Submit Feedback</Button>,
                ]}
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="targetType" label="Target Type" rules={[{ required: true }]}>
                                <Select placeholder="Select type">
                                    <Select.Option value="student">Student</Select.Option>
                                    <Select.Option value="class">Class</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="targetID" label="Target ID" rules={[{ required: true }]}>
                                <InputNumber style={{ width: '100%' }} placeholder="e.g. 101" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="fbType" label="Feedback Type" rules={[{ required: true }]}>
                                <Select placeholder="Select category">
                                    <Select.Option value="Academic">Academic</Select.Option>
                                    <Select.Option value="Discipline">Discipline</Select.Option>
                                    <Select.Option value="Facility">Facility</Select.Option>
                                    <Select.Option value="General">General</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="category" label="Category">
                                <Input placeholder="e.g. Attendance" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="fBcontent" label="Feedback Content" rules={[{ required: true }]}>
                        <TextArea rows={4} placeholder="Type the detailed feedback here..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default FeedbacksPage;

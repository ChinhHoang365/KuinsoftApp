import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Modal, Form, Input, Select, Card, Row, Col, 
    Statistic, Typography, Avatar, Tooltip, Badge 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    GlobalOutlined,
    FilterOutlined,
    SearchOutlined,
    CalendarOutlined,
    BookOutlined
} from '@ant-design/icons';
import { 
    getClassesByLocationAPI,
    getClassStatusAPI,
    getProgrammesAPI,
    getRoomsAPI
} from '../../../services/admin/classes.api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const ClassesPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [programmes, setProgrammes] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<any[]>([]);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const locationID = Number(localStorage.getItem('locationId')) || 1;
            const [classRes, progRes, statRes] = await Promise.all([
                getClassesByLocationAPI(locationID),
                getProgrammesAPI(),
                getClassStatusAPI()
            ]);
            setData(Array.isArray(classRes.data) ? classRes.data : []);
            setProgrammes(Array.isArray(progRes.data) ? progRes.data : []);
            setStatuses(Array.isArray(statRes.data) ? statRes.data : []);
        } catch {
            message.error('Failed to load class ecosystem');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { 
            title: 'Class Details', 
            key: 'class',
            width: 250,
            render: (_: any, r: any) => (
                <Space size={12}>
                    <Avatar shape="square" icon={<BookOutlined />} style={{ backgroundColor: 'var(--primary-color)' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 14 }}>{r.className}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{r.classCode}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Programme / Level', 
            key: 'academic',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}>{r.programmeName}</Text>
                    <Tag color="cyan" style={{ fontSize: 10 }}>{r.levelName}</Tag>
                </Space>
            )
        },
        { 
            title: 'Schedule', 
            key: 'schedule',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}><CalendarOutlined /> {r.weekDay}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}><ClockCircleOutlined /> {r.classTime}</Text>
                </Space>
            )
        },
        { 
            title: 'Instructor / Room', 
            key: 'logistics',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}><TeamOutlined /> {r.teacher || 'Unassigned'}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}><GlobalOutlined /> {r.room || 'TBD'}</Text>
                </Space>
            )
        },
        {
            title: 'Status', 
            dataIndex: 'classStatus', 
            key: 'status',
            render: (v: string) => (
                <Badge 
                    status={v === 'Active' ? 'success' : v === 'Completed' ? 'default' : 'warning'} 
                    text={<Tag color={v === 'Active' ? 'green' : v === 'Completed' ? 'blue' : 'orange'}>{v || 'N/A'}</Tag>} 
                />
            )
        },
        {
            title: 'Actions', 
            key: 'action',
            width: 120,
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="Edit Class">
                        <Button type="text" icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="Manage Attendance">
                        <Button type="text" icon={<CheckCircleOutlined />} style={{ color: '#10b981' }} />
                    </Tooltip>
                    <Popconfirm title="Archive this class?">
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Class Ecosystem</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Centralized management for academic cohorts, session logs, and instructor allocation</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Create Class
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Classes" value={data.filter(i => i.classStatus === 'Active').length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Sessions Today" value={14} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Students" value={842} prefix={<TeamOutlined />} valueStyle={{ color: 'var(--primary-color)' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Available Rooms" value={5} prefix={<GlobalOutlined />} valueStyle={{ color: '#f59e0b' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: 24, borderRadius: 16 }} className="glass-effect">
                <Form layout="inline" onFinish={fetchData}>
                    <Form.Item name="programmeID">
                        <Select placeholder="Filter by Programme" style={{ width: 200 }} allowClear>
                            {programmes.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="statusID">
                        <Select placeholder="Filter by Status" style={{ width: 150 }} allowClear>
                            {statuses.map(s => <Option key={s.id} value={s.id}>{s.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="search">
                        <Input placeholder="Search code/name..." prefix={<SearchOutlined />} style={{ width: 250 }} />
                    </Form.Item>
                    <Button type="primary" icon={<FilterOutlined />} htmlType="submit">Filter</Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => fetchData()}>Reset</Button>
                </Form>
            </Card>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="classID" 
                    loading={loading} 
                    className="premium-table"
                    pagination={{ pageSize: 8 }}
                />
            </Card>
        </div>
    );
};

export default ClassesPage;

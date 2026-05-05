import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Card, Form, Input, Row, Col, Typography, 
    Avatar, Tooltip, Badge, Statistic, Select 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    SearchOutlined, 
    UserOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExperimentOutlined,
    PhoneOutlined,
    MailOutlined,
    FilterOutlined
} from '@ant-design/icons';
import { 
    searchStudentsAPI, 
    getStudentsByCenterAPI,
    getStudentSourcesAPI,
    getPayStatusAPI 
} from '../../../services/admin/students.api';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Option } = Select;

const StudentsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [sources, setSources] = useState<any[]>([]);
    const [payStatuses, setPayStatuses] = useState<any[]>([]);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const fetchData = async (values: any = {}) => {
        setLoading(true);
        try {
            let res: any;
            if (Object.keys(values).length === 0) {
                const locationId = localStorage.getItem('locationId') || '1';
                res = await getStudentsByCenterAPI(locationId);
            } else {
                res = await searchStudentsAPI(values);
            }
            const list = Array.isArray(res) ? res : (res.data || []);
            setData(list);
        } catch (error) { 
            message.error('Failed to load students'); 
        } finally { 
            setLoading(false); 
        }
    };

    const fetchMasterData = async () => {
        try {
            const [srcRes, payRes] = await Promise.all([
                getStudentSourcesAPI(),
                getPayStatusAPI()
            ]);
            setSources(Array.isArray(srcRes.data) ? srcRes.data : []);
            setPayStatuses(Array.isArray(payRes.data) ? payRes.data : []);
        } catch {}
    };

    useEffect(() => { 
        fetchData();
        fetchMasterData();
    }, []);

    const columns = [
        { 
            title: 'Student', 
            key: 'student',
            width: 250,
            render: (_: any, r: any) => (
                <Space size={12}>
                    <Avatar 
                        src={r.avatar} 
                        icon={<UserOutlined />} 
                        style={{ backgroundColor: 'var(--primary-color)' }} 
                    />
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 14 }}>{r.fullName}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{r.studentCode}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Contact', 
            key: 'contact',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}><PhoneOutlined style={{ fontSize: 11 }} /> {r.mobilePhone}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}><MailOutlined style={{ fontSize: 11 }} /> {r.email}</Text>
                </Space>
            )
        },
        { 
            title: 'Center / Source', 
            key: 'origin',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}>{r.location}</Text>
                    <Tag color="cyan" style={{ fontSize: 10 }}>{r.source || 'Direct'}</Tag>
                </Space>
            )
        },
        {
            title: 'Status', 
            key: 'status',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={4}>
                    <Tag color={r.isActive ? 'green' : 'red'}>{r.isActive ? 'Active' : 'Inactive'}</Tag>
                    <Tag color="blue" style={{ fontSize: 10 }}>{r.payStatus || 'Unpaid'}</Tag>
                </Space>
            )
        },
        {
            title: 'Actions', 
            key: 'action',
            width: 120,
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="View Profile 360">
                        <Button 
                            type="primary" 
                            shape="circle"
                            icon={<UserOutlined />} 
                            onClick={() => navigate(`/admin/student-profiles?id=${record.stu_userID || record.studentID}`)}
                        />
                    </Tooltip>
                    <Button type="text" icon={<EditOutlined />} />
                    <Popconfirm title="Archive student?">
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Students Ecosystem</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Centralized hub for student lifecycle, enrollment, and academic monitoring</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Add Student
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Students" value={data.filter(i => i.isActive).length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Waiting List" value={0} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#f59e0b' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Trial Period" value={0} prefix={<ExperimentOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="New This Month" value={12} prefix={<PlusOutlined />} valueStyle={{ color: 'var(--primary-color)' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ marginBottom: 24, borderRadius: 16 }} className="glass-effect">
                <Form form={form} onFinish={fetchData} layout="vertical">
                    <Row gutter={24}>
                        <Col xs={24} sm={8} md={6}>
                            <Form.Item name="studentName" label={<Text strong>Search</Text>}>
                                <Input placeholder="Name, Code or Phone..." prefix={<SearchOutlined />} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={6}>
                            <Form.Item name="sourceID" label={<Text strong>Source</Text>}>
                                <Select placeholder="Filter by source" allowClear>
                                    {sources.map(s => <Option key={s.id} value={s.id}>{s.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={8} md={6}>
                            <Form.Item name="payStatusID" label={<Text strong>Payment Status</Text>}>
                                <Select placeholder="Filter by payment" allowClear>
                                    {payStatuses.map(p => <Option key={p.id} value={p.id}>{p.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 24 }}>
                            <Space style={{ width: '100%' }}>
                                <Button block onClick={() => { form.resetFields(); fetchData(); }}>Reset</Button>
                                <Button block type="primary" htmlType="submit" icon={<FilterOutlined />}>Filter</Button>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="studentID" 
                    loading={loading} 
                    className="premium-table"
                    pagination={{ pageSize: 8 }}
                />
            </Card>
        </div>
    );
};

export default StudentsPage;

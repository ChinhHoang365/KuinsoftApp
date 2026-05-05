import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Input, Card, Row, Col, 
    Statistic, Popconfirm, Space, Typography, Avatar, Tabs, 
    Tooltip, Divider, Drawer, Descriptions
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    UserOutlined,
    DollarCircleOutlined,
    CalendarOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    ExportOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { 
    getTeachersListAPI, 
    getTeacherSalaryAPI,
    getTeacherSalaryDetailsAPI
} from '../../../services/admin/hr.api';
import dayjs from 'dayjs';

const { Search } = Input;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

const TeachersPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [salaryData, setSalaryData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res: any = await getTeachersListAPI();
            const list = res?.teacherAssistant || res?.data || res || [];
            setData(Array.isArray(list) ? list : []);
        } catch {
            message.error('Failed to load teachers');
        } finally {
            setLoading(false);
        }
    };

    const fetchSalaryData = async () => {
        setLoading(true);
        try {
            const res: any = await getTeacherSalaryAPI();
            const list = Array.isArray(res) ? res : (res.data || []);
            setSalaryData(list);
        } catch {
            message.error('Failed to load salary data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchData(); 
        fetchSalaryData();
    }, []);

    const showDetails = async (teacher: any) => {
        setSelectedTeacher(teacher);
        setDrawerVisible(true);
    };

    const teacherColumns = [
        { 
            title: 'Teacher', 
            key: 'teacher',
            render: (_: any, r: any) => (
                <Space>
                    <Avatar icon={<UserOutlined />} src={r.image} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{r.fullName}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{r.teacherCode}</Text>
                    </Space>
                </Space>
            )
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Mobile', dataIndex: 'mobilePhone', key: 'mobilePhone' },
        { title: 'Type', dataIndex: 'teacherType', key: 'teacherType', render: (t: string) => <Tag color="blue">{t}</Tag> },
        {
            title: 'Status', dataIndex: 'isActive', key: 'isActive',
            render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>
        },
        {
            title: 'Actions', key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="View Profile">
                        <Button type="text" icon={<InfoCircleOutlined />} onClick={() => showDetails(record)} />
                    </Tooltip>
                    <Button type="text" icon={<EditOutlined />} />
                </Space>
            )
        }
    ];

    const salaryColumns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60 },
        { 
            title: 'Class', 
            key: 'class',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{r.classCode}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{r.className}</Text>
                </Space>
            )
        },
        { 
            title: 'Schedule', 
            key: 'schedule',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text size="small">{dayjs(r.date).format('DD/MM/YYYY')}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{r.classTime} ({r.weekDay})</Text>
                </Space>
            )
        },
        { 
            title: 'Hours', 
            dataIndex: 'hrsTaugh', 
            key: 'hrsTaugh',
            render: (h: number) => <Tag color="cyan">{h} hrs</Tag>
        },
        { 
            title: 'Rate', 
            dataIndex: 'salaryPerHours', 
            key: 'salaryPerHours',
            render: (v: number) => v?.toLocaleString()
        },
        { 
            title: 'Payable', 
            dataIndex: 'payable', 
            key: 'payable',
            render: (v: number) => <Text strong type="success">{v?.toLocaleString()}</Text>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Faculty Management</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Monitor teaching hours, payroll, and academic performance</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Add Faculty Member
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Faculty" value={data.length} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Teaching Hours" value={salaryData.reduce((acc, cur) => acc + (cur.hrsTaugh || 0), 0)} prefix={<ClockCircleOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Payroll" value={salaryData.reduce((acc, cur) => acc + (cur.payable || 0), 0)} prefix={<DollarCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Search placeholder="Search faculty..." onSearch={fetchData} style={{ marginTop: 10 }} allowClear />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Tabs defaultActiveKey="list" className="premium-tabs">
                    <TabPane tab={<span><UserOutlined /> Faculty Directory</span>} key="list">
                        <Table columns={teacherColumns} dataSource={data} rowKey="teacherID" loading={loading} scroll={{ x: 1000 }} />
                    </TabPane>
                    <TabPane tab={<span><DollarCircleOutlined /> Payroll & Hours</span>} key="salary">
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button icon={<ExportOutlined />}>Export Payroll</Button>
                        </div>
                        <Table columns={salaryColumns} dataSource={salaryData} rowKey={(r, i) => i} loading={loading} scroll={{ x: 1000 }} />
                    </TabPane>
                </Tabs>
            </Card>

            <Drawer
                title="Faculty Profile Detail"
                placement="right"
                width={600}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
            >
                {selectedTeacher && (
                    <div className="fade-in">
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <Avatar size={100} icon={<UserOutlined />} src={selectedTeacher.image} style={{ border: '4px solid #f0f0f0' }} />
                            <Title level={3} style={{ marginTop: 16, marginBottom: 0 }}>{selectedTeacher.fullName}</Title>
                            <Text type="secondary">{selectedTeacher.teacherCode} | {selectedTeacher.teacherType}</Text>
                        </div>
                        
                        <Divider />
                        
                        <Descriptions title="Personal Information" column={1} bordered size="small">
                            <Descriptions.Item label="Email">{selectedTeacher.email}</Descriptions.Item>
                            <Descriptions.Item label="Mobile">{selectedTeacher.mobilePhone}</Descriptions.Item>
                            <Descriptions.Item label="Center">{selectedTeacher.location}</Descriptions.Item>
                            <Descriptions.Item label="Teaching Group">{selectedTeacher.teacherGroup}</Descriptions.Item>
                        </Descriptions>

                        <Divider />

                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                            <Button type="primary" icon={<CalendarOutlined />}>View Calendar</Button>
                            <Button icon={<EditOutlined />}>Edit Profile</Button>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default TeachersPage;

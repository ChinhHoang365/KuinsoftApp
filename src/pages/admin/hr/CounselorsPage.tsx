import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Input, Card, Row, Col, Statistic, Typography, Avatar, Tooltip 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    UserOutlined, 
    TeamOutlined, 
    LineChartOutlined, 
    SolutionOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { getCounselorsAPI, getCounselorListAPI } from '../../../services/admin/hr.api';

const { Search } = Input;
const { Text, Title } = Typography;

const CounselorsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res: any = await getCounselorsAPI();
            // The API might return res.data or just the array
            const list = Array.isArray(res) ? res : (res.data || []);
            setData(list);
        } catch {
            message.error('Failed to load counselors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { 
            title: 'Counselor', 
            key: 'counselor',
            render: (_: any, r: any) => (
                <Space>
                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: 'var(--primary-color)' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{r.counselorName}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>{r.ntAccountName}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Group & Manager', 
            key: 'group',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Tag color="cyan">Group ID: {r.counselorGroupID}</Tag>
                    <Text type="secondary" style={{ fontSize: 11 }}>Manager ID: {r.managerID}</Text>
                </Space>
            )
        },
        { 
            title: 'Sales Incentive', 
            dataIndex: 'salesIncentiveGroupID', 
            key: 'sales',
            render: (v: number) => <Tag color="gold">Incentive Tier: {v}</Tag>
        },
        { 
            title: 'Location', 
            dataIndex: 'locationID', 
            key: 'location',
            render: (id: number) => <Tag>Location: {id}</Tag>
        },
        {
            title: 'Status', dataIndex: 'inactive', key: 'inactive',
            render: (v: boolean) => <Tag color={!v ? 'green' : 'red'}>{!v ? 'Active' : 'Inactive'}</Tag>
        },
        {
            title: 'Actions', key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button type="text" icon={<EditOutlined />} />
                    </Tooltip>
                    <Popconfirm title="Archive this counselor?" onConfirm={() => {}}>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Admissions & Counseling</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Manage counselor assignments, sales groups, and performance tiers</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Add Counselor
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Counselors" value={data.length} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Tiers" value={new Set(data.map(i => i.salesIncentiveGroupID)).size} prefix={<LineChartOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Search placeholder="Search counselors..." onSearch={fetchData} style={{ marginTop: 10 }} allowClear prefix={<SearchOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="counselorID" 
                    loading={loading} 
                    scroll={{ x: 900 }}
                    className="premium-table"
                />
            </Card>
        </div>
    );
};

export default CounselorsPage;

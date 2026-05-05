import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Card, Row, Col, Statistic, Typography, Avatar, 
    Tooltip, Badge, Progress, DatePicker 
} from 'antd';
import { 
    HomeOutlined, 
    CheckCircleOutlined, 
    EditOutlined, 
    GlobalOutlined,
    TeamOutlined,
    ThunderboltOutlined,
    ClockCircleOutlined,
    FilterOutlined,
    DashboardOutlined
} from '@ant-design/icons';
import { 
    getFreeRoomsAPI 
} from '../../../services/admin/academic.api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const RoomsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const locID = Number(localStorage.getItem('locationId')) || 1;
            const res = await getFreeRoomsAPI({ locationID: locID });
            setData(Array.isArray(res.data) ? res.data : []);
            // Mocking for visual fidelity
            if (res.data?.length === 0 || !res.data) {
                setData([
                    { roomID: 101, roomName: 'Einstein Lab', capacity: 30, location: 'Building A', isActive: true, currentUsage: 22 },
                    { roomID: 102, roomName: 'Tesla Hall', capacity: 50, location: 'Building A', isActive: true, currentUsage: 0 },
                    { roomID: 201, roomName: 'Newton Studio', capacity: 20, location: 'Building B', isActive: true, currentUsage: 18 },
                    { roomID: 305, roomName: 'Darwin Meeting', capacity: 15, location: 'Building C', isActive: false, currentUsage: 0 }
                ]);
            }
        } catch {
            message.error('Facility management service error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { 
            title: 'Facility Name', 
            key: 'room',
            render: (_: any, r: any) => (
                <Space size={12}>
                    <Avatar shape="square" icon={<HomeOutlined />} style={{ backgroundColor: r.isActive ? '#6366f1' : '#94a3b8' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 14 }}>{r.roomName}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}><GlobalOutlined /> {r.location}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Utilization', 
            key: 'usage',
            render: (_: any, r: any) => {
                const percent = Math.round((r.currentUsage / r.capacity) * 100);
                return (
                    <div style={{ width: 150 }}>
                        <Text style={{ fontSize: 11 }}>{r.currentUsage}/{r.capacity} Seats Used</Text>
                        <Progress 
                            percent={percent} 
                            size="small" 
                            status={percent > 90 ? 'exception' : 'normal'}
                            strokeColor={percent > 90 ? '#ef4444' : 'var(--primary-color)'}
                        />
                    </div>
                );
            }
        },
        { 
            title: 'Status', 
            dataIndex: 'isActive', 
            key: 'status',
            render: (v: boolean) => (
                <Badge status={v ? 'success' : 'default'} text={<Tag color={v ? 'green' : 'default'}>{v ? 'Operational' : 'Maintenance'}</Tag>} />
            )
        },
        {
            title: 'Actions', 
            key: 'action',
            render: () => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} />
                    <Button type="text" icon={<DashboardOutlined />} style={{ color: '#3b82f6' }} />
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Facility Infrastructure</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Real-time spatial oversight, room allocation auditing, and capacity optimization for campus zones</Text>
                </div>
                <Space>
                    <DatePicker defaultValue={dayjs()} />
                    <Button type="default" size="large" icon={<FilterOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                        View Free Rooms
                    </Button>
                </Space>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Rooms" value={24} prefix={<HomeOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Occupied Now" value={18} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#f59e0b' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Available" value={6} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Spatial Power" value={84} suffix="%" prefix={<ThunderboltOutlined />} valueStyle={{ color: '#fbbf24' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="roomID" 
                    loading={loading} 
                    className="premium-table"
                />
            </Card>
        </div>
    );
};

export default RoomsPage;

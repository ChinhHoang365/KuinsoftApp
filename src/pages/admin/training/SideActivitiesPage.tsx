import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Card, Row, Col, Statistic, Typography, Avatar, 
    Tooltip, Badge, Progress, Input 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined,
    RocketOutlined,
    GlobalOutlined,
    TeamOutlined,
    CalendarOutlined,
    CheckCircleOutlined,
    SmileOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { 
    getSideActivitiesAPI 
} from '../../../services/admin/academic.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const SideActivitiesPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getSideActivitiesAPI({});
            setData(Array.isArray(res.data) ? res.data : []);
            // Mocking for visual fidelity
            if (res.data?.length === 0 || !res.data) {
                setData([
                    { activityID: 1, activityName: 'Summer English Camp 2026', className: 'IELTS-A1', activityDate: '2026-06-15', location: 'Vung Tau Resort', status: 'Upcoming', targetParticipants: 50, currentParticipants: 32 },
                    { activityID: 2, activityName: 'Speaking Club: Tech Future', className: 'TOEIC-B2', activityDate: '2026-05-10', location: 'Main Hall', status: 'Active', targetParticipants: 30, currentParticipants: 28 }
                ]);
            }
        } catch {
            message.error('Extracurricular database offline');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { 
            title: 'Activity', 
            key: 'activity',
            width: 300,
            render: (_: any, r: any) => (
                <Space size={12}>
                    <Avatar shape="square" size="large" icon={<RocketOutlined />} style={{ backgroundColor: 'var(--primary-color)' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 14 }}>{r.activityName}</Text>
                        <Tag color="blue" style={{ fontSize: 10 }}>{r.className}</Tag>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Logistics', 
            key: 'logistics',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}><GlobalOutlined /> {r.location}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}><CalendarOutlined /> {dayjs(r.activityDate).format('DD/MM/YYYY')}</Text>
                </Space>
            )
        },
        { 
            title: 'Enrollment', 
            key: 'enroll',
            render: (_: any, r: any) => (
                <div style={{ width: 120 }}>
                    <Text style={{ fontSize: 11 }}>{r.currentParticipants}/{r.targetParticipants} Learner</Text>
                    <Progress 
                        percent={Math.round((r.currentParticipants / r.targetParticipants) * 100)} 
                        size="small" 
                        showInfo={false} 
                        strokeColor="var(--primary-color)" 
                    />
                </div>
            )
        },
        { 
            title: 'Status', 
            dataIndex: 'status', 
            key: 'status',
            render: (v: string) => (
                <Badge status={v === 'Upcoming' ? 'processing' : 'success'} text={<Tag color={v === 'Upcoming' ? 'blue' : 'green'}>{v}</Tag>} />
            )
        },
        {
            title: 'Actions', 
            key: 'action',
            render: () => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} />
                    <Button type="text" danger icon={<DeleteOutlined />} />
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Extracurricular Hub</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Coordinate field trips, workshops, and speaking clubs to enhance immersion learning</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                    New Activity
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Activities" value={4} prefix={<RocketOutlined />} valueStyle={{ color: 'var(--primary-color)' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Registered" value={156} prefix={<TeamOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Upcoming Events" value={2} prefix={<CalendarOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Satisfaction" value={98} suffix="%" prefix={<SmileOutlined />} valueStyle={{ color: '#fbbf24' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                    <Space>
                        <Input placeholder="Search activities..." prefix={<SearchOutlined />} style={{ width: 300 }} />
                        <Button icon={<CheckCircleOutlined />}>Manage Registrations</Button>
                    </Space>
                </div>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="activityID" 
                    loading={loading} 
                    className="premium-table"
                />
            </Card>
        </div>
    );
};

export default SideActivitiesPage;

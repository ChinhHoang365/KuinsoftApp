import React, { useEffect, useState } from 'react';
import { 
    Row, Col, Card, Statistic, Typography, Space, 
    Avatar, Divider, Badge, Tag, Skeleton, message,
    List, Button
} from 'antd';
import { 
    UserOutlined, 
    BookOutlined, 
    TeamOutlined, 
    BankOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    MailOutlined,
    GlobalOutlined,
    NotificationOutlined,
    RightOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    CalendarOutlined,
    DollarOutlined,
    BarChartOutlined,
    SoundOutlined,
    EditOutlined
} from '@ant-design/icons';
import { getCentersList, getCenterDetails } from '../../services/admin/center.api';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const HomePage: React.FC = () => {
    const [center, setCenter] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState(dayjs().format('HH:mm'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const centers: any = await getCentersList();
                const list = Array.isArray(centers) ? centers : (centers.data || []);
                if (list.length > 0) {
                    const detail: any = await getCenterDetails(list[0].locationID);
                    setCenter(Array.isArray(detail) ? detail[0] : (detail.data?.[0] || detail));
                }
            } catch {
                message.error('Failed to load center information');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();

        const timer = setInterval(() => setTime(dayjs().format('HH:mm')), 60000);
        return () => clearInterval(timer);
    }, []);

    const quickLinks = [
        { title: 'Student Management', count: '120 New Records', icon: <UserOutlined />, path: '/admin/students', color: '#6366f1' },
        { title: 'Class Scheduling', count: '120 New Records', icon: <CalendarOutlined />, path: '/admin/classes', color: '#10b981' },
        { title: 'Financial Records', count: '30 New Records', icon: <DollarOutlined />, path: '/admin/payments', color: '#f59e0b' },
        { title: 'Tasks & Ops', count: '10 Tasks Pending', icon: <ThunderboltOutlined />, path: '/admin/tasks', color: '#ef4444' },
    ];

    const newsItems = [
        { title: 'Q2 Performance Audit', tag: 'System', time: '2 hours ago', icon: <BarChartOutlined /> },
        { title: 'New IELTS Course Launch', tag: 'Marketing', time: 'Yesterday', icon: <SoundOutlined /> },
        { title: 'Center Maintenance Sat', tag: 'Logistics', time: '2 days ago', icon: <RightOutlined /> },
        { title: 'Staff Meeting 3PM', tag: 'HR', time: '5 days ago', icon: <RightOutlined /> },
    ];

    return (
        <div className="fade-in">
            {/* Executive Banner */}
            <div style={{ 
                marginBottom: 32, padding: '48px 60px', background: '#1e3a8a', 
                borderRadius: 'var(--radius-xl)', color: '#fff', 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(30, 58, 138, 0.15)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 40, zIndex: 2 }}>
                    <div style={{ 
                        width: 100, height: 100, borderRadius: '50%', 
                        background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Avatar size={80} icon={<BankOutlined />} style={{ backgroundColor: 'transparent', opacity: 0.8 }} />
                    </div>
                    <div>
                        <Tag color="rgba(255,255,255,0.15)" style={{ color: '#fff', border: 'none', borderRadius: 20, marginBottom: 8 }}>KUINSOFT ACADEMY NETWORK</Tag>
                        <Title level={1} style={{ margin: 0, color: '#fff', fontSize: 48, letterSpacing: -1.5 }}>
                            Welcome to {center?.location || 'ILC Center'}
                        </Title>
                        <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }}>
                            Operational Command Center • Active Branch: <Text strong style={{ color: '#fff' }}>{center?.locationCode || 'HQ'}</Text>
                        </Text>
                    </div>
                </div>

                <div className="glass-clock" style={{ zIndex: 2 }}>
                    <div style={{ fontSize: 42, fontWeight: 600, lineHeight: 1 }}>{time}</div>
                    <div style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}>{dayjs().format('dddd, MMM DD')}</div>
                </div>

                {/* Abstract decorative element */}
                <div style={{ position: 'absolute', left: -40, top: -40, opacity: 0.05 }}>
                    <GlobalOutlined style={{ fontSize: 300 }} />
                </div>
            </div>

            <Row gutter={[24, 24]}>
                {/* Institutional Identity Card */}
                <Col xs={24} lg={17}>
                    <Card bordered={false} className="premium-card" style={{ padding: '8px' }}>
                        <Row gutter={40} align="middle">
                            <Col span={15}>
                                <Title level={4} style={{ fontSize: 18, marginBottom: 24 }}><EnvironmentOutlined /> Institutional Identity</Title>
                                <Space direction="vertical" size={24} style={{ width: '100%' }}>
                                    <div>
                                        <Text type="secondary" block style={{ fontSize: 11, marginBottom: 4 }}>FULL ADDRESS</Text>
                                        <Text strong style={{ fontSize: 15 }}><EnvironmentOutlined /> {center?.address || 'Address Pending...'}</Text>
                                    </div>
                                    <Row gutter={32}>
                                        <Col span={12}>
                                            <Text type="secondary" block style={{ fontSize: 11, marginBottom: 4 }}>TELEPHONE</Text>
                                            <Space><PhoneOutlined /> <Text strong>{center?.tel || 'Pending...'}</Text> <EditOutlined style={{ fontSize: 12, color: '#94a3b8' }} /></Space>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary" block style={{ fontSize: 11, marginBottom: 4 }}>OFFICIAL EMAIL</Text>
                                            <Space><MailOutlined /> <Text strong>{center?.email || 'Pending...'}</Text> <EditOutlined style={{ fontSize: 12, color: '#94a3b8' }} /></Space>
                                        </Col>
                                    </Row>
                                    <Row gutter={32}>
                                        <Col span={12}>
                                            <Text type="secondary" block style={{ fontSize: 11, marginBottom: 4 }}>STUDENT CODE PREFIX <Tag color="blue" style={{ fontSize: 10, margin: 0 }}>ST</Tag></Text>
                                            <Text strong>{center?.prefixStudentCode || 'Pending...'}</Text>
                                        </Col>
                                        <Col span={12}>
                                            <Text type="secondary" block style={{ fontSize: 11, marginBottom: 4 }}>CERTIFICATE PREFIX <Tag color="orange" style={{ fontSize: 10, margin: 0 }}>CERT</Tag></Text>
                                            <Text strong>{center?.prefixCertificate || 'Pending...'}</Text>
                                        </Col>
                                    </Row>
                                </Space>
                            </Col>
                            <Col span={9} style={{ textAlign: 'center', borderLeft: '1px solid #f1f5f9', padding: '20px 0 20px 40px' }}>
                                <Statistic title="Total Active Learners" value={1240} valueStyle={{ color: '#1e3a8a', fontSize: 42, fontWeight: 800 }} />
                                <Divider style={{ margin: '24px 0' }} />
                                <Statistic title="Faculty Strength" value={38} valueStyle={{ color: '#1e3a8a', fontWeight: 700, fontSize: 32 }} />
                                <div style={{ marginTop: 32 }}>
                                    <Button type="primary" shape="round" icon={<GlobalOutlined />} block size="large" style={{ height: 50, background: '#1e3a8a', border: 'none' }}>Visit Web Portal</Button>
                                </div>
                            </Col>
                        </Row>
                    </Card>

                    <div style={{ marginTop: 32 }}>
                        <Title level={4} style={{ fontSize: 18, marginBottom: 20 }}><ThunderboltOutlined /> Express Management</Title>
                        <Row gutter={20}>
                            {quickLinks.map((link, i) => (
                                <Col span={6} key={i}>
                                    <Card hoverable className="premium-card" style={{ textAlign: 'center', padding: '12px 0' }} onClick={() => navigate(link.path)}>
                                        <Avatar size={54} icon={link.icon} style={{ backgroundColor: '#f1f5f9', color: '#1e3a8a', marginBottom: 16 }} />
                                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{link.title}</div>
                                        <Text type="secondary" style={{ fontSize: 11 }}>{link.count}</Text>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>

                {/* Institutional News Sidebar */}
                <Col xs={24} lg={7}>
                    <Card 
                        title={<Space><SoundOutlined /> <Text strong style={{ fontSize: 16 }}>Institutional News</Text></Space>} 
                        className="premium-card"
                        extra={<Button type="default" size="small" style={{ borderRadius: 8, fontSize: 12 }}>View All</Button>}
                        styles={{ body: { padding: '0 12px' } }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={newsItems}
                            renderItem={(item) => (
                                <List.Item style={{ padding: '20px 8px' }}>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: '#f1f5f9', color: '#1e3a8a' }} icon={item.icon} />}
                                        title={<Text strong style={{ fontSize: 14 }}>{item.title}</Text>}
                                        description={<Space size={12}><Tag style={{ fontSize: 10, margin: 0, borderRadius: 4 }}>{item.tag}</Tag> <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text></Space>}
                                    />
                                </List.Item>
                            )}
                        />
                        <div style={{ margin: '12px 0 24px', padding: '20px', background: '#eef2f6', borderRadius: 20 }}>
                            <Text strong block style={{ fontSize: 13, marginBottom: 4 }}>Operational Support:</Text>
                            <Text type="secondary" style={{ fontSize: 12 }}>Contact IT support at it@kuinsoft.edu.vn for system assistance.</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

export default HomePage;
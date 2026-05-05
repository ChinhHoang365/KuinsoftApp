import React, { useEffect, useState } from 'react';
import { 
    Row, Col, Card, Statistic, Typography, Space, 
    Divider, message 
} from 'antd';
import { 
    UserOutlined, 
    BookOutlined, 
    DollarCircleOutlined, 
    TeamOutlined, 
    ArrowUpOutlined,
    TrophyOutlined,
    BarChartOutlined,
    LineChartOutlined
} from '@ant-design/icons';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { getCentersList, getCenterDetails } from '../../../services/admin/center.api';

const { Title, Text } = Typography;

// Mock data for charts
const revenueData = [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 }, { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 }, { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
];

const pieData = [
    { name: 'Active', value: 750, color: '#6366f1' },
    { name: 'On Leave', value: 50, color: '#f43f5e' },
    { name: 'Graduated', value: 200, color: '#10b981' },
];

const DashboardPage: React.FC = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="fade-in">
            <div style={{ marginBottom: 24 }}>
                <Title level={2} style={{ margin: 0 }}>Executive Dashboard</Title>
                <Text type="secondary">Real-time analytical oversight of institutional performance and growth metrics</Text>
            </div>

            {/* Stats Grid */}
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Revenue" value={84200} prefix={<DollarCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                        <Text type="secondary" style={{ fontSize: 12 }}><ArrowUpOutlined /> 5.4% vs last month</Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Enrollment Rate" value={92} suffix="%" prefix={<BarChartOutlined />} valueStyle={{ color: '#6366f1' }} />
                        <Progress percent={92} size="small" showInfo={false} strokeColor="#6366f1" />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Students" value={1250} prefix={<UserOutlined />} valueStyle={{ color: '#8b5cf6' }} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Retention" value={87} suffix="%" prefix={<LineChartOutlined />} valueStyle={{ color: '#f43f5e' }} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card title={<Text strong>Revenue Growth Forecast</Text>} style={{ borderRadius: 20 }}>
                        <div style={{ height: 350 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorDashboard" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                                    <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fill="url(#colorDashboard)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title={<Text strong>Student Distribution</Text>} style={{ borderRadius: 20 }}>
                        <div style={{ height: 350 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value">
                                        {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip />
                                    <Legend verticalAlign="bottom" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

// Internal progress component to avoid extra imports
const Progress = ({ percent, size, showInfo, strokeColor }: any) => (
    <div style={{ marginTop: 8, height: 4, width: '100%', background: '#f1f5f9', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: strokeColor, transition: 'width 0.3s' }}></div>
    </div>
);

export default DashboardPage;

import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Card, 
    Typography, Row, Col, Statistic, Avatar, 
    Input, Select, Form, Modal, Divider, Empty 
} from 'antd';
import { 
    CommentOutlined, 
    CheckCircleOutlined, 
    EditOutlined, 
    SearchOutlined,
    UserOutlined,
    StarOutlined,
    FileSearchOutlined,
    BarChartOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { 
    getMonthlyCommentsByClassAPI, 
    addMonthlyCommentAPI 
} from '../../../services/admin/academic.api';
import { getClassesByLocationAPI } from '../../../services/admin/classes.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const MonthlyCommentsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);

    const fetchClasses = async () => {
        try {
            const locID = Number(localStorage.getItem('locationId')) || 1;
            const res = await getClassesByLocationAPI(locID);
            setClasses(Array.isArray(res.data) ? res.data : []);
        } catch {}
    };

    const fetchComments = async (classID: number) => {
        setLoading(true);
        try {
            const res = await getMonthlyCommentsByClassAPI(classID);
            setData(Array.isArray(res.data) ? res.data : []);
        } catch {
            message.error('Evaluation logs unavailable');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchClasses(); }, []);

    const columns = [
        { 
            title: 'Student', 
            key: 'student',
            render: (_: any, r: any) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{r.studentName || 'Student ID: ' + r.studentID}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{r.studentCode}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Evaluation', 
            dataIndex: 'evaluate', 
            key: 'eval',
            render: (v: string) => (
                <Tag color={v === 'Excellent' ? 'gold' : v === 'Good' ? 'green' : 'blue'}>
                    <StarOutlined /> {v || 'Pending'}
                </Tag>
            )
        },
        { 
            title: 'Pedagogical Comment', 
            dataIndex: 'comment', 
            key: 'comment',
            width: 400,
            render: (v: string) => <Paragraph ellipsis={{ rows: 2 }}>{v || 'No comment recorded'}</Paragraph>
        },
        { 
            title: 'Period', 
            dataIndex: 'month', 
            key: 'month',
            render: (v: string) => <Tag color="purple">{v}</Tag>
        },
        {
            title: 'Actions', 
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button type="primary" size="small" icon={<EditOutlined />}>Refine</Button>
                    <Button size="small" icon={<CommentOutlined />}>Response</Button>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Pedagogical Evaluations</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Monitor monthly academic progress, teacher feedback, and student-parent interaction logs</Text>
                </div>
                <Select 
                    placeholder="Select Cohort" 
                    style={{ width: 250 }} 
                    onChange={v => { setSelectedClass(v); fetchComments(v); }}
                >
                    {classes.map(c => <Option key={c.classID} value={c.classID}>{c.className}</Option>)}
                </Select>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Evaluated Today" value={data.length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Pending Review" value={12} prefix={<FileSearchOutlined />} valueStyle={{ color: '#f59e0b' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Excellence Rate" value={78} suffix="%" prefix={<BarChartOutlined />} valueStyle={{ color: '#fbbf24' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Cohort" value={classes.find(c => c.classID === selectedClass)?.studentCount || 0} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                {selectedClass ? (
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        rowKey="studentID" 
                        loading={loading} 
                        className="premium-table"
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <TeamOutlined style={{ fontSize: 64, color: '#e2e8f0', marginBottom: 16 }} />
                        <Title level={4} style={{ color: '#94a3b8' }}>Please select a class to view evaluations</Title>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default MonthlyCommentsPage;

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
    TrophyOutlined,
    StarOutlined,
    GiftOutlined,
    SearchOutlined,
    UserOutlined,
    GlobalOutlined,
    HeartOutlined
} from '@ant-design/icons';
import { 
    getRewardTypeListAPI,
    createRewardAPI 
} from '../../../services/admin/academic.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const AchievementRewardsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [rewardTypes, setRewardTypes] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getRewardTypeListAPI();
            setRewardTypes(Array.isArray(res.data) ? res.data : []);
            // Mocking some data for demonstration if list is empty
            setData([
                { id: 1, studentName: 'Alex Johnson', rewardType: 'Academic Excellence', title: 'IELTS 8.5 Breakthrough', description: 'Outstanding performance in the final mock test.', awardedBy: 'Admin', awardDate: new Date() },
                { id: 2, studentName: 'Maria Garcia', rewardType: 'Diligence', title: 'Perfect Attendance', description: 'Attended all sessions for 6 consecutive months.', awardedBy: 'Teacher Sarah', awardDate: new Date() }
            ]);
        } catch {
            message.error('Failed to load achievement records');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { 
            title: 'Awardee', 
            key: 'student',
            render: (_: any, r: any) => (
                <Space>
                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#fbbf24' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{r.studentName}</Text>
                        <Tag color="gold" style={{ fontSize: 10 }}><TrophyOutlined /> {r.rewardType}</Tag>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Achievement Title', 
            dataIndex: 'title', 
            key: 'title',
            render: (v: string) => <Text strong style={{ color: 'var(--primary-color)' }}>{v}</Text>
        },
        { 
            title: 'Citation', 
            dataIndex: 'description', 
            key: 'desc',
            ellipsis: true,
            render: (v: string) => <Tooltip title={v}><Paragraph ellipsis={{ rows: 1 }} style={{ margin: 0 }}>{v}</Paragraph></Tooltip>
        },
        { 
            title: 'Awarded On', 
            dataIndex: 'awardDate', 
            key: 'date',
            render: (v: string) => dayjs(v).format('DD/MM/YYYY')
        },
        {
            title: 'Actions', 
            key: 'action',
            width: 120,
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Achievements & Rewards</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Celebrate learner excellence, milestone breakthroughs, and institutional contributions</Text>
                </div>
                <Button type="default" size="large" icon={<GiftOutlined />} onClick={() => setIsModalOpen(true)} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Grant Reward
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Rewards" value={142} prefix={<TrophyOutlined />} valueStyle={{ color: '#fbbf24' }} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Honor Roll" value={28} prefix={<StarOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="This Month" value={12} prefix={<PlusOutlined />} valueStyle={{ color: 'var(--primary-color)' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                    <Input placeholder="Search achievements..." prefix={<SearchOutlined />} style={{ width: 300 }} />
                </div>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="id" 
                    loading={loading} 
                    className="premium-table"
                />
            </Card>

            <Modal 
                title="Nominate Student for Reward" 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="studentID" label="Student" rules={[{ required: true }]}>
                        <Select placeholder="Select eligible learner" showSearch>
                            <Option value={1}>Alex Johnson</Option>
                            <Option value={2}>Maria Garcia</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="rewardTypeID" label="Recognition Type">
                        <Select placeholder="Select category">
                            {rewardTypes.map(t => <Option key={t.rewardTypeID} value={t.rewardTypeID}>{t.rewardType}</Option>)}
                            <Option value={1}>Academic Excellence</Option>
                            <Option value={2}>Leadership</Option>
                            <Option value={3}>Diligence</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="title" label="Achievement Title" rules={[{ required: true }]}>
                        <Input placeholder="e.g. IELTS 8.5 Breakthrough" />
                    </Form.Item>
                    <Form.Item name="description" label="Citation (Visible on Certificate)">
                        <Input.TextArea rows={4} placeholder="Describe the outstanding contribution or result..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AchievementRewardsPage;

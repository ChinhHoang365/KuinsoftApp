import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Modal, Form, Input, Select, Card, Row, Col, 
    Statistic, Typography, Tabs, Timeline, Badge, 
    Divider, Tooltip, Switch 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined,
    NotificationOutlined,
    FileTextOutlined,
    TagsOutlined,
    SendOutlined,
    ClockCircleOutlined,
    UsergroupAddOutlined,
    CheckCircleOutlined,
    StopOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { 
    getAllAnnouncementsAPI, 
    createAnnouncementAPI, 
    updateAnnouncementAPI, 
    deleteAnnouncementAPI,
    getAllTemplatesAPI,
    getAnnouncementTagsAPI 
} from '../../../services/admin/announcements.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const AnnouncementsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [templates, setTemplates] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [annRes, tempRes, tagRes] = await Promise.all([
                getAllAnnouncementsAPI(),
                getAllTemplatesAPI(),
                getAnnouncementTagsAPI()
            ]);
            setData(Array.isArray(annRes.data) ? annRes.data : []);
            setTemplates(Array.isArray(tempRes.data) ? tempRes.data : []);
            setTags(Array.isArray(tagRes.data) ? tagRes.data : []);
        } catch {
            message.error('Communication gateway error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { 
            title: 'Announcement', 
            key: 'content',
            width: 400,
            render: (_: any, r: any) => (
                <Space direction="vertical" size={4}>
                    <Text strong style={{ fontSize: 14 }}>{r.title}</Text>
                    <Paragraph ellipsis={{ rows: 2 }} type="secondary" style={{ fontSize: 12, margin: 0 }}>
                        {r.content}
                    </Paragraph>
                </Space>
            )
        },
        { 
            title: 'Target Audience', 
            key: 'target',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Tag color="blue"><UsergroupAddOutlined /> {r.target || 'General'}</Tag>
                    <Text type="secondary" style={{ fontSize: 10 }}>{r.location || 'All Centers'}</Text>
                </Space>
            )
        },
        { 
            title: 'Status', 
            key: 'status',
            render: (_: any, r: any) => (
                <Badge 
                    status={r.isPublished ? 'success' : 'default'} 
                    text={<Tag color={r.isPublished ? 'green' : 'gold'}>{r.isPublished ? 'Live' : 'Draft'}</Tag>} 
                />
            )
        },
        { 
            title: 'Dispatch', 
            dataIndex: 'crtdDate', 
            key: 'date',
            render: (v: string) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 12 }}><ClockCircleOutlined /> {dayjs(v).format('DD/MM/YYYY')}</Text>
                    <Text type="secondary" style={{ fontSize: 10 }}>by {data[0]?.crtdUser || 'Admin'}</Text>
                </Space>
            )
        },
        {
            title: 'Actions', 
            key: 'action',
            width: 150,
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="Edit">
                        <Button type="text" icon={<EditOutlined />} onClick={() => { setEditingId(record.announcementID); form.setFieldsValue(record); setIsModalOpen(true); }} />
                    </Tooltip>
                    <Tooltip title="Dispatch Now">
                        <Button type="text" icon={<SendOutlined />} style={{ color: 'var(--primary-color)' }} />
                    </Tooltip>
                    <Popconfirm title="Archive announcement?" onConfirm={() => deleteAnnouncementAPI(record.announcementID).then(fetchData)}>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Broadcasting Hub</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Orchestrate center-wide announcements, emergency alerts, and student engagement campaigns</Text>
                </div>
                <Button type="default" size="large" icon={<PlusOutlined />} onClick={() => { setEditingId(null); form.resetFields(); setIsModalOpen(true); }} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Compose News
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Live Announcements" value={data.filter(i => i.isPublished).length} prefix={<NotificationOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Reusable Templates" value={templates.length} prefix={<FileTextOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Tags" value={tags.length} prefix={<TagsOutlined />} valueStyle={{ color: '#f59e0b' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Tabs defaultActiveKey="broadcasts" className="premium-tabs">
                    <TabPane tab={<span><NotificationOutlined /> Broadcasts</span>} key="broadcasts">
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                            <Input placeholder="Search broadcasts..." prefix={<SearchOutlined />} style={{ width: 300 }} />
                        </div>
                        <Table columns={columns} dataSource={data} rowKey="announcementID" loading={loading} className="premium-table" pagination={{ pageSize: 6 }} />
                    </TabPane>
                    <TabPane tab={<span><FileTextOutlined /> Templates</span>} key="templates">
                        <Table 
                            dataSource={templates}
                            rowKey="templateID"
                            columns={[
                                { title: 'Template Name', dataIndex: 'templateName', key: 'tname', render: v => <Text strong>{v}</Text> },
                                { title: 'Subject', dataIndex: 'subject', key: 'subj' },
                                { title: 'Actions', key: 'acts', render: () => <Button type="link">Use Template</Button> }
                            ]}
                        />
                    </TabPane>
                </Tabs>
            </Card>

            <Modal 
                title={editingId ? 'Refine Broadcast' : 'Compose New Broadcast'} 
                open={isModalOpen} 
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                width={700}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={async (values) => {
                    if (editingId) await updateAnnouncementAPI({ ...values, announcementID: editingId });
                    else await createAnnouncementAPI(values);
                    message.success('Dispatching successful');
                    setIsModalOpen(false); fetchData();
                }}>
                    <Form.Item name="title" label="Announcement Title" rules={[{ required: true }]}>
                        <Input placeholder="Enter high-impact subject line..." />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="target" label="Target Audience">
                                <Select placeholder="Select segment">
                                    <Option value="All">All Entities</Option>
                                    <Option value="Students">Student Cohort</Option>
                                    <Option value="Teachers">Faculty Staff</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="isPublished" label="Publish Instantly" valuePropName="checked">
                                <Switch defaultChecked />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="content" label="Message Body">
                        <Input.TextArea rows={6} placeholder="Compose your message here (Supports HTML formatting)..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AnnouncementsPage;

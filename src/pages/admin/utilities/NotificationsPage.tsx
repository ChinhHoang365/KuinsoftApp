import React, { useState, useEffect } from 'react';
import { 
    Card, Table, Button, Tag, message, Row, Col, 
    Typography, Tabs, Form, Input, Select, Space, 
    Statistic, Badge, Tooltip, Popconfirm, Divider 
} from 'antd';
import { 
    BellOutlined, 
    MobileOutlined, 
    SendOutlined, 
    HistoryOutlined,
    SettingOutlined,
    DeleteOutlined,
    CheckCircleOutlined,
    GlobalOutlined,
    AppleOutlined,
    AndroidOutlined,
    WindowsOutlined
} from '@ant-design/icons';
import { 
    getRegisteredDevicesAPI, 
    sendNotificationAPI,
    listNotiCategoriesAPI 
} from '../../../services/admin/notification.api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const NotificationsPage: React.FC = () => {
    const [devices, setDevices] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const [deviceRes, catRes] = await Promise.all([
                getRegisteredDevicesAPI(),
                listNotiCategoriesAPI()
            ]);
            setDevices(Array.isArray(deviceRes) ? deviceRes : (deviceRes.data || []));
            setCategories(Array.isArray(catRes) ? catRes : (catRes.data || []));
        } catch {
            message.error('Failed to load notification data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSend = async (values: any) => {
        setLoading(true);
        try {
            await sendNotificationAPI(values);
            message.success('Notification broadcasted successfully');
            form.resetFields();
        } catch {
            message.error('Failed to send notification');
        } finally {
            setLoading(false);
        }
    };

    const deviceColumns = [
        { 
            title: 'Device', 
            key: 'device',
            render: (_: any, r: any) => (
                <Space>
                    {r.operationSystem?.toLowerCase().includes('ios') ? <AppleOutlined /> : 
                     r.operationSystem?.toLowerCase().includes('android') ? <AndroidOutlined /> : 
                     r.operationSystem?.toLowerCase().includes('windows') ? <WindowsOutlined /> : <MobileOutlined />}
                    <Space direction="vertical" size={0}>
                        <Text strong>{r.deviceName || 'Unknown Device'}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{r.operationSystem} | {r.ipAddress}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Registered By', 
            dataIndex: 'createdBy', 
            key: 'createdBy',
            render: (v: string) => <Tag color="blue">{v}</Tag>
        },
        { 
            title: 'Created Date', 
            dataIndex: 'createdDate', 
            key: 'date',
            render: (v: string) => dayjs(v).format('DD/MM/YYYY HH:mm')
        },
        { 
            title: 'FCM Token', 
            dataIndex: 'firebaseRegistrationToken', 
            key: 'token',
            ellipsis: true,
            render: (t: string) => <Tooltip title={t}><code>{t?.substring(0, 15)}...</code></Tooltip>
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_: any, record: any) => (
                <Popconfirm title="Unregister this device?" onConfirm={() => {}}>
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Notification Center</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Broadcast messages to users and manage registered push devices</Text>
                </div>
                <Badge count={devices.length} overflowCount={999}>
                    <Button type="default" size="large" icon={<GlobalOutlined />} style={{ borderRadius: 10 }}>
                        Active Devices
                    </Button>
                </Badge>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={12}>
                    <Card title={<span><SendOutlined /> Broadcast Message</span>} className="glass-effect" style={{ borderRadius: 16 }}>
                        <Form form={form} layout="vertical" onFinish={handleSend}>
                            <Form.Item name="category" label="Target Category" rules={[{ required: true }]}>
                                <Select placeholder="Select notification category">
                                    {categories.map((c: any) => (
                                        <Select.Option key={c.id} value={c.name}>{c.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                                <Input placeholder="Message headline..." />
                            </Form.Item>
                            <Form.Item name="message" label="Content" rules={[{ required: true }]}>
                                <TextArea rows={4} placeholder="Type your notification message here..." />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" icon={<SendOutlined />} loading={loading} block size="large">
                                Broadcast Now
                            </Button>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title={<span><MobileOutlined /> Delivery Stats</span>} style={{ borderRadius: 16, height: '100%' }}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}><Statistic title="Total Registered" value={devices.length} prefix={<MobileOutlined />} /></Col>
                            <Col span={12}><Statistic title="Sent Today" value={12} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} /></Col>
                            <Col span={24}>
                                <Divider />
                                <Title level={5}>Target Segments</Title>
                                <Space wrap>
                                    <Tag color="magenta">Students</Tag>
                                    <Tag color="volcano">Teachers</Tag>
                                    <Tag color="orange">Staff</Tag>
                                    <Tag color="gold">Counselors</Tag>
                                </Space>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16 }}>
                <Tabs defaultActiveKey="devices" className="premium-tabs">
                    <TabPane tab={<span><MobileOutlined /> Registered Devices</span>} key="devices">
                        <Table 
                            columns={deviceColumns} 
                            dataSource={devices} 
                            rowKey="id" 
                            loading={loading} 
                            className="premium-table"
                        />
                    </TabPane>
                    <TabPane tab={<span><HistoryOutlined /> Broadcast History</span>} key="history">
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <HistoryOutlined style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
                            <Title level={4}>No History Found</Title>
                            <Text type="secondary">Previous broadcasts will appear here once you start sending notifications.</Text>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default NotificationsPage;

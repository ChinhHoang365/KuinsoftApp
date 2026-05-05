import React, { useState } from 'react';
import { Card, Button, Row, Col, Typography, message, Space, Tag, Divider, List } from 'antd';
import { 
    ClockCircleOutlined, 
    NotificationOutlined, 
    DeleteOutlined, 
    RocketOutlined,
    SyncOutlined,
    ScheduleOutlined
} from '@ant-design/icons';
import { 
    cleanUpPushDevicesAPI, 
    setupHourlyAnnouncementAPI, 
    sendNotificationAnnouncementAPI,
    setupDailyScheduleAPI,
    setupDailyNewsTidyUpAPI,
    sendNotificationAsyncAPI
} from '../../../services/admin/cronjob.api';

const { Title, Text } = Typography;

const AutomationPage: React.FC = () => {
    const [loading, setLoading] = useState<string | null>(null);

    const handleTrigger = async (jobName: string, apiFunc: () => Promise<any>) => {
        setLoading(jobName);
        try {
            await apiFunc();
            message.success(`Successfully triggered ${jobName}`);
        } catch {
            message.error(`Failed to trigger ${jobName}`);
        } finally {
            setLoading(null);
        }
    };

    const jobs = [
        {
            name: 'Push Devices Cleanup',
            desc: 'Remove expired and inactive push notification tokens from the database.',
            icon: <DeleteOutlined />,
            action: cleanUpPushDevicesAPI,
            id: 'cleanup'
        },
        {
            name: 'Hourly Announcement Setup',
            desc: 'Scan for upcoming announcements and queue them for hourly delivery.',
            icon: <ScheduleOutlined />,
            action: setupHourlyAnnouncementAPI,
            id: 'hourly'
        },
        {
            name: 'Daily Schedule Setup',
            desc: 'Process system-wide tasks and schedules for the new day.',
            icon: <SyncOutlined />,
            action: setupDailyScheduleAPI,
            id: 'daily'
        },
        {
            name: 'News Tidy Up',
            desc: 'Archive old news articles and clean up daily news assets.',
            icon: <RocketOutlined />,
            action: setupDailyNewsTidyUpAPI,
            id: 'news'
        },
        {
            name: 'Send General Notifications',
            desc: 'Instantly process and send all queued system notifications.',
            icon: <NotificationOutlined />,
            action: sendNotificationAsyncAPI,
            id: 'notify'
        },
        {
            name: 'Send Announcement Notifications',
            desc: 'Process and deliver notifications specifically for queued announcements.',
            icon: <NotificationOutlined />,
            action: sendNotificationAnnouncementAPI,
            id: 'notify_ann'
        }
    ];

    return (
        <div className="fade-in">
            <div style={{ 
                marginBottom: 24, padding: '24px', background: 'var(--primary-gradient)', 
                borderRadius: 'var(--radius-lg)', color: '#fff', boxShadow: 'var(--shadow-lg)' 
            }}>
                <Title level={2} style={{ margin: 0, color: '#fff' }}>Automation & CronJobs</Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Manually trigger and monitor background system automation tasks</Text>
            </div>

            <Row gutter={[24, 24]}>
                <Col span={24}>
                    <Card title={<span><SyncOutlined /> System Background Tasks</span>} className="glass-effect" style={{ borderRadius: 16 }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={jobs}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Button 
                                            key="trigger"
                                            type="primary" 
                                            ghost 
                                            icon={<RocketOutlined />}
                                            loading={loading === item.id}
                                            onClick={() => handleTrigger(item.id, item.action)}
                                        >
                                            Trigger Now
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<div style={{ 
                                            padding: '8px', background: '#f1f5f9', borderRadius: '8px', 
                                            color: 'var(--primary-color)', fontSize: '20px' 
                                        }}>{item.icon}</div>}
                                        title={<Text strong>{item.name}</Text>}
                                        description={item.desc}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col span={24}>
                    <Card title={<span><ClockCircleOutlined /> Last Execution Status</span>} style={{ borderRadius: 16 }}>
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <ScheduleOutlined style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
                            <Title level={4}>No Recent Manual Executions</Title>
                            <Text type="secondary">System cronjobs run automatically in the background. Trigger them manually above if needed for debugging or immediate updates.</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AutomationPage;

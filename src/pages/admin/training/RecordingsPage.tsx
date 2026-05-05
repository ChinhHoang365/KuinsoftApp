import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Row, Col, 
    Typography, Card, Space, Tooltip, 
    Input, Tabs, Badge, Select, Avatar, List,
    Popconfirm, Modal, Form
} from 'antd';
import { 
    VideoCameraOutlined, 
    AudioOutlined, 
    CommentOutlined,
    PlayCircleOutlined,
    FolderOpenOutlined,
    PlusOutlined,
    CalendarOutlined,
    TeamOutlined,
    UserOutlined,
    CustomerServiceOutlined
} from '@ant-design/icons';
import { 
    getRecordCategoryListAPI, 
    getStudentRecordingByClassAPI,
    getClassRecordingByDateAPI 
} from '../../../services/admin/recording.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const RecordingsPage: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [recordings, setRecordings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeClass, setActiveClass] = useState<number | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res: any = await getRecordCategoryListAPI();
            setCategories(Array.isArray(res.data) ? res.data : []);
        } catch {
            message.error('Failed to load recording categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const fetchClassRecordings = async (classID: number) => {
        setLoading(true);
        try {
            const res: any = await getStudentRecordingByClassAPI(classID);
            setRecordings(Array.isArray(res.data) ? res.data : []);
            setActiveClass(classID);
        } catch {
            message.error('Failed to load recordings for this class');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { 
            title: 'Recording', 
            key: 'recording',
            render: (_: any, r: any) => (
                <Space size={12}>
                    <Avatar 
                        icon={r.type === 'video' ? <VideoCameraOutlined /> : <AudioOutlined />} 
                        style={{ backgroundColor: r.type === 'video' ? '#f43f5e' : '#6366f1' }} 
                    />
                    <Space direction="vertical" size={0}>
                        <Text strong>{r.recordingName || 'Audio Assignment'}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>
                            {dayjs(r.crtdDate).format('DD/MM/YYYY HH:mm')}
                        </Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Student', 
            dataIndex: 'studentName', 
            key: 'student',
            render: (v: string) => <Space><UserOutlined /> {v || 'Anonymous'}</Space>
        },
        { 
            title: 'Duration', 
            dataIndex: 'duration', 
            key: 'duration',
            render: (v: string) => <Tag color="default">{v || '02:45'}</Tag>
        },
        {
            title: 'Feedback',
            key: 'comment',
            render: (_: any, r: any) => (
                <Tooltip title={r.comment || 'No feedback yet'}>
                    <Badge dot={!r.comment}>
                        <Button type="text" icon={<CommentOutlined />} />
                    </Badge>
                </Tooltip>
            )
        },
        {
            title: 'Actions',
            key: 'action',
            render: () => (
                <Space>
                    <Button type="primary" size="small" icon={<PlayCircleOutlined />}>Play</Button>
                    <Popconfirm title="Delete?" onConfirm={() => {}}>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Class Recordings & Audio</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Review class lectures, student voice assignments, and oral test recordings</Text>
                </div>
                <Space>
                    <Button icon={<FolderOpenOutlined />}>Manage Categories</Button>
                    <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                        Upload Recording
                    </Button>
                </Space>
            </div>

            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Card title={<span><TeamOutlined /> Classes & Categories</span>} style={{ borderRadius: 16 }}>
                        <List
                            loading={loading}
                            dataSource={categories}
                            renderItem={(item: any) => (
                                <List.Item 
                                    className="hover-item" 
                                    onClick={() => fetchClassRecordings(item.classID || 1)}
                                    style={{ 
                                        cursor: 'pointer', borderRadius: 8, padding: '12px',
                                        backgroundColor: activeClass === (item.classID || 1) ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                                        border: activeClass === (item.classID || 1) ? '1px solid var(--primary-color)' : '1px solid transparent'
                                    }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar icon={<CustomerServiceOutlined />} style={{ backgroundColor: '#fbbf24' }} />}
                                        title={<Text strong>{item.categoryName || 'Recording Session'}</Text>}
                                        description={<Text type="secondary" style={{ fontSize: 12 }}>Class: {item.className || 'IELTS A2'}</Text>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    <Card style={{ borderRadius: 16 }}>
                        <Tabs defaultActiveKey="students" className="premium-tabs">
                            <TabPane tab={<span><AudioOutlined /> Student Submissions</span>} key="students">
                                <Table 
                                    columns={columns} 
                                    dataSource={recordings} 
                                    rowKey={(r, i) => i} 
                                    loading={loading} 
                                    className="premium-table"
                                    scroll={{ x: 800 }}
                                />
                            </TabPane>
                            <TabPane tab={<span><VideoCameraOutlined /> Class Archives</span>} key="classes">
                                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                                    <VideoCameraOutlined style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
                                    <Title level={4}>Lecture Archive</Title>
                                    <Text type="secondary">Recorded video sessions for classroom lectures will appear here.</Text>
                                    <div style={{ marginTop: 24 }}>
                                        <Button type="primary" icon={<CalendarOutlined />}>Select Date</Button>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default RecordingsPage;

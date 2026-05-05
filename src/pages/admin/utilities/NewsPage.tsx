import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Card, Row, Col, Typography, Avatar, Tooltip, 
    Image, Badge, Modal, Form, Input, Select, Divider 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    PictureOutlined,
    UserOutlined,
    CalendarOutlined,
    EyeOutlined,
    SyncOutlined,
    ReadOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import { 
    getAdminNewsListAPI, 
    deleteNewsAPI, 
    tidyUpNewsContentAPI 
} from '../../../services/admin/news.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const NewsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('grid');

    const fetchData = async () => {
        setLoading(true);
        try {
            const res: any = await getAdminNewsListAPI();
            const list = Array.isArray(res) ? res : (res.data || []);
            setData(list);
        } catch {
            message.error('Failed to load news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleTidyUp = async () => {
        try {
            await tidyUpNewsContentAPI();
            message.success('News content optimized and tidied up');
        } catch {
            message.error('Tidy up failed');
        }
    };

    const columns = [
        { 
            title: 'Article', 
            key: 'article',
            width: 400,
            render: (_: any, r: any) => (
                <Space size={12}>
                    <Image 
                        width={80} 
                        height={50} 
                        src={r.contentImage} 
                        fallback="https://placehold.co/600x400?text=No+Image"
                        style={{ borderRadius: 4, objectFit: 'cover' }}
                    />
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 14 }}>{r.title}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                            {dayjs(r.crtdDate).format('DD MMM YYYY')}
                        </Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Author', 
            dataIndex: 'crtdUser', 
            key: 'author',
            render: (v: string) => <Tag icon={<UserOutlined />}>{v}</Tag>
        },
        {
            title: 'Status', dataIndex: 'status', key: 'status',
            render: (v: string) => (
                <Tag color={v?.toLowerCase() === 'published' ? 'green' : 'orange'}>
                    {v || 'Draft'}
                </Tag>
            )
        },
        {
            title: 'Actions', key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="Preview">
                        <Button type="text" icon={<EyeOutlined />} />
                    </Tooltip>
                    <Button type="text" icon={<EditOutlined />} />
                    <Popconfirm title="Delete this article?" onConfirm={async () => { await deleteNewsAPI(record.newsID); fetchData(); }}>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>News & Communications</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Publish announcements, center news, and internal articles</Text>
                </div>
                <Space>
                    <Button icon={<SyncOutlined />} onClick={handleTidyUp}>Tidy Up Content</Button>
                    <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                        Create Article
                    </Button>
                </Space>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col span={24}>
                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
                        <Space>
                            <Button 
                                type={viewMode === 'grid' ? 'primary' : 'default'} 
                                onClick={() => setViewMode('grid')}
                                icon={<PictureOutlined />}
                            >
                                Gallery
                            </Button>
                            <Button 
                                type={viewMode === 'table' ? 'primary' : 'default'} 
                                onClick={() => setViewMode('table')}
                                icon={<ReadOutlined />}
                            >
                                List View
                            </Button>
                        </Space>
                    </div>

                    {viewMode === 'grid' ? (
                        <Row gutter={[24, 24]}>
                            {data.length > 0 ? data.map((item: any) => (
                                <Col xs={24} sm={12} md={8} lg={6} key={item.newsID}>
                                    <Card
                                        hoverable
                                        cover={
                                            <div style={{ height: 180, overflow: 'hidden' }}>
                                                <Image 
                                                    alt={item.title} 
                                                    src={item.contentImage} 
                                                    fallback="https://placehold.co/600x400?text=No+Image"
                                                    style={{ height: '100%', objectFit: 'cover' }}
                                                    preview={false}
                                                />
                                            </div>
                                        }
                                        actions={[
                                            <Tooltip title="Edit"><EditOutlined key="edit" /></Tooltip>,
                                            <Tooltip title="Preview"><EyeOutlined key="view" /></Tooltip>,
                                            <Tooltip title="Delete"><DeleteOutlined key="delete" style={{ color: '#ff4d4f' }} /></Tooltip>
                                        ]}
                                        style={{ borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}
                                    >
                                        <div style={{ height: 110 }}>
                                            <div style={{ marginBottom: 8 }}>
                                                <Tag color={item.status?.toLowerCase() === 'published' ? 'green' : 'orange'}>
                                                    {item.status || 'Draft'}
                                                </Tag>
                                            </div>
                                            <Title level={5} ellipsis={{ rows: 2 }} style={{ marginBottom: 8 }}>{item.title}</Title>
                                            <Space size="small" style={{ color: '#64748b', fontSize: 12 }}>
                                                <CalendarOutlined /> {dayjs(item.crtdDate).format('DD MMM')}
                                                <Divider type="vertical" />
                                                <UserOutlined /> {item.crtdUser}
                                            </Space>
                                        </div>
                                    </Card>
                                </Col>
                            )) : (
                                <Col span={24}>
                                    <Card style={{ textAlign: 'center', padding: '40px 0', borderRadius: 16 }}>
                                        <ReadOutlined style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
                                        <Title level={4}>No Articles Found</Title>
                                        <Button type="primary" icon={<PlusOutlined />} style={{ marginTop: 16 }}>Create Your First Article</Button>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    ) : (
                        <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                            <Table 
                                columns={columns} 
                                dataSource={data} 
                                rowKey="newsID" 
                                loading={loading} 
                                className="premium-table"
                                scroll={{ x: 1000 }}
                            />
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default NewsPage;

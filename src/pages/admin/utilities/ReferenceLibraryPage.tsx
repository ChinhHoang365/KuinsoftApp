import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, Modal, 
    Form, Input, Card, Row, Col, Typography, Breadcrumb, 
    Divider, Tooltip, Empty, Select 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    FolderOutlined, 
    FileTextOutlined,
    FolderAddOutlined,
    ArrowLeftOutlined,
    SearchOutlined,
    TagsOutlined,
    FilePdfOutlined,
    FileWordOutlined,
    LinkOutlined,
    BookOutlined
} from '@ant-design/icons';
import { 
    getAllFoldersByTypeAPI, 
    findReferencesByFolderAPI,
    createFolderAPI,
    createReferenceAPI,
    deleteReferenceAPI,
    deleteFolderAPI 
} from '../../../services/admin/reference.api';

const { Title, Text } = Typography;

const ReferenceLibraryPage: React.FC = () => {
    const [folders, setFolders] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentFolder, setCurrentFolder] = useState<any>(null);
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [docForm] = Form.useForm();

    const fetchFolders = async () => {
        setLoading(true);
        try {
            const res: any = await getAllFoldersByTypeAPI('document');
            const list = Array.isArray(res) ? res : (res.data || []);
            // For demo/simplicity, we show root level folders or filter based on structure
            setFolders(list);
        } catch {
            message.error('Failed to load folders');
        } finally {
            setLoading(false);
        }
    };

    const fetchDocuments = async (folderID: number) => {
        setLoading(true);
        try {
            const res: any = await findReferencesByFolderAPI(folderID);
            const list = Array.isArray(res) ? res : (res.data || []);
            setDocuments(list);
        } catch {
            message.error('Failed to load documents');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchFolders(); 
    }, []);

    const handleFolderClick = (folder: any) => {
        setCurrentFolder(folder);
        fetchDocuments(folder.libraryFolderID);
    };

    const handleBack = () => {
        setCurrentFolder(null);
        setDocuments([]);
        fetchFolders();
    };

    const handleCreateFolder = async () => {
        const values = await form.validateFields();
        try {
            await createFolderAPI({ ...values, libraryType: 'document', parentFolderID: currentFolder?.libraryFolderID || 0 });
            message.success('Folder created successfully');
            setIsFolderModalOpen(false);
            form.resetFields();
            fetchFolders();
        } catch { message.error('Failed to create folder'); }
    };

    const docColumns = [
        { 
            title: 'Title', 
            key: 'title',
            render: (_: any, r: any) => (
                <Space>
                    {r.fileType?.includes('pdf') ? <FilePdfOutlined style={{ color: '#ef4444' }} /> : 
                     r.fileType?.includes('doc') ? <FileWordOutlined style={{ color: '#3b82f6' }} /> : 
                     <FileTextOutlined style={{ color: '#6366f1' }} />}
                    <Text strong>{r.referenceName || r.title}</Text>
                </Space>
            )
        },
        { title: 'Type', dataIndex: 'libraryType', key: 'type', render: (t: string) => <Tag>{t}</Tag> },
        { 
            title: 'URL', 
            dataIndex: 'url', 
            key: 'url', 
            render: (url: string) => url ? <Button type="link" icon={<LinkOutlined />} href={url} target="_blank">Open Link</Button> : '-' 
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} />
                    <Popconfirm title="Delete this document?" onConfirm={() => {}}>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Reference Library</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Digital archive for curriculum, faculty resources, and student materials</Text>
                </div>
                <Space>
                    <Button icon={<FolderAddOutlined />} onClick={() => setIsFolderModalOpen(true)}>New Folder</Button>
                    <Button type="default" icon={<PlusOutlined />} onClick={() => setIsDocModalOpen(true)} style={{ fontWeight: 600 }}>
                        Upload Resource
                    </Button>
                </Space>
            </div>

            <Card style={{ borderRadius: 16, marginBottom: 24 }} className="glass-effect">
                <Breadcrumb style={{ marginBottom: 24, fontSize: '16px' }}>
                    <Breadcrumb.Item onClick={handleBack} style={{ cursor: 'pointer' }}>
                        <BookOutlined /> Library Root
                    </Breadcrumb.Item>
                    {currentFolder && <Breadcrumb.Item>{currentFolder.folderName}</Breadcrumb.Item>}
                </Breadcrumb>

                {!currentFolder ? (
                    <Row gutter={[16, 16]}>
                        {folders.length > 0 ? folders.map((f: any) => (
                            <Col xs={24} sm={12} md={8} lg={6} key={f.libraryFolderID}>
                                <Card 
                                    hoverable 
                                    onClick={() => handleFolderClick(f)}
                                    style={{ textAlign: 'center', borderRadius: 12, border: '1px solid var(--border-color)' }}
                                >
                                    <FolderOutlined style={{ fontSize: 48, color: '#fbbf24', marginBottom: 12 }} />
                                    <Title level={5} style={{ margin: 0 }}>{f.folderName}</Title>
                                    <Text type="secondary" style={{ fontSize: 12 }}>{f.libraryType}</Text>
                                </Card>
                            </Col>
                        )) : <Col span={24}><Empty description="No folders found" /></Col>}
                    </Row>
                ) : (
                    <div className="fade-in">
                        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>Back to Folders</Button>
                            <Search placeholder="Search in this folder..." style={{ width: 250 }} />
                        </div>
                        <Table 
                            columns={docColumns} 
                            dataSource={documents} 
                            rowKey="referenceID" 
                            loading={loading} 
                            className="premium-table"
                        />
                    </div>
                )}
            </Card>

            {/* Modals */}
            <Modal 
                title="Create New Folder" 
                open={isFolderModalOpen} 
                onOk={handleFolderClick} // Placeholder
                onCancel={() => setIsFolderModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setIsFolderModalOpen(false)}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={handleCreateFolder}>Create Folder</Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="folderName" label="Folder Name" rules={[{ required: true }]}>
                        <Input placeholder="e.g., IELTS Resources 2024" />
                    </Form.Item>
                    <Form.Item name="libraryType" label="Category" initialValue="document">
                        <Select>
                            <Select.Option value="document">Document</Select.Option>
                            <Select.Option value="video">Video</Select.Option>
                            <Select.Option value="exam">Exam Paper</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ReferenceLibraryPage;

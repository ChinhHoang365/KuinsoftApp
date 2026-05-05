import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, DatePicker, Input, message, Tag, Popconfirm, Typography, Card, Row, Col } from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined, 
    CheckCircleOutlined, 
    CloseCircleOutlined,
    SearchOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {
    searchTeacherAbsence,
    assignStaffAbsence,
    updateStaffAbsence,
    deleteStaffAbsence,
    approveOrRejectAbsence
} from '../../../services/admin/administration.api';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Text, Title } = Typography;

const StaffAbsence: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isApproveModalVisible, setIsApproveModalVisible] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<any>(null);
    const [form] = Form.useForm();
    const [approveForm] = Form.useForm();
    const [editingId, setEditingId] = useState<number | null>(null);

    const fetchData = async (from?: string, to?: string) => {
        setLoading(true);
        try {
            // Default to current month if no range provided
            const fromTime = from || dayjs().startOf('month').toISOString();
            const toTime = to || dayjs().endOf('month').toISOString();
            
            const res: any = await searchTeacherAbsence(fromTime, toTime);
            setData(Array.isArray(res) ? res : (res.data || []));
        } catch (error) {
            message.error("Failed to load absences");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSearch = (values: any) => {
        if (values.dateRange) {
            fetchData(values.dateRange[0].toISOString(), values.dateRange[1].toISOString());
        } else {
            fetchData();
        }
    };

    const handleAdd = () => {
        setEditingId(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEdit = (record: any) => {
        setEditingId(record.recordID);
        form.setFieldsValue({
            dateRange: [dayjs(record.fromTime), dayjs(record.toTime)],
            reason: record.reason,
            notes: record.notes,
            teacherID: record.teacherID
        });
        setIsModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteStaffAbsence(id);
            message.success("Absence record deleted");
            fetchData();
        } catch (error) {
            message.error("Failed to delete record");
        }
    };

    const handleOpenApprove = (record: any) => {
        setSelectedRecord(record);
        approveForm.resetFields();
        setIsApproveModalVisible(true);
    };

    const handleApproveAction = async (status: 'Approved' | 'Rejected') => {
        try {
            const values = await approveForm.validateFields();
            await approveOrRejectAbsence(selectedRecord.recordID, status, values.notes);
            message.success(`Request ${status.toLowerCase()} successfully`);
            setIsApproveModalVisible(false);
            fetchData();
        } catch (error) {
            message.error("Action failed");
        }
    };

    const handleModalOk = () => {
        form.validateFields().then(async (values) => {
            const payload = {
                fromTime: values.dateRange[0].toISOString(),
                toTime: values.dateRange[1].toISOString(),
                reason: values.reason,
                notes: values.notes,
                teacherID: values.teacherID || 0 // Assuming 0 for current user if not specified
            };

            try {
                if (editingId) {
                    await updateStaffAbsence({ recordID: editingId, ...payload });
                    message.success("Updated successfully");
                } else {
                    await assignStaffAbsence(payload);
                    message.success("Absence assigned successfully");
                }
                setIsModalVisible(false);
                fetchData();
            } catch (error) {
                message.error("Operation failed");
            }
        });
    };

    const columns = [
        {
            title: 'Teacher ID',
            dataIndex: 'teacherID',
            key: 'teacherID',
            width: 100,
        },
        {
            title: 'Absence Period',
            key: 'period',
            render: (_: any, record: any) => (
                <Space direction="vertical" size={0}>
                    <Text size="small" type="secondary">From: {dayjs(record.fromTime).format('DD/MM/YYYY HH:mm')}</Text>
                    <Text size="small" type="secondary">To: {dayjs(record.toTime).format('DD/MM/YYYY HH:mm')}</Text>
                </Space>
            )
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'gold';
                if (status === 'Approved') color = 'green';
                if (status === 'Rejected') color = 'red';
                return <Tag color={color} style={{ borderRadius: 4, fontWeight: 600 }}>{status?.toUpperCase() || 'PENDING'}</Tag>;
            }
        },
        {
            title: 'Created By',
            dataIndex: 'crtdUser',
            key: 'crtdUser',
            render: (user: string, record: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong style={{ fontSize: 12 }}>{user}</Text>
                    <Text type="secondary" style={{ fontSize: 10 }}>{dayjs(record.crtdDate).format('DD/MM HH:mm')}</Text>
                </Space>
            )
        },
        {
            title: 'Actions',
            key: 'action',
            fixed: 'right' as const,
            width: 180,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm title="Delete this record?" onConfirm={() => handleDelete(record.recordID)}>
                        <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                    <Button 
                        type="text" 
                        style={{ color: '#6366f1' }} 
                        icon={<CheckCircleOutlined />} 
                        onClick={() => handleOpenApprove(record)} 
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="fade-in">
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 24,
                padding: '24px',
                background: 'var(--primary-gradient)',
                borderRadius: 'var(--radius-lg)',
                color: '#fff',
                boxShadow: 'var(--shadow-lg)'
            }}>
                <div>
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Staff Absence</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Manage teacher leave requests and approvals</Text>
                </div>
                <Button 
                    type="default" 
                    icon={<PlusOutlined />} 
                    size="large"
                    onClick={handleAdd}
                    style={{ borderRadius: 10, fontWeight: 600, border: 'none' }}
                >
                    Assign Absence
                </Button>
            </div>

            <Card className="glass-effect" style={{ marginBottom: 24, borderRadius: 16 }}>
                <Form onFinish={onSearch} layout="vertical">
                    <Row gutter={24} align="bottom">
                        <Col xs={24} md={18}>
                            <Form.Item name="dateRange" label={<Text strong>Filter by Date Range</Text>}>
                                <RangePicker showTime style={{ width: '100%', borderRadius: 8 }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={6}>
                            <Form.Item>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    icon={<SearchOutlined />} 
                                    block
                                    style={{ height: 40, borderRadius: 8 }}
                                >
                                    Filter Results
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>

            <div style={{ background: '#fff', padding: 12, borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="recordID" 
                    loading={loading}
                    scroll={{ x: 1000 }}
                    pagination={{ pageSize: 10 }}
                />
            </div>

            {/* Create/Edit Modal */}
            <Modal
                title={editingId ? "Edit Absence Record" : "New Absence Assignment"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                destroyOnClose
                width={600}
                okText="Save Record"
            >
                <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
                    <Form.Item name="teacherID" label="Teacher ID">
                        <Input placeholder="Enter teacher ID" />
                    </Form.Item>
                    <Form.Item 
                        name="dateRange" 
                        label="Absence Duration" 
                        rules={[{ required: true, message: 'Please select duration' }]}
                    >
                        <RangePicker showTime style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item name="reason" label="Primary Reason" rules={[{ required: true }]}>
                        <Input placeholder="e.g. Medical leave, Personal business" />
                    </Form.Item>
                    <Form.Item name="notes" label="Additional Notes">
                        <TextArea rows={4} placeholder="Any extra details for the management..." />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Approval Modal */}
            <Modal
                title="Review Absence Request"
                open={isApproveModalVisible}
                onCancel={() => setIsApproveModalVisible(false)}
                footer={[
                    <Button key="reject" danger icon={<CloseCircleOutlined />} onClick={() => handleApproveAction('Rejected')}>
                        Reject
                    </Button>,
                    <Button key="approve" type="primary" icon={<CheckCircleOutlined />} onClick={() => handleApproveAction('Approved')}>
                        Approve
                    </Button>
                ]}
            >
                <div style={{ marginBottom: 20 }}>
                    <Space direction="vertical">
                        <Text type="secondary">Reviewing request for Record ID: <Text strong>{selectedRecord?.recordID}</Text></Text>
                        <Text><InfoCircleOutlined /> Reason: {selectedRecord?.reason}</Text>
                    </Space>
                </div>
                <Form form={approveForm} layout="vertical">
                    <Form.Item name="notes" label="Approval/Rejection Comments">
                        <TextArea rows={3} placeholder="Add a note to explain your decision..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default StaffAbsence;

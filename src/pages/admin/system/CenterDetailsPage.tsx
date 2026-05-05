import React, { useEffect, useState } from 'react';
import { 
    Table, 
    Tag, 
    message, 
    Card, 
    Row, 
    Col, 
    Statistic, 
    Typography, 
    Descriptions, 
    Divider, 
    Space,
    Empty
} from 'antd';
import { 
    EnvironmentOutlined, 
    MailOutlined, 
    PhoneOutlined, 
    GlobalOutlined,
    TeamOutlined,
    BankOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { getCentersList, getCenterDetails } from '../../../services/admin/center.api';

const { Text, Title } = Typography;

const CenterDetailsPage: React.FC = () => {
    const [centers, setCenters] = useState<any[]>([]);
    const [selectedCenter, setSelectedCenter] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);

    const fetchCenters = async () => {
        setLoading(true);
        try {
            const res: any = await getCentersList();
            const data = Array.isArray(res) ? res : (res.data || []);
            setCenters(data);
            if (data.length > 0) {
                handleSelectCenter(data[0]);
            }
        } catch {
            message.error('Failed to load centers');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectCenter = async (center: any) => {
        setDetailLoading(true);
        try {
            const res: any = await getCenterDetails(center.locationID);
            const data = Array.isArray(res) ? res[0] : (res.data?.[0] || res);
            setSelectedCenter(data);
        } catch {
            message.error('Failed to load center details');
        } finally {
            setDetailLoading(false);
        }
    };

    useEffect(() => { fetchCenters(); }, []);

    const columns = [
        { 
            title: 'Center Name', 
            dataIndex: 'location', 
            key: 'location',
            render: (text: string, record: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong style={{ color: selectedCenter?.locationID === record.locationID ? 'var(--primary-color)' : 'inherit' }}>
                        {text}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{record.locationCode}</Text>
                </Space>
            )
        },
        { 
            title: 'Status', 
            dataIndex: 'status', 
            key: 'status',
            width: 100,
            render: (v: any) => <Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>
        },
    ];

    const roleColumns = [
        { title: 'User Group', dataIndex: 'groupName', key: 'groupName' },
        { 
            title: 'Count', 
            dataIndex: 'userCount', 
            key: 'userCount',
            render: (count: number) => <Tag color="blue" style={{ borderRadius: 10 }}>{count} Users</Tag>
        },
    ];

    return (
        <div className="fade-in">
            <div style={{ 
                marginBottom: 24, padding: '24px', background: 'var(--primary-gradient)', 
                borderRadius: 'var(--radius-lg)', color: '#fff', boxShadow: 'var(--shadow-lg)' 
            }}>
                <Title level={2} style={{ margin: 0, color: '#fff' }}>Center Network</Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Manage and monitor all branch locations and access roles</Text>
            </div>

            <Row gutter={24}>
                {/* Center List Panel */}
                <Col xs={24} lg={8}>
                    <Card 
                        title={<Space><BankOutlined /> <Text strong>Branches</Text></Space>} 
                        className="glass-effect"
                        style={{ borderRadius: 16, height: '100%' }}
                    >
                        <Table 
                            columns={columns} 
                            dataSource={centers} 
                            rowKey="locationID" 
                            loading={loading} 
                            pagination={false}
                            onRow={(record) => ({
                                onClick: () => handleSelectCenter(record),
                                style: { cursor: 'pointer' }
                            })}
                            className="premium-table"
                        />
                    </Card>
                </Col>

                {/* Detail Panel */}
                <Col xs={24} lg={16}>
                    {selectedCenter ? (
                        <Card 
                            loading={detailLoading}
                            style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)', border: 'none' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Space direction="vertical" size={0}>
                                    <Title level={3} style={{ margin: 0 }}>{selectedCenter.location}</Title>
                                    <Text type="secondary">{selectedCenter.address}</Text>
                                </Space>
                                <Tag color={selectedCenter.status ? 'green' : 'red'} style={{ fontSize: 14, padding: '4px 12px' }}>
                                    {selectedCenter.status ? 'ACTIVE' : 'INACTIVE'}
                                </Tag>
                            </div>

                            <Divider />

                            <Descriptions title="Contact Information" column={{ xs: 1, sm: 2 }}>
                                <Descriptions.Item label={<Space><MailOutlined /> Email</Space>}>
                                    <Text copyable>{selectedCenter.email}</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><PhoneOutlined /> Phone</Space>}>
                                    {selectedCenter.tel}
                                </Descriptions.Item>
                                <Descriptions.Item label={<Space><GlobalOutlined /> Location Name (VN)</Space>}>
                                    {selectedCenter.locationVN}
                                </Descriptions.Item>
                                <Descriptions.Item label="Short Name">
                                    {selectedCenter.shortName}
                                </Descriptions.Item>
                            </Descriptions>

                            <Divider />

                            <Descriptions title="System Configuration" column={{ xs: 1, sm: 2 }}>
                                <Descriptions.Item label="Student Code Prefix">
                                    <Tag color="orange">{selectedCenter.prefixStudentCode}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="Certificate Prefix">
                                    <Tag color="purple">{selectedCenter.prefixCertificate}</Tag>
                                </Descriptions.Item>
                            </Descriptions>

                            <Divider />

                            <Title level={4} style={{ marginBottom: 16 }}><TeamOutlined /> User Distribution</Title>
                            <Table 
                                columns={roleColumns} 
                                dataSource={selectedCenter.roles} 
                                rowKey="groupID" 
                                pagination={false}
                                size="small"
                                className="premium-table"
                            />
                        </Card>
                    ) : (
                        <Card style={{ borderRadius: 16, textAlign: 'center', padding: 40 }}>
                            <Empty description="Select a center to view details" />
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default CenterDetailsPage;

import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Modal, Form, Input, InputNumber, DatePicker, Select,
    Card, Row, Col, Statistic, Typography, Tabs, Tooltip
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined,
    WalletOutlined,
    HistoryOutlined,
    DollarCircleOutlined,
    PercentageOutlined,
    CreditCardOutlined,
    SearchOutlined,
    ExportOutlined
} from '@ant-design/icons';
import { 
    getPaymentsAPI, 
    getUserWalletsAPI, 
    getStudentWalletsAPI 
} from '../../../services/admin/finance.api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const PaymentsPage: React.FC = () => {
    const [payments, setPayments] = useState<any[]>([]);
    const [wallets, setWallets] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form] = Form.useForm();

    const fetchData = async () => {
        setLoading(true);
        try {
            const res: any = await getPaymentsAPI();
            // User JSON shows nested { payments: [] }
            const list = res?.payments || (Array.isArray(res) ? res : (res.data || []));
            setPayments(list);
        } catch {
            message.error('Failed to load payments');
        } finally {
            setLoading(false);
        }
    };

    const fetchWallets = async () => {
        setLoading(true);
        try {
            const res: any = await getStudentWalletsAPI();
            const list = Array.isArray(res) ? res : (res.data || []);
            setWallets(list);
        } catch {
            message.error('Failed to load wallets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchData(); 
        fetchWallets();
    }, []);

    const paymentColumns = [
        { 
            title: 'Transaction', 
            key: 'transaction',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{r.descr || 'Tuition Payment'}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>ID: #{r.paymentID}</Text>
                </Space>
            )
        },
        { 
            title: 'Date', 
            dataIndex: 'paymentDate', 
            key: 'date',
            render: (v: string) => dayjs(v).format('DD/MM/YYYY HH:mm')
        },
        { 
            title: 'Type', 
            dataIndex: 'paymentType', 
            key: 'type',
            render: (v: string) => <Tag color="blue">{v}</Tag>
        },
        { 
            title: 'Total Amount', 
            dataIndex: 'totAmt', 
            key: 'totAmt',
            render: (v: number) => v?.toLocaleString()
        },
        { 
            title: 'Discount', 
            dataIndex: 'totDiscountAmt', 
            key: 'discount',
            render: (v: number) => <Text type="danger">-{v?.toLocaleString()}</Text>
        },
        { 
            title: 'Actual Paid', 
            dataIndex: 'totActualAmt', 
            key: 'actual',
            render: (v: number) => <Text strong type="success">{v?.toLocaleString()}</Text>
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} />
                    <Tooltip title="View Receipt">
                        <Button type="text" icon={<CreditCardOutlined />} />
                    </Tooltip>
                </Space>
            )
        }
    ];

    const walletColumns = [
        { title: 'User / Student', dataIndex: 'fullName', key: 'name', render: (v: string, r: any) => <Text strong>{v || r.userName}</Text> },
        { title: 'Account Type', dataIndex: 'accountType', key: 'type' },
        { 
            title: 'Balance', 
            dataIndex: 'balance', 
            key: 'balance',
            render: (v: number) => <Title level={5} style={{ margin: 0, color: '#10b981' }}>{v?.toLocaleString()}</Title>
        },
        { title: 'Last Updated', dataIndex: 'lUpdDate', key: 'updated', render: (v: string) => dayjs(v).format('DD/MM/YYYY') },
        {
            title: 'Actions',
            key: 'action',
            render: () => <Button type="link">View History</Button>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Financial Management</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Monitor revenue, student tuition, and digital wallets</Text>
                </div>
                <Space>
                    <Button icon={<ExportOutlined />}>Financial Report</Button>
                    <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                        Create Transaction
                    </Button>
                </Space>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Gross Revenue" value={payments.reduce((acc, cur) => acc + (cur.totAmt || 0), 0)} prefix={<DollarCircleOutlined />} valueStyle={{ color: 'var(--primary-color)' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Discounts" value={payments.reduce((acc, cur) => acc + (cur.totDiscountAmt || 0), 0)} prefix={<PercentageOutlined />} valueStyle={{ color: '#ef4444' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Net Income" value={payments.reduce((acc, cur) => acc + (cur.totActualAmt || 0), 0)} prefix={<CreditCardOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Search placeholder="Search transactions..." onSearch={fetchData} style={{ marginTop: 10 }} allowClear prefix={<SearchOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Tabs defaultActiveKey="history" className="premium-tabs">
                    <TabPane tab={<span><HistoryOutlined /> Transaction History</span>} key="history">
                        <Table 
                            columns={paymentColumns} 
                            dataSource={payments} 
                            rowKey="paymentID" 
                            loading={loading} 
                            className="premium-table"
                            scroll={{ x: 1000 }}
                        />
                    </TabPane>
                    <TabPane tab={<span><WalletOutlined /> User Wallets</span>} key="wallets">
                        <Table 
                            columns={walletColumns} 
                            dataSource={wallets} 
                            rowKey={(r, i) => i} 
                            loading={loading} 
                            className="premium-table"
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default PaymentsPage;

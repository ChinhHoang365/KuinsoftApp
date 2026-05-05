import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Row, Col, 
    Typography, Card, Statistic, Space, Tooltip, 
    Input, Tabs, Badge, Progress, Divider
} from 'antd';
import { 
    InboxOutlined, 
    SwapOutlined, 
    FileTextOutlined, 
    ExportOutlined,
    SearchOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    ShoppingOutlined,
    BarcodeOutlined,
    DatabaseOutlined
} from '@ant-design/icons';
import { 
    getInventoryDetailByPOAPI, 
    getInventoryItemStatementAPI,
    getTransferDataAPI 
} from '../../../services/admin/inventory.api';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

const InventoryPage: React.FC = () => {
    const [inventory, setInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res: any = await getInventoryDetailByPOAPI();
            const list = Array.isArray(res) ? res : (res.data || []);
            setInventory(list);
        } catch {
            message.error('Failed to load inventory data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const columns = [
        { 
            title: 'Product', 
            key: 'product',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{r.description}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>
                        <BarcodeOutlined /> {r.productCode} | PO: {r.purOrdID}
                    </Text>
                </Space>
            )
        },
        { title: 'Vendor', dataIndex: 'vendorCode', key: 'vendor' },
        { 
            title: 'Inventory Flow', 
            key: 'flow',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={2}>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Tooltip title="Received"><Tag color="green">+{r.qtyRcvd}</Tag></Tooltip>
                        <Tooltip title="Transferred Out"><Tag color="volcano">-{r.transfOutQty}</Tag></Tooltip>
                        <Tooltip title="Returned"><Tag color="red">-{r.qtyReturned}</Tag></Tooltip>
                    </div>
                </Space>
            )
        },
        { 
            title: 'Cost', 
            dataIndex: 'unitCost', 
            key: 'cost',
            render: (v: number) => <Text strong>{v?.toLocaleString()}</Text>
        },
        { 
            title: 'Stock Status', 
            key: 'status',
            render: (_: any, r: any) => {
                const stockPercent = (r.remainQty / r.totQtyOrd) * 100;
                let statusColor = '#10b981';
                if (stockPercent < 20) statusColor = '#ef4444';
                else if (stockPercent < 50) statusColor = '#f59e0b';

                return (
                    <div style={{ width: 120 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <Text strong style={{ fontSize: 14 }}>{r.remainQty} / {r.totQtyOrd}</Text>
                            <Text type="secondary" style={{ fontSize: 11 }}>{r.unit}</Text>
                        </div>
                        <Progress 
                            percent={stockPercent} 
                            showInfo={false} 
                            strokeColor={statusColor} 
                            size="small" 
                        />
                    </div>
                );
            }
        },
        {
            title: 'Value',
            key: 'value',
            render: (_: any, r: any) => <Text strong type="success">{(r.remainQty * r.unitCost)?.toLocaleString()}</Text>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Logistics & Book Storage</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Manage curriculum inventory, branch transfers, and procurement orders</Text>
                </div>
                <Space>
                    <Button icon={<ExportOutlined />}>Export Report</Button>
                    <Button type="default" size="large" icon={<ShoppingOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                        New Purchase Order
                    </Button>
                </Space>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Stock Value" value={inventory.reduce((acc, cur) => acc + (cur.remainQty * cur.unitCost), 0)} prefix={<DatabaseOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Low Stock Items" value={inventory.filter(i => (i.remainQty / i.totQtyOrd) < 0.2).length} prefix={<ArrowDownOutlined />} valueStyle={{ color: '#ef4444' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Pending Transfers" value={0} prefix={<SwapOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Search placeholder="Search inventory..." onSearch={fetchData} style={{ marginTop: 10 }} allowClear prefix={<SearchOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16 }}>
                <Tabs defaultActiveKey="inventory" className="premium-tabs">
                    <TabPane tab={<span><InboxOutlined /> Inventory Stock</span>} key="inventory">
                        <Table 
                            columns={columns} 
                            dataSource={inventory} 
                            rowKey={(r, i) => i} 
                            loading={loading} 
                            className="premium-table"
                            scroll={{ x: 1100 }}
                        />
                    </TabPane>
                    <TabPane tab={<span><SwapOutlined /> Branch Transfers</span>} key="transfers">
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <SwapOutlined style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
                            <Title level={4}>Inter-center Logistics</Title>
                            <Text type="secondary">Track and manage book transfers between different learning centers.</Text>
                        </div>
                    </TabPane>
                    <TabPane tab={<span><FileTextOutlined /> Material Checklists</span>} key="checklists">
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <FileTextOutlined style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
                            <Title level={4}>Class Distribution</Title>
                            <Text type="secondary">Monitor textbook delivery status for specific courses and classes.</Text>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    );
};

export default InventoryPage;

import React, { useState, useEffect } from 'react';
import { 
    Card, Form, InputNumber, DatePicker, Button, Table, Tabs, 
    message, Select, Statistic, Row, Col, Typography, Tag, Space, Divider 
} from 'antd';
import { 
    BarChartOutlined, 
    DollarCircleOutlined, 
    TeamOutlined, 
    FileDoneOutlined,
    SearchOutlined,
    PieChartOutlined,
    RiseOutlined,
    HistoryOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import {
    getListStudentRegisteredAPI,
    getRevenueByLocationAndYearAPI,
    getOutstandingPaymentReportAPI,
    getUpComingBirthdayAPI,
    getKPISalesAPI,
    getDailyCashAPI
} from '../../../services/admin/reports.api';
import dayjs from 'dayjs';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;

const ReportsPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [summary, setSummary] = useState<any>({});
    const [activeCategory, setActiveCategory] = useState('edu');

    // Default Filters
    const [locationID] = useState(Number(localStorage.getItem('locationId') || 1));

    const handleFetchReport = async (reportType: string, values: any) => {
        setLoading(true);
        try {
            let res: any;
            switch(reportType) {
                case 'registered':
                    res = await getListStudentRegisteredAPI({ locationID: values.locationID || locationID });
                    break;
                case 'revenue':
                    res = await getRevenueByLocationAndYearAPI(values.locationID || locationID, values.year || dayjs().year());
                    break;
                case 'kpi':
                    res = await getKPISalesAPI({ locationID: values.locationID || locationID });
                    break;
                case 'cash':
                    const from = values.range?.[0]?.toISOString();
                    const to = values.range?.[1]?.toISOString();
                    res = await getDailyCashAPI(values.locationID || locationID, from, to);
                    break;
                default:
                    return;
            }
            const list = Array.isArray(res) ? res : (res.data || []);
            setData(list);
            
            // Basic summary calculation
            if (reportType === 'registered') {
                const totalTuition = list.reduce((acc: number, cur: any) => acc + (cur.tuitionFee || 0), 0);
                const totalPaid = list.reduce((acc: number, cur: any) => acc + (cur.paidFee || 0), 0);
                setSummary({ totalTuition, totalPaid, count: list.length });
            }
        } catch {
            message.error('Failed to generate report');
        } finally {
            setLoading(false);
        }
    };

    const registeredColumns = [
        { 
            title: 'Student', 
            key: 'student', 
            fixed: 'left' as const,
            width: 200,
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{r.studentName}</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>{r.studentCode}</Text>
                </Space>
            )
        },
        { 
            title: 'Class Info', 
            key: 'class', 
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text strong style={{ color: 'var(--primary-color)' }}>{r.classCode}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{r.classTime} ({r.weekDay})</Text>
                </Space>
            )
        },
        { 
            title: 'Financials', 
            key: 'finance',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text size="small">Tuition: <Text strong>{r.tuitionFee?.toLocaleString()}</Text></Text>
                    <Text size="small">Paid: <Text type="success">{r.paidFee?.toLocaleString()}</Text></Text>
                    {r.outStanding > 0 && <Text size="small" type="danger">Owed: {r.outStanding?.toLocaleString()}</Text>}
                </Space>
            )
        },
        { 
            title: 'Period', 
            key: 'period',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text type="secondary" style={{ fontSize: 11 }}>Start: {dayjs(r.clsStartDate).format('DD/MM/YY')}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>End: {dayjs(r.clsEndDate).format('DD/MM/YY')}</Text>
                </Space>
            )
        },
        { 
            title: 'Status', 
            dataIndex: 'registrationStatus', 
            key: 'status',
            render: (s: string) => <Tag color={s?.includes('Active') ? 'green' : 'orange'}>{s}</Tag>
        },
    ];

    const revenueColumns = [
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Programme', dataIndex: 'programme', key: 'programme' },
        { title: 'Total Revenue', dataIndex: 'totRev', key: 'totRev', render: (v: number) => <Text strong>{v?.toLocaleString()}</Text> },
        { title: 'Target', dataIndex: 'toTtarget', key: 'toTtarget', render: (v: number) => v?.toLocaleString() },
        { 
            title: 'Achieved %', 
            key: 'percent', 
            render: (_: any, r: any) => {
                const p = (r.totArchive / r.toTtarget) * 100;
                return <Tag color={p >= 100 ? 'green' : 'orange'}>{p.toFixed(1)}%</Tag>
            }
        },
    ];

    return (
        <div className="fade-in">
            <div style={{ 
                marginBottom: 24, padding: '24px', background: 'var(--primary-gradient)', 
                borderRadius: 'var(--radius-lg)', color: '#fff', boxShadow: 'var(--shadow-lg)' 
            }}>
                <Title level={2} style={{ margin: 0, color: '#fff' }}>Reporting Hub</Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Advanced analytics and operational insights for center management</Text>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col span={24}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Tabs activeKey={activeCategory} onChange={setActiveCategory} type="line" className="premium-tabs">
                            <TabPane tab={<span><FileDoneOutlined /> Education & Enrollment</span>} key="edu">
                                <Form layout="inline" onFinish={(v) => handleFetchReport('registered', v)} style={{ marginBottom: 24 }}>
                                    <Form.Item name="locationID" label="Location" initialValue={locationID}>
                                        <InputNumber style={{ borderRadius: 8 }} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={loading} style={{ borderRadius: 8 }}>
                                            Generate Student List
                                        </Button>
                                    </Form.Item>
                                </Form>
                                
                                {summary.count > 0 && (
                                    <Row gutter={16} style={{ marginBottom: 24 }}>
                                        <Col span={8}><Statistic title="Total Students" value={summary.count} prefix={<TeamOutlined />} /></Col>
                                        <Col span={8}><Statistic title="Total Revenue" value={summary.totalTuition} prefix={<DollarCircleOutlined />} /></Col>
                                        <Col span={8}><Statistic title="Total Collected" value={summary.totalPaid} prefix={<RiseOutlined />} valueStyle={{ color: '#10b981' }} /></Col>
                                    </Row>
                                )}
                                
                                <Table 
                                    columns={registeredColumns} 
                                    dataSource={data} 
                                    rowKey="registrationID" 
                                    loading={loading} 
                                    scroll={{ x: 1000 }} 
                                    className="premium-table"
                                />
                            </TabPane>

                            <TabPane tab={<span><DollarCircleOutlined /> Financial Audit</span>} key="finance">
                                <Form layout="inline" onFinish={(v) => handleFetchReport('revenue', v)} style={{ marginBottom: 24 }}>
                                    <Form.Item name="locationID" label="Location" initialValue={locationID}>
                                        <InputNumber style={{ borderRadius: 8 }} />
                                    </Form.Item>
                                    <Form.Item name="year" label="Year" initialValue={dayjs().year()}>
                                        <InputNumber style={{ borderRadius: 8 }} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" icon={<PieChartOutlined />} loading={loading} style={{ borderRadius: 8 }}>
                                            View Revenue
                                        </Button>
                                    </Form.Item>
                                </Form>
                                <Table columns={revenueColumns} dataSource={data} rowKey={(r, i) => i} loading={loading} className="premium-table" />
                            </TabPane>

                            <TabPane tab={<span><RiseOutlined /> Performance & KPI</span>} key="kpi">
                                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                    <HistoryOutlined style={{ fontSize: 48, color: '#d1d5db', marginBottom: 16 }} />
                                    <Title level={4}>Performance Dashboard</Title>
                                    <Text type="secondary">Select a report from the sales and KPI category to begin analysis.</Text>
                                    <div style={{ marginTop: 24 }}>
                                        <Button type="primary" onClick={() => handleFetchReport('kpi', {})} loading={loading}>
                                            Load Sales Overview
                                        </Button>
                                    </div>
                                </div>
                                {data.length > 0 && <Table columns={revenueColumns} dataSource={data} loading={loading} className="premium-table" />}
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ReportsPage;

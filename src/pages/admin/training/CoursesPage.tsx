import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Popconfirm, 
    Card, Row, Col, Statistic, Typography, Avatar, 
    Tooltip, Badge, Progress, Select, Form, Input 
} from 'antd';
import { 
    PlusOutlined, 
    EditOutlined, 
    DeleteOutlined,
    BookOutlined,
    AppstoreOutlined,
    DollarOutlined,
    ClockCircleOutlined,
    CheckCircleOutlined,
    ThunderboltOutlined,
    SearchOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { 
    getDepartmentsAPI, 
    getProgrammesByDeptAPI 
} from '../../../services/admin/academic.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const CoursesPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedDept, setSelectedDept] = useState<number | null>(null);

    const fetchMaster = async () => {
        try {
            const res = await getDepartmentsAPI();
            setDepartments(Array.isArray(res.data) ? res.data : []);
        } catch {}
    };

    const fetchProgrammes = async (deptID: number) => {
        setLoading(true);
        try {
            const res = await getProgrammesByDeptAPI(deptID);
            setData(Array.isArray(res.data) ? res.data : []);
        } catch {
            message.error('Curriculum database error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMaster(); }, []);

    const columns = [
        { 
            title: 'Curriculum Component', 
            key: 'programme',
            width: 350,
            render: (_: any, r: any) => (
                <Space size={12}>
                    <Avatar shape="square" size="large" icon={<BookOutlined />} style={{ backgroundColor: 'var(--primary-color)' }} />
                    <Space direction="vertical" size={0}>
                        <Text strong style={{ fontSize: 14 }}>{r.programme}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{r.programmeCode} • {r.programmeVN}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Logistics', 
            key: 'logistics',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}><ClockCircleOutlined /> {r.duration || 48} Hours</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}><DollarOutlined /> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(r.schoolFee || 4500000)}</Text>
                </Space>
            )
        },
        { 
            title: 'Inventory', 
            key: 'inventory',
            render: () => (
                <div style={{ width: 120 }}>
                    <Text style={{ fontSize: 11 }}>8/12 Classes Active</Text>
                    <Progress percent={66} size="small" showInfo={false} strokeColor="var(--primary-color)" />
                </div>
            )
        },
        { 
            title: 'Status', 
            dataIndex: 'isActive', 
            key: 'status',
            render: (v: boolean) => (
                <Badge status={v ? 'success' : 'default'} text={<Tag color={v ? 'green' : 'default'}>{v ? 'Operational' : 'Deprecated'}</Tag>} />
            )
        },
        {
            title: 'Actions', 
            key: 'action',
            render: () => (
                <Space>
                    <Button type="text" icon={<EditOutlined />} />
                    <Button type="text" danger icon={<DeleteOutlined />} />
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Curriculum Blueprint</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Architect departmental programs, manage pedagogical assets, and audit educational pricing</Text>
                </div>
                <Select 
                    placeholder="Select Department" 
                    style={{ width: 250 }} 
                    onChange={v => { setSelectedDept(v); fetchProgrammes(v); }}
                >
                    {departments.map(d => <Option key={d.departmentID} value={d.departmentID}>{d.department}</Option>)}
                </Select>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Programs" value={data.length} prefix={<AppstoreOutlined />} valueStyle={{ color: 'var(--primary-color)' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Avg Duration" value={52} suffix="h" prefix={<ClockCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Intakes" value={14} prefix={<TeamOutlined />} valueStyle={{ color: '#6366f1' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Revenue Power" value={94} suffix="%" prefix={<ThunderboltOutlined />} valueStyle={{ color: '#fbbf24' }} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                {selectedDept ? (
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        rowKey="programmeID" 
                        loading={loading} 
                        className="premium-table"
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <BookOutlined style={{ fontSize: 64, color: '#e2e8f0', marginBottom: 16 }} />
                        <Title level={4} style={{ color: '#94a3b8' }}>Please select a department to audit the curriculum blueprint</Title>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default CoursesPage;

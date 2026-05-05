import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Space, Card, 
    Typography, Row, Col, Statistic, Avatar, 
    Input, Select, Form, Modal, Divider, Badge,
    Progress 
} from 'antd';
import { 
    AuditOutlined, 
    CheckCircleOutlined, 
    EditOutlined, 
    SearchOutlined,
    UserOutlined,
    TrophyOutlined,
    LineChartOutlined,
    FileDoneOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { 
    getTestResultsByClassAPI, 
    createTestResultAPI 
} from '../../../services/admin/academic.api';
import { getClassesByLocationAPI } from '../../../services/admin/classes.api';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const TestResultsPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState<number | null>(null);

    const fetchClasses = async () => {
        try {
            const locID = Number(localStorage.getItem('locationId')) || 1;
            const res = await getClassesByLocationAPI(locID);
            setClasses(Array.isArray(res.data) ? res.data : []);
        } catch {}
    };

    const fetchResults = async (classID: number) => {
        setLoading(true);
        try {
            const res = await getTestResultsByClassAPI(classID);
            setData(Array.isArray(res.data) ? res.data : []);
        } catch {
            message.error('Failed to load gradebook');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchClasses(); }, []);

    const columns = [
        { 
            title: 'Examinee', 
            key: 'student',
            render: (_: any, r: any) => (
                <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{r.studentName || 'Learner'}</Text>
                        <Text type="secondary" style={{ fontSize: 11 }}>{r.studentCode}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Test Component', 
            key: 'test',
            render: (_: any, r: any) => (
                <Space direction="vertical" size={0}>
                    <Text style={{ fontSize: 13 }}>{r.testType}</Text>
                    <Tag color="blue" style={{ fontSize: 10 }}>{r.masterType}</Tag>
                </Space>
            )
        },
        { 
            title: 'Performance', 
            dataIndex: 'mark', 
            key: 'mark',
            render: (v: string) => {
                const score = parseFloat(v) || 0;
                const color = score >= 8 ? '#10b981' : score >= 5 ? '#3b82f6' : '#ef4444';
                return (
                    <Space direction="vertical" size={2} style={{ width: 100 }}>
                        <Text strong style={{ color }}>{v}</Text>
                        <Progress percent={score * 10} size="small" showInfo={false} strokeColor={color} />
                    </Space>
                );
            }
        },
        { 
            title: 'Evaluated Date', 
            dataIndex: 'crtdDate', 
            key: 'date',
            render: (v: string) => <Text style={{ fontSize: 12 }}>{dayjs(v).format('DD/MM/YYYY')}</Text>
        },
        {
            title: 'QC/Teacher', 
            dataIndex: 'qcName', 
            key: 'qc',
            render: (v: string) => <Tag icon={<AuditOutlined />}>{v || 'Pending'}</Tag>
        },
        {
            title: 'Actions', 
            key: 'action',
            render: (_: any, record: any) => (
                <Space>
                    <Tooltip title="View Video Oral Test">
                        <Button type="text" icon={<GlobalOutlined />} disabled={!record.videoUrl} />
                    </Tooltip>
                    <Button type="primary" size="small" icon={<EditOutlined />}>Grade</Button>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Examination Gradebook</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Centralized oversight of student assessments, oral test recordings, and academic grading</Text>
                </div>
                <Select 
                    placeholder="Select Cohort" 
                    style={{ width: 250 }} 
                    onChange={v => { setSelectedClass(v); fetchResults(v); }}
                >
                    {classes.map(c => <Option key={c.classID} value={c.classID}>{c.className}</Option>)}
                </Select>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Passed Exams" value={data.filter(i => parseFloat(i.mark) >= 5).length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Honor Roll" value={data.filter(i => parseFloat(i.mark) >= 8).length} prefix={<TrophyOutlined />} valueStyle={{ color: '#fbbf24' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Average Score" value={6.8} precision={1} prefix={<LineChartOutlined />} valueStyle={{ color: '#3b82f6' }} />
                    </Card>
                </Col>
                <Col xs={24} md={6}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Submissions" value={data.length} prefix={<FileDoneOutlined />} />
                    </Card>
                </Col>
            </Row>

            <Card style={{ borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                {selectedClass ? (
                    <Table 
                        columns={columns} 
                        dataSource={data} 
                        rowKey="recordID" 
                        loading={loading} 
                        className="premium-table"
                    />
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <AuditOutlined style={{ fontSize: 64, color: '#e2e8f0', marginBottom: 16 }} />
                        <Title level={4} style={{ color: '#94a3b8' }}>Please select a class to audit test results</Title>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default TestResultsPage;

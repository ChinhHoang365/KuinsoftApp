import React, { useEffect, useState } from 'react';
import { 
    Table, Button, message, Space, Input, Tag, 
    Card, Descriptions, Tabs, Empty, Spin, Avatar, 
    Typography, Row, Col, Statistic, Timeline, Badge, 
    Divider, Tooltip, List 
} from 'antd';
import { 
    SearchOutlined, 
    UserOutlined, 
    CalendarOutlined, 
    FileTextOutlined, 
    HeartOutlined,
    DollarCircleOutlined,
    TeamOutlined,
    NodeIndexOutlined,
    HistoryOutlined,
    MessageOutlined,
    GlobalOutlined,
    BankOutlined,
    IdcardOutlined,
    SafetyCertificateOutlined,
    PieChartOutlined
} from '@ant-design/icons';
import { 
    getStudentInformationAPI,
    getStudentRelativeAPI,
    getStudentAccountAPI,
    getRegisteredCoursesAPI,
    getStudentPathwaysAPI,
    getStudentPaymentOverallAPI,
    getStudentPaymentListAPI,
    getStudentWaitingListAPI,
    getStudentPlacementTestAPI,
    getStudentEmailSMSHistoryAPI,
    getStudentScheduleAPI
} from '../../../services/admin/students.api';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const StudentProfilesPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [stuID, setStuID] = useState<string>(searchParams.get('id') || '');
    const [loading, setLoading] = useState(false);
    
    // Data States
    const [info, setInfo] = useState<any>(null);
    const [account, setAccount] = useState<any>(null);
    const [relatives, setRelatives] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [pathways, setPathways] = useState<any[]>([]);
    const [payments, setPayments] = useState<any[]>([]);
    const [financials, setFinancials] = useState<any>(null);
    const [waitingList, setWaitingList] = useState<any[]>([]);
    const [placementTests, setPlacementTests] = useState<any[]>([]);
    const [commLog, setCommLog] = useState<any[]>([]);
    const [schedule, setSchedule] = useState<any[]>([]);

    const fetch360Data = async (id: string) => {
        if (!id) return;
        setLoading(true);
        const idNum = Number(id);
        try {
            const [
                infoRes, relRes, accRes, courseRes, pathRes, 
                payRes, finRes, waitRes, ptRes, commRes, schedRes
            ] = await Promise.all([
                getStudentInformationAPI(idNum),
                getStudentRelativeAPI(idNum),
                getStudentAccountAPI(idNum),
                getRegisteredCoursesAPI(idNum),
                getStudentPathwaysAPI(idNum),
                getStudentPaymentListAPI(idNum),
                getStudentPaymentOverallAPI(idNum),
                getStudentWaitingListAPI(idNum),
                getStudentPlacementTestAPI(idNum),
                getStudentEmailSMSHistoryAPI(idNum),
                getStudentScheduleAPI(idNum)
            ]);

            setInfo(infoRes.data || infoRes);
            setRelatives(Array.isArray(relRes.data) ? relRes.data : []);
            setAccount(accRes.data || accRes);
            setCourses(Array.isArray(courseRes.data) ? courseRes.data : []);
            setPathways(Array.isArray(pathRes.data) ? pathRes.data : []);
            setPayments(Array.isArray(payRes.data) ? payRes.data : []);
            setFinancials(finRes.data || finRes);
            setWaitingList(Array.isArray(waitRes.data) ? waitRes.data : []);
            setPlacementTests(Array.isArray(ptRes.data) ? ptRes.data : []);
            setCommLog(Array.isArray(commRes.data) ? commRes.data : []);
            setSchedule(Array.isArray(schedRes.data) ? schedRes.data : []);
        } catch {
            message.error('Partial data loading failed. Please check connectivity.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setStuID(id);
            fetch360Data(id);
        }
    }, [searchParams]);

    const renderOverview = () => (
        <Row gutter={24}>
            <Col xs={24} lg={8}>
                <Card style={{ borderRadius: 16, textAlign: 'center', marginBottom: 24 }}>
                    <Avatar size={120} src={info?.avatar} icon={<UserOutlined />} style={{ backgroundColor: 'var(--primary-color)', marginBottom: 16 }} />
                    <Title level={3} style={{ margin: 0 }}>{info?.fullName || 'Full Name'}</Title>
                    <Text type="secondary">{info?.studentCode || 'STU-000'}</Text>
                    <Divider />
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Statistic title="Account Balance" value={account?.balance || 0} prefix={<DollarCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                        <Tag color="gold" style={{ marginTop: 8 }}>{account?.accountType || 'Standard Learner'}</Tag>
                    </Space>
                </Card>
                <Card title={<span><TeamOutlined /> Relatives & Guardians</span>} style={{ borderRadius: 16 }}>
                    <List
                        dataSource={relatives}
                        renderItem={rel => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon={<UserOutlined />} />}
                                    title={<Text strong>{rel.fullName}</Text>}
                                    description={<Text type="secondary">{rel.relationType} | {rel.mobilePhone}</Text>}
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>
            <Col xs={24} lg={16}>
                <Card title={<span><IdcardOutlined /> General Information</span>} style={{ borderRadius: 16, marginBottom: 24 }}>
                    <Descriptions column={2} bordered size="small">
                        <Descriptions.Item label="Gender">{info?.gender}</Descriptions.Item>
                        <Descriptions.Item label="DOB">{info?.dob ? dayjs(info.dob).format('DD/MM/YYYY') : 'N/A'}</Descriptions.Item>
                        <Descriptions.Item label="Email" span={2}>{info?.email}</Descriptions.Item>
                        <Descriptions.Item label="Mobile">{info?.mobilePhone}</Descriptions.Item>
                        <Descriptions.Item label="Nationality">{info?.nationality}</Descriptions.Item>
                        <Descriptions.Item label="Address" span={2}>{info?.address}</Descriptions.Item>
                        <Descriptions.Item label="School">{info?.schoolName}</Descriptions.Item>
                        <Descriptions.Item label="Counselor">{info?.counselorName}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card title={<span><PieChartOutlined /> Financial Summary</span>} style={{ borderRadius: 16 }}>
                    <Row gutter={16}>
                        <Col span={8}><Statistic title="Total Paid" value={financials?.totalPaidAmt || 0} /></Col>
                        <Col span={8}><Statistic title="Remaining" value={financials?.remainingAmt || 0} valueStyle={{ color: '#ef4444' }} /></Col>
                        <Col span={8}><Statistic title="Total Allocated" value={financials?.totalAllocatedAmt || 0} /></Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    );

    const renderAcademic = () => (
        <Card style={{ borderRadius: 16 }}>
            <Tabs defaultActiveKey="courses">
                <TabPane tab={<span><FileTextOutlined /> Courses & Classes</span>} key="courses">
                    <Table 
                        dataSource={courses} 
                        rowKey="id" 
                        size="small"
                        columns={[
                            { title: 'Course', dataIndex: 'programmeName', key: 'pname' },
                            { title: 'Level', dataIndex: 'levelName', key: 'lname' },
                            { title: 'Class', dataIndex: 'className', key: 'cname' },
                            { title: 'Start Date', dataIndex: 'startDate', key: 'sdate', render: v => dayjs(v).format('DD/MM/YYYY') },
                            { title: 'Status', dataIndex: 'status', key: 'status', render: v => <Tag color="blue">{v}</Tag> }
                        ]}
                    />
                </TabPane>
                <TabPane tab={<span><NodeIndexOutlined /> Study Pathway</span>} key="pathway">
                    <Timeline mode="alternate" style={{ marginTop: 24 }}>
                        {pathways.map((p, i) => (
                            <Timeline.Item key={i} color={p.isCompleted ? 'green' : 'blue'}>
                                <Text strong>{p.levelName}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: 12 }}>Target: {p.targetScore} | Status: {p.status}</Text>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </TabPane>
            </Tabs>
        </Card>
    );

    return (
        <div className="fade-in">
            <div style={{ 
                marginBottom: 24, padding: '24px', background: 'var(--primary-gradient)', 
                borderRadius: 'var(--radius-lg)', color: '#fff', boxShadow: 'var(--shadow-lg)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div>
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Student 360° Profile</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Complete historical view of academic, financial, and behavioral records</Text>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <Input 
                        placeholder="Search by ID..." 
                        value={stuID} 
                        onChange={e => setStuID(e.target.value)} 
                        prefix={<SearchOutlined />} 
                        style={{ width: 200, borderRadius: 8 }}
                        onPressEnter={() => fetch360Data(stuID)}
                    />
                    <Button type="default" size="large" onClick={() => fetch360Data(stuID)} style={{ borderRadius: 10, fontWeight: 600 }}>
                        Pull Data
                    </Button>
                </div>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px' }}><Spin size="large" tip="Aggregating student data..." /></div>
            ) : !info ? (
                <Card style={{ borderRadius: 16, textAlign: 'center', padding: '60px 0' }}>
                    <Empty description="No student profile loaded. Search by ID to begin." />
                </Card>
            ) : (
                <Tabs defaultActiveKey="overview" className="premium-tabs">
                    <TabPane tab={<span><GlobalOutlined /> Overview</span>} key="overview">
                        {renderOverview()}
                    </TabPane>
                    <TabPane tab={<span><SafetyCertificateOutlined /> Academic Journey</span>} key="academic">
                        {renderAcademic()}
                    </TabPane>
                    <TabPane tab={<span><HistoryOutlined /> Transactional History</span>} key="finance">
                        <Card style={{ borderRadius: 16 }}>
                            <Table 
                                dataSource={payments} 
                                rowKey="paymentID"
                                columns={[
                                    { title: 'Date', dataIndex: 'paymentDate', key: 'pdate', render: v => dayjs(v).format('DD/MM/YYYY') },
                                    { title: 'Type', dataIndex: 'paymentType', key: 'ptype' },
                                    { title: 'Description', dataIndex: 'descr', key: 'desc' },
                                    { title: 'Total', dataIndex: 'totAmt', key: 'tamt', render: v => v?.toLocaleString() },
                                    { title: 'Actual Paid', dataIndex: 'totActualAmt', key: 'aamt', render: v => <Text strong type="success">{v?.toLocaleString()}</Text> }
                                ]}
                            />
                        </Card>
                    </TabPane>
                    <TabPane tab={<span><MessageOutlined /> Communications</span>} key="comm">
                        <Card style={{ borderRadius: 16 }}>
                            <Timeline>
                                {commLog.map((log, i) => (
                                    <Timeline.Item key={i}>
                                        <Text strong>{log.title || 'Notification'}</Text>
                                        <br />
                                        <Text type="secondary">{log.content}</Text>
                                        <br />
                                        <Text type="secondary" style={{ fontSize: 11 }}>{dayjs(log.crtdDate).format('DD/MM/YYYY HH:mm')}</Text>
                                    </Timeline.Item>
                                ))}
                                {commLog.length === 0 && <Empty description="No communication history found" />}
                            </Timeline>
                        </Card>
                    </TabPane>
                </Tabs>
            )}
        </div>
    );
};

export default StudentProfilesPage;

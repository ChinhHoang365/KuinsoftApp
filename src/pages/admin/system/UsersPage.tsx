import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Space, Tag, Card, Statistic, Row, Col, Input, 
    message, Modal, Form, Tabs, Select, DatePicker, Checkbox, 
    Typography, Divider, Tooltip, Avatar 
} from 'antd';
import { 
    SearchOutlined, 
    TeamOutlined, 
    CheckCircleOutlined, 
    ClockCircleOutlined,
    UserAddOutlined,
    EditOutlined,
    KeyOutlined,
    UserOutlined,
    IdcardOutlined,
    BookOutlined,
    SolutionOutlined
} from '@ant-design/icons';
import { 
    getUserListAPI, 
    inactiveUserAPI, 
    addUserAPI, 
    editUserAPI, 
    getGroupListAPI, 
    getAccountTypesAPI,
    resetPasswordAPI,
    getUserInfoAPI
} from '../../../services/admin/users.api';
import { getCentersList } from '../../../services/admin/center.api';
import dayjs from 'dayjs';

const { Search, TextArea } = Input;
const { Text, Title } = Typography;
const { TabPane } = Tabs;

const UsersPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingUser, setEditingUser] = useState<any>(null);
    const [groups, setGroups] = useState<any[]>([]);
    const [accountTypes, setAccountTypes] = useState<any[]>([]);
    const [centers, setCenters] = useState<any[]>([]);
    const [userType, setUserType] = useState<string>('staff'); // staff, student, teacher

    const fetchInitialData = async () => {
        try {
            const [gRes, aRes, cRes] = await Promise.all([
                getGroupListAPI(),
                getAccountTypesAPI(),
                getCentersList()
            ]);
            setGroups(Array.isArray(gRes) ? gRes : (gRes.data || []));
            setAccountTypes(Array.isArray(aRes) ? aRes : (aRes.data || []));
            setCenters(Array.isArray(cRes) ? cRes : (cRes.data || []));
        } catch (err) {
            console.error("Failed to load selectors", err);
        }
    };

    const fetchUsers = async (keyword?: string) => {
        setLoading(true);
        try {
            const locationId = localStorage.getItem('locationId');
            const res: any = await getUserListAPI(locationId || '');
            let list = Array.isArray(res) ? res : (res.users || res.data || []);
            
            if (keyword) {
                list = list.filter((u: any) =>
                    u.fullName?.toLowerCase().includes(keyword.toLowerCase()) ||
                    u.userName?.toLowerCase().includes(keyword.toLowerCase())
                );
            }
            setData(list);
        } catch {
            message.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        fetchUsers(); 
        fetchInitialData();
    }, []);

    const handleAdd = () => {
        setEditingUser(null);
        form.resetFields();
        // Set defaults from the JSON provided
        form.setFieldsValue({
            user: { isActive: true, isWindowAuthenticate: false },
            detail: { dob: dayjs('1900-01-01'), gender: 'M', nationalityID: 1, cityID: 1 },
            role: { locationID: Number(localStorage.getItem('locationId') || 1) },
            student: { entryDate: dayjs(), acceptReceiveEmail: true, acceptReceiveSMS: true, isFirstSteps: true },
            teacher: { startDate: dayjs(), currencyID: 'VND', inactive: false }
        });
        setIsModalVisible(true);
    };

    const handleEdit = async (record: any) => {
        setLoading(true);
        try {
            const res: any = await getUserInfoAPI(record.userID);
            const fullData = Array.isArray(res) ? res[0] : (res.data?.[0] || res);
            setEditingUser(fullData);
            
            // Format dates for Ant Design DatePicker
            const formattedData = {
                ...fullData,
                detail: { ...fullData.detail, dob: fullData.detail?.dob ? dayjs(fullData.detail.dob) : null },
                student: fullData.student ? { 
                    ...fullData.student, 
                    entryDate: fullData.student.entryDate ? dayjs(fullData.student.entryDate) : null 
                } : {},
                teacher: fullData.teacher ? { 
                    ...fullData.teacher, 
                    startDate: fullData.teacher.startDate ? dayjs(fullData.teacher.startDate) : null,
                    endDate: fullData.teacher.endDate ? dayjs(fullData.teacher.endDate) : null,
                    passportExpiredDate: fullData.teacher.passportExpiredDate ? dayjs(fullData.teacher.passportExpiredDate) : null,
                    visaExpriedDate: fullData.teacher.visaExpriedDate ? dayjs(fullData.teacher.visaExpriedDate) : null
                } : {}
            };
            
            form.setFieldsValue(formattedData);
            setIsModalVisible(true);
        } catch {
            message.error("Failed to load user details");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            // Process dates back to ISO
            const payload = {
                ...values,
                detail: { ...values.detail, dob: values.detail?.dob?.toISOString() },
                student: values.student ? { 
                    ...values.student, 
                    entryDate: values.student.entryDate?.toISOString() 
                } : null,
                teacher: values.teacher ? { 
                    ...values.teacher, 
                    startDate: values.teacher.startDate?.toISOString(),
                    endDate: values.teacher.endDate?.toISOString(),
                    passportExpiredDate: values.teacher.passportExpiredDate?.toISOString(),
                    visaExpriedDate: values.teacher.visaExpriedDate?.toISOString()
                } : null
            };

            if (editingUser) {
                await editUserAPI({ userID: editingUser.userID, ...payload });
                message.success('User updated successfully');
            } else {
                await addUserAPI(payload);
                message.success('User created successfully');
            }
            setIsModalVisible(false);
            fetchUsers();
        } catch (err) {
            console.error(err);
            message.error('Operation failed');
        }
    };

    const columns = [
        { 
            title: 'User', 
            key: 'user',
            render: (_: any, record: any) => (
                <Space>
                    <Avatar icon={<UserOutlined />} src={record.image} />
                    <Space direction="vertical" size={0}>
                        <Text strong>{record.fullName}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>@{record.userName}</Text>
                    </Space>
                </Space>
            )
        },
        { 
            title: 'Role & Type', 
            key: 'role',
            render: (_: any, record: any) => (
                <Space direction="vertical" size={0}>
                    <Tag color="blue">{record.groupName}</Tag>
                    <Text type="secondary" style={{ fontSize: 11 }}>{record.accountTypeName}</Text>
                </Space>
            )
        },
        { title: 'Contact', dataIndex: 'mobilePhone', key: 'mobilePhone' },
        { 
            title: 'Status', 
            dataIndex: 'isActive', 
            key: 'isActive',
            render: (v: boolean) => <Tag color={v ? 'green' : 'red'} style={{ borderRadius: 4 }}>{v ? 'ACTIVE' : 'INACTIVE'}</Tag>
        },
        {
            title: 'Actions', 
            key: 'action',
            fixed: 'right' as const,
            width: 150,
            render: (_: any, record: any) => (
                <Space size="small">
                    <Tooltip title="Edit Profile">
                        <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    </Tooltip>
                    <Tooltip title="Reset Password">
                        <Button type="text" icon={<KeyOutlined />} onClick={async () => {
                            await resetPasswordAPI(record.userName);
                            message.success('Password reset to default');
                        }} />
                    </Tooltip>
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
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Users & Permissions</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Centralized identity management for staff, students, and faculty</Text>
                </div>
                <Button type="default" size="large" icon={<UserAddOutlined />} onClick={handleAdd} style={{ borderRadius: 10, fontWeight: 600 }}>
                    Create New Account
                </Button>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Total Identities" value={data.length} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Statistic title="Active Users" value={data.filter(u => u.isActive).length} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#10b981' }} />
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Search placeholder="Quick search..." onSearch={fetchUsers} style={{ width: '100%' }} prefix={<SearchOutlined />} allowClear />
                        </div>
                    </Card>
                </Col>
            </Row>

            <div style={{ background: '#fff', padding: 12, borderRadius: 16, boxShadow: 'var(--shadow-sm)' }}>
                <Table 
                    columns={columns} 
                    dataSource={data} 
                    rowKey="userID" 
                    loading={loading} 
                    scroll={{ x: 1000 }}
                    pagination={{ pageSize: 10 }}
                    className="premium-table"
                />
            </div>

            {/* Complex Multi-tab Form Modal */}
            <Modal
                title={<Title level={4} style={{ margin: 0 }}><IdcardOutlined /> {editingUser ? 'Edit User Profile' : 'Register New User'}</Title>}
                open={isModalVisible}
                onOk={handleSave}
                onCancel={() => setIsModalVisible(false)}
                width={1000}
                okText="Submit Data"
                className="premium-modal"
            >
                <Form form={form} layout="vertical" style={{ marginTop: 10 }}>
                    <Tabs defaultActiveKey="1" type="card" className="premium-tabs">
                        <TabPane tab={<span><UserOutlined /> General Info</span>} key="1">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Divider orientation="left">Account Credentials</Divider>
                                    <Form.Item name={['user', 'userName']} label="Username" rules={[{ required: true }]}>
                                        <Input prefix={<UserOutlined />} disabled={!!editingUser} />
                                    </Form.Item>
                                    {!editingUser && (
                                        <Form.Item name={['user', 'password']} label="Initial Password" rules={[{ required: true }]}>
                                            <Input.Password prefix={<KeyOutlined />} />
                                        </Form.Item>
                                    )}
                                    <Form.Item name={['user', 'isActive']} valuePropName="checked">
                                        <Checkbox>Active Account</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Divider orientation="left">Personal Profile</Divider>
                                    <Form.Item name={['detail', 'fullName']} label="Full Name" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Row gutter={8}>
                                        <Col span={12}>
                                            <Form.Item name={['detail', 'dob']} label="Date of Birth">
                                                <DatePicker style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item name={['detail', 'gender']} label="Gender">
                                                <Select options={[{ label: 'Male', value: 'M' }, { label: 'Female', value: 'F' }]} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item name={['detail', 'email']} label="Email Address">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name={['detail', 'mobilePhone']} label="Mobile Phone">
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><SolutionOutlined /> Role & Access</span>} key="2">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name={['role', 'locationID']} label="Primary Location" rules={[{ required: true }]}>
                                        <Select options={centers.map(c => ({ label: c.location, value: c.locationID }))} />
                                    </Form.Item>
                                    <Form.Item name={['role', 'groupID']} label="User Group / Permission" rules={[{ required: true }]}>
                                        <Select options={groups.map(g => ({ label: g.groupName, value: g.groupID }))} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={['role', 'accountTypeID']} label="Account Classification" rules={[{ required: true }]}>
                                        <Select 
                                            options={accountTypes.map(t => ({ label: t.accountTypeName, value: t.accountTypeID }))} 
                                            onChange={(val) => {
                                                const type = accountTypes.find(t => t.accountTypeID === val)?.accountTypeName?.toLowerCase();
                                                if (type?.includes('student')) setUserType('student');
                                                else if (type?.includes('teacher')) setUserType('teacher');
                                                else setUserType('staff');
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><BookOutlined /> Student Profile</span>} key="3">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Divider orientation="left">Family Contact</Divider>
                                    <Form.Item name={['student', 'motherName']} label="Mother's Name"><Input /></Form.Item>
                                    <Form.Item name={['student', 'motherPhone']} label="Mother's Phone"><Input /></Form.Item>
                                    <Form.Item name={['student', 'fatherName']} label="Father's Name"><Input /></Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Divider orientation="left">Academic</Divider>
                                    <Form.Item name={['student', 'entryDate']} label="Enrollment Date"><DatePicker style={{ width: '100%' }} /></Form.Item>
                                    <Form.Item name={['student', 'ieltsBandScore']} label="IELTS Band Score"><Input type="number" step="0.5" /></Form.Item>
                                    <Form.Item name={['student', 'hobbies']} label="Hobbies"><Input /></Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Divider orientation="left">System Info</Divider>
                                    <Form.Item name={['student', 'taxCode']} label="Tax Code"><Input /></Form.Item>
                                    <Form.Item name={['student', 'identification']} label="Citizen ID / Passport"><Input /></Form.Item>
                                    <Space>
                                        <Form.Item name={['student', 'acceptReceiveEmail']} valuePropName="checked"><Checkbox>Email OK</Checkbox></Form.Item>
                                        <Form.Item name={['student', 'acceptReceiveSMS']} valuePropName="checked"><Checkbox>SMS OK</Checkbox></Form.Item>
                                    </Space>
                                </Col>
                            </Row>
                        </TabPane>

                        <TabPane tab={<span><TeamOutlined /> Teacher Profile</span>} key="4">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Divider orientation="left">Contract Details</Divider>
                                    <Form.Item name={['teacher', 'startDate']} label="Start Date"><DatePicker style={{ width: '100%' }} /></Form.Item>
                                    <Form.Item name={['teacher', 'teacherSalaryTypeID']} label="Salary Type">
                                        <Select options={[{ label: 'Hourly', value: 1 }, { label: 'Fixed Monthly', value: 2 }]} />
                                    </Form.Item>
                                    <Row gutter={8}>
                                        <Col span={12}><Form.Item name={['teacher', 'salaryPerHours']} label="Rate/Hour"><Input type="number" /></Form.Item></Col>
                                        <Col span={12}><Form.Item name={['teacher', 'salaryPerMonth']} label="Monthly Base"><Input type="number" /></Form.Item></Col>
                                    </Row>
                                </Col>
                                <Col span={12}>
                                    <Divider orientation="left">Legal & Immigration</Divider>
                                    <Form.Item name={['teacher', 'passportNo']} label="Passport Number"><Input /></Form.Item>
                                    <Form.Item name={['teacher', 'visaNo']} label="Visa Number"><Input /></Form.Item>
                                    <Form.Item name={['teacher', 'notes']} label="Special Instructions"><TextArea rows={3} /></Form.Item>
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </Form>
            </Modal>
        </div>
    );
};

export default UsersPage;

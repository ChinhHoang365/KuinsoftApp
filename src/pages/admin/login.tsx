import { App, Button, Form, Input, Select, Typography, Card, Row, Col } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import type { FormProps } from 'antd';
import { loginAPI } from 'services/modules/admin';
import { useCurrentApp } from 'context';
import { UserOutlined, LockOutlined, EnvironmentOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type FieldType = {
    username: string;
    password: string;
    locationId: number
};

const locationList = [
    { locationId: 1, locationName: 'ILC Binh Duong' },
    { locationId: 2, locationName: 'ILC Ho Chi Minh' },
    { locationId: 3, locationName: 'ILC Da Nang' },
];

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { message, notification } = App.useApp();
    const { setIsAuthenticated, setUserInfo } = useCurrentApp();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password, locationId } = values;
        setIsSubmit(true);
        try {
            const res = await loginAPI(username, password, locationId);
            setIsSubmit(false);
            if (res && res.token) {
                localStorage.setItem('token', res.token);
                const userInfo = res.userInfo || res;
                setIsAuthenticated(true);
                setUserInfo(userInfo);
                localStorage.setItem('username', userInfo.userName || username);
                if (userInfo.userID) localStorage.setItem('userId', userInfo.userID.toString());
                localStorage.setItem('locationId', locationId.toString());
                message.success('Welcome back, ' + (userInfo.fullName || username));
                navigate('/admin');
            } else {
                notification.error({
                    message: "Login Failed",
                    description: "Invalid credentials. Please try again.",
                });
            }
        } catch (error: any) {
            setIsSubmit(false);
            notification.error({
                message: "Connection Error",
                description: error?.message || "Could not connect to the authentication server.",
            });
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at top left, #4f46e5 0%, #1e1b4b 100%)',
            padding: '20px'
        }}>
            <Card
                className="glass-effect"
                styles={{ body: { padding: 0 } }}
                style={{
                    width: '100%',
                    maxWidth: 850,
                    borderRadius: 24,
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <Row>
                    {/* BÊN TRÁI: LOGO */}
                    <Col xs={0} md={12} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
                        padding: '40px'
                    }}>
                        <img 
                            src="/images/logo.jpg" 
                            alt="Kuinsoft Logo" 
                            style={{ width: '100%', maxWidth: '280px', objectFit: 'contain', borderRadius: '12px' }} 
                        />
                    </Col>

                    {/* BÊN PHẢI: FORM ĐĂNG NHẬP */}
                    <Col xs={24} md={12} style={{ padding: '40px' }}>
                        <div style={{ textAlign: 'center', marginBottom: 40 }}>
                            <Title level={2} style={{ margin: 0, letterSpacing: -1 }}>KUINSOFT</Title>
                            <Text type="secondary">LOGIN</Text>
                        </div>

                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    requiredMark={false}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
                            placeholder="Username"
                            style={{ borderRadius: 12, height: 50 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
                            placeholder="Password"
                            style={{ borderRadius: 12, height: 50 }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="locationId"
                        rules={[{ required: true, message: 'Please select a location' }]}
                    >
                        <Select
                            placeholder="Select Center"
                            suffixIcon={<EnvironmentOutlined style={{ color: '#94a3b8' }} />}
                            style={{ height: 50 }}
                            dropdownStyle={{ borderRadius: 12 }}
                            options={locationList.map(l => ({ label: l.locationName, value: l.locationId }))}
                        />
                    </Form.Item>

                    <Form.Item style={{ marginTop: 32 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isSubmit}
                            block
                            icon={<ArrowRightOutlined />}
                            style={{ height: 50, fontSize: 16 }}
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Text type="secondary">
                        Don't have an account? <Link to="/contact" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Contact IT</Link>
                    </Text>
                </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default LoginPage;

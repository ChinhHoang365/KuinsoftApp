import { App, Button, Form, Input, Select, Typography, Card } from 'antd';
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
                style={{
                    width: '100%',
                    maxWidth: 440,
                    borderRadius: 24,
                    padding: '24px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{
                        width: 64, height: 64,
                        background: 'var(--primary-gradient)',
                        borderRadius: 16,
                        margin: '0 auto 16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(99, 102, 241, 0.4)'
                    }}>
                        <Title level={2} style={{ color: '#fff', margin: 0 }}>K</Title>
                    </div>
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
            </Card>
        </div>
    )
}

export default LoginPage;

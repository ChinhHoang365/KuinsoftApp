import { App, Button, Divider, Form, Input , Select} from 'antd';
import { Link, useNavigate, useRevalidator } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import type { FormProps } from 'antd';
import { loginAPI } from 'services/admin/users.api';
import { useCurrentApp } from 'components/context/app.context';

type FieldType = {
    username: string;
    password: string;
    locationId: number
};

interface ILocation {
  locationId: number;
  locationName: string;
};
const locationList: ILocation[] = [
  { locationId: 1, locationName: 'ILC Binh Duong' },
  { locationId: 2, locationName: 'Hồ Chí Minh' },
  { locationId: 3, locationName: 'Đà Nẵng' },
];

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { message, notification } = App.useApp();
  
  
    const { setIsAuthenticated, setUserInfo } = useCurrentApp();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password, locationId } = values;

        setIsSubmit(true);
        //const res = await loginAPI(username, password);
        console.log('Login request:', { username, password, locationId });
         const res = await loginAPI(username, password, locationId);
console.log('Login response:', res);
        setIsSubmit(false);
        if (res?.data) {
            setIsAuthenticated(true);
            setUserInfo(res.data.userInfo);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', res.data.userInfo.userName);

            localStorage.setItem('userId', res.data.userInfo.userID.toString());
            localStorage.setItem('locationId', locationId.toString());

            message.success('Login successful!');
            navigate('/')
        } else {
            notification.error({
                message: "Error occurred",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 2
            })
        }
    };
    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Kuin Login</h2>
                            <Divider />

                        </div>
                        <Form
                            name="login-form"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                               // labelCol={{ span: 24 }} //whole column
                                label="username"
                                name="username"
                                rules={[
                                    { required: true, message: 'User Name is required!' },

                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                               // labelCol={{ span: 24 }} //whole column
                                label="password"
                                name="password"
                                rules={[{ required: true, message: 'Password is required!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="locationId"
                                label="Location"
                                rules={[{ required: true, message: 'Please select Location!' }]}
                            >
                                <Select
                                    placeholder="--Select Location--"
                                    options={locationList.map((loc) => ({
                                        label: loc.locationName,
                                        value: loc.locationId,
                                    }))}
                                    showSearch
                                    optionFilterProp="label"
                                    filterOption={(input, option) =>
                                        typeof option?.label === 'string' &&
                                        option.label.toLowerCase().includes(input.toLowerCase())
                                    }
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" loading={isSubmit}>
                                    Login
                                </Button>
                            </Form.Item>

                            <br />
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default LoginPage;

import { App, Button, Divider, Form, Input , Select} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { useState } from 'react';
import type { FormProps } from 'antd';
import { loginAPI } from 'services/admin/users.api';
//import { useCurrentApp } from 'components/context/app.context';

type FieldType = {
    username: string;
    password: string;
    locationid: number
};

interface ILocation {
  locationid: number;
  locationname: string;
};
const locationList: ILocation[] = [
  { locationid: 1, locationname: 'ILC Binh Duong' },
  { locationid: 2, locationname: 'Hồ Chí Minh' },
  { locationid: 3, locationname: 'Đà Nẵng' },
];

const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { message, notification } = App.useApp();
    //const { setIsAuthenticated, setUser } = useCurrentApp();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { username, password, locationid } = values;

        setIsSubmit(true);
        //const res = await loginAPI(username, password);
         const res = await loginAPI(username, password, locationid);

        setIsSubmit(false);
        if (res?.data) {
           // setIsAuthenticated(true);
           // setUser(res.data.user)
            localStorage.setItem('token', res.data.token);
            message.success('Login successful!');
            navigate('/')
        } else {
            notification.error({
                message: "Error occurred",
                description:
                    res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 1
            })
        }
    };
const [ selectedLocation, setSelectedLocation] = useState<string>('');
 const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(event.target.value);
  };
    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Login</h2>
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

                            <Form.Item
                                name="locationid"
                                label="Location"
                                rules={[{ required: true, message: 'Please select Location!' }]}
                            >
                                <select 
                                    id="locationid" 
                                    value={selectedLocation} 
                                    onChange={handleChange}
                                >
                                    <option value="">--Select Location--</option>
                                    {locationList.map((loc) => (
                                    <option key={loc.locationid} value={loc.locationid}>
                                        {loc.locationname}
                                    </option>
                                    ))}
                                </select>
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

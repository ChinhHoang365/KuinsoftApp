import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    ExceptionOutlined,
    HeartTwoTone,
    TeamOutlined,
    UserOutlined,
    DollarCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Avatar, Input , Button, Spin} from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCurrentApp } from './components/context/app.context';
import type { MenuProps } from 'antd';


import { userMenuAPI } from 'services/admin/users.api';

type MenuItem = Required<MenuProps>['items'][number];

const { Content, Footer, Sider } = Layout;

 
const LayoutAdmin = () => {
    const navigate = useNavigate();
    //-----------------
    // const [items, setItems] = useState<MenuItem[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
   
    // useEffect(() => {
    // const fetchMenuItems = async () => {
    // try {

    //     // Replace with your actual API endpoint
    //    
      
    //     const data = response.data;

    //     // Map API data to Ant Design MenuItem structure
    //     const formattedItems: MenuItem[] = data.map((item: any) => ({
    //     label: item.title, // 'label' is what users see
    //     key: item.id.toString(), // 'key' must be a unique string
    //     icon: getIcon(item.type), // Optional: Map a string to an Icon component
    //     children: item.subItems ? item.subItems.map((sub: any) => ({
    //         label: sub.title,
    //         key: sub.id.toString(),
    //     })) : undefined,
    //     }));

    //     setItems(formattedItems);
    // } catch (error) {
    //     message.error('Failed to load menu data');
    // } finally {
    //     setLoading(false);
    // }
    // };

    // fetchMenuItems();
    // }, []);

    // // Optional helper to map API strings to specific Ant Design Icons
    // const getIcon = (type: string) => {
    //     switch (type) {
    //     case 'mail': return <MailOutlined />;
    //     case 'app': return <AppstoreOutlined />;
    //     default: return <SettingOutlined />;
    //     }
    // };

    // // const onClick: MenuProps['onClick'] = (e) => {
    // //     console.log('Clicked menu item:', e.key);
    // // };

    // if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

    //----het menu dong----------------------

    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const {
        userInfo, setUserInfo, setIsAuthenticated, isAuthenticated,
        setCarts
    } = useCurrentApp();

    const location = useLocation();

    //-----get data menu-------------
    // const userId = localStorage.getItem("userId");
    // const locationId = localStorage.getItem("locationId");
    // const response = await userMenuAPI(userId,  locationId);
  //---End

    const items: MenuItem[] = [
        {
            label: <Link to='/admin'>Dashboard</Link>,
            key: '/admin',
            icon: <AppstoreOutlined />,

        },
        {
            label: <span>Manage Users</span>,
            key: '/admin/user',
            icon: <UserOutlined />,
            children: [
                {
                    label: <Link to='/admin/user'>CRUD</Link>,
                    key: '/admin/user',
                    icon: <TeamOutlined />,
                },
            ]
        },
        {
            label: <Link to='/admin/book'>Manage Books</Link>,
            key: '/admin/book',
            icon: <ExceptionOutlined />
        },
        {
            label: <Link to='/admin/order'>Manage Orders</Link>,
            key: '/admin/order',
            icon: <DollarCircleOutlined />
        },

    ];


    // useEffect(() => {
    //     const active: any = items.find(item => location.pathname === (item!.key as any)) ?? "/admin";
    //     setActiveMenu(active.key)
    // }, [location])

   
    const handleLogout =  () => {
        //todo
        // const res = await logoutAPI();
        // if (res.data) {

            setUserInfo(null);
            setCarts([]);
            setIsAuthenticated(false);
         
            localStorage.removeItem("access_token");
            localStorage.removeItem("carts")
            localStorage.removeItem("userId");
            localStorage.removeItem("locationId");
             navigate('/login') 
        //}
    }


    const itemsDropdown = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => alert("me")}
            >Choose Center</label>,
            key: 'account',
        },
        {
            label: <Link to={'/'}>My Profile</Link>,
            key: 'home',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >logout</label>,
            key: 'logout',
        },

    ];
//avarta chua có url
    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userInfo?.firstName}.jpg`;

    if (isAuthenticated === false) {
        return (
            <Outlet />
        )
    }

    // const isAdminRoute = location.pathname.includes("admin");
    // if (isAuthenticated === true && isAdminRoute === true) {
    //     const role = userInfo?.role;
    //     if (role === "USER") {
    //         return (
    //             <Outlet />
    //         )
    //     }
    // }

    return (
        <>
            <Layout
                style={{ minHeight: '100vh' }}
                className="layout-admin"
            >
                <Sider
                    theme='light'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}>
                    <div style={{ height: 32, margin: 16, textAlign: 'center' }}>
                        Admin
                    </div>
                    <Menu
                        // defaultSelectedKeys={[activeMenu]}
                        selectedKeys={[activeMenu]}
                        mode="inline"
                        items={items}
                        onClick={(e) => setActiveMenu(e.key)}
                    />
                </Sider>
                <Layout>
                    <div className='admin-header' style={{
                        height: "50px",
                        borderBottom: "1px solid #ebebeb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0 15px",

                    }}>
                    {/* Nut back */}
                        <span>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </span>

                        <Input placeholder="Student Name" />
                        <Input placeholder="Student Code" />
                        <Input placeholder="Student Phone" />
                        <Input placeholder="Class Code" />
                        <Button type="primary" shape="circle" icon={<SearchOutlined />} />

                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <Space style={{ cursor: "pointer" }}>
                                <Avatar src={urlAvatar} />
                                {userInfo?.fullName}
                            </Space>
                        </Dropdown>
                    </div>


                    <Content style={{ padding: '15px' }}>
                        <Outlet />
                    </Content>


                    {/* <Footer style={{ padding: 0, textAlign: "center" }}>
                        React Test Fresher &copy; Hỏi Dân IT - Made with <HeartTwoTone />
                    </Footer> */}


                </Layout>
            </Layout>
        </>
    );
};

export default LayoutAdmin;
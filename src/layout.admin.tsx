import React, { useEffect, useState } from 'react';
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Avatar, Input , Button, Spin, message} from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCurrentApp } from './components/context/app.context';
import type { MenuProps } from 'antd';


import { userMenuAPI } from 'services/admin/users.api';
// import DynamicMenu from './components/layout/dynamic.menu';

type MenuItem = Required<MenuProps>['items'][number];

const { Content, Sider } = Layout;

 // const [openModule, setOpenModule] = useState<number | null>(null);

 
const LayoutAdmin = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [menuData, setMenuData] = useState<IUserMenuMaster[]>([]);
    const [formattedItems, setFormattedItems] = useState<MenuItem[]>([]);

    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const {
        userInfo, setUserInfo, setIsAuthenticated, isAuthenticated,
        setCarts
    } = useCurrentApp();

    const location = useLocation();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const locationIdStr = localStorage.getItem("locationId");

              //  console.log('Fetching menu items with userId:', userId, 'and locationId:', locationIdStr); // Debug log
                if (!userId || !locationIdStr) {
                    message.error('User not authenticated');
                    return;
                }
                const locationId = parseInt(locationIdStr);
                const response = await userMenuAPI(userId, locationId);
                const data = response.data || [];
               // console.log('Menu data fetched:', response); // Debug log
                setMenuData(data);
 console.log('lam o day chua');
                // Map API data to Ant Design MenuItem structure
                const formatted: MenuItem[] = menuData.map((item) => ({
                    label: item.module, // 'label' is what users see
                    key: item.moduleID.toString(), // 'key' must be a unique string
                    icon: getIcon("mail"), // Optional: Map a string to an Icon component
                    children: item.children ? item.children.map((child) => ({
                        label: child.functionName,
                        key: child.functionID.toString(),
                    })) : undefined,
                }));

                setFormattedItems(formatted);
            } catch (err) {
                console.error('Failed to load menu data', err);
                message.error('Failed to load menu data');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    // Optional helper to map API strings to specific Ant Design Icons
    const getIcon = (type: string) => {
        switch (type) {
            case 'mail': return <MailOutlined />;
            case 'app': return <AppstoreOutlined />;
            default: return <SettingOutlined />;
        }
    };

    useEffect(() => {
        const active = formattedItems.find(item => location.pathname === item.key)?.key || "/admin";
        setActiveMenu(active);
    }, [location, formattedItems]);

    const handleLogout = () => {
        setUserInfo(null);
        setCarts([]);
        setIsAuthenticated(false);

        localStorage.removeItem("access_token");
        localStorage.removeItem("carts");
        localStorage.removeItem("userId");
        localStorage.removeItem("locationId");
        navigate('/login');
    };

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

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${userInfo?.userID}.jpg`;

    if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

    if (isAuthenticated === false) {
        return (
            <Outlet />
        );
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
                        selectedKeys={[activeMenu]}
                        mode="inline"
                        items={formattedItems}
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
                                 <Avatar  />
                                {/* <Avatar src={urlAvatar} />
                                {userInfo?.fullName} */}
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
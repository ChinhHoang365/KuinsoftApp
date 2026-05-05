import React, { useState } from 'react';
import {
    AppstoreOutlined,
    TeamOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    SettingOutlined,
    ReadOutlined,
    MoneyCollectOutlined,
    NotificationOutlined,
    LogoutOutlined,
    UserSwitchOutlined,
    DashboardOutlined,
    HomeOutlined,
    RightOutlined
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Space, Avatar, Input, Button, Typography, Badge } from 'antd';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useCurrentApp } from 'context/AppContext';
import type { MenuProps } from 'antd';

const { Content, Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { userInfo, setUserInfo, setIsAuthenticated } = useCurrentApp();

    const handleLogout = () => {
        setUserInfo(null);
        setIsAuthenticated(false);
        localStorage.clear();
        navigate('/login');
    }

    const items: MenuItem[] = [
        { label: <Link to='/admin'>Home</Link>, key: '/admin', icon: <HomeOutlined /> },
        { label: <Link to='/admin/dashboard'>Dashboard</Link>, key: '/admin/dashboard', icon: <DashboardOutlined /> },
        {
            label: 'System', key: 'sys', icon: <SettingOutlined />,
            children: [
                { label: <Link to='/admin/administration'>Administration</Link>, key: '/admin/administration' },
                { label: <Link to='/admin/center-details'>Center Details</Link>, key: '/admin/center-details' },
                { label: <Link to='/admin/users'>Users & Roles</Link>, key: '/admin/users' },
                { label: <Link to='/admin/automation'>Automation</Link>, key: '/admin/automation' },
                { label: <Link to='/admin/locations'>Locations</Link>, key: '/admin/locations' },
            ]
        },
        {
            label: 'Training', key: 'training', icon: <ReadOutlined />,
            children: [
                { label: <Link to='/admin/courses'>Courses</Link>, key: '/admin/courses' },
                { label: <Link to='/admin/classes'>Classes</Link>, key: '/admin/classes' },
                { label: <Link to='/admin/rooms'>Rooms</Link>, key: '/admin/rooms' },
                { label: <Link to='/admin/makeup-lessons'>Make-up Lessons</Link>, key: '/admin/makeup-lessons' },
                { label: <Link to='/admin/side-activities'>Side Activities</Link>, key: '/admin/side-activities' },
                { label: <Link to='/admin/recordings'>Recordings</Link>, key: '/admin/recordings' },
            ]
        },
        {
            label: 'Students', key: 'students', icon: <TeamOutlined />,
            children: [
                { label: <Link to='/admin/students'>Students List</Link>, key: '/admin/students' },
                { label: <Link to='/admin/student-profiles'>Profiles</Link>, key: '/admin/student-profiles' },
                { label: <Link to='/admin/monthly-comments'>Monthly Comments</Link>, key: '/admin/monthly-comments' },
                { label: <Link to='/admin/test-results'>Test Results</Link>, key: '/admin/test-results' },
                { label: <Link to='/admin/feedbacks'>Feedbacks</Link>, key: '/admin/feedbacks' },
            ]
        },
        {
            label: 'HR', key: 'hr', icon: <UserOutlined />,
            children: [
                { label: <Link to='/admin/teachers'>Teachers</Link>, key: '/admin/teachers' },
                { label: <Link to='/admin/counselors'>Counselors</Link>, key: '/admin/counselors' },
            ]
        },
        {
            label: 'Finance', key: 'finance', icon: <MoneyCollectOutlined />,
            children: [
                { label: <Link to='/admin/payments'>Payments</Link>, key: '/admin/payments' },
            ]
        },
        {
            label: 'Logistics', key: 'logistics', icon: <AppstoreOutlined />,
            children: [
                { label: <Link to='/admin/inventory'>Book Storage</Link>, key: '/admin/inventory' },
            ]
        },
        {
            label: 'Utilities', key: 'utilities', icon: <NotificationOutlined />,
            children: [
                { label: <Link to='/admin/news'>News</Link>, key: '/admin/news' },
                { label: <Link to='/admin/announcements'>Announcements</Link>, key: '/admin/announcements' },
                { label: <Link to='/admin/tasks'>Tasks</Link>, key: '/admin/tasks' },
                { label: <Link to='/admin/achievement-rewards'>Rewards</Link>, key: '/admin/achievement-rewards' },
                { label: <Link to='/admin/reports'>Reports</Link>, key: '/admin/reports' },
                { label: <Link to='/admin/notifications'>Notifications</Link>, key: '/admin/notifications' },
                { label: <Link to='/admin/reference-library'>Reference Library</Link>, key: '/admin/reference-library' },
            ]
        }
    ];

    const itemsDropdown = [
        { label: 'My Profile', key: 'profile', icon: <UserOutlined /> },
        { label: 'Switch Center', key: 'center', icon: <UserSwitchOutlined /> },
        { type: 'divider' },
        { 
            label: 'Logout', 
            key: 'logout', 
            icon: <LogoutOutlined />, 
            danger: true, 
            onClick: handleLogout 
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Sider
                theme='light'
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={260}
                trigger={null}
            >
                <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                        width: 40, height: 40, 
                        background: 'var(--primary-gradient)', 
                        borderRadius: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 'bold', fontSize: 20,
                        boxShadow: '0 8px 16px rgba(30, 58, 138, 0.2)'
                    }}>K</div>
                    {!collapsed && <Text strong style={{ fontSize: 22, letterSpacing: -1, color: '#1e3a8a' }}>KUINSOFT</Text>}
                </div>

                <div className="custom-scrollbar">
                    <Menu
                        selectedKeys={[location.pathname]}
                        mode="inline"
                        items={items}
                    />
                </div>
            </Sider>

            <Layout style={{ background: 'transparent' }}>
                <div className="premium-header">
                    <Space size={24}>
                        <Button 
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ fontSize: '18px', background: '#fff', borderRadius: 12, width: 45, height: 45, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}
                        />
                        <Input 
                            className="premium-search"
                            placeholder="Search Students, Staff, and Resources" 
                            prefix={<SearchOutlined style={{ color: '#94a3b8', marginRight: 8 }} />} 
                        />
                    </Space>

                    <Space size={20}>
                        <Badge dot color="#f43f5e" offset={[-4, 4]}>
                            <Button 
                                type="text" 
                                icon={<NotificationOutlined />} 
                                style={{ background: '#fff', borderRadius: 12, width: 45, height: 45, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }} 
                            />
                        </Badge>
                        
                        <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                            <div style={{ 
                                cursor: "pointer", padding: '4px 16px 4px 8px', borderRadius: 16, background: '#fff', 
                                display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' 
                            }}>
                                <Avatar size={36} icon={<UserOutlined />} style={{ backgroundColor: '#10b981' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                                    <Text strong style={{ fontSize: 14 }}>{userInfo?.fullName || 'Admin User'}</Text>
                                    <Text type="secondary" style={{ fontSize: 11 }}>Administrator</Text>
                                </div>
                                <RightOutlined style={{ fontSize: 10, color: '#94a3b8', marginLeft: 4 }} rotate={90} />
                            </div>
                        </Dropdown>
                    </Space>
                </div>

                <Content style={{ padding: '0 24px 24px 24px', minHeight: 280 }}>
                    <div className="fade-in">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

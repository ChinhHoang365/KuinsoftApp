import React, { useEffect, useState } from 'react';
import { 
    Table, Button, Tag, message, Row, Col, 
    Typography, Card, Space, Tooltip, 
    Input, Tabs, Badge, Select, Divider
} from 'antd';
import { 
    GlobalOutlined, 
    EnvironmentOutlined, 
    EnvironmentFilled,
    FlagOutlined,
    PlusOutlined,
    SearchOutlined,
    SyncOutlined,
    BankOutlined,
    NodeIndexOutlined
} from '@ant-design/icons';
import { 
    getCountriesAPI, 
    getCitiesAPI, 
    getDistrictsAPI,
    getDistrictsByCityAPI 
} from '../../../services/admin/geography.api';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const LocationsPage: React.FC = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState<number | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [countryRes, cityRes, districtRes] = await Promise.all([
                getCountriesAPI(),
                getCitiesAPI(),
                getDistrictsAPI()
            ]);
            
            setCountries(Array.isArray(countryRes.data) ? countryRes.data : []);
            setCities(Array.isArray(cityRes.data) ? cityRes.data : []);
            setDistricts(Array.isArray(districtRes.data) ? districtRes.data : []);
        } catch {
            message.error('Failed to load geography data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleCityChange = async (cityID: number) => {
        setSelectedCity(cityID);
        setLoading(true);
        try {
            const res: any = await getDistrictsByCityAPI(cityID);
            setDistricts(Array.isArray(res.data) ? res.data : []);
        } catch {
            message.error('Failed to filter districts');
        } finally {
            setLoading(false);
        }
    };

    const countryColumns = [
        { title: 'ID', dataIndex: 'nationalityID', key: 'id', width: 80 },
        { 
            title: 'Country / Nationality', 
            dataIndex: 'nationality', 
            key: 'nationality',
            render: (v: string) => <Space><FlagOutlined /> <Text strong>{v}</Text></Space>
        },
        { title: 'Code', dataIndex: 'nationalCode', key: 'code', render: (v: string) => <Tag color="blue">{v}</Tag> },
        { 
            title: 'Status', 
            dataIndex: 'inactive', 
            key: 'status',
            render: (v: boolean) => <Tag color={v ? 'red' : 'green'}>{v ? 'Inactive' : 'Active'}</Tag>
        }
    ];

    const cityColumns = [
        { title: 'ID', dataIndex: 'cityID', key: 'id', width: 80 },
        { 
            title: 'City Name', 
            dataIndex: 'cityName', 
            key: 'name',
            render: (v: string) => <Space><EnvironmentFilled style={{ color: '#ef4444' }} /> <Text strong>{v}</Text></Space>
        },
        { title: 'Country', dataIndex: 'countryName', key: 'country' },
        { title: 'Type', dataIndex: 'type', key: 'type', render: (v: string) => <Tag>{v || 'Urban'}</Tag> }
    ];

    const districtColumns = [
        { title: 'ID', dataIndex: 'districtID', key: 'id', width: 80 },
        { 
            title: 'District', 
            dataIndex: 'districtName', 
            key: 'name',
            render: (v: string) => <Space><EnvironmentOutlined /> {v}</Space>
        },
        { title: 'City', dataIndex: 'cityName', key: 'city' },
        { title: 'Prefix', dataIndex: 'prefix', key: 'prefix' }
    ];

    return (
        <div className="fade-in">
            <div style={{ 
                marginBottom: 24, padding: '24px', background: 'var(--primary-gradient)', 
                borderRadius: 'var(--radius-lg)', color: '#fff', boxShadow: 'var(--shadow-lg)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div>
                    <Title level={2} style={{ margin: 0, color: '#fff' }}>Geography & Locations</Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>Manage administrative regions, nationalities, and regional configurations</Text>
                </div>
                <Space>
                    <Button icon={<SyncOutlined />} onClick={fetchData}>Refresh Data</Button>
                    <Button type="default" size="large" icon={<PlusOutlined />} style={{ borderRadius: 10, fontWeight: 600 }}>
                        Add Location
                    </Button>
                </Space>
            </div>

            <Row gutter={24} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Card className="glass-effect" style={{ borderRadius: 16 }}>
                        <Space direction="vertical" size={16} style={{ width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ padding: 12, borderRadius: 12, background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)' }}>
                                    <GlobalOutlined style={{ fontSize: 24 }} />
                                </div>
                                <div>
                                    <Text type="secondary">Total Nationalities</Text>
                                    <Title level={3} style={{ margin: 0 }}>{countries.length}</Title>
                                </div>
                            </div>
                            <Divider style={{ margin: '8px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text type="secondary">Active Regions</Text>
                                <Badge count={cities.length} overflowCount={999} style={{ backgroundColor: '#10b981' }} />
                            </div>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} md={16}>
                    <Card style={{ borderRadius: 16 }}>
                        <Tabs defaultActiveKey="countries" className="premium-tabs">
                            <TabPane tab={<span><FlagOutlined /> Nationalities</span>} key="countries">
                                <Table columns={countryColumns} dataSource={countries} rowKey="nationalityID" loading={loading} className="premium-table" size="small" />
                            </TabPane>
                            <TabPane tab={<span><BankOutlined /> Cities / Provinces</span>} key="cities">
                                <Table columns={cityColumns} dataSource={cities} rowKey="cityID" loading={loading} className="premium-table" size="small" />
                            </TabPane>
                            <TabPane tab={<span><NodeIndexOutlined /> Districts</span>} key="districts">
                                <div style={{ marginBottom: 16 }}>
                                    <Select 
                                        placeholder="Filter by City" 
                                        style={{ width: 250 }} 
                                        onChange={handleCityChange}
                                        allowClear
                                        onClear={fetchData}
                                    >
                                        {cities.map(city => <Option key={city.cityID} value={city.cityID}>{city.cityName}</Option>)}
                                    </Select>
                                </div>
                                <Table columns={districtColumns} dataSource={districts} rowKey="districtID" loading={loading} className="premium-table" size="small" />
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LocationsPage;

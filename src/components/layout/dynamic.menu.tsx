import React, { useEffect, useState } from 'react';
import { userMenuAPI } from 'services/admin/users.api';
import { Layout, Menu, Dropdown, Space, Avatar, Input , Button, Spin, message} from 'antd';

const DynamicMenu = () => {

  const [menuData, setMenuData] = useState<IUserMenuMaster[]>([]);
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      const fetchMenuItems = async () => {
    try {
              const userId = localStorage.getItem("userId");
        const locationIdStr = localStorage.getItem("locationId");
        
        console.log('Fetching menu items with userId:', userId, 'and locationId:', locationIdStr); // Debug log 
        if (!userId || !locationIdStr) {
            message.error('User not authenticated');
            return;
        }
        const locationId = parseInt(locationIdStr);
        const response = await userMenuAPI(userId, locationId);
        const data = response.data || [];
         setMenuData(data);
        //console.log('Menu data fetched:', data); // Debug log 
        } catch (error) {
            console.error('Failed to load menu data:', error);
            message.error('Failed to load menu data');
        } finally {
            setLoading(false);
        }
    };
    fetchMenuItems();
    }, []);
       
  if (loading) return <div className="p-4">Đang tải menu...</div>;

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Hệ Thống</h2>
      
      <ul className="space-y-2">
        {menuData.map((data) => (
          <li key={data.ModuleID} className="rounded-md overflow-hidden">
            {/* Cấp 1: Module */}
            <button
              onClick={() => setOpenModule(openModule === data.ModuleID ? null : data.ModuleID)}
              className="w-full flex justify-between items-center p-3 hover:bg-gray-800 transition-colors"
            >
              <span className="font-medium"> {data.module }</span>
              <span className={`transform transition-transform ${openModule === data.ModuleID ? 'rotate-90' : ''}`}>
                ▶
              </span>
            </button>

            {/* Cấp 2: Children Functions */}
            {openModule === data.ModuleID && (
              <ul className="bg-gray-800 py-1">
                {data.children?.map((child) => (
                  <li key={child.FunctionID}>
                    <a
                      href={child.WebUrl || '#'}
                      className="block pl-8 pr-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      {child.FunctionName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DynamicMenu;
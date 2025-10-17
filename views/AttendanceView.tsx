import React, { useState, useEffect } from 'react';
import { MOCK_CHILDREN, MOCK_USERS } from '../constants';
import { AttendanceRecord, UserRole } from '../types';

const AttendanceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'children' | 'staff'>('children');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [childrenAttendance, setChildrenAttendance] = useState<AttendanceRecord[]>([]);
  const [staffAttendance, setStaffAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Simulate fetching attendance for the selected date
    // In a real app, this would be an API call
    const initialChildrenAttendance = MOCK_CHILDREN.map(child => ({
        id: `child-${child.id}`,
        entityId: child.id,
        name: child.name,
        status: 'حاضر' as const
    }));
     const initialStaffAttendance = MOCK_USERS.filter(u => u.role !== UserRole.Admin).map(staff => ({
        id: `staff-${staff.id}`,
        entityId: staff.id,
        name: staff.name,
        status: 'حاضر' as const
    }));
    setChildrenAttendance(initialChildrenAttendance);
    setStaffAttendance(initialStaffAttendance);
  }, [date]);

  const handleStatusChange = (id: string, newStatus: AttendanceRecord['status']) => {
    if (activeTab === 'children') {
        setChildrenAttendance(prev => prev.map(rec => rec.id === id ? {...rec, status: newStatus} : rec));
    } else {
        setStaffAttendance(prev => prev.map(rec => rec.id === id ? {...rec, status: newStatus} : rec));
    }
  };
  
  const StatusButton: React.FC<{current: string, value: string, onClick: () => void, color: string}> = ({current, value, onClick, color}) => (
      <button onClick={onClick} className={`px-3 py-1 text-xs rounded-full ${current === value ? `${color} text-white` : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
        {value}
      </button>
  );

  const listToRender = activeTab === 'children' ? childrenAttendance : staffAttendance;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">الحضور والغياب</h2>
         <div className="flex items-center gap-4">
             <label htmlFor="attendance-date" className="font-medium">التاريخ:</label>
             <input
                id="attendance-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500"
            />
         </div>
      </div>
      
      <div className="bg-white p-2 rounded-lg shadow-sm w-fit">
        <div className="flex space-x-1">
          <button onClick={() => setActiveTab('children')} className={`px-6 py-2 rounded-md text-sm font-medium ${activeTab === 'children' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>الأطفال</button>
          <button onClick={() => setActiveTab('staff')} className={`px-6 py-2 rounded-md text-sm font-medium ${activeTab === 'staff' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>الموظفون</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
         <ul className="divide-y divide-gray-200">
            {listToRender.map(record => (
                <li key={record.id} className="p-4 flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{record.name}</span>
                    <div className="flex items-center space-x-2">
                        <StatusButton current={record.status} value="حاضر" onClick={() => handleStatusChange(record.id, 'حاضر')} color="bg-green-500" />
                        <StatusButton current={record.status} value="غائب" onClick={() => handleStatusChange(record.id, 'غائب')} color="bg-red-500" />
                        <StatusButton current={record.status} value="غائب بعذر" onClick={() => handleStatusChange(record.id, 'غائب بعذر')} color="bg-yellow-500" />
                    </div>
                </li>
            ))}
         </ul>
      </div>
    </div>
  );
};

export default AttendanceView;

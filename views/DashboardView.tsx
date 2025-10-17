import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { UserGroupIcon, CalendarDaysIcon, CurrencyDollarIcon, BellAlertIcon, ArrowUpIcon, ArrowDownIcon, ScaleIcon } from '../components/Icons';
import { MOCK_CHILDREN, MOCK_APPOINTMENTS, MOCK_CHILD_PAYMENTS, MOCK_STAFF_SALARIES } from '../constants';
import { ChildStatus, User, UserRole } from '../types';

const data = [
  { name: 'يناير', "الإيرادات": 4000, "المصروفات": 2400 },
  { name: 'فبراير', "الإيرادات": 3000, "المصروفات": 1398 },
  { name: 'مارس', "الإيرادات": 2000, "المصروفات": 9800 },
  { name: 'أبريل', "الإيرادات": 2780, "المصروفات": 3908 },
  { name: 'مايو', "الإيرادات": 1890, "المصروفات": 4800 },
  { name: 'يونيو', "الإيرادات": 2390, "المصروفات": 3800 },
  { name: 'يوليو', "الإيرادات": 3490, "المصروفات": 4300 },
];

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminStatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className={`bg-white p-6 rounded-xl shadow-md border-r-4 ${color}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-gray-500 font-medium">{title}</p>
                <p className="text-3xl font-bold mt-1">{value} د.ج</p>
            </div>
            {icon}
        </div>
    </div>
);


const DashboardView: React.FC<{ user: User }> = ({ user }) => {
    const activeChildren = MOCK_CHILDREN.filter(c => c.status === ChildStatus.Active).length;
    const upcomingAppointments = MOCK_APPOINTMENTS.filter(a => new Date(a.date) >= new Date() && a.status === 'scheduled').length;
    
    const overduePayments = MOCK_CHILD_PAYMENTS.filter(p => p.paidAmount < p.totalDue && new Date(p.date) < new Date()).length;
    const unpaidSalaries = MOCK_STAFF_SALARIES.filter(s => s.status === 'unpaid').length;
    const financialAlerts = overduePayments + unpaidSalaries;

    const totalIncome = MOCK_CHILD_PAYMENTS.reduce((sum, p) => sum + p.paidAmount, 0);
    const totalExpenses = MOCK_STAFF_SALARIES.reduce((sum, s) => sum + s.amount, 0);
    const netProfit = totalIncome - totalExpenses;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">لوحة التحكم الرئيسية</h2>
      
      {user.role === UserRole.Admin && (
        <div className="bg-teal-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-teal-800 mb-4">ملخص المسؤول</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AdminStatCard icon={<ArrowUpIcon className="h-8 w-8 text-green-500"/>} title="إجمالي الإيرادات" value={totalIncome.toLocaleString()} color="border-green-500" />
                <AdminStatCard icon={<ArrowDownIcon className="h-8 w-8 text-red-500"/>} title="إجمالي المصروفات" value={totalExpenses.toLocaleString()} color="border-red-500" />
                <AdminStatCard icon={<ScaleIcon className="h-8 w-8 text-blue-500"/>} title="صافي الربح" value={netProfit.toLocaleString()} color="border-blue-500" />
            </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<UserGroupIcon className="h-7 w-7 text-white"/>} title="الأطفال النشطين" value={activeChildren.toString()} color="bg-blue-500" />
        <StatCard icon={<CalendarDaysIcon className="h-7 w-7 text-white"/>} title="المواعيد القادمة" value={upcomingAppointments.toString()} color="bg-green-500" />
        <StatCard icon={<CurrencyDollarIcon className="h-7 w-7 text-white"/>} title="المستحقات غير مدفوعة" value={MOCK_CHILD_PAYMENTS.filter(p => p.paidAmount < p.totalDue).length.toString()} color="bg-yellow-500" />
        <StatCard icon={<BellAlertIcon className="h-7 w-7 text-white"/>} title="تنبيهات مالية" value={financialAlerts.toString()} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">نظرة عامة على الإيرادات والمصروفات</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" reversed={true}/>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="الإيرادات" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="المصروفات" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">المواعيد القادمة</h3>
            <div className="space-y-4">
                {MOCK_APPOINTMENTS.filter(a => new Date(a.date) >= new Date() && a.status === 'scheduled').slice(0, 4).map(apt => (
                    <div key={apt.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                        <div>
                            <p className="font-semibold">{apt.childName}</p>
                            <p className="text-sm text-gray-500">{apt.date} - {apt.time}</p>
                        </div>
                        <span className="text-xs font-medium text-teal-700 bg-teal-200 px-2 py-1 rounded-full">مجدول</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;

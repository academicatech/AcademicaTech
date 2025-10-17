
import React from 'react';
import { MOCK_APPOINTMENTS } from '../constants';
import { CalendarIcon } from '../components/Icons';

const AppointmentsView: React.FC = () => {
    
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const today = new Date();
  
  const renderCalendar = () => {
    const calendarDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        const dayString = day.toISOString().split('T')[0];
        const appointmentsForDay = MOCK_APPOINTMENTS.filter(apt => apt.date === dayString);

        calendarDays.push(
            <div key={i} className="bg-white rounded-lg shadow-md p-4 min-h-[200px]">
                <p className="font-bold text-center">{days[day.getDay()]}</p>
                <p className="text-sm text-gray-500 text-center mb-4">{day.toLocaleDateString('ar-EG-u-nu-latn', { day: 'numeric', month: 'long' })}</p>
                <div className="space-y-2">
                    {appointmentsForDay.length > 0 ? (
                        appointmentsForDay.map(apt => (
                            <div key={apt.id} className="p-2 rounded-md bg-teal-100 border-r-4 border-teal-500">
                                <p className="text-sm font-semibold text-teal-800">{apt.childName}</p>
                                <p className="text-xs text-teal-600">{apt.time}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-gray-400 text-center pt-8">لا توجد مواعيد</p>
                    )}
                </div>
            </div>
        );
    }
    return calendarDays;
  };
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">المواعيد والجلسات</h2>
        <button className="flex items-center bg-teal-500 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-600 transition-colors">
          <CalendarIcon className="w-5 h-5 me-2" />
          تحديد موعد جديد
        </button>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4">عرض الأسبوع</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsView;

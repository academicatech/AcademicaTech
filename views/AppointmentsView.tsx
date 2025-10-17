import React, { useState } from 'react';
import { MOCK_APPOINTMENTS, MOCK_CHILDREN, MOCK_USERS } from '../constants';
import { Appointment } from '../types';
import { PlusIcon, PencilIcon, TrashIcon } from '../components/Icons';

const AppointmentsView: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleOpenModal = (appointment: Appointment | null) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSaveAppointment = (appointmentData: Omit<Appointment, 'id' | 'childName' | 'therapistName'>) => {
    const child = MOCK_CHILDREN.find(c => c.id === appointmentData.childId);
    const therapist = MOCK_USERS.find(u => u.id === appointmentData.therapistId);

    if (!child || !therapist) {
        alert("الطفل أو المختص غير موجود");
        return;
    }

    if (selectedAppointment) {
      // Edit
      setAppointments(appointments.map(a => a.id === selectedAppointment.id ? { 
          ...selectedAppointment, 
          ...appointmentData, 
          childName: child.name, 
          therapistName: therapist.name 
      } : a));
    } else {
      // Add
      const newAppointment: Appointment = {
        id: Date.now(),
        childName: child.name,
        therapistName: therapist.name,
        ...appointmentData,
      };
      setAppointments([...appointments, newAppointment]);
    }
    handleCloseModal();
  };

  const handleDeleteAppointment = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الموعد؟')) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  const getStatusChip = (status: Appointment['status']) => {
    switch (status) {
      case 'مجدول':
        return <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">مجدول</span>;
      case 'مكتمل':
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">مكتمل</span>;
      case 'ملغي':
        return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">ملغي</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">المواعيد والجلسات</h2>
        <button onClick={() => handleOpenModal(null)} className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow hover:bg-teal-600">
          <PlusIcon className="w-5 h-5" />
          تحديد موعد جديد
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">الطفل</th>
              <th scope="col" className="px-6 py-3">التاريخ</th>
              <th scope="col" className="px-6 py-3">الوقت</th>
              <th scope="col" className="px-6 py-3">المختص</th>
              <th scope="col" className="px-6 py-3">الحالة</th>
              <th scope="col" className="px-6 py-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {appointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(apt => (
              <tr key={apt.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold text-gray-900">{apt.childName}</td>
                <td className="px-6 py-4">{apt.date}</td>
                <td className="px-6 py-4">{apt.time}</td>
                <td className="px-6 py-4">{apt.therapistName}</td>
                <td className="px-6 py-4">{getStatusChip(apt.status)}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                   <button onClick={() => handleOpenModal(apt)} className="p-2 text-gray-500 hover:text-yellow-600" title="تعديل"><PencilIcon className="w-5 h-5"/></button>
                   <button onClick={() => handleDeleteAppointment(apt.id)} className="p-2 text-gray-500 hover:text-red-600" title="حذف"><TrashIcon className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <AppointmentModal appointment={selectedAppointment} onClose={handleCloseModal} onSave={handleSaveAppointment} />}
    </div>
  );
};

// AppointmentModal Component
interface AppointmentModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onSave: (appointmentData: Omit<Appointment, 'id' | 'childName' | 'therapistName'>) => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ appointment, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    childId: appointment?.childId || MOCK_CHILDREN[0]?.id,
    date: appointment?.date || new Date().toISOString().split('T')[0],
    time: appointment?.time || '',
    therapistId: appointment?.therapistId || MOCK_USERS.filter(u => u.role === 'أخصائي أرطفوني')[0]?.id,
    status: appointment?.status || 'مجدول',
    notes: appointment?.notes || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'childId' || name === 'therapistId' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h3 className="text-2xl font-bold mb-6">{appointment ? 'تعديل الموعد' : 'تحديد موعد جديد'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">الطفل</label>
            <select name="childId" value={formData.childId} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required>
              {MOCK_CHILDREN.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">التاريخ</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الوقت</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required />
            </div>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">المختص</label>
            <select name="therapistId" value={formData.therapistId} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required>
              {MOCK_USERS.filter(u => u.role === 'أخصائي أرطفوني').map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">الحالة</label>
            <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500">
              <option value="مجدول">مجدول</option>
              <option value="مكتمل">مكتمل</option>
              <option value="ملغي">ملغي</option>
            </select>
          </div>
           <div>
              <label className="block text-sm font-medium text-gray-700">ملاحظات</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500"></textarea>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">إلغاء</button>
            <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default AppointmentsView;

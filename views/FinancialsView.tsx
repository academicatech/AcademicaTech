import React, { useState } from 'react';
import { User, UserRole, ChildPayment, StaffSalary } from '../types';
import { MOCK_CHILD_PAYMENTS, MOCK_STAFF_SALARIES, MOCK_CHILDREN, MOCK_USERS } from '../constants';
import { PlusIcon, PencilIcon, TrashIcon } from '../components/Icons';

interface FinancialsViewProps {
  user: User;
}

const FinancialsView: React.FC<FinancialsViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'children' | 'staff'>('children');
  const [childPayments, setChildPayments] = useState<ChildPayment[]>(MOCK_CHILD_PAYMENTS);
  const [staffSalaries, setStaffSalaries] = useState<StaffSalary[]>(MOCK_STAFF_SALARIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChildPayment | StaffSalary | null>(null);

  const handleOpenModal = (item: ChildPayment | StaffSalary | null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSave = (data: any) => {
    if (activeTab === 'children') {
        const payment = data as ChildPayment;
        if (selectedItem) {
            setChildPayments(childPayments.map(p => p.id === selectedItem.id ? { ...p, ...payment } : p));
        } else {
            setChildPayments([...childPayments, { ...payment, id: Date.now() }]);
        }
    } else {
        const salary = data as StaffSalary;
        if (selectedItem) {
            setStaffSalaries(staffSalaries.map(s => s.id === selectedItem.id ? { ...s, ...salary } : s));
        } else {
            setStaffSalaries([...staffSalaries, { ...salary, id: Date.now() }]);
        }
    }
    handleCloseModal();
  };
  
  const handleDelete = (id: number) => {
      if (activeTab === 'children') {
          if (window.confirm('هل أنت متأكد من حذف هذه الدفعة؟')) {
              setChildPayments(childPayments.filter(p => p.id !== id));
          }
      } else {
           if (window.confirm('هل أنت متأكد من حذف هذا الراتب؟')) {
              setStaffSalaries(staffSalaries.filter(s => s.id !== id));
          }
      }
  };


  const getPaymentStatus = (payment: ChildPayment) => {
    const remaining = payment.totalDue - payment.paidAmount;
    if (remaining <= 0) return <span className="text-green-600 font-bold">مدفوع بالكامل</span>;
    if (payment.paidAmount > 0) return <span className="text-yellow-600 font-bold">مدفوع جزئياً</span>;
    return <span className="text-red-600 font-bold">غير مدفوع</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">المستحقات المالية</h2>
        <button onClick={() => handleOpenModal(null)} className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow hover:bg-teal-600">
          <PlusIcon className="w-5 h-5" />
          {activeTab === 'children' ? 'إضافة دفعة' : 'إضافة راتب'}
        </button>
      </div>
      
      <div className="bg-white p-2 rounded-lg shadow-sm w-fit">
        <div className="flex space-x-1">
          <button onClick={() => setActiveTab('children')} className={`px-6 py-2 rounded-md text-sm font-medium ${activeTab === 'children' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>مستحقات الأطفال</button>
          {user.role === UserRole.Admin && (
             <button onClick={() => setActiveTab('staff')} className={`px-6 py-2 rounded-md text-sm font-medium ${activeTab === 'staff' ? 'bg-teal-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>رواتب الموظفين</button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        {activeTab === 'children' ? (
           <table className="w-full text-sm text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                 <tr>
                    <th className="px-6 py-3">الطفل</th>
                    <th className="px-6 py-3">التاريخ</th>
                    <th className="px-6 py-3">الوصف</th>
                    <th className="px-6 py-3">المبلغ المستحق</th>
                    <th className="px-6 py-3">المبلغ المدفوع</th>
                    <th className="px-6 py-3">المتبقي</th>
                    <th className="px-6 py-3">الحالة</th>
                    <th className="px-6 py-3">إجراءات</th>
                 </tr>
              </thead>
              <tbody>
                {childPayments.map(p => (
                    <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-gray-900">{p.childName}</td>
                        <td className="px-6 py-4">{p.date}</td>
                        <td className="px-6 py-4">{p.description}</td>
                        <td className="px-6 py-4">{p.totalDue.toLocaleString()} د.ج</td>
                        <td className="px-6 py-4">{p.paidAmount.toLocaleString()} د.ج</td>
                        <td className="px-6 py-4 font-bold">{(p.totalDue - p.paidAmount).toLocaleString()} د.ج</td>
                        <td className="px-6 py-4">{getPaymentStatus(p)}</td>
                        <td className="px-6 py-4 flex items-center space-x-2">
                           <button onClick={() => handleOpenModal(p)} className="p-2 text-gray-500 hover:text-yellow-600"><PencilIcon className="w-5 h-5"/></button>
                           <button onClick={() => handleDelete(p.id)} className="p-2 text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                        </td>
                    </tr>
                ))}
              </tbody>
           </table>
        ) : (
            <table className="w-full text-sm text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                     <tr>
                        <th className="px-6 py-3">الموظف</th>
                        <th className="px-6 py-3">التاريخ</th>
                        <th className="px-6 py-3">المبلغ</th>
                        <th className="px-6 py-3">الحالة</th>
                        <th className="px-6 py-3">إجراءات</th>
                     </tr>
                </thead>
                <tbody>
                    {staffSalaries.map(s => (
                        <tr key={s.id} className="bg-white border-b hover:bg-gray-50">
                             <td className="px-6 py-4 font-semibold text-gray-900">{s.staffName}</td>
                             <td className="px-6 py-4">{s.date}</td>
                             <td className="px-6 py-4 font-bold">{s.amount.toLocaleString()} د.ج</td>
                             <td className="px-6 py-4">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${s.status === 'مدفوع' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{s.status}</span>
                             </td>
                             <td className="px-6 py-4 flex items-center space-x-2">
                               <button onClick={() => handleOpenModal(s)} className="p-2 text-gray-500 hover:text-yellow-600"><PencilIcon className="w-5 h-5"/></button>
                               <button onClick={() => handleDelete(s.id)} className="p-2 text-gray-500 hover:text-red-600"><TrashIcon className="w-5 h-5"/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
      </div>

      {isModalOpen && <FinancialModal item={selectedItem} type={activeTab} onClose={handleCloseModal} onSave={handleSave} />}
    </div>
  );
};

// FinancialModal Component
interface FinancialModalProps {
    item: ChildPayment | StaffSalary | null;
    type: 'children' | 'staff';
    onClose: () => void;
    onSave: (data: any) => void;
}

const FinancialModal: React.FC<FinancialModalProps> = ({ item, type, onClose, onSave }) => {
    const isChildPayment = type === 'children';
    const [formData, setFormData] = useState(
        isChildPayment
        ? {
            childId: (item as ChildPayment)?.childId || MOCK_CHILDREN[0]?.id,
            date: item?.date || new Date().toISOString().split('T')[0],
            description: (item as ChildPayment)?.description || '',
            totalDue: (item as ChildPayment)?.totalDue || 0,
            paidAmount: (item as ChildPayment)?.paidAmount || 0,
          }
        : {
            staffId: (item as StaffSalary)?.staffId || MOCK_USERS.filter(u => u.role === 'أخصائي أرطفوني')[0]?.id,
            date: item?.date || new Date().toISOString().split('T')[0],
            amount: (item as StaffSalary)?.amount || 0,
            status: (item as StaffSalary)?.status || 'غير مدفوع',
          }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: (name === 'childId' || name === 'staffId' || name === 'totalDue' || name === 'paidAmount' || name === 'amount') ? Number(value) : value }));
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalData = isChildPayment ? {
            ...formData,
            childName: MOCK_CHILDREN.find(c => c.id === (formData as any).childId)?.name || 'N/A'
        } : {
            ...formData,
            staffName: MOCK_USERS.find(u => u.id === (formData as any).staffId)?.name || 'N/A'
        };
        onSave(finalData);
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h3 className="text-2xl font-bold mb-6">{item ? 'تعديل السجل المالي' : (isChildPayment ? 'إضافة دفعة جديدة' : 'إضافة راتب جديد')}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isChildPayment ? (
                        <>
                            <ChildPaymentForm data={formData as any} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <StaffSalaryForm data={formData as any} onChange={handleChange} />
                        </>
                    )}
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">إلغاء</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600">حفظ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const ChildPaymentForm: React.FC<{data: any, onChange: any}> = ({data, onChange}) => (
    <>
        <div>
            <label className="block text-sm font-medium text-gray-700">الطفل</label>
            <select name="childId" value={data.childId} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required>
              {MOCK_CHILDREN.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">التاريخ</label>
            <input type="date" name="date" value={data.date} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">الوصف</label>
            <input type="text" name="description" value={data.description} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">المبلغ المستحق</label>
                <input type="number" name="totalDue" value={data.totalDue} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">المبلغ المدفوع</label>
                <input type="number" name="paidAmount" value={data.paidAmount} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
            </div>
        </div>
    </>
);

const StaffSalaryForm: React.FC<{data: any, onChange: any}> = ({data, onChange}) => (
    <>
        <div>
            <label className="block text-sm font-medium text-gray-700">الموظف</label>
            <select name="staffId" value={data.staffId} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
                {MOCK_USERS.filter(u => u.role !== UserRole.Admin).map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">التاريخ</label>
            <input type="date" name="date" value={data.date} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">المبلغ</label>
            <input type="number" name="amount" value={data.amount} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">الحالة</label>
            <select name="status" value={data.status} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
                <option value="غير مدفوع">غير مدفوع</option>
                <option value="مدفوع">مدفوع</option>
            </select>
        </div>
    </>
);

export default FinancialsView;

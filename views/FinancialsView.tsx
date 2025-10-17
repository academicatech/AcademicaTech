import React, { useState } from 'react';
import { MOCK_CHILD_PAYMENTS, MOCK_STAFF_SALARIES } from '../constants';
import { PaymentStatus } from '../types';


const FinancialsView: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'children' | 'staff'>('children');

    const getPaymentStatus = (p: typeof MOCK_CHILD_PAYMENTS[0]): { status: PaymentStatus, text: string } => {
        if (p.paidAmount >= p.totalDue) return { status: 'paid', text: 'مدفوع' };
        if (new Date(p.date) < new Date()) return { status: 'overdue', text: 'متأخر' };
        return { status: 'due', text: 'مستحق' };
    }

    const paymentStatusColors: Record<PaymentStatus, string> = {
        'paid': 'bg-green-100 text-green-800',
        'due': 'bg-yellow-100 text-yellow-800',
        'overdue': 'bg-red-100 text-red-800',
    };

    const salaryStatusColors = {
        'paid': 'bg-green-100 text-green-800',
        'unpaid': 'bg-red-100 text-red-800',
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">المستحقات المالية</h2>

            <div className="bg-white rounded-xl shadow-md">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('children')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'children' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            مستحقات الأطفال
                        </button>
                        <button
                            onClick={() => setActiveTab('staff')}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'staff' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            رواتب الموظفين
                        </button>
                    </nav>
                </div>

                <div className="p-6 overflow-x-auto">
                    {activeTab === 'children' && (
                        <table className="w-full text-right min-w-[600px]">
                            <thead className="border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-3 text-sm font-semibold">اسم الطفل</th>
                                    <th className="p-3 text-sm font-semibold">المبلغ الإجمالي</th>
                                    <th className="p-3 text-sm font-semibold">المبلغ المدفوع</th>
                                    <th className="p-3 text-sm font-semibold">المبلغ المتبقي</th>
                                    <th className="p-3 text-sm font-semibold">تاريخ الاستحقاق</th>
                                    <th className="p-3 text-sm font-semibold">الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_CHILD_PAYMENTS.map(p => {
                                    const remaining = p.totalDue - p.paidAmount;
                                    const statusInfo = getPaymentStatus(p);
                                    return (
                                    <tr key={p.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-sm font-semibold">{p.childName}</td>
                                        <td className="p-3 text-sm">{p.totalDue.toLocaleString()} د.ج</td>
                                        <td className="p-3 text-sm text-green-600">{p.paidAmount.toLocaleString()} د.ج</td>
                                        <td className={`p-3 text-sm font-bold ${remaining > 0 ? 'text-red-600' : 'text-gray-700'}`}>{remaining.toLocaleString()} د.ج</td>
                                        <td className="p-3 text-sm">{p.date}</td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${paymentStatusColors[statusInfo.status]}`}>{statusInfo.text}</span>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    )}
                    {activeTab === 'staff' && (
                        <table className="w-full text-right min-w-[600px]">
                           <thead className="border-b-2 border-gray-200">
                                <tr>
                                    <th className="p-3 text-sm font-semibold">اسم الموظف</th>
                                    <th className="p-3 text-sm font-semibold">الشهر</th>
                                    <th className="p-3 text-sm font-semibold">المبلغ</th>
                                    <th className="p-3 text-sm font-semibold">الحالة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_STAFF_SALARIES.map(s => (
                                    <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3 text-sm font-semibold">{s.staffName}</td>
                                        <td className="p-3 text-sm">{s.month}</td>
                                        <td className="p-3 text-sm">{s.amount.toLocaleString()} د.ج</td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${salaryStatusColors[s.status]}`}>{s.status === 'paid' ? 'مدفوع' : 'غير مدفوع'}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinancialsView;

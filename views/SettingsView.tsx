import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">الإعدادات العامة</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-6 border-b pb-3">تخصيص العيادة</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">اسم العيادة</label>
              <input type="text" defaultValue="عيادتي الأرطوفونية" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">شعار العيادة</label>
              <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">لون الهوية الرئيسي</label>
              <input type="color" defaultValue="#14b8a6" className="mt-1 block w-full h-10 px-1 py-1 bg-white border border-gray-300 rounded-md cursor-pointer"/>
            </div>
            <div className="pt-4">
              <button type="submit" className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600">حفظ التغييرات</button>
            </div>
          </form>
        </div>

        <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 border-b pb-3">تغيير كلمة المرور</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">كلمة المرور الحالية</label>
                        <input type="password" placeholder="********" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">كلمة المرور الجديدة</label>
                        <input type="password" placeholder="********" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">تأكيد كلمة المرور الجديدة</label>
                        <input type="password" placeholder="********" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">تحديث كلمة المرور</button>
                    </div>
                </form>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 border-b pb-3">إعدادات التنبيهات</h3>
                 <form>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">تذكير بدفع المستحقات قبل</label>
                         <select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500">
                            <option>3 أيام</option>
                            <option>7 أيام</option>
                            <option>14 يوماً</option>
                        </select>
                    </div>
                     <div className="pt-4 mt-4">
                        <button type="submit" className="px-6 py-2 bg-teal-500 text-white rounded-lg shadow hover:bg-teal-600">حفظ الإعدادات</button>
                    </div>
                 </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

import React, { useState, useRef, useEffect } from 'react';
import { MOCK_CHILDREN } from '../constants';
import { Child, ChildStatus } from '../types';
import { PlusIcon, PencilIcon, TrashIcon, QrCodeIcon, PrinterIcon } from '../components/Icons';

// This would be declared in a global scope in a real app
declare var QRCode: any;
declare var JsBarcode: any;

const ChildrenView: React.FC = () => {
  const [children, setChildren] = useState<Child[]>(MOCK_CHILDREN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [childToPrint, setChildToPrint] = useState<Child | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const printableQrCodeRef = useRef<HTMLDivElement>(null);
  const printableBarcodeRef = useRef<SVGSVGElement>(null);
  
  // Effect for the QR Code modal
  useEffect(() => {
    if (isQrModalOpen && selectedChild && qrCodeRef.current) {
      qrCodeRef.current.innerHTML = '';
      try {
        if (typeof QRCode !== 'undefined') {
          // FIX: Use a short, unique identifier (fileNumber) to avoid "code length overflow" errors, especially with non-ASCII characters.
          new QRCode(qrCodeRef.current, {
            text: selectedChild.fileNumber,
            width: 200,
            height: 200,
            correctLevel: QRCode.CorrectLevel.H, // Add error correction for robustness
          });
        } else {
           throw new Error("QRCode library is not loaded.");
        }
      } catch (error) {
        console.error("Failed to generate QR Code:", error);
        qrCodeRef.current.textContent = "خطأ في إنشاء رمز QR.";
      }
    }
  }, [isQrModalOpen, selectedChild]);

  // Effect specifically for handling the print action
  useEffect(() => {
    if (childToPrint && printableQrCodeRef.current && printableBarcodeRef.current) {
      try {
        // Clear previous QR code
        printableQrCodeRef.current.innerHTML = '';
        if (typeof QRCode !== 'undefined') {
          // FIX: Use a short, unique identifier (fileNumber) to avoid "code length overflow" errors.
          new QRCode(printableQrCodeRef.current, { 
            text: childToPrint.fileNumber, 
            width: 100, 
            height: 100,
            correctLevel: QRCode.CorrectLevel.H // Add error correction for robustness
          });
        } else {
          throw new Error("QRCode library is not loaded for printing.");
        }
  
        // Generate Barcode
        if (typeof JsBarcode !== 'undefined') {
          JsBarcode(printableBarcodeRef.current, childToPrint.fileNumber, {
            format: "CODE128",
            width: 2,
            height: 50,
            displayValue: true,
            fontSize: 16,
          });
        } else {
          throw new Error("JsBarcode library is not loaded for printing.");
        }

        // Delay printing to allow DOM to update with generated codes
        const timer = setTimeout(() => {
            window.print();
            setChildToPrint(null); // Reset after printing to hide the print area
        }, 250); // Increased delay slightly to ensure rendering

        // Cleanup the timer if the component unmounts
        return () => clearTimeout(timer);

      } catch (error) {
        console.error("Failed to generate card for printing:", error);
        alert("فشل إنشاء البطاقة للطباعة. يرجى المحاولة مرة أخرى.");
        setChildToPrint(null); // Reset on error
      }
    }
  }, [childToPrint]);


  const handleOpenModal = (child: Child | null) => {
    setSelectedChild(child);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChild(null);
  };

  const handleSaveChild = (childData: Omit<Child, 'id' | 'fileNumber'>) => {
    if (selectedChild) {
      // Edit
      setChildren(children.map(c => c.id === selectedChild.id ? { ...selectedChild, ...childData } : c));
    } else {
      // Add
      const newFileNumber = `C${(Math.max(...children.map(c => parseInt(c.fileNumber.substring(1))), 0) + 1).toString().padStart(3, '0')}`;
      const newChild: Child = {
        id: Date.now(),
        fileNumber: newFileNumber,
        ...childData,
      };
      setChildren([...children, newChild]);
    }
    handleCloseModal();
  };

  const handleDeleteChild = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطفل؟')) {
      setChildren(children.filter(c => c.id !== id));
    }
  };
  
  const handleShowQrCode = (child: Child) => {
    setSelectedChild(child);
    setIsQrModalOpen(true);
  };
  
  const handlePrintCard = (child: Child) => {
    setChildToPrint(child); // This triggers the printing useEffect
  };

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.fileNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusChip = (status: ChildStatus) => {
    switch (status) {
      case ChildStatus.Active:
        return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">نشط</span>;
      case ChildStatus.Inactive:
        return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">غير نشط</span>;
      case ChildStatus.Pending:
        return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">قيد الانتظار</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">إدارة الأطفال</h2>
        <button onClick={() => handleOpenModal(null)} className="flex items-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow hover:bg-teal-600">
          <PlusIcon className="w-5 h-5" />
          إضافة طفل جديد
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
         <input
          type="text"
          placeholder="ابحث بالاسم، رقم الملف، أو اسم ولي الأمر..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">الصورة</th>
              <th scope="col" className="px-6 py-3">رقم الملف</th>
              <th scope="col" className="px-6 py-3">الاسم</th>
              <th scope="col" className="px-6 py-3">ولي الأمر</th>
              <th scope="col" className="px-6 py-3">الهاتف</th>
              <th scope="col" className="px-6 py-3">الحالة</th>
              <th scope="col" className="px-6 py-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildren.map(child => (
              <tr key={child.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img src={child.profilePictureUrl || `https://picsum.photos/seed/${child.id}/40/40`} alt={child.name} className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{child.fileNumber}</td>
                <td className="px-6 py-4 font-semibold">{child.name}</td>
                <td className="px-6 py-4">{child.parentName}</td>
                <td className="px-6 py-4">{child.parentPhone}</td>
                <td className="px-6 py-4">{getStatusChip(child.status)}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                   <button onClick={() => handleShowQrCode(child)} className="p-2 text-gray-500 hover:text-blue-600" title="عرض QR Code"><QrCodeIcon className="w-5 h-5"/></button>
                   <button onClick={() => handlePrintCard(child)} className="p-2 text-gray-500 hover:text-green-600" title="طباعة بطاقة"><PrinterIcon className="w-5 h-5"/></button>
                   <button onClick={() => handleOpenModal(child)} className="p-2 text-gray-500 hover:text-yellow-600" title="تعديل"><PencilIcon className="w-5 h-5"/></button>
                   <button onClick={() => handleDeleteChild(child.id)} className="p-2 text-gray-500 hover:text-red-600" title="حذف"><TrashIcon className="w-5 h-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <ChildModal child={selectedChild} onClose={handleCloseModal} onSave={handleSaveChild} />}
      
      {isQrModalOpen && selectedChild && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setIsQrModalOpen(false)}>
           <div className="bg-white p-8 rounded-lg shadow-xl text-center" onClick={(e) => e.stopPropagation()}>
             <h3 className="text-xl font-bold mb-4">رمز QR لـ {selectedChild.name}</h3>
             <div ref={qrCodeRef} className="flex justify-center"></div>
             {/* UX Improvement: Explain what the QR code contains. */}
             <p className="mt-4 text-sm text-gray-600">
                هذا الرمز يحتوي على رقم ملف الطفل: <strong className="font-mono text-base">{selectedChild.fileNumber}</strong>
             </p>
             <button onClick={() => setIsQrModalOpen(false)} className="mt-6 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">إغلاق</button>
           </div>
         </div>
      )}
      
      {childToPrint && 
        <div id="print-area" className="absolute -left-full top-0">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-teal-500 w-96 font-sans flex flex-col justify-between" style={{height: '550px'}}>
                 <div>
                     <div className="text-center border-b-2 border-gray-200 pb-4">
                         <h2 className="text-xl font-extrabold text-teal-600">عيادتي الأرطوفونية</h2>
                         <p className="text-sm text-gray-500 mt-1">بطاقة تعريف طفل</p>
                     </div>
                     <div className="flex items-center mt-6">
                         <img src={childToPrint.profilePictureUrl || `https://picsum.photos/seed/${childToPrint.id}/100/100`} alt={childToPrint.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"/>
                         <div className="mr-4">
                             <h3 className="text-2xl font-bold text-gray-800">{childToPrint.name}</h3>
                             <p className="text-gray-600">رقم الملف: {childToPrint.fileNumber}</p>
                         </div>
                     </div>
                     <div className="mt-6 space-y-3 text-sm">
                         <p><strong className="w-28 inline-block font-semibold text-gray-500">الحجرة/القسم:</strong> {childToPrint.roomNumber || 'غير محدد'}</p>
                         <p><strong className="w-28 inline-block font-semibold text-gray-500">المشرف/الطبيب:</strong> {childToPrint.therapistName}</p>
                         <p><strong className="w-28 inline-block font-semibold text-gray-500">هاتف الولي:</strong> {childToPrint.parentPhone}</p>
                     </div>
                 </div>
                 
                 <div className="mt-6 flex flex-col items-center justify-center space-y-4 border-t-2 border-gray-200 pt-4">
                    <div ref={printableQrCodeRef}></div>
                    <svg ref={printableBarcodeRef}></svg>
                 </div>
            </div>
        </div>
      }
    </div>
  );
};

// ChildModal Component
interface ChildModalProps {
  child: Child | null;
  onClose: () => void;
  onSave: (childData: Omit<Child, 'id' | 'fileNumber'>) => void;
}

const ChildModal: React.FC<ChildModalProps> = ({ child, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: child?.name || '',
    dob: child?.dob || '',
    gender: child?.gender || 'ذكر',
    profilePictureUrl: child?.profilePictureUrl || '',
    parentName: child?.parentName || '',
    parentPhone: child?.parentPhone || '',
    therapistName: child?.therapistName || '',
    roomNumber: child?.roomNumber || '',
    status: child?.status || ChildStatus.Active,
    registrationDate: child?.registrationDate || new Date().toISOString().split('T')[0],
    diagnosis: child?.diagnosis || '',
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(child?.profilePictureUrl || null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, profilePictureUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6">{child ? 'تعديل بيانات الطفل' : 'إضافة طفل جديد'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-full object-cover" />
            ) : (
                 <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">صورة</div>
            )}
             <div>
                <label className="block text-sm font-medium text-gray-700">صورة الطفل</label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">تاريخ الميلاد</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">الجنس</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500">
                <option value="ذكر">ذكر</option>
                <option value="أنثى">أنثى</option>
              </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">الحالة</label>
                <select name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500">
                    {Object.values(ChildStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">اسم ولي الأمر</label>
              <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">هاتف ولي الأمر</label>
              <input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" required />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">اسم المختص</label>
              <input type="text" name="therapistName" value={formData.therapistName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">رقم الغرفة</label>
              <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500" />
            </div>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700">التشخيص</label>
              <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500"></textarea>
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

export default ChildrenView;
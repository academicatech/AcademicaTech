import { User, UserRole, Child, ChildStatus, Appointment, ChildPayment, StaffSalary, CommunicationMessage } from './types';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'د. أحمد محمود', username: 'admin', password: 'admin', role: UserRole.Admin, phone: '0550112233' },
  { id: 2, name: 'سارة علي', username: '12345', password: '12345', role: UserRole.Doctor, phone: '0550445566' },
  { id: 3, name: 'محمد كريم', username: 'user2', password: 'password', role: UserRole.Doctor, phone: '0550778899' },
];

export const MOCK_CHILDREN: Child[] = [
  { id: 1, fileNumber: 'C001', name: 'يوسف خالد', dob: '2018-05-10', gender: 'ذكر', profilePictureUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', parentName: 'خالد علي', parentPhone: '0555123456', therapistName: 'سارة علي', roomNumber: 'A1', status: ChildStatus.Active, registrationDate: '2023-01-15', diagnosis: 'تأخر في النطق' },
  { id: 2, fileNumber: 'C002', name: 'فاطمة عمر', dob: '2019-02-20', gender: 'أنثى', profilePictureUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', parentName: 'عمر حسن', parentPhone: '0555654321', therapistName: 'سارة علي', roomNumber: 'A2', status: ChildStatus.Active, registrationDate: '2023-03-01', diagnosis: 'تلعثم' },
  { id: 3, fileNumber: 'C003', name: 'علي أحمد', dob: '2017-11-30', gender: 'ذكر', parentName: 'أحمد سعيد', parentPhone: '0555987654', therapistName: 'محمد كريم', roomNumber: 'B1', status: ChildStatus.Inactive, registrationDate: '2022-11-20', diagnosis: 'صعوبات تعلم' },
  { id: 4, fileNumber: 'C004', name: 'نور محمد', dob: '2020-01-01', gender: 'أنثى', profilePictureUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', parentName: 'محمد عبدالله', parentPhone: '0555456789', therapistName: 'محمد كريم', roomNumber: 'A1', status: ChildStatus.Pending, registrationDate: '2023-06-10', diagnosis: 'اضطراب طيف التوحد' },
];

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

export const MOCK_APPOINTMENTS: Appointment[] = [
    { id: 1, childId: 1, childName: 'يوسف خالد', date: '2023-07-20', time: '10:00', therapistId: 2, therapistName: 'سارة علي', status: 'مكتمل' },
    { id: 2, childId: 2, childName: 'فاطمة عمر', date: tomorrow.toISOString().split('T')[0], time: '11:00', therapistId: 2, therapistName: 'سارة علي', status: 'مجدول' },
    { id: 3, childId: 1, childName: 'يوسف خالد', date: dayAfterTomorrow.toISOString().split('T')[0], time: '10:00', therapistId: 2, therapistName: 'سارة علي', status: 'مجدول' },
    { id: 4, childId: 3, childName: 'علي أحمد', date: '2023-07-18', time: '14:00', therapistId: 3, therapistName: 'محمد كريم', status: 'ملغي' },
];

export const MOCK_CHILD_PAYMENTS: ChildPayment[] = [
    { id: 1, childId: 1, childName: 'يوسف خالد', date: '2023-07-01', description: 'رسوم شهر يوليو', totalDue: 5000, paidAmount: 5000, paymentMethod: 'نقداً' },
    { id: 2, childId: 2, childName: 'فاطمة عمر', date: '2023-07-01', description: 'رسوم شهر يوليو', totalDue: 6000, paidAmount: 3000, paymentMethod: 'بطاقة' },
    { id: 3, childId: 3, childName: 'علي أحمد', date: '2023-06-01', description: 'رسوم شهر يونيو', totalDue: 4500, paidAmount: 0 },
    { id: 4, childId: 1, childName: 'يوسف خالد', date: '2023-06-01', description: 'رسوم شهر يونيو', totalDue: 5000, paidAmount: 5000, paymentMethod: 'تحويل' },
];

export const MOCK_STAFF_SALARIES: StaffSalary[] = [
    { id: 1, staffId: 2, staffName: 'سارة علي', date: '2023-06-30', amount: 12000, status: 'مدفوع' },
    { id: 2, staffId: 3, staffName: 'محمد كريم', date: '2023-06-30', amount: 11000, status: 'غير مدفوع' },
];

export const MOCK_MESSAGES: CommunicationMessage[] = [
    {id: 1, childId: 1, authorId: 2, authorName: 'سارة علي', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), content: 'أظهر يوسف تحسناً ملحوظاً في نطق حرف السين اليوم.'},
    {id: 2, childId: 1, authorId: 1, authorName: 'الأب', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), content: 'خبر رائع! هل هناك تمارين يمكننا القيام بها في المنزل؟'},
    {id: 3, childId: 2, authorId: 2, authorName: 'سارة علي', timestamp: new Date().toISOString(), content: 'كانت فاطمة مندمجة جداً في جلسة اليوم.'},
];

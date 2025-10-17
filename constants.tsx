import { Child, ChildStatus, User, UserRole, Appointment, Payment, Salary } from './types';

export const MOCK_CHILDREN: Child[] = [
    { id: 1, fileNumber: '001', name: 'أحمد علي', age: 6, condition: 'تأخر لغوي', registrationDate: '2023-01-15', status: ChildStatus.Active, guardian: 'علي محمد', photoUrl: 'https://picsum.photos/seed/child1/200/200', specialist: 'د. سارة محمود', guardianPhone: '0555123456' },
    { id: 2, fileNumber: '002', name: 'فاطمة الزهراء', age: 5, condition: 'صعوبات نطق', registrationDate: '2023-02-20', status: ChildStatus.Active, guardian: 'محمد عبدالله', photoUrl: 'https://picsum.photos/seed/child2/200/200', specialist: 'د. سارة محمود', guardianPhone: '0555234567' },
    { id: 3, fileNumber: '003', name: 'يوسف خالد', age: 7, condition: 'التأتأة', registrationDate: '2023-03-10', status: ChildStatus.Inactive, guardian: 'خالد إبراهيم', photoUrl: 'https://picsum.photos/seed/child3/200/200', specialist: 'د. إيمان فتحي', guardianPhone: '0555345678' },
    { id: 4, fileNumber: '004', name: 'مريم سعيد', age: 4, condition: 'اضطراب طيف التوحد', registrationDate: '2023-04-05', status: ChildStatus.Active, guardian: 'سعيد حسن', photoUrl: 'https://picsum.photos/seed/child4/200/200', specialist: 'د. سارة محمود', guardianPhone: '0555456789' },
    { id: 5, fileNumber: '005', name: 'عمر ياسر', age: 8, condition: 'صعوبات تعلم', registrationDate: '2023-05-12', status: ChildStatus.Pending, guardian: 'ياسر محمود', photoUrl: 'https://picsum.photos/seed/child5/200/200', specialist: 'د. إيمان فتحي', guardianPhone: '0555567890' },
];

export const MOCK_USERS: User[] = [
    { id: 1, username: 'user', name: 'د. سارة محمود', role: UserRole.Doctor, email: 'sara.m@clinic.com', lastLogin: '2024-07-21 10:00 ص', phone: '0500112233' },
    { id: 2, username: 'nour', name: 'نور أحمد', role: UserRole.Educator, email: 'nour.a@clinic.com', lastLogin: '2024-07-21 09:30 ص', phone: '0500223344' },
    { id: 3, username: 'admin', name: 'علي حسن', role: UserRole.Admin, email: 'ali.h@clinic.com', lastLogin: '2024-07-21 11:00 ص', phone: '0500334455' },
    { id: 4, username: 'parent1', name: 'فاطمة علي (ولي أمر)', role: UserRole.Parent, email: 'parent1@email.com', lastLogin: '2024-07-20 05:00 م', phone: '0500445566' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
    { id: 1, childId: 1, childName: 'أحمد علي', date: '2024-07-22', time: '10:00 ص', status: 'scheduled' },
    { id: 2, childId: 2, childName: 'فاطمة الزهراء', date: '2024-07-22', time: '11:00 ص', status: 'scheduled' },
    { id: 3, childId: 4, childName: 'مريم سعيد', date: '2024-07-23', time: '09:00 ص', status: 'scheduled' },
    { id: 4, childId: 1, childName: 'أحمد علي', date: '2024-07-20', time: '10:00 ص', status: 'completed' },
    { id: 5, childId: 3, childName: 'يوسف خالد', date: '2024-07-19', time: '02:00 م', status: 'canceled' },
];

export const MOCK_CHILD_PAYMENTS: Payment[] = [
    { id: 1, childId: 1, childName: 'أحمد علي', totalDue: 300, paidAmount: 300, date: '2024-07-01' },
    { id: 2, childId: 2, childName: 'فاطمة الزهراء', totalDue: 350, paidAmount: 350, date: '2024-07-05' },
    { id: 3, childId: 4, childName: 'مريم سعيد', totalDue: 400, paidAmount: 100, date: '2024-08-01' },
    { id: 4, childId: 3, childName: 'يوسف خالد', totalDue: 300, paidAmount: 0, date: '2024-06-25' },
];

export const MOCK_STAFF_SALARIES: Salary[] = [
    { id: 1, staffId: 1, staffName: 'د. سارة محمود', amount: 5000, month: 'يوليو 2024', status: 'unpaid' },
    { id: 2, staffId: 2, staffName: 'نور أحمد', amount: 3000, month: 'يوليو 2024', status: 'unpaid' },
    { id: 3, staffId: 3, staffName: 'علي حسن', amount: 4500, month: 'يونيو 2024', status: 'paid' },
];

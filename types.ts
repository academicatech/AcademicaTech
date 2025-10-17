export type Page = 'dashboard' | 'children' | 'appointments' | 'attendance' | 'financials' | 'reports' | 'users' | 'communication' | 'settings';

export enum ChildStatus {
    Active = 'نشط',
    Inactive = 'غير نشط',
    Pending = 'في الانتظار'
}

export interface Child {
    id: number;
    fileNumber: string;
    name: string;
    age: number;
    condition: string;
    registrationDate: string;
    status: ChildStatus;
    guardian: string;
    photoUrl?: string;
    specialist: string;
    guardianPhone: string;
}

export enum UserRole {
    Admin = 'مدير',
    Doctor = 'طبيبة',
    Educator = 'مربي',
    Staff = 'موظف',
    Parent = 'ولي أمر',
    User = 'مستخدم'
}

export interface User {
    id: number;
    name: string;
    role: UserRole;
    email: string;
    lastLogin: string;
    phone: string;
    username: string;
}

export interface Appointment {
    id: number;
    childId: number;
    childName: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'canceled';
}

export type PaymentStatus = 'paid' | 'due' | 'overdue';

export interface Payment {
    id: number;
    childId: number;
    childName: string;
    totalDue: number;
    paidAmount: number;
    date: string;
}

export interface Salary {
    id: number;
    staffId: number;
    staffName: string;
    amount: number;
    month: string;
    status: 'paid' | 'unpaid';
}

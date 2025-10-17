// FIX: Removed self-import of UserRole
export enum UserRole {
  Admin = 'مسؤول',
  Doctor = 'أخصائي أرطفوني',
  Parent = 'ولي أمر',
}

export interface User {
  id: number;
  name: string;
  username: string;
  password?: string;
  role: UserRole;
  phone?: string;
}

export type Page = 'dashboard' | 'children' | 'appointments' | 'attendance' | 'financials' | 'reports' | 'users' | 'communication' | 'settings';

export enum ChildStatus {
  Active = 'نشط',
  Inactive = 'غير نشط',
  Pending = 'قيد الانتظار',
}

export interface Child {
  id: number;
  fileNumber: string;
  name: string;
  dob: string; 
  gender: 'ذكر' | 'أنثى';
  profilePictureUrl?: string;
  parentName: string;
  parentPhone: string;
  therapistName: string;
  roomNumber?: string;
  status: ChildStatus;
  registrationDate: string;
  diagnosis: string;
}

export interface Appointment {
  id: number;
  childId: number;
  childName: string;
  date: string;
  time: string;
  therapistId: number;
  therapistName: string;
  status: 'مجدول' | 'مكتمل' | 'ملغي';
  notes?: string;
}

export interface ChildPayment {
    id: number;
    childId: number;
    childName: string;
    date: string;
    description: string;
    totalDue: number;
    paidAmount: number;
    paymentMethod?: 'نقداً' | 'بطاقة' | 'تحويل';
}

export interface StaffSalary {
    id: number;
    staffId: number;
    staffName: string;
    date: string;
    amount: number;
    status: 'مدفوع' | 'غير مدفوع';
}

export interface AttendanceRecord {
    id: string; // e.g., 'child-1'
    entityId: number;
    name: string;
    status: 'حاضر' | 'غائب' | 'غائب بعذر';
}

export interface CommunicationMessage {
  id: number;
  childId: number;
  authorId: number;
  authorName: string;
  timestamp: string;
  content: string;
}
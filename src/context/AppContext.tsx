import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  doctor: string;
  department: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  contact: string;
  lastVisit: string;
  status: 'Active' | 'Discharged' | 'Critical';
  gender: string;
  bloodGroup: string;
}

export interface Doctor {
  id: string;
  name: string;
  department: string;
  availability: string;
  status: 'Available' | 'On Leave' | 'In Surgery';
  slotDuration: number;
}

export interface Resource {
  id: string;
  type: string;
  name: string;
  total: number;
  occupied: number;
  available: number;
  threshold?: number;
  hospital_id?: string;
}

export interface ServiceRequest {
  id: string;
  hospitalName: string;
  resourceType: string;
  quantity: number;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  message: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  date: string;
}

export interface EmergencyCase {
  id: string;
  patientName: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  arrivalTime: string;
  assignedResource: string;
  status: 'Waiting' | 'In Treatment' | 'Resolved';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'appointment' | 'resource' | 'crisis' | 'service';
  timestamp: string;
  read: boolean;
}

export interface AuditLog {
  id: string;
  action: string;
  module: string;
  timestamp: string;
  status: 'Success' | 'Failed';
  user: string;
}

interface AppContextType {
  appointments: Appointment[];
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  serviceRequests: ServiceRequest[];
  setServiceRequests: React.Dispatch<React.SetStateAction<ServiceRequest[]>>;
  emergencyCases: EmergencyCase[];
  setEmergencyCases: React.Dispatch<React.SetStateAction<EmergencyCase[]>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  markNotificationAsRead: (id: string) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, module: string) => void;
  crisisMode: boolean;
  setCrisisMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};

const initialAppointments: Appointment[] = [];
// Appointments are now loaded from Supabase in the Appointments page

const initialPatients: Patient[] = [
  { id: '1', name: 'Rahul Sharma', age: 45, contact: '+91 98765 11111', lastVisit: '2026-02-18', status: 'Active', gender: 'Male', bloodGroup: 'O+' },
  { id: '2', name: 'Anita Desai', age: 32, contact: '+91 98765 22222', lastVisit: '2026-02-20', status: 'Active', gender: 'Female', bloodGroup: 'A+' },
  { id: '3', name: 'Vikram Joshi', age: 58, contact: '+91 98765 33333', lastVisit: '2026-02-15', status: 'Critical', gender: 'Male', bloodGroup: 'B+' },
  { id: '4', name: 'Sneha Reddy', age: 27, contact: '+91 98765 44444', lastVisit: '2026-02-10', status: 'Discharged', gender: 'Female', bloodGroup: 'AB-' },
];

const initialDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Priya Patel', department: 'Cardiology', availability: 'Mon-Fri 9AM-5PM', status: 'Available', slotDuration: 30 },
  { id: '2', name: 'Dr. Amit Singh', department: 'Neurology', availability: 'Mon-Sat 10AM-4PM', status: 'Available', slotDuration: 45 },
  { id: '3', name: 'Dr. Neha Gupta', department: 'Orthopedics', availability: 'Tue-Sat 8AM-2PM', status: 'In Surgery', slotDuration: 30 },
  { id: '4', name: 'Dr. Rajesh Kumar', department: 'Dermatology', availability: 'Mon-Fri 11AM-6PM', status: 'On Leave', slotDuration: 20 },
];

const initialResources: Resource[] = [];
// Resources are now loaded from Supabase in the Resources page

const initialEmergency: EmergencyCase[] = [
  { id: '1', patientName: 'Emergency Patient 1', severity: 'Critical', arrivalTime: '08:15 AM', assignedResource: 'ICU Bed 3', status: 'In Treatment' },
  { id: '2', patientName: 'Emergency Patient 2', severity: 'High', arrivalTime: '09:30 AM', assignedResource: 'ER Bay 5', status: 'Waiting' },
  { id: '3', patientName: 'Emergency Patient 3', severity: 'Medium', arrivalTime: '10:00 AM', assignedResource: 'General Ward', status: 'In Treatment' },
];

const initialNotifications: Notification[] = [
  { id: '1', title: 'ICU Near Capacity', message: 'ICU occupancy has reached 90%. Consider resource allocation.', type: 'resource', timestamp: new Date(Date.now() - 5 * 60000).toISOString(), read: false },
  { id: '2', title: 'New Appointment', message: 'Rahul Sharma has booked an appointment with Dr. Priya Patel.', type: 'appointment', timestamp: new Date(Date.now() - 15 * 60000).toISOString(), read: false },
  { id: '3', title: 'Blood Bank Alert', message: 'AB- blood units are critically low (2 units remaining).', type: 'crisis', timestamp: new Date(Date.now() - 60 * 60000).toISOString(), read: true },
  { id: '4', title: 'Service Request Approved', message: 'Request for 10 oxygen cylinders has been approved.', type: 'service', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), read: true },
];

const initialServiceRequests: ServiceRequest[] = [
  { id: 'SR001', hospitalName: 'City General Hospital', resourceType: 'Oxygen Cylinders', quantity: 10, urgency: 'High', message: 'ICU running low', status: 'Approved', date: '2026-02-20' },
  { id: 'SR002', hospitalName: 'Metro Care Hospital', resourceType: 'Blood Units (O+)', quantity: 5, urgency: 'Critical', message: 'Emergency surgery scheduled', status: 'Pending', date: '2026-02-20' },
  { id: 'SR003', hospitalName: 'City General Hospital', resourceType: 'Ventilators', quantity: 2, urgency: 'Medium', message: 'Preventive maintenance replacement', status: 'Completed', date: '2026-02-19' },
];

const initialAuditLogs: AuditLog[] = [
  { id: '1', action: 'Created Appointment', module: 'Appointments', timestamp: '2026-02-20 09:00:00', status: 'Success', user: 'Admin' },
  { id: '2', action: 'Updated Bed Status', module: 'Resources', timestamp: '2026-02-20 08:45:00', status: 'Success', user: 'Admin' },
  { id: '3', action: 'Activated Crisis Mode', module: 'Crisis Panel', timestamp: '2026-02-19 22:30:00', status: 'Success', user: 'Admin' },
  { id: '4', action: 'Service Request Created', module: 'Service Requests', timestamp: '2026-02-19 20:15:00', status: 'Success', user: 'Admin' },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(initialServiceRequests);
  const [emergencyCases, setEmergencyCases] = useState<EmergencyCase[]>(initialEmergency);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [crisisMode, setCrisisMode] = useState(false);

  const addAuditLog = (action: string, module: string) => {
    const log: AuditLog = {
      id: Date.now().toString(),
      action,
      module,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'Success',
      user: 'Admin',
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <AppContext.Provider value={{
      appointments, setAppointments,
      patients, setPatients,
      doctors, setDoctors,
      resources, setResources,
      serviceRequests, setServiceRequests,
      emergencyCases, setEmergencyCases,
      notifications, setNotifications,
      markNotificationAsRead,
      auditLogs, addAuditLog,
      crisisMode, setCrisisMode,
    }}>
      {children}
    </AppContext.Provider>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ active }) {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>MediTrack</h2>
      </div>
      
      <nav className="sidebar-nav">
        {user?.role === 'patient' ? (
          <>
            <NavLink to="/" className={active === 'dashboard' ? 'active' : ''}>
              Dashboard
            </NavLink>
            <NavLink to="/appointments" className={active === 'appointments' ? 'active' : ''}>
              Appointments
            </NavLink>
            <NavLink to="/records" className={active === 'records' ? 'active' : ''}>
              Medical Records
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/doctor" className={active === 'queue' ? 'active' : ''}>
              Appointment Queue
            </NavLink>
            <NavLink to="/doctor/patients" className={active === 'patients' ? 'active' : ''}>
              Patients
            </NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
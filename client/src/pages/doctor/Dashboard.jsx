// src/pages/doctor/Dashboard.jsx

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import DoctorQueue from '../../components/dashboard/DoctorQueue';

export default function DoctorDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#f9fbf8]" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[#eaf3e8] px-10 py-3">
        <div className="flex items-center gap-4 text-[#111b0e]">
          <h1 className="text-lg font-bold">MediTrack</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Dr. {user?.name}</span>
          <button onClick={logout} className="text-sm text-[#4fdf1f] hover:underline">
            Logout
          </button>
        </div>
      </header>

      {/* Doctor Dashboard Content */}
      <main className="px-10 py-6">
        <h2 className="text-2xl font-bold text-[#111b0e] mb-4">Doctor Dashboard</h2>
        <DoctorQueue />
      </main>
    </div>
  );
}

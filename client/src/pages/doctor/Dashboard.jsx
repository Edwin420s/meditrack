import React from 'react';
import DoctorQueue from '../../components/dashboard/DoctorQueue';

export default function DoctorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
      <DoctorQueue />
    </div>
  );
}
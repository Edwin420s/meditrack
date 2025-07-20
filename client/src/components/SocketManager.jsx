// client/src/components/SocketManager.jsx

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const SocketManager = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const socket = io('http://localhost:5000', {
      query: { userId: user._id }, // Optional: attach userId for server-side filtering
    });

    socket.on('appointment_update', (appointment) => {
      console.log('✅ Appointment update received:', appointment);
      // TODO: Update app state or notify user via toast/snackbar
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return null; // No UI is rendered
};

export default SocketManager;

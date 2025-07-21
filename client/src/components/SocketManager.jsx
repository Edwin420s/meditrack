// client/src/components/SocketManager.jsx

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';

const SocketManager = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token'),
      },
      query: {
        userId: user._id, // Optional: useful for identifying user on server
      },
    });

    socket.on('connect', () => {
      console.log('✅ Connected to socket server');
    });

    socket.on('appointment_update', (appointment) => {
      console.log('📅 Appointment update received:', appointment);
      // TODO: Dispatch Redux/state update or show toast/snackbar
    });

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from socket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return null;
};

export default SocketManager;

import { useState, useRef } from 'react';
import axiosClient from '../api/axiosClient';
import axios from 'axios';

const AxiosUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const abortControllerRef = useRef(null);

  const fetchUsers = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    setError(null);
    setUsers([]);

    try {
      const response = await axiosClient.get('users', {
        signal: signal
      });
      setUsers(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Запрос был отменен пользователем');
        setError('Загрузка отменена');
      } else {
        console.error(err);
        setError('Ошибка при загрузке');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
      <h2>Axios + AbortController</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <button onClick={fetchUsers} disabled={loading}>
          Загрузить пользователей (Axios)
        </button>
        
        <button onClick={handleCancel} disabled={!loading} style={{ marginLeft: '10px', color: 'red' }}>
          Отменить загрузку
        </button>
      </div>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AxiosUsers;
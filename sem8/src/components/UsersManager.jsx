import { useState } from 'react';
import { 
  useGetUsersQuery, 
  useAddUserMutation, 
  useUpdateUserMutation 
} from '../store/usersApi';

const UsersManager = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  const { data: users, error, isLoading } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateUser({ id: editingId, ...formData });
      setEditingId(null);
    } else {
      await addUser(formData);
    }

    setFormData({ name: '', email: '' });
    
    alert('Запрос выполнен');
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users</div>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <h2>RTK Query Manager</h2>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Name" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          required
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          required
        />
        <button type="submit">
          {editingId ? 'Update User' : 'Add User'}
        </button>
        {editingId && (
            <button type="button" onClick={() => {
                setEditingId(null);
                setFormData({ name: '', email: '' });
            }}>Cancel Edit</button>
        )}
      </form>

      <ul>
        {users?.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
            <button onClick={() => handleEdit(user)} style={{ marginLeft: '10px' }}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersManager;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [profilepic, setProfilePic] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        fetchUsers();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('profilepic', profilepic);

    try {
      const response = await axios.post('http://localhost:3000/signup', formData);
      console.log('User registered successfully:', response.data.user);
      fetchUsers();
    } catch (err) {
      console.error('Error registering user:', err);
    }
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="p-2 mr-2" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="p-2 mr-2" />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required className="p-2 mr-2" />
        <input type="file" onChange={handleFileChange} required className="p-2 mr-2" />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Register</button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Username</th>
            <th className="px-4 py-2">Profile Picture</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="px-4 py-2">{user._id}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">
                {user.profilepic && (
                  <img src={`data:image/jpeg;base64,${user.profilepic}`} alt="Profile" className="h-12 w-12 object-cover rounded-full" />
                )}
              </td>
              <td className="px-4 py-2">
                <button onClick={() => handleDelete(user._id)} className="p-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

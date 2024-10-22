import React, { useState, useEffect } from 'react';
import { getUsers, updateUserStatus } from '../api/Api';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      await updateUserStatus(userId, { active: !isActive });
      fetchUsers(); // Refresh the user list after updating
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      <ul className="list-disc list-inside">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center text-gray-700">
            <div>
              User ID: {user.id}, Name: {user.name}, Status: {user.active ? 'Active' : 'Inactive'}
            </div>
            <button
              onClick={() => handleToggleUserStatus(user.id, user.active)}
              className={`ml-4 p-1 rounded-lg ${user.active ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}
            >
              {user.active ? 'Deactivate' : 'Activate'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

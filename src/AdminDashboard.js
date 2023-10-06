
import React from 'react';
import { createDummyUsers } from './createDummyUser';

const AdminDashboard = () => {
  const handleCreateDummyUsers = async () => {
    await createDummyUsers(50);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleCreateDummyUsers}>Create Dummy User</button>
    </div>
  );
};

export default AdminDashboard;

import React from 'react';
import CustomerForm from './CustomerForm';

function CustomerDashboard({ user, signOut }) {
  return (
    <div className="dashboard-container">
      <button onClick={signOut} className="sign-out-btn">
        Sign Out
      </button>
      
      <h2>Welcome to your Customer Portal, {user?.username}</h2>
      <p>Use the form below to submit a new inquiry or request.</p>
      
      <hr style={{ borderColor: '#333', margin: '2rem 0' }} />
      
      <CustomerForm />
    </div>
  );
}

export default CustomerDashboard;

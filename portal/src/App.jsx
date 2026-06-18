import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import CustomerDashboard from './components/CustomerDashboard';
import outputs from '../amplify_outputs.json';

const isAmplifyConfigured = Object.keys(outputs).length > 0;

function App() {
  if (!isAmplifyConfigured) {
    return (
      <div>
        <div style={{
          backgroundColor: '#ffe0b2',
          color: '#b78103',
          padding: '10px',
          textAlign: 'center',
          fontWeight: '500',
          borderRadius: '6px',
          marginBottom: '20px',
          border: '1px solid #ffe0b2'
        }}>
          ⚠️ Running in Local Mock Mode (AWS Backend Not Configured)
        </div>
        <CustomerDashboard user={{ username: 'Mock Customer' }} signOut={() => alert('Sign out clicked in mock mode')} />
      </div>
    );
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <CustomerDashboard user={user} signOut={signOut} />
      )}
    </Authenticator>
  );
}

export default App;

import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import outputs from '../../amplify_outputs.json';

const isAmplifyConfigured = Object.keys(outputs).length > 0;
const client = isAmplifyConfigured ? generateClient() : null;

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    try {
      if (isAmplifyConfigured && client) {
        await client.models.CustomerForm.create({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });
        setStatus('Form submitted successfully to AWS database!');
      } else {
        console.log('Form data to submit (Mock):', formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStatus('Form submitted successfully (mock)!');
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form', error);
      setStatus('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="customer-form-container">
      <h3>Submit a New Request</h3>
      
      {status && (
        <div style={{ padding: '1rem', backgroundColor: '#eef', color: '#33a', marginBottom: '1rem', borderRadius: '4px' }}>
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;

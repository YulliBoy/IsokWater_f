import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  // New state for the input form
  const [form, setForm] = useState({
    name: '',
    address: '',
    waterRate: '',
  });

  // For showing server response or errors
  const [responseMsg, setResponseMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg(null);
    setErrorMsg(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

      const res = await fetch(`${apiUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          address: form.address,
          waterRate: parseFloat(form.waterRate),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResponseMsg(data.message || 'User saved successfully!');
      setForm({ name: '', address: '', waterRate: '' }); // clear form
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <>


      {/* Water Billing Form */}
      <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '2rem' }}>
        <h2>Water Billing Form</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />
        <label>
          Water Rate (₱/m³):
          <input
            type="number"
            name="waterRate"
            value={form.waterRate}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </label>
        <br /><br />
        <button type="submit">Submit</button>
      </form>


    </>
  );
}

export default App;

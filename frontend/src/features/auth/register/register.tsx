import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerApi } from '../../../shared/config/api';

interface FormData {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await registerApi(formData);
      toast.success(res.data.message);
      navigate('/');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Registration failed";
        toast.error(msg);
      } else {
        toast.error("An unexpected error occurred");
        console.error("❌ Unexpected error:", error);
      }
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />

        <button type="submit">Register</button>

        <p>
          Already have an account?{' '}
          <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;

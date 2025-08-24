import { useState, type ChangeEvent, type FormEvent } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../shared/config/axiosinstance';
import { AxiosError } from 'axios';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('currentUser', JSON.stringify(res.data.user));
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || err.message || 'Server error';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Username"
          required
        />

        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <div className="switch">
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
          <p className="text-center text-sm mt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;

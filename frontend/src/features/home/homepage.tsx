import { useEffect, useState } from 'react';
import axiosInstance from '../../shared/config/axiosinstance';
import './homepage.css';
import UserCard from './usercard';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  createdAt: string;
}

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchUsers = async (searchQuery = '') => {
    try {
      const res = await axiosInstance.get('/auth/users', {
        params: { search: searchQuery }
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers(search);
    }, 300);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="container dark-theme">
      <nav className="navbar">
        <h1 className="logo">COVID</h1>
        <ul className="navlist">
          <li><a href="#">Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contacts</a></li>
          <li>
            <Button onClick={handleLogout}>Logout</Button>
          </li>
        </ul>
      </nav>

      <div className="main">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <div className="users-list">
          {users.length > 0 ? (
            users.map(user => (
              <UserCard
                key={user._id}
                username={user.username}
                createdAt={user.createdAt}
              />
            ))
          ) : (
            <p className="no-users">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

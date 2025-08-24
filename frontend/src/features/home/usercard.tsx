import './usercard.css';

interface UserProps {
  username: string;
  createdAt: string;
}

const UserCard = ({ username, createdAt }: UserProps) => {
  return (
    <div className="user-card">
      <h3>{username}</h3>
      <p>Joined on: {new Date(createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default UserCard;

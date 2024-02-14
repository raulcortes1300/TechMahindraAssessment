import React from "react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserRowProps {
  user: User;
  onDelete: (userId: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ user, onDelete }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.email}</td>
    <td>{user.first_name}</td>
    <td>{user.last_name}</td>
    <td>
      <img src={user.avatar} alt={`Avatar of ${user.first_name}`} />
    </td>
    <td>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </td>
  </tr>
);

export default UserRow;

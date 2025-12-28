// pages/Profile.jsx
import { UseAuth } from "../utils/UseAuth";
import { useState } from "react";

export default function Profile() {
  const { user, login } = UseAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    profile_picture: user.profile_picture
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...formData };
    login(updatedUser);
    setEditing(false);
  };

  return (
    <div>
      <h2>Profile</h2>

      <img
        src={formData.profile_picture || "/default-avatar.png"}
        className="profile-avatar"
        alt="Profile"
      />

      {editing ? (
        <>
          <input name="username" value={formData.username} onChange={handleChange} />
          <input name="email" value={formData.email} onChange={handleChange} />
          <input
            name="profile_picture"
            placeholder="Profile Image URL"
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => setEditing(true)}>Edit Info</button>
        </>
      )}
    </div>
  );
}

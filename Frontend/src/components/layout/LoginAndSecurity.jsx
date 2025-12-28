// pages/LoginSecurity.jsx
import { useState } from "react";

export default function LoginSecurity() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password updated");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login & Security</h2>

      <input
        type="password"
        placeholder="Current Password"
        onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
      />

      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />

      <button type="submit">Update Password</button>
    </form>
  );
}

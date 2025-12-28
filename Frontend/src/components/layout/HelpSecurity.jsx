// pages/HelpSecurity.jsx
import { useState } from "react";

export default function HelpSecurity() {
  const [form, setForm] = useState({ subject: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let temp = {};

    if (!form.subject.trim()) temp.subject = "Subject is required";
    if (form.message.length < 10)
      temp.message = "Message must be at least 10 characters";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Message sent successfully");
    setForm({ subject: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Help & Security</h2>

      <input
        type="text"
        placeholder="Subject"
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      {errors.subject && <small>{errors.subject}</small>}

      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      {errors.message && <small>{errors.message}</small>}

      <button type="submit">Send</button>
    </form>
  );
}

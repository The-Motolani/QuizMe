import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {requestPasswordReset} from '../services/api';

export default function ForgotPassword() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);
      await requestPasswordReset(email);
      toast.success("If this email exists, a reset link has been sent");
      setEmail("");
      navigate("/reset-password/");
    } catch {
      toast.error("Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">

        <h1 className="text-2xl font-bold text-center text-slate-700">
          Forgot Password
        </h1>

        <p className="text-sm text-center text-gray-500">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-200"
          />

          <button
            disabled={loading}
            className="w-full bg-rose-300 text-white font-semibold py-3 rounded-xl hover:bg-rose-400 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center text-sm">
          <Link to="/login" className="text-rose-400 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </section>
  );
}

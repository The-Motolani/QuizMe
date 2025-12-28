import { useState } from "react";
import { toast } from "react-hot-toast";

export default function HelpAndSecurity() {
  const [contactData, setContactData] = useState({
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { subject: "", message: "" };

    if (!contactData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (!contactData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    } else if (contactData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const submitContact = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Here you would send contactData to your backend
    toast.success("Message sent successfully!");
    setContactData({ subject: "", message: "" });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-teal-600">Help & Security</h2>
      <p className="text-gray-500">Contact us if you have any issues or feedback.</p>

      <form onSubmit={submitContact} className="flex flex-col gap-4">
        {/* Subject */}
        <div className="flex flex-col">
          <label htmlFor="subject" className="font-semibold text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={contactData.subject}
            onChange={handleChange}
            className={`p-2 rounded-md border ${
              errors.subject ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-teal-200`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="font-semibold text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            value={contactData.message}
            onChange={handleChange}
            className={`p-2 rounded-md border resize-none ${
              errors.message ? "border-red-400" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-teal-200`}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-teal-200 text-teal-700 py-2 px-6 rounded-full font-semibold hover:bg-teal-100 hover:shadow-md transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

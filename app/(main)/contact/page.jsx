"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "Hello" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setStatus("Message sent successfully!");
      else setStatus("Failed to send message.");
    } catch {
      setStatus("Failed to send message.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you! Fill out the form below and we'll get back
          to you soon.
        </p>
      </div>
      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded shadow"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {status && (
          <div className="mt-4 text-center text-green-600">{status}</div>
        )}
      </form>
    </div>
  );
}

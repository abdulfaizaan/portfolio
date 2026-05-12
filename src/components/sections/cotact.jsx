import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then((result) => {
        alert("Message Sent!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => alert("Oops! Something went wrong. Please try again."));
  };

  return (
    /*<section id="contact" className="min-h-screen flex items-center justify-center py-20 relative">
            <RevealOnScroll />
                <div className="max-w-4xl mx-auto px-4 w-full">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            <span className="neon-text flex items-center justify-center gap-3">
                                📬 Contact Me
                            </span>
                        </h2>
                        <p className="text-gray-400">Feel free to reach out for collaborations or just a friendly chat!</p>
                    </div>
                    <div className="glass-panel p-8 md:p-12 relative overflow-hidden group">
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                                <input type="text" id="name" className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-white/5 rounded focus:ring-cyan-400 focus:border-cyan-400 transition duration-300" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                                <input type="email" id="email" className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-white/5 rounded focus:ring-cyan-400 focus:border-cyan-400 transition duration-300" placeholder="Your Email" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                                <textarea id="message" rows={4} className="mt-1 block w-full px-4 py-2 bg-slate-800 border border-white/5 rounded focus:ring-cyan-400 focus:border-cyan-400 transition duration-300" placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 transition duration-300">
                                Send Message
                            </button>
                        </form>
                        </div>
                    </div>
                    </section>*/
   <section id="contact" className="min-h-screen flex items-center justify-center py-20 relative">
      <RevealOnScroll>
                        <div className="max-w-4xl mx-auto px-4 w-full">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            <span className="neon-text flex items-center justify-center gap-3">
                                📬 Contact Me
                            </span>
                        </h2>
                        <p className="text-gray-400">Feel free to reach out for collaborations or just a friendly chat!</p>
                    </div>
                              <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-red-500 focus:bg-red-500/5"
                placeholder="Name..."
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-red-500 focus:bg-red-500/5"
                placeholder="example@gmail.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-red-500 focus:bg-red-500/5"
                placeholder="Your Message..."
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            >
              Send Message
            </button>
          </form>
                    </div>
      </RevealOnScroll>
    </section>
  );
};
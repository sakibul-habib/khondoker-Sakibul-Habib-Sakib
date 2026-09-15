import React, { useState } from 'react';
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Github,
  Globe,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Building
} from 'lucide-react';
import { EarthLocator3D } from './canvas/EarthLocator3D';
import { Card3D } from './ui/Card3D';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-500/30 text-cyan-800 dark:text-cyan-400 text-xs font-mono mb-3">
            <Send className="w-3.5 h-3.5" />
            <span>DIRECT INQUIRIES & RECRUITMENT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-slate-900 dark:text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2">
            Available for executive IT leadership, senior software architecture, consulting, and university lecturing opportunities.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3D Earth Locator & Contact Coordinates */}
          <div className="lg:col-span-6 space-y-6">
            <Card3D intensity={10} glowColor="cyan" className="p-6">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
                  3D Coordinates & Physical Headquarters
                </span>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Dhaka, Bangladesh</span>
              </div>

              {/* 3D Earth Globe locator */}
              <EarthLocator3D />

              {/* Contact Data Items */}
              <div className="mt-4 space-y-3">
                {/* Address */}
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">Residential & Office Base</span>
                      <span className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed block">
                        {PERSONAL_INFO.address}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PERSONAL_INFO.address, 'address')}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    title="Copy Address"
                  >
                    {copiedField === 'address' ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">Direct Mobile / WhatsApp</span>
                      <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs text-slate-900 dark:text-white font-mono font-bold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        {PERSONAL_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    title="Copy Phone"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email */}
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">Primary Email</span>
                      <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs text-slate-900 dark:text-white font-mono font-bold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    title="Copy Email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center justify-center gap-1.5 text-xs transition-all"
                >
                  <Linkedin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center justify-center gap-1.5 text-xs transition-all"
                >
                  <Github className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.website}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 flex items-center justify-center gap-1.5 text-xs transition-all"
                >
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Website</span>
                </a>
              </div>
            </Card3D>
          </div>

          {/* Right Column: Interactive Message Dispatcher */}
          <div className="lg:col-span-6">
            <Card3D intensity={10} glowColor="blue" className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-heading font-semibold text-lg mb-2">
                <MessageSquare className="w-5 h-5" />
                <h3 className="text-slate-900 dark:text-white">Send Direct Message / Hire Request</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
                Fill in the dispatch details below. A notification will be prepared for Sakib Habib.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1 font-heading">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-sm mx-auto">
                    Thank you for reaching out. Khondoker Sakibul Habib has received your notification and will follow up promptly via {formData.email || 'your email'}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        id="contact-form-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe / HR Director"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                        Your Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        id="contact-form-email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@organization.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                      Subject / Opportunity Type
                    </label>
                    <input
                      type="text"
                      id="contact-form-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Technical Leadership / Software Project Inquiry"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 dark:text-slate-400 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      id="contact-form-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your organization's needs, project requirements, or invitation..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-heading text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Sakib</span>
                  </button>
                </form>
              )}
            </Card3D>
          </div>
        </div>
      </div>
    </section>
  );
};

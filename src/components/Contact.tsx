'use client'

import { useState } from 'react'
import { Mail, Linkedin, Github, Send, CheckCircle, MapPin } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open native mailto prefilled or set submitted state
    const mailtoUrl = `mailto:avishek@live.in?subject=Portfolio Contact from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(formData.message)} (Reply to: ${encodeURIComponent(formData.email)})`
    window.location.href = mailtoUrl
    setSubmitted(true)
  }

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:avishek@live.in',
      value: 'avishek@live.in',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      value: 'Avishek Chakraborty',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com',
      value: '@avishek',
    },
  ]

  return (
    <section id="contact" className="relative z-20 bg-[#121212] py-28 px-6 lg:px-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Direct Value Pitch & Social Connect */}
          <div>
            <span className="text-blue-400 font-mono text-xs uppercase tracking-widest block mb-2">Let's Connect</span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
              LET'S BUILD SOMETHING EXTRAORDINARY.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
              Whether you need to scale enterprise Generative AI solutions, streamline developer workflows, or lead complex technology transformations, let's talk.
            </p>

            <div className="flex items-center gap-3 mb-10 text-white/60">
              <MapPin size={20} className="text-blue-400" />
              <span className="text-sm font-medium">Available for Global Remote &amp; Enterprise Solution Ownership</span>
            </div>

            {/* Social channels grid */}
            <div className="flex flex-col gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.08] transition-all duration-300 min-h-[48px]"
                  >
                    <div className="min-h-[48px] min-w-[48px] rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-xs text-white/40 block font-mono uppercase tracking-wider">{item.name}</span>
                      <span className="text-white font-semibold text-base group-hover:text-blue-300 transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative">
            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-white/60 text-sm mb-8">
              Direct inbox delivery. I typically respond within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle size={56} className="text-green-400 mb-4 animate-bounce" />
                <h4 className="text-2xl font-bold text-white mb-2">Message Initiated!</h4>
                <p className="text-white/70 text-sm max-w-xs">
                  Your mail client opened with your prefilled message. Looking forward to connecting!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 min-h-[48px] px-6 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                    Project Details / Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your business goals or AI project vision..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { FileText, CreditCard, LayoutDashboard, ArrowRight, CheckCircle, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-[#1E3A5F]">PayTrack</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/docs" className="text-slate-600 hover:text-[#1E3A5F] text-sm font-medium">Docs</Link>
            <Link to="/login" className="text-slate-600 hover:text-[#1E3A5F] text-sm font-medium">Login</Link>
            <Link to="/register" className="bg-[#1E3A5F] text-white px-5 py-2 rounded-lg hover:bg-[#162d4a] text-sm font-medium transition">
              Get Started
            </Link>
          </div>
          <button className="md:hidden text-[#1E3A5F]" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 border-t border-slate-100 pt-4 flex flex-col gap-3 max-w-6xl mx-auto">
            <Link to="/docs" onClick={() => setIsOpen(false)} className="text-slate-600 text-sm font-medium py-1">Docs</Link>
            <Link to="/login" onClick={() => setIsOpen(false)} className="text-slate-600 text-sm font-medium py-1">Login</Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="bg-[#1E3A5F] text-white px-5 py-2 rounded-lg text-sm font-medium text-center transition">
              Get Started
            </Link>
          </div>
        )}
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
            v1.0.0 — Now Live
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A5F] mt-4 mb-4 leading-tight">
            Invoice Smart.<br />
            <span className="text-emerald-500">Get Paid Fast.</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg mb-8 leading-relaxed">
            PayTrack helps freelancers and small businesses create invoices,
            track payments, and stay organized — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link to="/register" className="bg-[#1E3A5F] text-white px-8 py-3 rounded-lg hover:bg-[#162d4a] font-medium flex items-center justify-center gap-2 transition">
              Start for Free <ArrowRight size={16} />
            </Link>
            <Link to="/docs" className="border border-[#1E3A5F] text-[#1E3A5F] px-8 py-3 rounded-lg hover:bg-slate-100 font-medium text-center transition">
              View Docs
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-6 justify-center md:justify-start">
            {['No credit card required', 'Free to use', 'JWT Secured'].map((item) => (
              <div key={item} className="flex items-center gap-1 text-slate-500 text-sm">
                <CheckCircle size={14} className="text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center w-full">
          <img src="/images/hero.svg" alt="PayTrack Invoice Management" className="w-full max-w-xs md:max-w-md" />
        </div>
      </div>

      <div className="bg-white py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-3">Why Choose PayTrack?</h2>
            <p className="text-slate-500">Everything you need to manage invoices and payments professionally.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <FileText size={28} className="text-[#1E3A5F]" />, title: 'Easy Invoicing', desc: 'Create professional invoices in seconds. Track status — Pending, Paid, or Overdue with a single click.', bg: 'bg-blue-50' },
              { icon: <CreditCard size={28} className="text-emerald-600" />, title: 'Payment Tracking', desc: 'Record payments against invoices. Support for UPI, Cash, Bank Transfer and Card payments.', bg: 'bg-emerald-50' },
              { icon: <LayoutDashboard size={28} className="text-violet-600" />, title: 'Dashboard Insights', desc: 'Get a clear overview of your finances — total paid, pending, and overdue amounts at a glance.', bg: 'bg-violet-50' }
            ].map((feature) => (
              <div key={feature.title} className="bg-white border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition">
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-5`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 md:py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-3">How It Works</h2>
          <p className="text-slate-500 mb-10 md:mb-14">Get started in 3 simple steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Create your free account in seconds. No credit card required.' },
              { step: '02', title: 'Create Invoice', desc: 'Add client details, amount and due date. Done in under a minute.' },
              { step: '03', title: 'Track Payments', desc: 'Record payments and monitor your dashboard in real time.' }
            ].map((item) => (
              <div key={item.step}>
                <div className="w-14 h-14 bg-[#1E3A5F] text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-[#1E3A5F] text-lg mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-16 md:py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 flex justify-center w-full">
            <img src="/images/about.svg" alt="About PayTrack" className="w-full max-w-xs md:max-w-sm" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <span className="bg-blue-100 text-[#1E3A5F] text-xs font-semibold px-3 py-1 rounded-full">Our Story</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mt-4 mb-4">Built Out of Frustration</h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Freelancers spend hours chasing payments in Excel sheets and WhatsApp messages.
              Invoices get lost. Payments get delayed. Follow-ups feel awkward.
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              We built PayTrack to fix exactly that — a clean, fast, and secure tool
              that puts you in control of your money without the complexity of enterprise software.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 font-medium justify-center md:justify-start">
              <CheckCircle size={18} />
              <span>Simple. Secure. Built for Freelancers.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8e] py-16 md:py-20 px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Get Paid Faster?</h2>
        <p className="text-blue-200 mb-8 text-base md:text-lg">Join freelancers and small businesses who trust PayTrack.</p>
        <Link to="/register" className="bg-emerald-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-lg hover:bg-emerald-600 text-base md:text-lg font-medium inline-flex items-center gap-2 transition">
          Create Free Account <ArrowRight size={18} />
        </Link>
      </div>

      <footer className="bg-[#1E3A5F] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <FileText size={14} className="text-[#1E3A5F]" />
            </div>
            <span className="text-white font-semibold">PayTrack</span>
            <span className="text-blue-300 text-sm ml-2">v1.0.0</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-blue-300 text-sm">
            <Link to="/docs" className="hover:text-white transition">Docs</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScMcsJ1JLsIpfMalbNVNIIpTZOfV1lid4yz1f7QUA0QT0wGhg/viewform" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition font-medium">Feedback</a>
            <a href="https://github.com/Pankaj282002/paytrack/issues" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition font-medium">Report a Bug</a>
          </div>
          <p className="text-blue-300 text-sm">Built with Spring Boot & React</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
import { Link } from 'react-router-dom'
import { FileText, CreditCard, LayoutDashboard, ArrowRight, CheckCircle } from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
            <FileText size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold text-[#1E3A5F]">PayTrack</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/docs" className="text-slate-600 hover:text-[#1E3A5F] text-sm font-medium">
            Docs
          </Link>
          <Link to="/login" className="text-slate-600 hover:text-[#1E3A5F] text-sm font-medium">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#1E3A5F] text-white px-5 py-2 rounded-lg hover:bg-[#162d4a] text-sm font-medium transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
            v1.0.0 — Now Live
          </span>
          <h1 className="text-5xl font-bold text-[#1E3A5F] mt-4 mb-4 leading-tight">
            Invoice Smart.<br />
            <span className="text-emerald-500">Get Paid Fast.</span>
          </h1>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            PayTrack helps freelancers and small businesses create invoices,
            track payments, and stay organized — all in one place.
          </p>
          <div className="flex gap-4">
            <Link
              to="/register"
              className="bg-[#1E3A5F] text-white px-8 py-3 rounded-lg hover:bg-[#162d4a] font-medium flex items-center gap-2 transition"
            >
              Start for Free <ArrowRight size={16} />
            </Link>
            <Link
              to="/docs"
              className="border border-[#1E3A5F] text-[#1E3A5F] px-8 py-3 rounded-lg hover:bg-slate-100 font-medium transition"
            >
              View Docs
            </Link>
          </div>
          <div className="flex items-center gap-6 mt-8">
            {['No credit card required', 'Free to use', 'JWT Secured'].map((item) => (
              <div key={item} className="flex items-center gap-1 text-slate-500 text-sm">
                <CheckCircle size={14} className="text-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/images/hero.svg"
            alt="PayTrack Invoice Management"
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1E3A5F] mb-3">
              Why Choose PayTrack?
            </h2>
            <p className="text-slate-500">
              Everything you need to manage invoices and payments professionally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText size={28} className="text-[#1E3A5F]" />,
                title: 'Easy Invoicing',
                desc: 'Create professional invoices in seconds. Track status — Pending, Paid, or Overdue with a single click.',
                bg: 'bg-blue-50'
              },
              {
                icon: <CreditCard size={28} className="text-emerald-600" />,
                title: 'Payment Tracking',
                desc: 'Record payments against invoices. Support for UPI, Cash, Bank Transfer and Card payments.',
                bg: 'bg-emerald-50'
              },
              {
                icon: <LayoutDashboard size={28} className="text-violet-600" />,
                title: 'Dashboard Insights',
                desc: 'Get a clear overview of your finances — total paid, pending, and overdue amounts at a glance.',
                bg: 'bg-violet-50'
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
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

      {/* How It Works */}
      <div className="py-20 px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1E3A5F] mb-3">How It Works</h2>
          <p className="text-slate-500 mb-14">Get started in 3 simple steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Create your free account in seconds. No credit card required.' },
              { step: '02', title: 'Create Invoice', desc: 'Add client details, amount and due date. Done in under a minute.' },
              { step: '03', title: 'Track Payments', desc: 'Record payments and monitor your dashboard in real time.' }
            ].map((item) => (
              <div key={item.step} className="relative">
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

      {/* About Section */}
      <div className="bg-white py-20 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex justify-center">
            <img
              src="/images/about.svg"
              alt="About PayTrack"
              className="w-full max-w-sm"
            />
          </div>
          <div className="flex-1">
            <span className="bg-blue-100 text-[#1E3A5F] text-xs font-semibold px-3 py-1 rounded-full">
              Our Story
            </span>
            <h2 className="text-3xl font-bold text-[#1E3A5F] mt-4 mb-4">
              Built Out of Frustration
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Freelancers spend hours chasing payments in Excel sheets and WhatsApp messages.
              Invoices get lost. Payments get delayed. Follow-ups feel awkward.
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              We built PayTrack to fix exactly that — a clean, fast, and secure tool
              that puts you in control of your money without the complexity of enterprise software.
            </p>
            <div className="flex items-center gap-2 text-emerald-600 font-medium">
              <CheckCircle size={18} />
              <span>Simple. Secure. Built for Freelancers.</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2d5a8e] py-20 px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Paid Faster?
        </h2>
        <p className="text-blue-200 mb-8 text-lg">
          Join freelancers and small businesses who trust PayTrack.
        </p>
        <Link
          to="/register"
          className="bg-emerald-500 text-white px-10 py-4 rounded-lg hover:bg-emerald-600 text-lg font-medium inline-flex items-center gap-2 transition"
        >
          Create Free Account <ArrowRight size={18} />
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-[#1E3A5F] py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <FileText size={14} className="text-[#1E3A5F]" />
            </div>
            <span className="text-white font-semibold">PayTrack</span>
            <span className="text-blue-300 text-sm ml-2">v1.0.0</span>
          </div>
          <div className="flex gap-6 text-blue-300 text-sm">
            <Link to="/docs" className="hover:text-white transition">Docs</Link>
            <Link to="/login" className="hover:text-white transition">Login</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
          </div>
          <p className="text-blue-300 text-sm">
            Built with Spring Boot & React
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
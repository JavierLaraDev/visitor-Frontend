'use client';
import { FaUser, FaLock } from "react-icons/fa";
import { useLoginHandler } from "../hooks/useLoginHandler";
import { FaShieldAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
export default function Home() {

  const { handleSubmit, email, setEmail, password, setPassword } = useLoginHandler();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Panel - Welcome Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 p-12 flex flex-col justify-center items-center text-white relative rounded-b-3xl md:rounded-r-[25%] overflow-hidden">
          {/* Animated decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full" style={{ animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full" style={{ animation: 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite', animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 text-center">
            {/* Logo placeholder with icon */}
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl border border-white/30 transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-24 h-24 md:w-32 md:h-32 object-contain filter brightness-0 invert opacity-90"
                />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-yellow-200 to-amber-200 bg-clip-text text-transparent">¡Welcome!</h1>
            <p className="text-white/90 mb-6 text-sm leading-relaxed px-4">
              Log in to access your administration panel.
            </p>

          </div>
        </div>

        {/* Right Panel - Login Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div className="group">
              <label className="block text-gray-700 mb-2 font-semibold text-sm ">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-gray-700 mb-2 font-semibold text-sm ">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl outline-none text-gray-700 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-bold text-base hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
            >
              Login
            </button>

            {/* Demo credentials */}
            <div className="mt-6 pt-5 border-t border-gray-200">
              {/* <p className="text-center text-xs text-gray-500 mb-3 font-semibold">Admin Credentials</p> */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px bg-gray-300 flex-1"></div>
                <p className="text-center text-xs text-gray-500 font-semibold uppercase tracking-wide">Test Credentials</p>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 text-center border border-emerald-200 hover:shadow-md transition-shadow" >
                  <p className="text-xs text-gray-500 mb-1 font-medium">Email</p>
                  <p className="text-sm font-mono text-gray-700 font-semibold">javicode@gmail.com</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-3 text-center border border-emerald-200 hover:shadow-md transition-shadow">
                  <p className="text-xs text-gray-500 mb-1 font-medium">Password</p>
                  <p className="text-sm font-mono text-gray-700 font-semibold">contrasena</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

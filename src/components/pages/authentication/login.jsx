import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import LogoImage from "../../../components/assets/style4u-logo.png";
import LoginBanner from "../../../components/assets/loginbanner.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen max-w-[1200px] mx-auto items-center px-4 ">
      {/* Left Section */}
      <div className="flex-1 p-8 md:p-10 flex flex-col justify-center items-center">
        <div className="flex items-center mb-6 text-[#a67c52]">
          <img src= {LogoImage} alt="Style4U Logo" className="w-[120px] h-auto" />
        </div>

        <h1 className="text-[28px] font-bold text-[#222] mb-2">Halo, Selamat Datang</h1>
        <p className="text-[#555] mb-6 text-sm max-w-[350px]">
          Mudahkan pencarian yang kamu inginkan dengan login di Style For You
        </p>

        <form className="w-full max-w-[400px]">
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="w-full py-3 px-4 border border-[#ccc] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
          </div>

          {/* Password + Toggle */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              required
              className="w-full py-3 px-4 border border-[#ccc] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-lime-400 text-white w-7 h-7 rounded-full flex items-center justify-center hover:bg-lime-500 transition"
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          {/* Lupa Password */}
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-[#666] hover:underline">
              Lupa Password?
            </a>
          </div>

          {/* Tombol Masuk */}
          <button
            type="submit"
            className="w-full py-3 bg-lime-400 text-white font-semibold rounded-full hover:bg-lime-500 transition"
          >
            Masuk
          </button>

          {/* Divider */}
          <div className="flex items-center text-[#999] text-sm my-6">
            <div className="flex-1 h-px bg-[#ddd]" />
            <span className="px-3">Atau</span>
            <div className="flex-1 h-px bg-[#ddd]" />
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center gap-5 mb-4">
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-[#ddd] bg-white flex items-center justify-center hover:scale-110 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5"
              />
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-[#ddd] bg-white flex items-center justify-center hover:scale-110 transition"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
                alt="Facebook"
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Link Daftar */}
          <div className="text-center text-sm text-[#666]">
            Belum punya akun?{' '}
            <a href="register" className="text-[#e19037] font-semibold hover:underline">
              Daftar disini
            </a>
          </div>
        </form>
      </div>

      {/* Right Section - Illustration */}
      <div className="w-[10px] h-[600px] hidden md:flex flex-1 items-center justify-center bg-[#E8F8DC] rounded-2xl p-4">
        <img
          src={LoginBanner}
          alt="Happy Shopping"
          className="w-auto h-full max-w-md h-auto object-cover"
        />
      </div>
    </div>
  );
}

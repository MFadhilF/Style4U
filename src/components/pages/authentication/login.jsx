import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen max-w-[1200px] mx-auto">
      <div className="flex-1 p-10 flex flex-col justify-center">
        <div className="flex items-center mb-5 text-[#a67c52]">
          <img src="/Style4U.png" alt="Style4U Logo" className="w-[90px] h-[50px] mr-2" />
        </div>

        <h1 className="text-[28px] mb-2 text-[#333]">Halo, Selamat Datang</h1>
        <p className="text-[#666] mb-7 text-sm max-w-[350px]">
          Mudahkan pencarian yang kamu inginkan dengan login di Style4U
        </p>

        <form className="w-full max-w-[400px]">
          <div className="mb-4 relative">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="w-full py-3 px-4 border border-[#ddd] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Password"
              required
              className="w-full py-3 px-4 border border-[#ddd] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]"
            >
              {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#ffecd1] text-[#333] font-semibold rounded-full hover:bg-[#ffe0b3]"
          >
            Masuk
          </button>

          <div className="flex flex-col items-center gap-2 my-4">
            <a href="#" className="text-sm text-[#666] hover:text-[#333] hover:underline">Lupa Password?</a>
          </div>

          <div className="flex items-center text-[#999] text-sm my-5">
            <div className="flex-1 h-px bg-[#ddd] mx-2" />
            <span>Atau</span>
            <div className="flex-1 h-px bg-[#ddd] mx-2" />
          </div>

          <div className="flex justify-center gap-5">
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-[#ddd] bg-white flex items-center justify-center hover:scale-110 transition"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-[#ddd] bg-white flex items-center justify-center hover:scale-110 transition"
            >
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center mt-5 text-sm text-[#666]">
            <span>Belum Punya Akun? </span>
            <a href="register" className="text-[#a67c52] underline hover:text-[#a67c52]">
              Daftar Disini
            </a>
          </div>
        </form>
      </div>

      <div className="flex-1 bg-[#fff9e6] rounded-[20px] m-5 hidden md:flex items-center justify-center overflow-hidden">
        <div className="w-[80%] h-[80%] bg-[#ffe0b3] rounded-[20px]" />
      </div>
    </div>
  );
}

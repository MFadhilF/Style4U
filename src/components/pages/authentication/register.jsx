import { useState } from "react";
import { useNavigate } from "react-router-dom"; // untuk redirect
import { Eye, EyeOff } from "lucide-react";
import LogoImage from "../../../components/assets/style4u-logo.png";
import LoginBanner from "../../../components/assets/loginbanner.png"; // pastikan file ini ada

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registrasi gagal.");
      } else {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login"); // redirect ke halaman login
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server.");
    }
  };
  return (
    <div className="flex min-h-screen max-w-[1200px] mx-auto items-center text-center">
      {/* Kiri: Form */}
      <div className="flex-1 p-10 flex flex-col justify-center items-center">
        <div className="flex items-center mb-5 text-[#a67c52]">
          <img
            src={LogoImage}
            alt="Style4U Logo"
            className="w-[90px] h-[50px] mr-2"
          />
        </div>
        <h1 className="text-[28px] mb-2 text-[#333] font-bold">Buat Akun</h1>
        <p className="text-[#666] mb-8 text-sm max-w-[350px]">
          Mudahkan pencarian yang kamu inginkan dengan login di Style For You
        </p>
        <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Nama"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#ddd] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#ddd] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#ddd] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]"
              onClick={() => setShowPassword(showPassword)}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="password_confirm"
              placeholder="Konfirmasi Password"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-[#ddd] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]"
              onClick={() => setShowConfirmPassword(showConfirmPassword)}
            >
              {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex items-center text-sm mb-5">
            <input type="checkbox" id="terms" required className="mr-2" />
            <label htmlFor="terms">
              Saya setuju dengan Syarat dan Ketentuan
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#c7e99d] text-[#333] font-semibold hover:bg-[#bde089]"
          >
            Daftar
          </button>
          <div className="flex items-center text-center text-[#999] text-sm my-6">
            <div className="flex-1 h-px bg-[#ddd] mr-2" />
            <span>Atau</span>
            <div className="flex-1 h-px bg-[#ddd] ml-2" />
          </div>
          <div className="flex justify-center gap-5">
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
        </form>
      </div>

      {/* Kanan: Banner Ilustrasi */}
      <div className="w-full h-[600px] flex-1 bg-[#e1f3af] rounded-3xl m-5 hidden md:flex items-center justify-center overflow-hidden">
        <img
          src={LoginBanner}
          alt="Login Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

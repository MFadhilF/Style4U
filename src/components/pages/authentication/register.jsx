import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LogoImage from "../../../components/assets/style4u-logo.png";
import LoginBanner from "../../../components/assets/loginbanner.png";

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
        navigate("/login");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungi server.");
    }
  };
  return (
    <div className="flex min-h-screen max-w-[1200px] mx-auto items-center text-center">
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
        </form>
      </div>

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

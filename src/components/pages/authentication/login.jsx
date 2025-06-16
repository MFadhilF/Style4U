import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LogoImage from "../../../components/assets/style4u-logo.png";
import LoginBanner from "../../../components/assets/loginbanner.png";
import axios from "axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });

      const { token, id_user, id_role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("id_user", id_user);
      localStorage.setItem("id_role", id_role);

      if (id_role === 1) {
        navigate("/admin/dashboard");
      } else if (id_role === 2) {
        navigate("/productlistpage");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login gagal.");
    }
  };

  return (
    <div className="flex min-h-screen max-w-[1200px] mx-auto items-center px-4 ">
      <div className="flex-1 p-8 md:p-10 flex flex-col justify-center items-center">
        <div className="flex items-center mb-6 text-[#a67c52]">
          <img
            src={LogoImage}
            alt="Style4U Logo"
            className="w-[120px] h-auto"
          />
        </div>

        <h1 className="text-[28px] font-bold text-[#222] mb-2">
          Halo, Selamat Datang
        </h1>
        <p className="text-[#555] mb-6 text-sm max-w-[350px]">
          Mudahkan pencarian yang kamu inginkan dengan login di Style For You
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 border border-[#ccc] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 border border-[#ccc] rounded-full text-sm outline-none focus:border-[#a67c52]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="text-right mb-4">
            <a href="#" className="text-sm text-[#666] hover:underline">
              Lupa Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-lime-400 text-white font-semibold rounded-full hover:bg-lime-500 transition"
          >
            Masuk
          </button>

          <div className="mt-4 text-sm text-center">
            Belum punya akun?{" "}
            <a href="/register" className="text-[#a67c52] hover:underline">
              Daftar disini
            </a>
          </div>
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

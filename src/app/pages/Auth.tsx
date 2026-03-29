import { useState } from "react";
import { useNavigate, Link } from "react-router"; // Додав Link
import { useAuth, UserRole } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Building2, User, Briefcase, ArrowLeft } from "lucide-react"; // Додав ArrowLeft

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>("user");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let success = false;
    if (isLogin) {
      success = await login(formData.email, formData.password, role);
      if (!success) {
        setError(
          role === "user"
            ? "Invalid credentials. Please try again."
            : "Invalid employee credentials. Please contact administrator."
        );
      }
    } else {
      if (!formData.name) {
        setError("Please enter your name");
        return;
      }
      success = await signup(formData.email, formData.password, formData.name, role);
      if (!success) {
        setError("Email already exists. Please use a different email.");
      }
    }

    if (success) {
      navigate(role === "employee" ? "/employee" : "/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 relative">
      
      {/* Кнопка повернення на головну */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
      >
        <ArrowLeft className="size-5" />
        <span>{t("backToHome" as any) || "Назад до головної"}</span>
      </Link>

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          {/* Зробив логотип також клікабельним */}
          <Link to="/" className="inline-flex items-center justify-center gap-3 mb-4 hover:opacity-80 transition-opacity">
            <Building2 className="size-10 text-blue-600" />
            <h1 className="text-3xl text-gray-900 font-bold">BuildPro</h1>
          </Link>
          <h2 className="text-2xl text-gray-900 mb-2 font-semibold">
            {isLogin ? t("signIn") : t("signUp")}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-4 text-gray-700">
              {t("accountType")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole("user")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === "user"
                    ? "border-blue-600 bg-blue-50 ring-4 ring-blue-50"
                    : "border-gray-100 hover:border-gray-200 bg-gray-50"
                }`}
              >
                <User className={`size-6 mx-auto mb-2 ${role === "user" ? "text-blue-600" : "text-gray-400"}`} />
                <div className={`text-xs font-bold uppercase tracking-wider ${role === "user" ? "text-blue-700" : "text-gray-500"}`}>
                  {t("userAccount")}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setRole("employee")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === "employee"
                    ? "border-blue-600 bg-blue-50 ring-4 ring-blue-50"
                    : "border-gray-100 hover:border-gray-200 bg-gray-50"
                }`}
              >
                <Briefcase className={`size-6 mx-auto mb-2 ${role === "employee" ? "text-blue-600" : "text-gray-400"}`} />
                <div className={`text-xs font-bold uppercase tracking-wider ${role === "employee" ? "text-blue-700" : "text-gray-500"}`}>
                  {t("employeeAccount")}
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700">
                  {t("fullName")} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50"
                  placeholder="Олександр Петренко"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                {t("email")} *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                {t("password")} *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all bg-gray-50"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
            >
              {isLogin ? t("signIn") : t("signUp")}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold underline underline-offset-4"
            >
              {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
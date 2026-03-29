import { Outlet, Link, useLocation } from "react-router";
import { Building2, Calculator, BookOpen, Home, LogIn, LogOut, User, Briefcase, Globe } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export function Layout() {
  const location = useLocation();
  const { user, logout, isEmployee } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  // Skip layout for auth page
  if (location.pathname === "/auth") {
    return <Outlet />;
  }

  const navItems = [
    { path: "/", label: t("home"), icon: Home },
    { path: "/properties", label: t("properties"), icon: Building2 },
    { path: "/calculator", label: t("calculator"), icon: Calculator },
    { path: "/bookings", label: t("myBookings"), icon: BookOpen },
  ];

  if (isEmployee) {
    navItems.push({
      path: "/employee",
      label: t("employeeDashboard"),
      icon: Briefcase,
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
              <Building2 className="size-8 text-blue-600" />
              <div>
                <h1 className="font-semibold text-gray-900">{t("brandName")}</h1>
                <p className="text-xs text-gray-600">{t("brandSlogan")}</p>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage("uk")}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    language === "uk"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  УКР
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    language === "en"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ENG
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Auth Button */}
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 text-gray-700">
                    <User className="size-4" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="size-4" />
                    <span className="hidden md:inline">{t("logout")}</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogIn className="size-4" />
                  <span>{t("login")}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex gap-1 pb-3 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="size-8 text-blue-500" />
                <h3 className="text-white">BuildPro Construction</h3>
              </div>
              <p className="text-sm mb-4">
                {t("buildingTomorrow")}
              </p>
            </div>

            <div>
              <h4 className="text-white mb-3">{t("contact")}</h4>
              <p className="text-sm mb-2">{t("phone")}: +1 (555) 123-4567</p>
              <p className="text-sm mb-2">Email: info@buildpro.com</p>
              <p className="text-sm">{t("address")}: 123 Main St, City</p>
            </div>

            <div>
              <h4 className="text-white mb-3">{t("hours")}</h4>
              <p className="text-sm mb-2">{t("monFri")}</p>
              <p className="text-sm mb-2">{t("sat")}</p>
              <p className="text-sm">{t("sun")}</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2026 BuildPro Construction. {t("allRightsReserved")}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
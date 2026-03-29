import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { MessageSquare, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Save to localStorage
    const existingRequests = JSON.parse(
      localStorage.getItem("contactRequests") || "[]"
    );

    const newRequest = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString(),
    };

    localStorage.setItem(
      "contactRequests",
      JSON.stringify([...existingRequests, newRequest])
    );

    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="size-8 text-blue-600" />
        <div>
          <h2 className="text-2xl text-gray-900">{t("contactUs")}</h2>
          <p className="text-gray-600">{t("contactDesc")}</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <CheckCircle2 className="size-12 text-green-600 mx-auto mb-4" />
          <p className="text-green-800 text-lg">{t("contactSuccess")}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              {t("name")} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder={t("name")}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              {t("email")} *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder={t("emailAddress")}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              {t("phone")} *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder={t("phoneNumber")}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              {t("message")} *
            </label>
            <textarea
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder={t("message")}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}

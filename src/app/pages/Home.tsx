import { Link } from "react-router";
import { ArrowRight, Building2, Calculator, CheckCircle2 } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ContactForm } from "../components/ContactForm";
import { useLanguage } from "../contexts/LanguageContext";

export function Home() {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/properties"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-blue-50 transition-colors"
              >
                {t("browseProperties")}
                <ArrowRight className="size-5" />
              </Link>
              <Link
                to="/calculator"
                className="bg-blue-700 text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-blue-800 transition-colors border border-blue-500"
              >
                <Calculator className="size-5" />
                {t("calculateCost")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">{t("whyChoose")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="size-8 text-blue-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">{t("qualityConstruction")}</h3>
              <p className="text-gray-600">
                {t("qualityDesc")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="size-8 text-green-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">{t("earlyBookingBenefits")}</h3>
              <p className="text-gray-600">
                {t("earlyBookingDesc")}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="size-8 text-purple-600" />
              </div>
              <h3 className="text-xl mb-3 text-gray-900">{t("smartCalculator")}</h3>
              <p className="text-gray-600">
                {t("smartCalculatorDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-center mb-12 text-gray-900">{t("ourProjects")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1770625296856-cb865be093da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NDc5NDMzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Aurora Heights"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-2 text-gray-900">Aurora Heights</h3>
                <p className="text-gray-600 mb-4">Downtown District • 20 {t("floors")}</p>
                <Link
                  to="/properties/1"
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  {t("viewDetails")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1587771518560-d4e96de71240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ3NTM4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Green Valley Residence"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-2 text-gray-900">Green Valley Residence</h3>
                <p className="text-gray-600 mb-4">Suburban Area • 12 {t("floors")}</p>
                <Link
                  to="/properties/2"
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  {t("viewDetails")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1774309480928-4dd072d67181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbXBsZXglMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDc5NDMzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Skyline Tower"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl mb-2 text-gray-900">Skyline Tower</h3>
                <p className="text-gray-600 mb-4">Business District • 35 {t("floors")}</p>
                <Link
                  to="/properties/3"
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                >
                  {t("viewDetails")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              {t("viewAllProperties")}
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl mb-6">{t("readyToStart")}</h2>
          <p className="text-xl mb-8 text-blue-100">
            {t("readyDesc")}
          </p>
          <Link
            to="/calculator"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg inline-flex items-center gap-2 hover:bg-blue-50 transition-colors"
          >
            <Calculator className="size-5" />
            {t("calculateNow")}
          </Link>
        </div>
      </section>
    </div>
  );
}
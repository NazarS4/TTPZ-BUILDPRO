import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Booking } from "../data/properties";
import { Calendar, MapPin, Package, DollarSign, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  // Дістаємо функцію перекладу зі словника
  const { t } = useLanguage(); 

  useEffect(() => {
    const savedBookings = localStorage.getItem("bookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="size-5 text-green-600" />;
      case "pending":
        return <Clock className="size-5 text-yellow-600" />;
      case "cancelled":
        return <XCircle className="size-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  // Екран, коли ще немає бронювань
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl mb-8 text-gray-900">{t("myBookings")}</h1>
          <div className="bg-white rounded-xl p-12 shadow-md text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 size-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="size-12 text-gray-400" />
              </div>
              <h2 className="text-2xl mb-4 text-gray-900">{t("noBookingsYet")}</h2>
              <p className="text-gray-600 mb-8">
                {t("noBookingsDesc")}
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/properties"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t("browseProperties")}
                </Link>
                <Link
                  to="/calculator"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {t("calculateCost")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Екран, коли є бронювання
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-gray-900">{t("myBookings")}</h1>
          <p className="text-xl text-gray-600">
            {t("manageBookings")}
          </p>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Інформація про бронювання */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {/* Назва будинку береться з пам'яті */}
                        <h2 className="text-2xl mb-2 text-gray-900">
                          {booking.propertyName}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="size-4" />
                          <span>{t("bookingId")}: {booking.id}</span>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {getStatusIcon(booking.status)}
                        <span className="capitalize">{t(booking.status as any) || booking.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-start gap-2">
                        <Package className="size-5 text-blue-600 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">{t("area")}</div>
                          <div className="text-gray-900">{booking.area} m²</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="size-5 text-blue-600 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">{t("floor")}</div>
                          <div className="text-gray-900">{booking.floor}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Package className="size-5 text-blue-600 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">{t("finishing")}</div>
                          <div className="text-gray-900 capitalize">
                            {t(booking.finishing as any) || booking.finishing}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="size-5 text-blue-600 mt-1" />
                        <div>
                          <div className="text-sm text-gray-600">Дата / Date</div>
                          <div className="text-gray-900">
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-1">{t("contactInfo")}</div>
                      <div className="text-gray-900 mb-1">{booking.customerName}</div>
                      <div className="text-gray-700 text-sm">{booking.email}</div>
                      <div className="text-gray-700 text-sm">{booking.phone}</div>
                    </div>
                  </div>

                  {/* Картка з ціною */}
                  <div className="lg:w-64">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <DollarSign className="size-6 text-blue-600" />
                        <h3 className="text-lg text-gray-900">{t("totalPrice")}</h3>
                      </div>
                      <div className="text-3xl text-blue-600 mb-4">
                        ${booking.totalPrice.toLocaleString()}
                      </div>
                      {booking.status === "pending" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                          {t("pendingMessage")}
                        </div>
                      )}
                      {booking.status === "confirmed" && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                          {t("confirmedMessage")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("makeAnotherBooking")}
          </Link>
        </div>
      </div>
    </div>
  );
}
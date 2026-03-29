import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { getAllProperties, finishingOptions } from "../data/properties";
import { Calculator as CalcIcon, ChevronRight } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Calculator() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Дістаємо функцію перекладу
  const { t } = useLanguage(); 
  
  const properties = getAllProperties();
  const propertyIdFromUrl = searchParams.get("property");
  const shouldBook = searchParams.get("book") === "true";

  const [selectedPropertyId, setSelectedPropertyId] = useState(
    propertyIdFromUrl || properties[0].id
  );
  const [area, setArea] = useState(80);
  const [floor, setFloor] = useState(10);
  const [finishing, setFinishing] = useState("standard");
  const [earlyBooking, setEarlyBooking] = useState(true);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);

  useEffect(() => {
    if (selectedProperty) {
      setArea(Math.min(Math.max(area, selectedProperty.minArea), selectedProperty.maxArea));
      setFloor(Math.min(floor, selectedProperty.floors));
    }
  }, [selectedProperty]);

  if (!selectedProperty) return null;

  const getFloorPremium = (floorNum: number, totalFloors: number) => {
    const percentage = (floorNum / totalFloors) * 100;
    if (percentage > 80) return 1.15; 
    if (percentage > 60) return 1.10; 
    if (percentage > 40) return 1.05; 
    return 1.0; 
  };

  const floorPremium = getFloorPremium(floor, selectedProperty.floors);
  const finishingOption = finishingOptions.find((f) => f.id === finishing)!;

  const basePrice = selectedProperty.pricePerSqm * area;
  const withFloorPremium = basePrice * floorPremium;
  const withFinishing = withFloorPremium * finishingOption.priceMultiplier;
  const discount = earlyBooking ? 0.15 : 0; 
  const totalPrice = withFinishing * (1 - discount);

  const handleProceedToBooking = () => {
    navigate(
      `/calculator?property=${selectedPropertyId}&book=true#booking-form`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-gray-900">{t("costCalculator")}</h1>
          <p className="text-xl text-gray-600">
            {t("customizePreferences")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Property Selection */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl mb-4 text-gray-900">{t("selectProperty")}</h2>
              <div className="grid grid-cols-1 gap-3">
                {properties.map((property) => (
                  <button
                    key={property.id}
                    onClick={() => setSelectedPropertyId(property.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      selectedPropertyId === property.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg text-gray-900">{property.name}</h3>
                        <p className="text-sm text-gray-600">{property.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{t("startingFrom")}</div>
                        <div className="text-blue-600">${property.basePrice.toLocaleString()}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Area Selection */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl mb-4 text-gray-900">{t("livingArea")}</h2>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{t("area")}: {area} m²</span>
                  <span className="text-gray-600">
                    {t("range")}: {selectedProperty.minArea}-{selectedProperty.maxArea} m²
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedProperty.minArea}
                  max={selectedProperty.maxArea}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[60, 90, 120].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      const newArea = Math.min(
                        Math.max(size, selectedProperty.minArea),
                        selectedProperty.maxArea
                      );
                      setArea(newArea);
                    }}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-gray-700"
                  >
                    {size} m²
                  </button>
                ))}
              </div>
            </div>

            {/* Floor Selection */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl mb-4 text-gray-900">{t("floorLevel")}</h2>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">{t("floor")}: {floor}</span>
                  <span className="text-gray-600">
                    {t("premium")}: +{((floorPremium - 1) * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={selectedProperty.floors}
                  value={floor}
                  onChange={(e) => setFloor(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-gray-700">
                {t("floorPremiumInfo")}
              </div>
            </div>

            {/* Finishing Options */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl mb-4 text-gray-900">{t("finishingPackage")}</h2>
              <div className="space-y-3">
                {finishingOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFinishing(option.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                      finishing === option.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg text-gray-900">{t(option.id as any) || option.name}</h3>
                      <span className="text-blue-600">
                        +{((option.priceMultiplier - 1) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{t((option.id + "Desc") as any) || option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Early Booking Discount */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl mb-2 text-gray-900">{t("earlyBooking")}</h2>
                  <p className="text-gray-600">{t("earlyBookingInfo")}</p>
                </div>
                <button
                  onClick={() => setEarlyBooking(!earlyBooking)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    earlyBooking ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      earlyBooking ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <CalcIcon className="size-6 text-blue-600" />
                <h2 className="text-2xl text-gray-900">{t("priceSummary")}</h2>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>{t("basePrice")} ({area} m²)</span>
                  <span>${basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{t("floorPremium")}</span>
                  <span className="text-blue-600">
                    +${(withFloorPremium - basePrice).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{t("finishing")} ({t(finishingOption.id as any) || finishingOption.name})</span>
                  <span className="text-blue-600">
                    +${(withFinishing - withFloorPremium).toLocaleString()}
                  </span>
                </div>
                {earlyBooking && (
                  <div className="flex justify-between text-green-600">
                    <span>{t("earlyBooking")} (15%)</span>
                    <span>-${(withFinishing * discount).toLocaleString()}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-600 mb-2">{t("totalPrice")}</div>
                <div className="text-4xl text-blue-600 mb-2">
                  ${Math.round(totalPrice).toLocaleString()}
                </div>
                {earlyBooking && (
                  <div className="text-sm text-green-600">
                    {t("youSave")} ${Math.round(withFinishing * discount).toLocaleString()}!
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleProceedToBooking}
                  className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {t("proceedToBooking")}
                  <ChevronRight className="size-5" />
                </button>
                <div className="text-xs text-gray-500 text-center">
                  {t("pricesEstimate")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        {shouldBook && (
          <div id="booking-form" className="mt-12">
            <BookingForm
              propertyId={selectedPropertyId}
              propertyName={selectedProperty.name}
              area={area}
              floor={floor}
              finishing={finishing}
              totalPrice={Math.round(totalPrice)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface BookingFormProps {
  propertyId: string;
  propertyName: string;
  area: number;
  floor: number;
  finishing: string;
  totalPrice: number;
}

function BookingForm({
  propertyId,
  propertyName,
  area,
  floor,
  finishing,
  totalPrice,
}: BookingFormProps) {
  const navigate = useNavigate();
  const { t } = useLanguage(); 
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    const newBooking = {
      id: Date.now().toString(),
      propertyId,
      propertyName,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      area,
      floor,
      finishing,
      totalPrice,
      date: new Date().toISOString(),
      status: "pending",
    };

    localStorage.setItem(
      "bookings",
      JSON.stringify([...existingBookings, newBooking])
    );
    navigate("/bookings");
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <h2 className="text-3xl mb-6 text-gray-900">{t("completeBooking")}</h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg mb-4 text-gray-900">{t("bookingSummary")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-600 mb-1">{t("property")}</div>
            <div className="text-gray-900">{propertyName}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">{t("area")}</div>
            <div className="text-gray-900">{area} m²</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">{t("floor")}</div>
            <div className="text-gray-900">{floor}</div>
          </div>
          <div>
            <div className="text-gray-600 mb-1">{t("totalPrice")}</div>
            <div className="text-blue-600">${totalPrice.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm mb-2 text-gray-700">
            {t("fullName")} *
          </label>
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-700">
            {t("emailAddress")} *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-gray-700">
            {t("phoneNumber")} *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            {t("bookingAgreement")}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("confirmBooking")}
        </button>
      </form>
    </div>
  );
}
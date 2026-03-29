import { useParams, Link, useNavigate } from "react-router";
import { getAllProperties } from "../data/properties";
import { ArrowLeft, MapPin, Calendar, Building, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const property = getAllProperties().find((p) => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl mb-4 text-gray-900">{t("propertyNotFound")}</h1>
          <Link to="/properties" className="text-blue-600 hover:text-blue-700">
            {t("backToProperties")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/properties")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="size-5" />
          Back to Properties
        </button>

        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          {/* Image Gallery */}
          <div className="relative">
            <div className="h-96 bg-gray-200">
              <ImageWithFallback
                src={property.images[selectedImage]}
                alt={property.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`size-3 rounded-full transition-colors ${
                    selectedImage === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h1 className="text-4xl mb-4 text-gray-900">{property.name}</h1>
                  <div className="flex items-center gap-4 text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="size-5 text-blue-600" />
                      <span>{property.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="size-5 text-blue-600" />
                      <span>{property.type}</span>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">{property.description}</p>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Total Floors</div>
                    <div className="text-2xl text-gray-900">{property.floors}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Area Range</div>
                    <div className="text-2xl text-gray-900">{property.minArea}-{property.maxArea}m²</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Price/m²</div>
                    <div className="text-2xl text-gray-900">${property.pricePerSqm}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Available</div>
                    <div className="text-2xl text-gray-900">{property.availableUnits}</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2 className="text-2xl mb-4 text-gray-900">Amenities & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="size-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="lg:col-span-1">
                <div className="bg-blue-50 rounded-xl p-6 sticky top-24">
                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-2">Starting from</div>
                    <div className="text-4xl text-blue-600 mb-2">
                      ${property.basePrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      ${property.pricePerSqm}/m² base price
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700 mb-6">
                    <Calendar className="size-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Completion Date</div>
                      <div>{property.completionDate}</div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="text-sm text-green-800 mb-1">Early Booking Discount</div>
                    <div className="text-2xl text-green-600">Up to 15% OFF</div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      to={`/calculator?property=${property.id}`}
                      className="block w-full bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Calculate Exact Cost
                    </Link>
                    <Link
                      to={`/calculator?property=${property.id}&book=true`}
                      className="block w-full bg-white text-blue-600 border-2 border-blue-600 text-center px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
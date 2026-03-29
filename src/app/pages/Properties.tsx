import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getAllProperties } from "../data/properties";
import { MapPin, Calendar, Building, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

export function Properties() {
  const { t } = useLanguage();
  const [properties, setProperties] = useState(getAllProperties());

  useEffect(() => {
    setProperties(getAllProperties());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-gray-900">{t("availableProperties")}</h1>
          <p className="text-xl text-gray-600">
            {t("exploreProperties")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <ImageWithFallback
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {property.availableUnits} {t("unitsAvailable")}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    {/* Назви будинків беруться з БД, тому залишаться англійською */}
                    <h2 className="text-2xl mb-2 text-gray-900">{property.name}</h2>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin className="size-4" />
                     <span>{t(("district" + property.id) as any) || property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 mb-1">{t("startingFrom")}</div>
                    <div className="text-2xl text-blue-600">
                      ${property.basePrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{t(("desc" + property.id) as any) || property.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Building className="size-4 text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">{t("floors")}</div>
                      <div>{property.floors}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="size-4 text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">{t("areaRange")}</div>
                      <div>{property.minArea}-{property.maxArea}m²</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="size-4 text-blue-600" />
                    <div>
                      <div className="text-xs text-gray-500">{t("completion")}</div>
                      <div>{property.completionDate}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/properties/${property.id}`}
                    className="flex-1 bg-blue-600 text-white text-center px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {t("viewDetails")}
                  </Link>
                  <Link
                    to={`/calculator?property=${property.id}`}
                    className="flex-1 bg-white text-blue-600 border-2 border-blue-600 text-center px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {t("calculateCost")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
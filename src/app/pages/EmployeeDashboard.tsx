import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Property } from "../data/properties";
import { Plus, Edit, Trash2, MessageSquare } from "lucide-react";

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export function EmployeeDashboard() {
  const { user, isEmployee } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  useEffect(() => {
    if (!isEmployee) {
      navigate("/auth");
      return;
    }

    // Load properties
    const savedProperties = localStorage.getItem("customProperties");
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    }

    // Load contact requests
    const savedRequests = localStorage.getItem("contactRequests");
    if (savedRequests) {
      setContactRequests(JSON.parse(savedRequests));
    }
  }, [isEmployee, navigate]);

  const handleAddProperty = (property: Omit<Property, "id">) => {
    const newProperty: Property = {
      ...property,
      id: Date.now().toString(),
    };

    const updated = [...properties, newProperty];
    setProperties(updated);
    localStorage.setItem("customProperties", JSON.stringify(updated));
    setShowAddForm(false);
  };

  const handleUpdateProperty = (property: Property) => {
    const updated = properties.map((p) => (p.id === property.id ? property : p));
    setProperties(updated);
    localStorage.setItem("customProperties", JSON.stringify(updated));
    setEditingProperty(null);
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      const updated = properties.filter((p) => p.id !== id);
      setProperties(updated);
      localStorage.setItem("customProperties", JSON.stringify(updated));
    }
  };

  if (!isEmployee) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-gray-900">{t("employeeDashboard")}</h1>
          <p className="text-gray-600">Welcome, {user?.name}</p>
        </div>

        {/* Contact Requests Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="size-6 text-blue-600" />
            <h2 className="text-2xl text-gray-900">{t("contactRequests")}</h2>
          </div>
          {contactRequests.length === 0 ? (
            <p className="text-gray-600">No contact requests yet</p>
          ) : (
            <div className="space-y-4">
              {contactRequests.map((request) => (
                <div
                  key={request.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg text-gray-900">{request.name}</h3>
                      <p className="text-sm text-gray-600">{request.email}</p>
                      <p className="text-sm text-gray-600">{request.phone}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(request.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{request.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Properties Management Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-gray-900">{t("manageProperties")}</h2>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="size-5" />
              {t("addProperty")}
            </button>
          </div>

          {(showAddForm || editingProperty) && (
            <PropertyForm
              property={editingProperty}
              onSave={editingProperty ? handleUpdateProperty : handleAddProperty}
              onCancel={() => {
                setShowAddForm(false);
                setEditingProperty(null);
              }}
            />
          )}

          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-start"
              >
                <div>
                  <h3 className="text-xl mb-2 text-gray-900">{property.name}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <div className="flex gap-4 text-sm text-gray-700">
                    <span>{property.floors} floors</span>
                    <span>{property.availableUnits} units</span>
                    <span>${property.pricePerSqm}/m²</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingProperty(property)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="size-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface PropertyFormProps {
  property: Property | null;
  onSave: (property: any) => void;
  onCancel: () => void;
}

function PropertyForm({ property, onSave, onCancel }: PropertyFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: property?.name || "",
    location: property?.location || "",
    type: property?.type || "",
    basePrice: property?.basePrice || 0,
    pricePerSqm: property?.pricePerSqm || 0,
    minArea: property?.minArea || 0,
    maxArea: property?.maxArea || 0,
    floors: property?.floors || 0,
    completionDate: property?.completionDate || "",
    availableUnits: property?.availableUnits || 0,
    description: property?.description || "",
    features: property?.features?.join(", ") || "",
    imageUrl: property?.images?.[0] || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const propertyData = {
      ...(property ? { id: property.id } : {}),
      ...formData,
      features: formData.features.split(",").map((f) => f.trim()),
      images: [formData.imageUrl],
    };
    onSave(propertyData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-xl mb-4 text-gray-900">
        {property ? t("edit") : t("addNewProperty")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          required
          placeholder={t("propertyName")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          required
          placeholder={t("location")}
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          required
          placeholder={t("type")}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          required
          placeholder={t("pricePerSqm")}
          value={formData.pricePerSqm}
          onChange={(e) =>
            setFormData({ ...formData, pricePerSqm: Number(e.target.value) })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          required
          placeholder={t("minArea")}
          value={formData.minArea}
          onChange={(e) =>
            setFormData({ ...formData, minArea: Number(e.target.value) })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          required
          placeholder={t("maxArea")}
          value={formData.maxArea}
          onChange={(e) =>
            setFormData({ ...formData, maxArea: Number(e.target.value) })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          required
          placeholder={t("totalFloors")}
          value={formData.floors}
          onChange={(e) =>
            setFormData({ ...formData, floors: Number(e.target.value) })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="number"
          required
          placeholder={t("availableUnits")}
          value={formData.availableUnits}
          onChange={(e) =>
            setFormData({ ...formData, availableUnits: Number(e.target.value) })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          required
          placeholder="Completion Date (e.g., Q4 2026)"
          value={formData.completionDate}
          onChange={(e) =>
            setFormData({ ...formData, completionDate: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          required
          placeholder={t("imageUrl")}
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <textarea
        required
        placeholder={t("description")}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={3}
        className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        type="text"
        required
        placeholder={t("features")}
        value={formData.features}
        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t("save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          {t("cancel")}
        </button>
      </div>
    </form>
  );
}

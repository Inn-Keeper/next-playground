'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/store';
import { FaDog, FaCat, FaPaw, FaShower, FaHome, FaGraduationCap, FaHeartbeat, FaShoppingBag, FaWalking, FaCalendarAlt, FaEnvelope, FaUser, FaComment } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FaBowlFood } from 'react-icons/fa6';

interface FormData {
  name: string;
  email: string;
  specialRequests: string;
  dateCheckIn: Date | null;
  dateCheckOut: Date | null;
  services: Service[];
  petName: string;
  petBreed: string;
  petAge: number;
  petWeight: number;
}

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: number;
}

interface ServicesResponse {
  items: Service[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  FaDog: <FaDog />,
  FaCat: <FaCat />,
  FaShower: <FaShower />,
  FaHome: <FaHome />,
  FaGraduationCap: <FaGraduationCap />,
  FaHeartbeat: <FaHeartbeat />,
  FaShoppingBag: <FaShoppingBag />,
  FaWalking: <FaWalking />,
  FaDogFoodBowl: <FaBowlFood />,
  FaPaw: <FaPaw />,

};

// Helper for DD-MM-YYYY
function formatDateDDMMYYYY(date: Date | null) {
  return date ? format(date, 'dd/MM/yyyy') : 'Not selected';
}

export default function FormPage() {
  const { darkMode } = useAppSelector((state) => state.theme);
  const { requireAuth } = useAuth();
  const { showAuthPrompt, content } = requireAuth();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    specialRequests: '',
    dateCheckIn: null,
    dateCheckOut: null,
    services: [],
    petName: '',
    petBreed: '',
    petAge: 0,
    petWeight: 0
  });

  const [services, setServices] = useState<ServicesResponse | null>(null);

  // Use Date objects for date pickers
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    setTotalPrice(formData.services.reduce((acc, service) => acc + service.price, 0));
  }, [formData.services]);

  const getServices = useCallback(async () => {
    const services = await fetch('/services.json');
    const servicesData = await services.json();
    setServices(servicesData);
  }, []);

  const handleDateChange = (date: Date | null, field: 'dateCheckIn' | 'dateCheckOut') => {
    if (field === 'dateCheckIn') {
      setCheckInDate(date);
      setFormData(prev => ({ ...prev, dateCheckIn: date }));
    } else {
      setCheckOutDate(date);
      setFormData(prev => ({ ...prev, dateCheckOut: date }));
    }
  };

  const showBookingSuccess = (formData: FormData) => {
    const { dateCheckIn, dateCheckOut, services, specialRequests } = formData;
    toast.custom((t) => (
      <div
        className={`$${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white dark:bg-gray-800 shadow-2xl rounded-xl pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5 p-6`}
        style={{ minWidth: 350 }}
      >
        <div className="flex flex-col items-center">
          <div className="bg-green-100 rounded-full p-2 mb-2">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-green-700 mb-1">Booking Confirmed!</h3>
          <p className="text-gray-700 dark:text-gray-200 mb-2 text-center">
            Thank you for your booking. Here are your details:
          </p>
        </div>
        <div className="mt-2 space-y-2">
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Dates:</span>
            <span className="ml-2 text-gray-700 dark:text-gray-200">
              {formatDateDDMMYYYY(dateCheckIn ? new Date(dateCheckIn) : null)} to {formatDateDDMMYYYY(dateCheckOut ? new Date(dateCheckOut) : null)}
            </span>
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Services:</span>
            <ul className="list-disc list-inside ml-6">
              {services.map(({ name, id }) => (
                <li key={id} className="text-gray-700 dark:text-gray-200">{name.charAt(0).toUpperCase() + name.slice(1)}</li>
              ))}
            </ul>
          </div>
          <div>
            <span className="font-semibold text-gray-900 dark:text-white">Special Requests:</span>
            <span className="ml-2 text-gray-700 dark:text-gray-200">{specialRequests || 'None'}</span>
          </div>
          <div>
            <span className="font-semibold text-green-700 text-lg">Total Price:</span>
            <span className="ml-2 text-green-700 text-lg">${totalPrice}</span>
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Close
        </button>
      </div>
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!services) {
      toast.error('Services are still loading. Please try again in a moment.');
      return;
    }
    // Format dates before submission
    const formattedFormData = {
      ...formData,
      dateCheckIn: checkInDate,
      dateCheckOut: checkOutDate,
    };
    showBookingSuccess(formattedFormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    console.log('Form data:', formData);
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const service = JSON.parse(checkbox.dataset.service || '{}') as Service;
      if (checkbox.checked) {
        setFormData(prev => ({
          ...prev,
          services: prev.services.some(s => s.id === service.id)
            ? prev.services
            : [...prev.services, service]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          services: prev.services.filter(s => s.id !== service.id)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (showAuthPrompt) {
    return <>{content}</>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Booking Summary */}
        <div className="lg:col-span-1">
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'} sticky top-6`}>
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Selected Services:</span>
                <span className="font-medium">{formData.services.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Check-in:</span>
                <span className="font-medium">{formatDateDDMMYYYY(formData.dateCheckIn)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Check-out:</span>
                <span className="font-medium">{formatDateDDMMYYYY(formData.dateCheckOut)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Total Price:</span>
                <span className="font-medium text-lg text-green-500">${totalPrice}</span>
              </div>
              <div className="pt-4 border-t dark:border-gray-700">
                <button
                  type="submit"
                  form="booking-form"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Complete Booking
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Booking Form */}
        <div className="lg:col-span-2">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-semibold mb-4">Your Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-gray-500" />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>


            {/* Pet Information */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-semibold mb-4">Pet Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaDog className="text-gray-500" />
                    Pet Name
                  </label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    value={formData.petName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaDog className="text-gray-500" />
                    Pet Breed
                  </label>
                  <input
                    type="text"
                    id="petBreed"
                    name="petBreed"
                    value={formData.petBreed}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <FaDog className="text-gray-500" />
                      Pet Age
                    </label>
                    <input
                      type="number"
                      id="petAge"
                      name="petAge"
                      value={formData.petAge}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <FaDog className="text-gray-500" />
                      Pet Weight
                    </label>
                    <input
                      type="number"
                      id="petWeight"
                      name="petWeight"
                      value={formData.petWeight}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
              </div>
            </div>

            {/* Dates */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-semibold mb-4">Select the Dates for the Stay</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    Check-in Date
                  </label>
                  <DatePicker
                    selected={checkInDate}
                    onChange={date => handleDateChange(date, 'dateCheckIn')}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    minDate={new Date()}
                    inline
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    Check-out Date
                  </label>
                  <DatePicker
                    selected={checkOutDate}
                    onChange={date => handleDateChange(date, 'dateCheckOut')}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    minDate={new Date()}
                    inline
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-semibold mb-4">Select Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services?.items.map((service) => (
                  <div 
                    key={service.id}
                    className={`relative p-4 rounded-lg border dark:border-gray-600 transition-colors ${
                      formData.services.some(s => s.id === service.id)
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl text-blue-500 mt-1">
                        {iconMap[service.icon]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <label className="font-medium cursor-pointer" htmlFor={service.id}>
                            {service.name}
                          </label>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ${service.price}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {service.description}
                        </p>
                        <input
                          type="checkbox"
                          id={service.id}
                          name="services"
                          value={service.id}
                          onChange={handleChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          data-service={JSON.stringify(service)}
                          checked={formData.services.some(s => s.id === service.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-semibold mb-4">Special Requests</h2>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <FaComment className="text-gray-500" />
                  Additional Information
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special requirements or notes for your booking..."
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
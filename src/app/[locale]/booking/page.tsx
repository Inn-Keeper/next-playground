'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/store';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslations } from 'next-intl';
import { iconServiceMap, formatDateDDMMYYYY } from '@/utils/utils';
import { FormDataBooking, Service, ServicesResponse } from './types';
import { FaCalendarAlt, FaComment, FaDog, FaEnvelope, FaUser } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation';

export default function FormPage() {
  const { darkMode } = useAppSelector((state) => state.theme);
  const { requireAuth } = useAuth();
  const { showAuthPrompt, content } = requireAuth();
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormDataBooking>({
    name: '',
    email: '',
    specialRequests: '',
    dateCheckIn: null,
    dateCheckOut: null,
    services: [],
    petName: '',
    petBreed: '',
    petAge: '',
    petWeight: ''
  });

  const [services, setServices] = useState<ServicesResponse | null>(null);

  // Use Date objects for date pickers
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(formData.services.reduce((acc, service) => acc + service.price, 0));
  }, [formData.services, totalPrice]);

  const getServices = useCallback(async () => {
    const services = await fetch('/services.json');
    const servicesData = await services.json();
    setServices(servicesData);
  }, []);

  useEffect(() => {
    getServices();
  }, [getServices]);

  // Prefill from query params
  useEffect(() => {
    if (!services) return;
    const serviceId = searchParams.get('service');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    let selectedService: Service | undefined;
    if (serviceId && services.items) {
      selectedService = services.items.find(s => s.id === serviceId);
    }
    let checkInDateParsed: Date | null = null;
    let checkOutDateParsed: Date | null = null;
    if (checkIn) {
      const d = new Date(checkIn);
      if (!isNaN(d.getTime())) checkInDateParsed = d;
    }
    if (checkOut) {
      const d = new Date(checkOut);
      if (!isNaN(d.getTime())) checkOutDateParsed = d;
    }
    // Only prefill if at least one value is present
    if (selectedService || checkInDateParsed || checkOutDateParsed) {
      setFormData(prev => ({
        ...prev,
        dateCheckIn: checkInDateParsed || prev.dateCheckIn,
        dateCheckOut: checkOutDateParsed || prev.dateCheckOut,
        services: selectedService ? [selectedService] : prev.services,
      }));
      setCheckInDate(checkInDateParsed);
      setCheckOutDate(checkOutDateParsed);
    }
  }, [services, searchParams]);

  const handleDateChange = (date: Date | null, field: 'dateCheckIn' | 'dateCheckOut') => {
    if (field === 'dateCheckIn') {
      setCheckInDate(date);
      setFormData(prev => ({ ...prev, dateCheckIn: date }));
    } else {
      setCheckOutDate(date);
      setFormData(prev => ({ ...prev, dateCheckOut: date }));
    }
  };

  const showBookingSuccess = (formData: FormDataBooking) => {
    const { dateCheckIn, dateCheckOut, services, specialRequests } = formData;
    toast.custom((toastElement) => (
      <div
        className={`${
          toastElement ? 'animate-enter' : 'animate-leave'
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
            {t('booking.bookingConfirmed')}
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
              {services.map(({ name, id }: Service) => (
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
          onClick={() => toast.dismiss(toastElement.id)}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Booking Form first on mobile, second on desktop */}
        <div className="md:col-span-2 order-first md:order-last">
          {/* Booking Form */}
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-semibold mb-4">{t('booking.yourPersonalInformation')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaUser className="text-gray-500" />
                    {t('booking.fullName')}
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
                    {t('booking.email')}
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
              <h2 className="text-xl font-semibold mb-4">{t('booking.petInformation')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaDog className="text-gray-500" />
                    {t('booking.petName')}
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
                    {t('booking.petBreed')}
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
                      {t('booking.petAge')}
                    </label>
                    <input
                      type="number"
                      id="petAge"
                      name="petAge"
                      value={formData.petAge}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      min={0}
                      max={100}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                      <FaDog className="text-gray-500" />
                      {t('booking.petWeight')}
                    </label>
                    <input
                      type="number"
                      id="petWeight"
                      name="petWeight"
                      value={formData.petWeight}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      min={0}
                      max={200}
                    />
                  </div>
              </div>
            </div>

            {/* Dates */}
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
              <h2 className="text-xl font-semibold mb-4">{t('booking.selectDatesForStay')}</h2>
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    {t('booking.checkInDate')}
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
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-500" />
                    {t('booking.checkOutDate')}
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
              <h2 className="text-xl font-semibold mb-4">{t('booking.selectServices')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services?.items.map((service) => (
                  <div 
                    key={service.id}
                    className={`relative p-4 rounded-lg border dark:border-gray-600 transition-colors ${
                      formData.services.some(s => s.id === service.id)
                        ? 'border-blue-500 bg-blue-500/20 dark:bg-blue-900/20'
                        : 'hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-2xl text-blue-500 mt-1">
                        {iconServiceMap[service.icon]}
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
              <h2 className="text-xl font-semibold mb-4">{t('booking.specialRequests')}</h2>
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <FaComment className="text-gray-500" />
                  {t('booking.additionalInformation')}
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t('booking.additionalInformationPlaceholder')}
                />
              </div>
            </div>
          </form>
        </div>
        {/* Booking Summary last on mobile, first on desktop */}
        <div className="md:col-span-1 order-last md:order-first">
          {/* Booking Summary */}
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'} sticky md:top-6`}>
            <h2 className="text-xl font-semibold mb-4">{t('booking.bookingSummary')}</h2>
            <div className="space-y-4">
              <div className="flex flex-col items-start border-t dark:border-gray-700 pt-4">
                <span className="text-gray-500 dark:text-gray-400">{t('booking.selectedServices')}:</span>
                <ul className="mt-2 ml-2 space-y-4 max-h-auto">
                  {formData.services.length === 0 ? (
                    <li className="text-gray-400 italic">{t('booking.noServicesSelected') || 'No services selected'}</li>
                  ) : (
                    formData.services.map(service => (
                      <li key={service.id} className="flex items-start gap-2">
                        <span className="text-blue-500 text-lg mt-1 size-6">{iconServiceMap[service.icon]}</span>
                        <div className="flex flex-col justify-center">
                          <span className="font-medium text-lg">{service.name}</span>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">${service.price}</span>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
                <span className="text-gray-500 dark:text-gray-400">{t('booking.totalServices')}:</span>
                <span className="font-medium">{formData.services.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">{t('booking.checkIn')}:</span>
                <span className="font-medium">{formatDateDDMMYYYY(formData.dateCheckIn)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">{t('booking.checkOut')}:</span>
                <span className="font-medium">{formatDateDDMMYYYY(formData.dateCheckOut)}</span>
              </div>
              <div className="flex items-center justify-between border-t dark:border-gray-700 pt-4">
                <span className="text-gray-500 dark:text-gray-400">{t('booking.totalPrice')}:</span>
                <span className="font-medium text-lg text-green-500">${totalPrice}</span>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  form="booking-form"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  {t('booking.completeBooking')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
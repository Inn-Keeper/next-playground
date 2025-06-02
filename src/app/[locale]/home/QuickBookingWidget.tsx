import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Service } from './types';
import { useTranslations } from 'next-intl';
import { iconServiceMap } from '@/utils/utils';
import { Listbox } from '@headlessui/react';
import { FaChevronDown, FaCalendarAlt, FaPaw } from 'react-icons/fa';

interface QuickBookingWidgetProps {
  services: Service[];
  onBook: (data: { service: string; checkIn: Date | null; checkOut: Date | null }) => void;
}

export default function QuickBookingWidget({ services, onBook }: QuickBookingWidgetProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const t = useTranslations();

  return (
    <div className="bg-white dark:bg-blue-900/10 rounded-lg border border-gray-100 dark:border-gray-700 shadow-lg p-6 w-full max-w-5xl mx-auto mt-10 z-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Section Title and Subtitle */}
        <div className="md:w-1/5 flex flex-col items-start md:items-start mb-2 md:mb-0">
          <span className="text-lg font-bold text-blue-600">{t('booking.quickBooking', { defaultMessage: 'Quick Booking' })}</span>
          <span className="text-xs text-gray-500">{t('booking.quickBookingSubtitle', { defaultMessage: "Book your pet's stay in seconds!" })}</span>
        </div>
        {/* Fields and Button */}
        <div className="flex-1 md:w-auto flex flex-col md:flex-row gap-4 items-center">
          {/* Service Dropdown */}
          <div className="w-full md:w-1/3">
            <Listbox value={selectedService} onChange={setSelectedService}>
              <div className="relative">
                <Listbox.Button id="quick-service" className="border rounded-lg px-3 py-2 w-full flex items-center justify-between text-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500">
                  <span className="flex items-center">
                    {selectedService ? (
                      <>
                        <span className="mr-2">{iconServiceMap[selectedService.icon]}</span>
                        {selectedService.name}
                      </>
                    ) : (
                      <span className="text-gray-400">{t('booking.selectService')}</span>
                    )}
                  </span>
                  <FaChevronDown className="ml-2 text-gray-400" />
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg z-10 max-h-60 overflow-auto">
                  {services.map(service => (
                    <Listbox.Option key={service.id} value={service}>
                      {({ active, selected }: { active: boolean; selected: boolean }) => (
                        <div
                          className={`flex items-center px-3 py-2 cursor-pointer ${active ? 'bg-blue-100 dark:bg-blue-900/40' : ''} ${selected ? 'font-semibold' : ''}`}
                        >
                          <span className="mr-2">{iconServiceMap[service.icon]}</span>
                          {service.name}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
          {/* Check-in Date */}
          <div className="w-full md:w-1/4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <FaCalendarAlt />
              </span>
              <DatePicker
                id="quick-checkin"
                selected={checkIn}
                onChange={date => setCheckIn(date)}
                placeholderText={t('booking.checkIn')}
                className="border rounded-lg pl-9 pr-3 py-2 dark:bg-gray-700 dark:text-white w-full focus:ring-2 focus:ring-blue-500"
                minDate={new Date()}
              />
            </div>
          </div>
          {/* Check-out Date */}
          <div className="w-full md:w-1/4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <FaCalendarAlt />
              </span>
              <DatePicker
                id="quick-checkout"
                selected={checkOut}
                onChange={date => setCheckOut(date)}
                placeholderText={t('booking.checkOut')}
                className="border rounded-lg pl-9 pr-3 py-2 dark:bg-gray-700 dark:text-white w-full focus:ring-2 focus:ring-blue-500"
                minDate={checkIn || new Date()}
              />
            </div>
          </div>
          {/* Book Now Button */}
          <div className="flex">
            <button
              className="px-10 bg-blue-600 hover:bg-blue-700 h-[44px] border border-blue-300 text-white font-bold rounded-lg transition disabled:opacity-50 shadow-md focus:ring-2 focus:ring-blue-500 flex items-center gap-2 whitespace-nowrap"
              disabled={!selectedService || !checkIn || !checkOut}
              onClick={() => onBook({ service: selectedService ? selectedService.id : '', checkIn, checkOut })}
              aria-label={t('booking.bookNow', { defaultMessage: 'Book Now' })}
            >
              <FaPaw className="text-lg" />
              {t('booking.bookNow', { defaultMessage: 'Book Now' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 
'use client';

import Link from 'next/link';
import { useAppSelector } from '@/store/store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import { Service, Testimonial } from './types';
import { useTranslations } from 'next-intl';  
import useServices from '@/hooks/useServices';
import useLoader from '@/hooks/useLoader';
import useTestimonials from '@/hooks/useTestimonials';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { formatDateDDMMYYYY, iconServiceMap, trustBadges, contactInfo } from '@/utils/utils';
import Faq from './Faq';
import QuickBookingWidget from './QuickBookingWidget';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const t = useTranslations();
  const { darkMode } = useAppSelector((state) => state.theme);
  const { services, isLoading: servicesLoading } = useServices();
  const { testimonials, isLoading: testimonialsLoading } = useTestimonials();
  const loader = useLoader();
  const router = useRouter();

  const renderServices = () => {
    if (servicesLoading) {
      return loader({ message: 'Loading services...' });
    }

    return services.map((service: Service) => (
      <div key={service.id} className="relative p-4 rounded-lg border dark:border-gray-600 transition-colors hover:border-blue-300 dark:hover:border-blue-700">
        <div className="flex items-start gap-3">
          <div className="text-2xl text-blue-500 mt-1">
            {iconServiceMap[service.icon]}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="font-medium cursor-pointer" htmlFor={service.id}>
                {service.name}
              </label>
              <span className="text-sm text-blue-500 dark:text-blue-300 font-bold">
                ${service.price}
              </span>
            </div>
            <p className="text-sm text-wrap text-gray-500 dark:text-gray-400 mt-1">
              {service.description}
            </p>
            <div className="flex items-center justify-between">
              <Image 
                src={service.image}
                alt={service.name}
                width={380}
                height={200}
                className="rounded-lg mt-3 object-cover w-full h-[200px]"
                unoptimized // Required for external image providers like Unsplash source
              />
            </div>
            <input
              type="checkbox"
              id={service.id}
              name="services"
              value={service.id}
              onClick={() => window.location.href = `/booking`}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              data-service={JSON.stringify(service)}
            />
          </div>
        </div>
      </div>
    ));
  };

  const renderTestimonials = () => {
    if (testimonialsLoading) {
      return loader({ message: 'Loading testimonials...' });
    }

    return (
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        className="flex w-full max-w-4xl mx-auto h-full"
      >
        {testimonials.map((testimonial: Testimonial) => (
          <div key={testimonial.id} className="p-2">
            <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}> 
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                {/* Avatar and Info */}
                <div className="flex flex-col items-center md:items-start min-w-[100px]">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-blue-500"
                    unoptimized
                  />
                  <div className="mt-2 md:mt-4 text-center md:text-left">
                    <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    <div className="flex items-center gap-2 justify-center md:justify-start mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Comment and Meta */}
                <div className="flex flex-col justify-between h-full mt-2">
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">{testimonial.comment}</p>
                  <div className="flex justify-between gap-2 text-gray-500 dark:text-gray-400 mt-auto">
                    <span className="text-xs">{testimonial.petName} ({testimonial.petType})</span>
                    <span className="text-xs">{formatDateDDMMYYYY(new Date(testimonial.date))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    );
  };

  return (
    <div className="h-full w-full min-w-full">


      {/* Hero Section */}
      <div className="text-center rounded-lg shadow-lg mx-auto dark:bg-blue-900/10">

        {/* Quick Booking Widget */}
        {services && services.length > 0 && !servicesLoading && (
          <div className="flex flex-row m-auto items-center justify-center gap-2 mb-8">
            <QuickBookingWidget
              services={services}
              onBook={({ service, checkIn, checkOut }) => {
                const params = new URLSearchParams();
                params.set('service', service);
                if (checkIn) params.set('checkIn', checkIn.toISOString());
                if (checkOut) params.set('checkOut', checkOut.toISOString());
                router.push(`/booking?${params.toString()}`);
              }}
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          {t('common.title')}
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-4 dark:text-gray-300">
          {t('common.description')}
        </p>
        <Link href="/booking">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition">
            {t('common.bookingSystem')}
          </button>
        </Link>
        <div className="mt-8 flex justify-center">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={4000}
            className="rounded-xl shadow-lg w-full h-full"
          >
            <div>
              <Image src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&h=400&fit=crop" alt="Happy pets at our hotel" className="rounded-xl object-cover" width={600} height={400} />
            </div>
            <div>
              <Image src="https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&h=400&fit=crop" alt="Dog in spa" className="rounded-xl object-cover" width={600} height={400} />
            </div>
            <div>
              <Image src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop" alt="Cat relaxing" className="rounded-xl object-cover" width={600} height={400} />
            </div>
            <div>
              <Image src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&h=400&fit=crop" alt="Dog and cat together" className="rounded-xl object-cover" width={600} height={400} />
            </div>
          </Carousel>
        </div>
      </div>



      {/* Trust/Safety Badges Section */}
      <div className="flex flex-wrap justify-center gap-8 py-8">
        {trustBadges(t).map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center">
            {badge.icon}
            <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">{badge.label}</span>
          </div>
        ))}
      </div>

      <div className="h-10"></div>

      {/* Services Section */}
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <div className="text-2xl font-bold text-blue-500">{t('common.checkoutServices')}</div>
        <span className="text-gray-500">{t('common.checkoutServicesDescription')}</span>
        <div className="text-sm text-gray-500">{t('common.checkoutServicesClick')}</div>
      </div>
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {renderServices()}
        </div>
      </div>

      <div className="h-10"></div>

      {/* Testimonials Section */}
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <div className="text-2xl font-bold text-blue-500">{t('testimonials.title')}</div>
        <div className="text-gray-500">{t('testimonials.description')}</div>
        <div className="text-sm text-gray-500">{t('testimonials.testimonialsClick')}</div>
      </div>
      <div className={`rounded-xl p-2 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="grid grid-cols-1 gap-4 text-center w-full">
          {renderTestimonials()}
        </div>
      </div>

      <div className="h-10"></div>

      {/* FAQ Section */}
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <Faq />
      </div>

      <div className="h-10"></div>

      {/* Contact/Support Section */}
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <div className="text-2xl font-bold text-blue-500">{t('contact.title', { defaultMessage: 'Contact & Support' })}</div>
        <div className="text-gray-500 mb-4">{t('contact.description', { defaultMessage: "We're here to help! Reach out to us anytime." })}</div>
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          {contactInfo(t).map((contact, idx) => (
            <a key={idx} href={contact.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
              {contact.icon}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{contact.label}</span>
            </a>
          ))}
        </div>
        <Link href="/contact" className="mt-2 text-blue-600 hover:underline text-sm font-semibold">{t('contact.needHelp', { defaultMessage: 'Need more help? Contact us' })}</Link>
      </div>

      {/* Location/Map Section */}
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <div className="text-2xl font-bold text-blue-500">{t('location.title', { defaultMessage: 'Our Location' })}</div>
        <div className="text-gray-500 mb-4">{t('location.description', { defaultMessage: 'Come visit us or drop off your pet at our facility.' })}</div>
        <div className="w-full max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1611816611234!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-700 dark:text-gray-200">
          <FaMapMarkerAlt className="text-blue-500" />
          <span>{t('location.address', { defaultMessage: '123 Pet Street, Melbourne, VIC, Australia' })}</span>
        </div>
      </div>

    </div>
  );
}

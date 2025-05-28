'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { useAppSelector } from '@/store/store';
import { FaDog, FaCat, FaShower, FaHome, FaGraduationCap, FaHeartbeat, FaShoppingBag, FaWalking, FaPaw } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: number;
  image: string;
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

export default function HomePage() {
  const { darkMode } = useAppSelector((state) => state.theme);
  const [services, setServices] = useState<ServicesResponse | null>(null);


  const getServices = useCallback(async () => {
    const services = await fetch('/services.json');
    const servicesData = await services.json();
    setServices(servicesData);
  }, []);

  useEffect(() => {
    getServices();
  }, [getServices]);
  
  return (
    <div className="space-y-10 h-full w-full min-w-full p-4 md:p-8">
      {/* Hero Section */}
      <div className="py-12 px-4 text-center rounded-lg shadow-lg mx-auto dark:bg-blue-900/10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
          Welcome to Paws & Relax!
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-4 dark:text-gray-300">
          A luxury hotel & spa for your beloved pets. Where every guest is treated like family.
        </p>
        <Link href="/booking">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition">
            Book Now
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
      <div className="flex flex-col items-center justify-center gap-2 py-8">
        <div className="text-2xl font-bold text-blue-500">Checkout our services</div>
        <span className="text-gray-500">We offer a wide range of services to keep your pets happy and healthy.</span>
        <div className="text-sm text-gray-500">Click on the service to start booking it</div>
      </div>
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white shadow-sm'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services?.items.map((service) => (
            <div 
              key={service.id}
              className={`relative p-4 rounded-lg border dark:border-gray-600 transition-colors hover:border-blue-300 dark:hover:border-blue-700`}
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
          ))}
        </div>
      </div>
      
    </div>
  );
}

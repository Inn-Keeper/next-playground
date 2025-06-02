import { FaDog, FaCat, FaShower, FaHome, FaGraduationCap, FaHeartbeat, FaShoppingBag, FaWalking, FaEnvelope, FaCertificate, FaUserMd, FaShieldAlt, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

export const iconServiceMap: { [key: string]: React.ReactNode } = {
  FaDog: <FaDog />,
  FaCat: <FaCat />,
  FaShower: <FaShower />,
  FaHome: <FaHome />,
  FaGraduationCap: <FaGraduationCap />,
  FaHeartbeat: <FaHeartbeat />,
  FaShoppingBag: <FaShoppingBag />,
  FaWalking: <FaWalking />,
  FaDogFoodBowl: <FaBowlFood />,
};  

  // Trust/Safety Badges Data
export const trustBadges = (t: ReturnType<typeof useTranslations>) => [
    { icon: <FaCertificate className="text-blue-500 text-2xl" />, label: t('trust.certifiedStaff', { defaultMessage: 'Certified Staff' }) },
    { icon: <FaUserMd className="text-blue-500 text-2xl" />, label: t('trust.vetOnCall', { defaultMessage: '24/7 Vet On Call' }) },
    { icon: <FaShieldAlt className="text-blue-500 text-2xl" />, label: t('trust.insured', { defaultMessage: 'Insured & Bonded' }) },
    { icon: <FaCertificate className="text-blue-500 text-2xl" />, label: t('trust.firstAid', { defaultMessage: 'Pet First Aid Trained' }) },
  ];

  // Contact Info
  export const contactInfo = (t: ReturnType<typeof useTranslations>) => [
    { icon: <FaPhoneAlt className="text-blue-500" />, label: t('contact.phone', { defaultMessage: '+1 (555) 123-4567' }), href: 'tel:+15551234567' },
    { icon: <FaEnvelope className="text-blue-500" />, label: t('contact.email', { defaultMessage: 'info@pawshotel.com' }), href: 'mailto:info@pawshotel.com' },
    { icon: <FaWhatsapp className="text-green-500" />, label: t('contact.whatsapp', { defaultMessage: 'Chat on WhatsApp' }), href: 'https://wa.me/15551234567' }
  ];

  // Helper for DD-MM-YYYY
export function formatDateDDMMYYYY(date: Date | null) {
  return date ? format(date, 'dd/MM/yyyy') : 'Not selected';
}
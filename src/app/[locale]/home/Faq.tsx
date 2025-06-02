import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Faq() {
    
    const t = useTranslations();
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    
    // FAQ Data
    const faqs = [
        {
            q: t('faq.q1', { defaultMessage: "What do I need to bring for my pet's stay?" }),
            a: t('faq.a1', { defaultMessage: "Please bring your pet's food, any medication, and their favorite toy or blanket. We provide beds, bowls, and lots of love!" })
        },
        {
            q: t('faq.q2', { defaultMessage: "Can I visit my pet during their stay?" }),
            a: t('faq.a2', { defaultMessage: "Absolutely! We encourage visits during our business hours. Please call ahead to schedule." })
        },
        {
            q: t('faq.q3', { defaultMessage: "What if my pet needs medical attention?" }),
            a: t('faq.a3', { defaultMessage: "We have a 24/7 vet on call and staff trained in pet first aid. We will contact you immediately if any issues arise." })
        },
        {
            q: t('faq.q4', { defaultMessage: "How do I book a service?" }),
            a: t('faq.a4', { defaultMessage: "You can book online through our website or contact us directly by phone, email, or WhatsApp." })
        },
    ];
    return (
    <>
        <div className="text-2xl font-bold text-blue-500">{t('faq.title', { defaultMessage: 'Frequently Asked Questions' })}</div>
        <div className="text-gray-500 mb-4">{t('faq.description', { defaultMessage: 'Find answers to common questions below.' })}</div>
        <div className="w-full max-w-5xl mx-auto">
        {faqs.map((faq, idx) => (
            <div key={idx} className="mb-2 border-b border-gray-200 dark:border-gray-700">
            <button
            className="w-full text-left py-3 px-2 flex justify-between items-center focus:outline-none"
            onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)}
            aria-expanded={openFAQ === idx}
            >
            <span className="font-semibold text-gray-800 dark:text-gray-200">{faq.q}</span>
            <span className="ml-2 text-blue-500">{openFAQ === idx ? '-' : '+'}</span>
            </button>
            {openFAQ === idx && (
                <div className="px-2 pb-3 text-gray-600 dark:text-gray-300 text-sm animate-fade-in">
                {faq.a}
                </div>
            )}
            </div>
        ))}
        </div>
    </>
   );
}
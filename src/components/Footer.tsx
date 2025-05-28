import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 min-h-[140px] bg-gray-800 text-gray-200 text-sm border-t border-gray-800 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
        {/* Location Info */}
        <div className="flex flex-col gap-2 md:items-start items-center text-center md:text-left w-full md:w-auto">
          <div>&copy; {new Date().getFullYear()} Paws & Relax. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">📍</span>
            <span>123 Pet Lane, Petville, CA 90210</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">⭐</span>
            <span>4.9/5 based on 1,200 reviews</span>
          </div>
        </div>
        {/* Links */}
        <div className="flex flex-col md:items-end items-center text-center md:text-right gap-2 w-full md:w-auto">
          <div className="flex flex-row gap-4">
            <Link href="/about-us" className="hover:underline">About Us</Link>
            <Link href="/booking" className="hover:underline">Booking</Link>
            <Link href="/my-account" className="hover:underline">My Account</Link>
            <Link href="mailto:info@pawsandrelax.com" className="hover:underline">Contact</Link>
          </div>
        </div>
      </div>
      {/* Payments Section */}
      <div className="flex flex-col items-center justify-center mt-6 w-full">
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-gray-300">Payment Methods</span>
          <div className="flex flex-row gap-6 mt-1">
            {/* Visa */}
            <span title="Visa" aria-label="Visa" className="inline-flex items-center justify-center">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#fff"/>
                <text x="20" y="16" textAnchor="middle" fontSize="12" fill="#1A1F71" fontWeight="bold">VISA</text>
              </svg>
            </span>
            {/* MasterCard */}
            <span title="MasterCard" aria-label="MasterCard" className="inline-flex items-center justify-center">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#fff"/>
                <circle cx="15" cy="12" r="7" fill="#EB001B"/>
                <circle cx="25" cy="12" r="7" fill="#F79E1B"/>
                <text x="20" y="21" textAnchor="middle" fontSize="7" fill="#222">MC</text>
              </svg>
            </span>
            {/* Klarna */}
            <span title="Klarna" aria-label="Klarna" className="inline-flex items-center justify-center">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#fff"/>
                <text x="20" y="16" textAnchor="middle" fontSize="12" fill="#FFB3C7" fontWeight="bold">K</text>
              </svg>
            </span>
            {/* Invoice */}
            <span title="Invoice" aria-label="Invoice" className="inline-flex items-center justify-center">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="24" rx="4" fill="#fff"/>
                <rect x="8" y="6" width="24" height="12" rx="2" fill="#E5E7EB"/>
                <text x="20" y="16" textAnchor="middle" fontSize="10" fill="#222">INV</text>
              </svg>
            </span>
          </div>
        </div>
      </div>
      {/* Trustpilot Section */}
      <div className="flex flex-col items-center justify-center mt-4 w-full">
        <div className="flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2">
          {/* Trustpilot logo (SVG placeholder) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#00B67A"/>
            <polygon points="12,5 14,11 20,11 15,14 17,20 12,16 7,20 9,14 4,11 10,11" fill="#fff"/>
          </svg>
          <span className="font-semibold text-green-400">Trustpilot</span>
          {/* 5 stars */}
          <span className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#00B67A" xmlns="http://www.w3.org/2000/svg">
                <polygon points="10,1 12.59,6.99 19,7.64 14,12.26 15.18,18.51 10,15.27 4.82,18.51 6,12.26 1,7.64 7.41,6.99" />
              </svg>
            ))}
          </span>
          <span className="text-gray-200 ml-2">4.9/5</span>
          <span className="text-gray-400">(1,200 reviews)</span>
        </div>
      </div>
    </footer>
  );
}
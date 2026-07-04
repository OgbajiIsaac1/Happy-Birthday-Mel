'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

// Configurable message settings:
// - SHARE TEXT: Join me in celebrating Melvina Igboanugo on her birthday 🎉 Leave a wish or prayer for her here:
// - DEFAULT LINK FALLBACK: https://melvina-birthday.vercel.app

export default function ShareButton() {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const handleShare = () => {
    const text = `Join me in celebrating Melvina Igboanugo on her birthday 🎉 Leave a wish or prayer for her here: ${shareUrl}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 px-4 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <p className="text-[11px] text-purple-200/50 uppercase tracking-widest font-mono">Spread the Joy</p>
        <h3 className="text-sm font-semibold text-pink-200/80">Tell her other friends about this special wall!</h3>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba56] text-white font-semibold rounded-2xl shadow-lg shadow-[#25d366]/20 transition-all duration-300 text-xs"
        >
          {/* WhatsApp Icon SVG */}
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.863-9.864.001-2.639-1.026-5.122-2.892-6.991C16.376 1.882 13.9 1.854 11.26 1.854c-5.438 0-9.864 4.417-9.867 9.869-.001 1.993.52 3.93 1.508 5.642l-.998 3.643 3.744-.981.002.001zM17.65 14.28c-.3-.15-1.78-.88-2.057-.98-.28-.1-.48-.15-.68.15-.2.3-.77.98-.95 1.18-.18.2-.35.23-.65.08-1.02-.51-1.74-.83-2.43-1.46-.57-.52-.96-1.12-1.07-1.3-.11-.18-.01-.28.08-.37.08-.08.18-.2.27-.3.1-.1.13-.18.2-.3.07-.12.03-.23-.02-.33-.05-.1-.48-1.17-.66-1.6-.17-.43-.37-.37-.5-.38l-.43-.01c-.15 0-.38.05-.58.28-.2.22-.77.75-.77 1.83 0 1.08.78 2.12.89 2.27.11.15 1.53 2.34 3.71 3.28.52.22.92.36 1.24.46.52.17 1 .14 1.38.09.42-.06 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.12-.27-.2-.57-.35z" />
          </svg>
          <span>Share on WhatsApp</span>
        </motion.button>
      </div>
    </div>
  );
}

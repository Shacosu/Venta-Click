"use client";

import { useState, useEffect, useRef } from 'react';
import { Facebook, Twitter, Linkedin, Clipboard, Check } from 'lucide-react';

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [url, setUrl] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setTimeout(() => setCopySuccess(false), 300);
      }, 500);
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}` },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-primary rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Compartir
        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700 font-semibold">Compartir en redes</div>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <social.icon className="mr-3 h-5 w-5 text-gray-400" />
                <span>{social.name}</span>
              </a>
            ))}
            <div className="border-t border-gray-200 my-1"></div>
            <div className="px-4 py-2">
              <button
                onClick={copyToClipboard}
                className={`w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${copySuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-primary/80'}`}
              >
                {copySuccess ? <Check className="mr-2 h-5 w-5" /> : <Clipboard className="mr-2 h-5 w-5" />}
                {copySuccess ? '¡Copiado!' : 'Copiar enlace'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

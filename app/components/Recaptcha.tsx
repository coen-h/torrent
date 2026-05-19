"use client";

import { useEffect, useState } from 'react';

export default function RecaptchaGuard() {
  const [isCaptchaActive, setIsCaptchaActive] = useState(false);

  useEffect(() => {
    const checkCaptcha = () => {
      const recaptchaWrapper = document.getElementById('recaptcha-wrapper');
      // Broaden the net: Google sometimes injects the iframe directly without the wrapper first
      const hasRecaptchaIframe = document.querySelector('iframe[src*="recaptcha"], iframe[src*="recaptcha" i]');
      
      // If the wrapper has content, or an iframe exists, trigger the modal
      if ((recaptchaWrapper && recaptchaWrapper.innerHTML.trim() !== '') || hasRecaptchaIframe) {
        setIsCaptchaActive(true);
      } else {
        setIsCaptchaActive(false);
      }
    };

    const observer = new MutationObserver(checkCaptcha);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    checkCaptcha(); 

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {!isCaptchaActive && (
        <style>{`
          .gsc-control-cse, 
          .gsc-expansionArea {
            opacity: 0 !important;
            height: 0 !important;
            min-height: 0 !important;
            max-height: 0 !important;
            overflow: hidden !important;
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            pointer-events: none !important;
          }
        `}</style>
      )}

      {isCaptchaActive && (
        <div className="fixed inset-0 z-[99999] bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl shadow-2xl text-center max-w-md w-full h-80 relative flex flex-col items-center">
            
            <svg className="w-12 h-12 text-emerald-400 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <h2 className="text-2xl font-bold text-neutral-100 mb-2">Anti-Bot Verification</h2>
            <p className="text-sm text-neutral-400 mb-6">Google has detected unusual traffic. Please solve the CAPTCHA to continue searching.</p>
            
            <style>{`
              /* 1. Un-hide the master GSE wrappers and remove overflow restrictions */
              .gsc-control-cse, 
              .gsc-expansionArea {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                max-height: 100vh !important;
                opacity: 1 !important;
                pointer-events: none !important; 
                z-index: 100000 !important;
                background: transparent !important;
                overflow: visible !important;
                clip: auto !important;
                visibility: visible !important;
              }

              /* 2. Hide all normal Google UI elements */
              .gsc-search-box, 
              .gsc-results-wrapper-nooverlay, 
              .gsc-adBlock {
                display: none !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }

              /* 3. Sledgehammer the recaptcha wrapper */
              #recaptcha-wrapper {
                position: fixed !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, 15px) !important; 
                pointer-events: auto !important;
                z-index: 100001 !important;
                background: white !important;
                padding: 10px !important;
                border-radius: 6px !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                width: auto !important;
                height: auto !important;
              }

              /* 4. Ensure the iframe itself is forced visible */
              #recaptcha-wrapper iframe,
              iframe[src*="recaptcha"] {
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: auto !important;
                z-index: 100002 !important;
              }
            `}</style>

          </div>
        </div>
      )}
    </>
  );
}
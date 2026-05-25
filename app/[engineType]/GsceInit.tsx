"use client";

import { useEffect } from 'react';

export default function GsceInit({ config }) {
  useEffect(() => {
    const scriptId = 'gcse-dynamic-script';

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if ((window as any).google && (window as any).google.search) {
      delete (window as any).google.search;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `https://cse.google.com/cse.js?cx=${config.cx}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [config.cx]);

  return null;
}
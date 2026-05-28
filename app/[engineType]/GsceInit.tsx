"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    google?: {
      search?: Record<string, unknown>;
    };
  }
}

export default function GsceInit({ config }: { config: { cx: string } }) {
  useEffect(() => {
    const scriptId = 'gcse-dynamic-script';

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (window.google && window.google.search) {
      delete window.google.search;
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
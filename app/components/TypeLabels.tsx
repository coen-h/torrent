"use client";

import { useEffect } from 'react';

export default function TypeLabels() {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          const results = document.querySelectorAll('.gsc-result:not(.zither-processed)');
          
          results.forEach((result) => {
            result.classList.add('zither-processed');
            
            result.style.position = 'relative';

            const hasDirect = result.querySelector('.gs-label[data-refinementlabel="direct"]');
            const hasTorrent = result.querySelector('.gs-label[data-refinementlabel="torrent"]');

            if (hasDirect || hasTorrent) {
              const badgeContainer = document.createElement('div');
              badgeContainer.className = 'absolute top-1 right-1 flex gap-1 z-10';

              if (hasDirect) {
                const directBadge = document.createElement('span');
                directBadge.textContent = 'Direct';
                directBadge.className = 'bg-blue-500/40 backdrop-blur text-blue-50 border border-blue-500/30 text-xs font-semibold px-2 py-0.5 rounded-md'; 
                badgeContainer.appendChild(directBadge);
              }

              if (hasTorrent) {
                const torrentBadge = document.createElement('span');
                torrentBadge.textContent = 'Torrent';
                torrentBadge.className = 'bg-emerald-500/40 backdrop-blur text-emerald-50 border border-emerald-500/30 text-xs font-semibold px-2 py-0.5 rounded-md'; 
                badgeContainer.appendChild(torrentBadge);
              }

              result.appendChild(badgeContainer);
            }
          });
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return ([]);
}
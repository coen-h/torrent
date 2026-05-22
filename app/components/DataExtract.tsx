"use client";

import { useEffect, useState } from 'react';

export default function Results({ setResults, setTotalResults, setTotalPages, setRefinement }) {
  useEffect(() => {
    let timeoutId;

    const handleHashChange = () => {
      setResults([]);
      setRefinement([]);
      setTotalResults('');
      setTotalPages('');
    };
    window.addEventListener('hashchange', handleHashChange);

    const getVisibleResultNodes = () => {
      const all = document.querySelectorAll('.gsc-webResult.gsc-result');
      return Array.from(all).filter((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.height === 0 || rect.width === 0) return false;
        const style = window.getComputedStyle(node);
        return style.display !== 'none' && style.visibility !== 'hidden';
      });
    };

    const parseAndSet = () => {
      const visibleNodes = getVisibleResultNodes();
      const resultInfoElement = document.querySelector('.gsc-result-info');
      const elements = document.querySelectorAll('.gsc-refinementHeader span');
      const params = new URLSearchParams(window.location.hash.substring(1));
      const currentQuery = params.get('gsc.q') || '';
      
      if (!currentQuery.trim()) {
        setResults([]);
        setRefinement([]);
        setTotalResults('');
        setTotalPages('');
        return;
      }
    
      if (elements.length > 0) {
        const values = Array.from(elements).map(el => el.textContent);
        console.log(values);
        const newValues = values.filter((val) => val !== 'Torrent' && val !== 'Direct');
        setRefinement((prev) => {
          return JSON.stringify(prev) === JSON.stringify(values) ? prev : newValues;
        });
      }

      if (resultInfoElement) {
        const textContent = resultInfoElement.textContent;
        setTotalResults((prev) => (prev === textContent ? prev : textContent));

        const match = textContent.match(/[\d,]+/);
        if (match) {
          const resultCount = parseInt(match[0].replace(/,/g, ''), 10);
          const calculatedPages = Math.ceil(resultCount / 10);
          setTotalPages((prev) => (prev === calculatedPages ? prev : calculatedPages));
        }
      }

      if (visibleNodes.length > 0) {
        const parsedResults = visibleNodes.map((node) => {
          const titleElement = node.querySelector('.gs-title a');
          const snippetElement = node.querySelector('.gs-snippet');
          const imageElement = node.querySelector('.gs-image img');
          const hasDirect = node.querySelector('.gs-label[data-refinementlabel="direct"]');
          const hasTorrent = node.querySelector('.gs-label[data-refinementlabel="torrent"]');

          return {
            title: titleElement ? titleElement.textContent : '',
            link: titleElement ? titleElement.href : '',
            snippet: snippetElement ? snippetElement.textContent : '',
            image: imageElement ? imageElement.src : '',
            hasDirect: !!hasDirect,
            hasTorrent: !!hasTorrent,
          };
        }).filter((res) => res.title && res.link);

        setResults((prev) => {
          if (
            prev.length === parsedResults.length &&
            prev.length > 0 &&
            prev[0].link === parsedResults[0].link
          ) {
            return prev;
          }
          return parsedResults;
        });
      } else {
        setResults([]);
      }
    };

    const callback = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(parseAndSet, 50);
    };

    const observer = new MutationObserver(callback);

    const target = document.querySelector('.gsc-control-cse') || document.body;
    observer.observe(target, { childList: true, subtree: true, attributes: true });

    parseAndSet();

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return null;
}
"use client";

export default function Results({ results, totalResults, totalPages, theme }) {
  const textColor = theme?.textColor || 'text-emerald-300';

  const handleNavigation = (pageNum) => {
    const gsePaginationElements = document.querySelectorAll('.gsc-cursor-page');
    let clicked = false;
    
    gsePaginationElements.forEach((el) => {
      if (el.textContent === String(pageNum)) {
        document.querySelectorAll('.gsc-webResult.gsc-result').forEach(node => {
          node.style.display = 'none';
        });
        
        el.click();
        clicked = true;
      }
    });

    if (!clicked) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      params.set('gsc.page', pageNum);
      window.location.hash = params.toString(); 
    }
  };

  const maxPagesToShow = Math.min(Number(totalPages) || 0, 10);
  const paginationArray = Array.from({ length: maxPagesToShow }, (_, i) => i + 1);

  return (
    <div className="flex flex-col gap-2 w-full max-w-3xl">
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className={`p-2 border flex gap-2 ${result.image ? 'sm:pr-40' : ''} relative border-neutral-800 rounded-md bg-neutral-700/10 backdrop-blur shadow-sm`}>
            <div>
              <a href={result.link} target="_blank" rel="noopener noreferrer" className={`${textColor} hover:text-neutral-100 hover:underline font-semibold text-lg line-clamp-1 transition`}>{result.title}</a>
              <p className="text-sm text-mist-400 line-clamp-1">{result.link}</p>
              <p className="text-neutral-600 dark:text-neutral-300 mt-2 text-sm line-clamp-2">{result.snippet}</p>
            </div>
            {result.image && (
              <div className="absolute right-0 top-0 bottom-0 w-40 p-2 max-sm:hidden">
                <img src={result.image} alt={result.title} className="w-full h-full object-cover rounded-md" />
              </div>
            )}
            <div className="absolute top-1 right-1 flex gap-1 z-10">
              {result.hasFirst && (
                <span className="bg-emerald-700 text-emerald-50 border border-emerald-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">{result.hasFirst}</span>
              )}
              {result.hasSecond && (
                <span className="bg-sky-700 text-blue-50 border border-blue-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">{result.hasSecond}</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-neutral-500 text-sm text-center animate-pulse">Waiting for search results...</p>
      )}
      
      {paginationArray.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-2">
          {paginationArray.map((pageNum) => (
            <button onClick={() => handleNavigation(pageNum)} key={pageNum} className="w-6 h-8 flex justify-center items-center text-sm font-medium rounded-md border border-neutral-800 text-neutral-400 bg-neutral-900 hover:bg-neutral-800 hover:text-neutral-100 transition-all">{pageNum}</button>
          ))}
        </div>
      )}
      
      <p className='text-center mt-2'>{totalResults}</p>
    </div>
  );
}
import { useEffect, useRef } from "react";

function Search({query, setQuery}) {
  const inputEl = useRef(null);

  useEffect(function() {
    function callback(e){

      if(document.activeElement === inputEl.current) return;
      if(e.code === "Enter"){
        inputEl.current.focus();
        setQuery('');
      }
    }

    document.addEventListener('keydown', callback)
    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <div className="search">
      <input type="text" placeholder="search for books" value={query} onChange={(e) => setQuery(e.target.value)} ref={inputEl}/>
    </div>
  )
}

export default Search;
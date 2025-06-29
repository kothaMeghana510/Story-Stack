import { createContext, useContext, useState, useEffect } from "react";
//import { useSearchParams } from "react-router-dom";

const LibraryContext = createContext();

function LibraryProvider({children}) {
    const [readBook, setReadBook] = useState(function() {
        const storedValue = localStorage.getItem('ReadBook');
        try {
            return storedValue ? JSON.parse(storedValue) : [];
        } catch {
          return [];
        }  
      });

       function handleAddReadBook(book){
        setReadBook((readBook) => {
        alert("book added");
        const currentBooks = Array.isArray(readBook) ? readBook : [];
        return [...currentBooks, book];
     });
    }


    function handleDeleteReadBook(id) {
        setReadBook((readBook) => readBook.filter((book) =>
        book.id !== id));

        const notes = JSON.parse(localStorage.getItem("bookNotes")) || {};
        const dates = JSON.parse(localStorage.getItem("bookDates")) || {};

        delete notes[id];
        delete dates[id];

        localStorage.setItem("bookNotes", JSON.stringify(notes));
        localStorage.setItem("bookDates", JSON.stringify(dates));
    }

    useEffect (function() {
        localStorage.setItem('ReadBook', JSON.stringify(readBook));
        }, [readBook]);

      
    //   const [searchParams, setSearchParams] = useSearchParams();
    
    // function handleClick(book){
    //     setSearchParams({bookId: book.id});
    // }
  
   return (
  <LibraryContext.Provider value={{ 
    readBook, 
    handleAddReadBook, 
    handleDeleteReadBook 
  }}>
    {children}
  </LibraryContext.Provider>
);
}
function useLibraryContext(){
    const context = useContext(LibraryContext);
    if(context === undefined) throw new Error('CitiesContext was used outside the CitiesProvides');
    return context;
}

export {LibraryProvider, useLibraryContext,}
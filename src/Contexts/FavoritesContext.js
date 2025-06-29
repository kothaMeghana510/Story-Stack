import { createContext, useState, useEffect, useContext } from "react";

const FavoritesContext = createContext();

function FavoriesProvider({children}){
     const [showFavorite, setShowFavorite] = useState(false);
      const [addToFavorites, setAddToFavorites] = useState(function(){
          const FavoriteBooks = localStorage.getItem('addToFavorites');
          return FavoriteBooks ? JSON.parse(FavoriteBooks) : []; 
      });
      
    
    function handleAddToFavorites(book) {
      setAddToFavorites((prevFavorites) => {
        const favorites = prevFavorites || [];
        const isFav = favorites.some(favBook => favBook.id === book.id);
    
        if (isFav) {
          return favorites.filter(favBook => favBook.id !== book.id);
        } else {
          return [...favorites, book];
        }
      });
    }
    
    function handleToggleFavorite() {
    setShowFavorite((prev) => !prev);
  }

   useEffect (function() {
       localStorage.setItem('addToFavorites', JSON.stringify(addToFavorites || []));
     }, [addToFavorites])
   
     function handleDeleteFavoriteBook(id){
       setAddToFavorites((addToFavorites).filter((book) => book.id !== id));

       const notes = JSON.parse(localStorage.getItem("bookNotes")) || {};
        const dates = JSON.parse(localStorage.getItem("bookDates")) || {};

        delete notes[id];
        delete dates[id];

        localStorage.setItem("bookNotes", JSON.stringify(notes));
        localStorage.setItem("bookDates", JSON.stringify(dates));
     }
    
     return <FavoritesContext value={{
        addToFavorites,
        handleDeleteFavoriteBook,
        handleAddToFavorites,
        handleToggleFavorite,
     }}>
        {children}
     </FavoritesContext>
}

function useFavoritesContext(){
    const context = useContext(FavoritesContext);
    if(context === undefined) throw new Error('CitiesContext was used outside the CitiesProvides');
    return context;
}

export {FavoriesProvider, useFavoritesContext};
import ReadBooks from "../components/ReadBooks";
import CompletedBook from "../components/CompletedBook";
import AddToFavorites from "../components/AddToFavorites";
import SelectedBook from "../components/SelectedBook";
import MoreBooks from "../components/MoreBooks";
import Logo from "../components/Logo";
import Search from "../components/Search";
import Bookcontainer from "../components/BookContainer";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Main from "../components/Main";
import NavLinks from "../components/NavLinks";

import { useEffect, useRef, useState } from "react";
const key = process.env.REACT_APP_GOOGLE_BOOKS_KEY ;

function Explore() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const [showLibrary, setShowLibrary] = useState(false);
  //const [readBook, setReadBook] = useState([]);
  const [readBook, setReadBook] = useState(function() {
    const storedValue = localStorage.getItem('ReadBook');
    try {
        return storedValue ? JSON.parse(storedValue) : [];
    } catch {
      return [];
    }
    
  });
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



  function handleToggleLibrary() {
    setShowLibrary((prev) => !prev);
  }

  function handleToggleFavorite() {
    setShowFavorite((prev) => !prev);
  }

  function handleSelectBook(id) {
    setSelectedID((selectedID) => id === selectedID ? null : id);
  }

  function handleCloseButton(){
   setSelectedID(null);
  }


  function handleAddReadBook(book){
  setReadBook((readBook) => {
    const currentBooks = Array.isArray(readBook) ? readBook : [];
    return [...currentBooks, book];
  });
}


  function handleDeleteReadBook(id) {
    setReadBook((readBook) => readBook.filter((book) =>
    book.id !== id));
  }

  useEffect (function() {
    localStorage.setItem('ReadBook', JSON.stringify(readBook));
  }, [readBook]);

  useEffect (function() {
    localStorage.setItem('addToFavorites', JSON.stringify(addToFavorites || []));
  }, [addToFavorites])

  function handleDeleteFavoriteBook(id){
    setAddToFavorites((addToFavorites).filter((book) => book.id !== id));
  }

  useEffect (function(){
    const controller = new AbortController();
    async function fetchBooks(){
      try {
      setIsLoading(true);
      setError("");
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&&key=${key}`, {signal: controller.signal});
      
      if(!res.ok) throw new Error("☹️ “Oops! Something went wrong!!!");
      
      const data = await res.json();
      if(data.Response === 'False') throw new Error("Book not Found");

      if (!data.items || data.totalItems === 0) {
        throw new Error("📚 Book not found.");
    }


      setBooks(data.items);
      setIsLoading(false);
      setError("");
    } catch(err){
      if(err.name !== "AbortError"){

        setError(err.message);
      }
    }finally {
    setIsLoading(false);
  }
}
  if(!query.length < 3){
    setError('');
    setBooks([]);
  }
    handleCloseButton();
    fetchBooks();
    return function() {
      controller.abort();
    }
  }, [query]);

    return (
        <div> 
            {/* <Logo /> */}
            <NavLinks />
            <Search query={query} setQuery={setQuery} handleToggleLibrary={handleToggleLibrary} handleToggleFavorite={handleToggleFavorite}/>
    <Main>
      <div>
      {isLoading && <Loader />}
      {!isLoading && !error && 
          <Bookcontainer books = {books}  
            selectedID = {selectedID} 
            handleSelectBook={handleSelectBook} 
            handleAddToFavorites={handleAddToFavorites} 
            addToFavorites={addToFavorites} 
            />}
      {error && <Error message={error}/>}
      </div>

      <div>
        {selectedID ? 
          <SelectedBook selectedID={selectedID} 
          setSelectedID={setSelectedID} 
          handleCloseButton={handleCloseButton}
          handleAddReadBook={handleAddReadBook}
          readBook = {readBook}
          handleSelectBook={handleSelectBook}
        /> : ""}
      </div>

      <div>
          {showLibrary && ( <ReadBooks 
                readBook={readBook} 
                handleDeleteReadBook={handleDeleteReadBook} 
                handleToggleLibrary={handleToggleLibrary} 
              />
          )}
      </div>

      <div>
        {showFavorite && (
          <AddToFavorites 
            addToFavorites={addToFavorites}
            setAddToFavorites={addToFavorites}
            handleDeleteFavoriteBook={handleDeleteFavoriteBook}
            handleToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>
    </Main>
  </div>
    )
}

export default Explore;
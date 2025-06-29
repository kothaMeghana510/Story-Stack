<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from './pages/RootPage';
import Explore from "./pages/Explore";
import LikedBooks from './pages/LikedBooks'
import Favorites from "./likedComponents/Favorites";
import LibraryBooks from "./likedComponents/LibraryBooks";
import { FavoriesProvider } from "./Contexts/FavoritesContext";
import { LibraryProvider } from "./Contexts/LibraryContext";
import LayoutBook from "./likedComponents/LayoutBook";
import { readBook } from './Contexts/LibraryContext';
import CustomBook from "./likedComponents/CustomBook";
export default function App(){
 return <div>
  <FavoriesProvider>
    <LibraryProvider>
    <BrowserRouter basename="/Story-Stack">
        <Routes>
          <Route path="/" element={ <RootPage />}/>
          <Route path="explore" element={<Explore />} />
          <Route path="likedbooks" element={<LikedBooks />} >
              <Route path='library/:id' element={<LayoutBook />}/>
              <Route  index element={<Favorites />} />
              <Route path="library" element={<LibraryBooks />} />
              <Route path="custombook" element={<CustomBook />} />
          </Route>
          </Routes>
    </BrowserRouter>
    </LibraryProvider>
    </FavoriesProvider>
=======
import { useEffect, useRef, useState } from "react";
import StarRating from './starRating';

const key = process.env.REACT_APP_GOOGLE_BOOKS_KEY ;
export default function App(){
  
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
    // return storedValue ? JSON.parse(storedValue) : [];
    // return JSON.parse(storedValue);
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

  // function handleAddReadBook(book){
  //   setReadBook((readBook) => [...readBook, book]);

  //   //localStorage.setItem('ReadBook', JSON.stringify([...readBook, book]));
  // }

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

  return <div>
    <Logo />
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
>>>>>>> 508db11cce96c165f6e187daf77eeb6eb409ddf9
  </div>
}    
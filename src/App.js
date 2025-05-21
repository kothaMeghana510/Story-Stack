import { useEffect, useRef, useState } from "react";
import StarRating from './starRating';

//const key = "AIzaSyCKgfDiPLUMSz9LEhlUVE3VyJ4W7yIcfRI";

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
     return storedValue ? JSON.parse(storedValue) : [];
    // return JSON.parse(storedValue);
  });
  const [showFavorite, setShowFavorite] = useState(false);
  const [addToFavorites, setAddToFavorites] = useState(function(){
      const FavoriteBooks = localStorage.getItem('addToFavorites');
      return FavoriteBooks ? JSON.parse(FavoriteBooks) : []; 
  });
  

  
  // function handleAddToFavorites(book){
  //   setAddToFavorites((addToFavorites) => [...addToFavorites, book]);
  // }

//   function handleAddToFavorites(book) {
    
//     setAddToFavorites((prevFavorites) => {
//     const isFav = prevFavorites.some(favBook => favBook.id === book.id);
//     if (isFav) {
//       // Remove it
//       return prevFavorites.filter(favBook => favBook.id !== book.id);
//     } else {
//       // Add it
//       return [...prevFavorites, book];
//     }
//   });
// }

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
    setReadBook((readBook) => [...readBook, book]);

    //localStorage.setItem('ReadBook', JSON.stringify([...readBook, book]));
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
  </div>
}


function ReadBooks({readBook, handleDeleteReadBook, handleToggleLibrary}) {

  useEffect(function() {
    document.title = 'Story Stack | Library';

    return function(){
      document.title = 'Story Stack';
    }
  }, [])

  return (
    <>
    <div className="read-books">
    <div className="showPopup">
      <h2 className="library">My Library</h2>
      <span onClick={handleToggleLibrary}><i className="fa-solid fa-square-xmark popup"></i></span>
    </div>
    <ul>
      {readBook.map((book) => (
        <CompletedBook 
          book = {book}
          key = {book.id} 
          handleDeleteReadBook={handleDeleteReadBook}
          />
      ))}
    </ul>
  </div>
  </>
)
}

function CompletedBook({book, handleDeleteReadBook}) {
  const {title, authors, imageLinks, categories} = book

  return (
    <ul>
      <li className="list-element">
        <div className="container">
          <img src={imageLinks?.thumbnail} className="readBook-Image"/>
        </div>
        <div className="readBook-details">
          <h2>{title}</h2>
          <p className="read-author author">{authors}</p>
          <p>⭐: {book.userRating}</p>
        </div>
          <span onClick={() => handleDeleteReadBook(book.id)}><i className="fa-solid fa-square-xmark deleteReadBook"></i></span>
      </li>
    </ul>
  )
}

function AddToFavorites({addToFavorites, setAddToFavorites, handleDeleteFavoriteBook, handleToggleFavorite}){
  useEffect (function() {
    document.title = "Story Stack | Favorites";

    return function(){
      document.title = "Story Stack"
    }
  }, [])
    return (
      <>
      <div className="read-books">
      <div className="showPopup">
        <h2 className="library">Favorites</h2>
        <span onClick={handleToggleFavorite}><i className="fa-solid fa-square-xmark popup"></i></span>
      </div>
      <div>
        {addToFavorites.map((book) => <Favorite 
            addToFavorites={addToFavorites}
            setAddToFavorites = {setAddToFavorites}
            book={book}
            key = {book.id}
            handleDeleteFavoriteBook={handleDeleteFavoriteBook}
        />)}
      </div>
      </div>
      </>
    )
}

function Favorite({book, handleDeleteFavoriteBook}){
  const {title, authors, imageLinks} = book.volumeInfo || {};
  return(
    <div>
      <ul>
      <li className="list-element">
        <div className="container">
          <img src={imageLinks?.thumbnail} className="readBook-Image"/>
        </div>
        <div className="readBook-details">
          <h2>{title}</h2>
          <p className="read-author author">{authors}</p>
          {/* <p>⭐: {book.userRating}</p> */}
        </div>
          <span onClick={() => handleDeleteFavoriteBook(book.id)}><i className="fa-solid fa-square-xmark deleteReadBook"></i></span>
      </li>
    </ul>
    </div>
  )
}


function SelectedBook({selectedID, handleCloseButton, handleAddReadBook, readBook, handleSelectBook}){

  const [book, setBooks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [moreBooks, setMoreBooks] = useState([]);
  const[showMoreBooks, setShowMoreBooks] = useState(false);

  const isRead = (readBook ?? []).map((book) => book.id).includes(selectedID);
  const showUserRating = readBook.find((book) => book.id === selectedID)?.userRating;
  
  const {title, authors, imageLinks, categories, language, publishedDate, description} = book.volumeInfo || {};


  function handleMoreBooks(){
    setShowMoreBooks((show) => !show);
  }

  useEffect(() => {
  setShowMoreBooks(false);
}, [selectedID]);


   useEffect(function(){
    function callBack(e){
      if(e.code === 'Escape') {
        handleCloseButton();
      } 
    }
    document.addEventListener('keydown', callBack);
    return function(){
      document.removeEventListener('keydown', callBack);
    }
  },[handleCloseButton])

  useEffect(function() {
    if(!title) return;
    document.title = `Book | ${title}`;

    return function() {
      document.title = 'Story Stack'
    }
  }, [title]);

  function handleAddBook(){
    const newBook = {
      id: selectedID,
      title,
      authors,
      imageLinks,
      categories,
      language, 
      userRating 
    }
    handleAddReadBook(newBook);
  }


  useEffect (function() {
    async function getSelectedBooks() {
      setIsLoading(true);
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${selectedID}?key=${key}`);
      const data = await res.json();
      setBooks(data);
    }
    getSelectedBooks();
    setIsLoading(false);
  },[selectedID]);

  useEffect(function() {
    async function MoreBooks(){
       if (!authors || authors.length === 0) return;
      const authorName = authors[0];
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorName}&&key=${key}`);

      const data = await res.json();

      const filteredBooks = data.items?.filter(book =>
      book.volumeInfo?.authors?.some(
        (a) => a.replace(/\s+/g, ' ').trim().toLowerCase() === authorName.replace(/\s+/g, ' ').trim().toLowerCase()
      )
    ) || [];
    if(filteredBooks.length === 0) return "no books were found" 


    setMoreBooks(filteredBooks);

      // setMoreBooks(data.items);
    }
    MoreBooks();
  }, [authors]);
  

  return (
    <div className={`bookItem selectedBook ${selectedID ? 'show' : ''}` }>
      {isLoading ? <Loader /> :
      <>
      <span onClick={handleCloseButton}><i className="fa-solid fa-square-xmark icon"></i></span>
      <header>
        <img src={imageLinks?.thumbnail} alt={`${title} Image`} className="selected-Image"/>
        <div className="selected-header">
          <h2> {title}</h2>
          <p className="author"> ✒️ {authors?.join(", ")}</p>
          {categories && categories.map((category, index) => (<span className="categories" key={index}>{category}</span>))}
          {language && <p>Language - {language}</p>}
          {publishedDate && <p>Published : <em>{publishedDate}</em></p>}
        </div>
      </header>
      <section>
        <div className="Ratings">
            {!isRead ? 
            <>
            <StarRating maxRange={10} 
              onSetRating={setUserRating} defaultRating={0}/>
            {userRating > 0&& 
              (<button onClick={handleAddBook}>ADD BOOK</button>)} 
              </>
                : (
                  <div>
                <p>You already rated this book: {showUserRating}</p>
                <p>Book added to your Library.</p>
                </div>
              )}
        </div>
        <div className="more-books">
          <p>want to see more books from this writer?</p>
          <button onClick={handleMoreBooks}>More Books</button>
          {showMoreBooks && <MoreBooks books={moreBooks} handleSelectBook={handleSelectBook}/>}
        </div>
      </section>
      <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
      <section>
      </section>
      </>
    }
    </div>
  )
}

function MoreBooks({books, handleSelectBook}){
  console.log(books);
  return(
    <div>
      {books.map((book) => <BooksFromAuthors 
          book = {book}
          handleSelectBook={handleSelectBook}
      />)}
    </div>
  )
}

function BooksFromAuthors({book, handleSelectBook}){
  const {title, authors, imageLinks} = book.volumeInfo || "";
  return(
    <div onClick={() => handleSelectBook(book.id)}>
      <ul>
      <li className="list-element">
        <div className="container">
          <img src={imageLinks?.thumbnail} className="readBook-Image"/>
        </div>
        <div className="readBook-details">
          <h2 className="title">{title}</h2>
          <p className="read-author author">{authors}</p>
          {/* <p>⭐: {book.userRating}</p> */}
        </div>
      </li>
    </ul>
    </div>
  )
}

function Main({children}){
  return <main>{children}</main>
}

function Logo(){
  return (
    <div className="logo">
      <h1>Story Stack 📖</h1>
    </div>
  )
}

function Search({query, setQuery, handleToggleLibrary, handleToggleFavorite}) {
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
      <button onClick={handleToggleLibrary} className="library-btn"><i class="fa-solid fa-book"></i></button>
      <button onClick={handleToggleFavorite}><i class="fa-solid fa-heart"></i></button>
    </div>
  )
}

function Error({message}) {
  return (
  <div className="errorMessage">
    <p>{message}</p>
  </div>
  )
}

function Loader(){
  return (
  <div className="load">
  <p className="loader"></p>
  </div>
);
}

function Bookcontainer({books, selectedID, handleSelectBook, handleAddToFavorites, addToFavorites}) {
  return (
    <div className="slider">
    <div className={`booksContainer ${selectedID ? "shrink" : ""} `}>
      {books.map((book) => 
        <Bookitems  
        book={book} 
        key = {book.id} 
        handleSelectBook = {handleSelectBook}
        handleAddToFavorites={handleAddToFavorites}
        addToFavorites = {addToFavorites}
         />)}
    </div>
  </div>
  )
}

function Bookitems({book, handleSelectBook, handleAddToFavorites, addToFavorites}) {
  const info = book.volumeInfo; 
  const image = info.imageLinks?.thumbnail;
  const isFav = Array.isArray(addToFavorites) && addToFavorites.some((favBook) => favBook.id === book.id);
   return (
    <div className="bookItem" onClick={() => handleSelectBook(book.id)}>
      <div className="imageContainer">
      <img src={image} alt={`${info.title} Image`} className="bookImages"/>
      <span className={isFav ? 'iconColor' : 'favourites'} onClick={(e) => { e.stopPropagation(); handleAddToFavorites(book)}}><i class="fa-solid fa-thumbs-up"></i></span>
    </div>
    <div className="details">
      <h2>📘{info.title}</h2>
      <p className="author"><em>✒️ {info.authors?.join(", ")}</em></p>
      </div>
    </div>
  )
}

// className={isFav ? 'iconColor' : 'favourites'

import StarRating from "../StarRating";
import { useEffect, useRef, useState } from "react";
import Loader from './Loader';
import MoreBooks from './MoreBooks';
import { useLibraryContext } from "../Contexts/LibraryContext";
const key = process.env.REACT_APP_GOOGLE_BOOKS_KEY ;

function SelectedBook({selectedID, handleCloseButton, readBook, handleSelectBook}){
  const {handleAddReadBook } = useLibraryContext();

  const [book, setBooks] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const [moreBooks, setMoreBooks] = useState([]);
  const[showMoreBooks, setShowMoreBooks] = useState(false);

  const isRead = (readBook ?? []).map((book) => book.id).includes(selectedID);
  //const showUserRating = readBook.find((book) => book.id === selectedID)?.userRating;
  const showUserRating = Array.isArray(readBook)
  ? readBook.find((book) => String(book.id) === String(selectedID))?.userRating
  : undefined;

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

export default SelectedBook;
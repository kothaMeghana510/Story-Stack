import { useEffect, useRef, useState } from "react";
import { useFavoritesContext } from "../Contexts/FavoritesContext";
function Bookcontainer({books, selectedID, handleSelectBook, handleAddToFavorites}) {
  const {addToFavorites} = useFavoritesContext();
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

export default Bookcontainer;
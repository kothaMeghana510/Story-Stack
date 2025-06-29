import { useEffect, useRef, useState } from "react";

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

export default MoreBooks;
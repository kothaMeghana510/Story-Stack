// import { useEffect, useRef, useState } from "react";

// function CompletedBook({book, handleDeleteReadBook}) {
//   const {title, authors, imageLinks, categories} = book

//   return (
//     <ul>
//       <li className="list-element">
//         <div className="container">
//           <img src={imageLinks?.thumbnail} className="readBook-Image"/>
//         </div>
//         <div className="readBook-details">
//           <h2>{title}</h2>
//           <p className="read-author author">{authors}</p>
//           <p>⭐: {book.userRating}</p>
//         </div>
//           <span onClick={() => handleDeleteReadBook(book.id)}><i className="fa-solid fa-square-xmark deleteReadBook"></i></span>
//       </li>
//     </ul>
//   )
// }

//export default CompletedBook;
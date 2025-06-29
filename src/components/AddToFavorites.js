// import { useEffect, useRef, useState } from "react";

// function AddToFavorites({addToFavorites, setAddToFavorites, handleDeleteFavoriteBook, handleToggleFavorite}){
//   useEffect (function() {
//     document.title = "Story Stack | Favorites";

//     return function(){
//       document.title = "Story Stack"
//     }
//   }, [])
//     return (
//       <>
//       <div className="read-books">
//       <div className="showPopup">
//         <h2 className="library">Favorites</h2>
//         <span onClick={handleToggleFavorite}><i className="fa-solid fa-square-xmark popup"></i></span>
//       </div>
//       <div>
//         {addToFavorites.map((book) => <Favorite 
//             addToFavorites={addToFavorites}
//             setAddToFavorites = {setAddToFavorites}
//             book={book}
//             key = {book.id}
//             handleDeleteFavoriteBook={handleDeleteFavoriteBook}
//         />)}
//       </div>
//       </div>
//       </>
//     )
// }

// function Favorite({book, handleDeleteFavoriteBook}){
//   const {title, authors, imageLinks} = book.volumeInfo || {};
//   return(
//     <div>
//       <ul>
//       <li className="list-element">
//         <div className="container">
//           <img src={imageLinks?.thumbnail} className="readBook-Image"/>
//         </div>
//         <div className="readBook-details">
//           <h2>{title}</h2>
//           <p className="read-author author">{authors}</p>
//           {/* <p>⭐: {book.userRating}</p> */}
//         </div>
//           <span onClick={() => handleDeleteFavoriteBook(book.id)}><i className="fa-solid fa-square-xmark deleteReadBook"></i></span>
//       </li>
//     </ul>
//     </div>
//   )
// }

// export default AddToFavorites;
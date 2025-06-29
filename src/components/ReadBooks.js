// import { useEffect, useRef, useState } from "react";
// import CompletedBook from "./CompletedBook";

// function ReadBooks({readBook, handleDeleteReadBook, handleToggleLibrary}) {

//   useEffect(function() {
//     document.title = 'Story Stack | Library';

//     return function(){
//       document.title = 'Story Stack';
//     }
//   }, [])

//   return (
//     <>
//     <div className="read-books">
//     <div className="showPopup">
//       <h2 className="library">My Library</h2>
//       <span onClick={handleToggleLibrary}><i className="fa-solid fa-square-xmark popup"></i></span>
//     </div>
//     <ul>
//       {(readBook || []).map((book) => (
//         <CompletedBook 
//           book = {book}
//           key = {book.id} 
//           handleDeleteReadBook={handleDeleteReadBook}
//           />
//       ))}
//     </ul>
//   </div>
//   </>
// )
// }

// export default ReadBooks;
import styles from './Layout.module.css';
import background from '../assets/booksBackground.png';
import LayoutBook from './LayoutBook';
import { useSearchParams } from 'react-router-dom';
import { useLibraryContext } from '../Contexts/LibraryContext';
import { useFavoritesContext } from '../Contexts/FavoritesContext';
import { useState } from 'react';

function Layout() {
    const {readBook} = useLibraryContext();
    const {addToFavorites} = useFavoritesContext();
    const [searchParams] = useSearchParams();
    const bookId = searchParams.get("bookId");
    


let  selectedBook = readBook.find((book) => String(book.id) === bookId);

if (!selectedBook) {
  const fav = addToFavorites.find((book) => String(book.id) === bookId);
  const info = fav?.volumeInfo;

  if (info) {
    selectedBook = {
      id: fav.id,
      title: info.title,
      authors: info.authors,
      imageLinks: info.imageLinks,
    };
  }
else{
  const savedCustomBook = JSON.parse(localStorage.getItem('savedCustomBook')) || [];
  const customBook = savedCustomBook.find(book => String(book.id) === bookId);

  if(customBook){
    selectedBook = {
      id: customBook.id,
      title: customBook.title,
      author: customBook.author,
    }
  }
}
}

    
    return (
        <div className={styles.container}>
            {/* <div>
                <LayoutBook book={selectedBook}/>
            </div> */}
            {selectedBook && (
              <div>
                <LayoutBook book={selectedBook}/>
              </div>
            )}
            {/* <div className={styles.background}>
                    <img  src={background} alt="image" className={styles.image}/>
            </div> */}
        </div>
    )
}

export default Layout;


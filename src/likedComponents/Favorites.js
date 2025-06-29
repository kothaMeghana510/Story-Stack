import { useFavoritesContext } from "../Contexts/FavoritesContext";
import styles from '../likedComponents/Favorites.module.css';
import { Link, useSearchParams } from "react-router-dom";

function Favorites() { 
    const {addToFavorites, handleDeleteFavoriteBook} = useFavoritesContext();
     const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className={styles.favContainer}>
            {addToFavorites.map((book) => <Fav book={book} key={book.id} handleDeleteFavoriteBook={handleDeleteFavoriteBook} setSearchParams={setSearchParams}/>)}
        </div>
    )
}

function Fav({book, handleDeleteFavoriteBook, setSearchParams}) {
      const {title, authors, imageLinks} = book.volumeInfo || {};
      const id = book.id;
    return (
        <div  onClick={() => setSearchParams({bookId: id})}>
            <Link to={`?bookId=${id}`} className={styles.favsList}>
            <div className="container">
                <img src={imageLinks?.thumbnail} className={styles.image}/>
            </div>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.icon} onClick={() => handleDeleteFavoriteBook(book.id)}><i className="fa-solid fa-square-xmark deleteReadBook"></i></span>
            {/* onClick={() => handleDeleteFavoriteBook(book.id)} */}
            </Link>
        </div>
    )
}

export default Favorites;



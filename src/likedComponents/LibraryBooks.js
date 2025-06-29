import { useLibraryContext } from "../Contexts/LibraryContext";
import styles from '../likedComponents/LibraryBooks.module.css';
import { Link, useSearchParams } from "react-router-dom";

function LibraryBooks() {
    const {readBook, handleDeleteReadBook } = useLibraryContext();
   const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className={styles.libraryContainer}>
            {readBook.map((book) => <Book book={book} key={book.id} handleDeleteReadBook ={handleDeleteReadBook } setSearchParams={setSearchParams}/>)}
        </div>
    )
}

function Book({book, handleDeleteReadBook, handleClick,setSearchParams }) {
    const {title, authors, imageLinks, id} = book || {};
    
    return (
        <div  onClick={() => setSearchParams({bookId: book.id})}>
            <Link className={styles.libList} to={`?bookId=${book.id}`}>
             {/* <Link className={styles.libList} to={`${book.id}`} onClick={() => handleClick(book.id)}></Link> */}
            <div className="container">
                <img src={imageLinks?.thumbnail} className={styles.image}/>
            </div>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.icon} onClick={() => handleDeleteReadBook(book.id)}><i className="fa-solid fa-square-xmark deleteReadBook"></i></span>
            </Link>
        </div>
   )
}
export default LibraryBooks;
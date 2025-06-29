import { useEffect, useState } from 'react';
import styles from '../likedComponents/CustomBook.module.css'
import { useSearchParams, Link } from 'react-router-dom';

function CustomBook() {
    const [customBooks, setCustomBooks] = useState(function(){
        const savedCustomBook = localStorage.getItem('savedCustomBook');
        return savedCustomBook ? JSON.parse(savedCustomBook) : [];
    })
    const [customBook, setCustomBook] = useState({
        id : Date.now().toString(),
        title: '',
        author: '',
    })


    // const FavoriteBooks = localStorage.getItem('addToFavorites');
    //       return FavoriteBooks ? JSON.parse(FavoriteBooks) : []; 
    function handleSubmit(e) {
        e.preventDefault();

        const userBook = {
            ...customBook,
        }

        setCustomBooks(prev => [...prev, userBook]);
        setCustomBook({
            title: '',
            author: '',
        });
        console.log(userBook);
    }

    function handleDeleteCustomBook(e, id){
        e.preventDefault();
        setCustomBooks((customBooks).filter((book) => book.id !== id));
    }

    useEffect(function(){
        localStorage.setItem('savedCustomBook' , JSON.stringify(customBooks || []) );
    }, [customBooks]);

    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <>
        <div className={styles.form}>
            <div className={styles.input}>
                <label htmlFor='title'>Enter Title :</label>
                <input type='text' id="title" placeholder='Book Title' value={customBook.title} onChange={(e) => setCustomBook((prev) => ({...prev, title: e.target.value}))}/>
            </div>

            <div className={styles.input}>
                <label htmlFor='author'>Enter Author Name :</label>
                <input type='text' id="author" placeholder='Author Name' value={customBook.author} onChange={(e) => setCustomBook((prev) => ({...prev, author: e.target.value}))}/>
            </div>
            <button onClick={handleSubmit}>Add Book</button>
        </div>
            <div className={styles.customContainer}>
                {customBooks.map((book) => (<UserBook key={book.id} book={book} handleDeleteCustomBook={handleDeleteCustomBook} setSearchParams={setSearchParams}/>))}
            </div>
        </>
    )
}

function UserBook({book, handleDeleteCustomBook, setSearchParams}) {
    return (
        <div  onClick={() => setSearchParams({bookId: book.id})}>
            <Link to={`?bookId=${book.id}`} className={styles.books}>
                <h2 className={styles.title}>{book.title}</h2>
                <span className={styles.icon} onClick={(e) => handleDeleteCustomBook(e, book.id)}><i className="fa-solid fa-square-xmark deleteReadBook"></i></span>
            </Link>
        </div>
    )
}

export default CustomBook;
import { useEffect, useState } from 'react';
import styles from './LayoutBook.module.css';

function Book({book}) {
    const {title, authors, categories, id} = book || {};
    const [bookDates, setBookDates] = useState(() => {
        const savedDates = localStorage.getItem('bookDates');
        return savedDates ? JSON.parse(savedDates) : {};
    });
   

    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("bookNotes");
        return saved ? JSON.parse(saved) : {};
    });

    const [noteInput, setNoteInput] = useState('');
    useEffect(() => {
        setNoteInput(''); 
    }, [id]);

    useEffect(() => {
        localStorage.setItem('bookDates', JSON.stringify(bookDates));
    }, [bookDates]);


    function handleDates(id, field, value) {
        setBookDates(prev =>( {
            ...prev,
            [id]: {
                ...prev[id],
                [field] : value,
            }
        }));
    }

    function handleNotes(id, value) {
        setNotes(prev => ({
            ...prev,
            // [id] : value,
            [id]: [...(prev[id] || []), value],
        }))
    }

    useEffect(() => {
        localStorage.setItem('bookNotes', JSON.stringify(notes));
    } ,[notes]);

    const start = new Date(bookDates[id]?.startDate);
    const finish = new Date(bookDates[id]?.finishDate);
    let daysTaken = '';
    if(!isNaN(start) && !isNaN(finish) && finish >= start){
        const diffTime = finish - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        daysTaken = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
    }
    return (
        <>
        <div className={styles.book}>
            <h2>{title}</h2>
            <p className={styles.author}><em>{authors}</em></p>
        </div>
        <div className={styles.container}>
            <h3 className={styles.head}>Bookmark Your Jouney</h3>
            <div className={styles.dates}>
                <label htmlFor='startDate'>When did you start this book?</label>
                <input type="date" id="startDate" value={bookDates[id]?.startDate || ''} onChange={(e) => handleDates(id,'startDate', e.target.value)} className={styles.input}/>
            </div>
            <div className={styles.dates}>
                <label htmlFor='finishDate'>When did you complete this book? </label>
                <input type="date" id="finishDate" value={bookDates[id]?.finishDate || ''} onChange={(e) => handleDates(id,'finishDate', e.target.value)} className={styles.input}/>
            </div>
        </div>
        <div className={styles.notes}>
            <label htmlFor='notes'><i class="fa-solid fa-message"></i> Enter Your Thoughts: </label>
            {/* <textarea id="notes" className={styles.textArea} value={notes[id] || ''} onChange={(e) => handleNotes(id, e.target.value)} placeholder='enter text'/> */}
            <textarea
                id="notes"
                className={styles.textArea}
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                placeholder="Enter text"
            />
            <button onClick={() => {
                handleNotes(id, noteInput);
                setNoteInput('');
            }}>
            Save Note
            </button>

        </div>
        <div className={styles.info}>
            {daysTaken && 
            <p>You have taken: <strong>{daysTaken}</strong> to complete this book.</p>
            }
            <p><strong>Notes:</strong> {notes[id] || "No notes yet."}</p>
        </div>
        </>
    )
}

export default Book;
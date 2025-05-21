import { useState } from "react";

const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5em',
};

const starContainerStyle = {
    display : 'flex',
    // gap: '1em'
    gap: window.innerWidth < 600 ? '0.4em' : '1em'
}



const textStyle = {
    lineHeight: '0.1',
    margin: '1',
    color: 'gold',
    fontSize: '1.2em',
    fontWeight: 'bold'
};


export default function StarRating({maxRange = 5, onSetRating, defaultRating = 0}){
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }
    return (
        <div style={containerStyle}>
            <div style={starContainerStyle}>
                {Array.from({length: maxRange}, (_, i) => (
                    <Star key={i} onRate={() => handleRating(i + 1)} 
                    full = {tempRating ? tempRating >= i + 1 : rating >= i + 1}
                    onHoverIn = {() => setTempRating(i + 1)}
                    onHoverOut = {() => setTempRating(0)}/>
                ))}
            </div>
            <p style={textStyle}>{tempRating || rating || ""}</p>
        </div>
    );
}

const starStyle = {
    width: '1em',
    height: '1em',
    color: '#F39C12',
    display: 'block',
    cursor: 'pointer',
    border: '#F39C12'
}

const fullStar = {
    color: '#F39C12'
}

const emptyStar = {
    color: '#fff'
}

function Star({onRate, full, onHoverIn, onHoverOut}){

    return (
        <span style = {{ ...starStyle, ...(full ? fullStar : emptyStar) }} onClick={onRate}
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}>
            {<i className="fa-solid fa-star"></i>}
            </span>
    )
}
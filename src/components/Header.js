import React from 'react';

export default (props) => (
    <div>
        <h3>Movie Ratings</h3>
        <span>Sort By:</span>
        <button onClick = {() => props.sortEvent('title')}>Title</button>
        <button onClick = {() => props.sortEvent('date')}>Date</button>
        <hr/>
    </div>
)
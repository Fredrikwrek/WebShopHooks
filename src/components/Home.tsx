import React from 'react';
import { Link } from 'react-router-dom';


export function Home() {
    return (
        <div id='homeContainer'>
            <h2>Home</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero omnis minus iusto suscipit molestiae repellat consequatur molestias rem fugit esse aliquid delectus beatae recusandae temporibus repudiandae cupiditate nihil, ut at?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea possimus nesciunt soluta incidunt nam asperiores? Debitis, reiciendis facere sunt explicabo vero unde itaque possimus ad esse vel, excepturi modi nisi?</p>
            <Link to='/products'>
                <button>Find movie here</button>
            </Link>
        </div>
    );
}
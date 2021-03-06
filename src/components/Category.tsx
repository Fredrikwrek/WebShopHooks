import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ICategory, ISearchHandler } from '../models/ICategory'
import { Link } from 'react-router-dom';

export function Category(props: ISearchHandler) {
    const [searchValue, setSearchValue] = useState("");
    const [genre, setGenre] = useState(0);
    const defaultCategories: ICategory[] = [];
    const [categories, setCategories] = useState(defaultCategories);

    useEffect(() => {
        axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/categories')
            .then(r => {
                setCategories(r.data)
            })
    }, [])
    useEffect(() => {
        if (searchValue.length > 1 && !searchValue.startsWith(" ")) {
            axios.get(`https://medieinstitutet-wie-products.azurewebsites.net/api/search?=${searchValue}`)
                .then(r => {
                    props.searchHandler(r.data, searchValue, 0);
                })
        }
        else { props.searchHandler([], searchValue, genre) }
    }, [searchValue, genre])

    return (
        <div>
            <h3>Find your movie</h3>
            <Link to='/products' id='searchInputLink'>
                <input type="text" onChange={(e) => { setSearchValue(e.target.value); setGenre(0) }} value={searchValue} placeholder='Search' />
            </Link>
            <h3>Category</h3>
            <Link key='123456' to='/products' className='categoryLinks'>
                <div onClick={() => { setGenre(0) }}>All</div>
            </Link>
            {categories.map((item: ICategory) => {
                return (
                    <Link key={item.id} to='/products' className='categoryLinks'>
                        <div key={item.id} onClick={() => { setGenre(item.id); setSearchValue("") }}>{item.name}</div>
                    </Link>
                );
            })}
        </div>
    );
}
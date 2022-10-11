import React, {useState, useEffect} from 'react';
import {Preloader} from "./Preloader";
import {Collection} from './Collection'
import './index.scss';

const CATEGORIES = [
    {"name": "Все"},
    {"name": "Море"},
    {"name": "Горы"},
    {"name": "Архитектура"},
    {"name": "Города"}
];

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [categoryId, setCategoryId] = useState(0);
    const [searchValue, setSearchValue] = useState('');
    const [collections, setCollections] = useState({});
    const viewLimitPerPage = 5;

    useEffect(() => {
        setIsLoading(true);
        const category = categoryId ? `&category=${categoryId}` : '';

        fetch(`https://6340157cd1fcddf69cb0cc67.mockapi.io/photo_collections?${category}&limit=${viewLimitPerPage}&page=${page}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            })
            .catch((err) => {
                console.log(err);
                alert('error');
            })
            .finally(() => setIsLoading(false));
    }, [categoryId, page])

    console.log(collections);

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            {
                isLoading ? <Preloader/> : (
                    <>
                        <div className="top">
                            <ul className="tags">
                                {
                                    CATEGORIES.length > 0 && CATEGORIES.map((category, i) =>
                                        <li className={categoryId === i ? 'active' : ''}
                                            onClick={() => setCategoryId(i)}
                                            key={category.name}>
                                            {category.name}
                                        </li>)
                                }
                            </ul>
                            <input
                                className="search-input"
                                value={searchValue}
                                onChange={((e) => setSearchValue(e.target.value))}
                                placeholder="Поиск по названию"/>
                        </div>
                        <div className="content">
                            {
                                collections?.length > 0 && collections.filter((obj) =>
                                    obj.name.toLowerCase().includes(searchValue.toLowerCase())
                                ).map((obj, index) => (
                                    <Collection
                                        key={index}
                                        name={obj.name}
                                        images={obj.photos}
                                    />
                                ))
                            }
                        </div>
                        <ul className="pagination">
                            {
                                [...Array(5)].map((_, i) => (
                                    <li key={i} onClick={() => setPage(i + 1)}
                                        className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
                                ))
                            }
                        </ul>
                    </>
                )
            }

        </div>
    );
}

export default App;

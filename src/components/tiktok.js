import React, { useState, useEffect } from 'react'
import useFetch from './useFetch';
import useItems from './useItems';
import TiktokVideo from './tiktokVideo';

import './tiktok.css'

export default function Tiktok() {

    const [url, setUrl] = useState('');
    const [response, data, isLoading] = useFetch(url, 'json')
    const [page, setPage] = useState(0);
    const [index, setIndex] = useState(0);
    const [items] = useItems(data)

    useEffect(() => {
        setUrl('http://localhost:4000/page/' + page)
    }, [page]);

    function nextVideo() {
        // if (index + 2 === index.length) {
        //     setPage(page + 1)
        // }
        setIndex(index + 1)

    }

    function prevVideo() {
        if (index > 0) {
            setIndex(index - 1)
        }
    }

    function changeVideo(e) {
        if (e.keyCode === 40) {
            nextVideo()
        }
        else if (e.keyCode === 38) {
            prevVideo()
        }
    }


    return (
        <div onKeyDown={changeVideo} tabIndex={0} className='container'>
            <div>
                {isLoading ? 'Cargando...' : ""}
            </div>
            {/* <button disabled={isLoading}  onClick={() => nextVideo()} >Next Video</button>
            <button disabled={isLoading}  onClick={() => prevVideo()} >Prev Video</button> */}
            <div className='tiktoksContainerView' >
                <div className='tiktoksContainer'  style={{ transform: `translateY(${-1 * index * 960 + 'px'})` }}>
                    <Videos items={items} index={index}  />
                </div>
            </div>
        </div>
    )
}

const Videos = React.memo(({ items, index }) => {
    return <>
        {items?.map((item, i) => (
            <TiktokVideo key={item.id} item={item} current={index === i} />
        ))}
    </>
})

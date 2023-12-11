import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const List = () => {
    const [postList, setPostList] = useState([]);


    useEffect(() => {
        axios.post('/api/post/list')
            .then((response) => {
                console.log(response.data)
                if (response.data.success) {
                    setPostList([...response.data.postList]);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <>
            <div className="login__header">
                <h3>List</h3>
                <p>글을 봅시다📋</p>
            </div>

            <div className='list__wrap'>
                {postList.map((post, key) => (
                    <div className='list' key={key}>
                        <span className='cate'>교육</span>
                        <Link to={`/detail/${post.postNum}`}><h3 className='title'>{post.title}</h3></Link>
                        <Link to={`/detail/${post.postNum}`}><p className='desc'>{post.content}</p></Link>
                        <div className='author'>작가</div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default List
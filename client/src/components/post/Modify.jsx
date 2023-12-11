import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const Modify = () => {

    let params = useParams();
    let navigate = useNavigate();


    const [postInfo, setPostInfo] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    //글정보 가져오기
    useEffect(() => {
        let body = {
            postNum: params.postNum
        }

        axios.post("/api/post/detail", body)
            .then((respons) => {
                if (respons.data.success) {
                    setPostInfo(respons.data.post)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [params.postNum])

    useEffect(() => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
    }, [postInfo])

    const onsubmit = (e) => {
        e.preventDefault();

        // title에 데이터 있는지 없는지 확인
        if (title === "" || content === "") {
            return alert("모든항목을 채워주세요!!");
        }

        let body = {
            title: title,
            content: content,
            postNum: params.postNum
        }

        axios.post("/api/post/modify", body)
            .then((Response) => {
                if (Response.data.success) {
                    alert("글수정이 완료되었습니다.")
                    navigate(`/list`);
                } else {
                    alert("글수정이 실패했습니다.")
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Modify</h3>
                <p>글 수정해주세요</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">긍쓰기영역</legend>
                    <div>
                        <label htmlFor='title' className="required blind">글제목</label>
                        <input
                            type="text"
                            id="youName"
                            placeholder='글제목을 작성해주세요'
                            value={title || ""}
                            onChange={(event) => {
                                setTitle(event.currentTarget.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="youName" className="required blind">글내용</label>
                        <textarea
                            type="text"
                            id="content"
                            placeholder='글 내용을 적어주세요'
                            value={content || ""}
                            onChange={(event) => {
                                setContent(event.currentTarget.value);
                            }}
                        />

                    </div>
                    <div>
                        <button
                            type="submit"
                            className="btn"
                            onClick={(e) => {
                                onsubmit(e);
                            }}
                        >수정하기</button>
                        <button
                            type="submit"
                            className="btn"
                            onClick={(e) => {
                                onsubmit(e);
                            }}
                        >취소하기</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Modify
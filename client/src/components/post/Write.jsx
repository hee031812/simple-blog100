import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import Image from './Image.jsx';

import axios from 'axios';

const Write = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    let navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("제목 또는 내용을 채주요!");
        }

        let body = {
            title: title,
            content: content,
            image: image
        }

        axios
            .post("/api/post/write", body)
            .then((resopnse) => {
                if (resopnse.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/list");
                } else {
                    alert("글 작성이 실패하였습니다.")
                }
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Write</h3>
                <p>글 작성해주세요🤟</p>
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

                        <Image setImage={setImage} />

                        <button
                            type="submit"
                            className="btn"
                            onClick={(e) => {
                                onSubmit(e);
                            }}
                        >글쓰기</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Write
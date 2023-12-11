import React, { useState } from 'react'
import firebase from '../../firebase.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Join = () => {
    const [youName, setyouName] = useState("");
    const [youEmail, setyouEmail] = useState("");
    const [youPass, setyouPass] = useState("");
    const [youPassC, setyouPassC] = useState("");
    const [flag, setflag] = useState(false);

    let navigate = useNavigate();

    const JoinFunction = async (e) => {
        e.preventDefault();

        if (!(youName && youEmail && youPass && youPassC)) {
            return alert("모든항목을 채워야 회원가입이 가능합니다.");
        }
        if (youPass !== youPassC) {
            return alert("비밀번호가 다르네요!");
        }

        // 개인정보 --> fireBase에 넘기기
        let createUser = await firebase.auth().createUserWithEmailAndPassword(youEmail, youPass)

        await createUser.user.updateProfile({
            displayName: youName,
        })

        console.log(createUser.user)

        // 개인정보를-- > mongoDB로 보관
        let body = {
            email: createUser.user.multiFactor.user.email,
            displayName: createUser.user.multiFactor.user.displayName,
            uid: createUser.user.multiFactor.user.uid,
        }
        axios.post('/api/user/join', body)
            .then((response) => {
                setflag(false)
                if (response.data.success) {
                    // 회원가입 성공
                    navigate("/login");
                } else {
                    return alert("회원가입이 실패하였습니다.");
                }
            })
    }

    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Join</h3>
                <p>로그인시 필요해요🤟</p>
            </div>
            <form className='login__form'>
                <fieldset>
                    <legend className="blind">로그인 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">이름</label>
                        <input
                            type="text"
                            id="youName"
                            value={youName}
                            name="youName"
                            placeholder="이름"
                            className="input__style"
                            autoComplete="off"
                            required
                            onChange={(e) => setyouName(e.currentTarget.value)}

                        />
                    </div>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            value={youEmail}
                            name="youEmail"
                            placeholder="이메일"
                            className="input__style"
                            autoComplete="off"
                            required
                            onChange={(e) => setyouEmail(e.currentTarget.value)}

                        />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="text"
                            id="youPass"
                            value={youPass}
                            name="youPass"
                            placeholder="비밀번호"
                            className="input__style"
                            autoComplete="off"
                            required
                            minLength={8}
                            onChange={(e) => setyouPass(e.currentTarget.value)}

                        />
                    </div>
                    <div>
                        <label htmlFor="youPassC" className="required blind">확인 비밀번호</label>
                        <input
                            type="text"
                            id="youPassC"
                            value={youPassC}
                            name="youPassC"
                            placeholder="확인 비밀번호"
                            className="input__style"
                            autoComplete="off"
                            required
                            minLength={8}
                            onChange={(e) => setyouPassC(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        <button disabled={flag} type="submit" className="btn" onClick={(e) => JoinFunction(e)}>회원가입</button>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}

export default Join
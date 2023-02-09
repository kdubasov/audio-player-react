import React, {useState} from 'react';
import "./MainPage.css";
import "./MainPageMedia.css";
import {useDispatch} from "react-redux";
import {setLink} from "../../redux-state/slices/linkSlice.js";
import {useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";

const MainPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [linkState,setLinkState] = useState("");
    const [error,setError] = useState("");

    const handleSend = () => {
        if (!linkState.startsWith("https://") || !linkState){
            setError("Enter a valid link!")
            setTimeout(() => setError(""),5000)
            return false;
        }
        dispatch(setLink(linkState))
        navigate("/audio")
    }

    return (
        <div className={"MainPage"}>

            <div className="content d-flex flex-column">
                <h1>Insert the link</h1>

                <div className="form-link">
                    <input
                        value={linkState}
                        onChange={e => setLinkState(e.target.value)}
                        type="text"
                        placeholder={"https://"}
                    />
                    <button onClick={handleSend}>
                        <img src="images/arrow-form.svg" alt=""/>
                    </button>
                </div>
            </div>

            {
                error &&
                <Alert variant={"danger"}>
                    {error}
                </Alert>
            }
        </div>
    );
};

export default MainPage;

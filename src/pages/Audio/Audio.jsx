import React, {useEffect, useRef, useState} from 'react';
import "./Audio.css";
import "./AudioMedia.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearLink} from "../../redux-state/slices/linkSlice.js";
import Form from 'react-bootstrap/Form';
import {getMinutes} from "../../functions/getMinutes.js";
import Loader from "../../components/Loader/Loader.jsx";

const AudioPage = () => {

    //if song not ready loader === true
    const [loader,setLoader] = useState(true);

    //hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //go back
    const handleBack = () => {
        dispatch(clearLink())
        navigate("/")
    }

    //data from state about show navbar
    const linkSong = useSelector(state => state.linkSlice.link);

    //audio data
    const audio = useRef(new Audio(linkSong));
    const [volume,setVolume] = useState(0.2);
    const [songTimeNow,setSongTimeNow] = useState(0)
    const songTime = audio.current.duration;
    const songTimeMin = getMinutes(songTime)
    const [playing, setPlaying] = useState(false);
    const intervalRef = useRef();


    //start/pause function
    const handleToggleSong = () => setPlaying(!playing);

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audio.current.currentTime = value;
        setSongTimeNow(audio.current.currentTime);
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!playing) {
            setPlaying(true);
        }
        startTimer();
    }

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audio.current.ended) {
                setSongTimeNow(songTime);
            } else {
                setSongTimeNow(audio.current.currentTime);
            }
        }, 1000);
    }

    useEffect(() => {
        //loader
        audio.current.onloadedmetadata = () => setLoader(false);

        //volume
        audio.current.volume = volume;

        //start / pause
        if (!loader){
            if (playing){
                audio.current.play();
                startTimer();
            }else {
                clearInterval(intervalRef.current);
                audio.current.pause();
            }
        }
    },[playing, volume, loader]);

    return (
        <div className={"Audio"}>
            <div className="content">
                {!loader && <h3 className={"title"}>{linkSong?.slice(0,30) + "..."}</h3>}

                {loader && <Loader />}

                <div className="player">
                    <img
                        src={`images/${playing ? "stop" : "start"}.svg`}
                        alt="start"
                        onClick={handleToggleSong}
                    />

                    <Form.Range
                        min={0}
                        max={songTime ? songTime : 0}
                        step={1}
                        value={songTimeNow}
                        onChange={(e) => onScrub(e.target.value)}
                        onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}
                        className={"song-time"}
                    />

                    <footer>
                        <h6>
                            {
                                loader ?
                                    "00:00 / 00:00" :
                                    getMinutes(songTimeNow) + " / " + songTimeMin
                            }
                        </h6>

                        <Form.Range
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={e => setVolume(Number(e.target.value))}
                        />
                    </footer>
                </div>


                <button onClick={handleBack} className={"back"}>
                    <img src={`images/arr-left.svg`} alt="<"/>
                    <h3 className={"m-0"}>Back</h3>
                </button>
            </div>
        </div>
    );
};

export default AudioPage;

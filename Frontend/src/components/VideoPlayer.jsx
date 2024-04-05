import { useState, useEffect, useMemo, useRef } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Track} from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "./VideoPlayer.css";
import { Title } from "@vidstack/react";
import { useDispatch } from "react-redux";
import { setIsNavBarVisible ,setIsFooterVisible} from "../AppStore/AppSlicer";
export default function VideoPlayer() {
  const [isPlayerFocused, setIsPlayerFocused] = useState(true);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [MovieTitle, setMovieTitle] = useState('Movie Title');
  const ref = useRef(null);
  

  const dispatch = useDispatch();
  

  function handleFocusChange(isFocused) {
    setIsPlayerFocused(isFocused);
    if (isFocused) {
      setIsTitleVisible(true);
    }
  }

  function handlePauseChange(paused) {
    setIsPaused(paused);
    if (paused) {
      setIsTitleVisible(true);
    }
  }

  useEffect(() => {
    localStorage.setItem("isNavBarVisible", "false");
    dispatch(setIsNavBarVisible(false));
  }, []);
  useEffect(() => {
    localStorage.setItem("isNavBarVisible", "false");
    dispatch(setIsFooterVisible(false));
  }, []);


  useEffect(() => {
    let timeoutId;
    if ((isPlayerFocused || isPaused) && isTitleVisible) {
      timeoutId = setTimeout(() => {
        setIsTitleVisible(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isPlayerFocused, isTitleVisible, isPaused]);

  const streamsArr = useMemo(
    () => [
      "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",
      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8",
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
    ],
    []
  );

  
  const len = streamsArr.length;
  const myVar = Math.floor(Math.random() * len);
  console.log(myVar);
  useEffect(() => {
    setSelectedVideoIndex(myVar);
  }, []);
const selectedVideoLink = useMemo(() => streamsArr[selectedVideoIndex], [selectedVideoIndex, streamsArr]);
useEffect(() => {
  let newMovieTitle;
  switch (selectedVideoIndex) {
    case 0:
      newMovieTitle = "CHEESE AND CRACKERS";
      break;
    case 1:
      newMovieTitle = "DOOMSDAY BOOK";
      break;
    case 2:
      newMovieTitle = "REIGN OF FIRE";
      break;
    case 3:
      newMovieTitle="BIG BUCK BUNNY";
      break;
   
  }
  setMovieTitle(newMovieTitle);
}, [selectedVideoIndex]);

 return (
    <div>
      <MediaPlayer
        src={selectedVideoLink
        }
        
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
        onPause={() => handlePauseChange(true)}
        style={{ width: "100vw", height: "100vh" }}
        className="shadow"
        ref={ref}
        
      >
        {isPlayerFocused && isTitleVisible && (
          <Title className="title-video-container">{MovieTitle}</Title>
        )}

        <MediaProvider>
          <Track
            src="src/assets/check.srt"
            kind="subtitles"
            label="English"
            lang="en-US"
            type="srt"
          />
          <Track
            src="src/assets/english_.srt"
            kind="subtitles"
            label="Spanish"
            lang="en-ES"
            type="srt"
          />
          <Track
            src="src/assets/english_.srt"
            kind="subtitles"
            label="Espaneol"
            lang="en-ES"
            default
            type="srt"
          />
        </MediaProvider>

        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
}

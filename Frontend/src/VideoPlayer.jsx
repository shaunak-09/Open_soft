import React, { useState, useEffect, useMemo, useRef } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Track } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "./VideoPlayer.css";
import { Title } from "@vidstack/react";

export default function VideoPlayer() {
  const [isPlayerFocused, setIsPlayerFocused] = useState(true);
  const [isTitleVisible, setIsTitleVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const ref = useRef(null);

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
    let timeoutId;
    if ((isPlayerFocused || isPaused) && isTitleVisible) {
      timeoutId = setTimeout(() => {
        setIsTitleVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [isPlayerFocused, isTitleVisible, isPaused]);

  const streamsArr = useMemo(
    () => [
      "http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8",

      "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8",

      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",

      "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",

      "http://vjs.zencdn.net/v/oceans.mp4",

      "https://vz-cea98c59-23c.b-cdn.net/c309129c-27b6-4e43-8254-62a15c77c5ee/1280x720/video.m3u8",

      "https://videos-cloudfront-usp.jwpsrv.com/6607666e_2d04fb1554308ffe0403328b4e442907ee41c978/site/LOPLPiDX/media/yp34SRmf/version/IFBsp7yL/manifest.ism/manifest-audio_eng=112000-video_eng=936240.m3u8",
    ],
    []
  );
  const len = streamsArr.length;
  const myVar = Math.floor(Math.random() * len);
  useEffect(() => {
    setSelectedVideoIndex(myVar);
  }, []);

  const selectedVideoLink = useMemo(
    () => streamsArr[selectedVideoIndex],
    [selectedVideoIndex, streamsArr]
  );

  return (
    <div>
      <MediaPlayer
        src={selectedVideoLink}
        onFocus={() => handleFocusChange(true)}
        onBlur={() => handleFocusChange(false)}
        onPause={() => handlePauseChange(true)}
        style={{ width: "90vw", height: "90vh" }}
        className="shadow"
        ref={ref}
      >
        {isPlayerFocused && isTitleVisible && (
          <Title className="title">Movie Title</Title>
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

import { useEffect, useState } from 'react'
import Video from "../assets/new_bg.mp4"

function VideoLoaderV1() {  
  const [showVideo, setShowVideo] = useState(localStorage.getItem('showVideo') != "false")

  const handleVideoEnded = () => {
    hideVideo()
  }

  const hideVideo = () => {
    localStorage.setItem('showVideo', "false")
    setShowVideo(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showVideo) {
        hideVideo()
      }
    }, 15000);

    return () => clearTimeout(timer);
  },[showVideo]);

  return (
    <>
      {showVideo && (
        <video autoPlay muted id="myVideo"
          className="xs:hidden sm:fixed z-2 top-0 left-0 w-full h-full object-cover"
          onEnded={handleVideoEnded}
        >
          <source src={Video} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}
    </>
  )
}

export default VideoLoaderV1

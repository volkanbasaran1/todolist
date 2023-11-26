import { useContext } from "react"
import SideBar from "../components/SideBar"
import { YoutubeContext } from "../context/youtubeContext"
import Loading from "../components/Loading";
import VideoCard from "../components/VideoCard";


const Feed = () => {
  const { videos } = useContext(YoutubeContext);

  return (
    <div className="flex">
      <SideBar />
      {/* gridi tw yerine düz css ile yazmak daha kolay olduğundan sınıf verdik */}
      <div className="videos">
        {
          !videos ? (<Loading type={"video"}/>) : (
            videos.map((item) => (
              item.type === "video" && <VideoCard video={item} key={item.videoId} />))

          )}
      </div>

    </div>

  )
}

export default Feed
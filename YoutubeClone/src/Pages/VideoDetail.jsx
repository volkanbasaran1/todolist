import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import VideoInfo from "../components/VideoInfo";
import { useEffect, useState } from "react";
import { getData } from "../helpers/getData";
import Loading from "../components/Loading";
import VideoCard from "../components/VideoCard";
import Comments from "../components/Comments";

const VideoDetail = () => {
  //null bize loadingin basılmasında gerekli boş dize yaparsak elemanı yoksa şeklinde ayrıca belirtmek gerek
  const [related, setRelated] = useState(null);
  const { id } = useParams();
  //buradaki değişkenin isminin ne olacağına app.jsx'teki root'da
  //iki nokta üstüstenin devamına koyduğumuz şey karar veriyor
  const videoUrl = `https://www.youtube.com/watch?v=${id}`;

  useEffect(() => {
    setRelated(null)
    getData(`/related?id=${id}`).then((res) => setRelated(res.data.data));
  }, [id]);

  return (
    <div className="p-6 md:p-6 min-h-screen flex max-lg:flex-col ">
      <div className="flex-1">
        <ReactPlayer
          className={"rounded"}
          width={"100%"}
          controls
          url={`https://www.youtube.com/watch?v=${id}`}
        />
        <VideoInfo />
        <Comments/>
      </div>

      <div className="max-md:w-full lg:max-w-[400px]  flex flex-col max-lg:my-5 px-3 gap-5">
        {!related ? (
          <Loading type={"video"} />
        ) : (
          related.map(
            (item) => item.type == "video" && <VideoCard type="row" video={item} />
          )
        )}
      </div>
    </div>
  );
};

export default VideoDetail;

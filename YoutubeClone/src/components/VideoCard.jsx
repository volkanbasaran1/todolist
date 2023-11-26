import millify from "millify"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const VideoCard = ({ video, type }) => {
    const [isHover, setIsHover] = useState(false)
    const navigate = useNavigate();
    // console.log(video);
    // console.log(video.thumbnail[video.thumbnail.length - 1]) //bu bize obj getiriyo.içindeki url image'i
    return (
        <div
            onClick={() => navigate(`/watch/${video.videoId}`)}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`cursor-pointer ${type && "row"}`}>
            <div>
                <img
                    className="rounded-lg w-full h-full object-contain"
                    src={isHover && video.richThumbnail
                        ? video.richThumbnail[0].url
                        : video.thumbnail[video.thumbnail.length - 1].url} />
            </div>
            <div>
                <div className="flex gap-4 mt-5">
                    <img
                        className={`w-14 h-14 rounded-full ${type && "hidden"}`}
                        src={video.channelThumbnail[0].url} />

                    <div>

                        <h4 className="font-bold">
                            {
                                type === "deneme"
                                    ? video.title.slice(0, 150)
                                    : type && video.title.length > 34
                                        ? `${video.title.slice(0, 34)}...`
                                        : video.title.length > 50
                                            ? `${video.title.slice(0, 50)}...`
                                            : video.title
                            }
                        </h4>
                        <p>{video.channelTitle}</p>
                        <div className="flex gap-2">
                            <p>{millify(video.viewCount)} İzlenme</p>
                            <p>{video.publishedTimeText}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
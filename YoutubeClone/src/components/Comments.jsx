import { useEffect, useState } from 'react';
import { getData } from './../helpers/getData';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import { AiFillDislike, AiFillLike } from "react-icons/ai";

export const Comments = () => {
    const [comments, setComments] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        getData(`/comments?id=${id}`)
            .then((res) => setComments(res.data.data))
    }, [id])

    console.log(comments)
    return (<>
        {!comments ? (<Loading />) :
            (comments.map((comment) => (
                <div className='commentgrid  mt-9'>
                    <div>
                        <img className="rounded-full" src={comment.authorThumbnail ?
                            comment.authorThumbnail[0].url :
                            comment.authorThumbnail[comment.authorThumbnail.length - 1].url} />
                    </div>
                    <div>
                        <div className='flex'>
                            <p>{comment.authorText}</p>
                            <span>{comment.publishedTimeText}</span>
                        </div>
                        <p>{comment.textDisplay}</p>
                        <div className="flex items-center rounded-full">
                            <div className="flex items-center gap-3 py-2 px-4 border-right ">
                                <div className="rounded-full py-1 px-1 hover:bg-gray-700">
                                    <AiFillLike />
                                </div>
                                {/* yüzden sonra beştane sıfır olsun demek aşağıdaki kullanım 100e5 önce bunu kullandık aşağıda sonra sildik.*/}
                                <span>{Math.round(Math.random() * 100)}</span>
                            </div>
                            <div className="py-1 px-1 rounded-full hover:bg-gray-700">
                                <AiFillDislike />
                            </div>
                            <button className="rounded-full hover:bg-gray-700 p-3">Answer</button>
                        </div>
                    </div>
                </div>

            )))
        }
    </>)

}

export default Comments;

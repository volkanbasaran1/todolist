import { useSearchParams } from "react-router-dom"
import { getData } from './../helpers/getData';
import { useEffect, useState } from "react";
import SideBar from './../components/SideBar';
import Loading from './../components/Loading';
import VideoCard from './../components/VideoCard';


const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get("search_query")
  const [results, setResults] = useState()

  useEffect(() => {
    getData(`/search?query=${query}`).then((res) => setResults(res.data.data))
  }, [query])


  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col gap-5 px-4">
        <h1>{query} için sonuçlar</h1>
        {
          !results ? <Loading type={"video"} /> : results.map((item) => item.type === "video" && <VideoCard video={item} type={"deneme"} />
          )
        }
      </div>
    </div>
  )
}

export default SearchResult
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Feed from "./Pages/Feed"
import SearchResult from "./Pages/SearchResult"
import VideoDetail from "./Pages/VideoDetail"
import Header from "./components/Header"

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Feed />} />
        {/* dinamik route tanımlama ":" */}
        <Route path="/watch/:id" element={<VideoDetail />} />
        <Route path="/results" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

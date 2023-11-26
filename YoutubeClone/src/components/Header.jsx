import { Link, useNavigate } from "react-router-dom"
import { AiFillBell, AiOutlineSearch, AiFillVideoCamera } from "react-icons/ai";

const Header = () => {
    const navigate = useNavigate()
    // Kullanıcıyı arama sonuçları sayfasına yönlendir
    // Url'e arama parametresi olarak aratılan terimi ekle
    const handleSubmit = (e) => {
        e.preventDefault()
        const text = e.target[0].value;
        navigate(`/results?search_query=${text}`)
    }

    return (
        <header className="flex justify-between items-center p-4">
            <Link className="flex items-center gap-[10px]">
                <img width={50} src="/logo2.png" />
                {/* sadece max-md:hidden yapsak da aynı sonucu alırdık */}
                <h1 className="text-2xl hidden md:block">Youtube</h1>
            </Link>

            {/* tailwindde boost'taki gibi form kontrol yazınca güzel bir input gelmesi gibi bir olay yok, 
            tailwindi sadece etkili css yazma yöntemi gibi düşünebilirsiniz, hazır comp. yok
            tw ve boost.'un bazı kodları aynı olduğundan birlikte kullanılması sağlıksız. Projelerde 
            css/sass/boost./tw gibi stillendirme çözümlerinden birini tercih etmek en doğrusu*/}
            <form onSubmit={handleSubmit} className="flex items-center border border-gray-400 rounded-[20px]">
                <input placeholder="example: cat videos"
                    className="bg-black outline-none rounded-[20px] px-3 py-1 b" type="text" />
                <button className="grid place-items-center border-l px-2 text-xl">
                    <AiOutlineSearch />
                </button>
            </form>

            <div className="flex gap-3 text-xl cursor-pointer">
                <div className="p-2 transition duration-500 hover:bg-gray-700 rounded-full">
                    <AiFillBell />
                </div>
                <div className="p-2 transition duration-500 hover:bg-gray-700 rounded-full">
                    <AiFillVideoCamera />
                </div>
            </div>
        </header>
    )
}

export default Header
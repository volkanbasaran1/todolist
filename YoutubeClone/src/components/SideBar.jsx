import { useContext } from 'react';
import { categories } from './../constants/index';
import { YoutubeContext } from '../context/youtubeContext';

const SideBar = () => {
  const { selectedCategory, setSelectedCategory } = useContext(YoutubeContext)

  return (
    <div className='flex flex-col px-2 md:px-4'>
      {categories.map((i) => (
        <div onClick={() => setSelectedCategory(i)} key={i.name}>
          <div
            // eğer ki ekrana bastığımız kategori seçili ise arkaplan ver
            style={{ background: selectedCategory.name === i.name && "#2d2d2d" }}
            className='flex items-center gap-2 py-4 px-2 md:px-3 md:text-lg cursor-pointer rounded-md hover:bg-[#2d2d2d]'>
            <span className='max-sm:text-2xl'> {i.icon}</span>
            <span className='max-sm:hidden'>{i.name}</span>
          </div>

          {i.divider && <hr />}
        </div>
        // reactta her return'den sonra bir kapsayıcı olmalı yoksa hata alırsınız
      ))}
    </div >
  )
}

export default SideBar
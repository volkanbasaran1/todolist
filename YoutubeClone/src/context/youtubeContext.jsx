import { createContext, useEffect, useState } from "react";
import { categories } from "../constants";
import { getData } from "../helpers/getData";

export const YoutubeContext = createContext();

export function YoutubeProvider({ children }) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [videos, setVideos] = useState(null);

    //   console.log(selectedCategory)

    useEffect(() => {
        //apiden videolar alınır.
        if (selectedCategory.type === "home" ||
            selectedCategory.type === "trending") {
            // yardımcı fonksiyonu kullanarak apiye istek atma
            getData(`/${selectedCategory.type}`).then((res) => setVideos(res.data.data))
        }
        // eğer seçili kategori home ve trending dışında ise search'e istek atıp param versin

// Aşağıdaki kodu yazınca search inputuna örn music param'ını yazınca gelen verileri çeker
        if (selectedCategory.type === "category") {
            getData(`search?query=${selectedCategory.name}&type=video`)
                .then((res) => setVideos(res.data.data))
        }

    }, [selectedCategory])

    return (
        // çift parantez olma sebebi, value tek değer kabul eder, bizde üç var. Bunları obje içine alırsak tek olur.
        <YoutubeContext.Provider value={{ selectedCategory, setSelectedCategory, videos }}>
            {children}
        </YoutubeContext.Provider>
    );
}


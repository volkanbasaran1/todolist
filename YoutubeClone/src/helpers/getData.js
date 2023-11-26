import axios from "axios";

const options = {
  // istek ile göndermemiz gereken kimliğimiz
  params: {
    //buralarda nav.geoloc vs gibi fonksiyonlarla kullanıcının konumuna erişilir ve ona göre veri sunulur
    geo: "TR",
    lang: "tr",
  },
  headers: {
    // apiden istek hakkının dolduğuna dair uyarı aldıysan(429) yeni gmail ile gelen key ile aşağıdaki keyi değiştir
    "X-RapidAPI-Key": "22138029dfmsh44f99463394aa6ap103aa8jsnf1e5106adaff",
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
};

// axios'un özelliklerinden birini kullanarak bütün isteklerde ortak olan baseUrl'nin tanımlanması

axios.defaults.baseURL = "https://yt-api.p.rapidapi.com";

// bunu yaptıktan sonra artık base urlyi yazmamıza gerek kalmıyo path'i yani /home yazsak yetiyo

// api'ye verdiğimiz endpoint için istek atıp verileri döndüren bir fonk yazalım

export const getData = async (path) => {
  try {
    return await axios.get(path, options);
  } catch (err) {
    console.log("verileri çekerken hata oluştu ");
  }
};

// tarihi alır geriye gün/ay döndürür
export const formatDate = (dateStr) => {
    // Date methotladını kullanabilmek için elimizdeki tarih ile date objesi oluşturduk
    const date = new Date(dateStr)
    // şimdi methotları kullanabiliriz. get day haftanın gününü verir get date ayın
    // console.log(date)

    // ayları dizi şeklinde tuttuğundan doğru aya ulaşabilmek için +1 yapıyoruz
    
    // formatlayıp geri döndürme
    return date.getDate() + "/" + (date.getMonth() + 1);
    // ikinci kısmı paranteze almazsak monthu string olarak algılayıp yanına bir koyuyo toplamıyor
}
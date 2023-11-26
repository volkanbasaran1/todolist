import { useState } from "react"

const StringArea = ({ text, max }) => {
  const [expand, setExpand] = useState(false)

  let shortText = text;
// console.log(shortText)
  if (text.length > max && !expand) {
    shortText = text.slice(0, max) + "... More"
  }

  return (
    <p onClick={() => setExpand(!expand)}>  
    {/* {console.log(shortText)} console'da veri düzgün ama ekranda birleşik çıkar, aşağıdaki yöntemi uygula*/}
    {/* {console.log(shortText.split("\n"))} */}
      {/* split fonksiyonu, bir metni belirtilen bir ayırıcıya göre böler ve yeni bir diziye dönüştürür. 
      "\n" (yani yeni satır karakteri) burada metni bölmek için kullanılan ayırıcıdır. */}
    {shortText.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))}
    </p>
  )
}

export default StringArea
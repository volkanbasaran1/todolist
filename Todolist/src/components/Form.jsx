import axios from "axios";
import { v4 } from "uuid";

const Form = ({ setTodos, todos, totalCount, maxPage, setPage, params }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.dir(e.target) yaz buraya, sonra todoliste bir şeyler gönder.
    // elemanların submit yapınca nasıl tutulduğunu gör ve aşağıdaki şekilde değişkenlere ata
    //Formdan verileri alma
    const title = e.target[0].value;
    const status = e.target[1].value;

    if (!title) {
      return alert('Please, fill the blanks')
    }

    //veritabanına kaydedilecek veriyi hazırlama
    const newTodo = {
      title,
      status,
      id: v4(),
      isDone: false,
      //newd. saati falan da tutuyor buna gerek yok bu yüzden toLocale... ekledik.
      date: new Date().toLocaleDateString(),
    };
    // console.log(newTodo)
    //! Veritabanına veri post etme işlemi
    // oluşturduğumuz todo'yu api'ye eklemek
    axios.post("http://localhost:3000/todos", newTodo)
      // api güncellenince arayüzü günceller
      .then(() => {
        if (todos.length === params._limit) {//8
          // eğer ki son sayfa doluysa bir fazlasına yönlendir.
          setPage(totalCount % params._limit === 0 ? (maxPage + 1) : maxPage);
          return;
        }
        // set methodu fonksiyona param olarak statein son halini gönderir
        setTodos((todos) => [...todos, newTodo])
      })
    //settodos'u param olarak gönderdiysek de todos'u param olarak göndermedik ama setTodos'un bir olayı var
    //param olarak fonk alabiliyor ve aldığı bu fonk'da çalıştığı anda daha önceki todos'lara 
    //erişmemizi sağlıyor. bu bütün set metotlarının kabiliyeti
    e.target[0].value = " ";
    e.target[1].value = "daily";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center gap-3 my-5">
      <input
        className="form-control shadow"
        placeholder="Learn Js."
        type="text"
      />
      <select defaultValue={"daily"} className="form-select w-50">
        {/* aşağıdaki value der ki : ımportant'ı seçersem veri tabanında important value'sını tutcam
        JavaScript'deki <select> öğesi içindeki <option> elemanlarının value özelliği, genellikle 
        veritabanında saklanacak olan benzersiz bir kimlik veya anahtar (key) değerini temsil eder. 
        Bu değerler, kullanıcının seçebileceği seçenekleri temsil ederken, veritabanında depolanan verinin
        bu seçeneklerle ilişkilendirilmesine yardımcı olur. yani kullanıcının gördüğü ikinci important
        veri tabanına kaydedeceğim değer birinci(gökçe de olabilirdi o) */}
        {/* ayrıca optiona selected eklemek ile defaultValue'yi yukarı eklemek aynı sonucu verir ama
        selected yazarsan console'da React uyarısı alırsın*/}
        <option value="important">Important</option>
        <option value="daily">Daily</option>
        <option value="job">Job</option>
      </select>
      <button className="btn btn-primary shadow">Send</button>
    </form>
  );
};

export default Form;

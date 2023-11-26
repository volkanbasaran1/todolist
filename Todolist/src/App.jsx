import { useEffect, useState } from "react";
import Form from "./components/Form";
import ListItem from "./components/ListItem";
import axios from 'axios';
import Loading from "./components/Loading";

function App() {
   const [todos, setTodos] = useState(null);
   const [page, setPage] = useState(1);
   const [totalCount, setTotalCount] = useState();
   const [maxPage, setMaxPage] = useState();

   //apiye göndereceğimiz parametreler 
   const params = {
      _limit: 8,
      _page: page,
   }

   useEffect(() => {
      // sayfa değişimde loading gelmesi için todosu sıfırlama
      setTodos(null)
      // fetch tarafında verinin kendisine doğrudan erişirken axios bize config data headers.. gibi
      // alt başlıklar verir. bunlardan datanın içerisinde bizim 5 tane obje içeren dizimiz bulunur
      // axios ile get isteği
      axios
         .get('http://localhost:3000/todos', { params })
         .then((res) => {
            // toplam sayfa sayısnı hesaplama
            const count = Number(res.headers['x-total-count']);
            setMaxPage(Math.ceil(count / params._limit));
            setTotalCount(count);
            setTodos(res.data);
         });
   }, [page]);


   return (
      <div className="container p-5">
         <h2 className="text-center">
            Server <span className="text-warning">CRUD</span>
         </h2>

         {/* Formdan eleman ekliyorum ul'den de elemanları güncelliyorum */}
         <Form params={params} totalCount={totalCount} maxPage={maxPage} setPage={setPage} setTodos={setTodos} todos={todos} />

         <ul className="list-group">
            {/* veriler henüz gelmediyse */}
            {!todos && <Loading />}

            {/* normal parantez ok fonksiyonunda doğrudan return eden kullanımdı, 
             süslü kullansak ayrıca return gerekirdi
             bir de hiç parantez açılmayan yöntem var- böyle dört kullanımı var araştır?*/}
            {todos?.map((todo) => (<ListItem key={todo.id} todo={todo} setTodos={setTodos} />))}
         </ul>

         <div className="d-flex justify-content-between my-5">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn-primary">{`< Previous`}</button>
            <span className="lead fw-bold">{page}</span>
            <button disabled={page == maxPage} onClick={() => setPage(page + 1)} className="btn btn-primary" >{`Next >`}</button>
            {/* <button onClick={()=> setPage((prev)=> prev + 1)}>{`Next >`}</button>
            bu yöntem de üstteki ile aynı sonucu verir set page'e yazdığımız herhangi bir fonk'a otomatik
            olarak page'in param olarak gelmesinin kullanıldığı yöntemdir.
            
            burada page artışı yaptığımızda sayfada görüyoruz ama sayfa yenilenince bunu kaybediyoruz. 
            1. sayfaya dönüyor. Böyle olmaması için param'ın urlye de eklenmesi lazım */}
            {/* her page artışı yapıldığında apiye istek atıyoruz 
            
            sayfa ilk basılırken loading geliyo ama sf geçişlerinde gelmiyor.bunu nasıl çözeriz?
            çünkü loadingi todos boş ise şeklinde ayarlamıştık. sayfa değişimlerinde todos boşalmıyo. 
            gelmesi için todos null olsun şeklinde eklemeliyiz*/}

         </div>
      </div>
   )
}

export default App;

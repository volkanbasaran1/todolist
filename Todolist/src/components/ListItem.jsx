import axios from "axios";
import { types } from "../Constants";
import { formatDate } from "../helpers";
import { useRef, useState } from "react";

const ListItem = ({ setTodos, todo }) => {
  const [isEditMode, setIsEditMode] = useState();
 
  const titleRef = useRef();
  const selectRef = useRef();
  //console.log(titleRef.current) Current değeri seçtiğimiz elemana denk gelir. Bir nevi e.target gibi

  //! Silme işlemi
  const handleDelete = () => {
    // veri tabanında sil
    axios
      .delete(`http://localhost:3000/todos/${todo.id}`)
      //istek başarılı olursa arayüzü güncelle
      .then(() => setTodos((todos) => todos.filter((i) => i.id !== todo.id)));
    // yine todos'u parametre kullanmadan aldık. settodosun bu özelliğini öğren
  };

  //! güncelleme
  const handleEdit = () => {
    // input değerlerine erişme
    const newValues = {
      title: titleRef.current.value,
      status: selectRef.current.value,
    };

    //  api'yi güncelle
    axios
      .patch(`http://localhost:3000/todos/${todo.id}`, newValues)
      // state'i güncelle
      .then(() => {
        // todo objesini güncelle
        const updated = { ...todo, ...newValues };
        // state'de tutğumuz dizideki eski obje yerine updated'ı ekle
        setTodos((todos) =>
          todos.map((i) => (i.id === updated.id ? updated : i))
        );
      });

    setIsEditMode(false);
  };


  return (
    <li className="relative py-4 px-3 list-group-item d-flex justify-content-between align-items-center">
      {/*checked area */}
      <div>
        {/* checked ile todonon check değerini isdone'a bağladık. Tamamlandıysa otomatik tikli geliyo */}
        {/* default checked vs checked. checked'da sabit değer gelir değiştiremem. anca json serverdaki veri
        değerini değiştirebilirim.  defaultta gelen değer varsayılanda gelir ama değiştirebiliriz */}
        <input
          type="checkbox"
          defaultChecked={true}
          className="form-check-input me-2 shadow"
        />
        {/* todo statuste bir eleman varsa rengini ver yoksa verme - select kısmı*/}
        {isEditMode ? (
          <select ref={selectRef} defaultValue={todo.status}>
            <option value="important">Önemli</option>
            <option value="daily">Günlük</option>
            <option value="job">İş</option>
          </select>
        ) : (
          <span className={`badge ${types[todo.status]?.color}`}>
            {todo.status}
          </span>
        )}
      </div>

      {/* yazı içeriği */}
      {isEditMode ? (
        <input ref={titleRef} defaultValue={todo.title} type="text" />
      ) : (
        <span>{todo.title}</span>
      )}

      {/* Butonlar alanı */}
      <div className="btn-group">
        {isEditMode ? (
          <>
            <button
              onClick={handleEdit}
              className="btn btn-sm btn-success"
            >
              Kayıt
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className="btn btn-sm btn-secondary"
            >
              İptal
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditMode(true)}
              className="btn btn-sm btn-primary"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-danger"
            >
              Del
            </button>
          </>
        )}
      </div>

      {/* tarih */}
      <span className="date">{formatDate(todo.date)}</span>
    </li>
  );
};

export default ListItem;
import { useEffect, useState } from "react";
import "./App.css";

import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
function App() {
  const [lista, setLista] = useState([]);
  let listilla = [
    { label: "diego", done: true },
    { label: "manuel", done: false },
    {
      label: "Samia",
      done: false,
    },
  ];

  useEffect(() => {
    getRoles("https://assets.breatheco.de/apis/fake/todos/user/anna");
  }, []);

  const getRoles = (url, options = {}) => {
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLista(data);
        console.log(lista);
      });
  };

  function actualizarFetch() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/anna", {
      method: "PUT",
      body: JSON.stringify(lista),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        getRoles("https://assets.breatheco.de/apis/fake/todos/user/anna");
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }

  function handleChange(e) {
    let label = e.target.value;
    const nueva = {
      label: label,
      done: false,
    };
    setLista((prevState) => {
      return [...prevState, nueva];
    });
  }

  function eliminar(index) {
    const nuevaLista = lista.filter((todo) => todo !== lista[index]);
    setLista(nuevaLista);

    //aca uso de nuevo la funcion actualizar

    fetch("https://assets.breatheco.de/apis/fake/todos/user/anna", {
      method: "PUT",
      body: JSON.stringify(nuevaLista),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
        getRoles("https://assets.breatheco.de/apis/fake/todos/user/anna");
      })
      .catch((error) => {
        //manejo de errores
        console.log(error);
      });
  }

  return (
    <>
      <div className="container">
        <div className="text-center totulo">
          <p className="h-1">todos</p>
        </div>
        <div>
          <ul className="sinP sombra">
            <div className="fondocolor">
              <input
                className="input bloque"
                type="text"
                value={lista.label}
                onBlur={handleChange}
              />
              <span className="check" onClick={actualizarFetch}>
                <FaPlus />
              </span>
            </div>

            {lista.map((rol, index) => {
              return (
                <li className="hoja" key={index}>
                  {rol.label}
                  <span onClick={() => eliminar(index)} className="span">
                    <FaTrash />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

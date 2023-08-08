import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Header from "./components/Header";
import Logo from "./components/Logo";
import { encontrarCamino } from "./logic/redSemantica.js";
import SinResultados from "./components/SinResultados";

class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.relaciones = [];
  }
}

function App() {
  const [nodos, setNodos] = useState([]);
  const [camino, setCamino] = useState([]);

  const agregarNodo = (valor) => {
    const nodo = new Nodo();
    nodo.valor = valor;
    const newNodos = [...nodos];
    newNodos.push(nodo);
    setNodos(newNodos);
  };

  const validarNodo = (nodo) => {
    return nodos.find((n) => n.valor === nodo);
  };

  const crearNodo = (e) => {
    e.preventDefault();
    const nodo = e.target[0].value;
    e.target[0].value = "";

    if (nodo === "") return;

    if (validarNodo(nodo)) {
      alert("El nodo ya existe");
      return;
    }

    agregarNodo(nodo);
  };

  const buscarRelacion = (nodoPadre, nodoHijo) => {
    return nodoPadre.relaciones.find((n) => n.valor === nodoHijo.valor);
  };

  const agregarRelacion = (nodoPadre, nodoHijo) => {
    const newRelacionesPadre = [...nodoPadre.relaciones];

    if (buscarRelacion(nodoPadre, nodoHijo)) {
      alert("La relacion ya existe");
      return false;
    }

    newRelacionesPadre.push(nodoHijo);
    nodoPadre.relaciones = newRelacionesPadre;
    return nodoPadre;
  };

  const crearRelacion = (e) => {
    e.preventDefault();
    const valorPadre = e.target[0].value;
    const valorHijo = e.target[1].value;
    e.target[0].value = "";
    e.target[1].value = "";

    if (valorPadre === "" || valorHijo === "") return;

    if (!validarNodo(valorPadre) || !validarNodo(valorHijo)) {
      alert("El nodo no existe");
      return;
    }

    if (valorPadre === valorHijo) {
      alert("El nodo no puede ser padre de si mismo");
      return;
    }

    const nodoPadre = validarNodo(valorPadre);
    const nodoHijo = validarNodo(valorHijo);

    const newNodoPadre = agregarRelacion(nodoPadre, nodoHijo);

    if (!newNodoPadre) return;

    const newNodos = [...nodos];
    newNodos.splice(newNodos.indexOf(nodoPadre), 1, newNodoPadre);
    setNodos(newNodos);
  };

  const eliminarRelacion = (valorPadre, valorHijo) => {
    const nodoPadre = validarNodo(valorPadre);
    const nodoHijo = validarNodo(valorHijo);

    const newRelacionesPadre = [...nodoPadre.relaciones];
    const newNodoPadre = nodoPadre;

    if (!buscarRelacion(nodoPadre, nodoHijo)) {
      alert("La relacion no existe");
      return;
    }

    newRelacionesPadre.splice(newRelacionesPadre.indexOf(nodoHijo), 1);
    newNodoPadre.relaciones = newRelacionesPadre;
    const newNodos = [...nodos];
    newNodos.splice(newNodos.indexOf(nodoPadre), 1, newNodoPadre);
    setNodos(newNodos);
  };

  const buscarCamino = (e) => {
    e.preventDefault();
    const valorInicio = e.target[0].value;
    const valorObjetivo = e.target[1].value;
    e.target[0].value = "";
    e.target[1].value = "";

    if (valorInicio === "" || valorObjetivo === "") return;

    if (!validarNodo(valorInicio) || !validarNodo(valorObjetivo)) {
      alert("El nodo no existe");
      return;
    }

    if (valorInicio === valorObjetivo) {
      alert("No se puede buscar el mismo");
      return;
    }

    const nodoInicio = validarNodo(valorInicio);
    const nodoObjetivo = validarNodo(valorObjetivo);

    setCamino(encontrarCamino(nodoInicio, nodoObjetivo));
  };

  return (
    <div className="flex flex-col m-5">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 my-5 container mx-auto xl:px-20">
        <Header />
        <Logo />

        <section className="bg-sky-950 col-span-3 md:col-span-2 text-slate-300 rounded-3xl flex flex-col justify-around relative aspect-[2/1] md:aspect-square lg:aspect-[2/1] shadow-sm p-8">
          <form className="flex flex-col" onSubmit={crearNodo}>
            <h3 className="text-2xl font-bold">Crear Nodo</h3>
            <div className="flex flex-row mt-4 gap-4 items-end">
              <div>
                <input
                  type="text"
                  id="nombreNodo"
                  className="bg-sky-900 w-full border-2 border-sky-700 text-md rounded-lg p-2 focus:outline-none focus:bg-sky-800 focus:border-sky-900 transition-colors"
                  placeholder="Nombre Nodo..."
                />
              </div>

              <button
                type="submit"
                className="bg-sky-900 border-2 border-sky-700 text-md rounded-lg py-2 px-8 hover:bg-sky-800 hover:border-sky-900 transition-colors"
              >
                Crear Nodo
              </button>
            </div>
          </form>

          <form className="flex flex-col" onSubmit={crearRelacion}>
            <h3 className="text-2xl font-bold">Crear Relacion</h3>
            <div className="flex flex-col items-center lg:flex-row mt-2 gap-4 lg:items-end">
              <div className="flex flex-row mt-2 gap-4 items-end">
                <select
                  name=""
                  id="nodoPadre"
                  className="bg-sky-900 border-2 border-sky-700 text-md rounded-lg p-2 focus:outline-none focus:bg-sky-800 focus:border-sky-900 transition-colors"
                >
                  <option value="">Padre...</option>
                  {nodos.map((nodo, index) => (
                    <option key={index} value={nodo.valor}>
                      {nodo.valor}
                    </option>
                  ))}
                </select>

                <span className="p-3">
                  <FaArrowRight />
                </span>

                <select
                  name=""
                  id="nodoHijo"
                  className="bg-sky-900 border-2 border-sky-700 text-md rounded-lg p-2 focus:outline-none focus:bg-sky-800 focus:border-sky-900 transition-colors"
                >
                  <option value="">Hijo...</option>
                  {nodos.map((nodo, index) => (
                    <option key={index} value={nodo.valor}>
                      {nodo.valor}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-sky-900 border-2 border-sky-700 text-md rounded-lg py-2 px-8 hover:bg-sky-800 hover:border-sky-900 transition-colors"
              >
                Crear Relacion
              </button>
            </div>
          </form>
        </section>

        <section className="bg-sky-950 col-span-3 md:col-span-2 text-slate-300 rounded-3xl flex flex-col justify-around relative aspect-[2/1] md:aspect-square lg:aspect-[2/1] shadow-sm p-8">
          <form className="flex flex-col" onSubmit={buscarCamino}>
            <h3 className="text-2xl font-bold">Buscar Camino</h3>
            <div className="flex flex-col items-center lg:flex-row mt-2 gap-4 lg:items-end">
              <div className="flex flex-row mt-2 gap-4 items-end">
                <select
                  name=""
                  id="nodoInicio"
                  className="bg-sky-900 border-2 border-sky-700 text-md rounded-lg p-2 focus:outline-none focus:bg-sky-800 focus:border-sky-900 transition-colors"
                >
                  <option value="">Inicio...</option>
                  {nodos.map((nodo, index) => (
                    <option key={index} value={nodo.valor}>
                      {nodo.valor}
                    </option>
                  ))}
                </select>

                <span className="p-3">
                  <FaArrowRight />
                </span>

                <select
                  name=""
                  id="nodoFin"
                  className="bg-sky-900 border-2 border-sky-700 text-md rounded-lg p-2 focus:outline-none focus:bg-sky-800 focus:border-sky-900 transition-colors"
                >
                  <option value="">Objetivo...</option>
                  {nodos.map((nodo, index) => (
                    <option key={index} value={nodo.valor}>
                      {nodo.valor}
                    </option>
                  ))}
                </select>
              </div>
              <button className="bg-sky-900 border-2 border-sky-700 text-md rounded-lg py-2 px-8 hover:bg-sky-800 hover:border-sky-900 transition-colors">
                Buscar Camino
              </button>
            </div>
          </form>

          <p className="text-sm">
            <strong>Nota: </strong>
            El algoritmo de anchura, también conocido como BFS, encuentra el
            camino más corto entre nodos en un grafo. Explora por niveles y es
            útil en grafos pequeños o no ponderados, aunque puede no ser óptimo
            en grafos con pesos variables.
          </p>
        </section>

        <section className="bg-sky-950 col-span-3 md:col-span-2 text-slate-300 rounded-3xl flex flex-col gap-6 relative aspect-square shadow-sm p-8">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">Relaciones</h3>
            <div className="flex flex-wrap items-center flex-row mt-2">
              {nodos.map((nodo, index) =>
                nodo.relaciones.map((relacion, i) => (
                  <div
                    key={index + " " + i}
                    className="bg-cyan-900 flex flex-row m-1 py-1 pr-6 pl-2 rounded-lg relative"
                  >
                    <span className="text-2xl font-bold">{nodo.valor}</span>
                    <span className="p-2.5">
                      <FaArrowRight />
                    </span>
                    <span className="text-2xl font-bold">{relacion.valor}</span>
                    <button
                      onClick={() =>
                        eliminarRelacion(nodo.valor, relacion.valor)
                      }
                    >
                      <span className="absolute right-0.5 top-0.5">
                        <IoMdCloseCircle className="text-cyan-950 hover:text-cyan-700 transition-colors" />
                      </span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="bg-sky-950 col-span-3 md:col-span-2 text-white rounded-3xl flex aspect-square shadow-sm p-8">
          {camino ? (
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold mb-4">Camino</h3>
              <div className="bg-cyan-900 flex flex-row flex-wrap justify-center m-1 py-1 pr-6 pl-2 rounded-lg relative">
                {camino.map((nodo, index) => (
                  <div key={nodo.valor} className="flex flex-row items-center ">
                    <span className="text-2xl font-bold">{nodo.valor}</span>
                    {index !== camino.length - 1 && (
                      <span className="p-2.5">
                        <FaArrowRight />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <SinResultados />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;

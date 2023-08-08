import imgNodos from "../assets/nodos.png";

export default function Header() {
  return (
    <section className="bg-sky-200 relative col-span-3 aspect-[3/1] md:aspect-auto md:row-span-1 rounded-3xl overflow-hidden">
      <img
        src={imgNodos}
        alt="Nodos de una red"
        class="absolute top-0 left-0 w-full h-full object-cover opacity-50"
      />
      <div className="text-4xl sm:text-6xl lg:text-8xl font-bold absolute bottom-0 p-4 md:p-8">
        <h1 className="">Red</h1>
        <h1 className="">Semantica</h1>
      </div>
    </section>
  );
}

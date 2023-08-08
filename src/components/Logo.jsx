import imgChip from "../assets/chip.png";

export default function Logo() {
  return (
    <section className="bg-sky-950 hidden md:flex text-white rounded-3xl relative overflow-hidden aspect-square shadow-sm p-8 justify-center items-center">
      <img
        src={imgChip}
        alt="Nodos de una red"
        class="w-full h-full object-cover opacity-30"
      />
    </section>
  );
}

import { AiOutlineReddit } from "react-icons/ai";

export default function Logo() {
  return (
    <section className="bg-sky-950 hidden md:flex text-white rounded-3xl relative overflow-hidden aspect-square shadow-sm p-8 justify-center items-center">
      <AiOutlineReddit className="w-1/2 h-1/2 absolute opacity-10" />
    </section>
  );
}

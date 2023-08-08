import { PiSmileySadThin } from "react-icons/pi";

export default function SinResultados() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center text-sky-900">
      <h2 className="select-none text-2xl md:text-3xl font-bold mb-4">
        No se encontro un camino...
      </h2>
      <div className="w-[60%] h-[60%]">
        <PiSmileySadThin className="w-full h-full" />
      </div>
    </div>
  );
}

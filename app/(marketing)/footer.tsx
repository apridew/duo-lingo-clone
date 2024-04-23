import { Button } from "@/components/ui/button";
import Image from "next/image";

const country = [
  { name: "United States", image: "/US.svg" },
  { name: "Germany", image: "/DE.svg" },
  { name: "France", image: "/FR.svg" },
  { name: "Indonesia", image: "/ID.svg" },
];

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        {country.map((country) => (
          <Button size={"lg"} variant={"ghost"} className="w-full">
            <Image
              src={country.image}
              height={32}
              width={40}
              alt="logo"
              className="mr-4 rounded-md"
            />
            {country.name}
          </Button>
        ))}
      </div>
    </footer>
  );
};

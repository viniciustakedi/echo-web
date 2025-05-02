import Menu from "@/components/menu";
import { Title } from "@/components/ui/title";
import Image from "next/image";

export default function Home() {
  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main className="flex flex-col items-center justify-center h-[40vh]">
          <div className="intro">
            <Title className="font-black">
              Não sabe pra onde ir? O lugar realmente é bom?
            </Title>
            <Title className="font-black">
              Deixa comigo que eu faço a review e conto pra você!
            </Title>
          </div>
        </main>
      </div>
    </div>
  );
}

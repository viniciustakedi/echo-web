import Menu from "@/components/menu";
import ReviewContent from "./components/ReviewContent";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ReviewPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="base__div">
      <div className="base__div__page">
        <Menu />
        <main>
          <div className="max-w-3xl mx-auto px-6 pb-6 pt-32">
            <ReviewContent id={id} />
          </div>
        </main>
      </div>
    </div>
  );
}

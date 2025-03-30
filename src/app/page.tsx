import TopSection from "@/components/HomePage/TopSection";
import TopFooter from "@/components/TopFooter";
import Mapper from "@/components/Mapper";
import { CardsContainers } from "./CardsData";

export default function Home() {
  return (
    <div className=" px-5 lg:px-20 capitalize">
      <TopSection />
      {CardsContainers.map((cardsContainer, index) => {
        return (
          <Mapper
            key={index}
            title={cardsContainer.title}
            cards={cardsContainer.cards}
          />
        );
      })}
      <TopFooter />
    </div>
  );
}

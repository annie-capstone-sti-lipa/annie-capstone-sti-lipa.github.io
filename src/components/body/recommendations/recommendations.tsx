import AnimeItem from "../../../types/anime-item";
import animeType from "../../../types/enums/anime-type";
import AnimeCard from "../../general/anime-card/anime-card";
import "./recommendations.scss";

export default function Recommendations() {
  return (
    <div className="recommendations">
      <div className="title">Recommendations based on your MAL profile.</div>
      <div className="recommendation-container">
        {Array(Math.floor(Math.random() * (39 - 10) + 10))
          .fill("")
          .map((_, index) => {
            return (
              <AnimeCard
                type={animeType.recommendation}
                key={index}
                animeItem={
                  new AnimeItem(
                    "monday",
                    "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png",
                    6.6,
                    "Eveniet sit voluptatem inventore ut tempora provident suscipit.",
                    "https://www.youtube.com/embed/dKRnwClVxT4?enablejsapi=1&wmode=opaque&autoplay=1"
                  )
                }
              />
            );
          })}
      </div>
    </div>
  );
}

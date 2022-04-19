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
            return <AnimeCard type={animeType.recommendation} key={index} />;
          })}
      </div>
    </div>
  );
}

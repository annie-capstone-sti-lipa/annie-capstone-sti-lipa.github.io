import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertHelper from "../../../helpers/alert-helper";
import AnnieAPI from "../../../helpers/annie-api";
import {
  setAnimes,
  setLoading,
} from "../../../redux/reducers/anime-recommendations";
import AnimeItem from "../../../types/anime-item";
import animeType from "../../../types/enums/anime-type";
import AnimeCard from "../../general/anime-card/anime-card";
import { Loader, MiniLoader } from "../../general/loader/loader";
import "./recommendations.scss";

export default function Recommendations() {
  const dispatch = useDispatch();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const recommendations = useSelector(
    (state: any) => state.animeRecommendations.animes
  );
  const isLoading = useSelector(
    (state: any) => state.animeRecommendations.isLoading
  );

  const getRecommendations = useCallback(() => {
    if (recommendations.length <= 0) {
      dispatch(setLoading(true));
      AnnieAPI.getRecommendations()
        .then((recommendations) => {
          dispatch(setAnimes(recommendations));
          dispatch(setLoading(false));
        })
        .catch((e) => {
          dispatch(setLoading(false));
          AlertHelper.errorToast(e);
        });
    }
  }, [dispatch, recommendations.length]);

  const getMore = () => {
    setIsFetchingMore(true);
    AnnieAPI.getRecommendations(recommendations.length)
      .then((moreRecomendations) => {
        dispatch(setAnimes([...recommendations, ...moreRecomendations]));
      })
      .catch((e) => {
        AlertHelper.errorToast(e);
      })
      .finally(() => {
        setIsFetchingMore(false);
      });
  };

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  return (
    <div className="recommendations">
      <div className="title">Recommendations based on your MAL profile.</div>
      <div className="recommendation-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {recommendations.map((anime: AnimeItem, index: number) => {
              return (
                <AnimeCard
                  type={animeType.recommendation}
                  key={index}
                  animeItem={anime}
                />
              );
            })}
            <div
              className={`load-more ${isFetchingMore ? "disabled-button" : ""}`}
              onClick={() => {
                if (!isFetchingMore) getMore();
              }}
            >
              {isFetchingMore ? <MiniLoader /> : "load more"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

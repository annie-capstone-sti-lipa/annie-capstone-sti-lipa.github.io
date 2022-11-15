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
  const user = useSelector((state: any) => state.isLoggedIn.user);

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
      AnnieAPI.getRecommendations(user.uid, 0, 7)
        .then((recommendations) => {
          dispatch(setAnimes(recommendations));
          dispatch(setLoading(false));
        })
        .catch((e) => {
          dispatch(setLoading(false));
          AlertHelper.errorToast(e);
        });
    }
  }, [dispatch, recommendations.length, user.uid]);

  const getMore = async () => {
    setIsFetchingMore(true);
    let animes: Array<AnimeItem> = [...recommendations];
    async function sendRequest(index: number) {
      await AnnieAPI.getRecommendations(user.uid, animes.length + 1, 1)
        .then((moreRecomendations) => {
          animes = [...animes, ...moreRecomendations];
          dispatch(setAnimes(animes));
          if (index > 0) {
            sendRequest((index -= 1));
          } else {
            setIsFetchingMore(false);
          }
        })
        .catch((e) => {
          AlertHelper.errorToast(e);
        });
    }
    sendRequest(10);
  };

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  return (
    <div className="recommendations">
      <div className="title">Recommendations</div>
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

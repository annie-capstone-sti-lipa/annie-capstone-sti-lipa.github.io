import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AlertHelper from "../../../helpers/alert-helper";
import AnnieAPI from "../../../helpers/annie-api";
import Helpers from "../../../helpers/helpers";
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

  const [hasLoaded, setHasLoaded] = useState(false);

  const dispatch = useDispatch();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [hasRecommendations, setHasRecommendations] = useState(false);

  const recommendations = useSelector(
    (state: any) => state.animeRecommendations.animes
  );
  const isLoading = useSelector(
    (state: any) => state.animeRecommendations.isLoading
  );

  const refreshRecommendations = () => {
    setHasRecommendations(false);
    dispatch(setAnimes([]));
    getRecommendations();
  };

  const getRecommendations = useCallback(() => {
    if (recommendations.length <= 0) {
      dispatch(setLoading(true));
      setIsFetchingMore(true);
      AnnieAPI.getRecommendations(user.uid, 0, 7)
        .then((recoms) => {
          dispatch(setAnimes(recoms));
          dispatch(setLoading(false));
          if (recoms.length > 0) {
            setHasRecommendations(true);
          }
        })
        .catch((e) => {
          AlertHelper.errorToast(e);
        })
        .finally(() => {
          dispatch(setLoading(false));
          setIsFetchingMore(false);
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
          dispatch(setAnimes(Helpers.remove_duplicates(animes)));
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

  const getSearch = async () => {
    let queryString = (
      document.getElementById("search-input") as HTMLInputElement
    ).value;
    if (queryString !== undefined) {
      setIsFetchingMore(true);
      setIsSearching(true);

      await AnnieAPI.getSearchResults(queryString)
        .then((animes) => {
          if (animes.length === 0) {
            AlertHelper.infoToast("There are no matches.");
          } else {
            dispatch(setAnimes(animes));
          }
        })
        .catch((e) => {
          AlertHelper.errorToast(e);
        })
        .finally(() => {
          setHasRecommendations(false);
          setIsFetchingMore(false);
          setIsSearching(false);
        });
    }
  };

  useEffect(() => {
    getRecommendations();
  }, [getRecommendations]);

  useEffect(() => {
    if (!hasLoaded && recommendations.length > 0) {
      setHasLoaded(true);
      setHasRecommendations(true);
    }
  }, [hasLoaded, recommendations.length]);

  return (
    <div className="recommendations">
      <div className="title">
        <div className="auto-recommendation-buttons">
          {!hasRecommendations && (
            <span
              className={`recommendation-title ${
                isFetchingMore ? "disabled-button" : ""
              }`}
              onClick={() => {
                if (!isFetchingMore) refreshRecommendations();
              }}
            >
              Get Auto Recommendations
            </span>
          )}
          {hasRecommendations && (
            <div
              className={`load-more ${isFetchingMore ? "disabled-button" : ""}`}
              onClick={() => {
                if (!isFetchingMore) getMore();
              }}
            >
              {isFetchingMore && !isSearching ? <MiniLoader /> : "load more"}
            </div>
          )}
        </div>
        <div className="search-bar">
          <input
            type="text"
            id="search-input"
            onKeyUp={(event) => {
              !event.shiftKey &&
                event.key === "Enter" &&
                !isFetchingMore &&
                getSearch();
            }}
          />
          <span
            className={`search-button ${
              isFetchingMore ? "disabled-button" : ""
            }`}
            onClick={() => {
              if (!isFetchingMore) getSearch();
            }}
          >
            {isSearching ? <MiniLoader /> : "Search"}
          </span>
        </div>
      </div>
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
          </>
        )}
      </div>
    </div>
  );
}

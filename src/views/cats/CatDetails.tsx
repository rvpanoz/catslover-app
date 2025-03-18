import React, { JSX, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useAppContext } from "../../context/AppContext";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router";
import { fetchCatDetails } from "../../api/catsService";
import { createFavourite, fetchFavourites } from "../../api/favoritesService";

interface CatDetailsProps {
  catId: string;
  isFavourite: boolean;
}

const CatDetails: React.FC<CatDetailsProps> = ({
  catId,
  isFavourite,
}): JSX.Element | null => {
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState<boolean>(isFavourite);
  const [imgSrc, setImageSrc] = useState<string>("");
  const [imgLoaded, setImageLoaded] = useState<boolean>(false);

  const {
    loading,
    data: cat,
    error,
    fetchData,
  } = useFetch(() => fetchCatDetails(appState.user.id, catId));

  const {
    loading: favLoading,
    data: favData,
    error: favError,
    fetchData: fetchFavData,
  } = useFetch(() => fetchFavourites(appState.user.id));

  const {
    loading: favAddLoading,
    data: favAddData,
    error: favAddError,
    fetchData: addFavourite,
  } = useFetch(() => createFavourite(appState.user.id, catId));

  const [catBreed] = cat?.breeds ?? [];

  const closeModalAndNavigate = () => {
    const [breed] = cat.breeds;

    appDispatch({
      type: "TOGGLE_MODAL",
      payload: {
        isOpen: false,
        title: "",
        content: null,
      },
    });

    navigate(`/breeds/${breed.id}`);
  };

  useEffect(() => {
    Promise.all([fetchData(), fetchFavData()]);
  }, [catId]);

  useEffect(() => {
    if (!favData || isFavourite) {
      return;
    }

    // check against latest favourites additions
    const isCatFavourite = favData.find((fav: any) => fav.image_id === catId);
    if (isCatFavourite) {
      setFavourite(true);
    }
  }, [favData, catId, isFavourite]);

  useEffect(() => {
    if (!cat) {
      return;
    }

    const img = new Image();
    img.src = cat.url;

    img.onload = () => {
      setImageSrc(cat.url);
      setImageLoaded(true);
    };
  }, [cat]);

  useEffect(() => {
    async function onAfterFavAdded() {
      if (favAddData?.message === "SUCCESS") {
        setFavourite(true);
        fetchFavData();
      }
    }

    onAfterFavAdded();
  }, [favAddData]);

  if (error || favError) {
    return (
      <div className="py-2 sm:py-2">
        <div
          className="w-full rounded-lg bg-danger-100 text-red-100 dark:text-red-400"
          role="alert"
        >
          {error || favError}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <span className="text-gray-800 text-xs font-medium inline-flex">
        Loading image..
      </span>
    );
  }

  return (
    <div className="py-2 sm:py-2">
      {favAddError ? (
        <div className="mt-2 mb-2 text-red-600">{favAddError}</div>
      ) : null}
      <div className="flex flex-col justify-between">
        <div className="mb-4 py-1">
          {favourite ? (
            <span className="text-xs px-1 py-1 font-medium rounded-sm me-2 dark:bg-gray-500 dark:text-white border border-gray-500">
              In favourites
            </span>
          ) : null}
        </div>
        <div className="min-w-0">
          {imgLoaded ? (
            <img
              className="rounded-lg dark:border-0 object-cover rounded-md"
              src={imgSrc}
              alt="cat image"
              data-testid="cat-id"
            />
          ) : null}
        </div>
        {catBreed ? (
          <>
            <p className="mb-1 mt-4 text-gray-900 dark:text-gray-600">
              <a
                onClick={() => closeModalAndNavigate()}
                className="inline-flex items-center text-sm font-medium text-primary-700 hover:text-gray-900 hover:cursor-pointer"
              >
                {catBreed.name}
              </a>
            </p>
            <hr />
            <p className="mt-2 text-gray-900 dark:text-gray-600">
              <span className="text-sm font-medium ">Origin:&nbsp;</span>
              <span className="text-sm font-medium ">
                {catBreed.origin}&nbsp;
              </span>
              <br />
              <span className="text-sm font-medium ">Temperament:&nbsp;</span>
              <span className="text-sm font-medium ">
                {catBreed.temperament}&nbsp;
              </span>
            </p>
          </>
        ) : null}
        <div className="flex mt-4">
          {!favLoading && !favourite ? (
            <Button
              svgIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-heart mr-2"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              }
              label={favAddLoading ? "Loading.." : "Add to favourites"}
              onClick={() => addFavourite()}
              disabled={favAddLoading}
            ></Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CatDetails;

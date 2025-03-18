import React, { useState, useEffect } from "react";
import List from "./List";
import ListItem from "./ListItem";
import { useAppContext } from "../../context/AppContext";
import useFetch from "../../hooks/useFetch";
import { Loader } from "../../components/loader/Loader";
import Confirmation from "../../components/confirmation/Confirmation";
import { fetchFavourites, removeFavourite } from "../../api/favoritesService";
import { Favourite } from "../../types/favouritesTypes";
import { MESSAGES } from "../../constants";

const Favourites: React.FC = (): React.JSX.Element => {
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const [generalError, setGeneralError] = useState<string>("");
  const { loading, data, error, fetchData } = useFetch(() =>
    fetchFavourites(appState.user.id)
  );

  const closeModal = () => {
    appDispatch({
      type: "TOGGLE_MODAL",
      payload: {
        isOpen: false,
        title: "",
        content: null,
      },
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await removeFavourite(appState.user.id, id);
      closeModal();
      fetchData();
    } catch (error) {
      if (error instanceof Error) {
        setGeneralError(error.message);
      } else {
        setGeneralError("Unable to remove favourite. Please try again");
      }
    }
  };

  const openModal = (id: string) => {
    appDispatch({
      type: "TOGGLE_MODAL",
      payload: {
        isOpen: true,
        title: "Corfirmation",
        content: (
          <Confirmation
            onConfirm={() => {
              handleDelete(id);
            }}
            onAbort={closeModal}
            text="This action will remove the selected cat from your favourites. Are you sure?"
          />
        ),
      },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Favourites
      </h3>
      <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      {!loading && !data?.length ? (
        <span className="text-white">{MESSAGES.noData}</span>
      ) : null}

      {error || generalError ? (
        <div
          className="w-full rounded-lg bg-danger-100 px-2 py-4 text-red-100 dark:text-red-400"
          role="alert"
        >
          {error || generalError}
        </div>
      ) : null}
      {loading ? <Loader /> : null}
      <div className="overflow-x-auto mb-4">
        <List>
          {data?.length
            ? data.map((fav: Favourite) => (
                <ListItem
                  key={fav.id}
                  item={fav}
                  onRemove={() => openModal(fav.id)}
                />
              ))
            : null}
        </List>
      </div>
    </>
  );
};

export default Favourites;

import React, {
  useEffect,
  useReducer,
  useRef,
  useMemo,
  JSX,
  useCallback,
} from "react";
import { useNavigate, useParams } from "react-router";
import List from "./List";
import ListItem from "./ListItem";
import CatDetails from "./CatDetails";
import Button from "../../components/button/Button";
import { Loader } from "../../components/loader/Loader";
import { fetchCatsSuccess, nextPage } from "../../state/actions/catActions";
import {
  reducer as catsReducer,
  initialState,
} from "../../state/reducers/catsReducer";
import useFetch from "../../hooks/useFetch";
import { useAppContext } from "../../context/AppContext";
import { Cat } from "../../types/catTypes";
import { fetchCats } from "../../api/catsService";
import { MESSAGES } from "../../constants";

const Cats: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const [state, dispatch] = useReducer(catsReducer, initialState);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data: dataSet,
    loading,
    error,
    fetchData,
  } = useFetch(() => fetchCats(appState.user.id, state.page));

  const favourites = useMemo(() => {
    return state.data
      ?.filter((cat) => Boolean(cat?.favourite))
      .map((fav) => fav.id);
  }, [state.data]);

  const openModal = useCallback(
    (id: string) => {
      navigate(`/cats/${id}`);

      appDispatch({
        type: "TOGGLE_MODAL",
        payload: {
          isOpen: true,
          title: "Cat details",
          content: (
            <CatDetails
              catId={id}
              isFavourite={state.data.some(
                (cat) => cat.id === id && cat.favourite
              )}
            />
          ),
        },
      });
    },
    [appDispatch, navigate, state.data]
  );

  useEffect(() => {
    if (id) {
      openModal(id);
    }
  }, [id, openModal]);

  useEffect(() => {
    fetchData();
  }, [state.page]);

  useEffect(() => {
    if (dataSet?.length) {
      dispatch(fetchCatsSuccess(dataSet));
    }
  }, [dataSet]);

  useEffect(() => {
    if (state.data.length === 0 || !bottomRef.current) {
      return;
    }

    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.data]);

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Cats
      </h3>
      <hr className="my-4 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      {error ? (
        <div
          className="w-full rounded-lg bg-danger-100 px-2 py-4 text-red-100 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      ) : null}
      {loading ? <Loader /> : null}
      <div className="flex flex-col mt-4 items-center">
        <div className="overflow-x-auto mb-4">
          {state.data?.length ? (
            <List>
              {state.data
                .filter((cat: Cat) => Boolean(cat?.url))
                .map((cat: Cat) => {
                  return (
                    <ListItem
                      item={cat}
                      key={cat.id}
                      onClick={() => openModal(cat.id)}
                    />
                  );
                })}
            </List>
          ) : null}
        </div>
        <div ref={bottomRef} />
        <Button
          label={loading ? MESSAGES.loading : MESSAGES.loadMore}
          disabled={loading}
          onClick={() => dispatch(nextPage())}
        ></Button>
      </div>
    </>
  );
};

export default Cats;

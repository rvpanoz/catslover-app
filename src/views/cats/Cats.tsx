import React, {
  useEffect,
  useReducer,
  useRef,
  useMemo,
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

const MemoizedList = React.memo(List);
const MemoizedListItem = React.memo(ListItem);

const Cats: React.FC = (): React.JSX.Element => {
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

  const isFavourite = useMemo(() => {
    const favSet = new Set(
      state.data.filter((cat) => cat.favourite).map((cat) => cat.id)
    );
    return (id: string) => favSet.has(id);
  }, [state.data]);

  const openModal = useCallback(
    (id: string) => {
      const favouriteStatus = isFavourite(id);
      navigate(`/cats/${id}`);

      appDispatch({
        type: "TOGGLE_MODAL",
        payload: {
          isOpen: true,
          title: "Cat details",
          content: <CatDetails catId={id} isFavourite={favouriteStatus} />,
        },
      });
    },
    [appDispatch, navigate, isFavourite]
  );

  const handleItemClick = useCallback(
    (id: string) => () => openModal(id),
    [openModal]
  );

  useEffect(() => {
    if (id) {
      openModal(id);
    }
  }, [id, openModal]);

  useEffect(() => {
    fetchData();
  }, [state.page, appState.user.id]);

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
            <MemoizedList>
              {state.data.map((cat: Cat) => {
                return (
                  <MemoizedListItem
                    item={cat}
                    key={`${cat.id}-${cat.height}-${cat.width}`}
                    onClick={handleItemClick(cat.id)}
                  />
                );
              })}
            </MemoizedList>
          ) : !loading ? (
            <span className="text-white">{MESSAGES.noData}</span>
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

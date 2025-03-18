import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import { useAppContext } from "../../context/AppContext";
import { Loader } from "../../components/loader/Loader";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import BreedDetails from "./BreedDetails";
import { fetchBreeds } from "../../api/breedsService";

const Breeds: React.FC = (): React.JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const { loading, data, error, fetchData } = useFetch(() => fetchBreeds());

  const openModal = (id: string) => {
    navigate(`/breeds/${id}`);
    appDispatch({
      type: "TOGGLE_MODAL",
      payload: {
        isOpen: true,
        title: "Cat images",
        content: <BreedDetails id={id} />,
      },
    });
  };

  useEffect(() => {
    if (id) {
      openModal(id);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Breeds
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
      <div className="flex flex-col mt-4">
        {loading ? (
          <div data-testid="loader">
            <Loader />
          </div>
        ) : null}
        <div className="overflow-x-auto mb-4">
          {data?.length ? (
            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
              <TableHeader />
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {data.map((breed: any) => (
                  <TableRow
                    key={breed.id}
                    breed={breed}
                    onClick={() => openModal(breed.id)}
                  />
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Breeds;

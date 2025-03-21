import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { Breed } from "../../types/catTypes";
import { fetchBreed } from "../../api/breedsService";
import { useAppContext } from "../../context/AppContext";

interface BreedDetailsProps {
  id: string;
}

type Item = {
  url: string;
  id: string;
  breeds: Breed[];
};

const BreedDetails: React.FC<BreedDetailsProps> = ({
  id,
}): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { state: appState, dispatch: appDispatch } = useAppContext();
  const { loading, data, error, fetchData } = useFetch(() =>
    fetchBreed(appState.user.id, id)
  );

  useEffect(() => {
    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="py-2 sm:py-2">
        <div
          className="w-full rounded-lg bg-danger-100 text-red-100 dark:text-red-400"
          role="alert"
        >
          {error}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <span className="text-gray-800 text-xs font-medium inline-flex">
        Loading..
      </span>
    );
  }

  if (!data) {
    return null;
  }

  const [breedDetails] = data[0].breeds ?? [];

  return (
    <div className="py-2 sm:py-2 w-full-auto">
      <div className="grid grid-cols-3 gap-4">
        {data.map((item: Item, idx: number) => (
          <a
            key={item.id}
            onClick={() => navigate(`/cats/${item.id}`)}
            className="hover:cursor-pointer"
          >
            <img
              className="rounded-lg dark:border-2 dark:border-gray-300 h-24 w-24 object-cover drop-shadow-md rounded-md m-auto dark:hover:cursor-pointer"
              src={item.url}
              alt={item.id}
            />
          </a>
        ))}
      </div>
      <div className="mt-4">
        <span className="text-sm font-medium">
          Breed&nbsp;{breedDetails?.name ?? "Unkwown"}
        </span>
        <hr className="mb-3" />
        <span className="text-sm font-medium ">Origin:&nbsp;</span>
        <span className="text-sm font-medium ">
          {breedDetails?.origin ?? "Unkwown"}
        </span>
        <br />
        <span className="text-sm font-medium ">Life span:&nbsp;</span>
        <span className="text-sm font-medium ">
          {breedDetails?.life_span ?? "Unkwown"}&nbsp;years
        </span>

        <div className="mt-4">
          <span className="text-sm font-medium ">Description:&nbsp;</span>
          <span className="text-sm font-medium ">
            {breedDetails?.description ?? "Unkwown"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BreedDetails;

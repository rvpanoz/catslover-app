import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router";
import Layout from "./Layout";
import { useAppContext } from "./context/AppContext";
import Breeds from "./views/breeds/Breeds";
import Cats from "./views/cats/Cats";
import Favourites from "./views/favourites/Favourites";
import Modal from "./components/modal/Modal";
import "./app.css";

const App: React.FC = (): React.JSX.Element => {
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const onModalClose = () => {
    dispatch({
      type: "TOGGLE_MODAL",
      payload: {
        title: "",
        content: null,
        isOpen: false,
      },
    });

    // go back to the list
    const pathSegments = location.pathname.split("/").filter(Boolean);
    if (pathSegments.length > 1) {
      pathSegments.pop();
    }

    navigate(`/${pathSegments.join("/")}`);
  };

  return (
    <div>
      <Layout>
        <div className="p-4 bg-white border border-gray-200 rounded-lg 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <Routes>
            <Route path="/" element={<Cats />} />
            <Route path="/cats/:id?" element={<Cats />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/breeds/:id?" element={<Breeds />} />
          </Routes>
          <Modal
            title={state.modal.title}
            content={state.modal.content}
            isOpen={state.modal.isOpen}
            onClose={() => onModalClose()}
          />
        </div>
      </Layout>
    </div>
  );
};

export default App;

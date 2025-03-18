import React, { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./components/header/Header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const navigate = useNavigate();
  const [sidebarIsHidden, toggleSidebar] = useState<boolean>(true);

  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <Header
        toggleSidebar={() => toggleSidebar(!sidebarIsHidden)}
        title="Catslover"
      />
      <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <aside
          id="sidebar"
          className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-14 font-normal duration-75 lg:flex transition-width ${sidebarIsHidden ? "hidden" : ""}`}
        >
          <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <div className="pt-2 space-y-2">
                <a
                  onClick={() => navigate("/cats")}
                  target="_blank"
                  data-testid="cats"
                  className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-cat"
                  >
                    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
                    <path d="M8 14v.5" />
                    <path d="M16 14v.5" />
                    <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
                  </svg>
                  <span className="ml-3" sidebar-toggle-item="">
                    Cats
                  </span>
                </a>
                <a
                  onClick={() => navigate("/breeds")}
                  target="_blank"
                  className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-layout-grid"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                  <span className="ml-3" sidebar-toggle-item="">
                    Breeds
                  </span>
                </a>
                <a
                  onClick={() => navigate("/favourites")}
                  target="_blank"
                  className="flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span className="ml-3" sidebar-toggle-item="">
                    Favourites
                  </span>
                </a>
              </div>
            </div>
          </div>
        </aside>
        <div
          className={`fixed inset-0 z-0 bg-gray-900/50 dark:bg-gray-900/90 ${sidebarIsHidden ? "hidden" : ""}`}
          id="sidebarBackdrop"
        ></div>
        <div
          id="main-content"
          className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
        >
          <main>
            <div className="px-4 py-4 pt-6">{children}</div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default Layout;

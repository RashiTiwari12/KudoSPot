import { RouterProvider, createBrowserRouter } from "react-router-dom";
import KudoForm from "./KudoForm";
import KudosList from "./KudosList";
import Login from "./Login.jsx";
import KudoAnalytics from "./KudoAnalytics.jsx";

const Home = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/kudosform",
      element: <KudoForm />,
    },
    {
      path: "/kudoslist",
      element: <KudosList />,
    },
    {
      path: "/kudosanalytics",
      element: <KudoAnalytics />,
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default Home;

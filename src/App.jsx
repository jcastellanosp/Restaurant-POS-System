import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Home, Orders, Tables, Menu, Dashboard } from "./pages";
import Header from "./components/shared/Header";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/shared/FullScreenLoader";
import More from "./pages/More";
import { useEffect } from "react";

function Layout() {
  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeaderRoutes = ["/auth"];
  const { isAuth } = useSelector(state => state.user);

  if(isLoading) return <FullScreenLoader />
  
  return (
    <>
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoutes>
                <Home/>
              </ProtectedRoutes>
            }
          /> 
          <Route path="/auth" element={isAuth ? <Navigate to="/" /> : <Auth />} /> 
            <Route
            path="/orders"
            element={
              <ProtectedRoutes>
                <Orders />
              </ProtectedRoutes>
            }
          /> 
          <Route
            path="/tables"
            element={
              <ProtectedRoutes>
                < Tables />
              </ProtectedRoutes>
            }
          /> 
          <Route
            path="/menu"
            element={
              <ProtectedRoutes>
                <Menu />
              </ProtectedRoutes>
           }
         /> 
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
           }
         />
          <Route
            path="/more"
            element={
              <ProtectedRoutes>
                <More />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<div>Not Found</div>} /> 
        </Routes>
    </>
  );
}

function ProtectedRoutes({ children }) {
  const { isAuth } = useSelector((state) => state.user);
  if (!isAuth) {
    return <Navigate to="/auth" />;
  }

  return children;
}

function App() {
  // 🎨 APLICAR TEMA AL MONTAR LA APP
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark"; // Default a dark
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, []);

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
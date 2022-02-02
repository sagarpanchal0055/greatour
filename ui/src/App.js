import React, { useEffect, Suspense } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import LoadingSpinner from "./UI/LoadingSpinner";
import { getCurrentUser } from "./store/currentUserStore/currentUserActions";
import { addBookedTourData } from "./APIs/bookingTourApi";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

const Login = React.lazy(() => import("./components/Login"));
const DetailTours = React.lazy(() => import("./components/DetailTours"));
const Account = React.lazy(() => import("./components/Account"));

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const { userLoading } = useSelector((state) => state.currentUser);
  const { user } = useSelector((state) => state.user);
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const showHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signup");

  const bookingData = {
    tour: searchParams.get("tour"),
    user: searchParams.get("user"),
    price: searchParams.get("price"),
  };

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [user]);

  useEffect(async () => {
    if (bookingData.tour && bookingData.user && bookingData.price) {
      const status = await addBookedTourData(bookingData);
      if (status === "success") {
        navigate("/");
      }
    }
  }, [bookingData]);

  return (
    <>
      <ToastContainer />
      {userLoading ? (
        <div className="loading">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <Suspense
            fallback={
              <div className="loading">
                <LoadingSpinner />
              </div>
            }
          >
            {!showHeaderFooter && <Header />}
            <Routes>
              <Route
                path="/login"
                element={!isLoggedIn ? <Login /> : <Navigate to={"/"} />}
              />
              <Route
                path="/signup"
                element={!isLoggedIn ? <Login /> : <Navigate to={"/"} />}
              />

              <Route path="/" element={<Home />} />
              {isLoggedIn && <Route path="/account" element={<Account />} />}
              {/* <Route path="/tours" element={<Tours />} /> */}
              <Route path="/tours/:slug" element={<DetailTours />} />
              <Route path="/my-bookings" element={<Home />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
            {!showHeaderFooter && <Footer />}
          </Suspense>
        </>
      )}
    </>
  );
}

export default App;

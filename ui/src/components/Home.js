import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getBookingTours } from "../store/bookingStore/bookingTourActions";
import { getTours } from "../store/tourStore/tourActions";
import LoadingSpinner from "../UI/LoadingSpinner";

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { error, tours, toursLoading } = useSelector((state) => state.tours);
  const { bookedTours } = useSelector((state) => state.bookedTour);
  const hasError = error.message.length > 0;
  const bookingPage = location.pathname.includes("my-bookings");
  useEffect(() => {
    if (!bookingPage) {
      dispatch(getTours());
    } else {
      dispatch(getBookingTours());
    }
  }, [dispatch, bookingPage]);

  const showData =
    !bookingPage && tours.data ? tours.data.data : [...bookedTours];

  return (
    <section className="main">
      {toursLoading && !hasError && <LoadingSpinner />}
      {!toursLoading && hasError && <p>{error.message}</p>}
      <div className="card-container">
        {!toursLoading &&
          !hasError &&
          showData.map((tour) => {
            return (
              <div className="card" key={tour.id}>
                <div className="card__header">
                  <div className="card__picture">
                    <div className="card__picture-overlay">&nbsp;</div>
                    <img
                      src={`${process.env.REACT_APP_APP_URL}/img/tours/${tour.imageCover}`}
                      alt={tour.name}
                      className="card__picture-img"
                    />
                  </div>

                  <h3 className="heading-tertirary">
                    <span>{tour.name}</span>
                  </h3>
                </div>

                <div className="card__details">
                  <h4 className="card__sub-heading">
                    {tour.difficulty} {`${tour.duration}-day tour`}
                  </h4>
                  <p className="card__text">{tour.summary}</p>
                  <div className="card__data">
                    <svg className="card__icon">
                      <use xlinkHref="img/icons.svg#icon-map-pin"></use>
                    </svg>
                    <span>{tour.startLocation.description}</span>
                  </div>
                  <div className="card__data">
                    <svg className="card__icon">
                      <use xlinkHref="img/icons.svg#icon-calendar"></use>
                    </svg>
                    <span>
                      {new Date(tour.startDates[0]).toLocaleString("en-us", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="card__data">
                    <svg className="card__icon">
                      <use xlinkHref="img/icons.svg#icon-flag"></use>
                    </svg>
                    <span>{`${tour.locations.length} stops`}</span>
                  </div>
                  <div className="card__data">
                    <svg className="card__icon">
                      <use xlinkHref="img/icons.svg#icon-user"></use>
                    </svg>
                    <span>{`${tour.maxGroupSize} people`}</span>
                  </div>
                </div>

                <div className="card__footer">
                  <p>
                    <span className="card__footer-value">{`$${tour.price} `}</span>
                    <span className="card__footer-text">per person</span>
                  </p>
                  <p className="card__ratings">
                    <span className="card__footer-value">
                      {tour.ratingsAverage}
                    </span>
                    <span className="card__footer-text">
                      rating ({tour.ratingsQuantity})
                    </span>
                  </p>
                  <Link
                    to={`/tours/${tour.slug}`}
                    className="btn btn--green btn--small"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Home;

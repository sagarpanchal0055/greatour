import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTour } from "../store/tourStore/singleTourActions";
import LoadingSpinner from "../UI/LoadingSpinner";
// import Stripe from "stripe";
import axios from "axios";
// import { mapboxgl } from "mapbox-gl/dist/mapbox-gl.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { checkoutSession } from "../APIs/bookingTourApi";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2FnYXIxMTMxIiwiYSI6ImNreXNxem5xajE2Z28yd3B0cmdmc3JsOGEifQ.j1ECeebaQtqJK4Y4k_4GXQ";

function DetailTours() {
  const { error, tour, tourLoading } = useSelector((state) => state.tour);
  const { user: currentUser } = useSelector((state) => state.currentUser);
  const mapContainerRef = useRef();
  const [map, setMap] = useState(null);

  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getTour(slug));
  }, [dispatch, slug]);

  const hasError = error.message.length > 0;
  const tourData = tour?.data?.data;
  const tourName = tourData?.name;

  useEffect(() => {
    if (tourName) {
      document.title = `${tourName} Tour`;

      let maps = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/sagar1131/ckytppx22000i14pdug2egajc",
        scrollZoom: false,
      });

      const bounds = new mapboxgl.LngLatBounds();
      if (maps) {
        tourData.locations.forEach((loc) => {
          new mapboxgl.Marker().setLngLat(loc.coordinates).addTo(maps);

          new mapboxgl.Popup({
            offset: 30,
          })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(maps);

          bounds.extend(loc.coordinates);
        });

        maps.fitBounds(bounds, {
          padding: {
            top: 200,
            bottom: 200,
            left: 100,
            right: 100,
          },
        });

        setMap(maps);
      }
    }
  }, [tourName, mapContainerRef]);

  const bookTour = async () => {
    await checkoutSession(tourData.id);
  };
  return (
    <>
      {tourLoading && !hasError && <LoadingSpinner />}
      {!tourLoading && (hasError || tour?.response?.data.status === "fail") && (
        <h1
          style={{
            height: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {error.message || "Something went wrong!"}
        </h1>
      )}
      {!tourLoading && !hasError && tour.data && (
        <>
          <section className="section-header">
            <div className="header__hero">
              <div className="header__hero-overlay">&nbsp;</div>
              <img
                className="header__hero-img"
                src={`${process.env.REACT_APP_APP_URL}/img/tours/${tourData.imageCover}`}
                alt={tourData.name}
              />
            </div>
            <div className="heading-box">
              <h1 className="heading-primary">
                <span>{tourData.name}</span>
              </h1>
              <div className="heading-box__group">
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-clock"></use>
                  </svg>
                  <span className="heading-box__text">{`${tourData.duration} days`}</span>
                </div>
                <div className="heading-box__detail">
                  <svg className="heading-box__icon">
                    <use xlinkHref="/img/icons.svg#icon-map-pin"></use>
                  </svg>
                  <span className="heading-box__text">
                    {tourData.startLocation.description}
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section className="section-description">
            <div className="overview-box">
              <div>
                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-calendar"></use>
                    </svg>
                    <span className="overview-box__label">Next date</span>
                    <span className="overview-box__text">
                      {new Date(tourData.startDates[0]).toLocaleString(
                        "en-us",
                        {
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
                    </svg>
                    <span className="overview-box__label">Difficulty</span>
                    <span className="overview-box__text">
                      {tourData.difficulty}
                    </span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-user"></use>
                    </svg>
                    <span className="overview-box__label">Participants</span>
                    <span className="overview-box__text">{`${tourData.maxGroupSize} people`}</span>
                  </div>
                  <div className="overview-box__detail">
                    <svg className="overview-box__icon">
                      <use xlinkHref="/img/icons.svg#icon-star"></use>
                    </svg>
                    <span className="overview-box__label">Rating</span>
                    <span className="overview-box__text">{`${tourData.ratingsAverage} / 5`}</span>
                  </div>
                </div>
                <div className="overview-box__group">
                  <h2 className="heading-secondary ma-bt-lg">
                    Your tour guides
                  </h2>
                  {tourData.guides.map((guide) => (
                    <div className="overview-box__detail" key={guide.name}>
                      <img
                        className="overview-box__img"
                        src={`${process.env.REACT_APP_APP_URL}/img/users/${guide.photo}`}
                        alt={guide.name}
                      />
                      <span className="overview-box__label">
                        {guide.role === "lead-guide"
                          ? "Lead Guide"
                          : "Tour Guide"}
                      </span>
                      <span className="overview-box__text">{guide.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="description-box">
              <h2 className="heading-secondary ma-bt-lg">
                About {tourData.name} tour
              </h2>
              {tourData.description.split("\n").map((d, i) => (
                <p className="description__text" key={i}>
                  {d}
                </p>
              ))}
            </div>
          </section>
          <section className="section-pictures">
            {tourData.images.map((image, i) => (
              <div className="picture-box" key={i}>
                <img
                  className={`picture-box__img picture-box__img--${i + 1}`}
                  src={`${process.env.REACT_APP_APP_URL}/img/tours/${image}`}
                  alt={`The Park Camper Tour ${i + 1}`}
                />
              </div>
            ))}
          </section>
          <section className="section-map">
            <div
              ref={mapContainerRef}
              className="map-container"
              id="#map"
            ></div>
          </section>
          <section className="section-reviews">
            <div className="reviews">
              {tourData.reviews.map((review, i) => (
                <div className="reviews__card" key={i}>
                  <div className="reviews__avatar">
                    <img
                      className="reviews__avatar-img"
                      src={`${process.env.REACT_APP_APP_URL}/img/users/${review.user.photo}`}
                      alt={review.user.name}
                    />
                    <h6 className="reviews__user">{review.user.name}</h6>
                  </div>
                  <p className="reviews__text">{review.review}</p>
                  <div className="reviews__rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`reviews__star reviews__star--${
                          review.rating >= star ? "active" : "inactive"
                        }`}
                      >
                        <use xlinkHref="/img/icons.svg#icon-star"></use>
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="section-cta">
            <div className="cta">
              <div className="cta__img cta__img--logo">
                <img
                  src={`${process.env.REACT_APP_APP_URL}/img/logo-white.png`}
                  alt="Natours logo"
                />
              </div>
              <img
                className="cta__img cta__img--1"
                src={`${process.env.REACT_APP_APP_URL}/img/tours/${tourData.images[1]}`}
                alt="Tour Picture"
              />
              <img
                className="cta__img cta__img--2"
                src={`${process.env.REACT_APP_APP_URL}/img/tours/${tourData.images[2]}`}
                alt="Tour Picture"
              />
            </div>

            <div className="cta__content">
              <h2 className="heading-secondary">What are you waiting for?</h2>
              <p className="cta__text">
                {tourData.duration} days. 1 adventure. Infinite memories. Make
                it yours today!
              </p>
              {currentUser.name ? (
                <button
                  className="btn btn--green span-all-rows"
                  onClick={bookTour}
                >
                  Book tour now!
                </button>
              ) : (
                <Link to="/login" className="btn btn--green span-all-rows">
                  Login to book tour!
                </Link>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default DetailTours;

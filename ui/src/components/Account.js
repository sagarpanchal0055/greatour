import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountSetting from "./AccountSetting";
import UpdatePassword from "./UpdatePassword";

const SETTINGS_HTML = [
  { link: "#", text: "Settings", icon: "settings", active: true },
  {
    link: "/my-bookings",
    text: "My bookings",
    icon: "briefcase",
    active: false,
  },
  { link: "#", text: "My reviews", icon: "star", active: false },
  { link: "#", text: "Billing", icon: "credit-card", active: false },
];

const ADMIN_SETTINGS_HTML = [
  { link: "#", text: "Manage tours", icon: "map", active: false },
  { link: "#", text: "Manage users", icon: "users", active: false },
  { link: "#", text: "Manage reviews", icon: "star", active: false },
  { link: "#", text: "Manage bookings", icon: "briefcase", active: false },
];
function Account() {
  const { user: currentUser } = useSelector((state) => state.currentUser);

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            {SETTINGS_HTML.map((el, i) => (
              <li className={el.active ? "side-nav--active" : ""} key={i}>
                <Link to={el.link}>
                  <svg>
                    <use xlinkHref={`img/icons.svg#icon-${el.icon}`}></use>
                  </svg>
                  {el.text}
                </Link>
              </li>
            ))}
          </ul>
          {currentUser.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                {ADMIN_SETTINGS_HTML.map((el, i) => (
                  <li className={el.active ? "side-nav--active" : ""} key={i}>
                    <Link to={el.link}>
                      <svg>
                        <use xlinkHref={`img/icons.svg#icon-${el.icon}`}></use>
                      </svg>
                      {el.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
        <div className="user-view__content">
          <AccountSetting />
          <div className="line">&nbsp;</div>
          <UpdatePassword />
        </div>
      </div>
    </main>
  );
}

export default Account;

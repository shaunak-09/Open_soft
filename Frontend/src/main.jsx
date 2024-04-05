import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./media.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./AppStore/index.js";

import HeroSection from "./components/herosection.jsx";
import Plans from "./components/AddToFavourite.jsx/plans.jsx";
import AddToFavourite from "./components/AddToFavourite.jsx/addToFavourite.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import MySpace from "./components/AddToFavourite.jsx/mySpace.jsx";
import SearchPage from "./components/searchPage.jsx";
import MoviePlayback from "./MoviePlayback/MoviePlayback.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
// import MoviePlayback from './MoviePlayback.jsx/MoviePlayback.jsx'
import Success from "./components/sucess.jsx";
// import MoviePlayback from './MoviePlayback.jsx/MoviePlayback.jsx'

import Home from "./admin/Home.jsx";
import HomeRev from "./admin/HomeRev.jsx";
import HomeSubs from "./admin/HomeSubs.jsx";
import HomeMovie from "./admin/HomeMovie.jsx";

// Admin Imports
// import Home from "./admin/Home.jsx";
// import Banners from "./admin/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HeroSection />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="plans" element={<Plans />} />
      <Route path="AddToFavourite" element={<AddToFavourite />} />
      <Route path="/profile" element={<MySpace />} />
      <Route path="searchPage" element={<SearchPage />} />
      <Route path=":movie_id" element={<MoviePlayback />} />
      <Route path="/admin" element={<Home />} />
      <Route path="/adminMovie" element={<HomeMovie />} />
      <Route path="/adminreview" element={<HomeRev />} />
      <Route path="/adminSubscription" element={<HomeSubs />} />
      <Route path="/video" element={<VideoPlayer />} />
      <Route path="/success/:amt" element={<Success />} />

      {/* Admin Routes */}

      {/* <Route path="/admin"  element={<Home/>}/> */}
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

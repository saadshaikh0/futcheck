import React from "react";
import Header from "./components/common/Header";
import store from "./redux/store";
import { Provider } from "react-redux";
import Footer from "./components/common/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage";
import PlayerViewWrapper from "./components/playerViewWrapper";
import ReactGA from "react-ga4";
import Ads from "./components/common/Ads";
import Tos from "./components/tos";
import Policy from "./components/policy";
import ErrorBoundary from "./ErrorBoundary";
import AllPlayersWrapper from "./components/allPlayersWrapper";
import Combinations from "./components/getCombinations";
import { Helmet } from "react-helmet";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SquadBuilderWrapper from "./components/squadBuilderWrapper";
import ClubWrapper from "./components/clubWrapper";
import SbcWrapper from "./components/SbcWrapper";
import SbcViewWrapper from "./components/sbcViewWrapper";
import PlayerDashboardWrapper from "./components/playerDashboardWrapper";
import NewHomePage from "./components/NewHomePage";
import ChallengeSolutions from "./components/sbc/ChallengeSolution";

ReactGA.initialize("G-RD6LGLC1LD");

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Discover the latest EAFC 24 players along with their up-to-date stats and prices on our website"
        />
      </Helmet>
      <ErrorBoundary>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="55917895097-n505fctm2fkegjjfc66bhcrq4vtsvol3.apps.googleusercontent.com">
            <QueryClientProvider client={queryClient}>
              <div className="App scrollbar-thin">
                <Router>
                  <Header />
                  {/* <Ads adClient="ca-pub-4560319877250034" adSlot="1044013921" /> */}
                  <Routes>
                    {/* <Route exact path="/" element={<HomePage />} /> */}
                    <Route exact path="/" element={<NewHomePage />} />
                    {/* <Route
                      exact
                      path="/new_homepage"
                      element={<NewHomePage />}
                    /> */}
                    <Route path="/tos" element={<Tos />} />
                    <Route path="/policy" element={<Policy />} />
                    <Route
                      path="/fc_combinations/"
                      element={<Combinations />}
                    />
                    <Route
                      path="/squad-builder/"
                      element={<SquadBuilderWrapper />}
                    />
                    <Route path="/my-club/" element={<ClubWrapper />} />
                    <Route
                      path="/challenge-solution/:challengeId/:solutionId"
                      element={<ChallengeSolutions />}
                    />
                    <Route path="/sbc/:sbcId" element={<SbcViewWrapper />} />
                    <Route path="/sbc/" element={<SbcWrapper />} />

                    <Route
                      path="/player/:playerId/:playerName"
                      element={<PlayerDashboardWrapper />}
                    />
                    <Route path="/players" element={<AllPlayersWrapper />} />
                  </Routes>

                  <Footer />
                </Router>
              </div>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;

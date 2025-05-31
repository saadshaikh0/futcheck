import React from "react";
import Header from "./components/common/Header";
import store from "./redux/store";
import { Provider } from "react-redux";
import Footer from "./components/common/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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
import SquadWizardWrapper from "./components/squadWizardWrapper";
import EvolutionsWrapper from "./components/EvolutionsWrapper";
import EvolutionDetailWrapper from "./components/EvolutionDetailWrapper";
import MarketWrapper from "./components/MarketWrapper";
import GamesWrapper from "./components/GamesWrapper";
import StatClash from "./components/games/StatClash";
import ProtectedRoute from "./components/ProtectedRoute";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactGA.initialize("G-RD6LGLC1LD");

const queryClient = new QueryClient();

function App() {
  const location = useLocation();

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Discover the latest EAFC 25 players along with their up-to-date stats and prices on our website"
        />
      </Helmet>
      <ErrorBoundary>
        <Provider store={store}>
          <GoogleOAuthProvider clientId="55917895097-n505fctm2fkegjjfc66bhcrq4vtsvol3.apps.googleusercontent.com">
            <QueryClientProvider client={queryClient}>
              <div className="App scrollbar-thin">
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
                  <Route path="/market" element={<MarketWrapper />} />
                  <Route path="/tos" element={<Tos />} />
                  <Route path="/evolutions" element={<EvolutionsWrapper />} />
                  <Route
                    path="/evolution/:evolutionId"
                    element={<EvolutionDetailWrapper />}
                  />

                  <Route path="/policy" element={<Policy />} />
                  <Route path="/fc_combinations/" element={<Combinations />} />
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
                    path="/squad_wizard/"
                    element={
                      <ProtectedRoute>
                        <SquadWizardWrapper />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/games/" element={<GamesWrapper />} />
                  <Route path="/stat_clash/" element={<StatClash />} />
                  <Route
                    path="/player/:playerId/:playerName"
                    element={<PlayerDashboardWrapper />}
                  />
                  <Route path="/players" element={<AllPlayersWrapper />} />
                </Routes>
                {location.pathname !== "/" && <Footer />}
              </div>
            </QueryClientProvider>
          </GoogleOAuthProvider>
        </Provider>
      </ErrorBoundary>
    </>
  );
}
const Root = () => (
  <PayPalScriptProvider
    options={{
      "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID || "test",
      currency: "USD",
      components: "buttons",
      "enable-funding": "card,venmo", // Optional: if you want card support too
      "data-sdk-integration-source": "developer-studio",
    }}
  >
    <Router>
      <App />
    </Router>
  </PayPalScriptProvider>
);

export default Root;

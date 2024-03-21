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
ReactGA.initialize("G-RD6LGLC1LD");

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route
                path="/player/:playerId/:playerName"
                element={<PlayerViewWrapper />}
              />
            </Routes>
            <Footer />
          </Router>
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

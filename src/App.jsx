import React from "react";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import store from "./redux/store";
import { Provider } from "react-redux";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Home />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;

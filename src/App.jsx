import React from "react";
import Home from "./pages/Home";
import Header from "./components/common/Header";
import store from "./redux/store";
import { Provider } from "react-redux";
import Footer from "./components/common/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Header />
          <Home />
          <Footer />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

import React from "react";
import Home from "./pages/Home";
import Protected from "./pages/Protected";
import Login from "./pages/Login";
import Header from "./components/common/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginModal from "./components/LoginModal";
import store from "./redux/store";
import { Provider } from "react-redux";
import Footer from "./components/common/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <LoginModal />
            <div className="App">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/protected"
                  element={
                    <ProtectedRoute>
                      <Protected />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

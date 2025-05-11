import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import { AuthProvider } from "./features/auth/AuthContext";

function App() {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;

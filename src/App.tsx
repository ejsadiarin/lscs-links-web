import { Layout } from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <>
      <CookiesProvider>
        <GoogleOAuthProvider clientId="742104294908-maet14jq2ohqpl0uu0ma4qpllc30t0k5.apps.googleusercontent.com">
          <Router>
            <Layout></Layout>
            <Toaster />
          </Router>
        </GoogleOAuthProvider>
      </CookiesProvider>
    </>
  );
};

export default App;

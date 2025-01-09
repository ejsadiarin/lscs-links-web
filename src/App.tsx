import { Layout } from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  // const clientID = process.env.REACT_APP_CLIENT_ID as string;

  return (
    <>
      <CookiesProvider>
        <GoogleOAuthProvider clientId="631323246333-l06jvts5smd7u24e2egdifn05qaqbodu.apps.googleusercontent.com">
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

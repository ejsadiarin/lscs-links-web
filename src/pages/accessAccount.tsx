import { Button } from "@/components/ui/button";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AccessAccount = () => {
  const [user, setUser] = useState([]);
  const [, setCurrentUser] = useCookies(["currentUser"]);
  const [currentToken, setCurrentToken] = useCookies(["currentToken"]);

  const LogIn = useGoogleLogin({
    onSuccess: (codeResponse: any) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const getLogIn = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const postLogIn = async (email: string) => {
        try {
          const response = await axios.post(
            "/auth/check-email",
            { email: email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.data.success == "Email is an LSCS member") {
            console.log(user.access_token);
            setCurrentUser("currentUser", email, { path: "/" });
            setCurrentToken("currentToken", user.access_token, { path: "/" });
            setTimeout(() => {
              console.log("Redirecting to home page");
              window.location.replace("/");
            }, 200);
          }
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      };
      postLogIn(response.data.email);
    };
    if (user) {
      getLogIn();
    }
  }, [user]);

  return (
    <>
      <div className="min-h-screen bg-[#000000] text-white px-28 py-8">
        <div className="flex flex-col items-center justify-center my-20">
          <div className="bg-[#030711] border-2 border-[#1D283A] rounded-lg px-12 py-8 flex flex-col items-center justify-center space-y-5">
            <p className="font-bold text-2xl">LSCS Link Shortener</p>
            <Button variant="outline" onClick={LogIn} className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <p className="flex items-center text-md ml-2">
                Log In Using Gmail
              </p>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

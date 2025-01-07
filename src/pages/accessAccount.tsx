import { GoogleLogIn } from "@/components/GoogleLogIn/GoogleLogIn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const AccessAccount = () => {
  const navigate = useNavigate();
  const [currentToken, ,] = useCookies(["currentToken"]);

  useEffect(() => {
    if (currentToken) {
      navigate("/", { replace: true });
    } else {
      navigate("/accessAccount", { replace: true });
    }
  }, [currentToken, navigate]);

  return (
    <>
      <div className="min-h-screen bg-[#000000] text-white px-28 py-8">
        <div className="flex flex-col items-center justify-center my-20">
          <div className="bg-[#030711] border-2 border-[#1D283A] rounded-lg px-12 py-8 flex flex-col items-center justify-center space-y-5">
            <p className="font-bold text-2xl">LSCS Link Shortener</p>
            <span className="text-black">
              <GoogleLogIn></GoogleLogIn>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

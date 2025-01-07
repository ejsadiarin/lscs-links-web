import { GoogleLogIn } from "@/components/GoogleLogIn/GoogleLogIn";
import { useCookies } from "react-cookie";

export const AccessAccount = () => {
  //check if there is current token
  const [currentToken, ,] = useCookies(["currentToken"]);
  if ("currentToken" in currentToken) window.location.replace("/");

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

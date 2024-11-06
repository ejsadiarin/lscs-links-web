import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import axios from "axios";

export const AccessAccount = () => {
  const onLogIn = () => {
    let currentUrl = window.location.href;

    window.location.replace(
      `https://auth.app.dlsu-lscs.org/authenticate?provider=google&redirectUrl=${encodeURIComponent(
        currentUrl
      )}`
    );
  };
  return (
    <>
      <div className="min-h-screen bg-[#000000] text-white px-28 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          <Card className="space-y-8 bg-[#030711] border-2 border-[#1D283A] rounded-lg px-8 py-6 flex flex-col justify-center items-center">
            <CardHeader>
              <CardTitle className="text-white font-bold text-2xl">
                LSCS Link Shortener
              </CardTitle>
              <CardContent className="flex justify-center">
                <Button variant="outline" onClick={onLogIn}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                  Log In Using DLSU Email
                </Button>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

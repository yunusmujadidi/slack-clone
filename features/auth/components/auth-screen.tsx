"use client";

import { useState } from "react";

import { SignInCard } from "./signin-card";
import { SignUpCard } from "./signup-card";
import { SignInFlow } from "@/lib/type";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("sign-in");

  return (
    // container
    <>
      <div className="flex items-center justify-center w-full h-screen bg-[#5C3B58]">
        <div className="md:h-auto md:w-[420px]">
          {state === "sign-in" ? (
            <SignInCard setState={setState} />
          ) : (
            <SignUpCard setState={setState} />
          )}
        </div>
      </div>
    </>
  );
};

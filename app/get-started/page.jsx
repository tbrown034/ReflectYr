import React from "react";
import SignInAndOut from "../UI/components/SignInAndOut";

const getStarted = () => {
  return (
    <div>
      <h1>Get Started</h1>
      <p>Let's get started with your lists!</p>
      <div>
        <SignInAndOut />
      </div>
      <p>Or get started without registering!</p>
    </div>
  );
};

export default getStarted;

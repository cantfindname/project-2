import { useState } from "react";
import "./App.css";
import Question from "./components/Question";
import Banner from "./components/Banner";

function App() {
  return (
    <div>
      <Banner></Banner>
      <Question></Question>
    </div>
  );
}

export default App;

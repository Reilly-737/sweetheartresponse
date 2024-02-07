import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import VDayQuestion from "./components/VDayQuestion";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VDayQuestion />} />
      </Routes>
    </Router>
  );
 }
export default App;

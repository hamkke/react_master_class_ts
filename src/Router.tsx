import { Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Coins />} />
      <Route path=":coinId" element={<Coin />}>
        <Route path="chart" element={<Chart />} />
        <Route path="price" element={<Price />} />
      </Route>
    </Routes>
  );
};

export default Router;

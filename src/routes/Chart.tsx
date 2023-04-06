import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";
import { IHistorical } from "../coin";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isGreenAtom } from "atom";

const Wrap = styled.div`
  .apexcharts-tooltip {
    color: black;
  }
`;
interface IRouteState {
  state: string;
}

const Chart = () => {
  const isGreen = useRecoilValue(isGreenAtom);
  const { state: coinId } = useLocation() as IRouteState;
  const { data, isLoading } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  if (isLoading) return <>LOADING</>;
  if (data && !("error" in data)) {
    return (
      <Wrap>
        <ReactApexChart
          type="candlestick"
          series={
            [
              {
                data:
                  data &&
                  data?.map((price) => {
                    return {
                      x: price.time_close,
                      y: [price.open, price.high, price.low, price.close],
                    };
                  }),
              },
            ] as any
          }
          options={{
            tooltip: {
              y: {
                formatter: (value) => `$${Number(value.toFixed(3))}`,
              },
            },
            theme: { mode: isGreen ? "dark" : "light" },
            chart: {
              height: 500,
              toolbar: {
                show: false,
              },
            },
            yaxis: { show: false },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "MMM 'yy",
                },
              },
              axisTicks: { show: false },
              categories: data?.map(
                (price) => new Date(price.time_close * 1000)
              ),
            },
            colors: ["blue"],
            fill: {
              type: "gradient",
              gradient: {
                type: "horizontal",
                gradientToColors: ["#F196DD"],
                stops: [0, 100],
              },
            },
          }}
        />
        <hr />
        <ReactApexChart
          type="line"
          series={[
            {
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            theme: { mode: isGreen ? "dark" : "light" },
            chart: {
              width: 500,
              height: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            stroke: {
              curve: "straight",
              width: 5,
            },
            fill: {
              type: "gradient",
              gradient: {
                type: "horizontal",
                gradientToColors: ["#F196DD"],
                stops: [0, 100],
              },
            },
            colors: ["#ff006a"],
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "MMM 'yy",
                },
              },
              axisTicks: { show: false },
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
            },
            yaxis: { show: false },
            tooltip: {
              y: {
                formatter: (value) => `$${value}`,
              },
            },
          }}
        />
      </Wrap>
    );
  } else {
    return <>ERROR</>;
  }
};

export default Chart;

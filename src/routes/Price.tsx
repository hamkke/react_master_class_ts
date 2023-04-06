import { useQuery } from "@tanstack/react-query";
import { fetchCoinTickers } from "api";
import { IPriceData } from "coin";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 5px solid ${(props) => props.theme.accentColor};
  font-size: 25px;
  font-weight: bold;
`;

const Title = styled.div`
  margin-right: 5px;
`;
const Value = styled.p<{ isUpper?: boolean }>`
  maring: 0;
  color: ${(props) => (props.isUpper ? "#ff0000" : "#333")};
`;

interface IRouteState {
  state: string;
}
const Price = () => {
  const { state: coinId } = useLocation() as IRouteState;
  const { isLoading, data } = useQuery<IPriceData>(["tickers", coinId], () =>
    fetchCoinTickers(`${coinId}`)
  );
  return (
    <>
      <Wrap>
        {isLoading ? (
          "LOADING"
        ) : (
          <>
            <Box>
              <Title>Price : </Title>
              <Value>{data?.quotes.USD.price}</Value>
            </Box>
            <Box>
              <Title>1시간 전 : </Title>
              <Value isUpper={data && data.quotes.USD.percent_change_1h > 0}>
                {data?.quotes.USD.percent_change_1h}%
              </Value>
            </Box>
            <Box>
              <Title>6시간 전 : </Title>
              <Value isUpper={data && data.quotes.USD.percent_change_6h > 0}>
                {data?.quotes.USD.percent_change_6h}%
              </Value>
            </Box>
            <Box>
              <Title>12시간 전 : </Title>
              <Value isUpper={data && data.quotes.USD.percent_change_12h > 0}>
                {data?.quotes.USD.percent_change_12h}%
              </Value>
            </Box>
            <Box>
              <Title>24시간 전 : </Title>
              <Value isUpper={data && data.quotes.USD.percent_change_24h > 0}>
                {data?.quotes.USD.percent_change_24h}%
              </Value>
            </Box>
            <Box>
              <Title>7일 전 : </Title>
              <Value isUpper={data && data.quotes.USD.percent_change_7d > 0}>
                {data?.quotes.USD.percent_change_7d}%
              </Value>
            </Box>
            <Box>
              <Title>30일 전 : </Title>
              <Value isUpper={data && data.quotes.USD.percent_change_30d > 0}>
                {data?.quotes.USD.percent_change_30d}%
              </Value>
            </Box>
          </>
        )}
      </Wrap>
    </>
  );
};

export default Price;

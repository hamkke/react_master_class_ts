import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  useLocation,
  Outlet,
  Link,
  useMatch,
  useNavigate,
} from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { IInfoData, IPriceData } from "../coin";
import { Helmet } from "react-helmet";
import Button from "Button";
import { useSetRecoilState } from "recoil";
import { isGreenAtom } from "atom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14vh;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
`;
const CoinName = styled.h2`
  margin-bottom: -4px;
  color: ${(props) => props.theme.accentColor};
  font-size: 30px;
  font-weight: bold;
`;
const Description = styled.p`
  padding: 10px;
  font-size: 30px;

  border: 5px solid ${(props) => props.theme.accentColor};
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.textColor};
  padding: 7px 0px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  font-size: 20px;
  font-weight: bold;
  a {
    display: block;
  }
`;

const GoToHome = styled.button`
  position: absolute;
  left: -60px;
  width: 60px;
  height: 60px;
  font-size: 40px;
  background-color: transparent;
  border: none;
  border-radius: 50px;
  &:hover {
    background-color: ${(props) => props.theme.textColor};
  }
`;

interface IRouteState {
  state: {
    id: string;
    name: string;
  };
}

const Coin = () => {
  const setGreenAtom = useSetRecoilState(isGreenAtom);
  const toggleGreenAtom = () => setGreenAtom((current) => !current);
  const { coinId } = useParams();
  const { state } = useLocation() as IRouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const navigate = useNavigate();

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(`${coinId}`),
    {
      refetchInterval: 5000,
    }
  );
  const { isLoading: tickersLoading } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(`${coinId}`)
  );

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.id ? state.id : loading ? "LOADING" : infoData?.id}
        </title>
      </Helmet>
      <Header>
        <GoToHome
          onClick={() => {
            navigate("/");
          }}
        >
          👈🏻
        </GoToHome>
        <Title>
          {state?.id ? state.id : loading ? "LOADING" : infoData?.id}
        </Title>
        <Button onClick={toggleGreenAtom} />
      </Header>
      <CoinName>{infoData?.id}</CoinName>
      <Description>
        {infoData?.description
          ? infoData?.description
          : loading
          ? "LODING"
          : "설명 없음"}
      </Description>
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`} state={`${coinId}`}>
            Chart
          </Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`} state={`${coinId}`}>
            Price
          </Link>
        </Tab>
      </Tabs>

      <Outlet />
    </Container>
  );
};

export default Coin;

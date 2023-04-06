import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api";
import styled from "styled-components";
import { ICoinObj } from "../coin";
import noimage from "../noimage.png";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isGreenAtom } from "atom";

import Button from "Button";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ConinList = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Coin = styled.li`
  border: 5px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    font-size: 30px;
    font-weight: bold;
  }
  &:hover {
    a {
      transition: color 0.3s;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 48px;
`;

const Img = styled.img`
  margin-right: 10px;
  width: 35px;
  height: 35px;
`;

const Descript = styled.h2`
  margin: 0 auto;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const Coins = () => {
  const { isLoading, data } = useQuery<ICoinObj[]>(["allCoin"], fetchCoins, {
    select: (data) => data.slice(0, 100),
  });
  const setGreenAtom = useSetRecoilState(isGreenAtom);
  const toggleGreenAtom = () => setGreenAtom((current) => !current);
  return (
    <Container>
      <Helmet>
        <title>COIN</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <Button onClick={toggleGreenAtom} />
      </Header>
      {isLoading ? (
        "LOADING"
      ) : (
        <ConinList>
          <Descript>🐸 다크모드 대신 그린모드로 만들었습니다 🐸</Descript>
          {data?.map((a) => {
            return (
              <Coin key={a.id}>
                <Link to={`${a.id}`} state={a}>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${a.id.toLowerCase()}.png`}
                    alt={`${a.id}`}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `${noimage}`;
                    }}
                  />
                  {a.name} →
                </Link>
              </Coin>
            );
          })}
        </ConinList>
      )}
    </Container>
  );
};

export default Coins;

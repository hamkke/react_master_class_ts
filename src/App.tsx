import Router from "./Router";
import { useRecoilValue } from "recoil";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import { greenTheme, whiteTheme } from "./theme";
import { isGreenAtom } from "./atom";

const App = () => {
  const isGreen = useRecoilValue(isGreenAtom);
  return (
    <>
      <ThemeProvider theme={isGreen ? greenTheme : whiteTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;

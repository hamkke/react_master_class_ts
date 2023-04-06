import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'PyeongChangPeace';
    font-weight: 300;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Light.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Light.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Light.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Light.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Light.ttf') format("truetype");
    font-display: swap;
} 
@font-face {
    font-family: 'PyeongChangPeace';
    font-weight: 700;
    font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Bold.eot');
    src: url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Bold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Bold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Bold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/PyeongChang/PyeongChangPeace-Bold.ttf') format("truetype");
    font-display: swap;
} 
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
  display: none;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  line-height: 1;
  font-family: 'PyeongChangPeace';
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}

}
a {
  text-decoration: none;
  color:inherit;
}
`;

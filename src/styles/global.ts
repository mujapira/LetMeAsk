import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text}
}

body,
input,
button,
textarea {
    font-family: "roboto", sans-serif;
    font-weight: 400;
    font-size: 62.5%;
}
`
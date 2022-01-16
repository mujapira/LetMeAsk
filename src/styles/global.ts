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
textarea,
main {
    font-family: "roboto", sans-serif;
    font-weight: 400;
    font-size: 62.5%;
    color:${props => props.theme.colors.text}
}

header .content {
  border-bottom:1px solid ${props => props.theme.colors.user_info};
  padding: 10px;
}

.user-info span{
  color:${props => props.theme.colors.user_info}
}
.room-title {
  color:${props => props.theme.colors.user_info}
}
.question {
  background:${props => props.theme.colors.background_text_box};
  color:${props => props.theme.colors.user_info};
}

.question p {
  color:${props => props.theme.colors.user_info};
}
main form textarea {
  background:${props => props.theme.colors.background_text_box} ;
  color:${props => props.theme.colors.user_info};
}

.button {
  color:${props => props.theme.colors.user_info};
}

.room-code{
  background:${props => props.theme.colors.background_text_box} ;
  color:${props => props.theme.colors.user_info};
}

.content .button{
  background:${props => props.theme.colors.background_text_box} ;
  color:${props => props.theme.colors.user_info};
}

.question-list .question {
  background:${props => props.theme.colors.background_text_box} ;
  color:${props => props.theme.colors.user_info};
}

.question-list .teste .question-answer{
  background:${props => props.theme.colors.background_text_box} ;
  color:${props => props.theme.colors.user_info};
}
`
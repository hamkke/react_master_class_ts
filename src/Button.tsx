import styled from "styled-components";

const Btn = styled.button`
  margin-left: 10px;
  padding: 5px 5px;
  background-color: transparent;
  border: 5px solid ${(props) => props.theme.accentColor};
  &:hover {
    background-color: #5836c1;
  }
  color: ${(props) => props.theme.textColor};
`;

interface IText {
  onClick?: () => void;
}

const Button = ({ onClick }: IText) => {
  return <Btn onClick={onClick}>Toggle Theme</Btn>;
};

export default Button;

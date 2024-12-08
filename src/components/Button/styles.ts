import styled from 'styled-components';

const Button = styled.button<{
  color: string;
}>`
  width: 100%;
  height: 66px;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
`;

export default {
  Button,
};

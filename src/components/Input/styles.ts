import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid #bebebe;
`;

const Icon = styled.div`
  width: 35px;
  height: 35px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  flex: 1;
  font-weight: 400;
  font-size: 16px;
  color: #0a3063;
`;

export default {
  Container,
  Icon,
  Input,
};

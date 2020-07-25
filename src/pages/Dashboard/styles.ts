import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const CardsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 0;
  background: #f0f0f5;
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`;

export const Header = styled.header`
  display: flex;
`;

export const Nav = styled.nav`
  flex: 1;
`;

export const Form = styled(Unform)`
  display: flex;
`;

export const Title = styled.h1`
  color: #000;
  margin: 15px;
  padding: 10px;
`;

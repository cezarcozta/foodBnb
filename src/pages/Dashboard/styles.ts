import styled from 'styled-components';

export const FoodsContainer = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 5px 0;
  background: #FFF;
  display: grid;


  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`;

export const Title = styled.h1`
  color: #000;
  margin: 15px;
  padding: 10px;
`;
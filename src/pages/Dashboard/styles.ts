import styled from 'styled-components';

export const FoodsContainer = styled.div`
  width: 100%100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;

  display: grid;

  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`;
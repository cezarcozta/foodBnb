import styled from 'styled-components';

import { Form as Unform } from '@unform/web';

export const Form = styled(Unform)`
  padding: 18px 10px;
  display: flex;
`;

export const Container = styled.div`
  background: #ffffff;
  padding: 30px 0;
  border-bottom: 2px solid #ffb84d;
  color: #ff9900;

  header {
    width: 1280px;
    margin: 0 auto;

    nav {
      display: flex;
      align-items: center;
      justify-content: center;

      form {
        display: flex;
        align-items: center;
        font-weight: bold;

        label {
          padding: 15px;
        }

        select,
        input {
          border: 1px solid #ffb84d;
          background: #fff;
          height: 35px;

          ::placeholder {
            color: #ffb84d;
            text-align: center;
          }
        }

        button {
          font-weight: 600;
          border-radius: 8px;
          width: 100px;
          height: 50px;
          border: 0;
          color: #fff;
          background: #ffb84d;
          margin-left: 10px;

          display: flex;
          justify-content: center;
          align-self: center;
        }
      }

      button {
        font-weight: 600;
        border-radius: 8px;
        width: 100px;
        height: 50px;
        border: 0;
        color: #fff;
        background: #41c900;
        margin-left: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

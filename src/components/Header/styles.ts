import styled from 'styled-components';

export const Container = styled.div`
  background: #ffffff;
  padding: 30px 0;
  border-bottom: 1px solid #000;
  color: #000;

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
          padding: 5px;

          select {
            margin-left: 10px;
            margin-right: 25px;
          }

          input {
            margin-left: 10px;
          }
        }

        button {
          font-weight: 600;
          border-radius: 8px;
          width: 100px;
          height: 50px;
          border: 0;
          color: #fff;
          background: #ff9900;
          margin-left: 10px;

          display: flex;
          justify-content: center;
          align-items: center;
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

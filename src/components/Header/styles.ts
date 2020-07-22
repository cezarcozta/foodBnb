import styled from 'styled-components';

export const Container = styled.div`
  background: #FFFFFF;
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
        label {
          select {
            margin-right: 25px;
          }
        }
      }

      button {
        font-weight: 600;
        border-radius: 8px;
        border: 0;
        background: #ff9900;
        color: #fff;
        margin-left: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
      
        div {
          .text {
            padding: 16px 24px;
          }
          
          .icon {
            display: flex;
            padding: 16px 16px;
            background: #41c900;
            border-radius: 0 8px 8px 0;
            margin: 0 auto;
          }
        }
      }
    }
  }
`;
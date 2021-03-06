import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: 8px;

  header {
    background: #ffb84d;
    border-radius: 8px 8px 0px 0px;
    transition: 0.3s opacity;

    display: flex;
    justify-content: center;

    img {
      width: 405px;
      height: 202px;
      pointer-events: none;
      user-select: none;
    }
  }

  section.body {
    padding: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    h2 {
      color: #000;
      font-weight: 600;
    }

    h4 {
      color: #b3b3b3;
      font-weight: bold;
    }

    .price {
      font-style: normal;
      font-size: 24px;
      line-height: 34px;
      color: #ffb84d;

      b {
        font-weight: 600;
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 20px 30px;
    background: #ffb84d;
    border-radius: 0px 0px 8px 8px;

    div.icon-container {
      display: flex;

      button {
        background: #fff;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #ff9900;
        }

        & + button {
          margin-left: 6px;
        }
      }
    }

    div.availability-container {
      display: flex;
      align-items: center;

      p {
        color: #3d3d4d;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 88px;
        height: 32px;
        margin-left: 12px;

        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 16px;

          &:before {
            position: absolute;
            content: '';
            height: 20px;
            width: 40px;
            left: 8px;
            bottom: 6px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 10px;
          }
        }

        input:checked + .slider {
          background-color: #39b100;
        }

        input:focus + .slider {
          box-shadow: 0 0 1px #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(32px);
          -ms-transform: translateX(32px);
          transform: translateX(32px);
        }
      }
    }
  }
`;

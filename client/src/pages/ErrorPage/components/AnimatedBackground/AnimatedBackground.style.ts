import styled, { keyframes } from "styled-components";
import questionMarkImage from "../../../../assets/icons/questionmark.svg";

const scrollAnimation = keyframes`
    0% {
        transform: translateX(0);
    }
    100% {  
        transform: translateX(100%);
    }
`;


export const QuestionBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000;
  z-index: -1;
`;

export const QuestionMarks = styled.div`
  position: absolute;
  top: 0;
  animation: ${scrollAnimation} 60s linear infinite;
  width: 100%;
  height: 100%;
  background: url(${questionMarkImage}) repeat ;
  background-size: 5% auto;
  filter: blur(0.6px);
  z-index: -1;
  
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: -100%;
    background: url(${questionMarkImage}) repeat;
    background-size: 5% auto;
    filter: blur(0.6px);
    animation-duration: 60s;
  }

  @media screen and (max-width: 768px) {
    background-size: 10% auto;
    &::before {
      background-size: 10% auto;
    }
  }
`;

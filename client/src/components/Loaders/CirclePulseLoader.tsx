import styled from "styled-components";
import {keyframes} from "styled-components";

const animLoader = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`

export const CirclePulseLoader = styled.span`
  padding: 1vh;
  height: 5vh;
  aspect-ratio: 1;
  display: inline-block;
  position: relative;
  align-self: center;
  visibility: visible;
  
  &::after,
  &::before {
    content: '';
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #FFF;
    position: absolute;
    left: 0;
    top: 0;
    animation: ${animLoader} 2s linear infinite;
  }
  
  &::after{
    animation-delay: 1s;
  }
  
`


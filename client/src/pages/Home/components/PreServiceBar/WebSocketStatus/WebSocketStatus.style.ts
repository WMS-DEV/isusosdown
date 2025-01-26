import styled from "styled-components";
import {keyframes} from "styled-components";

export const WebSocketStatus = styled.div`
  color: white;
`

const liveAnimation = keyframes`
  0% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(3.5, 3.5);
    background-color: rgba(0, 255, 0, 0);
  }
`

export const LiveIcon = styled.span`
  display: inline-block;
  position: relative;
  top: calc(50% - 5px);
  background-color: rgba(0, 255, 0, 1);
  width: 10px;
  height: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  z-index: 1;

  &::before {
    content: "";
    display: block;
    position: absolute;
    background-color: rgba(0, 255, 0, 0.6);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: ${liveAnimation} 2s ease-in-out infinite;
    z-index: -1;
  }
`

export const ConnectingIcon = styled(LiveIcon)`
  background-color: rgba(100, 100, 100, 1);
  
  &::before{
    background-color: rgba(100, 100, 100, 0.6);
  }
`
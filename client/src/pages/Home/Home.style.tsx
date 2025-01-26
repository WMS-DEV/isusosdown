import styled from 'styled-components'
import { keyframes } from "styled-components";
import {MaterialIcon} from "../../components/MaterialIcon/MaterialIcon"

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const AppContainer = styled.div`
text-align: center;
`

export const AppHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export const AppLink = styled.a`
  color: #61dafb;
`

export const Logo = styled.img`
  height: 40vmin;
  pointer-events: none;
  animation: ${spinAnimation} infinite 20s linear;
`



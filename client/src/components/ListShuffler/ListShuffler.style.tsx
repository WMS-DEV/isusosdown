import { animated } from "@react-spring/web"
import styled from "styled-components"

export const ShufflerContainer = styled.div<{ height: number }>`
  position: relative;
  width: 99%;
  margin: auto;
  height: ${props => props.height}px;
`
export const ShuffledRow = styled(animated.div) <{ height: number}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: ${props => props.height};
`

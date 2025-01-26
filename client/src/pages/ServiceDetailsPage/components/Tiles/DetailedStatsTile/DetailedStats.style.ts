import styled from "styled-components";
import {GlobalColorsEnum} from "../../../../../assets/globalStyleVariables";
import CountUp from "react-countup";
import {GlobalMediaQueries} from "../../../../../assets/globalMediaQueries";

export const Container = styled.div`
  background: ${GlobalColorsEnum.DarkGray};
  color: ${GlobalColorsEnum.MainText};
  flex-grow: 1;
  height: auto;
  border-radius: 20px;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 10px;
    

`

export const Argument = styled.h3`
  font-size: 2vw;
    @media (max-width: ${GlobalMediaQueries.Mobile}) {
        font-size: 5vw;
    }
`

export const Value = styled(CountUp)`
  font-size: 2vw;
    @media (max-width: ${GlobalMediaQueries.Mobile}) {
        font-size: 4vw;
    }
`

export const ValuesWrapper = styled.div`
    
`
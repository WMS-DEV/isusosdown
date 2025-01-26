import styled from "styled-components";
import { GlobalColorsEnum } from "../../../../assets/globalStyleVariables";
import {GlobalMediaQueries} from "../../../../assets/globalMediaQueries";

export const GenericSlider = styled.input`
  -webkit-appearance: none; 
  appearance: none;
  height: 0.25rem;
  background-color: #fff;
  pointer-events: none;
  border-radius: 1rem;
  width: 90%;


  ::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: all;
  width: 1rem;
  height: 1rem;
  background-color: ${GlobalColorsEnum.LightPurple};
  border-radius: 50%;
  cursor: pointer;
  :hover{
    transform: scale(1.5);
  }
  
}
::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  pointer-events: all;
  width: 1rem;
  height: 1rem;
  background-color: ${GlobalColorsEnum.LightPurple};
  border-radius: 50%;
  cursor: pointer;  
  :hover{
    transform: scale(1.5);
  }
}


`
export const SliderContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`


export const MinSlider = styled(GenericSlider)`
    position: absolute;
    z-index: 1;
    height: 0;
`

export const MaxSlider = styled(GenericSlider) <{ fromPosition: number, toPosition: number, range: number }>`
     background: linear-gradient(
      to right,
      white 0%,
      white ${props => (props.fromPosition / props.range) * 100}%,
      ${GlobalColorsEnum.LightPurple} ${props => (props.fromPosition / props.range) * 100}%,
      ${GlobalColorsEnum.LightPurple} ${props => (props.toPosition / props.range) * 100}%,
      white ${props => (props.toPosition / props.range) * 100}%,
      white 100%); `

export const MainSliderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const SliderLabelsContainer = styled.div`
  position: relative;
  height: 1.5rem;
  color: white;
  width:90%;
  transform: translateX(-2rem);
  margin:auto;
      
  @media screen and (max-width: ${GlobalMediaQueries.Mobile}){
     transform: translateX(-2.4rem);
  }
`

export const SliderLabel = styled.div<{ position: number }>`
  position: absolute;
  white-space: nowrap;
  left: ${props => props.position}%;
  top: 0;
  text-align: left;
  font-size: 1.2rem;
  font-weight: bold;
  margin: auto;
      
      
  @media screen and (max-width: ${GlobalMediaQueries.Tablet}){  
        font-size: 0.9rem;
  } 
  @media screen and (max-width: ${GlobalMediaQueries.Mobile}) {
        font-size: 0.7rem;
        margin-left: 0.5rem;
  }
 }
  
`

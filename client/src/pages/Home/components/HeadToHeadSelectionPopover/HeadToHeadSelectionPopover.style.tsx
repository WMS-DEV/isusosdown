import styled, { keyframes } from 'styled-components';
import { GlobalColorsEnum } from '../../../../assets/globalStyleVariables';
import { GlobalMediaQueries } from '../../../../assets/globalMediaQueries';

const SlideInAnimation = keyframes`
    0% {
        transform: translateY(-50%,-100%);
    }
    100% {
        transform: translateY(-50%,100%);
    }
`;
export const HeadToHeadSelectionModePopoverContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  background-color: black;
  color: white;
  z-index: 100;
  display: flex;
  padding: 1.5rem;
  font-size: 2rem;
  background-image: linear-gradient(
    to right,
    ${GlobalColorsEnum.LightPurple},
    ${GlobalColorsEnum.DarkBlue}
  );
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid ${GlobalColorsEnum.LightPurple};
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  animation: ${SlideInAnimation} 1s ease-in-out;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 1rem;
    width: 20rem;
  }
`;

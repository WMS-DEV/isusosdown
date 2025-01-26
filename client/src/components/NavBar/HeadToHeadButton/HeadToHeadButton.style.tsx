import styled from 'styled-components';
import { GlobalColorsEnum } from '../../../assets/globalStyleVariables';
import { NavButtonLabel } from '../NavButton/NavButton.style';

export const HeadToHeadButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
`;

export const HeadToHeadButtonLabel = styled(NavButtonLabel)<{
  isSelected: boolean;
}>`
  color: ${(props) =>
    props.isSelected ? GlobalColorsEnum.AccentPink : GlobalColorsEnum.MainText};
`;

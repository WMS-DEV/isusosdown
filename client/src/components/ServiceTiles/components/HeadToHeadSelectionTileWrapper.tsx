import styled from 'styled-components';
import { ServiceData } from '../../../types/main.types';
import { useHeadToHeadSelectionModeContext } from '../../../context/HeadToHeadSelectionModeContext';
import {useCallback} from "react";

interface HeadToHeadSelectionTileContainerProps {
  isServiceSelected: boolean;
}

export const HeadToHeadSelectionTileContainer = styled.div<HeadToHeadSelectionTileContainerProps>`
  > * {
    animation: none !important;
    opacity: 1 !important;
  }
  cursor: pointer;
  filter: ${({ isServiceSelected }) =>
    isServiceSelected ? 'brightness(1)' : 'brightness(0.2)'};
`;

const HeadToHeadSelectionTileWrapper = (props: {
  service: ServiceData;
  children: React.ReactNode;
}) => {
  const { handleAddServiceForComparison, selectedServices } =
    useHeadToHeadSelectionModeContext();

  const isServiceSelected = useCallback((service: ServiceData) => {
    return selectedServices.includes(service.title);
  }, [selectedServices]);

  return (
    <HeadToHeadSelectionTileContainer
      onClick={() => handleAddServiceForComparison(props.service.title)}
      isServiceSelected={isServiceSelected(props.service)}
    >
      {props.children}
    </HeadToHeadSelectionTileContainer>
  );
};
export default HeadToHeadSelectionTileWrapper;

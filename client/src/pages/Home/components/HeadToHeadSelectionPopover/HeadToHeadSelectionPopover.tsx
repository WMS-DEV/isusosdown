import { HeadToHeadSelectionModePopoverContainer } from './HeadToHeadSelectionPopover.style';
import {useToggleHeadToHeadSelectionMode} from "../../../../hooks/useToggleHeadToHeadSelectionMode";

const HeadToHeadSelectionModePopover = () => {

  const toggleHeadToHeadSelectionMode = useToggleHeadToHeadSelectionMode()

  return (
    <HeadToHeadSelectionModePopoverContainer onClick={toggleHeadToHeadSelectionMode}>
      <span>Wybierz dwa serwisy do porównania</span>
    </HeadToHeadSelectionModePopoverContainer>
  );
};
export default HeadToHeadSelectionModePopover;

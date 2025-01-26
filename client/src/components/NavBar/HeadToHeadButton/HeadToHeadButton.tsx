import { useHeadToHeadSelectionModeContext } from '../../../context/HeadToHeadSelectionModeContext';
import {
  HeadToHeadButtonContainer,
  HeadToHeadButtonLabel,
} from './HeadToHeadButton.style';
import config from '../../../config.json'

const HEAD_TO_HEAD_LABEL = config.headtoHeadLabel;

const HeadToHeadButton = () => {
  const selectionContext = useHeadToHeadSelectionModeContext();

  const { headToHeadSelectionMode, setHeadToHeadSelectionMode } =
    selectionContext;

  const toggleHeadToHeadSelectionMode = () => {
    setHeadToHeadSelectionMode((oldState: boolean) => !oldState);
  };

  return (
    <>
      <HeadToHeadButtonContainer onClick={toggleHeadToHeadSelectionMode}>
        <HeadToHeadButtonLabel isSelected={headToHeadSelectionMode}>
          {HEAD_TO_HEAD_LABEL}
        </HeadToHeadButtonLabel>
      </HeadToHeadButtonContainer>
      {}
    </>
  );
};

export default HeadToHeadButton;

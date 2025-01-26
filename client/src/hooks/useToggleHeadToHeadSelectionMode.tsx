import {useHeadToHeadSelectionModeContext} from "../context/HeadToHeadSelectionModeContext";

export const useToggleHeadToHeadSelectionMode = () => {
  const { setHeadToHeadSelectionMode, headToHeadSelectionMode } = useHeadToHeadSelectionModeContext();

  const toggleHeadToHeadSelectionMode = () => {

    if (!headToHeadSelectionMode) return;

    setHeadToHeadSelectionMode(!headToHeadSelectionMode);
  }
  return () => {
    return toggleHeadToHeadSelectionMode()
  };
};
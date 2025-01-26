import { SortedStatus } from "../RankingChart/RankingChart";
import { MaterialSortAscIcon, MaterialSortDesIcon, SortButtonContainer } from "./SortButton.style";

export const SortButton = (props: { sortingType: SortedStatus; currentSortStatus: SortedStatus; sortCb: (arg: SortedStatus) => () => void; }) => {
  return (
    <SortButtonContainer
      onClick={props.sortCb(props.sortingType)}>
      {props.sortingType === SortedStatus.ASCENDING ? (
        <MaterialSortAscIcon
          isActive={
            props.sortingType === props.currentSortStatus}
        />
      ) : (
        <MaterialSortDesIcon
          isActive={
            props.sortingType === props.currentSortStatus}
        ></MaterialSortDesIcon>
      )}
    </SortButtonContainer>
  );
};

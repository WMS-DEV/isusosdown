import styled from "styled-components";
import { GlobalColorsEnum } from "../../../../assets/globalStyleVariables";
import { MaterialIcon } from "../../../../components/MaterialIcon/MaterialIcon";

export const SortButtonContainer = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  width: 2rem;
  margin: 1rem 0.5rem 0.5rem 0.5rem ;
  :hover {
    transform: scale(1.2);
    transition: transform 0.3s ease-in-out;
  }
`
export const MaterialSortIcon = () => {
  return <MaterialIcon iconName={"sort"} fontSize={"3rem"} color={"white"} />;
};

export const MaterialSortAscIcon = (props: { isActive: boolean }) => {
  return (
    <MaterialIcon
      iconName={"arrow_upward_alt"}
      fontSize={"3rem"}
      color={props.isActive ? GlobalColorsEnum.BrightGreen : "white"
      }
    />
  );
};

export const MaterialSortDesIcon = (props: { isActive: boolean }) => {
  return (
    <MaterialIcon
      iconName={"arrow_downward_alt"}
      fontSize={"3rem"}
      color={props.isActive ? GlobalColorsEnum.BrightRed : "white"}
    />
  );
};

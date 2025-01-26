import {NavButtonContainer, NavButtonLabel} from "./NavButton.style";
import {useToggleHeadToHeadSelectionMode} from "../../../hooks/useToggleHeadToHeadSelectionMode";

export const NavButton = (props: {
    destination: string,
    name: string,
}) => {

    const toggleHeadToHeadSelectionMode = useToggleHeadToHeadSelectionMode()

    return (
        <>
            <NavButtonContainer onClick={toggleHeadToHeadSelectionMode} to={props.destination}>
                <NavButtonLabel>
                    {props.name}
                </NavButtonLabel>
            </NavButtonContainer>
        </>
    )
}
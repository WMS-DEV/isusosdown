import {ButtonContainer, ButtonLabel} from "./RedirectButton.style";

export const RedirectButton = (props: { label: string; destination: string }) => {

    const openNewTab = () => {
        window.open(props.destination, '_blank')
    }

    return (
        <>
            <ButtonContainer onClick={openNewTab}>
                <ButtonLabel>
                    {props.label}
                </ButtonLabel>
            </ButtonContainer>
        </>
    )
}
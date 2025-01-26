import {
    NavBarContainer,
    IsUsosDownLogo,
    LinkWrapper,
    NoStyleWrapper,
    PoweredByText,
    LogoContainer, NavButtonsWrapper
} from "./NavBar.style";
import {WmsInLineLogo} from "../InteractiveLogos/WmsLogo/WmsInLineLogo";
import config from '../../config.json'
import {useEffect, useState} from "react";
import {NavButton} from "./NavButton/NavButton"
import HeadToHeadButton from "./HeadToHeadButton/HeadToHeadButton";
import {useToggleHeadToHeadSelectionMode} from "../../hooks/useToggleHeadToHeadSelectionMode";

export const NavBar = () => {

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    const toggleHeadToHeadSelectionMode = useToggleHeadToHeadSelectionMode()


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);


    return (
        <>
            <NavBarContainer visible={visible}>

                <NoStyleWrapper>
                    <LinkWrapper to={"/"}>
                        <IsUsosDownLogo onClick={toggleHeadToHeadSelectionMode}>
                            {config.appName}
                        </IsUsosDownLogo>
                    </LinkWrapper>
                    <PoweredByText>
                        | Powered by
                    </PoweredByText>
                    <LogoContainer><WmsInLineLogo/></LogoContainer>
                </NoStyleWrapper>

                <NavButtonsWrapper>
                    <NavButton destination={"/rankings"} name={"Rankingi"} />
                    <HeadToHeadButton/>
                </NavButtonsWrapper>
            </NavBarContainer>
        </>
    );
}
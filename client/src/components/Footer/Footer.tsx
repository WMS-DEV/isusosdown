import {FooterContainer, FooterLeftText, InfoRightContainer, LogoContainer} from "./Footer.style";
import config from "../../config.json"
import {WmsLogo} from "../InteractiveLogos/WmsLogo/WmsLogo";
import {RedirectButton} from "../Buttons/RedirectButton/RedirectButton";

export const Footer = () => {

    return (
        <>
            <FooterContainer>

                    <FooterLeftText>
                        Made with ❤ by {config.authorName}
                        <br/>
                        {config.wmsDevWebsiteLink}
                    </FooterLeftText>

                    <InfoRightContainer>
                        <LogoContainer>
                            <WmsLogo/>
                        </LogoContainer>
                        <RedirectButton destination={config.joinUsFormLink} label={"Dołącz do nas!"}/>
                    </InfoRightContainer>

            </FooterContainer>
        </>
    )
}
import config from "../../config.json"
import {CenteredFooterText, SlimFooterContainer} from "./SlimFooter.style";


export const SlimFooter = () => {

    return (
        <>
            <SlimFooterContainer>
                    <CenteredFooterText>
                        Made with ❤ by {config.authorName}
                        <br/>
                        www.wmsdev.pl
                    </CenteredFooterText>
            </SlimFooterContainer>
        </>
    )
}
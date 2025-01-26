import {WmsInLineLogoButton} from "./WmsLogo.style";
import config from "../../../config.json"

export const WmsInLineLogo = () => {

    const openWmsSite = () => {
        window.open(config.wmsDevWebsiteLink, "WMS_DEV Website")
    }

    return <WmsInLineLogoButton onClick={openWmsSite}/>

}

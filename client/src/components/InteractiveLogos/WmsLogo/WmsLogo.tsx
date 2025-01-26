import {WmsLogoButton} from "./WmsLogo.style";
import config from "../../../config.json"

export const WmsLogo = () => {

    const openWmsSite = () => {
        window.open(config.wmsDevWebsiteLink, "WMS_DEV Website")
    }

    return <WmsLogoButton onClick={openWmsSite}/>

}

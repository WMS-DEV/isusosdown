import styled from "styled-components";
import wmsLogo from "../../../assets/logos/wms_white_logo.png"
import wmsInlineLogo from "../../../assets/logos/wms_in-line_logo.png"

export const WmsLogoButton = styled.button`
  background-color: transparent;
  background-image: url(${wmsLogo});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  aspect-ratio: 4.4/1;
  border: none;
  cursor: pointer;
  width: auto;
`

export const WmsInLineLogoButton = styled(WmsLogoButton)`
  background-image: url(${wmsInlineLogo});
  background-color: transparent;
  aspect-ratio: 5.78/1;
`
import {BannerContainer, Title} from '../../../components/Baner/Baner.style'
import {MaterialIcon} from "../../../components/MaterialIcon/MaterialIcon";

interface BannerProps {
    serviceName: string,
    serviceUrl?: string,
}

export const Banner = ({serviceName, serviceUrl}: BannerProps) => {

    const bannerWithURL = <>
        <BannerContainer>
            <Title target={"_blank"} href={serviceUrl} rel={"noopener noreferrer"}>
                {serviceName} &nbsp; <MaterialIcon iconName={"open_in_new"}/>
            </Title>
        </BannerContainer>
    </>

    const banner = <>
        <BannerContainer>
            <Title>{serviceName}</Title>
        </BannerContainer>
    </>

    const selectedBanner = serviceUrl ? bannerWithURL : banner


    return (selectedBanner)

}


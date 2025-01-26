import {
    HeartRateContainer,
    HeartRateSvg,
    HeartPolyLine,
    TileContainer,
    FadeInDiv,
    FadeOutDiv,
    FadeInDivFirst,
    FadeOutDivRed
} from "./StatusTile.style";
import {Title, BigValueText} from "../Headers.style";
import {IServiceDetailsData} from "../../../ServiceDetailsPage";

interface StatusTileProps {
    serviceData: IServiceDetailsData
}

export const StatusTile = ({serviceData}: StatusTileProps) => {

    return (
        <>
            <TileContainer isActive={serviceData.isActive}>

                <Title>Status</Title>

                <BigValueText
                   > {serviceData.isActive ? "aktywny" : "nieaktywny"} </BigValueText>

                <HeartRateContainer>
                    <HeartRateSvg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 150 73"
                                  xmlSpace="preserve" viewBox="0 0 150 73">
                        <HeartPolyLine
                            isActive={serviceData.isActive}
                            points={serviceData.isActive ?
                                "0, 45.486 38.514, 45.486 44.595, 33.324 50.676, 45.486 57.771, 45.486 62.838, 55.622 71.959, 9 80.067, 63.729 84.122, 45.486 97.297, 45.486 103.379, 40.419 110.473, 45.486 150, 45.486"
                                : "0, 45.486 150, 45.486"
                            }/>
                    </HeartRateSvg>
                    <HeartRateSvg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 150 73"
                                  xmlSpace="preserve" viewBox="0 0 150 73">
                        <HeartPolyLine
                            isActive={serviceData.isActive}
                            points={
                                serviceData.isActive ?
                                    "0, 45.486 38.514, 45.486 44.595, 33.324 50.676, 45.486 57.771, 45.486 62.838, 55.622 71.959, 9 80.067, 63.729 84.122, 45.486 97.297, 45.486 103.379, 40.419 110.473, 45.486 150, 45.486"
                                    : "0, 45.486 150, 45.486"
                            }/>
                    </HeartRateSvg>

                    {serviceData.isActive ? <FadeOutDiv/> : <FadeOutDivRed/>}

                    <FadeInDiv isActive={serviceData.isActive}/>
                    <FadeInDivFirst isActive={serviceData.isActive}/>

                </HeartRateContainer>
            </TileContainer>
        </>
    )
}
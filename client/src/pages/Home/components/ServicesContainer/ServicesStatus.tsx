import { Container, Gradient } from './ServicesStatus.style';
import { ServiceData } from '../../../../types/main.types';
import { ServiceTileWithRoute } from '../../../../components/ServiceTiles/ServiceTileWithRoute';
import {Fragment} from "react";
import {useHeadToHeadSelectionModeContext} from "../../../../context/HeadToHeadSelectionModeContext";
import Ad from "../Ad/Ad";
import config from '../../../../config.json'

const WMS_DEV_WEBSITE = config.wmsDevWebsiteLink;

interface ServicesContainerProps {
  services: ServiceData[];
}

const renderAd = (index: number, serviceData: ServiceData) => (
    <Fragment key={index}>
        <Ad link={WMS_DEV_WEBSITE}/>
        <ServiceTileWithRoute
            index={index}
            serviceData={serviceData}
        />
    </Fragment>
);

const renderServiceTile = (index: number, serviceData: ServiceData) => (
    <ServiceTileWithRoute
        index={index}
        key={index}
        serviceData={serviceData}
    />
);

export const ServicesStatus = (props: ServicesContainerProps) => {
    const {headToHeadSelectionMode} = useHeadToHeadSelectionModeContext();

    return (
        <Gradient>
            <Container>
                {props.services.map((serviceData, index) =>
                    index === 4 && !headToHeadSelectionMode ? renderAd(index, serviceData) : renderServiceTile(index, serviceData)
                )}
            </Container>
        </Gradient>
    );
};
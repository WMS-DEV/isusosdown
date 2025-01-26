import { useHeadToHeadSelectionModeContext } from '../../context/HeadToHeadSelectionModeContext';
import { ServiceTile } from './ServiceTile';
import  HeadToHeadSelectionTileWrapper  from './components/HeadToHeadSelectionTileWrapper';
import { ServiceTileProps } from './ServiceTile';
import { LinkWrapper  } from './Tiles.style';

export const ServiceTileWithRoute = (props: ServiceTileProps) => {
    const {headToHeadSelectionMode} = useHeadToHeadSelectionModeContext();

    return <>
            {!headToHeadSelectionMode?
                <LinkWrapper to={`/service/${props.serviceData.title}`}>
                    <ServiceTile serviceData={props.serviceData} index={props.index} />
                </LinkWrapper>:
                <HeadToHeadSelectionTileWrapper service={props.serviceData}>
                    <ServiceTile serviceData={props.serviceData} index={props.index} />
                </HeadToHeadSelectionTileWrapper>
            }
        </>
    ;
};

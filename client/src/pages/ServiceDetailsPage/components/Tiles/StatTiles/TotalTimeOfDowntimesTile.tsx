import { Container } from '../Tiles.style';
import { IServiceDetailsData } from '../../../ServiceDetailsPage';
import { Title, BigValueText, InvSpacer } from '../Headers.style';
import DateCountUp from '../../../../../components/DateCountUp/DateCountUp';

interface StatTileProps {
    serviceData: IServiceDetailsData;
}

export const TotalTimeOfDowntimesTile = ({ serviceData }: StatTileProps) => {
    return (
        <>
            <Container>
                <Title>Łączny czas awarii</Title>

                <BigValueText>
                    <DateCountUp dateInMs={serviceData.totalDowntimeMillis} />
                </BigValueText>

                <InvSpacer />
            </Container>
        </>
    );
};

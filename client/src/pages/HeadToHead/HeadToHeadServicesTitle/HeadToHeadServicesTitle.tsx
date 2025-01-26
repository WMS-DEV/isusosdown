import { ServiceHeadToHeadStats } from '../HeadToHead';
import {
  isHeadToHeadServiceWinnerByName,
  transformHeadToHeadServiceIntoServiceName,
} from '../HeadToHeadUtils';
import {
  DecorativeCenteredText,
  HeadToHeadServicesNameContainer,
  HeadToHeadServiceTitle,
  HeadToHeadTitleContainer,
} from './HeadToHeadServicesTitle.style';
import { HeadToHeadWinnerTitle } from './HeadToHeadWinnerTitle/HeadToHeadWinnerTitle.style';

interface HeadToHeadServicesTitleProps {
  services: ServiceHeadToHeadStats[];
}

const HeadToHeadServicesTitle = ({
  services,
}: HeadToHeadServicesTitleProps) => {
  return (
    <HeadToHeadServicesNameContainer>
      {transformHeadToHeadServiceIntoServiceName(services).map(
        (serviceName: string, index: number) => {
          return (
            <HeadToHeadTitleContainer>
              {isHeadToHeadServiceWinnerByName(services, serviceName) ? (
                <HeadToHeadWinnerTitle serviceName={serviceName} />
              ) : (
                <HeadToHeadServiceTitle key={index}>
                  {serviceName}
                </HeadToHeadServiceTitle>
              )}
            </HeadToHeadTitleContainer>
          );
        },
      )}
      {/* <DecorativeCenteredText>vs</DecorativeCenteredText> */}
    </HeadToHeadServicesNameContainer>
  );
};

export default HeadToHeadServicesTitle;

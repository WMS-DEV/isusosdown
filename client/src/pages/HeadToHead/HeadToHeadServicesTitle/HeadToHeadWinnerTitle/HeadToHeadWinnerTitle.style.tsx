import styled from 'styled-components';
import winner from '../../../../assets/decorations/winner.png';
import crown from '../../../../assets/decorations/crown.png';
import {
  HeadToHeadServiceTitle,
  HeadToHeadTitleContainer,
} from '../HeadToHeadServicesTitle.style';

import { GlobalMediaQueries } from '../../../../assets/globalMediaQueries';

export const HeadToHeadWinnerTitleImage = styled.img`
  position: absolute;
  color: white;
  left: 60%;
  top: 20%;
  z-index: 1;
  width: auto;
  height: 120%;
  @media (max-width: ${GlobalMediaQueries.Tablet}) {
    top: 40%;
    left: -20%;
  }
`;
export const HeadToHeadWinnerCrownImage = styled.img`
  position: absolute;
  color: white;
  left: 0%;
  bottom: 80%;
  transform: rotate(-10deg);
  z-index: 1;
  max-width: 3rem;
  max-height: 3rem;
  width: auto;
  height: 90%;
`;

export const HeadToHeadWinnerTitle = ({
  serviceName,
}: {
  serviceName: string;
}) => {
  return (
    <HeadToHeadTitleContainer>
      <HeadToHeadWinnerTitleImage src={winner} />
      <HeadToHeadWinnerCrownImage src={crown} />
      <HeadToHeadServiceTitle>{serviceName}</HeadToHeadServiceTitle>
    </HeadToHeadTitleContainer>
  );
};

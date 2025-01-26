import styled from 'styled-components';
import { GlobalMediaQueries } from '../../../../assets/globalMediaQueries';

export const PreServiceBarContainer = styled.div`
  width: 100%;
  padding: 2vh 12vw;
  padding-bottom: 0.5vh;
  display: inline-flex;
  justify-content: space-between;
  font-size: 1.5vh;
  align-items: baseline;
  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    flex-direction: column;
  }
`;

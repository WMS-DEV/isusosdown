import { ServiceHeadToHeadStats } from '../HeadToHead';
import HeadToHeadScoreBar from '../HeadToHeadScoreBar/HeadToHeadScoreBar';
import {
  HeadToHeadMainScoreName,
  HeadToHeadMainScoreNameContainer,
} from '../HeadToHeadScoreBar/HeadToHeadScoreBar.style';
import {
  transformHeadToHeadIntoScoreNames,
  transformHeadToHeadServiceToMainScore,
} from '../HeadToHeadUtils';
import { HeadToHeadScoreName } from './HeadToHeadBasicStats.style';
import HeadToHeadStatsColumn from './components/HeadToHeadBasicStatsColumn';

export interface ServiceHeadToHeadBasicStatsProps {
  services: ServiceHeadToHeadStats[];
}

const HeadToHeadBasicStats = ({
  services,
}: ServiceHeadToHeadBasicStatsProps) => {
  return (
    <>
      {transformHeadToHeadIntoScoreNames(services[0]).map(
        (scoreName, index) => {
          return (
            <HeadToHeadScoreName key={index} row={index} column={0}>
              {scoreName}
            </HeadToHeadScoreName>
          );
        },
      )}
      <HeadToHeadMainScoreNameContainer>
        <HeadToHeadMainScoreName>Wynik</HeadToHeadMainScoreName>
      </HeadToHeadMainScoreNameContainer>

      {transformHeadToHeadServiceToMainScore(services).map(
        ({ score }, index) => (
          <HeadToHeadScoreBar
            score={score}
            column={index + 2}
            row={2}
            key={index}
          />
        ),
      )}

      <HeadToHeadStatsColumn
        column={2}
        service={services[0]}
        type={'basic'}
        rowOffset={3}
      />
      <HeadToHeadStatsColumn
        column={3}
        service={services[1]}
        type={'basic'}
        rowOffset={3}
      />
    </>
  );
};

export default HeadToHeadBasicStats;

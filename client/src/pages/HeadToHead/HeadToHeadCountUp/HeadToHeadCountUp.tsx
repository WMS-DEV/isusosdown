import { ScoreKeyName } from '../HeadToHeadUtils';
import DateCountUp from '../../../components/DateCountUp/DateCountUp';
import CountUp from 'react-countup';

type HeadToHeadCountUpProps = {
  scoreKey: ScoreKeyName;
  scoreValue: number;
};

const isHeadToHeadScoreADate = (scoreKey: ScoreKeyName) => {
  return (
    scoreKey === 'totalDowntimeMillis' ||
    scoreKey === 'averageDowntimeLengthMillis' ||
    scoreKey === 'totalUptimeMillis'
  );
};
const isHeadToHeadScoreAPercentage = (scoreKey: ScoreKeyName) => {
  return scoreKey === 'bounceRatePercentage';
};

const HeadToHeadCountUp = (props: HeadToHeadCountUpProps) => {
  if (isHeadToHeadScoreADate(props.scoreKey)) {
    return <DateCountUp dateInMs={props.scoreValue} />;
  } else if (isHeadToHeadScoreAPercentage(props.scoreKey)) {
    return <CountUp end={props.scoreValue} decimals={2} suffix={'%'} />;
  } else {
    return <CountUp end={props.scoreValue} />;
  }
};
export default HeadToHeadCountUp;

import {
  HeadToHeadFilledScoreBar,
  HeadToHeadMainScoreValue,
  HeadToHeadScoreBarContainer,
} from './HeadToHeadScoreBar.style';
import CountUp from 'react-countup';

const HeadToHeadScoreBar = ({
  score,
  column,
  row,
}: {
  score: number;
  column: number;
  row: number;
}) => {
  return (
    <HeadToHeadScoreBarContainer column={column} row={row}>
      <HeadToHeadMainScoreValue>
        <CountUp
          end={Math.round(score * 100) / 10}
          duration={1}
          decimals={2}
          suffix="/10"
        />
      </HeadToHeadMainScoreValue>
      <HeadToHeadFilledScoreBar percentageWidth={score} />
    </HeadToHeadScoreBarContainer>
  );
};

export default HeadToHeadScoreBar;

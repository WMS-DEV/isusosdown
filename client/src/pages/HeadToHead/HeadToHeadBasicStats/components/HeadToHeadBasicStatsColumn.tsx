import { ScoreKeyName } from '../../HeadToHeadUtils';
import { HeadToHeadInnerTableCell } from '../HeadToHeadBasicStats.style';
import HeadToHeadCountUp from '../../HeadToHeadCountUp/HeadToHeadCountUp';
import { ServiceHeadToHeadStats } from '../../HeadToHead';
import {
  getBasicStatsEntries,
  getTrafficStatsEntries,
} from '../../HeadToHeadUtils';
import { useState, useEffect } from 'react';
type HeadToHeadBasicStatsColumnProps = {
  column: number;
  service?: ServiceHeadToHeadStats;
  type: StatsType;
  rowOffset: number;
};

type StatsType = 'basic' | 'traffic';

const getServiceEntriesByType = (
  type: StatsType,
  service: ServiceHeadToHeadStats,
) => {
  switch (type) {
    case 'basic':
      return getBasicStatsEntries(service);
    case 'traffic':
      return getTrafficStatsEntries(service);
  }
};

const HeadToHeadBasicStatsColumn = (props: HeadToHeadBasicStatsColumnProps) => {
  const [entries, setEntries] = useState<[string, number][]>([]);

  useEffect(() => {
    if (props.service) {
      setEntries(getServiceEntriesByType(props.type, props.service));
    }
  }, [props.service, props.type]);

  return (
    <>
      {entries
        ? entries.map(([scoreKey, value], index) => (
            <HeadToHeadInnerTableCell
              column={props.column}
              row={index + props.rowOffset}
              key={index}
            >
              <HeadToHeadCountUp
                scoreKey={scoreKey as ScoreKeyName}
                scoreValue={value as number}
              />
            </HeadToHeadInnerTableCell>
          ))
        : null}
    </>
  );
};

export default HeadToHeadBasicStatsColumn;

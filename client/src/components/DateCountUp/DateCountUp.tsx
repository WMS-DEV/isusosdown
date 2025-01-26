import { formatMsToDHM } from '../../utils/formatMsToDHM';
import CountUp from 'react-countup';
import { useCallback, useState } from 'react';
import { CountUpWrapper } from './DateCountUp.style';

interface DateCountUpProps {
    dateInMs: number;
}

const DateCountUp = (props: DateCountUpProps) => {
    const [[days, hours, minutes], setDHM] = useState<number[]>(
        formatMsToDHM(props.dateInMs),
    );

    const isDateValid = useCallback(() => {
        return days !== 0 || hours !== 0 || minutes !== 0;
    }, [days, hours, minutes]);

    if (!isDateValid()) {
        return <>0m</>;
    }

    return (
        <>
            {days ? <CountUpWrapper end={days} suffix={'d'} /> : null}
            {hours ? <CountUpWrapper end={hours} suffix={'h'} /> : null}
            {minutes ? <CountUpWrapper end={minutes} suffix={'m'} /> : null}
        </>
    );
};
export default DateCountUp;

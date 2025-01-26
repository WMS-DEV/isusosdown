import { useCallback, useEffect, useState } from 'react';
import 'chartjs-adapter-moment';
import { _DeepPartialObject } from 'chart.js/types/utils';
import {
    DownTime,
    EndedDownTime,
    StartedDownTime,
    FullDownTime,
} from '../../types/main.types';
import { GlobalColorsEnum } from '../../assets/globalStyleVariables';
import { FormatedChartData } from '../../types/chart.types';
import { AvailabilityChartProps } from './AvailabilityChart';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    TooltipItem,
    PluginChartOptions,
    DatasetChartOptions,
    CoreChartOptions,
    ElementChartOptions,
    AnimationSpec,
    ChartType,
    LogarithmicScale,
} from 'chart.js';
import { isFullDownTime } from '../../lib/typeGuards';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    LogarithmicScale,
);

const ANIMATION_DURATION = 700;
const MS_IN_DAY = 1000 * 60 * 60 * 24;
const Y_RANGE_MIN = -0.1;
const Y_RANGE_MAX = 1.1;
const CHART_REFRESH_INTERVAL = 30000;
export const DATE_RANGE = MS_IN_DAY;

export interface AvailabilityChartPoint {
    x: number;
    y: 0 | 1;
}

export const useAvailabilityChartLogic = (props: AvailabilityChartProps) => {
    const [points, setPoints] = useState<AvailabilityChartPoint[]>([]);

    const getChartColor = useCallback(() => {
        return props.isActive
            ? GlobalColorsEnum.BrightGreen
            : GlobalColorsEnum.BrightRed;
    }, [props.isActive]);

    useEffect(() => {
        const flattenedData = flattenData(props.downtimes);
        const newPoints = flattenedData.map(({ arg, val }) => ({
            x: arg,
            y: val,
        }));

        const allPoints = handleAppendingDatasetPoints(props.isActive, newPoints);

        setPoints(allPoints);
    }, [props.isActive, props.downtimes]);

    useEffect(() => {
        const intervalHandle = setInterval(
            () =>
                setTimeout(() => {
                    setPoints(moveChartInTime);
                }, CHART_REFRESH_INTERVAL),
            CHART_REFRESH_INTERVAL,
        );

        return () => clearTimeout(intervalHandle);
    }, []);

    return {
        data: createDataObject(points, getChartColor()),
        options: createOptionsObject(points.length, ANIMATION_DURATION),
    };
};

const moveChartInTime = (points: AvailabilityChartPoint[]) => {
    return addPointsAtCurrentTime(removePointsBeforeDateRange(points));
};

const removePointsBeforeDateRange = (points: AvailabilityChartPoint[]) => {
    const filteredPoints = points.filter(
        (point) => point.x > Date.now() - DATE_RANGE,
    );
    return [
        { x: Date.now() - DATE_RANGE, y: filteredPoints[0].y },
        ...filteredPoints,
    ];
};
const addPointsAtCurrentTime = (points: AvailabilityChartPoint[]) => {
    return [...points, { x: Date.now(), y: points[points.length - 1].y }];
};

const isDowntimeAtTheBegginingOfTheChart = (
    data: (FullDownTime | StartedDownTime | EndedDownTime)[],
) => {
    return (
        data.length > 0 &&
        isFullDownTime(data[0]) &&
        data[0].downSince < Date.now() - DATE_RANGE
    );
};

export const flattenData = (
    data: (DownTime | { downSince: number } | { downTill: number })[],
): FormatedChartData[] => {
    if (data.length === 0) {
        return [];
    } else {
        if (isDowntimeAtTheBegginingOfTheChart(data)) {
            const firstFullDownTime = data.shift() as FullDownTime;
            data.unshift({
                downTill: firstFullDownTime.downTill,
            });
        }

        return data.reduce((accum: FormatedChartData[], current) => {
            if ('downSince' in current) {
                accum.push(getFormatedDateObject(current.downSince, 1));
                accum.push(getFormatedDateObject(current.downSince, 0));
            }
            if ('downTill' in current) {
                accum.push(getFormatedDateObject(current.downTill, 0));
                accum.push(getFormatedDateObject(current.downTill, 1));
            }
            return accum;
        }, []);
    }
};

export const getFormatedDateObject = (
    argument: number,
    value: 1 | 0,
): FormatedChartData => {
    return {
        arg: argument,
        val: value,
    };
};

export const createDataObject = (
    points: AvailabilityChartPoint[],
    color: string,
) => {
    return {
        labels: points.map(({ x }) => x),
        datasets: [
            {
                label: '',
                data: points.map(({ y }) => y),
                borderColor: color,
            },
        ],
    };
};

const createOptionsObject = (dataLength: number, animationDuration: number) =>
    ({
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 1,
        animation: getProgressiveAnimation(dataLength, animationDuration),
        scales: {
            y: {
                ...getTicksObject(false, false),
                min: Y_RANGE_MIN,
                max: Y_RANGE_MAX,
            },
            x: {
                type: 'time',
                ...getTicksObject(true, false),
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'MMM DD',
                    },
                },
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: getAvailabilityLabelText('Dostępny', 'Niedostępny'),
                    labelColor: getAvailabilityLabelColor(
                        GlobalColorsEnum.BrightGreen,
                        GlobalColorsEnum.BrightRed,
                    ),
                },
            },
        },
    }) as _DeepPartialObject<
        CoreChartOptions<'line'> &
        ElementChartOptions<'line'> &
        PluginChartOptions<'line'> &
        DatasetChartOptions<'line'>
    >;

const getTicksObject = (
    displayTick: boolean,
    displayGrid: boolean,
    color: string = 'white',
) => {
    return {
        ticks: {
            display: displayTick,
            color: color,
            font: {
                size: 12,
            },

            maxTicksLimit: 2,
            source: 'data',
        },
        grid: {
            display: displayGrid,
            drawOnChartArea: false,
        },
    };
};

const getAvailabilityLabelText =
    (labelWhenOn: string, labelWhenOff: string) =>
        (context: TooltipItem<'line'>) => {
            if (context.parsed.y === 1) {
                return labelWhenOn;
            } else {
                return labelWhenOff;
            }
        };
const getAvailabilityLabelColor =
    (colorWhenOn: string, colorWhenOff: string) =>
        (context: TooltipItem<'line'>) => {
            const color = context.parsed.y === 1 ? colorWhenOn : colorWhenOff;

            return {
                borderColor: 'rgb(0,0,0,0)',
                backgroundColor: color,
            };
        };

const createPointsInEmptyDataset = (
    isServiceActive: boolean,
): AvailabilityChartPoint[] => {
    return isServiceActive
        ? [
            { x: Date.now() - DATE_RANGE, y: 1 },
            { x: Date.now(), y: 1 },
        ]
        : [
            { x: Date.now() - DATE_RANGE, y: 0 },
            { x: Date.now(), y: 0 },
        ];
};

const handleAppendingDatasetPoints = (
    isServiceActive: boolean,
    points: AvailabilityChartPoint[],
): AvailabilityChartPoint[] => {
    if (points.length === 0) {
        return createPointsInEmptyDataset(isServiceActive);
    } else {
        const result = [
            {
                x: Date.now() - DATE_RANGE,
                y: points[0].y,
            } as AvailabilityChartPoint,
            ...points,
            { y: points[points.length - 1].y, x: Date.now() },
        ];
        return result;
    }
};

const getProgressiveAnimation = (dataLength: number, Totalduration: number) => {
    const delayBetweenPoints = Totalduration / dataLength;

    return {
        x: getAxisAnimation('number', 'linear', delayBetweenPoints, NaN),
        y: getAxisAnimation('number', 'linear', delayBetweenPoints, previousY),
    } as AnimationSpec<ChartType>;
};

const getAxisAnimation = (
    type: string,
    easing: string,
    duration: number,
    from: any,
) => {
    return {
        type: type,
        easing: easing,
        duration: duration,
        from: from, // the point is initially skipped
        delay(ctx: any) {
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * duration;
        },
    };
};

const previousY = (ctx: any) =>
    ctx.index === 0
        ? ctx.chart.scales.y.getPixelForValue(100)
        : ctx.chart
            .getDatasetMeta(ctx.datasetIndex)
            .data[ctx.index - 1].getProps(['y'], true).y;

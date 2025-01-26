import { FormatedChartData } from '../../types/chart.types';
import { DownTime } from '../../types/main.types';
import {
    DATE_RANGE,
    createDataObject,
    useAvailabilityChartLogic,
    AvailabilityChartPoint,
} from './useAvailabilityChartLogic';
import { flattenData } from './useAvailabilityChartLogic';
import { renderHook, waitFor } from '@testing-library/react';
import { GlobalColorsEnum } from '../../assets/globalStyleVariables';

const MOCKED_CURRENT_TIME = new Date('2021-01-01T00:00:00.000Z').getTime();

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(MOCKED_CURRENT_TIME);
});
afterAll(() => {
    jest.useRealTimers();
});

describe('Data flattening function', () => {
    it.each([
        [
            [
                { downSince: 12 },
                { downTill: 14 },
                { downSince: 15, downTill: 20 },
            ],
            [
                { arg: 12, val: 1 } as FormatedChartData,
                { arg: 12, val: 0 } as FormatedChartData,
                { arg: 14, val: 0 } as FormatedChartData,
                { arg: 14, val: 1 } as FormatedChartData,
                { arg: 15, val: 1 } as FormatedChartData,
                { arg: 15, val: 0 } as FormatedChartData,
                { arg: 20, val: 0 } as FormatedChartData,
                { arg: 20, val: 1 } as FormatedChartData,
            ],
        ],
        [
            [{ downSince: 12312 }, { downTill: 90823 }],
            [
                { arg: 12312, val: 1 } as FormatedChartData,
                { arg: 12312, val: 0 } as FormatedChartData,
                { arg: 90823, val: 0 } as FormatedChartData,
                { arg: 90823, val: 1 } as FormatedChartData,
            ],
        ],
        [
            [{ downSince: 12312, downTill: 90823 }],
            [
                { arg: 90823, val: 0 } as FormatedChartData,
                { arg: 90823, val: 1 } as FormatedChartData,
            ],
        ],
        [[], []],
    ])('Flatten data', (test: DownTime[], expected: FormatedChartData[]) => {
        const flattenedData = flattenData(test);
        expect(flattenedData).toEqual(expected);
    });
});

describe('useAvailabilityChartChartLogic', () => {
    it.each([
        [
            {
                downtimes: [
                    { downSince: 12 },
                    { downTill: 14 },
                    { downSince: 15, downTill: 20 },
                ],
                isActive: true,
            },
            {
                points: [
                    {
                        x: MOCKED_CURRENT_TIME - DATE_RANGE,
                        y: 1,
                    } as AvailabilityChartPoint,
                    { x: 12, y: 1 } as AvailabilityChartPoint,
                    { x: 12, y: 0 } as AvailabilityChartPoint,
                    { x: 14, y: 0 } as AvailabilityChartPoint,
                    { x: 14, y: 1 } as AvailabilityChartPoint,
                    { x: 15, y: 1 } as AvailabilityChartPoint,
                    { x: 15, y: 0 } as AvailabilityChartPoint,
                    { x: 20, y: 0 } as AvailabilityChartPoint,
                    { x: 20, y: 1 } as AvailabilityChartPoint,
                    { x: MOCKED_CURRENT_TIME, y: 1 } as AvailabilityChartPoint,
                ],
            },
        ],
    ])('should return formated data for chart', async (test, expected) => {
        const { result } = renderHook(async () =>
            useAvailabilityChartLogic(test),
        );

        const { data } = await result.current;

        await waitFor(async () => {
            const { data } = await result.current;

            expect(data).toEqual(
                createDataObject(expected.points, GlobalColorsEnum.BrightGreen),
            );
        });
    });
});

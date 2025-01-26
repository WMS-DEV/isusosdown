import { render, screen } from '@testing-library/react';
import { ServiceTile } from './ServiceTile';
jest.mock('react-chartjs-2', () => ({
    Chart: () => null,
}));

describe('Service Tile', () => {
    it.each([
        [
            {
                title: 'jsos',
                uptime: 90,
                lastDowntimeEndDate: 123,
                downtimes: [
                    { downSince: 80, downTill: 123 },
                    { downSince: 140 },
                    { downTill: 170 },
                ],
                isActive: true,
            },
            {
                title: 'jsos',
                statusText: 'status: aktywny',
                uptimeText: 'uptime: 90%',
                downtimeText: 'rozpoczęcie awarii',
            },
        ],
    ])(
        'should render active service tile with info about availability',
        (test, expected) => {
            render(<ServiceTile serviceData={test} />);
            expect(screen.getByText(expected.title)).toBeInTheDocument();
            expect(screen.getByText(expected.statusText)).toBeInTheDocument();
            expect(screen.getByText(expected.uptimeText)).toBeInTheDocument();
            expect(
                screen.queryByText(new RegExp(expected.downtimeText, 'i')),
            ).not.toBeInTheDocument();
        },
    );
    it.each([
        [
            {
                title: 'eportal eportal eportal',
                uptime: 20,
                downSince: 230,
                lastDowntimeEndDate: 123,
                downtimes: [
                    { downTill: 123 },
                    { downSince: 140, downTill: 202 },
                    { downSince: 230 },
                ],
                isActive: false,
            },
            {
                title: 'eportal eportal eportal',
                statusText: 'status: nieaktywny',
                uptimeText: 'uptime: 20%',
                downtimeText: 'rozpoczęcie awarii',
            },
        ],
    ])(
        'should render not active service tile with info about availability',
        (test, expected) => {
            render(<ServiceTile serviceData={test} />);
            expect(screen.getByText(expected.title)).toBeInTheDocument();
            expect(screen.getByText(expected.statusText)).toBeInTheDocument();
            expect(screen.getByText(expected.uptimeText)).toBeInTheDocument();
            expect(
                screen.getByText(new RegExp(expected.downtimeText, 'i')),
            ).toBeInTheDocument();
        },
    );
});

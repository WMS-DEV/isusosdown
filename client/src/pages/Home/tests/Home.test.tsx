import {
  formatServices,
  updateServicesUponWebsocketMessage,
} from '../useHomeLogic';
import { IMessage } from '@stomp/stompjs';
import { getTimeAndOrDate } from '../../../lib/dateFormatting';

describe('Websocket updates', () => {
  it.each([
    [
      {
        oldState: [
          {
            title: 'JSOS',
            lastDowntimeEndDate: 123,
            uptime: 90,
            isActive: true,
            downtimes: [{ downSince: 123 }, { downTill: 345 }],
          },
        ],
        message: {
          body: JSON.stringify({ service: 'JSOS', downSince: 376 }),
        },
      },
      [
        {
          title: 'JSOS',
          uptime: 90,
          downSince: 376,
          lastDowntimeEndDate: 123,
          downSinceDate: getTimeAndOrDate(376),
          isActive: false,
          downtimes: [
            { downSince: 123 },
            { downTill: 345 },
            { downSince: 376 },
          ],
        },
      ],
    ],
    [
      {
        oldState: [
          {
            title: 'JSOS',
            lastDowntimeEndDate: 123,
            uptime: 90,
            isActive: true,
            downtimes: [{ downSince: 123, downTill: 345 }],
          },
        ],
        message: {
          body: JSON.stringify({ service: 'JSOS', downSince: 376 }),
        },
      },
      [
        {
          title: 'JSOS',
          uptime: 90,
          downSince: 376,
          lastDowntimeEndDate: 123,
          downSinceDate: getTimeAndOrDate(376),
          isActive: false,
          downtimes: [{ downSince: 123, downTill: 345 }, { downSince: 376 }],
        },
      ],
    ],
    [
      {
        oldState: [
          {
            title: 'eportal',
            uptime: 87,
            lastDowntimeEndDate: 123,
            isActive: false,
            downtimes: [
              { downSince: 123, downTill: 200 },
              { downSince: 345000 },
            ],
          },
        ],
        message: {
          body: JSON.stringify({
            service: 'eportal',
            downTill: 376000,
          }),
        },
      },
      [
        {
          title: 'eportal',
          uptime: 87,
          lastDowntimeEndDate: 123,
          isActive: true,
          downtimes: [
            { downSince: 123, downTill: 200 },
            { downSince: 345000, downTill: 376000 },
          ],
        },
      ],
    ],
    [
      {
        oldState: [
          {
            title: 'eportal',
            uptime: 87,
            lastDowntimeEndDate: 123,
            isActive: false,
            downtimes: [
              { downSince: 123, downTill: 200 },
              { downSince: 345000 },
            ],
          },
        ],
        message: {
          body: JSON.stringify({
            service: 'eportal',
            downTill: 376000,
            downSince: 345000,
          }),
        },
      },
      [
        {
          title: 'eportal',
          uptime: 87,
          lastDowntimeEndDate: 123,
          isActive: true,
          downtimes: [
            { downSince: 123, downTill: 200 },
            { downSince: 345000, downTill: 376000 },
          ],
        },
      ],
    ],
  ])(
    'should update existing service upon websocket message',
    (test, expected) => {
      expect(
        updateServicesUponWebsocketMessage(test.message as unknown as IMessage)(
          test.oldState,
        ),
      ).toEqual(expected);
    },
  );

  it.each([
    [
      {
        oldState: [
          {
            title: 'eportal',
            uptime: 87,
            lastDowntimeEndDate: 123,
            isActive: false,
            downtimes: [{ downSince: 123, downTill: 200 }, { downSince: 345 }],
          },
        ],
        message: {
          body: JSON.stringify({ service: 'json', downTill: 376 }),
        },
      },

      [
        {
          title: 'eportal',
          uptime: 87,
          isActive: false,
          lastDowntimeEndDate: 123,
          downtimes: [{ downSince: 123, downTill: 200 }, { downSince: 345 }],
        },
      ],
    ],
  ])('should omit not existing service', (test, expected) => {
    expect(
      updateServicesUponWebsocketMessage(test.message as unknown as IMessage)(
        test.oldState,
      ),
    ).toEqual(expected);
  });
});

describe('format services', () => {
  it.each([
    [
      [
        {
          title: 'jsos',
          uptime: 80,
          lastDowntimeEndDate: 123,

          downSince: 80,
          downtimes: [{ downTill: 70 }],
        },
        {
          title: 'eportal',
          uptime: 90,
          lastDowntimeEndDate: 123,

          downSince: 100,
          downtimes: [{ downSince: 80, downTill: 90 }],
        },
      ],
      [
        {
          title: 'jsos',
          uptime: 80,
          downSince: 80,
          lastDowntimeEndDate: 123,

          isActive: false,
          downSinceDate: getTimeAndOrDate(80),
          downtimes: [{ downTill: 70 }, { downSince: 80 }],
        },
        {
          title: 'eportal',
          uptime: 90,
          lastDowntimeEndDate: 123,

          isActive: false,
          downSinceDate: getTimeAndOrDate(100),
          downSince: 100,
          downtimes: [{ downSince: 80, downTill: 90 }, { downSince: 100 }],
        },
      ],
    ],
  ])('should format failing services', (test, expected) => {
    expect(formatServices(test, false)).toEqual(expected);
  });

  it.each([
    [
      [
        {
          title: 'jsos',
          uptime: 80,
          lastDowntimeEndDate: 123,

          downtimes: [{ downTill: 70 }],
        },
        {
          title: 'eportal',
          lastDowntimeEndDate: 123,

          uptime: 90,
          downtimes: [{ downSince: 80, downTill: 90 }],
        },
      ],
      [
        {
          title: 'jsos',
          uptime: 80,
          lastDowntimeEndDate: 123,

          isActive: true,
          downtimes: [{ downTill: 70 }],
        },
        {
          title: 'eportal',
          uptime: 90,
          lastDowntimeEndDate: 123,

          isActive: true,
          downtimes: [{ downSince: 80, downTill: 90 }],
        },
      ],
    ],
  ])('should format working services', (test, expected) => {
    expect(formatServices(test, true)).toEqual(expected);
  });
});

// describe("useHomeLogic", () => {
//   it.each([
//     [
//       {
//         downServices: [
//           {
//             title: "jsos",
//             uptime: 90,
//             downSince: 150,
//             downtimes: [{ downSince: 120, downTill: 130 }],
//           },
//           {
//             title: "eportal",
//             uptime: 87,
//             downSince: 160,
//             downtimes: [{ downSince: 140, downTill: 150 }],
//           },
//           {
//             title: "usos",
//             uptime: 80,
//             downSince: 190,
//             downtimes: [{ downSince: 160, downTill: 170 }],
//           }
//         ],
//         runningServices: [
//           {
//             title: "moodle",
//             uptime: 90,
//             downtimes: [{ downSince: 120, downTill: 130 }],
//           },
//           {
//             title: "zoom",
//             uptime: 87,
//             downtimes: [{ downSince: 140, downTill: 150 }],
//           }
//         ],
//         meme: "test-meme",
//       },

//       {
//         services: [
//           {
//             title: "jsos",
//             uptime: 90,
//             downSince: 150,
//             downSinceDate: getDetailedDate(150),
//             isActive: false,
//             downtimes: [
//               { downSince: 120, downTill: 130 },
//               { downSince: 150 },
//             ],
//           },
//           {
//             title: "eportal",
//             uptime: 87,
//             downSince: 160,
//             downSinceDate: getDetailedDate(160),
//             isActive: false,
//             downtimes: [
//               { downSince: 140, downTill: 150 },
//               { downSince: 160 },
//             ],
//           },
//           {
//             title: "usos",
//             uptime: 80,
//             downSince: 190,
//             downSinceDate: getDetailedDate(190),
//             isActive: false,
//             downtimes: [
//               { downSince: 160, downTill: 170 },
//               { downSince: 190 },
//             ],
//           },
//           {
//             title: "moodle",
//             uptime: 90,
//             isActive: true,
//             downtimes: [{ downSince: 120, downTill: 130 }],
//           },
//           {
//             title: "zoom",
//             uptime: 87,
//             isActive: true,
//             downtimes: [{ downSince: 140, downTill: 150 }],
//           }

//         ],
//           meme: "test-meme",
//           }
//         ]
//     ])("should download initial services status", async (test, expected) => {
//     const mockAxiosGet = jest.spyOn(axios, "get");

//     mockAxiosGet.mockImplementation(async () => {
//       return { data: test };
//     });

//     const { result} = renderHook(() => useHomeLogic());

//     await waitFor(() => {
//       expect(result.current.services).toEqual(expected.services);
//       })
//   });
// });

import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import { ServiceDetailsPageLogic } from "../ServiceDetailsPageLogic";

describe("ServiceDetailsPage", () => {
  it.each([
    [
      {
        isActive: true,
        recordedDowntimes: 20,
        totalDowntimeMilis: 30,
        totalUptimeMilis: 40,
        averageDowntimeLengthMilis: 50,
        averageUptimeLengthMilis: 60,
        recordingStatsSinceMillis: 70,
        chart: {
          dateOfDowntimes: [1, 2, 3],
          numberOfDowntimes: [4, 5, 6],
        },
      },
      {
        isActive: true,
        recordedDowntimes: 20,
        totalDowntimeMilis: 30,
        totalUptimeMilis: 40,
        averageDowntimeLengthMilis: 50,
        averageUptimeLengthMilis: 60,
        recordingStatsSinceMillis: 70,
        chart: {
          dateOfDowntimes: [1, 2, 3],
          numberOfDowntimes: [4, 5, 6],
        },
      },
    ],
  ])("should download detailed services status", async (test, expected) => {
    const mockAxiosGet = jest.spyOn(axios, "get");

    mockAxiosGet.mockImplementation(async () => {
      return { data: test };
    });

    const { result } = renderHook(() => ServiceDetailsPageLogic("test"));

    await waitFor(() => {
      expect(result.current).toEqual(expected);
    });
  });
});

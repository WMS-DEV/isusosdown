import { render, screen, within } from "@testing-library/react";
import { generateListOfMockDetailedStats } from "../../../../../lib/mock-utils";
import { DetailedStatsTile } from "../DetailedStatsTile/DetailedStats";
import { IServiceDetailsData } from "../../../ServiceDetailsPage";

describe("DetailedStatsTile", () => {
  it.each(generateListOfMockDetailedStats(10).map((data) => [data]))(
    "should render correctly",
    (data) => {
      render(
        <DetailedStatsTile
          serviceData={data as unknown as IServiceDetailsData}
        />
      );
      const averageDowntime = screen.getByTestId(
        "detailed-stats-average-downtime-line"
      );
      const averageUptime = screen.getByTestId(
        "detailed-stats-average-uptime-line"
      );
      const totalUptime = screen.getByTestId("detailed-stats-total-uptime-line");

      expect(
        within(averageDowntime).getByText("Średnia długość awarii:")
      ).toBeInTheDocument();
    //   expect(
    //     within(averageDowntime).getByText(data.averageDowntimeLengthMilis)
    //   ).toBeInTheDocument();

      expect(
        within(averageUptime).getByText("Średnia długość działania:")
      ).toBeInTheDocument();

    //   expect(
    //     within(averageUptime).getByText(data.averageUptimeLengthMilis)
    //   ).toBeInTheDocument();

      expect(
        within(totalUptime).getByText("Łączny czas działania:")
      ).toBeInTheDocument();

    //   expect(
    //     within(totalUptime).getByText(data.totalUptimeMilis)
    //   ).toBeInTheDocument();
    }
  );
});

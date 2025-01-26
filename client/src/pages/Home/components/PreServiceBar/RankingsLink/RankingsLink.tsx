import { MaterialIcon } from "../../../../../components/MaterialIcon/MaterialIcon"
import { RankingText, RankingsNavigation } from "./RankingsLink.style"
import { rankingsLinkStyle } from "../../../../Rankings/components/RankingChart/RankingChart.style"

export const RankingsLink = () => {
    return (
        <RankingsNavigation to="/rankings">
            <RankingText>
                Rankingi
            </RankingText>
            <MaterialIcon iconName={"query_stats"} color={rankingsLinkStyle.color} />
        </RankingsNavigation>
    )
}

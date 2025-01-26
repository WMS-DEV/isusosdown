import styled from "styled-components"
import { MaterialIcon } from "../../../../../components/MaterialIcon/MaterialIcon"
import { NavLink } from "react-router-dom"

export const MaterialQueryStatsIcon = () => {
  <MaterialIcon iconName={"query_stats"} color={"white"}/>
}

export const RankingsNavigation = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    margin-left: 5rem;
    `
export const RankingText = styled.div`
    margin-right: 10px;
    font-size: 16px;
    font-weight: 500;
    color: white;
`

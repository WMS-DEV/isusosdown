import { ListShuffler } from "../../../../components/ListShuffler/ListShuffler"

export const ServiceRankingShuffler = (props: { children: React.ReactNode }) => {
  return <ListShuffler rowHeight={40} totalHeightMultiplier={2}>
    {props.children}
  </ListShuffler >
}
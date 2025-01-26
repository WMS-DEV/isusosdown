import React from "react";
import { useTransition } from "@react-spring/web";
import { ShuffledRow, ShufflerContainer } from "./ListShuffler.style";

interface ListShufflerProps {
  children: React.ReactNode;
  rowHeight: number;
  totalHeightMultiplier: number;
}

export const ListShuffler = (props: ListShufflerProps) => {
  let height = 0;
  const transitions = useTransition(
    React.Children.toArray(props.children).map((data, index) => ({
      ...(data as React.ReactElement),
      height: props.rowHeight,
      y: (height += props.rowHeight) - props.rowHeight,
    })),
    {
      key: (item: React.ReactElement) => {
        return item.props.serviceRankingData.serviceName;
      },
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height }),
    },
  );

  return (
    <ShufflerContainer
      height={React.Children.count(props.children) * props.rowHeight * props.totalHeightMultiplier}>
      {transitions((style, item, t, index) => (
        <ShuffledRow
          height={props.rowHeight}
          style={{
            ...style,
          }}
        >
          {React.Children.toArray(props.children)[index]}
        </ShuffledRow>
      ))}
    </ShufflerContainer>
  );
};

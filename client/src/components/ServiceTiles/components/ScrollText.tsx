import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { GlobalMediaQueries } from '../../../assets/globalMediaQueries';

type ScrollTextProps = {
  children: string;
};

const scrollAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(var(--scroll-diff));
  }
  100% {
    transform: translateX(0);
  }
`;

const ScrollContainer = styled.div`
  width: 270px;
  overflow-x: hidden;

  @media screen and (min-width: ${GlobalMediaQueries.Mobile}) {
    width: 100px;
  }

  @media screen and (min-width: ${GlobalMediaQueries.Laptop}) {
    width: 22vw;
  }

  @media screen and (min-width: ${GlobalMediaQueries.HighResolution}) {
    width: 600px;
  }
`;

const ScrollTextContent = styled.div`
  white-space: nowrap;
  padding: 0;
  width: 99%;
  animation: ${scrollAnimation} 8s linear infinite;
`;

export const ScrollText = ({ children }: ScrollTextProps) => {
  const innerParagraph = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerParagraph.current) {
      const diff =
        innerParagraph.current.scrollWidth - innerParagraph.current.offsetWidth;
      innerParagraph.current.style.setProperty('--scroll-diff', `-${diff}px`);
    }
  }, []);

  return (
    <ScrollContainer>
      <ScrollTextContent ref={innerParagraph}>{children}</ScrollTextContent>
    </ScrollContainer>
  );
};

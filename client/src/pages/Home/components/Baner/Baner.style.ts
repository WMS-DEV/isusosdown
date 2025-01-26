import styled from 'styled-components';
import gradient from '../../../../assets/backgrounds/wms-dev-original-cubism-gradient.webp';
import { fadeInFromBot } from '../../../../components/Animations/fadeIns';
import { navBarHeightInVH } from '../../../../components/NavBar/NavBar.style';
import { GlobalMediaQueries } from '../../../../assets/globalMediaQueries';
import { GlobalColorsEnum } from '../../../../assets/globalStyleVariables';

export const BanerContainer = styled.div`
  width: 100%;
  background-image: url(${gradient});
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  margin-top: ${1.5 + navBarHeightInVH}vh;
  font-size: 12vh;
  color: white;
  font-weight: 900;
  animation: ${fadeInFromBot} 0.5s ease-in-out forwards;
  display: inline-flex;
  align-items: baseline;

  @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
    font-size: 7.5vh;
  }
  @media screen and (max-width: ${GlobalMediaQueries.Mobile}) {
    font-size: 5vh;
  }
`;

interface QuestionMarkProps {
  isRotated: boolean;
}

export const QuestionMark = styled(Title) <QuestionMarkProps>`
  margin-top: 0;
  transform: rotate(${(props) => (props.isRotated ? '20deg' : '0deg')});
  animation: 0;
  cursor: pointer;
`;

export const QuoteContainer = styled.div`
  font-style: italic;
  padding: 1vh 1vw;
  height: auto;
  width: 60vw;
  text-align: center;
  animation: ${fadeInFromBot} 1s ease-in-out forwards;
    @media screen and (max-width: ${GlobalMediaQueries.Tablet}) {
        width: 100vw;
    }
}
    
`;

export const Quote = styled.p`
    margin: auto;
    font-size: 1rem;
    color: ${GlobalColorsEnum.MainText}; 
    font-style: italic;
    font-weight: 500; 
    text-align: center; 
    line-height: 1.5; 
    height: 10vh;
    
    @media screen and (min-width: ${GlobalMediaQueries.Tablet}) {
        font-size: 3vh;
    }
    
    @media screen and (max-width: ${GlobalMediaQueries.Mobile}) {
        display: none;
    }
    
    }
`;
//Arrow icon in-line style object
export const arrowIconStyle = {
  color: 'white',
  height: '3vh',
  width: '3vw',
  marginBottom: '4vh',
};

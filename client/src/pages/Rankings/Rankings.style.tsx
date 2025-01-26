import styled from 'styled-components';
import { GlobalColorsEnum } from '../../assets/globalStyleVariables';
import gradient from '../../assets/backgrounds/wms-dev-original-cubism-gradient.webp';
import { navBarHeightInVH } from '../../components/NavBar/NavBar.style';
import { GlobalMediaQueries } from '../../assets/globalMediaQueries';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: ${100 - navBarHeightInVH - 10}vh;
`;

export const CategoryContainer = styled.div`
  background-color: ${GlobalColorsEnum.LightGray};
  border-radius: 2rem;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  column-gap: 1rem;
  row-gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
  margin: 0.5rem;
  position: relative;

  @media (max-width: ${GlobalMediaQueries.Mobile}) {
    width: 100%;
  }
`;

export const CategoryChartContainer = styled(CategoryContainer)`
  margin-bottom: 2rem;
`;

export const CategoryButton = styled.button<{
  active: boolean;
}>`
  background-color: ${GlobalColorsEnum.LightPurple};
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  text-align: center;
  border-radius: 1rem;
  border-style: solid;
  border-width: 0.5rem;
  border-color: transparent;
  white-space: nowrap;
  flex-grow: 1;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  column-gap: 3%;
  flex-wrap: wrap;
  row-gap: 1rem;
`;

export const ScoreCategoryButton = styled(CategoryButton)`
  background-color: ${GlobalColorsEnum.LightYellow};
  color: ${GlobalColorsEnum.DarkGray};
`;

export const Banner = styled.div`
  width: 100%;
  height: 10vh;
  background-image: url(${gradient});
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 3rem;
  font-weight: 600;
`;

export const ContainerLabel = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: 7%;
  padding-top: 2vh;
  padding-bottom: 2vh;
  margin: auto;
`;

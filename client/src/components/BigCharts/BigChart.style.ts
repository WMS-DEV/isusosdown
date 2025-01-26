import styled from 'styled-components';
import { Chart } from 'react-chartjs-2';
import { FontsEnum, GlobalColorsEnum } from '../../assets/globalStyleVariables';

export const ChartContainer = styled.div`
    width: 100%;
    height: 40vh;
    background-color: #282828;
    flex-grow: 2;
    border-radius: 20px;
    padding: 1vh 1vw 1vh 1vw;
`;

export const LinearChart = styled(Chart)``;

export const defaultFont = {
    weight: 'bold',
    family: `${FontsEnum.Title}`,
};

export const titleStyle = {
    color: GlobalColorsEnum.MainText,
    font: {
        size: 25,
        ...defaultFont,
    },
};

export const xGridStyle = {
    borderColor: GlobalColorsEnum.MainText,
    color: GlobalColorsEnum.Transparent,
};

export const yGridStyle = {
    borderColor: GlobalColorsEnum.MainText,
};

export const ticksStyle = {
    color: GlobalColorsEnum.MainText,
    font: {
        size: 14,
        ...defaultFont,
    },
};

export const lineStyle = {
    borderColor: GlobalColorsEnum.AccentPink,
};

export const pointStyle = {
    borderColor: GlobalColorsEnum.AccentViolet,
    backgroundColor: GlobalColorsEnum.AccentViolet,
    borderWidth: 0,
    radius: 0,
};

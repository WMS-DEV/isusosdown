import React, { useState } from "react";
import { RankingCategories } from "../../types/main.types";
import {
    CategoryContainer,
    MainContainer,
    ContainerLabel, CategoryChartContainer,
} from "./Rankings.style";
import { Slider } from "./components/Slider/Slider";
import { RankingChart } from "./components/RankingChart/RankingChart";
import { CategoryButtonsContainer } from "./components/CategoryButtonsContainer/CategoryButtonsContainer";
import { BannerContainer, Title } from "../../components/Baner/Baner.style"

const MOCK_MIN_DATE = new Date("01/01/2023 16:00:00").getTime(); // some mock date
const MOCK_MAX_DATE = Date.now(); // some mock date

export const Rankings = () => {
    const [rankingCategory, setRankingCategory] = useState<RankingCategories>(
        RankingCategories.downtimes,
    );
    const [startDateMs, setStartDate] = useState<number>(MOCK_MIN_DATE);
    const [endDateMs, setEndDate] = useState<number>(MOCK_MAX_DATE);


    return (
        <>
            <MainContainer>
                <BannerContainer>
                    <Title>
                        Rankingi
                    </Title>
                </BannerContainer>
                <ContainerLabel>Kategorie</ContainerLabel>
                <CategoryButtonsContainer
                    rankingCategory={rankingCategory}
                    setRankingCategory={setRankingCategory} />
                <ContainerLabel>Zakres czasu</ContainerLabel>
                <CategoryContainer>
                    <Slider
                        minValue={MOCK_MIN_DATE}
                        maxValue={MOCK_MAX_DATE}
                        lowerValue={startDateMs}
                        upperValue={endDateMs}
                        onUpperChange={setEndDate}
                        onLowerChange={setStartDate}
                    />
                </CategoryContainer>
                <CategoryChartContainer>
                    <RankingChart
                        startDate={startDateMs}
                        endDate={endDateMs}
                        rankingCategory={rankingCategory}
                    />
                </CategoryChartContainer>
            </MainContainer>
        </>
    );
};

import React from "react"
import { RankingCategories } from "../../../../types/main.types"
import { ButtonsContainer, CategoryButton, CategoryContainer, ScoreCategoryButton } from "../../Rankings.style";

interface CategoryButtonsContainerProps {
  rankingCategory: RankingCategories;
  setRankingCategory: (arg: RankingCategories) => void
}
export const CategoryButtonsContainer = ({ rankingCategory, setRankingCategory }: CategoryButtonsContainerProps) => {
  return <CategoryContainer>
    <ButtonsContainer>
      <CategoryButton
        active={rankingCategory === RankingCategories.downtimes}
        onClick={() => setRankingCategory(RankingCategories.downtimes)}
      >
        Przestoje
      </CategoryButton>
      <CategoryButton
        active={rankingCategory === RankingCategories.totalDuration}
        onClick={() => setRankingCategory(RankingCategories.totalDuration)}
      >
        Całkowity czas przestojów
      </CategoryButton>
      <CategoryButton
        active={rankingCategory === RankingCategories.averageDuration}
        onClick={() => setRankingCategory(RankingCategories.averageDuration)}
      >
        Średni czas przestoju
      </CategoryButton>
      <ScoreCategoryButton
        active={rankingCategory === RankingCategories.score}
        onClick={() => setRankingCategory(RankingCategories.score)}
      >
        Wynik
      </ScoreCategoryButton>
    </ButtonsContainer>
  </CategoryContainer>

}

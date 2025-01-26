import {
    BanerContainer,
    Title,
    QuoteContainer,
    Quote,
    QuestionMark,
} from './Baner.style';
import { ServiceData } from '../../../../types/main.types';
import { UsosTile } from '../../../../components/ServiceTiles/UsosTile';
import { useState } from 'react';
import { LoadingUsosTile } from '../../../../components/Loaders/LoadingUsosTile';

interface BanerProps {
    usosData: ServiceData;
    jsosMeme: string;
}

export const Baner = (props: BanerProps) => {
    const [isQuestionMarkRotated, setIsQuestionMarkRotated] = useState(true);

    const handleQuestionMarkClick = () => {
        setIsQuestionMarkRotated((isQuestionMarkRotated) => !isQuestionMarkRotated);
    };

    return (
        <>
            <BanerContainer>
                <Title>
                    isUSOSDown
                    <QuestionMark
                        isRotated={isQuestionMarkRotated}
                        onClick={handleQuestionMarkClick}
                    >
                        ?
                    </QuestionMark>
                </Title>

                <QuoteContainer>

                    {props.jsosMeme ? <Quote>" {props.jsosMeme} "</Quote> : <></>}

                </QuoteContainer>

                {props.usosData ? (
                    <UsosTile usosData={props.usosData}></UsosTile>
                ) : (
                    <LoadingUsosTile />
                )}
            </BanerContainer>
        </>
    );
};

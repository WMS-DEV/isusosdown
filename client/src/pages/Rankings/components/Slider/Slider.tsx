import React from 'react';
import {
  MainSliderContainer,
  MaxSlider,
  MinSlider,
  SliderContainer,
  SliderLabel,
  SliderLabelsContainer,
} from './Slider.style';
import { formatMsToYYYYMMDD } from '../../../../utils/formatMsToDHM';

interface SliderProps {
  minValue: number;
  maxValue: number;
  lowerValue: number;
  upperValue: number;
  onLowerChange: (value: number) => void;
  onUpperChange: (value: number) => void;
}

const SLIDER_PRECISION = 20;

const getSliderUnit = (
  min: number,
  max: number,
  precision: number = SLIDER_PRECISION,
) => {
  return (max - min) / precision;
};

const translateValueToSliderPosition = (
  value: number,
  min: number,
  max: number,
  precision: number = SLIDER_PRECISION,
) => {
  return (value - min) / getSliderUnit(min, max, precision);
};

const translateSliderPositionToValue = (
  position: number,
  min: number,
  max: number,
  precision: number = SLIDER_PRECISION,
) => {
  return position * getSliderUnit(min, max, precision) + min;
};

export const Slider = ({
  minValue,
  maxValue,
  lowerValue,
  upperValue,
  onLowerChange,
  onUpperChange,
}: SliderProps) => {
  const [minPosition, setMinPosition] = React.useState<number>(
    translateValueToSliderPosition(minValue, minValue, maxValue),
  );

  const [maxPosition, setMaxPosition] = React.useState<number>(
    translateValueToSliderPosition(maxValue, minValue, maxValue),
  );

  const [lowerValuePosition, setLowerValuePosition] = React.useState<number>(
    translateValueToSliderPosition(lowerValue, minValue, maxValue),
  );

  const [upperValuePosition, setUpperValuePosition] = React.useState<number>(
    translateValueToSliderPosition(upperValue, minValue, maxValue),
  );

  const [isSliding, setIsSliding] = React.useState(false);

  React.useEffect(() => {
    setMinPosition(
      translateValueToSliderPosition(minValue, minValue, maxValue),
    );
    setMaxPosition(
      translateValueToSliderPosition(maxValue, minValue, maxValue),
    );
  }, [minValue, maxValue]);

  React.useEffect(() => {
    setLowerValuePosition(
      translateValueToSliderPosition(lowerValue, minValue, maxValue),
    );
    setUpperValuePosition(
      translateValueToSliderPosition(upperValue, minValue, maxValue),
    );
  }, [lowerValue, upperValue, minValue, maxValue]);

  React.useEffect(() => {
    if (!isSliding) {
      onLowerChange(
        translateSliderPositionToValue(lowerValuePosition, minValue, maxValue),
      );
      onUpperChange(
        translateSliderPositionToValue(upperValuePosition, minValue, maxValue),
      );
    }
  }, [isSliding]);

  const handleSlidingStart = () => {
    setIsSliding(true);
  };

  const handleSlidingStop = () => {
    setIsSliding(false);
  };

  const handleLowerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLowerValuePosition = parseInt(event.target.value);
    if (newLowerValuePosition < upperValuePosition - 1) {
      setLowerValuePosition(newLowerValuePosition);
    }
  };

  const handleUpperChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUpperValuePosition = parseInt(event.target.value);
    if (newUpperValuePosition > lowerValuePosition + 1) {
      setUpperValuePosition(newUpperValuePosition);
    }
  };

  return (
    <MainSliderContainer>
      <SliderLabelsContainer>
        <SliderLabel position={(upperValuePosition * 98) / maxPosition}>
          {formatMsToYYYYMMDD(upperValue)}
        </SliderLabel>
      </SliderLabelsContainer>
      <SliderContainer>
        <MinSlider
          type="range"
          onPointerDown={handleSlidingStart}
          onPointerUp={handleSlidingStop}
          min={minPosition}
          max={maxPosition}
          value={lowerValuePosition}
          onChange={handleLowerChange}
        />
        <MaxSlider
          type="range"
          onPointerDown={handleSlidingStart}
          onPointerUp={handleSlidingStop}
          min={minPosition}
          max={maxPosition}
          value={upperValuePosition}
          fromPosition={lowerValuePosition - minPosition}
          toPosition={upperValuePosition - minPosition}
          range={maxPosition - minPosition}
          onChange={handleUpperChange}
        />
      </SliderContainer>
      <SliderLabelsContainer>
        <SliderLabel position={(lowerValuePosition * 98) / maxPosition}>
          {formatMsToYYYYMMDD(lowerValue)}
        </SliderLabel>
      </SliderLabelsContainer>
    </MainSliderContainer>
  );
};

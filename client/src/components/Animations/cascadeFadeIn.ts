import {fadeIn} from "./fadeIns";
import {css} from "styled-components";

export const cascadeFadeAnimation = (index:number) => {
    const animationDelay = index/10 + 0.1 + 0.1;

    const animationString = css`
        ${fadeIn} 0.8s ease-in-out ${animationDelay}s forwards
    `;

    return animationString;
}
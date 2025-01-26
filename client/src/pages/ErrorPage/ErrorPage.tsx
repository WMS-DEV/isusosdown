import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground"
import ErrorContainer from "./components/ErrorContainer/ErrorContainer";
import {ErrorPageWrapper} from "./ErrorPage.style";
import {SlimFooter} from "../../components/Footer/SlimFooter";


export const ErrorPage = () => {

    return (
        <ErrorPageWrapper>
            <AnimatedBackground/>
            <ErrorContainer/>
        </ErrorPageWrapper>
    )
}





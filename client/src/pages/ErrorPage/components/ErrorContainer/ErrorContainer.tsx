import React from 'react';
import {Link} from "react-router-dom";
import {
    ErrorButtonsWrapper,
    ErrorCode,
    ErrorContainerMessage,
    ErrorButton, ErrorContainerWrapper,
    ErrorDescription, ErrorButtonLabel,
} from "./ErrorContainer.style";


const ErrorContainer = () => {
    return (
        <ErrorContainerWrapper>
            <ErrorContainerMessage>
                <ErrorCode>
                    404
                </ErrorCode>
                <ErrorDescription>
                    Coś poszło nie tak? :( <br/>
                    Sprawdź czy adres strony jest poprawny lub wróć na stronę główną.
                </ErrorDescription>
                <ErrorButtonsWrapper>
                    <Link to="/">
                        <ErrorButton>
                            <ErrorButtonLabel>
                                STRONA GŁÓWNA
                            </ErrorButtonLabel>
                        </ErrorButton>
                    </Link>
                </ErrorButtonsWrapper>
            </ErrorContainerMessage>
        </ErrorContainerWrapper>

    );
};


export default ErrorContainer;
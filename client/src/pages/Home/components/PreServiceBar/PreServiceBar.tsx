import {PreServiceBarContainer} from "./PreServiceBar.style";
import {ConnectingIcon, LiveIcon, WebSocketStatus} from "./WebSocketStatus/WebSocketStatus.style";
import {CsvDownloadContainer} from "./CsvDownload/CsvDownloadContainer";
import React from "react";

export const PreServiceBar = (props: {
    websocketConnected: boolean,
    lastUpdateTime: string,
    websocketConnecting: boolean
}) => {

    return (
        <>
            <PreServiceBarContainer>

                <WebSocketStatus>
                    Aktualność danych: {props.websocketConnected ? (<>na
                    żywo <LiveIcon/></>) : (props.websocketConnecting ? <>łączenie z serwerem Live <ConnectingIcon/></> : props.lastUpdateTime)}
                </WebSocketStatus>

                <CsvDownloadContainer/>
            </PreServiceBarContainer>;
        </>)
}
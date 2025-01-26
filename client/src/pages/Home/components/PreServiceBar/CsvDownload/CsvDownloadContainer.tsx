import {DownloadImg, CsvText} from "./CsvDownloadContainer.style";
import {downloadCsvFile} from "../../../../../lib/downloadCsv";
import downloadIcon from "../../../../../assets/icons/downloadIcon.svg"

export const CsvDownloadContainer = () => {

    return (
        <>
            <CsvText onClick={downloadCsvFile}>
                Pobierz wszystkie dane w formacie .csv
                <DownloadImg src={downloadIcon}/>
            </CsvText>
        </>
    )
}
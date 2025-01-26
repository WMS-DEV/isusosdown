import axios from "axios";
import {url} from "./fetch";
import config from '../config.json'

const endpoint = "/csv-data/"

export async function downloadCsvFile() {

    const exportData = (data: BlobPart, fileName: string, type: string) => {
        const blob = new Blob([data], {type});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    await axios({
            url: url + endpoint,
            method: 'GET',
            responseType: 'blob'
        }
    ).then(response => {
        const csvData = response.data;
        exportData(csvData, `${config.csvFileName}.csv`, 'text/csv;charset=utf-8;');
    })
        .catch(error => {
            console.error(error);
        });
}
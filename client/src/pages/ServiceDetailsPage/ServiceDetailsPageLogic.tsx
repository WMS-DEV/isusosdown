import {useEffect, useState} from "react";
import {IServiceDetailsData} from "./ServiceDetailsPage"
import {getAdditionalStats} from "../../lib/fetch";


export const ServiceDetailsPageLogic = (serviceName : string) => {

    const [serviceData, setServiceData] = useState<IServiceDetailsData>();

    useEffect(() => {

        getAdditionalStats(serviceName).then((receivedData: IServiceDetailsData) =>{
            setServiceData(receivedData)
        })
    }, []);

    return serviceData;
}
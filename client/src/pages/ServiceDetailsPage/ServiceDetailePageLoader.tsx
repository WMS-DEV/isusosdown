import {Gradient, ServiceDetailsBackground, TilesWrapper} from "./ServiceDetailsPage.style";
import {NavBar} from "../../components/NavBar/NavBar";
import {Banner} from "./components/Banner";
import {Footer} from "../../components/Footer/Footer";
import {InactiveStatusTile} from "./components/Loaders/InactiveStatusTile";
import {TileLoader} from "./components/Loaders/TileLoader";
import {LoadingChart} from "./components/Charts/LoadingChart";
import {DetailedStatsTileLoader} from "./components/Loaders/DetailedStatsTileLoader";

interface ServiceDetailesPageLoaderProps{
    serviceName: string,
}

export const ServiceDetailePageLoader = ({serviceName} : ServiceDetailesPageLoaderProps) => {

    return(
        <>
            <ServiceDetailsBackground>

                <NavBar/>
                <Banner serviceName={serviceName}/>

                <Gradient>
                    <TilesWrapper>
                        <InactiveStatusTile/>
                        <TileLoader/>
                        <TileLoader/>
                        <TileLoader/>
                        <LoadingChart/>
                        <DetailedStatsTileLoader/>
                    </TilesWrapper>
                </Gradient>

            </ServiceDetailsBackground>

            <Footer/>
        </>
    )
}
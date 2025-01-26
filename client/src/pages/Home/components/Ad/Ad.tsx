import React, { useState, useEffect } from "react";
import { LinkWrapper} from "../../../../components/ServiceTiles/Tiles.style";
import {AdTileContainer} from "./Ad.style";
import image1 from '../../../../assets/ads/1.png';
import image2 from '../../../../assets/ads/2.png';
import image3 from '../../../../assets/ads/3.png';
import image4 from '../../../../assets/ads/4.png';


const images = [image1, image2, image3, image4];

const Ad = ({ link }: { link: string}) => {

    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        let imageIndex = 0;
        const interval = setInterval(() => {
            imageIndex = (imageIndex+1) % (images.length);
            setCurrentImage(images[imageIndex]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <LinkWrapper to={link}>
            <AdTileContainer image={currentImage} />
        </LinkWrapper>
    );
};

export default Ad;
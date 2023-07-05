import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const ReactSwiper = (props) => {

    const {options, children} = props;

    return (
        <Swiper {...options}>
            {children}
        </Swiper>
    )
}

export default ReactSwiper;
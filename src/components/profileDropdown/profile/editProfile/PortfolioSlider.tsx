import { CancelRounded } from "@mui/icons-material";
import ReactSwiper from "components/common/reactSwiper/ReactSwiper";
import { SwiperOptions } from "swiper";
import { SwiperSlide } from 'swiper/react';

interface PortfolioSliderPropType {
    portfolioDetails: { preview: string; title: string; }[];
    removeFile?: (a: any) => void;
    isRemovable?: boolean;
}

const PortfolioSlider = (props: PortfolioSliderPropType) => {
    const { portfolioDetails, removeFile, isRemovable = false } = props;

    // Portfolio slider options 
    const porfolioSwiperOptions: SwiperOptions = {
        slidesPerView: 4,
        spaceBetween: 15,
        navigation: false,
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            1440: {
                slidesPerView: 3,
            },
            1800: {
                slidesPerView: 4,
            }
        },
    };

    return (
        <>
            {<ReactSwiper options={porfolioSwiperOptions}>
                {portfolioDetails?.map((portfolio_item, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img
                            src={portfolio_item?.preview}
                            alt=""
                            className="max-w-full w-full max-h-[200px] h-full object-cover min-h-[200px] rounded drop-shadow relative overflow-hidden"
                        />
                        {isRemovable && <span
                            className="absolute top-2 right-2 rounded-full drop-shadow cursor-pointer"
                            onClick={() => removeFile(portfolio_item)}
                        >

                            <CancelRounded className="text-theme bg-white rounded-full" />
                        </span>}
                        <p className="break-all" >
                            {portfolio_item?.title.length > 30
                                ? `${portfolio_item?.title.slice(0, 30)}...`
                                : portfolio_item?.title}
                        </p>
                    </SwiperSlide>
                ))}
            </ReactSwiper>
            }
            {portfolioDetails?.length < 1 && (
                <div className="ParaGraphAboutMePrivateAbout">
                    <div className="paragraph-pAbout">
                        <span>No portfolio images to display</span>
                    </div>
                </div>
            )}
        </>
    )
}

export default PortfolioSlider;
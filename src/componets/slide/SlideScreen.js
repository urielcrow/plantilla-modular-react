import {useContext,useEffect, memo} from 'react';

import { Lazy, Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import {customeContext} from '../../context/context';
import './slide.css';

import image1 from'./img/african-lion-g9cc81dd21_1920.jpg';
import image2 from'./img/cat-gc1b6ec7b6_1920.jpg';
import image3 from'./img/tigers-g5503e3a97_1920.jpg';


const SlideScreen = memo(() => {

    const { setContext } = useContext(customeContext);

    useEffect(() => {
        setContext( context => (
            {   ...context,
                titlePage : 'Slide'
            })
        );
    },[setContext]);

    return (
        <div className="main-content">
            <div className="main-content-inner">

                <div className="row">
                    <div className="col-lg-12 mt-3">
                        <div className="card">
                            <div className ="card-body">
                                
                                <Swiper
                                    // install Swiper modules
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    onSwiper={(swiper) => console.log(swiper)}
                                    onSlideChange={() => console.log('slide change')}
                                    >
                                    <SwiperSlide>
                                        <img src={image1} alt="imagen 1"/>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={image2} alt="image2"/>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={image3} alt="image3"/>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={image1} alt="image4"/>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={image2} alt="image5"/>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img src={image3} alt="image6"/>
                                    </SwiperSlide>
                                    ...
                                </Swiper>

                                <div style={{width:'60%'}}>
                                    <Swiper
                                        style={{
                                        "--swiper-navigation-color": "#e8750b",
                                        "--swiper-pagination-color": "#e8750b",
                                        }}
                                        lazy={true}
                                        pagination={{clickable: true,}}
                                        navigation={true}
                                        modules={[Lazy, Pagination, Navigation, Scrollbar]}
                                        scrollbar={{ draggable: true }}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide>
                                        <img
                                            src={image1}
                                            className="swiper-lazy"
                                            alt="image7"
                                        />
                                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                        <img
                                            src={image2}
                                            className="swiper-lazy"
                                            alt="image8"
                                        />
                                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                        <img
                                            src={image3}
                                            className="swiper-lazy"
                                            alt="image9"
                                        />
                                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                        </SwiperSlide>
                                    
                                    </Swiper>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        
    )
})
export default SlideScreen;

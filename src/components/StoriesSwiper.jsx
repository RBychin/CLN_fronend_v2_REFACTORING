import { Swiper, SwiperSlide } from "swiper/react";
import {  } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/effect-fade';
import {useCallback, useEffect, useState} from "react";
import {postApiRequest} from "../utills/requests";
import {Config} from "../utills/config";


export const StoriesSwiper = ({ storyList, updateStories }) => {

    const [lineWidth, setLineWidth] = useState(1)

    const getLineWidth = useCallback(() => {
        const block = document.getElementById('storiesLine');
        setLineWidth(Math.min(Math.floor(block.offsetWidth / 95), storyList.length));
    },[storyList])

    useEffect(() => {
        getLineWidth()
        window.addEventListener('resize', getLineWidth);
        return () => window.removeEventListener('resize', getLineWidth)
    }, [getLineWidth]);


    const onClickStory = (url, id) => {
        const fetchData = async () => {
            await postApiRequest('/stories', {story: id})
            updateStories()
        }
        fetchData()
        Config.tgWindow.HapticFeedback.impactOccurred('light')
        window.open(url)
    }

    return (
        <Swiper
            modules={[]}
            slidesPerView={lineWidth - 0.3}
        >
            {storyList.map((content, index) => (
                <SwiperSlide key={content.id}>
                    <div onClick={() => {onClickStory(content.url, content.id)}}>
                        <div className={content.viewed?'story-card': 'story-card active'}
                             style={
                            {
                                backgroundImage: `url("${content.image}")`
                            }
                        }>
                            <div className='story-title'>{content.name}</div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}

        </Swiper>
    )
}
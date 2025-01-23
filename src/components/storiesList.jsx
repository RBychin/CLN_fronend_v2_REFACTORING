import {useEffect, useState} from "react";
import {getApiRequest} from "../utills/requests";
import {Config} from "../utills/config";
import {StoriesSwiper} from "./StoriesSwiper";
import {getStories} from "../utills/getInfo";

export const StoriesList = (props) => {

    const updateStories = async () => {
        getStories().then(r => props.setStories(r))
        };


    if (!props.stories) {
        return (<div>Загружаем...</div>)
    }

    return (
        <>
            {props.stories.length > 0 && (
                <>
                    <div className='flex vr-margin-10' id='storiesLine'>
                        {props.stories && <StoriesSwiper storyList={props.stories} updateStories={updateStories} />}
                    </div>
                </>
            )}

        </>
    );
};
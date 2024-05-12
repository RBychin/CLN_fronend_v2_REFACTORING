import React, {useEffect, useState} from 'react';
import {Config} from "../../utills/config";

const MySVGComponent = ({style, size, icon, color='#fff'}) => {

    if (icon === 'add_account') {
        return (
            <svg className={style} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.1" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" fill=""/>
                <path d="M9 12H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 9L12 15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke={color} strokeWidth="2"/>
            </svg>
        );
    }

    if (icon === 'settings') {
        return (
            <svg fill={color} width={size} height={size} viewBox="0 0 16 16" id="sliders-16px" xmlns="http://www.w3.org/2000/svg">
                <path id="Path_37" data-name="Path 37" d="M568-384v-1h1.5a.5.5,0,0,1,.5.5.5.5,0,0,1-.5.5Zm-13.5,0H566v1.5a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5v-4a.5.5,0,0,0-.5-.5.5.5,0,0,0-.5.5v1.5H554.5a.5.5,0,0,0-.5.5A.5.5,0,0,0,554.5-384Zm15,4.5H557v1h12.5a.5.5,0,0,0,.5-.5A.5.5,0,0,0,569.5-379.5Zm0,5.5H564v1h5.5a.5.5,0,0,0,.5-.5A.5.5,0,0,0,569.5-374Zm-6.5-1v-.5a.5.5,0,0,0-.5-.5.5.5,0,0,0-.5.5v1.5h-7.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5H562v1.5a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5Zm-7-6a.5.5,0,0,0-.5-.5.5.5,0,0,0-.5.5v1.5h-.5a.5.5,0,0,0-.5.5.5.5,0,0,0,.5.5h.5v1.5a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5Z" transform="translate(-554 387)"/>
            </svg>
        );
    }

    if (icon === 'payment') {
        return (
            <svg fill={color} width={size} height={size} viewBox="0 0 16 16" id="plus-circle-16px" xmlns="http://www.w3.org/2000/svg">
                <path id="Path_59" data-name="Path 59" d="M-13,0a8.009,8.009,0,0,0-8,8,8.009,8.009,0,0,0,8,8A8.009,8.009,0,0,0-5,8,8.009,8.009,0,0,0-13,0Zm0,15a7.008,7.008,0,0,1-7-7,7.008,7.008,0,0,1,7-7A7.008,7.008,0,0,1-6,8,7.008,7.008,0,0,1-13,15Zm5-7a.5.5,0,0,1-.5.5h-4v4a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5v-4h-4A.5.5,0,0,1-18,8a.5.5,0,0,1,.5-.5h4v-4A.5.5,0,0,1-13,3a.5.5,0,0,1,.5.5v4h4A.5.5,0,0,1-8,8Z" transform="translate(21)"/>
            </svg>
        );
    }


};

export default MySVGComponent;
import React, {useEffect, useState} from "react";
import styles from './index.module.css';
import {Config} from "../../utills/config";

const Switch = ({
    isActive,
    callback
                }) => {
    const [isSwitchedOn, setIsSwitchedOn] = useState(false);

    useEffect(() => {
        setIsSwitchedOn(isActive)
    }, []);

    const handleSwitchToggle = () => {
        setIsSwitchedOn(prevState => !prevState);
        if (!isSwitchedOn) {
            Config.HapticFeedback.light()
            callback(true)
        } else {
            Config.HapticFeedback.light()
            callback(false)
        }
    };

    return (
        <div className={`${styles['switch-btn']} ${isSwitchedOn ? styles['switch-on'] : ''}`} onClick={handleSwitchToggle}>
            {/* Можно добавить другие компоненты, например, метку или иконку */}
        </div>
    );
};

export default Switch;

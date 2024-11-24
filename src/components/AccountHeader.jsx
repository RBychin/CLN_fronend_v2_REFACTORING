import {Config} from "../utills/config";
import {useEffect, useState} from "react";

export const AccountHeader = (props) => {

    const [user, setUser] = useState(false);

    useEffect(() => {
        if (Config.tgWindow.initDataUnsafe.user) {
            setUser(Config.tgWindow.initDataUnsafe.user);
        }
    }, [user])

    return (

        <div className='grid'>
                        <span className='left-text'>
                            <div className='flex-start'>
                                <img
                                    src={user && user.photo_url ? `${user.photo_url}` : "https://yt3.ggpht.com/ytc/AKedOLR7md9PKMjXdxlzQYIucyaNaQtXG0LB7WbcQV8N=s900-c-k-c0x00ffffff-no-rj"}
                                    className='userimage' alt='User'
                                />
                                <p className='username'>{user.first_name}</p>
                            </div>
                        </span>
                         <span className='right-text'>

                        </span>
        </div>
    )
}
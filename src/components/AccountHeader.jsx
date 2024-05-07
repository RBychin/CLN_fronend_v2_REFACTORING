import {Config} from "../utills/config";

export const AccountHeader = (props) => {

    return (

        <div className='grid'>
                        <span className='left-text'>
                            <div className='flex-start'>
                                <img
                                    src={props.user ? `${props.user.image}` : "https://yt3.ggpht.com/ytc/AKedOLR7md9PKMjXdxlzQYIucyaNaQtXG0LB7WbcQV8N=s900-c-k-c0x00ffffff-no-rj"}
                                    className='userimage' alt='User'
                                />
                                {/*<img*/}
                                {/*    src={Config.user.photo_url}*/}
                                {/*    className='userimage' alt='User'*/}
                                {/*/>*/}
                                <p className='username'>{Config.user.first_name}</p>
                            </div>
                        </span>
                         <span className='right-text'>
                            ...
                        </span>
        </div>
    )
}
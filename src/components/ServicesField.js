import {getSpeedLim} from "../utills/funcs";

export const ServiceField = (props) => {

    return (
        <>
            <div className={`grid vr-margin-20 border-bottom`}>
                <span className='left-text margin-auto' >
                    <p className=''>{props.service.name}</p>
                </span>
                <span className='center margin-auto'>
                        <p className=''>{+props.serviceId === 15? getSpeedLim(props.service.param):props.service.param}</p>
                </span>
                <span className='right-text margin-auto' >
                    <p className=''>{props.service.on_cost} ₽</p>
                </span>
            </div>
        </>
    )
}
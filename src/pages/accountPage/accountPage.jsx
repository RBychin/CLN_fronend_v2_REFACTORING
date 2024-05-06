import {LoadingPage} from "../LoadingPage/LoadingPage";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import addAccIcon from '../../icons/add_acc.svg'
import {AccountHeader} from "../../components/AccountHeader";
import {StoriesList} from "../../components/storiesList";
import {AccountsCard} from "../../components/AccountCard";
import {BlockMain} from "../../components/BlockMain";
import {getProfile, getStories, getTransaction} from "../../utills/getInfo";
import {Transactions} from "../../components/Transactions";


export const AccountPage = (props) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [stories, setStories] = useState([]);
    const[userImage, setUserImage] = useState(null);

    useEffect(() => {
        getTransaction().then(r => setTransactions(r))
        getStories().then(r => setStories(r))
        getProfile().then(r => setUserImage(r?.image));
    }, []);


    if (!props.accounts) {
        return <LoadingPage/>
    }

    return (
            <>
                <BlockMain label={''} gradient={'gradient-background'}>
                    <AccountHeader userImage={userImage}/>
                </BlockMain>

                <BlockMain gradient={'gradient-end'} label={'Узнай больше'}>
                    <StoriesList stories={stories} setStories={setStories} />
                </BlockMain>

                <BlockMain gradient={''} label={'Аккаунт'}>
                    {Object.values(props.accounts).map((point, index) => (
                        <AccountsCard key={index}
                                      callback={props.fetchData}
                                      point={point}
                                      status={!point.error}
                                      accountName={point.error?point.error: Object.keys(point.points)[0]}
                        />
                    ))}
                    <div className={`container-login ${login ? 'show' : ''}`}>
                        <div onClick={() => {navigate('/v2/login')}}>Добавить аккаунт</div>
                    </div>
                    <div>
                        <img onClick={() => {setLogin(!login)}} alt='add' className={`icon add-account vr-margin-10 bottom-margin-0 ${login? "rotate-45 active": ""}`} src={addAccIcon} />
                    </div>
                </BlockMain>

                <BlockMain label={'История операций'} gradient={'gradient-end'}>
                    <Transactions transactions={transactions} />
                </BlockMain>
            </>
        )
}


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
import {PointCard} from "../../components/PointCard";


export const AccountPage = (props) => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [stories, setStories] = useState([]);
    const[user, setUser] = useState(null);

    useEffect(() => {
        getTransaction().then(r => setTransactions(r))
        getStories().then(r => setStories(r))
        getProfile().then(r => setUser(r));
    }, []);


    if (!props.accounts) {
        return <LoadingPage/>
    }

    return (
            <>
                <BlockMain label={''} gradient={'gradient-background'}>
                    <AccountHeader user={user}/>
                </BlockMain>

                {stories.length > 0 && <BlockMain gradient={'gradient-end'} label={'Узнай больше'}>
                    <StoriesList stories={stories} setStories={setStories} />
                </BlockMain>}
                {Object.values(props.accounts).map((point, index) => (
                    <BlockMain gradient={''} label={`Аккаунт ID: ${point.pin}`}>
                        <PointCard key={index}
                                          callback={props.fetchData}
                                          point={point}
                                          status={!point.error}
                                          accountName={'asdasd'}
                            />

                    </BlockMain>
                ))}
                <BlockMain>
                    <div>
                        <img onClick={() => {
                            setLogin(!login)
                        }} alt='add'
                             className={`icon add-account vr-margin-10 bottom-margin-0 ${login ? "rotate-45 active" : ""}`}
                             src={addAccIcon}/>
                        <div className={`container-login ${login ? 'show' : ''}`}>
                            <div onClick={() => {
                                navigate('/v2/login')
                            }}>Добавить аккаунт
                            </div>
                        </div>
                    </div>

                </BlockMain>


                {transactions.length > 0 && <BlockMain label={'История операций'} gradient={'gradient-end'}>
                    <Transactions transactions={transactions}/>
                </BlockMain>}
            </>
    )
}


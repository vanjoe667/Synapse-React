import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import '../../styles/Bridge.css'

const BridgeHeader = () => {
    const [addr, setAddr] = useState({address: ""});

    const connectButtonHandler = () => {
        if(window.ethereum){
            // we meuve
            window.ethereum
            .request({method: 'eth_requestAccounts'})
            .then((res:any[]) => accountChangeHandler(res[0]))
        }else{
            alert("Metamask is not installed baba");
        }
    }

    const accountChangeHandler = (account: string) =>{
        setAddr({
            address: account,
        })
    }

    const disconnectButtonHandler = () =>{
        setAddr({address: ""})
    }

    return (
        <div className='connect-button-area'>
            <div className='logo-area'>
                <img src={logo} alt="logo" className='roundImg'/>
                <div className='p-l-10 text-white'>VanJoe</div>
            </div>
            <div className='s'>
                {
                    addr.address === "" 
                    ? <button className='connect-button' onClick={connectButtonHandler}>Connect Wallet</button>
                    : <button className='connected-button' onClick={disconnectButtonHandler}>
                        {addr.address.slice(0, 6)}...{addr.address.slice(40)}
                    </button>
                } 
            </div>
        </div>
    )
}

export default BridgeHeader
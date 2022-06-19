/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { ethers } from "ethers";
import '../../styles/BridgeCard.css'
import { BASE_URL, NETWORKS } from '../../config/variables'
import { Spinner } from '../General/Spinner'
import {executeTransaction, offramp} from '../../services/synapse'

import {
    Networks, 
    Tokens,
} from "@synapseprotocol/sdk";
import {parseUnits} from "@ethersproject/units"; // formatUnits

const {REACT_APP_SIGNATURE} = process.env

const BridgeCard = () => {
    const [amount, setAmount] = useState(0);
    const [token, setToken] = useState(Tokens.USDT.name);
    const [network, setNetwork] = useState(String(NETWORKS[0].chainId));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [address, setAddress] = useState('');
    const [bal, setBalance] = useState('');
    const [spinner, setSpinner] = useState(false);

    const rampHandler = async() => {
        console.log('rampHandler',amount,token);
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        const signer = provider.getSigner();

        setAddress(await signer.getAddress());

        if(!address){
            alert('Please connect wallet');
            return;
        }
        setSpinner(true);

        const net = NETWORKS.find((n:any) => n.chainId === Number(network));
        const tokenToBeReceived = Tokens.USDC // will always receive USDC (BSC)
        // console.log('xxx',Networks.ETH);
        
        if(net?.chainId === '999'){
            alert('This is a WalletConnect tx');
            // WalletConnect functions goes here... (synapse does not support WalletConnect)
            return;
        }

        console.log('the nework',net?.network);
        
        const tx = await executeTransaction(
            signer,net?.network, net?.provider,
            token === Tokens.USDT.name ? Tokens.USDT : Tokens.USDC, 
            Tokens.USDC, 
            parseUnits(String(amount), Number(tokenToBeReceived.decimals(Number(net?.chainId)))),
            Number(Networks.BSC.chainId)
        );

        console.log({tx});
        if (tx === undefined) {
            alert('Transaction failed');
            setSpinner(false);
            return;
        }
        
        const ramp = await offramp(address,token,amount);
        if(ramp) {
            setSpinner(false);
            alert('Ramp successful');
        }
    }

    const getBalance = async(chain_id:string,address:string)  =>{
        const balances = await fetch(`${BASE_URL}/web3/v1/balance/${chain_id}/${address}`,
        {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin' : '*',
                's-signature': REACT_APP_SIGNATURE || '',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then(res => res)
        .catch(() => null);
        
        if(!balances) return setBalance('0')

        const balance = balances.data.find((item:any) => item.token === token);        
        setBalance(balance.amount)
    }

    useEffect(() => {
        getBalance(network,address); // just POLYGON and TRON for now
    },[address])

    return (
        <div className="container">
            <div className="bridge-card">
                <div className="bridge-card-header">RAMP</div>
                <div className="bridge-card-body">
                    <div className='network-area'>
                         <select className='network' value={network} onInput={(e:any) => setNetwork(e.target.value)}>
                             {
                                 NETWORKS.map((item:any) => {
                                        return <option key={item.chainId} value={item.chainId}>{item.name}</option>
                                 })
                             }
                        </select>
                    </div>
                    <div className='quantity-area'>
                        <input type="number" value={amount} onInput={(e:any) => setAmount(e.target.value)} className="bridge-card-input" placeholder="Price"/>
                        <select className="bridge-card-select" value={token} onInput={(e:any) => setToken(e.target.value)}>
                            <option value={Tokens.USDT.name}>{Tokens.USDT.name}</option>
                            <option value={Tokens.USDC.name}>{Tokens.USDC.name}</option>
                        </select>
                    </div>
                    <div className='balance'>
                        <p>
                            Balance: {bal || 0}
                        </p>
                    </div>
                </div>

                <button className='proceed' onClick={rampHandler}>{spinner ? <Spinner/>: 'Proceed'}</button>
            </div>
        </div>
    )
}

export default BridgeCard
import {
    Bridge, 
} from "@synapseprotocol/sdk";

import axios from "axios";
import { BASE_URL } from '../config/variables';
import {ContractTransaction} from "@ethersproject/contracts"; // PopulatedTransaction
const {REACT_APP_SIGNATURE} = process.env;

export const executeTransaction = async(
    signer: any, network: any, provider: any, 
    tokenFrom: any, tokenTo: any, amountFrom: any, chainIdTo: number,
    ) => {

    console.log('executeTransaction=========',tokenFrom,tokenTo,amountFrom,chainIdTo,network);
    console.log('the tokens',signer);
    
    // Initialize Bridge
    const SYNAPSE_BRIDGE = new Bridge.SynapseBridge({
        network,
        // provider,
    });

    // get minimum desired output
    const { amountToReceive } = await SYNAPSE_BRIDGE.estimateBridgeTokenOutput({
        tokenFrom,      // token to send from the source chain, in this case nUSD on Avalanche
        chainIdTo,     // Chain ID of the destination chain, in this case BSC
        tokenTo,     // Token to be received on the destination chain, in this case USDC
        amountFrom,  // Amount of `tokenFrom` being sent
    });
    
    try {
        // build and execute an ERC20 Approve transaction so that the Synapse Bridge contract
        // can do its thing.
        // If desired, `amount` can be passed in the args object, which overrides
        // the default behavior of "infinite approval" for the token.
        let approveTxn: ContractTransaction = await SYNAPSE_BRIDGE.executeApproveTransaction({
            token: tokenFrom
        }, signer);

        // Wait for at least one confirmation on the sending chain, this is an optional
        // step and can be either omitted or implemented in a custom manner.
        await approveTxn.wait(1);

        console.log(`ERC20 Approve transaction hash: ${approveTxn.hash}`);
        console.log(`ERC20 Approve transaction block number: ${approveTxn.blockNumber}`);
    } catch (err) {
        // deal with the caught error accordingly
        console.log('error finishing oo',err);
    }
    
    try {
        // executeBridgeTokenTransaction requires an ethers Signer instance to be 
        // passed to it in order to actually do the bridge transaction.
        // An optional field `addressTo` can be passed, which will send tokens
        // on the output chain to an address other than the address of the Signer instance.
        //
        // NOTE: executeBridgeTokenTransaction performs the step of actually sending/broadcasting the signed
        // transaction on the source chain.
        let bridgeTxn: ContractTransaction = await SYNAPSE_BRIDGE.executeBridgeTokenTransaction({
            tokenFrom,        // token to send from the source chain, in this case nUSD on Avalanche
            chainIdTo,       // Chain ID of the destination chain, in this case BSC
            tokenTo,       // Token to be received on the destination chain, in this case USDC
            amountFrom,    // Amount of `tokenFrom` being sent
            amountTo: amountToReceive, // minimum desired amount of `tokenTo` to receive on the destination chain
        }, signer);

        // Wait for at least one confirmation on the sending chain, this is an optional
        // step and can be either omitted or implemented in a custom manner.
        await bridgeTxn.wait(1);

        console.log(`Bridge transaction hash: ${bridgeTxn.hash}`);
        console.log(`Bridge transaction block number: ${bridgeTxn.blockNumber}`);
    } catch (err) {
        // deal with the caught error accordingly
        console.log('some errors occured man',err);
    }
    
    console.log('all set and good');
    
}

export const offramp = async(
    address: string, token: string, amount: number
) =>{
    const config = {
        method: 'POST',
        data: JSON.stringify({
            address,
            from_chain: '137',
            from_token: token,
            amount: Number(amount),
            account_number: '2235127071',
            bank_code: '033'
        }),
        headers: {
            'Access-Control-Allow-Origin' : '*',
            's-signature': REACT_APP_SIGNATURE || '',
            'Content-Type': 'application/json',
        }
    };
    console.log('amount',amount, typeof amount);
    const ramp = await axios(`${BASE_URL}/web3/v1/offramp`,config)
    // .then((response) => response.json())
    .then(res => res)
    .catch(err => err);

    if(!ramp) return null;
    return ramp.data;
}
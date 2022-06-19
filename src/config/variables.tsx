import { ICard } from '../Interfaces/ICard'
import {
    Networks, 
} from "@synapseprotocol/sdk";

export const NETWORKS = [
    {
        name: Networks.BSC.name,
        chainId: Networks.BSC.chainId,
        symbol: Networks.BSC.id,
        network: Networks.BSC,
        provider: 'https://polygon-mainnet.g.alchemy.com/v2/OEE0i1sGNBGkR3nmn0lc8AqtVt1iJEal',
    },
    {
        name: Networks.POLYGON.name,
        chainId: Networks.POLYGON.chainId,
        symbol: Networks.POLYGON.id,
        network: Networks.POLYGON,
        provider: 'https://polygon-mainnet.g.alchemy.com/v2/OEE0i1sGNBGkR3nmn0lc8AqtVt1iJEal',
    },
    {
        name: 'Tron',
        chainId: '999',
        symbol: 'TRX',
        provider: 'https://polygon-mainnet.g.alchemy.com/v2/OEE0i1sGNBGkR3nmn0lc8AqtVt1iJEal', // will change later
    }
]

export const cards: ICard[] = [
    {
        image_url: 'https://res.cloudinary.com/https-scalex-africa/image/upload/v1649109116/DigitalAssets/ethereum_2_c9ywvg.png',
        label: 'Web3 Bridge',
        link: '/bridge',
        id: 1
    },
    {
        image_url: 'https://res.cloudinary.com/https-scalex-africa/image/upload/v1649109116/DigitalAssets/tether_spsvj5.png',
        label: 'Mainnet',
        link: '/',
        id: 2
    },
    {
        image_url: 'https://res.cloudinary.com/https-scalex-africa/image/upload/v1649109115/DigitalAssets/bitcoin_ge1eah.png',
        label: 'Testnet',
        link: '/',
        id: 3
    },
    {
        image_url: 'https://res.cloudinary.com/https-scalex-africa/image/upload/v1649109116/DigitalAssets/tether_spsvj5.png',
        label: 'Mainnet',
        link: '/',
        id: 4
    },
]
export const BASE_URL: string = 'http://localhost:3000'
import React from 'react'
import BridgeCard from '../components/Bridge/BridgeCard'
import { BridgeFooter } from '../components/Bridge/BridgeFooter'
import BridgeHeader from '../components/Bridge/BridgeHeader'

const Bridge = () => {
  return (
    <div className="backdrop v-center">
        <BridgeHeader/>
        <BridgeCard/>
        <BridgeFooter/>
    </div>
  )
}

export default Bridge
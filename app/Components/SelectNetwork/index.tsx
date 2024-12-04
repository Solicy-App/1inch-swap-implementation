import './styles.css'
import { CheckSvg } from '@/app/utils/svg'
import { NETWORKS } from '@/utils/constants'

import { ComponentProps } from './types'

export const SelectNetWork: React.FC<ComponentProps> = ({
  openSelect,
  getTokens,
  selectedNetwork,
  setSelectedNetwork
}) => {
  return <div className='selectNetWork'>
    {openSelect && NETWORKS.map((elm, i) => {
      return <div key={i} onClick={() => {
        setSelectedNetwork(elm)
        getTokens(elm.id)
      }} className='selectNetWorkItemWrapper'>
        <div className='selectNetWorkItem'>
          <img src={elm.img} />
          <p>{elm.name}</p>
        </div>
        {elm.id == selectedNetwork.id && <CheckSvg />}
      </div>
    })}
  </div>
}
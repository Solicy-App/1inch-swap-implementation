import { PinIcon } from '@/app/utils/svg'
import './styles.css'
import { TokenItemType } from '../../types'

export const TokenItem: React.FC<TokenItemType> = ({ logo, name }) => {
  return <div className='tokenItem'>
    <div className='tokenItemImg'>
      <img src={logo} />
      <div className='TokenInfo'>
        <p className='TokenInfoName'>{name}</p>
      </div>
    </div>
    <div className='tokenItemPrice'>
      <p>$0</p>
      <PinIcon />
    </div>
  </div>
}
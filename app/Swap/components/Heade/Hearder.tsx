import './styles.css'
import { Refresh, FiltrSvg } from '@/app/utils/svg'
import { useState } from 'react';
export const Header = () => {

  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 700);
  };

  return <div className='header'>
    <div className='headerTabs'>
      <p className='swapP'>Swap</p>
      <p className='limitL'>Limit</p>
    </div>
    <div className='headerActions'>
      <div className='headerActionsDiv'>
        <div onClick={() => handleClick()} id="countdown" className={isRotating ? "rotate" : ""}>
          <Refresh />
        </div>
      </div>
      <div className='headerActionsDiv'>
        <FiltrSvg />
      </div>
    </div>
  </div>
}
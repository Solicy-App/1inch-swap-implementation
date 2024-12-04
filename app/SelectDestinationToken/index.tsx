import './styles.css';
import { TokenItem } from './components/tokenItem/tokenItem';
import { BackSvg, ButtonArrow, ClearSvg, SearchSvg } from '@/app/utils/svg';
import { useEffect, useState } from 'react';
import { SelectNetWork } from '../Components/SelectNetwork/index'
import ReactLoading from 'react-loading';
import { Network, ComponentProps } from './types'




const SelectDestinationToken: React.FC<ComponentProps> = ({ setPage, setSelectedToken }) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [netWork, setNetwork] = useState<Network>({
    img: 'https://app.1inch.io/assets/images/network-logos/ethereum.svg',
    id: 1,
    name: 'Ethereum',
  })

  const getTokens = async (id = 1) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/v1.2/${id}`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer oYtJS37LUR9zy6jylTaeVKlpGZrRffE9',
        },
      });
      const result = await response.json();
      setData(result || []);
      setLoading(false)
    } catch (err) {
    }
  };

  useEffect(() => {
    getTokens(1)
  }, [])

  const [openSelect, setOpenSelect] = useState(false)
  return (
    <div className="main" id="selectDestinationToken">
      <div className="selectTokenHeader">
        <div onClick={() => setPage(true)} className="selectTokenHeaderBack">
          <BackSvg />
        </div>
        <div onClick={() => setOpenSelect(!openSelect)} className="allNetworks">
          <img src={netWork.img} alt="All networks" />
          <p>{netWork.name}</p>
          <ButtonArrow color="#fff" />
          <div className={!openSelect ? 'openSelect' : 'openSelect1'}>
            <SelectNetWork
              openSelect={openSelect}
              setSelectedNetwork={(e: Network) => setNetwork(e)}
              selectedNetwork={netWork}
              getTokens={(e: number) => getTokens(e)}
            />
          </div>
        </div>
      </div>
      <div className="selectDestinationToken">
        <div className="searchInput">
          <div className="searchSvg">
            <SearchSvg />
          </div>
          {value && (
            <div onClick={() => setValue("")} className="clearSvg">
              <ClearSvg />
            </div>
          )}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search by name or paste address"
          />
        </div>
      </div>
      {!loading ? <div className="TokenItemWrapper">
        {
          Object.entries(data).map(([address, elm]) => {
            const { name = 'Unnamed Token', logoURI = 'default-logo.png' } = elm || {};
            return <div key={`token-${address}`} onClick={() => setSelectedToken(elm)}>
              <TokenItem name={name} logo={logoURI} />
            </div>
          })}
      </div> :
        <div className='loading'>
          <ReactLoading type={"spin"} color={"white"} height={30} width={30} />
        </div>
      }
    </div>
  );
};

export default SelectDestinationToken;

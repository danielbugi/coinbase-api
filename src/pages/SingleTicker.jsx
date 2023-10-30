import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fixNum, numFormatter } from '../utils';

import Loading from '../components/Loading';
import { useGlobalContext } from '../context';

const SingleTicker = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState(null);
  const { urlOptions } = useGlobalContext();

  useEffect(() => {
    setLoading(true);
    const getCoin = async () => {
      try {
        const response = await fetch(
          `https://coinranking1.p.rapidapi.com/coin/${id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`,
          urlOptions
        );
        const result = await response.json();
        setCoin(result.data.coin);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!coin) {
    return <h2 className="section-title">no coin to display</h2>;
  }

  const {
    marketCap,
    color,
    name,
    change,
    description,
    iconUrl,
    price,
    symbol,
    rank,
  } = coin;

  return (
    <section className="section coin-section">
      <div className="coin-description">
        <div className="coin-center-header">
          <img
            src={iconUrl}
            alt={name}
            style={{ height: '35px', width: '35px' }}
          />
          <h2 style={{ color: color }}>
            <span style={{ color: '#f6f6f6' }}>{name}</span>
            {symbol}
          </h2>
        </div>
        <div className="coin-price">
          <p>price</p>
          <h3>${fixNum(price)}</h3>
          {change > 0 ? (
            <span style={{ color: 'green', fontWeight: 'bold' }}>
              ({change}%)
            </span>
          ) : (
            <span style={{ color: 'red', fontWeight: 'bold' }}>
              ({change}%)
            </span>
          )}
        </div>

        <h4>market stats</h4>
        <div className="market-stats">
          <div className="stats">
            <div className="stats-box">
              <p>market cap</p>
              <span>${numFormatter(marketCap)}</span>
            </div>
            <div className="stats-box">
              <p>volume (24H)</p>
              <span>${numFormatter(coin['24hVolume'])}</span>
            </div>
            <div className="stats-box">
              <p>circulating supply</p>
              <span>
                {numFormatter(coin.supply.circulating)} {symbol}
              </span>
            </div>
            <div className="stats-box">
              <p>all time high</p>${fixNum(coin.allTimeHigh.price)}
            </div>
            <div className="stats-box">
              <p>popularity</p>#{rank}
            </div>
          </div>
          <p className="description">{description}</p>
        </div>
      </div>
    </section>
  );
};
export default SingleTicker;

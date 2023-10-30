import { fixNum, numFormatter } from '../utils';

/* eslint-disable react/prop-types */
const Ticker = ({ item }) => {
  const renderToCoin = () => {
    window.location = `/coin/${item.uuid}`;
  };

  console.log(fixNum(0.005443));

  return (
    <tr
      className="coin-row"
      onClick={renderToCoin}
      style={{ cursor: 'pointer' }}
    >
      <td className="coin-name-cell">
        <span>
          <img className="icon-coin" src={item.iconUrl} alt={item.name} />
        </span>
        <p className="coin-name">{item.name}</p>
      </td>
      <td>${fixNum(item.price)}</td>
      {item.change > 0 ? (
        <td style={{ color: 'green', fontWeight: 'bold' }}>{item.change}%</td>
      ) : (
        <td style={{ color: 'red', fontWeight: 'bold' }}>{item.change}%</td>
      )}

      <td className="media-display">${numFormatter(item.marketCap)}</td>
      <td className="media-display">{numFormatter(item['24hVolume'])}</td>
    </tr>
  );
};
export default Ticker;

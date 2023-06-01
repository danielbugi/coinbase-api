import { fixNum, numFormatter } from '../utils';

/* eslint-disable react/prop-types */
const Ticker = ({ item }) => {
  const renderToCoin = () => {
    window.location = `/coin/${item.uuid}`;
  };

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
      <td>{fixNum(item.price)}$</td>
      {item.change > 0 ? (
        <td style={{ color: 'green' }}>{item.change}%</td>
      ) : (
        <td style={{ color: 'red' }}>{item.change}%</td>
      )}

      <td className="media-display">{numFormatter(item.marketCap)}</td>
      <td className="media-display">{numFormatter(item['24hVolume'])}</td>
    </tr>
  );
};
export default Ticker;

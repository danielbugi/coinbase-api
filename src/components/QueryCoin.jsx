import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
const QueryCoin = ({ item }) => {
  const { iconUrl, name, symbol, uuid } = item;

  return (
    <Link to={`coin/${uuid}`}>
      <div className="suggestion-box">
        <img src={iconUrl} alt={name} className="icon-coin" />
        <p className="coin-name suggest-name">{name}</p>
        <p className="suggest-sym">{symbol}</p>
      </div>
    </Link>
  );
};
export default QueryCoin;

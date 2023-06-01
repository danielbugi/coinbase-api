import { useGlobalContext } from '../context';

import Ticker from '../components/Ticker';
import Loading from '../components/Loading';

const TickerList = () => {
  const { coins, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (coins.length < 1) {
    return (
      <h2 className="section-title">no coins matched your search term...</h2>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">top crypto currency</h2>
      <div className="coins-center">
        <table
          className="coins-table"
          border="0"
          cellSpacing="0"
          cellPadding="0"
        >
          <thead className="table-head">
            <tr className="row-header">
              <th scope="col">
                <button className="table-btn first-btn">name</button>
              </th>
              <th scope="col">
                <button className="table-btn">price</button>
              </th>
              <th scope="col">
                <button className="table-btn">change</button>
              </th>
              <th scope="col" className="media-display">
                <button className="table-btn">market cap</button>
              </th>
              <th scope="col" className="media-display">
                <button className="table-btn">volume (24h)</button>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {coins.map((item) => {
              return <Ticker key={item.uuid} item={item} />;
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default TickerList;

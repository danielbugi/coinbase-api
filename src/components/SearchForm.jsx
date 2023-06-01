import { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import QueryCoin from './QueryCoin';

const SearchForm = () => {
  const searchValue = useRef('');
  const { setSearchTerm, queriedCoins, fetchQueryCoins, searchTerm } =
    useGlobalContext();

  const searchCoin = () => {
    setSearchTerm(searchValue.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchQueryCoins();
  }, [searchTerm, fetchQueryCoins]);

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search coin</label>
          <input
            name="search-coins"
            type="text"
            id="searchCoins"
            placeholder="Search for an asset"
            ref={searchValue}
            onChange={searchCoin}
          />

          <div
            className="search-coins-box"
            style={searchTerm ? { display: 'block' } : { display: 'none' }}
          >
            {queriedCoins.length < 1 ? (
              <h2 className="section-title" style={{ fontSize: '1.5rem' }}>
                no coins matched your search term...
              </h2>
            ) : (
              queriedCoins.map((item) => {
                return <QueryCoin key={item.uuid} item={item} />;
              })
            )}
          </div>
          <button className="btn-form" type="submit">
            <FaSearch />
          </button>
        </div>
      </form>
    </section>
  );
};
export default SearchForm;

import { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../context';
import QueryCoin from './QueryCoin';

const SearchForm = () => {
  const {
    setSearchTerm,
    queriedCoins,
    fetchQueryCoins,
    searchTerm,
    queryBoxId,
    setQueryBoxId,
  } = useGlobalContext();
  const searchValue = useRef('');
  const queryCoinsContainerRef = useRef(null);

  // const handleCloseBox = (event) => {
  //   // if (queryBoxId && queryCoinsContainerRef.current) {
  //   const queryCoins = queryCoinsContainerRef.current;
  //   const { left, right, top, bottom } = queryCoins.getBoundingClientRect();
  //   const { clientX, clientY } = event;

  //   // if (
  //   //   clientX < left ||
  //   //   clientX > right ||
  //   //   clientY > bottom ||
  //   //   clientY < top
  //   // ) {
  //   setQueryBoxId(null);
  //   console.log(queryBoxId);
  //   console.log('clicked outside the box!!');
  //   // }
  //   // }
  // };

  // document.addEventListener('mouse', handleCloseBox);

  searchTerm.length >= 1 ? setQueryBoxId(true) : setQueryBoxId(null);

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
            ref={queryCoinsContainerRef}
            className={
              queryBoxId
                ? 'search-coins-box search-box-active'
                : 'search-coins-box'
            }
          >
            {queriedCoins.length < 1 ? (
              <h2
                className="section-title"
                style={{ fontSize: '1.5rem', color: 'black' }}
              >
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

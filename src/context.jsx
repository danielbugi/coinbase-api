/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [queriedCoins, setQueriedCoins] = useState([]);
  const [queryBoxId, setQueryBoxId] = useState(null);

  const urlOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    },
  };

  const customFetchCoins = useCallback(async () => {
    setLoading(true);
    const url = 'https://coinranking1.p.rapidapi.com/coins';

    try {
      const response = await fetch(url, urlOptions);
      const result = await response.json();
      const coins = result.data.coins;
      setCoins(coins);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  });

  const fetchQueryCoins = useCallback(async () => {
    const url = 'https://coinranking1.p.rapidapi.com/search-suggestions?query=';
    try {
      const response = await fetch(`${url}${searchTerm}`, urlOptions);
      const result = await response.json();
      const queryCoins = result.data.coins;
      if (searchTerm.length > 0) {
        setQueriedCoins(queryCoins);
      } else {
        setQueriedCoins([]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    customFetchCoins();
  }, []);

  return (
    <AppContext.Provider
      value={{
        coins,
        loading,
        urlOptions,
        setSearchTerm,
        queriedCoins,
        fetchQueryCoins,
        searchTerm,
        queryBoxId,
        setQueryBoxId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

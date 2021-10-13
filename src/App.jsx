import { useCallback, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';

function Exercise1() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleChange = useCallback((e) => setTitle(e.target.value), []);

  return (
    <>
      <p>Change the document title:</p>
      <input type="text" onChange={handleChange} />
    </>
  );
}

function useFetch(url) {
  // You can reduce the number of re-renders with useReducer (see later)
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw response;
        }
      })
      .then((data) => setData(data))
      .catch((error) => setError(`Request to ${url} failed with status ${error.status}`))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

const CAT_BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';

function Exercise2() {
  const breeds = useFetch(CAT_BREEDS_URL);
  
  const handleShouldCollapse = useCallback(({ name }) => {
    return name === "data";
  }, []);

  // ReactJson is an extra, you could simply show the JSON.stringify(breeds) in the browser
  return (
    <>
      <h2>Breeds</h2>
      <ReactJson
        name={false}
        groupArraysAfterLength={10}
        shouldCollapse={handleShouldCollapse}
        src={breeds} />
    </>
  );
}

function App() {
  return (
    <>
      <h1>Hello CodeSandbox</h1>

      <Exercise1 />
      <Exercise2 />
    </>
  );
}

export default App;

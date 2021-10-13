import { useCallback, useEffect, useState } from 'react';

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

function App() {
  return (
    <>
      <h1>Hello CodeSandbox</h1>

      <Exercise1 />
    </>
  );
}

export default App;

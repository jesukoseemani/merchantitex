 import React, { useEffect } from "react";


const useLocalStorage = (storageKey:any, fallbackState:any) => {
  const [value, setValue] = React.useState(
		JSON.parse(storageKey && sessionStorage.getItem(storageKey)) ?? fallbackState
	);

  useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
 };

 export default useLocalStorage
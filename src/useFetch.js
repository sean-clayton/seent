import { useAtom, atom } from "jotai";
import { produce } from "immer";
import { useEffect, useReducer } from "react";

const redditCacheAtom = atom({});

export const useFetch = (url) => {
  const [cache, setCache] = useAtom(redditCacheAtom);

  const initialState = {
    status: "idle",
    error: null,
    data: [],
  };

  console.log(cache);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "FETCHING":
        return { ...initialState, status: "fetching" };
      case "FETCHED":
        return { ...initialState, status: "fetched", data: action.payload };
      case "FETCH_ERROR":
        return { ...initialState, status: "error", error: action.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: "FETCHING" });
      if (cache[url]) {
        const data = cache[url];
        dispatch({ type: "FETCHED", payload: data });
      } else {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setCache(
            produce((draft) => {
              draft[url] = data;
            })
          );
          if (cancelRequest) return;
          dispatch({ type: "FETCHED", payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: "FETCH_ERROR", payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url]);

  return state;
};

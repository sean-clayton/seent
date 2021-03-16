import { useAtom, atom } from "jotai";
import { produce } from "immer";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { get } from "lodash-es";

const redditCacheAtom = atom({});

const initialAsyncReducerState = {
  status: "initial",
  value: null,
  error: null,
};

function asyncReducer(state, action) {
  switch (action.type) {
    case "START":
      return {
        status: "pending",
        value: null,
        error: null,
      };
    case "SUCCESS":
      return {
        error: null,
        status: "success",
        value: action.payload,
      };
    case "ERROR":
      return {
        error: action.payload,
        status: "error",
        value: null,
      };
    default:
      return state;
  }
}

function useAsync(asyncFunction, immediate = false, aborter) {
  const [state, dispatch] = useReducer(asyncReducer, initialAsyncReducerState);
  const { status, value, error } = state;
  const executableRef = useRef(true);

  const readyToExecuteAgain = executableRef.current;

  const execute = useCallback(
    (...args) => {
      if (!readyToExecuteAgain) return;
      executableRef.current = false;
      dispatch({ type: "START" });

      return asyncFunction(...args)
        .then((response) => {
          dispatch({ type: "SUCCESS", payload: response });
          executableRef.current = true;
        })
        .catch((error) => {
          dispatch({ type: "ERROR", payload: error });
          executableRef.current = true;
        });
    },
    [asyncFunction, readyToExecuteAgain, status]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  useEffect(() => {
    return () => {
      if (aborter) aborter.abort();
    };
  }, []);

  return {
    execute,
    status,
    value,
    error,
  };
}

export default function useReddit(url, options) {
  const [cache, updateCache] = useAtom(redditCacheAtom);

  const aborter = new AbortController();
  const asyncRes = useAsync(
    async (newUrl) => {
      const urlToFetch = newUrl || url;
      return await new Promise(async (resolve, reject) => {
        if (cache[urlToFetch]) {
          return resolve(cache[urlToFetch]);
        }

        const res = await fetch("https://www.reddit.com" + (newUrl || url), {
          signal: aborter.signal,
        }).catch(reject);

        return resolve(await res.json());
      });
    },
    get(options, "immediate", false),
    aborter
  );

  const { value } = asyncRes;

  let newValue;

  if (cache[url]) {
    newValue = cache[url];
  } else {
    newValue = asyncRes.value;
  }

  useEffect(() => {
    if (!cache[url]) {
      updateCache(
        produce((draft) => {
          draft[url] = value;
        })
      );
    }
  }, [value]);

  return { ...asyncRes, value: newValue };
}

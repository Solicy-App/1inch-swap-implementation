"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getData = useCallback(async (signal: AbortSignal) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json", { signal });
      const resJson = await res.json();
      setData(resJson);
      console.log(JSON.stringify(resJson))
    } catch (e) {
      setIsError(true);
      if (typeof e === "string") setError(e);
      else if (e instanceof Error) setError(e.message);
      else setError("Error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    getData(controller.signal);
    return () => controller.abort();
  }, [getData]);


  return <>
  {JSON.stringify(data)}
  </>
}

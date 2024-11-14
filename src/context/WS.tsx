"use client";

import { Ticker } from "@/components/DataTable/schema";
import { PRD_IDS } from "@/lib/constants";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

type ContextType = {
  currentTickers: Set<string>;
  setCurrentTickers: (tickers: Set<string>) => void;
  tickers: string[];
  tickerData: Record<string, Ticker>;
  filtered?: boolean;
};

const WSContext = createContext<ContextType | undefined>(undefined);

export const WSProvider = ({ children }: { children: ReactNode }) => {
  const [currentTickers, setCurrentTickers] = useState<
    ContextType["currentTickers"]
  >(new Set(PRD_IDS));
  const [tickerData, setTickerData] = useState<ContextType["tickerData"]>({});
  const [filtered, setFiltered] = useState<ContextType["filtered"]>(false);

  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<Ticker>(
    "wss://ws-feed.exchange.coinbase.com"
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "subscribe",
        product_ids: PRD_IDS,
        channels: ["ticker_batch"],
      });
    }
  }, [readyState]);

  const unsubscribe = (ticker: string) => {
    if (readyState !== ReadyState.OPEN) return;
    try {
      sendJsonMessage({
        type: "unsubscribe",
        product_ids: [ticker],
        channels: ["ticker_batch"],
      });
      setTickerData((prev: ContextType["tickerData"]) => {
        const { [ticker]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.error("Unsubscription error:", error);
    }
  };

  const subscribe = (tickers: Set<string>) => {
    if (!tickers.size || readyState !== ReadyState.OPEN) return;

    try {
      sendJsonMessage({
        type: "subscribe",
        product_ids: Array.from(tickers),
        channels: ["ticker_batch"],
      });
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage["type"] === "ticker") {
      const latest: Ticker = { ...lastJsonMessage };
      setTickerData((prev: ContextType["tickerData"]) => {
        if (prev[latest.product_id])
          latest.higher = prev[latest.product_id].price < latest.price;
        return {
          ...prev,
          [latest.product_id]: latest,
        };
      });
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    const tickersToUnsubscribe = new Set(
      Object.keys(tickerData).filter((ticker) => !currentTickers.has(ticker))
    );
    tickersToUnsubscribe.forEach(unsubscribe);

    const tickersToSubscribe = new Set(
      Array.from(currentTickers).filter((ticker) => !tickerData[ticker])
    );

    subscribe(tickersToSubscribe);

    setFiltered(
      currentTickers.size !== PRD_IDS.length ||
        !PRD_IDS.every((id) => currentTickers.has(id))
    );

    return () => {
      tickersToUnsubscribe.forEach(unsubscribe);
    };
  }, [currentTickers]);

  return (
    <WSContext.Provider
      value={{
        currentTickers,
        setCurrentTickers,
        tickers: PRD_IDS,
        tickerData,
        filtered,
      }}
    >
      {children}
    </WSContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(WSContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a WSContext.Provider");
  }
  return context;
};

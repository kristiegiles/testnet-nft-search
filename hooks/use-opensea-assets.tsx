import React, { useEffect, useState, useCallback } from "react";
import { Nft } from "../types/nft";
const TESTNET_ASSETS_URL = "https://testnets-api.opensea.io/api/v1/assets";

function useOpenseaAssets(ethAddress: string) {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  // todo pagination or infinite scroll
  const loadNfts = useCallback(async () => {
    try {
      setNfts([]);
      setIsLoading(true);
      setFetchError(false);

      const response = await fetch(
        `${TESTNET_ASSETS_URL}?owner=${ethAddress}&limit=100`
      );
      setIsLoading(false);
      const data = await response.json();
      console.log("data", data);
      const filteredNfts = data.assets.filter(
        (asset: Nft) =>
          asset.asset_contract.asset_contract_type === "non-fungible"
      );
      setNfts(filteredNfts);
    } catch (err) {
      setFetchError(true);
    }
  }, [ethAddress]);

  useEffect(() => {
    loadNfts();
  }, [ethAddress]);

  return { nfts, isLoading, fetchError };
}

export default useOpenseaAssets;

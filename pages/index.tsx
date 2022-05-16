import type { NextPage } from "next";
import React, { FormEvent, ChangeEvent, useState } from "react";
import Modal from "../components/modal";
import useOpenseaAssets from "../hooks/use-opensea-assets";
import styles from "../styles/home.module.css";
import {
  truncatedEthAddress,
  isPlausibleEthAddress,
} from "../utils/eth-address";
import FetchError from "../components/fetch-error";
import { Nft } from "../types/nft";

const Home: NextPage = () => {
  const [ethAddress, setEthAddress] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [validationError, setValidationError] = useState("");
  const [activeNft, setActiveNft] = useState<Nft | null>(null);

  const { nfts, isLoading, hasFetchError } = useOpenseaAssets(ethAddress);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isPlausibleEthAddress(searchInput)) {
      return setValidationError("Please enter a valid ethereum address");
    }
    setEthAddress(searchInput);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValidationError("");
    setSearchInput(e.target.value);
  };

  const handleCreatorAddressClick = () => {
    const { address } = (activeNft as Nft).creator;
    setEthAddress(address);
    setActiveNft(null);
  };

  return (
    <>
      <header className={`${styles.container} ${styles.header}`}>
        <form
          className={styles.search}
          role="search"
          aria-label="Search Opensea testnet"
          onSubmit={handleSubmit}
        >
          <input
            className={styles.search__input}
            type="text"
            name="search"
            id="searchbox"
            placeholder="Search ETH address"
            aria-label="Enter an ethereum address to search for NFTs"
            onChange={handleSearchInputChange}
            value={searchInput}
          />
          <button
            className={styles.search__btn}
            type="submit"
            aria-label="Search"
          >
            Search
          </button>
        </form>
        {validationError && (
          <div className={styles.search__error}>{validationError}</div>
        )}
      </header>
      <main>
        <div className={styles.container}>
          {isLoading && "Loading..."}
          {hasFetchError && <FetchError />}
          {!isLoading && !hasFetchError && `${nfts.length} items`}
        </div>
        <div className={styles.grid}>
          {nfts.map((nft: Nft) => (
            <button
              className="btn--transparent"
              onClick={() => setActiveNft(nft)}
              key={nft.id}
            >
              <div className={styles.grid__item}>
                <div className={styles["nft__img-wrapper"]}>
                  <img
                    className="img--cover"
                    src={nft.image_url || "/no-img.png"}
                    alt={nft.name}
                  />
                </div>
                <div className={styles.nft__info}>
                  <div className={styles.nft__name}>
                    {nft.name || `${nft.collection.name} #${nft.token_id}`}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
      {activeNft && (
        <Modal onClose={() => setActiveNft(null)}>
          <h2 className={styles.details__name}>{activeNft.name}</h2>
          <div className={styles.details__collection}>
            {activeNft.collection.name}
          </div>
          <div className={styles.details}>
            <div className={styles.details__left}>
              <div className={styles["details__img-wrapper"]}>
                <img
                  className="img--cover"
                  src={activeNft.image_url || "/no-img.png"}
                  alt={activeNft.name}
                />
              </div>
              {activeNft?.creator?.address && (
                <div className={styles.details__owner}>
                  Created by{" "}
                  <button
                    className="btn--link"
                    aria-label="Load creator's NFTs"
                    onClick={handleCreatorAddressClick}
                  >
                    {truncatedEthAddress(activeNft.creator.address)}
                  </button>
                </div>
              )}
            </div>
            {activeNft.traits.length > 0 && (
              <div className={styles.details__right}>
                <div className={styles.details__traits}>
                  {activeNft.traits.map((trait, i) => (
                    <div
                      className={styles.details__trait}
                      key={`${activeNft.id}-trait-${i}`}
                    >
                      <div className={styles.details__trait__type}>
                        {trait.trait_type}
                      </div>
                      <div className={styles.details__trait__name}>
                        {trait.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default Home;

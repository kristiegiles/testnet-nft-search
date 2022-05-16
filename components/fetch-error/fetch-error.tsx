import React from "react";

function FetchError() {
  return (
    <>
      Error fetching NFTs – try again or check{" "}
      <a href="https://status.opensea.io" target="blank" rel="noreferrer">
        status.opensea.io
      </a>{" "}
      for API status
    </>
  );
}

export default FetchError;

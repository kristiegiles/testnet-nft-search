const isPlausibleEthAddress = (address: string) =>
  address.toLowerCase().match(/(\b0x[a-f0-9]{40}\b)/g);

const truncatedEthAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;


export { isPlausibleEthAddress, truncatedEthAddress }
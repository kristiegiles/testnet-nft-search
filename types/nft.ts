type Trait = {
  trait_type?: string;
  value?: string;
};

type Creator = {
  address: string;
};

type Collection = {
  name?: string;
};

type AssetContract = {
  asset_contract_type: string;
};

export type Nft = {
  id: number;
  name?: string;
  creator: Creator;
  traits: Trait[];
  collection: Collection;
  asset_contract: AssetContract;
  image_url?: string,
  token_id: string,
};
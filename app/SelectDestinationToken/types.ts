export interface ComponentProps {
  setPage: (page: boolean) => void;
  setSelectedToken: (val: object) => void
}

export interface Network {
  img: string;
  id: number;
  name: string;
}
export interface TokenItemType {
  logo: string;
  name: string;

}

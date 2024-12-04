interface Connector {
  name: string;
  getProvider: () => Promise<any>;
}
export interface ConnectorButtonProps {
  connector: Connector;
  onClick: () => void;
}
export interface ComponentProps {
  handleClick: (e: boolean) => void,
}

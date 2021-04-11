export interface TickerMessage {
  price: string;
  symbol: string;
}

export const asTickerMessage = (message: string): TickerMessage =>
  JSON.parse(message);

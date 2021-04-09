package com.github.bnuyts.binanceapi.socket.message;

public class TickerMessage {

    private String price;
    private String symbol;

    public TickerMessage() {
    }

    public TickerMessage(String price, String symbol) {
        this.price = price;
        this.symbol = symbol;
    }

    public String getPrice() {
        return price;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}

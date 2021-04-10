package com.github.bnuyts.binanceapi.socket.message;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

public class TickerMessage {

    private String price;
    private String symbol;

    public TickerMessage() {
    }

    public TickerMessage(String price, String symbol) {
        setPrice(price);
        setSymbol(symbol);
    }

    public String getPrice() {
        return price;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setPrice(String price) {
        DecimalFormat df = new DecimalFormat("#,##0.00", new DecimalFormatSymbols(new Locale("en_US")));
        this.price = df.format(Double.parseDouble(price));
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }
}

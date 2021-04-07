package com.github.bnuyts.binanceapi.price.service;

import com.github.bnuyts.binanceapi.client.BinanceClient;

import org.springframework.stereotype.Service;

@Service
public class PriceService {

    private final BinanceClient client;

    public PriceService(BinanceClient client) {
        this.client = client;
    }

    public String getLatestPrice(String symbol) {
        return this.client.getClient().getPrice(symbol).getPrice();
    }
}

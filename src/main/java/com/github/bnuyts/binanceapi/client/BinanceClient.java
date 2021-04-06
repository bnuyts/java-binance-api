package com.github.bnuyts.binanceapi.client;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiRestClient;

import org.springframework.stereotype.Component;

@Component
public class BinanceClient {
    
    private final BinanceApiClientFactory factory;
    private final BinanceApiRestClient client;

    public BinanceClient() {
        this.factory = BinanceApiClientFactory.newInstance();
        this.client = factory.newRestClient();
    }

    public BinanceApiRestClient getClient() {
        return client;
    }
}

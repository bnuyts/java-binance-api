package com.github.bnuyts.binanceapi.client;

import com.binance.api.client.BinanceApiClientFactory;
import com.binance.api.client.BinanceApiWebSocketClient;

import org.springframework.stereotype.Component;

@Component
public class BinanceClient {
    
    private final BinanceApiClientFactory factory;
    private final BinanceApiWebSocketClient client;

    public BinanceClient() {
        this.factory = BinanceApiClientFactory.newInstance();
        this.client = factory.newWebSocketClient();
    }

    public BinanceApiWebSocketClient getClient() {
        return client;
    }
}

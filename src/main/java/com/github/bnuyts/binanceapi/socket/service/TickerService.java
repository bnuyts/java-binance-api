package com.github.bnuyts.binanceapi.socket.service;

import java.io.Closeable;
import java.io.IOException;

import com.binance.api.client.BinanceApiCallback;
import com.binance.api.client.domain.event.AggTradeEvent;
import com.github.bnuyts.binanceapi.client.BinanceClient;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.stereotype.Service;

@Service
public class TickerService implements DisposableBean {

    final private BinanceClient client;
    private Closeable subject;

    public TickerService(BinanceClient client) {
        this.client = client;
    }

    public void getTicker(String symbols, BinanceApiCallback<AggTradeEvent> callback) {
        subject = client.getClient().onAggTradeEvent(symbols, callback);
    }

    public void close() throws IOException {
        subject.close();
    }

    @Override
    public void destroy() throws Exception {
        close();
    }
}

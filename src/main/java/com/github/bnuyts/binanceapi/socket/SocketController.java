package com.github.bnuyts.binanceapi.socket;

import java.io.IOException;

import com.binance.api.client.domain.event.AggTradeEvent;
import com.github.bnuyts.binanceapi.socket.message.TickerMessage;
import com.github.bnuyts.binanceapi.socket.service.TickerService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.util.HtmlUtils;

@Controller
public class SocketController {

    Logger logger = LoggerFactory.getLogger(SocketController.class);

    final private SimpMessagingTemplate simpMessagingTemplate;
    final private SimpUserRegistry simpUserRegistry;
    final private TickerService tickerService;

    public SocketController(SimpMessagingTemplate simpMessagingTemplate, SimpUserRegistry simpUserRegistry,
            TickerService tickerService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.simpUserRegistry = simpUserRegistry;
        this.tickerService = tickerService;
    }

    @MessageMapping("/ticker")
    public void ticker(TickerMessage message) throws Exception {
        String tickerName = HtmlUtils.htmlEscape(message.getSymbol());
        tickerService.getTicker(tickerName, (AggTradeEvent response) -> {
            simpMessagingTemplate.convertAndSend("/topic/price",
                    new TickerMessage(response.getPrice(), response.getSymbol()));
        });
    }

    @EventListener
    public void onDisconnectEvent(SessionDisconnectEvent event) {
        if (simpUserRegistry.getUserCount() == 0) {
            logger.debug("Closing all broadcasts");
            try {
                tickerService.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

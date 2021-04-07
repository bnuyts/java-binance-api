package com.github.bnuyts.binanceapi.price.web;

import com.github.bnuyts.binanceapi.price.service.PriceService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * PriceController
 */
@RestController()
@RequestMapping("price")
public class PriceController {

    private final PriceService priceService;

    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @GetMapping("/last/{symbol}")
    public String getLatestPrice(@PathVariable String symbol) {
        return this.priceService.getLatestPrice(symbol);
    }
}
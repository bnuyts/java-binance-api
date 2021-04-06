package com.github.bnuyts.binanceapi.price.web;

import com.github.bnuyts.binanceapi.price.service.PriceService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


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

    @GetMapping("/latest")
    public String getLatestPrice(@RequestParam String symbol) {
        return this.priceService.getLatestPrice(symbol);
    }
}
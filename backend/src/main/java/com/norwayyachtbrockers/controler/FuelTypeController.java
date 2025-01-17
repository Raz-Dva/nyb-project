package com.norwayyachtbrockers.controler;

import com.norwayyachtbrockers.model.enums.FuelType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/fuelTypes")
public class FuelTypeController {
    @GetMapping
    public List<Map<String, String>> getAllFuelTypes() {
        return Arrays.stream(FuelType.values())
                .map(fuelType -> {
                    Map<String, String> map = new HashMap<>();
                    map.put("name", fuelType.name());
                    map.put("value", fuelType.toString());
                    return map;
                })
                .collect(Collectors.toList());
    }
}

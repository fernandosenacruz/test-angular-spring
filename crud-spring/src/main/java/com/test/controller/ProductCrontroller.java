package com.test.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.test.model.Product;
import com.test.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
public class ProductCrontroller {

  private final ProductRepository productRepository;

  public ProductCrontroller(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @GetMapping
  public List<Product> getProducts() {
    return productRepository.findAll();
  }

  @PostMapping("/post")
  @ResponseStatus(code = HttpStatus.CREATED)
  public Product create(@RequestBody Product product) {
    return productRepository.save(product);
  }
}

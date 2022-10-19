package com.test.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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

  /**
   * @return
   */
  @GetMapping
  public List<Product> getProducts() {
    return productRepository.findAll();
  }
}

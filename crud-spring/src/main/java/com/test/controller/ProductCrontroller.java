package com.test.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.test.model.Product;
import com.test.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductCrontroller {

  private final ProductService productService;

  public ProductCrontroller(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public List<Product> getProducts() {
    return productService.getProducts();
  }

  @GetMapping("/${id}")
  public Product getProductById(@PathVariable Long id) {
    return productService.getProductById(id);
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Product create(@RequestBody Product product) {
    return productService.create(product);
  }

  @PutMapping("/${id}")
  public Product update(
      @PathVariable() Long id,
      @RequestBody Product product) {
    return productService.update(id, product);
  }

  @DeleteMapping("/${id")
  @ResponseStatus(code = HttpStatus.NO_CONTENT)
  public void delete(@PathVariable() Long id) {
    productService.delete(id);
  }
}

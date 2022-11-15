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

  @GetMapping("/${id}")
  public ResponseEntity<Product> getProductById(@PathVariable Long id) {
    return productRepository.findById(id)
        .map(product -> ResponseEntity.ok().body(product))
        .orElse(ResponseEntity.notFound().build());
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public Product create(@RequestBody Product product) {
    return productRepository.save(product);
  }

  @PutMapping("/${id}")
  public ResponseEntity<Product> update(
      @PathVariable() Long id,
      @RequestBody Product product) {
    return productRepository.findById(id)
        .map(p -> {
          p.setName(p.getName());
          p.setDescription(p.getDescription());
          p.setUrlImage(p.getUrlImage());
          p.setUnitValue(p.getUnitValue());

          Product updatedProduct = productRepository.save(p);

          return ResponseEntity.ok().body(updatedProduct);
        })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/${id")
  public ResponseEntity<Void> delete(@PathVariable() Long id) {
    return productRepository.findById(id)
        .map(product -> {
          productRepository.deleteById(id);

          return ResponseEntity.noContent().<Void>build();
        })
        .orElse(ResponseEntity.notFound().build());
  }
}

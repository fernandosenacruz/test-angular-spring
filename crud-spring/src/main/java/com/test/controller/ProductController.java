package com.test.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.test.dto.ProductDTO;
import com.test.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public List<ProductDTO> getProducts() {
    return productService.getProducts();
  }

  @GetMapping("/${id}")
  public ProductDTO getProductById(@PathVariable Long id) {
    return productService.getProductById(id);
  }

  @PostMapping
  @ResponseStatus(code = HttpStatus.CREATED)
  public ProductDTO create(@RequestBody ProductDTO product) {
    return productService.create(product);
  }

  @PutMapping("/${id}")
  public ProductDTO update(
      @PathVariable() Long id,
      @RequestBody ProductDTO product) {
    return productService.update(id, product);
  }

  @DeleteMapping("/${id")
  @ResponseStatus(code = HttpStatus.NO_CONTENT)
  public void delete(@PathVariable() Long id) {
    productService.delete(id);
  }
}

package com.test.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.test.model.Product;
import com.test.repository.ProductRepository;

@Service
public class ProductService {
	private final ProductRepository productRepository;
	
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	public List<Product> getProducts() {
	    return productRepository.findAll();
	}
	
	public Optional<Product> getProductById(@PathVariable Long id) {
	    return productRepository.findById(id);
	}
	
	public Product create(@RequestBody Product product) {
	    return productRepository.save(product);
	}
	
	public Optional<Product> update(
	  @PathVariable() Long id,
	  @RequestBody Product product) {
	    return productRepository.findById(id)
	        .map(p -> {
	          p.setName(p.getName());
	          p.setDescription(p.getDescription());
	          p.setUrlImage(p.getUrlImage());
	          p.setUnitValue(p.getUnitValue());
	
	          return productRepository.save(p);
        });
	}

	public boolean delete(@PathVariable() Long id) {
	    return productRepository.findById(id)
	        .map(product -> {
	          productRepository.deleteById(id);
	          return true;
	        })
	        .orElse(false);
	}
}

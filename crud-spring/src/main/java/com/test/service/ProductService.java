package com.test.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.test.model.Product;
import com.test.repository.ProductRepository;

import exception.RecordNotFoundException;

@Service
public class ProductService {
	private final ProductRepository productRepository;
	
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	public List<Product> getProducts() {
	    return productRepository.findAll();
	}
	
	public Product getProductById(@PathVariable Long id) {
	    return productRepository.findById(id)
	    		.orElseThrow(() -> new RecordNotFoundException(id));
	}
	
	public Product create(@RequestBody Product product) {
	    return productRepository.save(product);
	}
	
	public Product update(
	  @PathVariable() Long id,
	  @RequestBody Product product) {
	    return productRepository.findById(id)
	        .map(p -> {
	          p.setName(p.getName());
	          p.setDescription(p.getDescription());
	          p.setUrlImage(p.getUrlImage());
	          p.setUnitValue(p.getUnitValue());
	
	          return productRepository.save(p);
        }).orElseThrow(() -> new RecordNotFoundException(id));
	}

	public void delete(@PathVariable() Long id) {
	    productRepository.delete(productRepository.findById(id)
	    		.orElseThrow(() -> new RecordNotFoundException(id)));
	}
}

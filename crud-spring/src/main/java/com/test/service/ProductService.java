package com.test.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.test.dto.ProductDTO;
import com.test.dto.mapper.ProductMapper;
import com.test.repository.ProductRepository;

import com.test.exception.RecordNotFoundException;

@Service
public class ProductService {
	private final ProductRepository productRepository;
	private final ProductMapper productMapper;
	
	public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
		this.productRepository = productRepository;
		this.productMapper = productMapper;
	}
	
	public List<ProductDTO> getProducts() {
	    return productRepository.findAll()
	    		.stream()
	    		.map(productMapper::toDTO)
	    		.collect(Collectors.toList());
	}
	
	public ProductDTO getProductById(@PathVariable Long id) {
	    return productRepository.findById(id)
	    		.map(productMapper::toDTO)
	    		.orElseThrow(() -> new RecordNotFoundException(id));
	}
	
	public ProductDTO create(@RequestBody ProductDTO product) {
	    return productMapper.toDTO(productRepository.save(productMapper.toEntity(product)));
	}
	
	public ProductDTO update(
	  @PathVariable() Long id,
	  @RequestBody ProductDTO product) {
	    return productRepository.findById(id)
	        .map(p -> {
	          p.setName(p.getName());
	          p.setDescription(p.getDescription());
	          p.setUrlImage(p.getUrlImage());
	          p.setUnitValue(p.getUnitValue());
	          p.setCategory(p.getCategory());
	
	          return productMapper.toDTO(productRepository.save(p));
        }).orElseThrow(() -> new RecordNotFoundException(id));
	}

	public void delete(@PathVariable() Long id) {
	    productRepository.delete(productRepository.findById(id)
	    		.orElseThrow(() -> new RecordNotFoundException(id)));
	}
}

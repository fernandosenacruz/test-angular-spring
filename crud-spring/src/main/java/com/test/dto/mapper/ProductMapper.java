package com.test.dto.mapper;

import org.springframework.stereotype.Component;

import com.test.dto.ProductDTO;
import com.test.model.Product;

@Component
public class ProductMapper {

	public ProductDTO toDTO(Product product) {
		if (product == null) return null;
		return new ProductDTO(
				product.getId(), 
				product.getName(),
				product.getDescription(),
				product.getUrlImage(),
				product.getUnitValue()
				);
	}
	
	public Product toEntity(ProductDTO productDTO) {
		if (productDTO == null) return null;
		
		return Product.builder()
				.id(productDTO.id())
				.name(productDTO.name())
				.description(productDTO.description())
				.urlImage(productDTO.urlImage())
				.unitValue(productDTO.unitValue())
				.build();
	}
}

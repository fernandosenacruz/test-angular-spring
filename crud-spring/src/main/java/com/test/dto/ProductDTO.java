package com.test.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.test.enums.Category;

public record ProductDTO(
		@JsonProperty("_id") Long id,
		String name,
		String description,
		String urlImage,
		Double unitValue,
		Category category
		) {}

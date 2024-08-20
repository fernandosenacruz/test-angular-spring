package com.test.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ProductDTO(
		@JsonProperty("_id") Long id,
		String name,
		String description,
		String urlImage,
		Double unitValue
		) {}

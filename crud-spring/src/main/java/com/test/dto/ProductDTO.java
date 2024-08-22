package com.test.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.test.enums.Category;
import com.test.model.Tag;

public record ProductDTO(
		@JsonProperty("_id") Long id,
		String name,
		String description,
		String urlImage,
		Double unitValue,
		Category category,
		List<Tag> tags
		) {}

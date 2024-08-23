package com.test.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Entity
public class Tag {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty("_id")
	private Long id;
	
	@Setter
    @Getter
    @Column(length = 50, nullable = false)
	private String name;
	
	@Column(length = 1,  nullable = false)
	private byte status;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "product_id", nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Product product;
}

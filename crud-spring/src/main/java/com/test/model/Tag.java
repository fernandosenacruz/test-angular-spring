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

@Entity
public class Tag {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(length = 50, nullable = false)
	private String name;
	
	@Column(length = 1,  nullable = false)
	private byte status;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "product_id", nullable = false)
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private Product product;
	
	public void setId(Long id) {
	    this.id = id;
	  }

	  public String getName() {
		  return name;
	  }

	  public void setName(String name) {
		  this.name = name;
	  }

	  public byte getStatus() {
		  return status;
	  }
	  
	  public void getStatus(byte status) {
		  this.status = status;
	  }
	  
	  public Product getProduct() {
		  return product;
	  }
	  
	  public void setProduct(Product product) {
		  this.product = product;
	  }
}

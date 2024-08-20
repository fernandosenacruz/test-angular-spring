package com.test.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @JsonProperty("_id")
  private Long id;

  @Column(length = 100, nullable = false)
  private String name;

  @Column(length = 255, nullable = false)
  private String description;

  @Column(nullable = false)
  private String urlImage;

  private Double unitValue;

public Object getName() {
	// TODO Auto-generated method stub
	return null;
}

public void setName(Object name2) {
	// TODO Auto-generated method stub
	
}

public Object getDescription() {
	// TODO Auto-generated method stub
	return null;
}

public void setDescription(Object description2) {
	// TODO Auto-generated method stub
	
}

public Object getUrlImage() {
	// TODO Auto-generated method stub
	return null;
}

public void setUrlImage(Object urlImage2) {
	// TODO Auto-generated method stub
	
}

public Object getUnitValue() {
	// TODO Auto-generated method stub
	return null;
}

public void setUnitValue(Object unitValue2) {
	// TODO Auto-generated method stub
	
}
}

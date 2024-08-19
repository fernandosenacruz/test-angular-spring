package com.test.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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

  @Column(length = 200, nullable = false)
  private String name;

  @Column(nullable = false)
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

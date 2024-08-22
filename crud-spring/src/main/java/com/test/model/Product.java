package com.test.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.test.enums.Category;
import com.test.enums.convertes.CategoryConverter;


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

  @Column(length = 10, nullable = false)
  private double unitValue;
  
  @Column(nullable = false)
  @Convert(converter = CategoryConverter.class)
  private Category category;
  
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "product")
  private List<Tag> tags = new ArrayList<>();

  public Long getId() {
	  return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
	  return name;
  }

  public void setName(String name) {
	  this.name = name;
  }

  public String getDescription() {
	  return description;
  }
  

  public void setDescription(String description) {
	  this.description = description;
  }

  public String getUrlImage() {
	  return urlImage;
  }

  public void setUrlImage(String urlImage) {
	  this.urlImage = urlImage;
  }

  public double getUnitValue() {
	  return unitValue;
  }

  public void setUnitValue(Double unitValue) {
	  this.unitValue = unitValue;
  }
  
  public Category getCategory() {
	  return category;
  }
  
  public void setCategory(Category category) {
	  this.category = category;
  }
  
  public List<Tag> getTags() {
	  return tags;
  }
  
  public void setTags(List<Tag> tags) {
	  this.tags = tags;
  }
  
  private Product() {}

  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private Long id;
    private String name;
    private String description;
    private String urlImage;
    private Double unitValue;
    private Category category;

    public Builder id(Long id) {
      this.id = id;
      return this;
    }

    public Builder name(String name) {
      this.name = name;
      return this;
    }

    public Builder description(String description) {
      this.description = description;
      return this;
    }

    public Builder urlImage(String urlImage) {
      this.urlImage = urlImage;
      return this;
    }

    public Builder unitValue(Double unitValue) {
      this.unitValue = unitValue;
      return this;
    }
    
    public Builder category(Category category) {
        this.category = category;
        return this;
      }

    public Product build() {
      Product product = new Product();
      product.id = this.id;
      product.name = this.name;
      product.description = this.description;
      product.urlImage = this.urlImage;
      product.unitValue = this.unitValue;
      product.category = this.category;
      return product;
    }
  }
}

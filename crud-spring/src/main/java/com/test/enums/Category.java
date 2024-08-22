package com.test.enums;

public enum Category {
	GAMES("GAMES"),
	SPORTS("SPORTS"),
	FASHION("FASHION"),
	DECORATIO("DECORATION");
	
	private String value;
	
	private Category(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return value;
	}
	
	@Override
	public String toString() {
		return value;
	}
}

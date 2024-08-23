package com.test.enums;

import lombok.Getter;

@Getter
public enum Category {
	GAMES("GAMES"),
	SPORTS("SPORTS"),
	FASHION("FASHION"),
	DECORATION("DECORATION");
	
	private final String value;
	
	private Category(String value) {
		this.value = value;
	}

    @Override
	public String toString() {
		return value;
	}
}

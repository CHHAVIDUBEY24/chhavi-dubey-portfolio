package com.controllers;

import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebController {
	
	@RequestMapping("/home")
	public String homepage() {
		return "home";
	}
	
	@RequestMapping("/about")
	public String about() {
		return "about";
	}
	
	@RequestMapping(value = "/contact")
	public String contact() {
		return "contact";
	}

}
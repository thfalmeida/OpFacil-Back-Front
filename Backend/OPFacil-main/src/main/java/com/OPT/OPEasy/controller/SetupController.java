package com.OPT.OPEasy.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@Controller
@RequestMapping("/setup")
public class SetupController {
    
    @GetMapping("/")
    public ResponseEntity Link(){
        return new ResponseEntity (HttpStatus.OK);
    }
}

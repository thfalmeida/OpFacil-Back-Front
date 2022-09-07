package com.OPT.OPEasy.controller;


import java.util.stream.Stream;

import com.OPT.OPEasy.DTO.TransporteDTO;
import com.OPT.OPEasy.Service.ViagemService;
import com.OPT.OPEasy.model.Transporte;
import com.OPT.OPEasy.model.Viagem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@RequestMapping("/viagem")
@Controller
public class ViagemController {
    @Autowired
    ViagemService viagemService;


    @PostMapping("/cadastrar")
    public ResponseEntity<Viagem> cadastrarViagem(@RequestBody Viagem viagem) throws Exception{
        Viagem newViagem = viagemService.cadastrarViagem(viagem);
        return new ResponseEntity<Viagem>(newViagem, HttpStatus.CREATED);
    }


    @DeleteMapping("/deletar/{id}")
    public ResponseEntity<Viagem> deleteViagem(@PathVariable Long id){
        Viagem viagem = viagemService.getViagemById(id);
        viagemService.deleteViagem(viagem);
        return new ResponseEntity<Viagem>(viagem, HttpStatus.OK);
    }

    @PutMapping("/atualizar/{id}")
    public ResponseEntity<Viagem> editarViagem(@PathVariable Long id, @RequestBody Viagem viagem) throws Exception{
        Viagem newViagem = viagemService.editarViagem(viagem);
        return new ResponseEntity<Viagem>(newViagem, HttpStatus.OK);
    }

    @PutMapping("/transporte/atualizar/{id}")
    public ResponseEntity<Transporte> editarTransporte(@PathVariable Long id, @RequestBody Transporte transporte) throws Exception{
        Transporte editedTransporte = viagemService.editarTransporte(transporte);
        return new ResponseEntity<Transporte>(editedTransporte, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Stream<Viagem>> listarViagems(){
        Stream<Viagem> viagems = viagemService.findAll();
        return new ResponseEntity<>(viagems, HttpStatus.OK);
    }

    @GetMapping("/motorista/{id}")
    public ResponseEntity<Stream<Viagem>> consultarViagemByMotorista(@PathVariable Long id){
        Stream<Viagem> viagens = viagemService.getViagemByMotorista(id);
        return new ResponseEntity<Stream<Viagem>>(viagens, HttpStatus.OK);
    }

    @GetMapping("/empresa/{id}")
    public ResponseEntity<Stream<Viagem>> consultarViagemByEmpresa(@PathVariable Long id){
        Stream<Viagem> viagens = viagemService.getViagemByEmpresa(id);
        return new ResponseEntity<Stream<Viagem>>(viagens, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Viagem> consultarViagem(@PathVariable Long id){
        Viagem viagem = viagemService.getViagemById(id);
        return new ResponseEntity<Viagem>(viagem, HttpStatus.OK);
    }

    @PutMapping("/transporte/add/{id}")
    public ResponseEntity<Viagem> addTransporte(@PathVariable Long id,@RequestBody TransporteDTO transporte) throws Exception{
        Viagem viagem = viagemService.addTransporte(id, transporte);
        return new ResponseEntity<Viagem>(viagem, HttpStatus.OK);
    }

    @DeleteMapping("/transporte/delete/{id}")
    public ResponseEntity<Transporte> deletarTransporte(@PathVariable Long id) throws Exception{
        Transporte transporte2 = viagemService.deletarTransporte(id);
        return new ResponseEntity<Transporte>(transporte2, HttpStatus.OK);
    }

    // @GetMapping("/report")
    // public ResponseEntity<List<Transporte>> gerarRelatorio(@RequestBody ViagemRelatorioDTO rel) throws FileNotFoundException, IOException{
    //     List<Transporte> viagens = writterService.generateReport(rel);
    //     return new ResponseEntity<>(viagens, HttpStatus.OK);
    // }
}

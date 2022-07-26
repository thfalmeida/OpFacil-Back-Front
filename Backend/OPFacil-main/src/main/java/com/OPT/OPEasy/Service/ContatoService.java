package com.OPT.OPEasy.Service;

import java.util.stream.Stream;

import com.OPT.OPEasy.Util.ResourceNotFoundException;
import com.OPT.OPEasy.model.Contato;
import com.OPT.OPEasy.model.Empresa;
import com.OPT.OPEasy.repository.ContatoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContatoService {
    
    @Autowired
    ContatoRepository contatoRepository;
    @Autowired 
    EmpresaService empresaService;


    public Contato CadastrarContato(Contato contato) throws Exception{
        checkContatoCreate(contato);
        if(hasContatoByNick(contato.getNick()))
            throw new Exception("Nick informado já se encontra cadastrado. Tente outro.");
        
        Empresa empresa = contato.getEmpresa();
        if(empresa != null){
            checkUpdateEmpresa(contato);
            empresa = empresaService.getEmpresaByID(empresa.getId());
            contato.setEmpresa(empresa);
        }
        
        contatoRepository.save(contato);
        return contato;
    }

    public Contato updateContato(Long id,Contato contato) throws Exception{
        Contato contatoFound = checkContatoUpdate(id, contato);
        checkUpdateEmpresa(contato);
        contatoFound.setAttributes(contato);
        contatoFound.setEmpresa(contato.getEmpresa());
        contatoRepository.save(contatoFound);
        return contatoFound;
    }

    public Contato deleteContato(Contato contato){
        contatoRepository.findById(contato.getId()).orElseThrow(
            () -> new ResourceNotFoundException("O ID informado não foi encontrado."));
        contatoRepository.delete(contato);
        return contato;
    }

    public Stream<Contato> findAll(){
        return contatoRepository.findAll().stream();
    }

    public Contato getContatoById(Long id){
        Contato contato = contatoRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("O ID informado não foi encontrado."));
        return contato;
    }

    public Contato getContatoByNick(String nick){
        Contato contato = contatoRepository.findByNick(nick).orElseThrow(
            () -> new ResourceNotFoundException("O nick informado não foi encontrado."));
        return contato;
    }

    public boolean hasContatoByNick(String nick){
        return contatoRepository.findByNick(nick).isPresent();
    }

    public boolean hasContatoById(Long id){
        return contatoRepository.findById(id).isPresent();
    }

    private void checkContatoCreate(Contato contato) throws Exception{
        if(contato.getNome() == null)
            throw new Exception("O nome do contato não pode ser nulo");
        if(contato.getNick() == null)
            throw new Exception("O nick do contato não pode ser nulo");
        if(contato.getEmail() == null)
            throw new Exception("O email do contato não pode ser nulo");
    }

    //Checa se o esta tentando alterar o nick do contato,
    //Se estiver, checa se existe outro contato com o nick, 
    //caso exista, retorna erro, no contrário, o contato é alterado 
    public Contato checkContatoUpdate(Long id, Contato contato) throws Exception{
        Contato contatoFound = contatoRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("O ID informado não foi encontrado."));

        String nick = contato.getNick();

        if(contato.getNick() == null || contato.getNick() == "")
            throw new Exception("O nick não pode ser nulo");
        
        if (!hasContatoByNick(nick))
            return contatoFound;

        Contato contatoByNick = contatoRepository.findByNick(nick).get();
        if(contatoByNick.getId() == contatoFound.getId()){
            return contatoFound;
        } else{
            throw new Exception("Nick informado já se encontra cadastrado. Tente outro.");
        }
    }

    private void checkUpdateEmpresa(Contato contato) throws Exception{

        Empresa empresa = contato.getEmpresa();
        if(!empresaService.hasEmpresaById(empresa.getId()))
            throw new Exception("A empresa do contato não foi encontrada: Id");
        
        if(!empresaService.hasEmpresaByNick(empresa.getNick()))
            throw new Exception("A empresa do contato não foi foi encontrada: Nick");
        
    }

}


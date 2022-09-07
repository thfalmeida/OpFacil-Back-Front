package com.OPT.OPEasy.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

import com.OPT.OPEasy.DTO.TransporteDTO;
import com.OPT.OPEasy.Util.ResourceNotFoundException;
import com.OPT.OPEasy.model.Empresa;
import com.OPT.OPEasy.model.Mercado;
import com.OPT.OPEasy.model.Motorista;
import com.OPT.OPEasy.model.Transporte;
import com.OPT.OPEasy.model.Viagem;
import com.OPT.OPEasy.repository.TransporteRepository;
import com.OPT.OPEasy.repository.ViagemRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ViagemService {
    
    @Autowired
    private MotoristaService motoristaService;
    @Autowired
    private EmpresaService empresaService;
    @Autowired
    private MercadoService mercadoService;

    @Autowired
    private ViagemRepository viagemRepository;
    @Autowired
    private TransporteRepository transporteRepository;

    
    public Viagem cadastrarViagem(Viagem viagem) throws Exception{
        checkCadastroViagem(viagem);
        List<Transporte> transps = checkTransporte(viagem.getTransportes());
        viagem.setTransportes(transps);
        for (Transporte transporte : transps) {
            transporteRepository.save(transporte);
        }
        Viagem newViagem = new Viagem();
        newViagem.setAttributes(viagem);
        viagemRepository.save(newViagem);

        return newViagem;
    }

    public Viagem deleteViagem(Viagem viagem){
        Viagem viagemFound = getViagemById(viagem.getId());
        viagemRepository.delete(viagemFound);
        System.out.println(viagemFound.getTransportes().size());
        for(Transporte transporte : viagemFound.getTransportes()){
            transporteRepository.delete(transporte);
        }
        return viagemFound;
    }

    public Viagem addTransporte(Long id, TransporteDTO transporteDTO) throws Exception{
        Viagem viagem = getViagemById(id);

        Transporte transporte = new Transporte();
        boolean alreadyHasTransport = hasTransporte(transporteDTO.getTransporte());
        if(alreadyHasTransport){
            throw new Exception("Transporte já cadastrado");
        }

        Mercado mercado = mercadoService.getMercadoByID(transporteDTO.getMercadoID());
        transporte.setMercado(mercado);
        transporte.setTransporte(transporteDTO.getTransporte());
        transporteRepository.save(transporte);

        viagem.AddTransporte(transporte);
        viagemRepository.save(viagem);
        return viagem;
    }

    public Transporte deletarTransporte(Long id) throws Exception{
        Transporte transporte = transporteRepository.findById(id).orElseThrow(
            () -> new Exception( "Transporte não encontrado"));

        
        deleteTransporte(transporte.getId());
        transporteRepository.delete(transporte);
        return transporte;

    }

    public Viagem editarViagem(Viagem viagem) throws Exception{
        //Confirma se existe alguma viagem com o ID recebido
        Viagem viagemFound = getViagemById(viagem.getId());
        
        //Confirma que se houver motorista e empresa cadastrados na viagem, eles existam na base de dados
        checkEditViagem(viagem);
        //Confirma que cada transporte inserido já não tenha sido cadastrado anteriormente
        //E exclui transportes repetidos (com o mesmo numero de transporte)
        List<Transporte> transportes = viagem.getTransportes();
        if(!transportes.isEmpty()){
            transportes = checkTransporte(transportes);
            viagem.setTransportes(transportes);
        }
        List<Transporte> allTransportes = viagemFound.getTransportes();
        allTransportes.addAll(viagem.getTransportes());
        viagem.setTransportes(allTransportes);

        viagemFound.updateViagem(viagem);
        viagemRepository.save(viagemFound);
        return viagemFound;

    }

    public Transporte editarTransporte(Transporte transporte) throws Exception{
        Transporte transporteFound = transporteRepository.findById(transporte.getId()).orElseThrow(
            () -> new Exception ("Transporte não encontrado"));
        
        checkTransporte(transporte);
        Viagem viagem = getViagemByTransporte(transporte);

        viagem.DeleteTransporte(transporteFound);
        transporteFound.SetTransporteAttributes(transporte);
        viagem.AddTransporte(transporteFound);
        transporteRepository.save(transporteFound);

        return transporteFound;
    }

    public boolean hasTransporte(Long transporte){
        return transporteRepository.findByTransporte(transporte).isPresent();       
    }

    public Stream<Viagem> findAll(){
        return viagemRepository.findAll().stream();
    }

    public Viagem getViagemById(Long id){
        Viagem viagem = viagemRepository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException("Viagem não encontrada"));

            
        return viagem;
    }

    public Stream<Viagem> getViagemByMotorista(Long motoristaID){
        Motorista motorista = motoristaService.getMotoristaByID(motoristaID);
        Stream<Viagem> viagens = viagemRepository.findByMotorista(motorista).stream();
        return viagens;
    }

    public Stream<Viagem> getViagemByEmpresa(Long empresaID){
        Empresa empresa = empresaService.getEmpresaByID(empresaID);
        Stream<Viagem> viagens = viagemRepository.findByEmpresa(empresa).stream();
        return viagens;
    }

    private void checkEditViagem(Viagem viagem) throws Exception{
        Motorista motorista = viagem.getMotorista();
        if(motorista != null && motorista.getId() != null && !motoristaService.hasMotoristaById(motorista.getId()))
            throw new Exception("Motorista não encontrado");
        
        Empresa empresa = viagem.getEmpresa();
        if(empresa != null && empresa.getId() != null && !empresaService.hasEmpresaById(empresa.getId()))
            throw new ResourceNotFoundException("Empresa não encontrada");
    }


    public void checkCadastroViagem(Viagem viagem) throws Exception{
        List<Transporte> transportes = viagem.getTransportes();
        if(transportes == null || transportes.size() < 1)
            throw new Exception("A viagem precisa ter transportes cadastrados");

        Motorista motorista = viagem.getMotorista();
        if(motorista == null || motorista.getId() == null)
            throw new ResourceNotFoundException("Motorista não pode ser nulo ou vazio.");
        if(!motoristaService.hasMotoristaById(motorista.getId()))
            throw new Exception("Motorista não encontrado");
        
        Empresa empresa = viagem.getEmpresa();
        if(empresa == null || empresa.getId() == null)
        throw new ResourceNotFoundException("Empresa não pode ser nulo ou vazio.");
        if(!empresaService.hasEmpresaById(empresa.getId()))
            throw new ResourceNotFoundException("Empresa não encontrada");
        
    }

    public List<Transporte> checkTransporte(List<Transporte> transportes) throws Exception{
        List<Transporte> listaRetorno = new ArrayList<Transporte>();
        for (Transporte transporte : transportes) {
            Long transp = transporte.getTransporte();
            Mercado mercado = transporte.getMercado();

            if(transp == null || transp < 0)
                throw new Exception("Valor do transporte não pode ser nulo ou negativo");
            if(mercado != null && mercado.getId() != null){
                if(!mercadoService.hasMercadoById(mercado.getId()))
                    throw new Exception("Mercado não encontrado.");
                
                listaRetorno.add(transporte);
            }
                
        }


        //Checa se há transportes repetidos na lista de transportes
        for(int i = 0; i < transportes.size(); i++){
            for(int j = 0; j < transportes.size(); j++){
                Long transp1 = transportes.get(i).getTransporte();
                Long transp2 = transportes.get(j).getTransporte();
                if(i != j && transp1 == transp2)
                    throw new Exception("Não é possível cadastrar dois transportes com o mesmo código de transporte: " + transp1);
            }
        }

        
        //Checa se já possui transportes cadastrados.
        for (Transporte transporte : transportes) {
            if(hasTransporte(transporte.getTransporte()))
                throw new Exception("Transporte " + transporte.getTransporte() + "já se encontra cadastrado");
        }

        return listaRetorno;
    }

    private void checkTransporte(Transporte transporte) throws Exception{
        Transporte transporteFound = transporteRepository.findById(transporte.getId()).orElseThrow(
            () -> new Exception("Transporte não encontrado")
        );

        //Caso seja necessário alterar o numero do transporte, checa se existe outro transporte já cadastrado com
        //o numero inserido
        if(transporte.getTransporte() != null && transporte.getTransporte() != transporteFound.getTransporte()){
            if (hasTransporte(transporte.getTransporte()))
                throw new Exception("O numero de transporte inserido já foi cadastrado em outro transporte");
        }
    }
    private void deleteTransporte(Long id){
        List<Viagem> viagens = viagemRepository.findAll();
        for(Viagem viagem: viagens){
            for(Transporte transp : viagem.getTransportes()){
                if(transp.getId() == id){
                    viagem.DeleteTransporte(transp);
                    return;
                }
            }
        }
    }

    private Viagem getViagemByTransporte(Transporte transporte) throws Exception{ 
        List<Viagem> viagens = viagemRepository.findAll();
        for(Viagem viagem : viagens){
            List<Transporte> transportes = viagem.getTransportes();
            for(Transporte transp : transportes){
                if(transp.getId() == transporte.getId())
                    return viagem;
            }
        }
        throw new Exception("Nenhuma viagem associada à esse transporte foi encontrado. Favor, verificar e corrigir o bando de dados.");
    }

}
 
export function criar_viagem(id, motorista, empresa, avaria, valor, transportes){
    let obj = {}
    obj.id = id;
    obj.motorista = motorista;
    obj.empresa = empresa;
    obj.avaria = avaria;
    obj.valor = valor;
    obj.transportes = transportes;

    return obj
}
export let viagemEmpty = criar_viagem(-1, {}, {}, 0, 0, [{}])

export function criar_transporte(id, transporte, universo, mercado){
    let obj = {}
    obj.id = id;
    obj.transporte = transporte;
    obj.universo = universo;
    obj.mercado = mercado

    return obj;
}
export let transporteEmpty = criar_transporte(-1, -1, -1, {})
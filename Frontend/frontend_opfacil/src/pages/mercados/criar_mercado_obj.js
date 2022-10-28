export function criar_mercado(id, nome, endereco, nick){
    let obj = {}

    id ? obj.id = id : obj.id = -1
    obj.nome = nome
    obj.endereco = endereco
    obj.nick = nick
    return obj
}

export let mercadoEmpty = criar_mercado(-1, "", "", "")
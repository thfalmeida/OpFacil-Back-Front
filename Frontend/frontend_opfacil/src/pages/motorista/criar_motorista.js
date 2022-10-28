export function criar_motorista(id, nome, nick){
    let obj = {}

    obj.id = id
    obj.nome = nome
    obj.nick = nick
    return obj;
}

export let motoristaEmpty = criar_motorista(-1, "", "")
export function criar_empresa(id, razaoSocial, nick, endereco){
    let obj = {}
    obj.id = id 
    obj.razaoSocial = razaoSocial
    obj.nick = nick
    obj.endereco = endereco
    return obj;
}

export let empresaEmpty = criar_empresa(-1, "", "", "");
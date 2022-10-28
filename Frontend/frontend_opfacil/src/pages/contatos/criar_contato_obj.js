export function criar_contato(id, nome, email, nick, empresa){
    let obj = {}
    obj.id = id 
    obj.nome = nome
    obj.email = email
    obj.nick = nick
    obj.empresa = empresa
    return obj;
}

export let contatoEmpty = criar_contato(-1, "", "", "", "", {})
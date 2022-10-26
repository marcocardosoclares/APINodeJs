const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const allowListRefreshToken = require('../../redis/allowlist-refresh-token');
const blocklistAccessToken = require('../../redis/blocklist-access-token');
const { InvalidArgumentError } = require('../erros');


async function criaTokenJwt(id, [quantidade, unidade]) {
    const payload = { id };
    const token = jwt.sign(payload, process.env.CHAVE_JWT, 
        { expiresIn: quantidade + unidade }
    );
    return token;
}

async function verificaTokenJwt(token, nome, blocklist) {
    await verificaTokenNaBlockList(token, nome, blocklist)
    const { id } = jwt.verify(token, process.env.CHAVE_JWT);
    return id;
}

async function verificaTokenNaBlockList(token, nome, blocklist) {
    if (!blocklist) {
        return;
    }
    if (await blocklist.contemToken(token)) {
        throw new jwt.JsonWebTokenError(`${nome} inválido por logout`)
    }
}

async function invalidaTokenJwt(token, blocklist) {
    return await blocklist.adiciona(token)
}
  
async function criaTokenOpaco(id, [quantidade, unidade], allowlist) {
    const tokenOpaco = crypto.randomBytes(24).toString('hex');
    const dataExpiracao = moment().add(quantidade, unidade).unix();
    await allowlist.adiciona(tokenOpaco, id, dataExpiracao);
    return tokenOpaco;
}

async function verificaTokenOpaco(token, nome, allowlist) {
    verificaTokenEnviado(token, nome);
    
    const id = await allowlist.buscaValor(token);
    verificaTokenValido(id, nome);
  
    return id
}

function verificaTokenValido(id, nome) {
    if (!id) {
        throw new InvalidArgumentError(`${nome} inválido`);
    }
}

function verificaTokenEnviado(token, nome) {
    if (!token) {
        throw new InvalidArgumentError(`${nome} não enviado!`);
    }
}

async function invalidaTokenOpaco(refreshToken, allowlist) {
    await allowlist.deleta(refreshToken);
}
  
module.exports = {
    access: {
        nome: 'Access token',
        lista: blocklistAccessToken,
        expiracao: [15, 'm'],
        cria(id) {
            return criaTokenJwt(id, this.expiracao);
        },
        verifica(token) {
            return verificaTokenJwt(token, this.nome, this.lista)
        },
        invalida(token) {
            return invalidaTokenJwt(token, this.lista);
        }
    },

    refresh: {
        nome: 'Refresh token',
        lista: allowListRefreshToken,
        expiracao: [5, 'd'],
        cria(id) {
            return criaTokenOpaco(id, this.expiracao, this.lista);
        },
        verifica(token) {
            return verificaTokenOpaco(token, this.nome, this.lista);
        },
        invalida(token) {
            return invalidaTokenOpaco(token, this.lista);
        }  
    },

    verificacaoEmail: {
        nome: 'Refresh token',
        expiracao: [1, 'h'],
        cria(id) {
            return criaTokenJwt(id, this.expiracao);
        },
        verifica(token) {
            return verificaTokenJwt(token, this.nome)
        }
    }
}
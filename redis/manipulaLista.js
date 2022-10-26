const {promisify} = require('util');

module.exports = lista => {
    const setAsync = promisify(lista.set).bind(lista);
    const existAsync = promisify(lista.exists).bind(lista);
    const getAsync = promisify(lista.get).bind(lista);
    const delAsync = promisify(lista.del).bind(lista);
    return {
        async adiciona(chave, valor, dataExpericacao) {
            await setAsync(chave, valor);
            lista.expireat(chave, dataExpericacao);
        },

        async contemChave(chave) {
            const resultado = await existAsync(chave);
            return resultado === 1;
        },

        async buscaValor(chave) {
            return getAsync(chave);
        },

        async deleta(chave) {
            await delAsync(chave);
        }
    }
}
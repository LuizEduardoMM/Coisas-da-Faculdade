//Desenvolvido por Eduardo Marrano. Github:https://github.com/LuizEduardoMM
const fs = require('fs')
const path = require('path')


 lista_usada = []
listas_unidas = []

const caminhoarq1 = path.join(__dirname, 'dados1.txt')
const caminhoarq2 = path.join(__dirname, 'dados2.txt')
const caminhoarqr = path.join(__dirname, 'resultado.txt')// criando caminho para os arquivos


const conteudoarq1 = fs.readFileSync(caminhoarq1)
const conteudoarq2 = fs.readFileSync(caminhoarq2) // pegando o conteudos dos mesmos

const transformstring1 = conteudoarq1.toString()
const transformstring2 = conteudoarq2.toString() // transformando em strings para poder filtrar o texto

const deletarcaracter = (b) => (a) => a.split(b).join('')
const deletarlixoRegex = deletarcaracter(/[&/\\#,+()$~%.“'":*-?–<>{}0-9\n\r]/g, "")// criando a função para limpar os textos
const deletarnoarq1 = deletarlixoRegex(transformstring1)
const deletarnoarq2 = deletarlixoRegex(transformstring2) // deletando nos dois arquivos
const resultado1 = deletarnoarq1.toString()
const resultado2 = deletarnoarq2.toString()         // armazenando o arquivo limpo


listas_unidas = resultado1.concat(resultado2).split(' ')//unindo as listas e separando cada palavra


listas_unidas.forEach(value => {
    !lista_usada.includes(value) ? lista_usada.push(value) : null;})  // preenchendo lista que contem todas as palavras dos textos

const contador = listas_unidas.reduce(
    (contador, key) => {
        contador[key] = 1 + contador[key] || 1;
        return contador
    }, {});      // contador de frequencia de cada palavra

const contadoremordem = Object.entries(contador).sort((a, b) => b[1] - a[1]); // pondo o nome e a frequencia numa função em ordem

contadoremordem.forEach(value => {
    fs.writeFileSync(caminhoarqr, "Palavra: '" + value[0] + "', qtde: " + value[1] + ", %: " + ((value[1] / listas_unidas.length) * 100).toFixed(2)+"\n", {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    })
}) // escrevendo no arquivo final o resultado










// Desenvolvido por Eduardo Marrano, github: https://github.com/LuizEduardoMM
const calcularporcentagemmultilplicacao= (auxiliar)=>(numbase)=>(porcen)=> numbase*(auxiliar+porcen/100) // Versao currificada da função para calcular porcentagem, permitindo reuso
const calcularporcentagemdeumnum=calcularporcentagemmultilplicacao(0)(0+document.getElementById("basecon"))(0+document.getElementById("porcon"))//Nessa função o auxiliar é predefinido para a formula e os outros dois valores puxamos do arquivo html
const resultadocalc1=()=>{
    const resultado=calcularporcentagemdeumnum
    document.getElementById("resultado").innerHTML=resultado;
}
const aumentopercentual=calcularporcentagemmultilplicacao(1)//vide linha 2
console.log(aumentopercentual(100)(10))
const descontopercentual=calcularporcentagemmultilplicacao(1)//vide linha 2
console.log(descontopercentual(100)((10)*-1))
const calcularporcentagemdivisao=(auxiliar)=>(numbase)=>(porcen)=>numbase/(auxiliar+porcen/100)//vide linha 1, unica mudança sendo a divisao para a formula
const margemdevenda=calcularporcentagemdivisao(1)//vide linha 2
console.log(margemdevenda(100)((10)*-1))
const variarelapercenyual=(auxiliar)=>(numbase)=>(porcen)=>((numbase/porcen)+auxiliar)*100
const variacaoperenctuall=variarelapercenyual(-1)
const relacaopercentuall=variarelapercenyual(0)
console.log(variacaoperenctuall(87)(100))
console.log(relacaopercentuall(10)(100))
const valorfuturojurossimples=(valorpres,taxa,periodo)=>{
    const resultado= valorpres*(1+((taxa/100)*periodo))
    return resultado
}
console.log(valorfuturojurossimples(1000,5,3))

    const valorpresentejurossimples=(valorfuturo,taxa,periodo)=>{
    const resultado= valorfuturo/(1+(taxa/100)*periodo)
        return resultado
}
console.log(valorpresentejurossimples(1500,5,3))
const taxaouperiodos= (periodo)=>(taxa)=>(valorpresente)=>(valorfuturo)=>(valorfuturo-valorpresente)/(valorpresente*periodo*(taxa/100))//mais um caso de curry, onde pode se anular ou a taxa ou o periodo fazendo a formula do proprio anulado
const periodos=taxaouperiodos(1)
console.log(periodos(5)(1000)(20000))
//const taxa=taxaouperiodos()(100)

const potencia = (base,expoente) => {
    if (base<0) return 1/potenciaaux(base,expoente*(-1))
    else return potenciaaux(base,expoente)
}

const potenciaaux = (base,expoente) => {
    if (expoente == 0) {return 1}
    else return base*potenciaaux(base,expoente-1)
}

const valorfuturojuroscomp=(valoratual,taxa,periodo)=>{
    const resultado=valoratual*potencia(1+taxa/100,periodo+0) //esse +0 sempre que for usada a potencia é para que a função entenda que esse é o expoente
return resultado
}
console.log(valorfuturojuroscomp(1000,5,3))
const valorpresentejuroscomp=(valorfuturo,taxa,periodo)=>{
    const resultado=valorfuturo/potencia(1+taxa/100,0+periodo)
    return resultado
}
console.log(valorpresentejuroscomp(1157.63,5,3))
const taxaemjuroscomp=(valoratual,valorfuturo,periodo)=>{
    const resultado=(Math.pow(valorfuturo/valoratual,1/periodo)-1)*100
    return resultado
}
console.log(taxaemjuroscomp(500,1000,3))
const periodoemjuroscomp=(valorpresente,valorfuturo,taxa)=>{
    const resultado=Math.log(valorfuturo/valorpresente)/Math.log(1+taxa/100)
    return resultado
}
console.log(periodoemjuroscomp(1000,1157.63,5))
const conversaotaxadejuros=(periodode)=>(periodopara)=>(taxa)=>(potencia(periodode+taxa/100,0+periodopara)-1)*100
const converteste=conversaotaxadejuros(1)(360)(5)
console.log(converteste)
const valorfuturodinhonotemp=(taxa,periodo,valorperiodico,valorpresente)=>{
    const resultado=valorpresente*potencia(1+taxa/100,periodo+0)+valorperiodico*(potencia(1+taxa/100,0+periodo)-1)/(taxa/100)
    return resultado
}
console.log(valorfuturodinhonotemp(1.5,360,400,20000))
const valorpresentedinhnotemp=(taxa,periodo,valorperiodico,valorfuturo)=>{
    const resultado=valorfuturo/potencia(1+taxa/100,0+periodo)+valorperiodico*(potencia(1+taxa/100,0+periodo)-1)/(potencia(1+taxa/100,1+periodo)-potencia(1+taxa/100,0+periodo))
    return resultado
}
console.log(valorpresentedinhnotemp(1.5,20,11,200))

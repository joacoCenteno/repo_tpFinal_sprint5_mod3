export function renderizarPais(pais){
    return{
        Id: pais._id,
        nombrePais: pais.nombrePais,
        capitalPais: pais.capitalPais,
        fronteraPais: pais.fronteraPais,
        areaPais: pais.areaPais,
        poblacionPais: pais.poblacionPais,
        desigualdadPais: pais.desigualdadPais,
        zonaHorariaPais: pais.zonaHorariaPais,
        banderaPais: pais.banderaPais 
    }
}

export function renderizarListaPaises(paises){
    return paises.map(pais => renderizarPais(pais));
}

import {types} from '../../types/types';

//Aquí añadimos cada opcion existente para crear el estado inicial y saber que opcion mostrar como seleccionada
export const stateInit = {
    '/inicio' : '',
    '/usuarios' : '',
    '/acount' : ''//por defecto
}

//Los módulos que todos los perfiles tienen
const compartidos = [
    {
        to: "/inicio",
        name: "Inicio",
        icon: "fa fa-home fa-2x fa-fw"
    },
   
];

//Modulos que solo el usuario estandar tiene
const estandar = [];

//Modulos que solo el usuario administrador tiene
const administrador = [
    {
        to: "/usuarios",
        name: "Usuarios",
        icon: "fa fa-users fa-2x fa-fw"
    },
    {
        to: "/usuarios2",
        name: "Usuarios 2",
        icon: "fa fa-users fa-2x fa-fw"
    },
    {
        to: "/slide",
        name: "Slide",
        icon: "fas fa-arrows-alt-h fa-2x fa-fw"
    }
];

export const menus = (access)=>{
    switch (access) {
        case types.administrador:
            return [...compartidos,...administrador,];
        case types.estandar:
            return [...compartidos,...estandar];
        default:
            return [...compartidos,...estandar];
    }
}
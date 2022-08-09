import { rutasAdministrador} from './tipos/administrador';
import { rutasEstandar } from './tipos/estandar';
import {types} from '../types/types';


export const router = (access)=>{
    switch (access) {
        case types.administrador:
            return rutasAdministrador;
        case types.estandar:
            return rutasEstandar;
        default:
            return rutasEstandar
    }  
}

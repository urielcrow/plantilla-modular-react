import { useContext , useEffect } from 'react';
import {customeContext} from '../../context/context';

const PerfilScreen = ()=>{

    const { setContext } = useContext(customeContext);

    useEffect(() => {
        setContext( context => (
            {   ...context,
                titlePage : 'Mi perfil'
            })
        );
    },[setContext]);


    return(
        <h3>Mi cuenta</h3>
    );
}

export default PerfilScreen;
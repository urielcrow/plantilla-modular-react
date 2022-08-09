import React, {useContext,useEffect,useState,useCallback,useRef} from 'react';
import {fetchCustome} from '../../helpers/fetch';
import {customeContext} from '../../context/context';
import {Pager,generateLimit} from '../utils/pager/Pager';


const UsuariosScreen = () => {

    const totalRegistrosPorPagina = 25;
    const paginaInicial = 1;

    //Generemos nuestro limite de manera calculada por si queremos iniciar en una pagina distinta a la 1
    const limit = [generateLimit(paginaInicial,totalRegistrosPorPagina),totalRegistrosPorPagina];

    //campos de busqueda para controlar las entrads del usuario
    const [filters, setFilters] = useState({
        name : ''
    });

    //Es una copia para ejecutar la busqueda una vez que el debonce se ejecuta
    const [filtersFetch, setFiltersFetch] = useState({
        name : ''
    });

    //Con el context asignamos el nombre al módulo
    const { setContext } = useContext(customeContext);

    useEffect(() => {
        setContext( context => (
            {   ...context,
                titlePage : 'Usuarios'
            })
        );
    },[setContext]);

    //Controlamos la data de usuarios y el indicador de cargando la data
    const [usuarios, setUsuarios] = useState({
        data:[],
        load:true
    });

    //Controlamos los cambios en el limit procenientes del paginador, y controlamos el total de registros que vengan de la API
    const [page,setPage] = useState({
        limit,
        totalRegistros : 0,
        current : paginaInicial
    });

    const cargarUsuarios = useCallback(async ()=>{
    
        let resp = await fetchCustome(  { endpoint : `usuarios?start=${page.limit[0]}&end=${page.limit[1]}&q=${filtersFetch.name}`, method : 'GET', token : true}  );
        resp = await resp.json();

        console.log(resp)

        setUsuarios( state => state = {
            ...state,
            data : resp.result.msg.usuarios_por_pagina,
            load : false
        } );

        setPage(state => state ={
            ...state,
            totalRegistros : resp.result.msg.usuarios_existentes
        });

    },[ page.limit ]);// eslint-disable-line react-hooks/exhaustive-deps
    //con el comentario anterior elimino el WARNING filtersFetch.name, porque en el mismo sitio estoy actualizando page.limit y filtersFetch.name, lo que provaca que se llama 2 veces al fetch

    useEffect(() => {
        cargarUsuarios();
    }, [ cargarUsuarios ]);

    //Funcion en la que esperamos respuesta del paginador
    const pagina = useCallback((pag)=>{

        //Indicamos al usuario que estamos cargando los nuevos datos
        setUsuarios(state => state={
            ...state,
            load : true
        });

        //establecemos el nuevo limit en la petición y actualizamos la pagina actual en caso de que queramos sincronizar más de 1 paginador
        setPage(state => state ={
            ...state,
            limit : pag.limit,
            current : pag.pag
        });

    },[]);


    const debonceRef = useRef(null);
    
    const filterChange = (e)=>{

        if(debonceRef.current)
            clearTimeout(debonceRef.current);

        setFilters({
            ...filters,
            [e.target.name] : e.target.value
        });

        debonceRef.current = setTimeout(()=>{

            setFiltersFetch({
                ...filtersFetch,
                [e.target.name] : e.target.value
            });
    
            //Indicamos al usuario que estamos cargando los nuevos datos
            setUsuarios(state => state={
                ...state,
                load : true
            });
    
             //establecemos el nuevo limit en la petición y actualizamos la pagina actual en caso de que queramos sincronizar más de 1 paginador
            setPage(state => state ={
                ...state,
                limit : [0,totalRegistrosPorPagina],
                current : 1
            });

        },500);

    }
  
    return (
        <div className="main-content">
            <div className="main-content-inner">
                <div className="row">
                    <div className="col-lg-12 mt-3">
                        <div className="card">
                            <div className ="card-body">

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="row card-counter primary">
                                            <div className="col-4">
                                                <i className="fa fa-users fa-3x"></i>
                                            </div>
                                            <div className="col-8">
                                                <span className="count-name">Registros: </span>
                                                <span className="count-numbers">{page.totalRegistros}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 mt-5">
                                        <input type="text" placeholder="nombre..." name="name" className="form-control" value={filters.name} onChange={filterChange}/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                    
                                        <Pager pagina={pagina} totalRegistrosPorPagina={totalRegistrosPorPagina} totalRegistros={page.totalRegistros} paginaActual={page.current}/>
                                        {
                                            usuarios.load   
                                            ?
                                            <div style={{minHeight:450, width:'100%'}} className='d-flex align-items-center justify-content-center'>
                                                <i className='fa fa-spinner fa-spin text-info' style={{fontSize:80}}></i>
                                            </div>
                                            :
                                            imprimirUsuarios(usuarios.data)
                                        }
                                        <Pager pagina={pagina} totalRegistrosPorPagina={totalRegistrosPorPagina} totalRegistros={page.totalRegistros} paginaActual={page.current}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const imprimirUsuarios = (usuarios)=>(
    usuarios.map(usuario=>(
        <div className="row" key={usuario.id}>
            <div className="col-12">
                <pre>{ JSON.stringify(usuario.nombre,null,2)}</pre>
            </div>
        </div>
    ))
)

export default UsuariosScreen;


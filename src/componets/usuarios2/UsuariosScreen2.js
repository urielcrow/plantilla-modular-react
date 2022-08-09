import React, {useContext,useEffect,useState,useCallback,useRef} from 'react';
import {fetchCustome} from '../../helpers/fetch';
import {customeContext} from '../../context/context';
import {Pager,generateLimit} from '../utils/pager/Pager';


const UsuariosScreen2 = () => {

    const totalRegistrosPorPagina = 5;
    const paginaInicial = 1;

    //Generemos nuestro limite de manera calculada por si queremos iniciar en una pagina distinta a la 1
    const limit = [generateLimit(paginaInicial,totalRegistrosPorPagina),totalRegistrosPorPagina];

    //campos de busqueda para controlar las entradas del usuario
    const [filters, setFilters] = useState({
        name : '',
        nameHistory : ''//Guardamos el valor previo de name para evitar consultas duplicadas
    });

    //Con el context asignamos el nombre al módulo
    const { setContext } = useContext(customeContext);

    useEffect(() => {
        setContext( context => (
            {   ...context,
                titlePage : 'Usuarios 2'
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
    
        let resp = await fetchCustome(  { endpoint : `usuarios?start=${page.limit[0]}&end=${page.limit[1]}&q=${filters.name}`, method : 'GET', token : true}  );
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



    /************************cuadro de sugerencias****************************/

    const debonceRef = useRef(null);
    
    const filterChange = (e)=>{

        const valor = e.target.value.trim();
       
        if(debonceRef.current)
            clearTimeout(debonceRef.current);

        setFilters({
            ...filters,
            [e.target.name] : valor
        });

        debonceRef.current = setTimeout(()=>{
            if( !valor){
                if(complete)
                    setComplete(false);
            }
            else
                cargarOpcionesUsuarios(valor);
        },500);
    }

    const [complete, setComplete] = useState(false);
    const [itemSelected, setItemSelected] = useState(-1);
    const [list,setList] = useState([]);

    const blur = ()=>{
        setComplete(false);
    }

    const key = (e)=>{

        if(e.keyCode === 13){

            const name = itemSelected > -1 ? list[itemSelected].nombre : filters.name;

            if(name === filters.nameHistory)
                return;

            setFilters({
                ...filters,
                name,
                nameHistory : name 
            });
            setComplete(false);
            
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
        }
       
        else if(e.keyCode === 38){
            const actual = itemSelected-1;
            if(actual < -1)
                return;
            setItemSelected(itemSelected-1);
        }

        else if(e.keyCode === 40){
            const actual = itemSelected+1;
            if(actual > list.length - 1)
                return;
            setItemSelected(actual);
        }
        
    }

    const cargarOpcionesUsuarios = async (name)=>{
        let resp = await fetchCustome(  { endpoint : `usuarios?nombre=${name}`, method : 'GET', token : true}  );
        resp = await resp.json();
        console.log(resp)
        setList(resp.result.msg);
        setComplete(true);
        setItemSelected(-1);
    };
    
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
                                        <div className="container-autocomplete">
                                            <input type="text" placeholder="nombre..." onBlur={blur} name="name" className="form-control" value={filters.name} onChange={filterChange} onKeyDown={key}/>
                                            <div className={`${complete ? 'autocomplete' : ''}`}> 
                                                {
                                                    complete
                                                    &&
                                                    list.map( (item,index) =>(
                                                        <div key={item.id} className={`item-list ${index === itemSelected ? "activeItem" : "" }`}>{item.nombre}</div>
                                                    ))
                                                }
                                            </div>
                                        </div>
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

export default UsuariosScreen2;


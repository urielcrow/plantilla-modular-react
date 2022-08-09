import { Suspense, lazy } from 'react';
import { Load } from '../../componets';
const HomeScreen = lazy(() => import('../../componets/home/HomeScreen'));
const UsuariosScreen = lazy(() => import('../../componets/usuarios/UsuariosScreen'));
const UsuariosScreen2 = lazy(() => import('../../componets/usuarios2/UsuariosScreen2'));
const PerfilScreen = lazy(() => import('../../componets/perfil/PerfilScreen'));
const SlideScreen = lazy(() => import('../../componets/slide/SlideScreen'));


export const rutasAdministrador = [
    {
        path: '/acount',
        element: (<Suspense fallback={<Load/>}> <PerfilScreen /> </Suspense>)
    },
    {
        path: '/inicio',
        element: (<Suspense fallback={<Load/>}> <HomeScreen /> </Suspense>)
    },
    {
        path: '/slide',
        element: (<Suspense fallback={<Load/>}> <SlideScreen /> </Suspense>)
    },
    {
        path: '/usuarios',
        element: (<Suspense fallback={<Load/>}> <UsuariosScreen /> </Suspense>)
    },
    {
        path: '/usuarios2',
        element: (<Suspense fallback={<Load/>}> <UsuariosScreen2 /> </Suspense>)
    }
];


import { Suspense, lazy } from 'react';
import { Load } from '../../componets';
const HomeScreen = lazy(() => import('../../componets/home/HomeScreen'));
const PerfilScreen = lazy(() => import('../../componets/perfil/PerfilScreen'));


export const rutasEstandar = [
    {
        path: '/inicio',
        element: (<Suspense fallback={<Load/>}> <HomeScreen /> </Suspense>)
    },
    {
        path: '/acount',
        element: (<Suspense fallback={<Load/>}> <PerfilScreen /> </Suspense>)
    }
]

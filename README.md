# angular

Curso de Angular de cero a experto

### Angular es multi-plaforma

**Web**: SPA, SSR, SSG
**Movil**: ionic, NativeScript
**Desktop**: Electron

Angular posee

- Gestor de estado
- Enrutamiento
- Reactividad
- Peticiones HTTP
- Directivas

## Bloques fundamentales

**Componente**: Es una pieza que representa una parte de la interfaz de usuario.`Logica (TS), Estilos - (SASS, CSS, etc), Plantilla HTML`
**Rutas**: Permiten cambiar paginas (Componentes que usualmente cubren todo el punto de vista), separar logica, control de acceso y autorizacion, estrategias de renderizado.
**Directivas**: Modifican el comportamiento de un elemento HTML, atributo `ngClass, NgStyle`, estructurales `nfIf, ngFor`, componente `personalizadas`.
**Servicios**: Encapsulan logica de negocio y centralizan su acceso. `Gestion de datos, reutilizacion de codigo, inyeccion de dependencias`.
**Modulos**: Agrupan funcionalidades relacionadas, permitiendo su uso en otros componentes o modulos. `Organizan la aplicacion, encapsulan depencias, facilitan la carga bajo demanda`.
**Pipes**: Transforman datos de forma visual para representarlos apropiadamente en los componentes. `Modifican como se presentan datos, ordenar y filtrar, optimizacion de rendimiento`. Los pipe puros se evaluan cada vez que el argumento cambia y los impuros cada vez que hay un cambio de ciclo de vida en la aplicacion de angular.

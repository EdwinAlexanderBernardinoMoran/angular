# Angular

Curso de Angular de cero a experto

### Angular es multi-plaforma

- **Web**: SPA, SSR, SSG
- **Movil**: ionic, NativeScript
- **Desktop**: Electron

Angular posee

- Gestor de estado
- Enrutamiento
- Reactividad
- Peticiones HTTP
- Directivas

## Comandos fundamentales en angular

- ng g environments: Genera variables de entorno

## Bloques fundamentales

- **Componente**: Es una pieza que representa una parte de la interfaz de usuario.`Logica (TS), Estilos - (SASS, CSS, etc), Plantilla HTML`
- **Rutas**: Permiten cambiar paginas (Componentes que usualmente cubren todo el punto de vista), separar logica, control de acceso y autorizacion, estrategias de renderizado.
- **Directivas**: Modifican el comportamiento de un elemento HTML, atributo `ngClass, NgStyle`, estructurales `nfIf, ngFor`, componente `personalizadas`.
- **Servicios**: Encapsulan logica de negocio y centralizan su acceso. `Gestion de datos, reutilizacion de codigo, inyeccion de dependencias`.
- **Modulos**: Agrupan funcionalidades relacionadas, permitiendo su uso en otros componentes o modulos. `Organizan la aplicacion, encapsulan depencias, facilitan la carga bajo demanda`.
- **Pipes**: Transforman datos de forma visual para representarlos apropiadamente en los componentes. `Modifican como se presentan datos, ordenar y filtrar, optimizacion de rendimiento`. Los pipe puros se evaluan cada vez que el argumento cambia y los impuros cada vez que hay un cambio de ciclo de vida en la aplicacion de angular.

## Señales (Signals)

Son el nuevo sistema de reactividad de Angular sirven para manejar el estado que cambia en un componente. Los `Signals` controlan el estado y reactividad.

```js
export class HeroPage {
  name = signal("Ironman");
  age = signal(45);
}
```

## Señales computadas (Readonly signals)

Una señal computada (computed signal) es una señal de solo lectura que deriva su valor de otras señales. Se crea usando la función computed() de Angular.

**Características Principales**:

- Reactiva: Se actualiza automáticamente cuando cambian las señales de las que depende
- Solo lectura: No puedes modificar su valor directamente
- Memoizada: Solo recalcula cuando sus dependencias cambian
- Perezosa: Se evalúa únicamente cuando se lee su valor

## Zoneless

Es un nuevo modo de Angular que ya no usa `zone.js`, que era el sistema antiguo para detectar cambios. Anteriormente angular con `zone.js` detectava cambios a lo loco cada vez que sucedia cualquier cosa, esto hacia a Angular mas lento, ahora solo actualiza lo necesario, gracias a `signals` y eventos controlados.

## RouterLink

Es una directiva de Angular que permite crear enlaces de navegación declarativos en tus plantillas. Convierte elementos HTML en enlaces que navegan a diferentes rutas de tu aplicación sin recargar la página.

**Características Principales**:

- `Navegación SPA`: Mantiene la experiencia de Single Page Application
- `Type-safe`: Puede recibir rutas como strings o arrays
- `Gestión automática`: Añade la clase CSS active cuando la ruta está activa (con routerLinkActive)

```js
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-navigation",
  imports: [RouterLink],
  template: `
    <!-- Navegación simple -->
    <a routerLink="/home">Inicio</a>

    <!-- Con parámetros -->
    <a [routerLink]="['/user', userId]">Ver Usuario</a>

    <!-- Navegación relativa -->
    <a routerLink="../sibling">Hermano</a>
  `,
})
export class NavigationComponent {
  userId = 123;
}
```

### Router

Angular Router es el módulo encargado de gestionar la navegación dentro de una aplicación Angular. Permite cargar y mostrar diferentes componentes según la URL, sin recargar la página, facilitando la creación de aplicaciones de una sola página (SPA). Además, soporta rutas anidadas, parámetros, guards de seguridad, carga perezosa (lazy loading) y control de acceso, mejorando la organización, rendimiento y experiencia de usuario.

```js
// Exportacion de modulos de angular...
export class ByCapitalPage {

  activatedRoute = inject(ActivatedRoute);

  this.router.navigate(['/country/by-capital'], {
    queryParams: { query: params.query }
  });
}
```

## ActivatedRoute

`ActivatedRoute` es un servicio del módulo `@angular/router` que proporciona acceso a la información de la ruta actualmente activada. Permite obtener parámetros de ruta, query parameters, fragmentos, datos estáticos y reaccionar a cambios en la URL mediante observables. No es mas que la inyeccion de la ruta ativa con todas su propiedades

```js
import { ActivatedRoute } from "@angular/router";

export class ByCapitalPage {
  activatedRoute = inject(ActivatedRoute).snapshot.params["code"];
}
```

## HttpClient

Es el servicio oficial de Angular para realizar peticiones HTTP. Es la forma moderna y recomendada de comunicarse con APIs y servicios backend.

**Características principales**:

- Tipado fuerte: Soporte completo para TypeScript
- Basado en Observables: Usa RxJS para operaciones asíncronas
- Interceptores: Permite modificar requests/responses globalmente
- Manejo de errores: Sistema robusto para gestionar errores HTTP
- Testing: Fácil de mockear y testear

**Configuracion basica**.

```js
// app.config.ts
import { provideHttpClient, withFetch } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch())],
};
```

### Argumentos dinamicos por URL

Angular permite pasar argumentos dinámicos por URL de dos formas principales: **parámetros de ruta** y **query parameters**.

```js
// Archivo de rutas app.route.ts
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "dashboard",
    loadComponent: () => import("./gifs/pages/dashboard-page/dashboard-page"),
    children: [
      {
        path: "history/:query",
        loadComponent: () => import("./gifs/pages/history/history"),
      },
      {
        path: "**",
        redirectTo: "trending",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];
```

Leer parametro de la ruta en el componente.

```js
// src/app/gifs/pages/history/history.ts
query = toSignal(
  inject(ActivatedRoute).params.pipe(map((params) => params["query"]))
);
```

Template html

```js
// src/app/gifs/components/side-menu-options/gifs-side-menu-options.html
 <a [routerLink]="['/dashboard/history', key]" class="w-full px-2"> Parametro de ruta </a>
```

### effect

Los Effects en Angular 21 son una primitiva reactiva introducida como parte de la API de Signals de Angular. Permiten realizar efectos secundarios automáticamente cada vez que cambian los valores de las señales.

- **Seguimiento Automático**: Los Effects rastrean automáticamente cualquier señal leída durante su ejecución
- **Ejecución Reactiva**: Se vuelven a ejecutar cada vez que cambian las señales rastreadas
- **Gestión de Efectos Secundarios**: Diseñados para operaciones como logging, sincronización o actualizaciones del DOM
- **Soporte de Limpieza**: Pueden retornar funciones de limpieza para gestión de recursos

```js
// src/app/gifs/services/gifs.service.ts --- Ejemplo
saveGifsToLocalStorage = effect(() => {
  localStorage.setItem(
    "gifSearchHistory",
    JSON.stringify(this.searchHistory())
  );
});
```

### Masonry Design (Diseño Masonry)

El diseño masonry es un patrón de disposición de elementos visuales donde los items se organizan en columnas verticales de manera óptima, similar a un muro de ladrillos (de ahí su nombre "masonry" = albañilería).

**Características principales:**

- Los elementos se colocan en la posición vertical disponible más corta
- No hay espacios vacíos entre elementos de diferentes alturas
- Las columnas mantienen un ancho fijo pero altura variable
- Muy popular en galerías de imágenes y Pinterest

```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div class="grid gap-4">
    <div>
      <img
        class="h-auto max-w-full rounded-base"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
        alt=""
      />
    </div>
    <div>
      <img
        class="h-auto max-w-full rounded-base"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
        alt=""
      />
    </div>
    <div>
      <img
        class="h-auto max-w-full rounded-base"
        src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
        alt=""
      />
    </div>
  </div>
  <!-- Se repite la estructura -->
</div>
```

### ViewChild

`ViewChild` es un decorador de Angular que permite acceder a un elemento hijo, directiva o componente desde la clase del componente padre.

**Características principales**:

- `Acceso al DOM`: Permite obtener una referencia a elementos del template
- `Acceso a componentes hijos`: Facilita la comunicación con componentes anidados
- `Acceso a directivas`: Permite interactuar con directivas aplicadas en el template

```js

// Componente TS
export default class TrendingPage {
  gifService = inject(GifsService);

  // Referencia al elemento HTML del componente
  scrollDivRef = viewChild<ElementRef>('groupContainer');

  onScroll(event: Event){

    // Obtenemos la referencia al elemento HTML usando la referencia creada con viewChild
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    console.log(scrollDiv);
  }
}

// Componente HTML
<div class="h-screen overflow-y-scroll grid grid-cols-2 md:grid-cols-4 gap-4 pt-5" (scroll)="onScroll($event)" #groupContainer>
  @for (group of gifService.trendingGifGroup(); track $index) {
    <div class="grid gap-4">
      @for (gif of group; track gif.id) {
        <div>
          <img class="h-full max-w-full rounded-lg object-cover" [src]="gif.url" [alt]="gif.title"
            alt="">
        </div>
      }
    </div>
  }
</div>
```

### Determinar fin de Scroll

Para determinar cuándo el usuario ha llegado al final del scroll, necesitamos entender tres conceptos clave:

**Conceptos fundamentales del Scroll:**

- **`clientHeight`**: Altura visible del contenedor (viewport) en píxeles - lo que el usuario puede ver en pantalla
- **`scrollHeight`**: Altura total del contenido en píxeles - incluye el contenido que no es visible y requiere scroll
- **`scrollTop`**: Cantidad de píxeles desplazados desde el inicio - cuánto scroll ha hecho el usuario

**Fórmula para detectar el fin del scroll:**

```typescript
scrollTop + clientHeight >= scrollHeight;
```

**Visualización:**

```
┌─────────────────┐  ← Top (0)
│                 │
│   clientHeight  │  ← Viewport visible
│   (visible)     │
├─────────────────┤  ← scrollTop (posición actual)
│                 │
│   Contenido     │
│   oculto que    │  ← scrollHeight (altura total)
│   requiere      │
│   scroll        │
│                 │
└─────────────────┘  ← Bottom
```

### Layout

Un layout es una estructura o plantilla que define la disposición y organización
visual de los elementos en una interfaz de usuario. Define cómo se posicionan
y distribuyen los componentes en la pantalla. Es un componente comun y corriente que sualemte es usado para dar estilo a todas las paginas hijas

En el contexto de desarrollo web y aplicaciones, un layout típicamente incluye:

- La estructura general de la página (header, sidebar, content, footer)
- El sistema de rejilla o grid para posicionar elementos
- Los espaciados y márgenes entre componentes
- La disposición responsive para diferentes tamaños de pantalla
- Los contenedores y wrappers que organizan el contenido

## S11 - Country App - Intermedio/Avanzado

### linkedSignal - Preservar resultados en cache

Cuando tenemos una señal que es producto de una computacion algun calculo, se recomienda utilizar un objecto en Angular llamado el `linkedSignal` nos permite inicializar una señal con algun tipo de proceso y nos permite utilizarla como una señal normal despues de haber sido inicializada.

```js
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  linkedSignal,
} from "@angular/core";
import { SearchInput } from "../../components/search-input/search-input";
import { List } from "../../components/list/list";
import { CountryService } from "../../services/country.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-by-capital-page",
  imports: [SearchInput, List],
  templateUrl: "./by-capital-page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalPage {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get("query") ?? "";

  // Ejemplo
  query = linkedSignal(() => this.queryParam);
}
```

## S12 - Pipes

Los pipes en Angular son transformadores de datos que se aplican en las plantillas para formatear valores antes de mostrarlos al usuario y extendienden de `@angular/common` existen pipes de Numericos, de fechas, porcentaje entre otros.

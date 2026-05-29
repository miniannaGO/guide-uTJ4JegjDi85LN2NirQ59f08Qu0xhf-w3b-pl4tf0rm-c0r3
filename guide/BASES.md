## Idea central

Una guía debe responder cuatro preguntas a la vez:

    - ¿Qué es esto y para qué sirve?
    - ¿Cómo empiezo sin perderme?
    - ¿Cómo hago tareas reales correctamente?
    - ¿Dónde confirmo detalles exactos cuando ya sé lo básico?

Las mejores documentaciones no confían en una sola forma de explicar. Separan aprendizaje, tareas, referencia, ejemplos, conceptos, decisiones, solución de problemas, migraciones y comunidad. Por eso se sienten enormes sin volverse caóticas.

## Qué hacen las guías fuertes

Al revisar documentaciones actuales como Angular, CodeIgniter, Laravel, React, Vue, Bootstrap y Tailwind CSS aparece un patrón común: cada una tiene una arquitectura editorial, no solo páginas sueltas.

### Angular

[Lección] Abre con una explicación de qué es Angular y por qué existe;

### Laravel

[Lección] Hay un camino para principiantes y otro para usuarios avanzados;

## Qué tienen en común

Las grandes guías suelen tener estas piezas:

- una portada que explica identidad, propósito y promesa;
- un quick start que lleva de cero a algo funcionando;
- requisitos claros;
- instalación por entorno;
- primera experiencia verificable;
- conceptos esenciales;
- modelo mental;
- tutorial guiado;
- ejemplos realistas;
- recetas por tarea;
- referencia exacta;
- glosario;
- solución de problemas;
- integración con herramientas;
- búsqueda;
- enlaces relacionados;

## Tipos de contenido que deben separarse

Una guía excelente distingue entre varios modos de lectura.

### Overview

Explica qué es el proyecto, por qué existe, qué problema resuelve, para quién es y qué decisiones lo hacen distinto.

Debe responder:

- ¿Qué estoy mirando?
- ¿Cuándo debería usarlo?
- ¿Cuándo no?
- ¿Qué piezas principales lo componen?
- ¿Qué necesito saber antes de entrar?

### Quick start

Lleva al usuario a un resultado visible o verificable en pocos pasos.

Debe incluir:

- requisitos;
- comandos exactos;
- estructura esperada;
- resultado esperado;
- cómo validar que funcionó;
- error común si no funciona;
- siguiente página recomendada.

El quick start no debería intentar explicar todo. Su misión es dar tracción.

### Tutorial

Enseña construyendo algo completo, pequeño y realista.

Debe incluir:

- objetivo final;
- contexto del ejemplo;
- pasos ordenados;
- checkpoints;
- explicación de cada decisión;
- errores esperables;
- resultado final;
- limpieza o próximos pasos.

Un tutorial no es una referencia. Si intenta cubrir todas las opciones, se vuelve pesado.

### Guía conceptual

Explica el modelo mental del sistema.

Debe incluir:

- vocabulario;
- responsabilidades;
- flujos;
- límites;
- diagramas;
- decisiones de diseño;
- analogías sobrias;
- ejemplos mínimos;
- relaciones con otras piezas.

Esta parte evita que el usuario copie comandos sin entender.

### How-to o receta

Resuelve una tarea puntual.

Debe responder:

- quiero hacer X;
- debo tocar A, B y C;
- debo evitar D;
- al final verifico con E;
- si falla, reviso F.

Las recetas son el formato más útil para trabajo diario.

### Referencia

Lista detalles exactos.

Puede incluir:

- comandos;
- opciones;
- variables de entorno;
- estructuras de carpetas;
- APIs;
- interfaces;
- payloads;
- clases;
- convenciones de naming;
- códigos de error;
- configuración.

La referencia debe ser densa, consistente y fácil de escanear. No debe esconder información exacta en prosa larga.

### Troubleshooting

Parte del síntoma, no de la arquitectura.

Debe incluir:

- mensaje de error;
- causa probable;
- diagnóstico;
- solución;
- cómo confirmar;
- prevención;
- enlaces relacionados.

Una buena página de troubleshooting reduce ansiedad. El usuario llega ahí cansado.

### Buenas prácticas

Explica qué se recomienda y por qué.

Debe separar:

- obligatorio;
- recomendado;
- permitido;
- desaconsejado;
- legado;
- experimental.

Sin esa distinción, las guías se vuelven dogmáticas o ambiguas.

### Referencia de errores

Para sistemas con errores repetibles, una referencia de errores es oro.

Debe incluir:

- código o texto del error;
- cuándo aparece;
- qué significa;
- impacto;
- solución rápida;
- solución de fondo;
- enlaces a la parte conceptual.

## Anatomía completa de una guía excelente

Esta es una estructura ideal. No todos los proyectos necesitan publicarla completa desde el primer día, pero sí conviene saber qué lugar ocuparía cada cosa.

```txt
docs/guide/
  ...
  assets/
```

El orden exacto depende del proyecto. Lo importante es que cada página tenga una responsabilidad clara.

## Contenido imprescindible por sección

### Portada

La portada debe hacer orientación, no marketing vacío.

Debe contener:

- nombre del proyecto;
- descripción en una frase;
- problema que resuelve;
- audiencia principal;
- mapa de rutas de aprendizaje;
- enlaces a quick start, fundamentos, recetas, referencia y troubleshooting;
- estado o versión de la guía;
- advertencia de requisitos si son importantes.

Buena señal: alguien nuevo entiende en menos de un minuto qué camino tomar.

### Primeros pasos

Debe llevar de cero a sistema funcionando.

Debe contener:

- requisitos de sistema;
- instalación de dependencias;
- configuración mínima;
- variables de entorno;
- comandos para levantar;
- URLs esperadas;
- credenciales o datos de demo si existen;
- cómo apagar o limpiar;
- solución de errores iniciales.

Buena señal: una persona puede seguirlo en una máquina limpia sin pedir ayuda.

### Fundamentos

Debe explicar cómo pensar el sistema.

Debe contener:

- conceptos principales;
- piezas y responsabilidades;
- glosario temprano;
- convenciones de nombres;
- límites entre capas;
- decisiones que no se negocian;
- ejemplos pequeños.

Buena señal: el lector deja de ver carpetas sueltas y empieza a ver un sistema.

### Arquitectura

Debe mostrar las fronteras, no presumir complejidad.

Debe contener:

- capas;
- entrypoints;
- dependencias permitidas;
- dependencias prohibidas;
- flujos principales;
- diagramas;
- contratos compartidos;
- puntos de extensión;
- razones de diseño;
- riesgos si se rompe una frontera.

Buena señal: ayuda a tomar decisiones futuras, no solo a entender el pasado.

### Tutorial principal

Debe construir algo representativo de punta a punta.

Debe contener:

- objetivo;
- resultado esperado;
- pasos numerados;
- archivos que se crean o modifican;
- comandos;
- explicación de cada decisión;
- validación;
- errores frecuentes;
- variaciones posibles.

Buena señal: después del tutorial, el lector puede crear una segunda cosa parecida sin copiar a ciegas.

### Recetas

Debe organizar tareas reales por intención del usuario.

Ejemplos:

- crear una pantalla;
- agregar un endpoint;
- consumir JSON;
- renderizar un fragment;
- agregar un connector;
- registrar una integración UI;
- generar contratos;
- depurar una sesión;
- revisar logs;
- agregar estilos;
- probar una ruta;
- resolver un error de build.

Cada receta debería tener:

- cuándo usarla;
- precondiciones;
- pasos;
- resultado esperado;
- validación;
- errores comunes;
- enlaces a referencia.

Buena señal: el usuario busca por tarea, no por nombre interno.

### Referencia

Debe ser exacta, exhaustiva y estable.

Debe contener:

- comandos y opciones;
- variables de entorno;
- archivos de configuración;
- estructura de carpetas;
- contratos;
- respuestas HTTP;
- hooks;
- eventos;
- clases base;
- interfaces públicas;
- naming;
- valores por defecto;
- compatibilidad;
- comportamiento en desarrollo y producción.

Buena señal: cuando alguien pregunta “¿cuál es el nombre exacto?”, la respuesta está ahí.

### Herramientas

Debe explicar herramientas como parte del flujo real.

Debe contener:

- propósito de cada herramienta;
- cuándo usarla;
- cuándo no usarla;
- comandos;
- entradas;
- salidas;
- archivos que modifica;
- protecciones;
- ejemplos;
- diagnóstico si falla.

Buena señal: nadie ejecuta una herramienta con miedo a no saber qué va a tocar.

### Seguridad

Debe existir si el sistema toca usuarios, sesión, datos, red, credenciales o permisos.

Debe contener:

- modelo de amenazas básico;
- manejo de sesión;
- autenticación;
- autorización;
- CSRF;
- XSS;
- secretos;
- logs sensibles;
- headers;
- validación de input;
- dependencias externas;
- prácticas prohibidas.

Buena señal: las reglas de seguridad no quedan dispersas en comentarios de código.

### Deployment

Debe conectar desarrollo con operación.

Debe contener:

- build;
- variables de entorno;
- assets;
- cache;
- permisos;
- logs;
- health checks;
- rollback;
- diferencias entre desarrollo y producción;
- checklist previo.

Buena señal: producción no se trata como una sorpresa.

### Troubleshooting

Debe estar escrito para quien ya está bloqueado.

Formato recomendado:

```txt
Síntoma:
  Qué ve el usuario.

Causa probable:
  Qué suele significar.

Diagnóstico:
  Qué comando, archivo o pantalla revisar.

Solución:
  Pasos concretos.

Confirmación:
  Cómo saber que quedó bien.

Prevención:
  Qué práctica evita que vuelva.
```

Buena señal: los errores conocidos dejan de depender de memoria oral.

### Glosario

Debe reducir ambigüedad.

Debe contener:

- términos propios;
- nombres de capas;
- diferencias entre conceptos parecidos;
- términos prohibidos o reservados;
- equivalencias con conceptos externos;
- enlaces a páginas profundas.

Buena señal: dos personas nuevas usan las mismas palabras para la misma cosa.

```md
# Título orientado a tarea o concepto

Resumen corto: qué resuelve esta página y cuándo leerla.

## Antes de empezar

- Requisitos.
- Conceptos previos.
- Archivos o comandos relacionados.

## Resultado esperado

Qué quedará funcionando o qué entenderá el lector.

## Camino recomendado

Pasos concretos, con explicación suficiente.

## Ejemplo mínimo

Código o configuración pequeña que funcione.

## Ejemplo realista

Caso más cercano al uso diario.

## Variantes

Opciones válidas y cuándo elegir cada una.

## Errores comunes

Síntomas, causas y soluciones.

## Verificación

Cómo confirmar que el resultado es correcto.

## Relacionado

Enlaces a fundamentos, referencia y recetas vecinas.
```

No todas las páginas necesitan todos los bloques, pero sí conviene que el autor se pregunte por cada uno.

## Plantilla para una receta

````md
# Cómo hacer X

Usa esta receta cuando necesites...

## Precondiciones

- Ya existe...
- Debes tener...

## Archivos involucrados

```txt
ruta/a/archivo-a
ruta/a/archivo-b
```

## Pasos

1. Haz...
2. Cambia...
3. Registra...
4. Valida...

## Resultado esperado

Describe el resultado visible o verificable.

## Validación

```txt
comando o comprobación
```

## Problemas comunes

- Si ves X, revisa Y.
- Si pasa Z, confirma W.

## Relacionado

- Fundamento conceptual.
- Referencia exacta.
````

## Plantilla para referencia de comando

````md
## `comando`

Propósito: qué hace.

Cuándo usarlo: escenario correcto.

Cuándo no usarlo: límites.

Sintaxis:

```txt
comando argumento --opcion=valor
```

Opciones:

| Opción | Requerida | Valor por defecto | Descripción |
| ------ | --------- | ----------------- | ----------- |
| `--x`  | No        | `false`           | Activa...   |

Archivos que lee:

- `...`

Archivos que escribe:

- `...`

Protecciones:

- Aborta si...

Ejemplo:

```txt
comando ejemplo
```

Salida esperada:

```txt
...
```
````

## Criterios de ejemplos

Los ejemplos son el lugar donde una guía gana o pierde confianza.

Un buen ejemplo debe:

- funcionar realmente;
- ser pequeño, pero no artificial;
- usar nombres semánticos;
- evitar datos mágicos;
- mostrar el archivo completo cuando el contexto importa;
- mostrar solo el fragmento cuando el archivo completo distrae;
- explicar por qué existe cada pieza nueva;
- mantener consistencia de nombres entre pasos;
- incluir el resultado esperado;
- evitar APIs internas si la guía es para usuarios externos;
- marcar lo que es placeholder;
- no mezclar dos objetivos a la vez;
- incluir una variante realista cuando hay más de un camino válido.

Un mal ejemplo:

- compila solo en la cabeza del autor;
- omite imports importantes;
- usa nombres como `foo`, `bar` o `test` para todo;
- crea carpetas que la guía nunca explicó;
- salta pasos;
- mezcla convención recomendada con atajos;
- no dice cómo validar;
- no muestra qué hacer si falla.

## Criterios de navegación

Una guía grande necesita arquitectura de información.

Debe tener:

- menú por áreas;
- índice local por página;
- enlaces de “siguiente paso”;
- enlaces desde tutorial hacia referencia;
- enlaces desde referencia hacia recetas;
- búsqueda;
- títulos que se puedan entender fuera de contexto;
- anchors estables;
- páginas cortas para tareas puntuales;
- páginas largas solo cuando la continuidad lo justifique.

Los títulos deben decir lo que el lector busca. Por ejemplo:

- mejor: `Agregar un endpoint JSON`;
- peor: `Integraciones parte 2`;
- mejor: `Variables de entorno`;
- peor: `Configuración adicional`.

## Criterios de redacción

La redacción debe ser clara, directa y generosa.

Pautas:

- escribe para alguien inteligente que todavía no conoce el sistema;
- empieza por el porqué, baja rápido al cómo;
- usa frases cortas cuando expliques pasos;
- no escondas advertencias importantes al final;
- no uses humor donde el lector puede estar bloqueado;
- no trates errores como culpa del usuario;
- no digas “simplemente” si hay varias precondiciones;
- distingue regla de recomendación;
- evita párrafos que mezclan cinco ideas;
- usa listas para escanear;
- usa tablas para comparar;
- usa diagramas para flujos;
- usa código para precisión;
- usa enlaces para profundidad.

Una guía excelente respeta el tiempo del lector.

## Criterios de profundidad

Una guía extremadamente buena trabaja en capas:

1. Explicación de una frase.
2. Resumen de una pantalla.
3. Primer ejemplo.
4. Tutorial guiado.
5. Concepto profundo.
6. Receta por tarea.
7. Referencia exacta.
8. Errores y casos límite.
9. Decisiones y trade-offs.
10. Mantenimiento y migración.

La clave es no obligar al principiante a leer la capa 8 para llegar a la capa 3, ni obligar al experto a leer la capa 3 para encontrar un valor exacto.

## Matriz de cobertura

Una guía de alto nivel debería poder responder esta matriz.

| Área          | Pregunta que responde             | Formato ideal           |
| ------------- | --------------------------------- | ----------------------- |
| Identidad     | ¿Qué es y por qué existe?         | Overview                |
| Audiencia     | ¿Para quién está escrita?         | Portada y rutas         |
| Requisitos    | ¿Qué necesito antes de empezar?   | Checklist               |
| Instalación   | ¿Cómo lo pongo a correr?          | Quick start             |
| Verificación  | ¿Cómo sé que funcionó?            | Checkpoints             |
| Modelo mental | ¿Cómo debo pensarlo?              | Fundamentos             |
| Arquitectura  | ¿Dónde vive cada responsabilidad? | Diagramas y explicación |
| Tutorial      | ¿Cómo construyo algo real?        | Paso a paso             |
| Recetas       | ¿Cómo hago tareas comunes?        | How-to                  |
| Referencia    | ¿Cuál es el detalle exacto?       | Tablas y APIs           |
| Configuración | ¿Qué puedo cambiar?               | Matriz de opciones      |
| Herramientas  | ¿Qué comandos existen?            | Referencia de comandos  |
| Errores       | ¿Qué significa este fallo?        | Troubleshooting         |
| Seguridad     | ¿Qué no debo romper?              | Reglas y checklist      |
| Performance   | ¿Qué cuesta caro?                 | Guía de diagnóstico     |
| Testing       | ¿Cómo valido cambios?             | Estrategia y comandos   |
| Deployment    | ¿Cómo llega a producción?         | Checklist operativo     |
| Migración     | ¿Cómo actualizo sin romper?       | Upgrade guide           |
| Glosario      | ¿Qué significa este término?      | Diccionario             |
| Mantenimiento | ¿Cómo se actualiza la guía?       | Guía editorial          |

## Pasos para construir una guía excelente

### 1. Define la audiencia

No escribas para “todos” al mismo tiempo.

Identifica perfiles:

- persona nueva que solo quiere instalar;
- dev que va a crear una feature;
- dev senior que necesita entender arquitectura;
- líder técnico que evalúa convenciones;
- QA que necesita validar flujos;
- operaciones que necesita desplegar o diagnosticar;
- agente automatizado que necesita instrucciones precisas.

Cada perfil necesita rutas distintas, aunque compartan contenido.

### 2. Define las rutas de aprendizaje

Crea caminos explícitos:

- “Soy nuevo”: overview, requisitos, quick start, fundamentos, primer tutorial.
- “Voy a construir”: recetas, arquitectura, reference.
- “Voy a depurar”: troubleshooting, logs, errores, referencia.
- “Voy a mantener”: convenciones, migración, testing, contribution.

Una guía sin rutas obliga al lector a armar su propio mapa.

### 3. Haz inventario de tareas reales

Lista las tareas que la gente realmente hace.

Ejemplos:

- instalar;
- configurar;
- levantar localmente;
- crear una página;
- crear una API;
- consumir un servicio;
- agregar UI;
- manejar errores;
- revisar logs;
- generar contratos;
- correr pruebas;
- compilar assets;
- desplegar.

Cada tarea importante merece tutorial, receta o referencia.

### 4. Dibuja el mapa conceptual

Antes de escribir páginas, define:

- piezas principales;
- nombres oficiales;
- fronteras;
- flujos;
- dependencias;
- conceptos prohibidos;
- términos heredados;
- decisiones vigentes.

El mapa conceptual evita que cada página explique el sistema de una forma distinta.

### 5. Separa aprendizaje de referencia

No metas toda la API dentro del tutorial. No metas historia y motivación dentro de una tabla de referencia.

Regla práctica:

- tutorial: enseña una experiencia;
- guía conceptual: enseña criterio;
- receta: resuelve una tarea;
- referencia: confirma detalles.

### 6. Escribe el primer camino completo

Antes de cubrir todo, crea una ruta de extremo a extremo:

1. Qué es.
2. Cómo instalar.
3. Cómo correr.
4. Cómo entender las piezas.
5. Cómo crear algo simple.
6. Cómo validar.
7. Cómo seguir.

Ese camino es la columna vertebral.

### 7. Agrega recetas desde problemas reales

Las mejores recetas nacen de dudas repetidas.

Cada vez que alguien pregunte “¿cómo hago X?”, evalúa si falta:

- una receta;
- una sección de troubleshooting;
- una nota en referencia;
- una mejora en fundamentos.

## Preguntas que una guía debería contestar

Antes de considerar una guía “buena”, revisa si responde:

- ¿Qué problema resuelve el proyecto?
- ¿Qué no intenta resolver?
- ¿Cuál es el camino más corto para verlo funcionando?
- ¿Cuáles son los requisitos reales?
- ¿Qué versión documenta?
- ¿Dónde están los entrypoints?
- ¿Cuál es el flujo principal?
- ¿Qué carpetas son importantes?
- ¿Qué carpetas no debo tocar?
- ¿Qué convenciones son obligatorias?
- ¿Qué nombres están reservados?
- ¿Cómo creo una pieza nueva?
- ¿Cómo conecto dos capas?
- ¿Cómo valido que quedó bien?
- ¿Qué errores son frecuentes?
- ¿Cómo depuro?
- ¿Cómo actualizo?
- ¿Cómo despliego?
- ¿Cómo pruebo?
- ¿Qué cambia entre desarrollo y producción?
- ¿Dónde encuentro la referencia exacta?
- ¿Qué hago después de terminar el primer tutorial?

## Señales de que una guía está creciendo bien

- Las personas nuevas preguntan menos por instalación.
- Las discusiones usan el vocabulario de la guía.
- Las recetas se vuelven enlaces recurrentes en revisiones.
- Los errores frecuentes tienen página propia.
- Los ejemplos se pueden ejecutar.
- Los cambios de arquitectura actualizan la guía en la misma intervención.
- Los títulos coinciden con cómo la gente busca.
- La referencia evita debates sobre nombres exactos.
- El troubleshooting reduce tiempo de diagnóstico.
- La guía distingue entre recomendado, obligatorio y opcional.

## Señales de deuda documental

- El quick start falla en máquinas limpias.
- Hay páginas largas sin índice.
- Los ejemplos usan nombres que ya no existen.
- La guía dice una cosa y el código hace otra.
- Las recetas dependen de conocimiento oral.
- No hay versión o fecha de revisión.
- Las páginas no enlazan entre sí.
- Todo está escrito como explicación, nada como tarea.
- Todo está escrito como tarea, nada como concepto.
- La referencia está mezclada con tutorial.
- Los errores comunes no están documentados.
- La guía se actualiza solo antes de una presentación.

## Aplicado a una guía de plataforma

Para una plataforma como WPC, una guía extremadamente buena debería cubrir:

- visión del ecosistema;
- instalación local;
- estructura del workspace;
- flujo backend;
- flujo frontend;
- puente SSR + Surface;
- contratos JSON y HTML;
- generación de artefactos;
- herramientas Robo;
- scaffolding;
- observabilidad;
- sesión;
- assets;
- convenciones de naming;
- arquitectura de capas;
- recetas de features completas;
- integración externa;
- testing;
- troubleshooting;
- despliegue;
- glosario;
- referencia de comandos;
- referencia de configuración;
- guía de mantenimiento documental.

La guía ya puede tener páginas fuertes, pero el salto de calidad aparece cuando todo eso se conecta con rutas de lectura claras, ejemplos verificables y referencia sistemática.

## Orden recomendado para mejorar una guía existente

Si ya existe una guía, no conviene reescribirla entera de golpe.

Prioridad recomendada:

1. Arreglar quick start hasta que funcione en limpio.
2. Crear un mapa de lectura en la portada.
3. Separar fundamentos, recetas y referencia.
4. Agregar una receta completa de extremo a extremo.
5. Documentar errores frecuentes.
6. Revisar nombres y glosario.
7. Agregar validaciones a cada receta.
8. Convertir listas sueltas en tablas de referencia.
9. Agregar diagramas solo donde reduzcan carga mental.
10. Crear rutina de mantenimiento.

Ese orden mejora la utilidad antes que la apariencia.

## Checklist de calidad antes de publicar

- La portada explica qué es y qué camino seguir.
- El quick start fue probado.
- Los requisitos están completos.
- Los comandos están actualizados.
- Las rutas de archivos existen.
- Los ejemplos tienen resultado esperado.
- Las recetas tienen validación.
- La referencia usa nombres exactos.
- Los términos importantes están definidos.
- Hay enlaces entre conceptos, recetas y referencia.
- Los errores comunes tienen solución.
- Las advertencias están cerca del paso afectado.
- Las tablas son legibles.
- Los diagramas tienen texto suficiente alrededor.
- La guía distingue desarrollo y producción.
- Hay información de versión o fecha de revisión.
- No hay contradicciones con el código real.
- No hay promesas que el sistema no cumple.

## Checklist por página

- ¿La página tiene un objetivo único?
- ¿El título coincide con lo que el usuario buscaría?
- ¿El primer párrafo orienta?
- ¿Dice cuándo usarla?
- ¿Dice cuándo no usarla, si hay riesgo?
- ¿Incluye precondiciones?
- ¿Tiene ejemplo mínimo?
- ¿Tiene validación?
- ¿Menciona errores comunes?
- ¿Enlaza a la referencia?
- ¿Enlaza al siguiente paso?
- ¿Evita información duplicada que se volverá obsoleta?
- ¿Está escrita con ortografía correcta?
- ¿Respeta el vocabulario oficial del proyecto?

## Checklist de mantenimiento

- Revisa enlaces rotos.
- Revisa comandos después de cambios de tooling.
- Revisa capturas después de cambios visuales.
- Revisa referencias después de cambiar APIs.
- Revisa recetas después de cambiar flujos.
- Revisa troubleshooting después de resolver bugs repetidos.
- Revisa glosario después de introducir términos.
- Revisa instalación después de cambiar dependencias.
- Revisa deployment después de cambiar build o entorno.

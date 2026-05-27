# Guion de apoyo para presentación WPC

Este material está escrito como texto para decir durante la presentación. La intención es mantener un tono mayormente conceptual, con apoyo técnico solo cuando ayuda a sostener la idea.

## Apertura general

WPC nace de una necesidad muy concreta: dejar de empezar desde cero cada vez que aparece una nueva solución digital.

En muchos proyectos se repiten las mismas decisiones: cómo organizar el backend, cómo integrar servicios externos, cómo construir la interfaz, cómo documentar, cómo generar artefactos, cómo observar errores y cómo mantener consistencia entre equipos.

La propuesta de WPC es convertir todo ese aprendizaje en una base común. No es solo un conjunto de archivos ni una plantilla visual. Es una forma ordenada de construir soluciones empresariales con más velocidad, menos improvisación y mayor capacidad de repetición.

Lo importante de esta solución es que no intenta resolver todo con una sola pieza. Divide el problema en capacidades: backend, frontend progresivo, documentación viva y herramientas de automatización. Esa separación permite que cada parte tenga una responsabilidad clara y que el ecosistema pueda crecer sin volverse confuso.

## pillars-capabilities.html

### Slide 1: WPC

WPC es el contenedor general de la solución.

Cuando hablo de WPC no me refiero a una aplicación puntual, sino a una base para construir muchas soluciones. La idea es que cada nuevo desarrollo no tenga que volver a resolver desde cero la estructura, las integraciones, la experiencia visual, la documentación y las herramientas de soporte.

El valor principal está en acelerar el inicio de los proyectos, pero sin perder orden. No buscamos velocidad improvisada; buscamos velocidad apoyada en una estructura común.

Técnicamente, WPC agrupa varias piezas que trabajan juntas: una capa backend, una capa frontend progresiva, una guía versionada y herramientas para automatizar trabajo repetitivo.

### Slide 2: Un contenedor. Cuatro capacidades.

Esta diapositiva resume la solución en cuatro capacidades.

La primera es `App Gateway`, que representa el backend y la entrada principal al sistema. La segunda es `App Surface`, que representa la experiencia frontend progresiva. La tercera es la `Guía Versionada`, que conserva el conocimiento y permite transferirlo. La cuarta son las `Herramientas`, que reducen trabajo manual y ayudan a repetir buenas prácticas.

Esta división es importante porque una solución empresarial no falla solo por código. También puede fallar por falta de criterios comunes, por documentación dispersa, por dependencias excesivas de personas clave o por tareas manuales que se repiten en cada proyecto.

WPC ordena esas responsabilidades. Cada capacidad tiene un propósito y eso hace que el ecosistema sea más fácil de explicar, mantener y escalar.

### Slide 3: App Gateway

App Gateway es el pilar backend de WPC.

Su función es ordenar la entrada al sistema: rutas, controladores, renderizado del lado servidor, respuestas HTML o JSON, casos de uso, errores e integraciones con servicios externos.

En una solución empresarial, el backend no puede ser solo un conjunto de endpoints sueltos. Necesita reglas claras para saber dónde vive cada responsabilidad y cómo se conectan las piezas.

Por eso App Gateway separa dos ideas. Por un lado está `Core`, que concentra mecanismos comunes como routing, vistas, respuestas, errores y contratos base. Por otro lado está `Extension`, donde viven las capacidades concretas del producto.

La ventaja es que los equipos no tienen que inventar una arquitectura distinta en cada iniciativa. Trabajan sobre una forma común de construir, con límites más claros y menos duplicidad.

### Slide 4: App Surface

App Surface es el pilar frontend de WPC.

La idea principal es que no todas las soluciones empresariales necesitan convertirse en una aplicación frontend pesada. Muchas pantallas pueden partir de HTML renderizado por el servidor y sumar comportamiento interactivo solo donde realmente aporta valor.

App Surface permite ese equilibrio. El servidor entrega una base estable y el navegador activa integraciones específicas para mejorar la experiencia del usuario.

Esto ayuda a tener una interfaz moderna sin cargar complejidad innecesaria. También permite que las pantallas sean más consistentes, porque las integraciones UI siguen una forma común de montarse y desmontarse.

Técnicamente, App Surface trabaja sobre HTML generado por App Gateway. Usa integraciones declaradas en el markup y un toolkit para componentes, adapters y helpers reutilizables.

### Slide 5: Guía Versionada

La guía versionada es el pilar de conocimiento.

Una plataforma no se sostiene solamente con código. También necesita explicación, ejemplos, decisiones documentadas y material que permita entender por qué se construyó así.

Si el conocimiento queda solo en conversaciones o en la cabeza de algunas personas, la organización pierde capacidad de repetición. Cada nuevo integrante tiene que reconstruir el contexto y cada decisión futura cuesta más.

La guía versionada evita eso. Convierte el conocimiento técnico y operativo en un activo consultable. Incluye prototipos, diagramas, documentación detallada y ejemplos navegables.

La ventaja es que WPC no solo entrega una base para construir, también entrega una forma de entender, explicar y transferir esa base.

### Slide 6: Herramientas

Las herramientas son el pilar de automatización y operación.

Cuando una organización define una forma correcta de trabajar, el siguiente paso es hacer que esa forma sea fácil de repetir. Si todo depende de memoria manual, aparecen diferencias entre equipos, errores pequeños y pérdida de tiempo en tareas repetitivas.

Las herramientas de WPC convierten convenciones en acciones concretas. Ayudan a crear artefactos, generar contratos, preparar integraciones, mantener estructura y observar lo que ocurre en el sistema.

La ventaja es que los equipos avanzan más rápido sin sacrificar consistencia. No se trata solo de escribir menos código; se trata de crear piezas nuevas con una forma esperada desde el inicio.

Técnicamente, aquí entran comandos de scaffolding, generación de contratos, logs, telemetría y apoyos para automatizar tareas comunes.

### Slide 7: WPC acelera con estructura

Esta diapositiva cierra la primera parte.

El punto central es que WPC no son piezas aisladas. App Gateway, App Surface, la guía y las herramientas funcionan como un ecosistema.

El backend ordena la lógica y las integraciones. El frontend activa la experiencia de usuario. La guía conserva el conocimiento. Las herramientas ayudan a repetir el modelo con menos esfuerzo.

La frase importante aquí es: WPC acelera porque tiene estructura.

No propone avanzar rápido a costa del orden. Propone avanzar rápido porque las decisiones base ya están organizadas, documentadas y preparadas para reutilizarse.

## bondades.html

### Slide 1: Web Platform Core

En esta segunda parte cambio el enfoque hacia el valor ejecutivo de la solución.

WPC es una base común para lanzar soluciones digitales con mayor rapidez, menor variabilidad entre equipos y más control operativo.

La propuesta no es solamente técnica. Lo que se busca es transformar conocimiento acumulado en una capacidad de la organización.

Cuando una empresa tiene una base reutilizable, cada nuevo proyecto no arranca desde una hoja en blanco. Arranca desde una plataforma que ya resuelve arquitectura, integración, experiencia base, documentación y herramientas.

Por eso el valor no queda encerrado en un proyecto. Se puede reutilizar en varias iniciativas.

### Slide 2: El costo de no estandarizar

Aquí el mensaje es el costo de no tener una base común.

Cuando cada proyecto empieza desde cero, la organización paga muchas veces por las mismas decisiones. Se vuelve a definir estructura, se vuelven a discutir integraciones, se vuelven a resolver criterios visuales, documentación, errores, despliegue y forma de operar.

Ese costo no siempre aparece como una línea directa en un presupuesto, pero sí aparece en tiempo, retrabajo, dependencia de personas clave y dificultad para comparar resultados.

Con un ecosistema común, parte de esa energía deja de gastarse en coordinación y arranque. Se desplaza hacia producto, entrega y valor de negocio.

Estandarizar no significa limitar al equipo. Significa evitar que el equipo pierda tiempo resolviendo repetidamente problemas que ya deberían estar resueltos.

### Slide 3: Un acelerador interno

Esta diapositiva presenta WPC como un acelerador interno.

La idea es que la organización pueda iniciar nuevos productos sobre una base ya preparada. Esa base contempla entorno, dependencias, arquitectura, build, frontend, integración, documentación y operación.

Esto permite llegar antes a la conversación realmente importante: qué problema de negocio se va a resolver y cómo se entrega valor al usuario.

Técnicamente, WPC articula servidor y entorno, Vite, npm, Composer, CI/CD, un miniframework BFF con SSR, arquitectura pragmática, observabilidad, logs e integración con servicios externos.

Pero lo importante no es nombrar cada tecnología. Lo importante es que esas decisiones ya están integradas en una plataforma común, lista para habilitar nuevos productos.

### Slide 4: Métricas que justifican la adopción

Esta diapositiva aterriza el valor esperado.

La adopción de WPC debe evaluarse por resultados: menor tiempo de arranque, mayor capacidad efectiva del equipo, menos retrabajo y mayor continuidad operativa.

Cuando reducimos decisiones repetidas, el equipo puede dedicar más energía a entregar funcionalidades. Cuando tenemos criterios comunes, reducimos variabilidad. Cuando documentamos y automatizamos, disminuimos dependencia de personas específicas.

Por eso las métricas no hablan solo de tecnología. Hablan de capacidad de entrega.

La promesa es iniciar más rápido, trabajar con más consistencia y hacer que las iniciativas sean más comparables entre sí.

### Slide 5: La inversión se recupera por reutilización

Aquí el mensaje es el retorno de la inversión.

WPC tiene más sentido cuando deja de verse como un esfuerzo para un solo producto y se entiende como una capacidad reutilizable.

El primer proyecto ya obtiene beneficios porque arranca con una base preparada. Pero los siguientes proyectos obtienen todavía más valor, porque reutilizan decisiones, componentes, documentación, herramientas y aprendizajes.

Cada nueva iniciativa reduce el costo promedio de la inversión inicial. Lo que antes se construía una sola vez para un proyecto ahora queda disponible para otros.

Esa es la lógica del retorno: no se recupera solo por lo que hace hoy, sino por todo lo que evita repetir mañana.

### Slide 6: Decisión recomendada

La decisión recomendada es aprobar WPC como acelerador interno.

No se está aprobando únicamente una pieza de software, una estructura de carpetas o una interfaz visual. Se está aprobando una capacidad para construir soluciones con más velocidad, menos riesgo y mayor consistencia.

WPC ayuda a reducir la curva de aprendizaje, a ordenar el trabajo técnico y a hacer que más personas puedan participar sin depender siempre del mismo grupo experto.

El objetivo final es que la organización construya mejor y repita mejor.

El respaldo documental permite revisar la solución, sus ejemplos, su arquitectura y sus criterios. Pero el valor central es que WPC deja instalada una forma de trabajo reutilizable.

## Cierre final

Para cerrar, yo resumiría WPC así:

WPC existe porque construir desde cero en cada iniciativa es costoso.

La solución propone una base común para que los equipos puedan enfocarse antes en el valor de negocio, con una estructura que ya ordena backend, frontend, documentación, herramientas y operación.

WPC no es solo una forma de programar. Es una forma de convertir experiencia técnica en capacidad repetible para la organización.

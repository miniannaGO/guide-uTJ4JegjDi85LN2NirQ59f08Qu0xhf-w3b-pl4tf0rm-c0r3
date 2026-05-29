# Faltante para llevar la guía al nivel de `BASES.md`

Este archivo traduce los indicadores de `BASES.md` a un backlog editorial para `docs/guide/`.

No es contenido final de la guía. Es un esqueleto de cambios: qué falta, dónde debería vivir, cómo abordarlo, qué páginas afecta, qué mejora y para quién está dirigido.

## Estado actual resumido

La guía ya tiene una base técnica fuerte:

- `index.html`: portada, rutas recomendadas, matriz de capacidades y rutas rápidas.
- `getting-started.html`: requisitos, instalación, `.env`, dependencias y validación inicial.
- `fundamentals.html`: vocabulario, modelo mental, límites y flujo completo.
- `app-gateway.html`: arquitectura Gateway, routing, controllers, use cases, outbound, seguridad, errores y observabilidad.
- `app-surface.html`: arquitectura Surface, runtime, bindings, HTTP, sesión, Vite, assets y adapters.
- `bridge.html`: contrato Gateway/Surface, HTML, JSON, headers, seguridad, assets y flujos cruzados.
- `tools.html`: referencia de Robo, scaffolding, generadores y configuración.
- `recipes.html`: recetas de construcción y diagnóstico.
- `reference.html`: referencia rápida de scripts, rutas, contratos, headers, errores y diagnóstico.
- `troubleshooting.html`: diagnóstico por síntomas.
- `diagrams.html`: visor y mapas recomendados.

El salto pendiente no es solo agregar más texto. Falta hacer explícitas varias capas editoriales: audiencia, quick start verificable, tutorial principal, glosario, deployment, migración, mantenimiento documental y uniformidad de recetas/referencia.

## Convenciones de esta matriz

- Estado:
  - `Cubierto`: existe y cumple razonablemente.
  - `Parcial`: existe, pero falta estructura, validación, profundidad o separación.
  - `Faltante`: no existe como sección clara o está demasiado disperso.
- Prioridad:
  - `Alta`: aumenta utilidad inmediata o evita bloqueo.
  - `Media`: mejora navegación, consistencia o mantenibilidad.
  - `Baja`: refinamiento editorial o crecimiento futuro.

## 1. Piezas que tienen en común las guías fuertes

- **Portada con identidad, propósito y promesa**
  - Estado: Parcial
  - Qué faltaría: La portada explica WPC, pero le falta una promesa explícita por perfil y estado/versionado de la guía.
  - Dónde abordarlo: `index.html`
  - Forma propuesta: Agregar bloque "Para quién es", "Qué promete esta guía" y "Estado de la guía".
  - Afecta: Portada, rutas de lectura.
  - Qué mejoraría: Orientación inicial y confianza.
  - Dirigido a: Nuevos devs, líderes técnicos, evaluadores.
  - Prioridad: Alta

- **Quick start de cero a algo funcionando**
  - Estado: Parcial
  - Qué faltaría: `getting-started.html` instala y valida, pero no define una experiencia mínima visible con resultado exacto, capturas esperadas o URL final por entorno.
  - Dónde abordarlo: `getting-started.html#run`, `getting-started.html#validate`
  - Forma propuesta: Convertir "Ejecución local" en quick start compacto con prerequisitos, comandos, URL, resultado esperado, error común y siguiente paso.
  - Afecta: Onboarding.
  - Qué mejoraría: Menos preguntas de instalación.
  - Dirigido a: Persona nueva, QA local.
  - Prioridad: Alta

- **Requisitos claros**
  - Estado: Parcial
  - Qué faltaría: Hay PHP, Composer y npm, pero falta matriz con versiones mínimas, extensiones PHP, permisos, Apache/XAMPP, puertos, navegador y herramientas opcionales.
  - Dónde abordarlo: `getting-started.html#requirements`, `reference.html`
  - Forma propuesta: Tabla "Requisito / versión / cómo verificar / si falla".
  - Afecta: Instalación, soporte.
  - Qué mejoraría: Diagnóstico temprano.
  - Dirigido a: Nuevos devs, soporte.
  - Prioridad: Alta

- **Instalación por entorno**
  - Estado: Parcial
  - Qué faltaría: Se habla de entorno local, pero falta separar Windows/XAMPP, Linux, CI y producción.
  - Dónde abordarlo: `getting-started.html`; nueva `deployment.html`
  - Forma propuesta: Tabs o subsecciones por entorno con diferencias y comandos.
  - Afecta: Instalación, deployment.
  - Qué mejoraría: Evita mezclar desarrollo con operación.
  - Dirigido a: Devs, operaciones.
  - Prioridad: Alta

- **Primera experiencia verificable**
  - Estado: Parcial
  - Qué faltaría: Validación inicial existe, pero debe incluir "esto deberías ver" y "cómo confirmar desde navegador/logs".
  - Dónde abordarlo: `getting-started.html#validate`
  - Forma propuesta: Checkpoints con salida esperada, URL, headers relevantes y comando alterno.
  - Afecta: Quick start, troubleshooting.
  - Qué mejoraría: Reduce ansiedad del primer arranque.
  - Dirigido a: Persona nueva, QA.
  - Prioridad: Alta

- **Conceptos esenciales**
  - Estado: Cubierto
  - Qué faltaría: Falta convertir algunos conceptos en entradas enlazables de glosario.
  - Dónde abordarlo: `fundamentals.html`, nuevo `glossary.html`
  - Forma propuesta: Mantener explicación conceptual en fundamentos y extraer términos exactos al glosario.
  - Afecta: Fundamentos, referencia.
  - Qué mejoraría: Vocabulario común.
  - Dirigido a: Todos.
  - Prioridad: Media

- **Modelo mental**
  - Estado: Cubierto
  - Qué faltaría: Puede mejorar con una ruta "leer en 10 minutos" para principiantes.
  - Dónde abordarlo: `fundamentals.html`, `index.html`
  - Forma propuesta: Agregar cápsula "Si solo lees una cosa, lee esto".
  - Afecta: Fundamentos.
  - Qué mejoraría: Entrada más amable.
  - Dirigido a: Nuevos devs.
  - Prioridad: Media

- **Tutorial guiado**
  - Estado: Faltante
  - Qué faltaría: Hay recetas y flujos completos, pero no un tutorial único que construya una feature real de punta a punta con checkpoints.
  - Dónde abordarlo: Nuevo `tutorial.html` o `tutorial-feature.html`
  - Forma propuesta: Tutorial "Crear una feature de búsqueda de items" con SSR, Surface, endpoint JSON/HTML, use case, connector falso, validación y errores comunes.
  - Afecta: `recipes.html`, `app-gateway.html`, `app-surface.html`, `bridge.html`, `tools.html`.
  - Qué mejoraría: Enseña criterio, no solo piezas.
  - Dirigido a: Dev que construirá features.
  - Prioridad: Alta

- **Ejemplos realistas**
  - Estado: Parcial
  - Qué faltaría: Existen muchos ejemplos, pero algunos son fragmentarios y no siempre muestran resultado esperado o archivos completos cuando importa el contexto.
  - Dónde abordarlo: Todas las páginas técnicas.
  - Forma propuesta: Estándar por ejemplo: archivo, intención, snippet, resultado, validación.
  - Afecta: Gateway, Surface, Bridge, Recipes.
  - Qué mejoraría: Más confianza y menos copia ciega.
  - Dirigido a: Devs.
  - Prioridad: Alta

- **Recetas por tarea**
  - Estado: Cubierto parcial
  - Qué faltaría: `recipes.html` tiene buenas tareas, pero cada receta necesita precondiciones, validación, errores comunes y enlaces a referencia de forma uniforme.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Aplicar plantilla de receta de `BASES.md` a todas las recetas.
  - Afecta: Trabajo diario.
  - Qué mejoraría: Recetas más ejecutables.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Referencia exacta**
  - Estado: Parcial
  - Qué faltaría: `reference.html` existe, pero faltan tablas más exhaustivas de comandos, opciones, env vars, interfaces públicas y compatibilidad.
  - Dónde abordarlo: `reference.html`, `tools.html`
  - Forma propuesta: Convertir listas sueltas en tablas densas.
  - Afecta: Consultas exactas.
  - Qué mejoraría: Menos debate sobre nombres y flags.
  - Dirigido a: Seniors, agentes, soporte.
  - Prioridad: Alta

- **Glosario**
  - Estado: Faltante
  - Qué faltaría: Hay vocabulario en `fundamentals.html`, pero no diccionario alfabético ni términos prohibidos/reservados.
  - Dónde abordarlo: Nuevo `glossary.html`; enlaces desde `fundamentals.html` y `reference.html`.
  - Forma propuesta: Diccionario: término, definición, confusiones, equivalente externo, dónde profundizar.
  - Afecta: Fundamentos, onboarding, reviews.
  - Qué mejoraría: Lenguaje común.
  - Dirigido a: Nuevos devs, líderes, agentes.
  - Prioridad: Alta

- **Solución de problemas**
  - Estado: Cubierto parcial
  - Qué faltaría: `troubleshooting.html` existe y es fuerte, pero falta estandarizar todos los síntomas con formato síntoma/causa/diagnóstico/solución/confirmación/prevención.
  - Dónde abordarlo: `troubleshooting.html`
  - Forma propuesta: Reestructurar cada caso con plantilla fija.
  - Afecta: Diagnóstico.
  - Qué mejoraría: Menor tiempo de soporte.
  - Dirigido a: Devs bloqueados, soporte.
  - Prioridad: Alta

- **Integración con herramientas**
  - Estado: Cubierto
  - Qué faltaría: `tools.html` es sólida. Falta mantener fuera de `tools.html` los comandos Robo como ayuda, no como reemplazo de explicación.
  - Dónde abordarlo: `tools.html`, `recipes.html`, páginas técnicas.
  - Forma propuesta: Ya iniciado: "Ayuda de Robo"; completar con notas "qué debes entender antes de ejecutar".
  - Afecta: Recipes, Gateway, Surface, Bridge.
  - Qué mejoraría: Mejor separación aprendizaje/herramienta.
  - Dirigido a: Devs y agentes.
  - Prioridad: Media

- **Búsqueda**
  - Estado: Cubierto parcial
  - Qué faltaría: Hay búsqueda en la UI, pero falta documentar cómo buscar, qué indexa y cómo mantener títulos/anchors.
  - Dónde abordarlo: `README.md`, nuevo `maintenance.html` o sección en `reference.html`.
  - Forma propuesta: Guía editorial de búsqueda y anchors.
  - Afecta: Mantenimiento de docs.
  - Qué mejoraría: Encuentro más rápido.
  - Dirigido a: Mantenedores.
  - Prioridad: Media

- **Enlaces relacionados**
  - Estado: Parcial
  - Qué faltaría: Hay crosslinks, pero faltan relaciones sistemáticas desde tutorial a referencia, referencia a recetas y troubleshooting a conceptos.
  - Dónde abordarlo: Todas las páginas.
  - Forma propuesta: Bloque estándar "Relacionado" por sección o por página.
  - Afecta: Navegación.
  - Qué mejoraría: Lectura en capas.
  - Dirigido a: Todos.
  - Prioridad: Alta

## 2. Tipos de contenido que deben separarse

- **Overview**
  - Estado: Parcial
  - Qué faltaría: Cada página tiene overview, pero falta una definición explícita de "cuándo usar WPC" y "cuándo no".
  - Dónde abordarlo: `index.html`, `fundamentals.html`
  - Forma propuesta: Sección breve: usos adecuados, no objetivos, límites del sistema.
  - Afecta: Portada, fundamentos.
  - Qué mejoraría: Expectativas realistas.
  - Dirigido a: Líderes, nuevos devs.
  - Prioridad: Alta

- **Quick start**
  - Estado: Parcial
  - Qué faltaría: Falta un flujo compacto de 10 a 15 minutos con resultado visible y validación.
  - Dónde abordarlo: `getting-started.html`; posiblemente `quick-start.html` si crece.
  - Forma propuesta: "Copia, ejecuta, abre URL, valida". Mantenerlo corto y enlazar detalles.
  - Afecta: Onboarding.
  - Qué mejoraría: Tracción inmediata.
  - Dirigido a: Persona nueva.
  - Prioridad: Alta

- **Tutorial**
  - Estado: Faltante
  - Qué faltaría: Falta tutorial principal completo y narrativo.
  - Dónde abordarlo: Nuevo `tutorial.html`.
  - Forma propuesta: Construir una feature pequeña con decisiones explicadas.
  - Afecta: Recipes, architecture.
  - Qué mejoraría: Aprendizaje transferible.
  - Dirigido a: Dev nuevo/intermedio.
  - Prioridad: Alta

- **Guía conceptual**
  - Estado: Cubierto parcial
  - Qué faltaría: Fundamentos, Gateway, Surface y Bridge cumplen, pero falta una separación más clara entre "modelo mental" y referencia operativa.
  - Dónde abordarlo: `fundamentals.html`, `app-gateway.html`, `app-surface.html`, `bridge.html`.
  - Forma propuesta: Agregar al inicio de cada página "qué criterio te llevas". Mover detalles exactos a referencia cuando corresponda.
  - Afecta: Conceptos.
  - Qué mejoraría: Menos lectura pesada.
  - Dirigido a: Nuevos devs, seniors.
  - Prioridad: Media

- **How-to o receta**
  - Estado: Cubierto parcial
  - Qué faltaría: Faltan precondiciones y validación homogénea en cada receta.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Plantilla fija: cuándo usar, precondiciones, archivos, pasos, resultado, validación, problemas, relacionado.
  - Afecta: Trabajo diario.
  - Qué mejoraría: Recetas accionables.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Referencia**
  - Estado: Parcial
  - Qué faltaría: Falta exhaustividad estable de opciones, APIs públicas, env vars y códigos de error.
  - Dónde abordarlo: `reference.html`, `tools.html`.
  - Forma propuesta: Tablas por contrato: nombre exacto, tipo, default, dónde vive, enlaces.
  - Afecta: Consulta exacta.
  - Qué mejoraría: Menos dependencia de memoria oral.
  - Dirigido a: Seniors, agentes.
  - Prioridad: Alta

- **Troubleshooting**
  - Estado: Cubierto parcial
  - Qué faltaría: Falta partir siempre del síntoma y agregar confirmación/prevención.
  - Dónde abordarlo: `troubleshooting.html`
  - Forma propuesta: Reescritura incremental por grupos.
  - Afecta: Soporte.
  - Qué mejoraría: Diagnóstico más rápido.
  - Dirigido a: Devs bloqueados.
  - Prioridad: Alta

- **Buenas prácticas**
  - Estado: Parcial
  - Qué faltaría: Las recomendaciones existen, pero no siempre separan obligatorio/recomendado/permitido/desaconsejado/legado/experimental.
  - Dónde abordarlo: `fundamentals.html`, `app-gateway.html`, `app-surface.html`, nuevo `practices.html` si crece.
  - Forma propuesta: Tablas de decisión por área.
  - Afecta: Reviews, diseño.
  - Qué mejoraría: Menos ambigüedad normativa.
  - Dirigido a: Seniors, reviewers.
  - Prioridad: Alta

- **Referencia de errores**
  - Estado: Parcial
  - Qué faltaría: Hay errores en `reference.html` y `troubleshooting.html`, pero falta una referencia por código/texto de error.
  - Dónde abordarlo: Nuevo `errors.html` o sección ampliada `reference.html#errors`.
  - Forma propuesta: Código/texto, cuándo aparece, impacto, solución rápida, solución de fondo, enlace conceptual.
  - Afecta: Diagnóstico.
  - Qué mejoraría: Reduce soporte repetitivo.
  - Dirigido a: Devs, soporte.
  - Prioridad: Alta

## 3. Contenido imprescindible por sección

- **Portada**
  - Estado actual: Parcial
  - Qué faltaría: Audiencia principal, versión/fecha, estado de guía y rutas por perfil.
  - Dónde abordarlo: `index.html`
  - Forma propuesta: Agregar "Elige tu ruta": nuevo, construir, depurar, mantener, operar.
  - Afecta: Inicio.
  - Qué mejoraría: Lectura orientada por necesidad.
  - Dirigido a: Todos.
  - Prioridad: Alta

- **Primeros pasos**
  - Estado actual: Parcial
  - Qué faltaría: Máquina limpia, URLs esperadas, credenciales/datos demo si existen, cómo apagar/limpiar.
  - Dónde abordarlo: `getting-started.html`
  - Forma propuesta: Checklist de entorno y "salida esperada".
  - Afecta: Onboarding.
  - Qué mejoraría: Menos bloqueos iniciales.
  - Dirigido a: Nuevos devs.
  - Prioridad: Alta

- **Fundamentos**
  - Estado actual: Parcial
  - Qué faltaría: Glosario temprano enlazable y "decisiones no negociables" en formato tabla.
  - Dónde abordarlo: `fundamentals.html`, `glossary.html`.
  - Forma propuesta: Separar vocabulario corto de diccionario profundo.
  - Afecta: Modelo mental.
  - Qué mejoraría: Consistencia de lenguaje.
  - Dirigido a: Nuevos devs, reviewers.
  - Prioridad: Alta

- **Arquitectura**
  - Estado actual: Cubierto parcial
  - Qué faltaría: Falta página sintética de arquitectura global; hoy está repartida entre Gateway, Surface y Bridge.
  - Dónde abordarlo: Nuevo `architecture.html` o ampliar `fundamentals.html`.
  - Forma propuesta: Mapa de capas, entrypoints, dependencias permitidas/prohibidas, riesgos al romper fronteras.
  - Afecta: Todo el guide.
  - Qué mejoraría: Decisiones futuras más seguras.
  - Dirigido a: Seniors, líderes, agentes.
  - Prioridad: Alta

- **Tutorial principal**
  - Estado actual: Faltante
  - Qué faltaría: Tutorial end-to-end completo.
  - Dónde abordarlo: Nuevo `tutorial.html`.
  - Forma propuesta: Feature realista con checkpoints.
  - Afecta: Recipes, tools, troubleshooting.
  - Qué mejoraría: Primer aprendizaje profundo.
  - Dirigido a: Devs nuevos.
  - Prioridad: Alta

- **Recetas**
  - Estado actual: Cubierto parcial
  - Qué faltaría: Estandarizar receta por receta.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Aplicar plantilla de `BASES.md`; agregar validación y errores comunes a cada una.
  - Afecta: Trabajo diario.
  - Qué mejoraría: Menos interpretación.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Referencia**
  - Estado actual: Parcial
  - Qué faltaría: Mayor densidad en tablas y opciones exactas.
  - Dónde abordarlo: `reference.html`, `tools.html`.
  - Forma propuesta: Tablas de env vars, comandos, hooks, headers, payloads, interfaces.
  - Afecta: Consulta.
  - Qué mejoraría: Respuestas exactas.
  - Dirigido a: Seniors, agentes.
  - Prioridad: Alta

- **Herramientas**
  - Estado actual: Cubierto
  - Qué faltaría: Falta reforzar "cuándo no usar" en cada comando y salidas esperadas.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Para cada comando: propósito, cuándo usar, cuándo no, sintaxis, opciones, lee/escribe, protecciones, ejemplo, salida esperada.
  - Afecta: Tooling.
  - Qué mejoraría: Menos miedo a ejecutar Robo.
  - Dirigido a: Devs, agentes.
  - Prioridad: Media

- **Seguridad**
  - Estado actual: Parcial
  - Qué faltaría: Existe en Gateway y Bridge, pero falta página/checklist integral de amenazas, secretos, logs sensibles, headers, XSS, CSRF y dependencias externas.
  - Dónde abordarlo: Nuevo `security.html` o sección de alto nivel enlazada desde Gateway/Bridge.
  - Forma propuesta: Modelo de amenazas básico + checklist de cambios.
  - Afecta: Seguridad transversal.
  - Qué mejoraría: Reglas no dispersas.
  - Dirigido a: Devs, reviewers, operaciones.
  - Prioridad: Alta

- **Deployment**
  - Estado actual: Faltante parcial
  - Qué faltaría: Hay cache producción y assets, pero no checklist de deployment completo.
  - Dónde abordarlo: Nuevo `deployment.html`.
  - Forma propuesta: Build, env vars, cache, permisos, logs, health checks, rollback, diferencias dev/prod.
  - Afecta: Operación.
  - Qué mejoraría: Producción deja de ser sorpresa.
  - Dirigido a: DevOps, líderes, devs.
  - Prioridad: Alta

- **Troubleshooting**
  - Estado actual: Cubierto parcial
  - Qué faltaría: Formato uniforme por síntoma y más casos iniciales/deploy.
  - Dónde abordarlo: `troubleshooting.html`
  - Forma propuesta: Plantilla fija por card.
  - Afecta: Diagnóstico.
  - Qué mejoraría: Menor tiempo de resolución.
  - Dirigido a: Devs bloqueados.
  - Prioridad: Alta

- **Glosario**
  - Estado actual: Faltante
  - Qué faltaría: No hay página alfabética.
  - Dónde abordarlo: Nuevo `glossary.html`.
  - Forma propuesta: Términos, diferencias, reservados, prohibidos, equivalencias externas.
  - Afecta: Fundamentos, referencia.
  - Qué mejoraría: Reduce ambigüedad.
  - Dirigido a: Todos.
  - Prioridad: Alta

## 4. Bloques que debería preguntarse cada página

- **Título orientado a tarea o concepto**
  - Estado: Parcial
  - Qué faltaría: Algunos títulos son claros; otros son internos o amplios.
  - Dónde abordarlo: Todas las páginas.
  - Forma propuesta: Revisar títulos con la pregunta "¿esto es lo que buscaría el usuario?".
  - Afecta: Navegación, búsqueda.
  - Qué mejoraría: Encuentro más rápido.
  - Dirigido a: Todos.

- **Resumen corto**
  - Estado: Parcial
  - Qué faltaría: Muchas páginas tienen intro, pero no siempre dicen cuándo leerlas.
  - Dónde abordarlo: Todas las páginas principales.
  - Forma propuesta: Primer párrafo estándar: qué resuelve, cuándo leer, cuándo saltar.
  - Afecta: Orientación.
  - Qué mejoraría: Menos lectura innecesaria.
  - Dirigido a: Todos.

- **Antes de empezar**
  - Estado: Parcial
  - Qué faltaría: Recetas y secciones técnicas no siempre listan precondiciones.
  - Dónde abordarlo: `recipes.html`, `tools.html`, `getting-started.html`.
  - Forma propuesta: Bloque de prerequisitos por receta/comando.
  - Afecta: Ejecución.
  - Qué mejoraría: Menos errores por contexto faltante.
  - Dirigido a: Devs, agentes.

- **Resultado esperado**
  - Estado: Parcial
  - Qué faltaría: Existe en varias recetas, pero no de forma obligatoria.
  - Dónde abordarlo: `recipes.html`, `getting-started.html`, `tutorial.html`.
  - Forma propuesta: Resultado visible/verificable en cada tarea.
  - Afecta: Validación.
  - Qué mejoraría: Más confianza.
  - Dirigido a: Devs, QA.

- **Camino recomendado**
  - Estado: Cubierto parcial
  - Qué faltaría: Hay recorridos, falta ruta por perfil.
  - Dónde abordarlo: `index.html`.
  - Forma propuesta: "Soy nuevo", "Voy a construir", "Voy a depurar", "Voy a operar", "Voy a mantener".
  - Afecta: Portada.
  - Qué mejoraría: Navegación personalizada.
  - Dirigido a: Todos.

- **Ejemplo mínimo**
  - Estado: Parcial
  - Qué faltaría: Hay snippets, pero no siempre son ejecutables aislados.
  - Dónde abordarlo: Páginas técnicas y recetas.
  - Forma propuesta: Marcar "mínimo" y explicar alcance.
  - Afecta: Aprendizaje.
  - Qué mejoraría: Menos ruido.
  - Dirigido a: Devs nuevos.

- **Ejemplo realista**
  - Estado: Parcial
  - Qué faltaría: Hay flujos completos, pero falta un tutorial realista único.
  - Dónde abordarlo: Nuevo `tutorial.html`; `recipes.html`.
  - Forma propuesta: Caso `items/search` o equivalente consistente.
  - Afecta: Aprendizaje profundo.
  - Qué mejoraría: Transferencia a features reales.
  - Dirigido a: Devs.

- **Variantes**
  - Estado: Parcial
  - Qué faltaría: Algunas páginas comparan opciones; recetas no siempre.
  - Dónde abordarlo: `recipes.html`, `tools.html`.
  - Forma propuesta: Tabla "elige esto si...".
  - Afecta: Decisión.
  - Qué mejoraría: Menos dudas de camino.
  - Dirigido a: Devs.

- **Errores comunes**
  - Estado: Parcial
  - Qué faltaría: Troubleshooting existe, pero cada receta no enlaza sus fallos directos.
  - Dónde abordarlo: `recipes.html`, `troubleshooting.html`.
  - Forma propuesta: "Si ves X, revisa Y" al final de cada receta.
  - Afecta: Diagnóstico.
  - Qué mejoraría: Menos saltos mentales.
  - Dirigido a: Devs bloqueados.

- **Verificación**
  - Estado: Parcial
  - Qué faltaría: Falta uniformidad.
  - Dónde abordarlo: `recipes.html`, `getting-started.html`, `tutorial.html`.
  - Forma propuesta: Comando, navegador, header, log o archivo esperado.
  - Afecta: Calidad.
  - Qué mejoraría: Cambios comprobables.
  - Dirigido a: Devs, QA, agentes.

- **Relacionado**
  - Estado: Parcial
  - Qué faltaría: Hay crosslinks, pero falta estándar.
  - Dónde abordarlo: Todas las páginas.
  - Forma propuesta: Bloque final "Relacionado: concepto, receta, referencia, diagnóstico".
  - Afecta: Navegación en capas.
  - Qué mejoraría: Mejor continuidad.
  - Dirigido a: Todos.

## 5. Plantilla para recetas y comandos

- **Receta: cuándo usarla**
  - Estado: Parcial
  - Qué faltaría: Algunas recetas inician con explicación, no con criterio de uso.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Primer párrafo "Usa esta receta cuando...".
  - Afecta: Todas las recetas.
  - Qué mejoraría: Elección correcta de receta.
  - Dirigido a: Devs.
  - Prioridad: Alta

- **Receta: precondiciones**
  - Estado: Parcial
  - Qué faltaría: No todas tienen "ya existe..." o "debes tener...".
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Bloque fijo antes de pasos.
  - Afecta: Recipes.
  - Qué mejoraría: Menos errores por contexto.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Receta: archivos involucrados**
  - Estado: Cubierto parcial
  - Qué faltaría: Existen archivos en pasos, pero conviene tabla inicial.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Tabla de rutas al inicio de cada receta.
  - Afecta: Recipes.
  - Qué mejoraría: Escaneo rápido.
  - Dirigido a: Devs.
  - Prioridad: Media

- **Receta: pasos**
  - Estado: Cubierto
  - Qué faltaría: Hay pasos y flujos.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Mantener, pero normalizar numeración y títulos.
  - Afecta: Recipes.
  - Qué mejoraría: Continuidad.
  - Dirigido a: Devs.
  - Prioridad: Media

- **Receta: resultado esperado**
  - Estado: Parcial
  - Qué faltaría: Falta en varias recetas.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Bloque "Resultado esperado".
  - Afecta: Validación.
  - Qué mejoraría: Confianza.
  - Dirigido a: Devs, QA.
  - Prioridad: Alta

- **Receta: validación**
  - Estado: Parcial
  - Qué faltaría: Falta comando/checkpoint por receta.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: "Validación" con comando, URL o inspección.
  - Afecta: Recipes, QA.
  - Qué mejoraría: Confirmación objetiva.
  - Dirigido a: Devs, QA, agentes.
  - Prioridad: Alta

- **Receta: problemas comunes**
  - Estado: Parcial
  - Qué faltaría: Se delega a troubleshooting, pero falta síntoma cercano.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: 2 o 3 problemas comunes por receta con enlaces.
  - Afecta: Recipes, troubleshooting.
  - Qué mejoraría: Diagnóstico rápido.
  - Dirigido a: Devs bloqueados.
  - Prioridad: Alta

- **Receta: relacionado**
  - Estado: Parcial
  - Qué faltaría: Hay links, pero no siempre al final.
  - Dónde abordarlo: `recipes.html`
  - Forma propuesta: Enlaces a fundamento, referencia y troubleshooting.
  - Afecta: Navegación.
  - Qué mejoraría: Lectura en capas.
  - Dirigido a: Todos.
  - Prioridad: Media

- **Referencia de comando: propósito**
  - Estado: Cubierto
  - Qué faltaría: Tools explica propósito.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Mantener.
  - Afecta: Tooling.
  - Qué mejoraría: Claridad.
  - Dirigido a: Devs, agentes.
  - Prioridad: Media

- **Referencia de comando: cuándo usar**
  - Estado: Parcial
  - Qué faltaría: Existe en prosa, no siempre en tabla.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Campo explícito por comando.
  - Afecta: Tooling.
  - Qué mejoraría: Mejor criterio.
  - Dirigido a: Devs.
  - Prioridad: Media

- **Referencia de comando: cuándo no usar**
  - Estado: Parcial
  - Qué faltaría: Está disperso en límites.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Campo explícito "No lo uses para...".
  - Afecta: Tooling.
  - Qué mejoraría: Evita abuso del scaffolder.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Referencia de comando: sintaxis**
  - Estado: Cubierto
  - Qué faltaría: Existe.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Mantener.
  - Afecta: Tooling.
  - Qué mejoraría: Exactitud.
  - Dirigido a: Devs.
  - Prioridad: Media

- **Referencia de comando: opciones**
  - Estado: Parcial
  - Qué faltaría: Hay opciones, pero falta tabla uniforme requerida/default/descripción.
  - Dónde abordarlo: `tools.html`, `reference.html`.
  - Forma propuesta: Tabla por comando.
  - Afecta: Tooling.
  - Qué mejoraría: Consulta rápida.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Referencia de comando: archivos que lee/escribe**
  - Estado: Parcial
  - Qué faltaría: Muchas secciones lo mencionan, no siempre completo.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Tabla "Lee / escribe / modifica".
  - Afecta: Tooling, reviews.
  - Qué mejoraría: Anticipa impacto.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Referencia de comando: protecciones**
  - Estado: Cubierto parcial
  - Qué faltaría: Tools menciona abortos, pero conviene tabla estable.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Tabla "Aborta si..." por comando.
  - Afecta: Tooling.
  - Qué mejoraría: Seguridad al ejecutar.
  - Dirigido a: Devs, agentes.
  - Prioridad: Alta

- **Referencia de comando: salida esperada**
  - Estado: Faltante parcial
  - Qué faltaría: No siempre documenta qué imprime o crea.
  - Dónde abordarlo: `tools.html`
  - Forma propuesta: Bloque de salida esperada o diff esperado.
  - Afecta: Tooling.
  - Qué mejoraría: Validación posterior.
  - Dirigido a: Devs, agentes.
  - Prioridad: Media

## 6. Criterios editoriales

- **Ejemplos que funcionen realmente**
  - Estado: Parcial
  - Qué faltaría: Falta rutina de revisión de snippets.
  - Dónde abordarlo: Nuevo `maintenance.html`; `README.md`.
  - Forma propuesta: Proceso de revisión de ejemplos.
  - Afecta: Mantenimiento.
  - Qué mejoraría: Menos ejemplos obsoletos.
  - Dirigido a: Mantenedores.

- **Nombres semánticos y consistentes**
  - Estado: Parcial
  - Qué faltaría: Hay `items`, `demo-items`, `feature`; conviene una política de placeholders.
  - Dónde abordarlo: `glossary.html`, `maintenance.html`.
  - Forma propuesta: Regla: placeholders marcados y caso realista consistente.
  - Afecta: Examples.
  - Qué mejoraría: Menos confusión.
  - Dirigido a: Devs, agentes.

- **Mostrar archivo completo cuando importa**
  - Estado: Parcial
  - Qué faltaría: Muchos snippets no indican contexto.
  - Dónde abordarlo: `recipes.html`, tutorial.
  - Forma propuesta: Etiqueta "fragmento" vs "archivo completo".
  - Afecta: Aprendizaje.
  - Qué mejoraría: Copia más segura.
  - Dirigido a: Devs.

- **Resultado esperado en ejemplos**
  - Estado: Parcial
  - Qué faltaría: No siempre presente.
  - Dónde abordarlo: Recipes, tutorial, quick start.
  - Forma propuesta: Bloque de salida esperada.
  - Afecta: Validación.
  - Qué mejoraría: Confianza.
  - Dirigido a: Devs, QA.

- **Navegación por áreas**
  - Estado: Cubierto parcial
  - Qué faltaría: Menú global existe; falta rutas por perfil.
  - Dónde abordarlo: `index.html`.
  - Forma propuesta: Cards por perfil y "siguiente paso" por objetivo.
  - Afecta: Portada.
  - Qué mejoraría: Menos sobrecarga.
  - Dirigido a: Todos.

- **Enlaces tutorial -> referencia**
  - Estado: Faltante
  - Qué faltaría: No hay tutorial principal.
  - Dónde abordarlo: Nuevo `tutorial.html`.
  - Forma propuesta: Cada paso enlaza a referencia y troubleshooting.
  - Afecta: Aprendizaje en capas.
  - Qué mejoraría: Profundidad sin saturar.
  - Dirigido a: Devs nuevos.

- **Enlaces referencia -> recetas**
  - Estado: Parcial
  - Qué faltaría: Existe algo, pero no sistemático.
  - Dónde abordarlo: `reference.html`.
  - Forma propuesta: Columna "Ver receta".
  - Afecta: Reference.
  - Qué mejoraría: Acción desde detalle exacto.
  - Dirigido a: Devs, agentes.

- **Anchors estables**
  - Estado: Parcial
  - Qué faltaría: Hay anchors; falta política de mantenimiento.
  - Dónde abordarlo: `maintenance.html`.
  - Forma propuesta: Regla: no cambiar ids sin alias o nota.
  - Afecta: Navegación, enlaces.
  - Qué mejoraría: Menos links rotos.
  - Dirigido a: Mantenedores.

- **Redacción generosa**
  - Estado: Cubierto parcial
  - Qué faltaría: La guía está bien escrita, pero faltan etiquetas de obligación/recomendación.
  - Dónde abordarlo: Todas las páginas.
  - Forma propuesta: Usar "Obligatorio", "Recomendado", "Permitido", "Evitar".
  - Afecta: Reviews.
  - Qué mejoraría: Menos dogmatismo ambiguo.
  - Dirigido a: Todos.

- **Profundidad en capas**
  - Estado: Parcial
  - Qué faltaría: Existen capas, pero no están declaradas.
  - Dónde abordarlo: `index.html`, `reference.html`.
  - Forma propuesta: Mapa de niveles: frase, resumen, ejemplo, tutorial, concepto, receta, referencia.
  - Afecta: Arquitectura editorial.
  - Qué mejoraría: Lectura controlada.
  - Dirigido a: Todos.

## 7. Matriz de cobertura de `BASES.md`

- **Identidad**
  - Estado: Parcial
  - Faltante principal: Promesa explícita y límites.
  - Dónde abordarlo: `index.html`
  - Forma: Bloque de identidad y no objetivos.
  - Mejora: Expectativas claras.
  - Dirigido a: Todos.

- **Audiencia**
  - Estado: Faltante parcial
  - Faltante principal: Perfiles de lector.
  - Dónde abordarlo: `index.html`
  - Forma: Rutas por perfil.
  - Mejora: Menos navegación adivinada.
  - Dirigido a: Todos.

- **Requisitos**
  - Estado: Parcial
  - Faltante principal: Matriz completa y comandos de comprobación.
  - Dónde abordarlo: `getting-started.html`
  - Forma: Tabla con versión/comando/fallo.
  - Mejora: Onboarding.
  - Dirigido a: Nuevos devs.

- **Instalación**
  - Estado: Parcial
  - Faltante principal: Entornos separados y limpieza/apagado.
  - Dónde abordarlo: `getting-started.html`
  - Forma: Quick start por entorno.
  - Mejora: Repetibilidad.
  - Dirigido a: Devs.

- **Verificación**
  - Estado: Parcial
  - Faltante principal: Checkpoints exactos por receta y quick start.
  - Dónde abordarlo: `getting-started.html`, `recipes.html`.
  - Forma: Resultado esperado + cómo confirmar.
  - Mejora: Confianza.
  - Dirigido a: Devs, QA.

- **Modelo mental**
  - Estado: Cubierto parcial
  - Faltante principal: Ruta breve y glosario.
  - Dónde abordarlo: `fundamentals.html`, `glossary.html`.
  - Forma: Lectura de 10 minutos + diccionario.
  - Mejora: Comprensión.
  - Dirigido a: Nuevos devs.

- **Arquitectura**
  - Estado: Cubierto parcial
  - Faltante principal: Vista global única de fronteras y riesgos.
  - Dónde abordarlo: `architecture.html` o `fundamentals.html`.
  - Forma: Diagramas + dependencias permitidas/prohibidas.
  - Mejora: Decisiones.
  - Dirigido a: Seniors.

- **Tutorial**
  - Estado: Faltante
  - Faltante principal: Tutorial end-to-end.
  - Dónde abordarlo: `tutorial.html`.
  - Forma: Feature realista paso a paso.
  - Mejora: Aprendizaje transferible.
  - Dirigido a: Devs.

- **Recetas**
  - Estado: Cubierto parcial
  - Faltante principal: Plantilla uniforme.
  - Dónde abordarlo: `recipes.html`.
  - Forma: Precondiciones, validación, errores.
  - Mejora: Ejecución diaria.
  - Dirigido a: Devs, agentes.

- **Referencia**
  - Estado: Parcial
  - Faltante principal: Más tablas exactas.
  - Dónde abordarlo: `reference.html`.
  - Forma: APIs/env/config/errors/hooks.
  - Mejora: Consulta.
  - Dirigido a: Seniors, agentes.

- **Configuración**
  - Estado: Parcial
  - Faltante principal: Matriz central de opciones.
  - Dónde abordarlo: `reference.html`, `getting-started.html`.
  - Forma: Opción/default/entorno/impacto.
  - Mejora: Menos búsqueda.
  - Dirigido a: Devs, operaciones.

- **Herramientas**
  - Estado: Cubierto parcial
  - Faltante principal: Cuándo no usar y salida esperada por comando.
  - Dónde abordarlo: `tools.html`.
  - Forma: Plantilla de comando.
  - Mejora: Ejecución segura.
  - Dirigido a: Devs, agentes.

- **Errores**
  - Estado: Parcial
  - Faltante principal: Referencia por código/texto.
  - Dónde abordarlo: `errors.html` o `reference.html#errors`.
  - Forma: Código, causa, impacto, solución.
  - Mejora: Diagnóstico.
  - Dirigido a: Soporte, devs.

- **Seguridad**
  - Estado: Parcial
  - Faltante principal: Página/checklist integral.
  - Dónde abordarlo: `security.html`.
  - Forma: Amenazas, CSRF, sesión, secretos, logs sensibles.
  - Mejora: Cambios seguros.
  - Dirigido a: Devs, reviewers.

- **Performance**
  - Estado: Parcial bajo
  - Faltante principal: Costos de JS, assets, adapters, logs y outbound no están en una guía de diagnóstico dedicada.
  - Dónde abordarlo: Nuevo `performance.html` o sección en `app-surface.html`/`app-gateway.html`.
  - Forma: Guía de costos y diagnóstico.
  - Mejora: Mejor diseño operativo.
  - Dirigido a: Seniors, performance.

- **Deployment**
  - Estado: Faltante parcial
  - Faltante principal: Checklist operativo completo.
  - Dónde abordarlo: Nuevo `deployment.html`.
  - Forma: Build, env, cache, permisos, logs, rollback.
  - Mejora: Operación.
  - Dirigido a: DevOps, líderes.

- **Migración**
  - Estado: Faltante
  - Faltante principal: Guía de upgrade/cambios sin romper.
  - Dónde abordarlo: Nuevo `migration.html`.
  - Forma: Cambios por versión, deprecaciones, checklist.
  - Mejora: Evolución segura.
  - Dirigido a: Mantenedores.

- **Glosario**
  - Estado: Faltante
  - Faltante principal: Diccionario y términos reservados.
  - Dónde abordarlo: Nuevo `glossary.html`.
  - Forma: Término, definición, confusión, enlace.
  - Mejora: Lenguaje común.
  - Dirigido a: Todos.

- **Mantenimiento**
  - Estado: Parcial
  - Faltante principal: Guía editorial viva.
  - Dónde abordarlo: Nuevo `maintenance.html`; ampliar `README.md`.
  - Forma: Rutina de revisión, owners, checklists.
  - Mejora: Guía sostenible.
  - Dirigido a: Mantenedores, agentes.

## 8. Preguntas que la guía debería contestar

- **¿Qué problema resuelve el proyecto?**
  - Estado: Parcial
  - Faltante: Más explícito en una frase no técnica.
  - Dónde abordarlo: `index.html`
  - Mejora: Orientación ejecutiva.

- **¿Qué no intenta resolver?**
  - Estado: Faltante
  - Faltante: No objetivos y límites.
  - Dónde abordarlo: `index.html`, `fundamentals.html`
  - Mejora: Evita expectativas falsas.

- **¿Cuál es el camino más corto para verlo funcionando?**
  - Estado: Parcial
  - Faltante: Quick start verificable.
  - Dónde abordarlo: `getting-started.html`
  - Mejora: Tracción.

- **¿Cuáles son los requisitos reales?**
  - Estado: Parcial
  - Faltante: Versiones y checks.
  - Dónde abordarlo: `getting-started.html`
  - Mejora: Menos bloqueo.

- **¿Qué versión documenta?**
  - Estado: Faltante
  - Faltante: Versión/fecha de revisión.
  - Dónde abordarlo: `index.html`, footer o `README.md`
  - Mejora: Confianza.

- **¿Dónde están los entrypoints?**
  - Estado: Cubierto parcial
  - Faltante: Índice global de entrypoints.
  - Dónde abordarlo: `reference.html`, `architecture.html`
  - Mejora: Consulta rápida.

- **¿Cuál es el flujo principal?**
  - Estado: Cubierto
  - Faltante: Mantener y enlazar mejor.
  - Dónde abordarlo: `fundamentals.html`, `bridge.html`
  - Mejora: Comprensión.

- **¿Qué carpetas son importantes?**
  - Estado: Cubierto parcial
  - Faltante: Resumen alfabético central.
  - Dónde abordarlo: `reference.html`
  - Mejora: Navegación.

- **¿Qué carpetas no debo tocar?**
  - Estado: Parcial
  - Faltante: Lista explícita de zonas generadas/ignoradas.
  - Dónde abordarlo: `reference.html`, `maintenance.html`
  - Mejora: Evita cambios peligrosos.

- **¿Qué convenciones son obligatorias?**
  - Estado: Parcial
  - Faltante: Separar obligatorio/recomendado.
  - Dónde abordarlo: `fundamentals.html`, `reference.html`
  - Mejora: Reviews más claras.

- **¿Qué nombres están reservados?**
  - Estado: Parcial
  - Faltante: Diccionario de términos reservados.
  - Dónde abordarlo: `glossary.html`
  - Mejora: Vocabulario consistente.

- **¿Cómo creo una pieza nueva?**
  - Estado: Cubierto parcial
  - Faltante: Recetas con validación y errores.
  - Dónde abordarlo: `recipes.html`, `tools.html`
  - Mejora: Ejecución segura.

- **¿Cómo conecto dos capas?**
  - Estado: Cubierto
  - Faltante: Mejor enlazado desde tutorial.
  - Dónde abordarlo: `bridge.html`, `tutorial.html`
  - Mejora: Transferencia.

- **¿Cómo valido que quedó bien?**
  - Estado: Parcial
  - Faltante: Checkpoints por tarea.
  - Dónde abordarlo: `recipes.html`
  - Mejora: Calidad.

- **¿Qué errores son frecuentes?**
  - Estado: Cubierto parcial
  - Faltante: Formato uniforme y referencia de errores.
  - Dónde abordarlo: `troubleshooting.html`, `errors.html`
  - Mejora: Soporte.

- **¿Cómo depuro?**
  - Estado: Cubierto parcial
  - Faltante: Más conexión con logs, headers y comandos.
  - Dónde abordarlo: `troubleshooting.html`, `reference.html`
  - Mejora: Diagnóstico.

- **¿Cómo actualizo?**
  - Estado: Faltante
  - Faltante: Migración/upgrade guide.
  - Dónde abordarlo: `migration.html`
  - Mejora: Evolución.

- **¿Cómo despliego?**
  - Estado: Faltante parcial
  - Faltante: Checklist de deployment.
  - Dónde abordarlo: `deployment.html`
  - Mejora: Operación.

- **¿Qué cambia entre desarrollo y producción?**
  - Estado: Parcial
  - Faltante: Tabla central.
  - Dónde abordarlo: `deployment.html`, `reference.html`
  - Mejora: Menos sorpresas.

- **¿Dónde encuentro la referencia exacta?**
  - Estado: Cubierto parcial
  - Faltante: Mejor índice de referencia por tema.
  - Dónde abordarlo: `reference.html`
  - Mejora: Consulta.

- **¿Qué hago después del primer tutorial?**
  - Estado: Faltante
  - Faltante: Siguiente ruta tras tutorial.
  - Dónde abordarlo: `tutorial.html`, `index.html`
  - Mejora: Continuidad.

## 9. Aplicado a WPC como plataforma

- **Visión del ecosistema**
  - Estado: Parcial
  - Faltante: Unir guía técnica con valor de `pillars-capabilities.html` sin mezclar presentación y aprendizaje.
  - Dónde abordarlo: `index.html`; mantener presentaciones aparte.
  - Forma propuesta: Bloque "ecosistema WPC" con links.
  - Audiencia: Líderes, nuevos devs.

- **Instalación local**
  - Estado: Parcial
  - Faltante: Verificación limpia, entornos y fallos comunes.
  - Dónde abordarlo: `getting-started.html`.
  - Forma propuesta: Quick start reforzado.
  - Audiencia: Nuevos devs.

- **Estructura del workspace**
  - Estado: Cubierto parcial
  - Faltante: Índice central con zonas "no tocar".
  - Dónde abordarlo: `reference.html`.
  - Forma propuesta: Tabla de carpetas.
  - Audiencia: Devs, agentes.

- **Flujo backend**
  - Estado: Cubierto
  - Faltante: Mejorar enlaces a tutorial y recetas.
  - Dónde abordarlo: `app-gateway.html`.
  - Forma propuesta: Relacionado por sección.
  - Audiencia: Devs backend.

- **Flujo frontend**
  - Estado: Cubierto
  - Faltante: Mejorar enlaces a tutorial y performance.
  - Dónde abordarlo: `app-surface.html`.
  - Forma propuesta: Relacionado por sección.
  - Audiencia: Devs frontend.

- **Puente SSR + Surface**
  - Estado: Cubierto
  - Faltante: Mejorar tutorial principal.
  - Dónde abordarlo: `bridge.html`, `tutorial.html`.
  - Forma propuesta: Caso end-to-end.
  - Audiencia: Devs full stack.

- **Contratos JSON y HTML**
  - Estado: Cubierto parcial
  - Faltante: Referencia exacta y validación por ejemplos.
  - Dónde abordarlo: `bridge.html`, `reference.html`.
  - Forma propuesta: Tablas y checks.
  - Audiencia: Devs.

- **Generación de artefactos**
  - Estado: Cubierto
  - Faltante: Salida esperada por comando.
  - Dónde abordarlo: `tools.html`.
  - Forma propuesta: Plantilla de comando completa.
  - Audiencia: Devs, agentes.

- **Herramientas Robo**
  - Estado: Cubierto
  - Faltante: Mantener como ayuda fuera de Tools.
  - Dónde abordarlo: Todas las páginas con comandos.
  - Forma propuesta: Lenguaje "Ayuda de Robo".
  - Audiencia: Devs.

- **Scaffolding**
  - Estado: Cubierto
  - Faltante: Cuándo no usar, salida esperada.
  - Dónde abordarlo: `tools.html`.
  - Forma propuesta: Tablas.
  - Audiencia: Devs, agentes.

- **Observabilidad**
  - Estado: Cubierto parcial
  - Faltante: Receta de lectura de logs y referencia de eventos.
  - Dónde abordarlo: `app-gateway.html`, `recipes.html`, `reference.html`.
  - Forma propuesta: Checkpoints y ejemplos.
  - Audiencia: Soporte, devs.

- **Sesión**
  - Estado: Cubierto
  - Faltante: Checklist de seguridad.
  - Dónde abordarlo: `security.html`.
  - Forma propuesta: Matriz de casos.
  - Audiencia: Devs, QA.

- **Assets**
  - Estado: Cubierto parcial
  - Faltante: Deployment y performance.
  - Dónde abordarlo: `deployment.html`, `performance.html`.
  - Forma propuesta: Checklist.
  - Audiencia: DevOps, frontend.

- **Naming**
  - Estado: Parcial
  - Faltante: Glosario y nombres reservados.
  - Dónde abordarlo: `glossary.html`, `reference.html`.
  - Forma propuesta: Diccionario.
  - Audiencia: Todos.

- **Arquitectura de capas**
  - Estado: Cubierto parcial
  - Faltante: Página global sintética.
  - Dónde abordarlo: `architecture.html`.
  - Forma propuesta: Mapa y riesgos.
  - Audiencia: Seniors.

- **Recetas de features completas**
  - Estado: Parcial
  - Faltante: Tutorial y receta completa validada.
  - Dónde abordarlo: `tutorial.html`, `recipes.html`.
  - Forma propuesta: Feature realista.
  - Audiencia: Devs.

- **Integración externa**
  - Estado: Cubierto parcial
  - Faltante: Validación, errores externos y contrato completo.
  - Dónde abordarlo: `recipes.html`, `app-gateway.html`, `tools.html`.
  - Forma propuesta: Receta reforzada.
  - Audiencia: Devs backend.

- **Troubleshooting**
  - Estado: Cubierto parcial
  - Faltante: Uniformidad y más síntomas de deploy.
  - Dónde abordarlo: `troubleshooting.html`.
  - Forma propuesta: Plantilla fija.
  - Audiencia: Soporte.

- **Despliegue**
  - Estado: Faltante parcial
  - Faltante: Checklist operativo.
  - Dónde abordarlo: `deployment.html`.
  - Forma propuesta: Dev/prod, rollback, health.
  - Audiencia: Operaciones.

- **Glosario**
  - Estado: Faltante
  - Faltante: Diccionario.
  - Dónde abordarlo: `glossary.html`.
  - Forma propuesta: Alfabético.
  - Audiencia: Todos.

- **Referencia de comandos**
  - Estado: Cubierto parcial
  - Faltante: Opciones/default/salida.
  - Dónde abordarlo: `tools.html`.
  - Forma propuesta: Tabla por comando.
  - Audiencia: Devs, agentes.

- **Referencia de configuración**
  - Estado: Parcial
  - Faltante: Matriz central de env/config.
  - Dónde abordarlo: `reference.html`.
  - Forma propuesta: Tabla opción/default/impacto.
  - Audiencia: Devs, operaciones.

- **Mantenimiento documental**
  - Estado: Parcial
  - Faltante: Rutina editorial.
  - Dónde abordarlo: `maintenance.html`, `README.md`.
  - Forma propuesta: Checklist y ownership.
  - Audiencia: Mantenedores.

## 10. Orden recomendado de implementación

- **1. Fortalecer quick start**
  - Motivo: Es la mayor fricción inicial.
  - Dónde: `getting-started.html`
  - Entregable mínimo: Comandos, URL, resultado esperado, error común, siguiente paso.

- **2. Agregar rutas por audiencia**
  - Motivo: Mejora la portada sin tocar arquitectura.
  - Dónde: `index.html`
  - Entregable mínimo: "Soy nuevo", "Voy a construir", "Voy a depurar", "Voy a operar", "Voy a mantener".

- **3. Normalizar recetas**
  - Motivo: Aumenta utilidad diaria.
  - Dónde: `recipes.html`
  - Entregable mínimo: Plantilla por receta con validación y problemas comunes.

- **4. Crear tutorial principal**
  - Motivo: Conecta todas las piezas.
  - Dónde: Nuevo `tutorial.html`
  - Entregable mínimo: Feature completa de punta a punta.

- **5. Crear glosario**
  - Motivo: Reduce ambigüedad.
  - Dónde: Nuevo `glossary.html`
  - Entregable mínimo: Términos alfabéticos, reservados y prohibidos.

- **6. Reforzar referencia**
  - Motivo: Da exactitud a usuarios avanzados y agentes.
  - Dónde: `reference.html`, `tools.html`
  - Entregable mínimo: Tablas de comandos, env, headers, contratos, errores.

- **7. Crear deployment**
  - Motivo: Cubre operación.
  - Dónde: Nuevo `deployment.html`
  - Entregable mínimo: Build, env, cache, logs, rollback.

- **8. Estandarizar troubleshooting**
  - Motivo: Reduce soporte repetido.
  - Dónde: `troubleshooting.html`
  - Entregable mínimo: Síntoma/causa/diagnóstico/solución/confirmación/prevención.

- **9. Crear mantenimiento documental**
  - Motivo: Hace sostenible la guía.
  - Dónde: Nuevo `maintenance.html` y `README.md`
  - Entregable mínimo: Checklist de actualización y reglas editoriales.

## 11. Nuevos archivos sugeridos

- **`quick-start.html` opcional**
  - Propósito: Quick start ultracorto si `getting-started.html` queda muy largo.
  - Por qué no basta con páginas actuales: `getting-started.html` ya tiene mucho detalle de dependencias.
  - Enlaces principales: Inicio, primeros pasos, troubleshooting.

- **`tutorial.html`**
  - Propósito: Tutorial principal end-to-end.
  - Por qué no basta con páginas actuales: `recipes.html` resuelve tareas; no enseña una experiencia única completa.
  - Enlaces principales: Gateway, Surface, Bridge, Tools, Recipes.

- **`architecture.html`**
  - Propósito: Vista global de fronteras, dependencias y riesgos.
  - Por qué no basta con páginas actuales: Hoy está repartida entre varias páginas.
  - Enlaces principales: Fundamentals, Gateway, Surface, Bridge, Diagrams.

- **`glossary.html`**
  - Propósito: Diccionario y términos reservados/prohibidos.
  - Por qué no basta con páginas actuales: El vocabulario está disperso.
  - Enlaces principales: Fundamentals, Reference.

- **`security.html`**
  - Propósito: Seguridad transversal.
  - Por qué no basta con páginas actuales: Seguridad está en Gateway/Bridge, pero no como checklist integral.
  - Enlaces principales: Gateway, Surface, Bridge, Troubleshooting.

- **`deployment.html`**
  - Propósito: Operación y producción.
  - Por qué no basta con páginas actuales: Hay cache/assets, pero no checklist completo.
  - Enlaces principales: Getting Started, Gateway cache, Surface assets, Reference.

- **`performance.html` opcional**
  - Propósito: Costos de assets, adapters, logs, outbound.
  - Por qué no basta con páginas actuales: Los costos están implícitos.
  - Enlaces principales: Surface, Gateway, Bridge.

- **`errors.html` opcional**
  - Propósito: Referencia de errores por código/texto.
  - Por qué no basta con páginas actuales: `troubleshooting.html` parte del síntoma; `reference.html` resume.
  - Enlaces principales: Reference, Troubleshooting.

- **`migration.html`**
  - Propósito: Cambios y actualización sin romper.
  - Por qué no basta con páginas actuales: No existe ruta de upgrade.
  - Enlaces principales: Maintenance, Reference.

- **`maintenance.html`**
  - Propósito: Guía editorial para mantener docs.
  - Por qué no basta con páginas actuales: `README.md` tiene decisiones, pero no rutina completa.
  - Enlaces principales: README, AGENTS, Project Map.

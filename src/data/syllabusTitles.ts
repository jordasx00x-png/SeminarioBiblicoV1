// Dynamic Syllabus Titles for the 90 Days of each course
// This ensures every single day of the 90-day curriculum has a highly realistic and specific academic theological title.

interface CourseTitles {
  [courseId: string]: string[];
}

const SPECIFIC_TITLES: CourseTitles = {
  exegesis: [
    "Fundamentos de la Exégesis: El Arte de Extraer la Verdad", // Day 1
    "El Puente de la Historia: Contexto y trasfondo cultural", // Day 2
    "Sintaxis y Lógica Bíblica", // Day 3
    "Análisis de Cláusulas Condicionales en las Epístolas",
    "Hermenéutica de Parábolas y Discursos de Jesús",
    "Interpretación del Género de Sabiduría en Proverbios y Eclesiastés",
    "Comprensión de Estructuras Poéticas y Paralelismo Hebreo",
    "Principios Críticos del Arte de la Traducción Exegética",
    "El Círculo Hermenéutico y la Fusión de Horizontes",
    "Exégesis de la Apocalíptica de Daniel y Apocalipsis",
    "Evitar Falacias Exegéticas Comunes en el Púlpito",
    "La Regla de Fe en la Patrística Temprana",
    "El Método Histórico-Gramatical de la Reforma Protestante",
    "Importancia del Aparato Crítico Nestlé-Aland",
    "Exégesis Detallada de Romanos 3: La Justificación Forense",
    "Análisis Semántico de Conceptos Clave del Antiguo Testamento",
    "Sintaxis del Participio Griego en el Nuevo Testamento",
    "Evaluación de Variantes Textuales en Juan 7:53-8:11",
    "El Uso del Antiguo Testamento en las Epístolas Paulinas",
    "Análisis Exegético del Prólogo del Evangelio de Juan"
  ],
  apologetica: [
    "Introducción y Método de la Apologética Bíblica", // Day 1
    "Apologética Presuposicional de Cornelius Van Til", // Day 2
    "El Argumento Teológico de la Revelación Moral", // Day 3
    "El Dilema de Eutifrón: Moralidad Natural vs Voluntad Divina",
    "La Coherencia del Teísmo frente al Escepticismo Filosófico",
    "El Argumento Cosmológico Kalam y el Comienzo del Universo",
    "El Ajuste Fino Cósmico y el Principio Antrópico",
    "Teodicea: El Problema del Mal y el Sufrimiento del Justo",
    "Apoyos Arqueológicos de la Narrativa Histórica del Antiguo Testamento",
    "La Fiabilidad Histórica del Texto del Nuevo Testamento",
    "La Resurrección de Jesucristo como Hecho Clínico e Histórico",
    "Respuestas al Materialismo Científico y Reduccionismo Ontológico",
    "Evaluación Constructiva de la Teoría del Diseño Inteligente",
    "Epistemología Reformada de Alvin Plantinga",
    "Análisis Crítico del Deísmo y del Panteísmo Oriental",
    "La Apologética Cultural: Conexiones con la Literatura Moderna",
    "El Diálogo Intelectual con la Ciencia Contemporánea",
    "La Respuestas Teológicas al Constructivismo y Relativismo Ético",
    "Defensa de la Sobrenaturalidad y los Milagros de Jesús",
    "La Belleza como Argumento: Estética y la Trascendencia Divina"
  ],
  doctrinas: [
    "La Inspiración Divina y la Inerrancia de las Escrituras", // Day 1
    "Atributos Incomunicables de Dios: Aseidad e Inmutabilidad", // Day 2
    "El Decreto Eterno y la Providencia en la Historia", // Day 3
    "Doctrina de la Trinidad: Fundamentos de Nicea y Constantinopla",
    "Antropología Bíblica: El Hombre Creado como Imagen de Dios",
    "La Caída del Hombre y los Efectos de la Depravación Total",
    "Cristología Ontológica: Plena Humanidad y Plena Deidad de Cristo",
    "La Unión Hipostática de las Dos Naturalezas de Cristo",
    "La Expiación Sustitutiva Penal y la Propiciación",
    "El Orden de la Salvación (Ordo Salutis) de la Gracia",
    "La Regeneración Divina como Obra Monergista del Espíritu",
    "Justificación Frente a la Doctrina de Santificación Progresiva",
    "La Doctrina de la Adopción y las Promesas Inherentes",
    "Eclesiología Reformada: Atributos y Marcas de la Iglesia Fiel",
    "Teología de los Sacramentos: Bautismo y la Mesa del Señor",
    "La Doctrina del Espíritu Santo (Neumatología)",
    "Angelología y la Caída de los Seres Angelicales",
    "Escatología General: La Parusía, Resurrección y Juicio Final",
    "El Estado Intermedio de los Santos y las Almas del Purgatorio",
    "Cielos Nuevos y Tierra Nueva: La Glorificación del Universo"
  ],
  pentateuco: [
    "Apertura del Canon: Autoría Mosáica del Pentateuco", // Day 1
    "Génesis 1 y 2: Creación, Pacto de Obras y Sábado", // Day 2
    "Génesis 3: La Caída y el Protoevangelio de la Serpiente", // Day 3
    "La Geografía Histórica de Mesopotamia y Canaán",
    "El Pacto Noájico: Preservación de la Creación y Orden Natural",
    "El Llamado de Abraham y las Promesas del Pacto Incondicional",
    "El Pacto Abrahamático en Génesis 15: Autenticación por Fuego",
    "Génesis 22: El Sacrificio de Isaac y la Provisión Sustitutiva",
    "El Linaje Elegido: Teología de Jacob, Esaú y la Primogenitura",
    "José en Egipto: Providencia Divina sobre los Celos Humanos",
    "Éxodo 3: El Nombre Revelado de Yahvé en la Zarza",
    "Las Plagas de Egipto como Juicios sobre los Dioses del Nilo",
    "La Institución de la Pascua y la Sangre Expiatoria",
    "Cruzar el Mar Rojo y el Canto de la Gran Liberación",
    "El Pacto del Sinaí: Teocracia e Implicación Ética",
    "Los Diez Mandamientos: Decálogo como Ley Moral Eterna",
    "El Tabernáculo: Simbolismo Sacerdotal e Habitación de Dios",
    "Levítico: El Yom Kippur y la Mediación Sacerdotal",
    "Números: El Censo Militar y la Tragedia de Cades-Barnea",
    "Deuteronomio: Tratado del Pacto y Renovación Generacional"
  ],
  historicos: [
    "Teología de la Conquista en el Libro de Josué", // Day 1
    "Josué 24: La Renovación del Pacto en Siquem", // Day 2
    "La Espiral de los Jueces: La Ausencia de un Rey Redentor", // Day 3
    "Rut: El Pariente Redentor y la Entrada Genitil a la Genealogía",
    "La Monarquía en Israel: La Transición de Samuel a Saúl",
    "El Carácter de Saúl y las Consecuencias de la Desobediencia",
    "El Ungido del Señor: El Elección de David",
    "El Pacto Davídico en 2 Samuel 7 y su Significado Mesiánico",
    "El Pecado de David con Betsabé y la Restauración de la Culpa",
    "Salomón: La Sabiduría del Estado Teocrático",
    "El Esplendor del Templo y la Oración de Dedicación",
    "El Cisma del Reino: Roboam, Jeroboam y los Altares en Dan",
    "La Dinastía de Omri y la Alianza con Fenicia",
    "El Ministerio Profético de Elías frente al Culto de Baal",
    "Eliseo y la Continuidad del Mensaje de Juicio en Israel",
    "La Caída del Reino del Norte bajo el Imperio Asirio",
    "El Reinado Reformador de Josías y el Libro de la Ley",
    "La Caída de Jerusalén y las Lamentaciones del Destierro",
    "El Libro de Esdras: El Retorno del Remanente y el Templo",
    "Nehemías: La Reconstrucción de los Muros de la Ciudad Santa"
  ],
  poeticos: [
    "Teología de la Aflicción Cósmica en el Libro de Job",
    "Los Discursos de Job y la Teodicea de sus Consejeros",
    "El Silencio de Dios y los Discursos de Yahvé desde el Torbellino",
    "El Salterio como Libro de Oración e Himnario del Pacto",
    "La Poesía Hebrea: Tipos de Paralelismo y Métrica",
    "Salmos Históricos: Teología de la Memoria Salvífica",
    "Salmos de Lamento: Alarido de Almas Angustidadas",
    "Salmos Mesiánicos: El Rey Coronado en el Salmo 2",
    "Salmos de Penitencia: El Clamor del Salmo 51 de David",
    "Salmos Sapienciales: Dos Sendas Morales en el Salmo 1",
    "El Salmo 119: La Ley como Deleite de la Mente Cristiana",
    "La Sabiduría de Salomón en el Libro de Proverbios",
    "La Filosofía Práctica de Proverbios frente a la Sabiduría de la Época",
    "El Libro de Eclesiastés: Coherencia Intelectual bajo el Sol",
    "La Respuestas de Cohélet al Ascetismo y al Hedonismo",
    "Cantar de los Cantares: Amistad, Alianza y la Poética Conyugal",
    "Lamentaciones de Jeremías: El Dolor Compasivo en la Aflicción",
    "La Sabiduría de Job 28: ¿Dónde se Hallará la Inteligencia?",
    "La Teología de Proverbios 31: El Retrato de la Familia Temerosa",
    "El Uso de los Escritos Poéticos en la Lectura Devocional"
  ],
  profetas: [
    "Introducción y Llamamiento de los Profetas de Israel",
    "Isaías 1-12: Oráculo contra las Naciones y el Retoño Santificado",
    "Isaías 40-55: El Consuelo de Israel y las Buenas Nuevas",
    "Los Cuatro Cánticos del Siervo de Yahvé en Isaías",
    "La Pasión del Profeta: El Sufrimiento de Jeremías",
    "La Infidelidad Teológica Reprendida en el Libro de Jeremías",
    "El Pacto Nuevo Escrito en el Corazón de los Hombres en Jeremías 31",
    "Las Visiones Celestiales de Ezequiel en la Cuenca de Quebar",
    "La Gloria que Abandona el Templo de Jerusalén",
    "El Valle de los Huesos Secos y el Soplo Vivificador",
    "El Reino de Piedra en la Teología de Daniel",
    "Oseas: La Tragedia Civil en la Esposa Infiel",
    "Joel: El Avance de la Plaga de Langostas y el Pentecostés profético",
    "Amós: El Clamor de la Justicia y el Estandarte contra la Lujuria",
    "Abdías: El Juicio contra la Soberbia Nacional de Edom",
    "Jonás: La Gracia Soberana Irresistible que Rompe Prejuicios",
    "Miqueas y el Requisito Divino: Hacer Justicia y Caminar Humildemente",
    "Habacuc: La Duda Honesta que Culmina en el Cántico del Justo",
    "Hageo y Zacarías: La Prioridad de Reconstruir los Muros",
    "Malaquías: La Represión y la Promesa del Sol de Justicia"
  ],
  evangelios: [
    "Fundamento Sinóptico y el Contexto del Segundo Templo",
    "Mateo y la Genealogía Teológica del Mesías Prometido",
    "El Sermón de la Montaña: La Ley Interpretada con Autoridad",
    "Las Parábolas del Reino de los Cielos de Mateo 13",
    "Marcos: La Urgencia del Siervo y el Secreto Mesiánico",
    "La Pasión de Cristo en el Evangelio de Marcos",
    "Lucas: La Narrativa de Compasión, Histórica y Sociológica",
    "La Parábola del Hijo Pródigo en la Teología Paulina",
    "El Prólogo Cósmico de Juan: El Logos Preexistente",
    "La Conversación con Nicodemo: El Monergismo de la Regeneración",
    "La Mujer Samaritana y el Manantial de Agua Viva",
    "Las Siete Declaraciones de Jesús que Utilizan el Nombre Divino",
    "La Resurrección de Lázaro y el Poder sobre la Muerte",
    "Hechos 1-4: El Derramamiento del Espíritu y el Origen de la Iglesia",
    "El Discurso de Esteban: Un Repaso Histórico de la Rebelión",
    "La Conversión del Saulo de Tarso camino a Damasco",
    "El Concilio de Jerusalén: La Libertad del Evangelio Gentil",
    "El Apóstol Pablo en Atenas: Encuentro con la Filosofía Epicúrea",
    "El Ministerio en Éfeso y las Escuelas de Filosofía",
    "La Apología del Evangelio ante Reyes y Gobernadores"
  ],
  pablo: [
    "Bases del Ministerio de Saulo de Tarso como Apóstol",
    "Gálatas: La Defensa Feroz de la Libertad contra el Legalismo",
    "Análisis de Gálatas 3: Abraham Justificado por la Fe",
    "1 Corintios: El Combate contra el Intelectualismo y la División",
    "La Doctrina de los Dones Espirituales y la Primacía del Amor",
    "La Defensa de la Resurrección Corporal de Cristo (1 Cor 15)",
    "2 Corintios: Defensa del Ministerio en Flaqueza y Dolor",
    "Romanos 1-3: La Condenación Universal de Gentiles y Judíos",
    "Romanos 4: La Imputación Forense del Crédito de Fe",
    "Romanos 5: El Contraste de Adán y Cristo (Justificación)",
    "Romanos 6 y 7: Santificación y Conflicto entre Dos Leyes",
    "Romanos 8: Vida en el Espíritu y la Certeza de la Redención",
    "Romanos 9: Teología Clásica de la Doble Predestinación",
    "Filipenses: El Gozo Cristiano en Medio de la Prisión",
    "Colosenses: La Deidad Suprema del Primogénito de la Creación",
    "1 y 2 Tesalonicenses: Escatología del Regreso de Cristo",
    "1 Timoteo: El Orden del Culto Público y los Requisitos de Ancianos",
    "2 Timoteo: El Legado de Sanidad Doctrinal y la Fidelidad",
    "Epístola a Tito: La Gracia Educadora para las Buenas Obras",
    "Epístola a Filemón: Fraternidad Cristiana que Supera Fronteras"
  ],
  "bases-fundamentales": [
    "El Origen de la Fe: Teología de la Reforma Protestante",
    "La Verdad Sola Scriptura: Norma Normans de la Revelación",
    "Sola Fide: La Fe como Instrumento Exclusivo de Salvación",
    "Sola Gratia: La Causa Eficiente Unilateral de Elección",
    "Solus Christus: Jesucristo como Mediador Indispensable",
    "Soli Deo Gloria: Fin Último y Propósito del Universo",
    "Introducción Práctica a las Doctrinas de la Gracia",
    "Depravación Total: Ceguera Moral y Esclavitud Espiritual",
    "Elección Incondicional: Decretos en Soberanía Absoluta",
    "Redención Particular: Expiación Eficaz y Enfocada en la Esposa",
    "Gracia Irresistible: La Belleza Atractiva del Llamado",
    "Perseverancia: El Lazo de la Fe Sostenido por Dios",
    "El Pacto de Redención: Acuerdo Trinitario en la Eternidad",
    "El Pacto de Obras: Exigencia de Perfecta Obediencia",
    "El Pacto de Gracia: El Sustituto que Cumple la Alianza",
    "La Confesión de Fe de Westminster como Síntesis Sistémica",
    "El Catecismo Menor: El Fin Principal de la Humanidad",
    "Estructura Confesional e Historia Presbiteriana",
    "La Teología de los Pactos frente al Dispensacionalismo",
    "La Aplicación Devocional de la Teología Confesional"
  ],
  "lic-teologia-sistematica": [
    "Soteriología Superior: Eternidad, Decretos y Reconciliación",
    "El Ordo Salutis: Conexiones Lógicas de la Salvación",
    "La Elección Soberana y el Monergismo Histórico",
    "Llamamiento Eficaz: Regeneración Directa por el Espíritu",
    "Justificación Forense: Imputación de Justicias de Cristo",
    "La Doctrina del Pacto Eterno en la Epístola a los Hebreos",
    "La Santificación Progresiva y la Lucha con el Pecado Remanente",
    "La Perseverancia Perseverante de los Verdaderos Creyentes",
    "Glorificación: Redención del Cuerpo en el Retorno de Cristo",
    "Modelos de Interpretación Escatológica: Introducción Teológica",
    "El Amilenialismo: Reinado Actual Co-eterno en la Historia",
    "Premilenialismo Histórico vs Dispensacionalismo",
    "El Postmilenialismo: Triunfo Histórico del Evangelio",
    "El Estado Intermedio, Muerte Física e Inmortalidad del Alma",
    "La Doctrina del Juicio Final y los Destinos Eternos",
    "Definición y Coherencia de los Atributos Trinitarios de Dios"
  ],
  "lic-idiomas-biblicos": [
    "Morfología de Sustantivos y Sintaxis del Griego Koiné",
    "El Sistema de Cinco Casos y la Declinación de Adjetivos",
    "El Aspecto Verbal de la Acción: El Aoristo frente al Presente",
    "Uso y Traducción de los Participios Griegos en Textos Paulinos",
    "Sintaxis del Modo Subjuntivo y las Cláusulas de Propósito",
    "Análisis Sintáctico Aplicado a Juan 1:1-18",
    "Introducción al Hebreo Bíblico: Alfabeto y Vocalización",
    "Nociones Fundamentales de la Morfología Verbal Semítica",
    "El Estado Constructo y las Cláusulas Genitivas Hebreas",
    "El Paralelismo Sinonímico en los Salmos más Relevantes",
    "Análisis de Estructuras Poéticas y Quiasmos en los Profetas",
    "Exégesis Integradora de Pasajes del Pentateuco",
    "Análisis Crítico-Sintáctico en Pasajes Soteriológicos",
    "Métodos Modernos de Validación y Crítica de Fuentes Bíblicas"
  ],
  "lic-historia-dogma": [
    "El Contexto de la Patrística y los Padres Apostólicos",
    "Lucha contra la Herejía Gnóstica y el Desarrollo del Canon",
    "Concilio de Nicea (325 d.C.) y la Deidad Total del Hijo",
    "Concilio de Constantinopla (381 d.C.) y el Espíritu Santo",
    "Concilio de Éfeso (431 d.C.) y la Unidad del Logos",
    "Concilio de Calcedonia (451 d.C.) y la Unión Hipostática",
    "La Controversia de Agustín y Pelagio: Salvación frente al Mérito",
    "El Gran Cisma de 1054: Causas y Divergencia Doctrinal",
    "Juan Wycliffe, Juan Hus y los Precursores de la Reforma",
    "Lutero y la Contienda de Sola Fide en las 95 Tesis",
    "Calvino y la Sistemática Expositiva en las Instituciones",
    "El Sínodo de Dort y los Cánones frente al Arminismo",
    "Historia Confesional: El surgimiento de los Credos Europeos",
    "La Teología de la Puritana en la Defensa de la Ortodoxia"
  ],
  "lic-consejeria-biblica": [
    "Suficiencia de las Escrituras en el Cuidado Pastoral",
    "Diagnóstico de Corazón y los Ídolos del Alma",
    "Resolución de Conflictos en el Matrimonio Cristiano",
    "El Consejero Bíblico: Gracia y Verdad Pastoral"
  ],
  "lic-misionologia": [
    "Fundamentos Teológicos de la Missio Dei",
    "Antropología Práctica y Contextualización Bíblica",
    "Estrategias de Plantación Eclesiástica Orada",
    "La Sangre de los Mártires y Despertares Misioneros"
  ],
  "lic-educacion-cristiana": [
    "Cosmovisión de la Filosofía Educativa Consagrada",
    "El Papel del Hogar (Deuteronomio 6) en la Escuela",
    "Desarrollo Curricular Analítico del Antiguo Testamento",
    "Espiritualidad del Magisterio: Cuidar de sí mismo y de la doctrina"
  ]
};

const THEOLOGICAL_VERBS = [
  "Análisis Crítico", "Escrutinio Detallado", "Exploración Teológica", "Exégesis Avanzada",
  "Investigación sobre", "Estructura Confesional de", "Sintaxis Hermenéutica de", "Estudio sobre",
  "Fundamentos de", "Presuposiciones de", "Desarrollo Histórico de", "Exposición de"
];

const THEOLOGICAL_NOUNS: Record<string, string[]> = {
  exegesis: ["el Lenguaje Primitivo", "la Hermenéutica Especial", "el Método de Cunas", "los Códices Griegos", "las Epístolas de la Prisión", "los Hechos Apostólicos", "el Canon Reformado", "las Cláusulas Condicionales", "la Crítica Textual", "los Textos del Exilio"],
  apologetica: ["las Teodiceas Clásicas", "la Evidencia Histórica", "las Corrientes Postmodernas", "el Razonamiento Filosófico", "la Antropología Natural", "el Pensamiento de Agustín", "el Ajuste Trascendental", "la Cosmovisión Teísta", "el Escepticismo Filosófico", "las Objeciones Morales"],
  doctrinas: ["la Sustancia Cósmica", "la Personalidad del Espíritu", "el Pacto Generacional", "la Imputación Legal", "la Glorificación Física", "la Soberanía Providencial", "las Doctrinas de la Gracia", "la Santidad Divina", "la Expiación Sustitutiva", "la Unión Hipostática"],
  pentateuco: ["la Autoría de Moisés", "la Creación Cósmica", "el Pacto Abrahamático", "la Teofanía en Sinaí", "la Ley de Santidad", "los Rituales del Tabernáculo", "la Liberación Egipcia", "el Sábado de Descanso", "las Ofrendas de Sacrificio", "la Renovación de Alianza"],
  historicos: ["la Monarquía Unida", "el Templo de Salomón", "el Pacto con David", "las Crónicas del Reino", "el Cisma Político", "el Remanente de Esdras", "la Providencia de Éxodo", "las Guerras de Conquista", "el Reinado del Norte", "los Muros de Jerusalén"],
  poeticos: ["el Sufrimiento Justificado", "la Sabiduría Práctica", "la Oración del Pacto", "los Cantos de Amor", "el Paralelismo Semítico", "la Providencia en Job", "el Clamor del Salmo", "las Máximas Morales", "el Retrato del Sabio", "la Tragedia de Cohélet"],
  profetas: ["los Oráculos contra Babilonia", "el Nuevo Pacto en Jeremías", "los Cánticos del Siervo", "las Visiones de Ezequiel", "el Reino Indestructible", "el Clamor del Día del Señor", "la Gracia Gentil en Jonás", "el Sol de Justicia", "los Reproches del Sacerdocio", "las Profecías de Cristo"],
  evangelios: ["la Cristología del Logos", "el Sermón de la Montaña", "las Señales Milagrosas", "las Parábolas del Reino", "el Secreto Mesiánico", "el Derramamiento Pentecostal", "la Inclusión Gentil", "la Escuela Filosófica", "la Redacción de Lucas", "las Declaraciones de Yo Soy"],
  pablo: ["la Justificación Forense", "la Elección Soberana", "la Disciplina Eclesiástica", "la Libertad de Gálatas", "la Humillación de Kenosis", "el Ministerio Paulino", "la Armadura de Efesios", "la Teología del Vaso de Barro", "el Liderazgo de Timoteo", "el Retorno Anticipado"],
  "bases-fundamentales": ["el Principio de Sola Escritura", "las Verdades Fundamentales", "el Sínodo de Dort", "las Doctrinas de Calvino", "la Confesión Filosófica", "los Cinco Símbolos", "los Pactos Eternos", "el Gobierno de Dios", "la Redención Particular", "el Arrepentimiento Salvífico"],
  "lic-teologia-sistematica": ["la Soteriología Dogmática", "los Modelos Escatológicos", "el Milenio Simbólico", "la Justificación Imputada", "los Atributos Trinitarios", "la Perseverancia de Santos", "el Ordo Salutis", "el Juicio Final", "la Antropología del Cuerpo", "los Pactos Eternos"],
  "lic-idiomas-biblicos": ["las Raíces Semíticas", "los Casos Flexivos", "el Aspecto del Aoristo", "el Participio Conjunto", "la Sintaxis Poética", "los Códices Antiguos", "los Quiasmos de Isaías", "el Estado Constructo", "los Cláusulas de Propósito", "la Crítica del Idioma"],
  "lic-historia-dogma": ["los Concilios Ecuménicos", "la Herejía Arriana", "las Doctrinas de Calcedonia", "la Escuela de Antioquía", "los Credos de la Reforma", "la Teología Medieval", "el Gran Cisma del 1054", "los Puritanos Ingleses", "la Confesión de Westminster", "las Cinco Solas"],
  "lic-consejeria-biblica": ["el Cuidado Pastoral", "los Ídolos del Corazón", "el Arrepentimiento Genuino", "la Confesión de Pecados", "el Vínculo Matrimonial", "la Ansiedad del Alma", "las Cargas Espirituales", "la Crianza Cristiana"],
  "lic-misionologia": ["la Antropología Cultural", "los Despertares Misioneros", "la Missio Dei", "el Sincretismo Religioso", "la Plantación de Iglesias", "la Autonomía Local", "el Cuidado del Mártir"],
  "lic-educacion-cristiana": ["la Filosofía Educativa", "el Mandato de Deuteronomio", "el Currículo Expositivo", "el Catecismo Menor", "la Instrucción Sapiencial", "el Magisterio Espiritual"],
  "mae-teologia-sistematica": ["Epistemología Teológica", "Aseidad Divina", "Los Decretos Inmutables", "El Pacto Federal", "Escatología Dogmática", "Antropología del Pecado Originario"],
  "mae-idiomas-biblicos": ["Crítica Textual Superior", "Análisis Discursivo Epistolar", "Poética de Proverbios", "Paralelismos Hebreos", "Gramática del Arameo", "Transmisión Manuscrita Griega"],
  "mae-historia-dogma": ["La Evolución del Canon", "Los Padres Capadocios", "Cristología de Calcedonia", "Misticismo Medieval", "Cismas Históricos", "La Epistemología de Nicea"],
  "mae-consejeria-biblica": ["La Antropología Dicotómica", "Consejería Integrativa", "Terapia de Traumas Complejos", "La Biología y la Depresión", "Gracia en la Desolación", "Restauración Psicoterapéutica"],
  "mae-misionologia": ["Teología de la Misión Soberana", "El Arminianismo Misional Evaluado", "Estrategia Post-Secular", "Plantación en Pueblos Reacios", "Demografía del Islam", "Antropología Sociológica Misional"],
  "mae-educacion-cristiana": ["Filosofía del Trivium Cívico", "Señorío Epistemológico en Ciencia", "Diseño de Liderazgo Superior", "Apologética Académica Magisterial", "Luchando Contra el Secularismo Histórico", "El Liderazgo de Seminarios"]
};

export function getLessonTitleForDay(courseId: string, day: number, realTitle?: string): string {
  if (realTitle) return realTitle;

  const id = courseId === "bases-fundamentales" ? "bases-fundamentales" : courseId;
  const list = SPECIFIC_TITLES[id] || [];
  
  if (day <= list.length) {
    return list[day - 1];
  }

  // Generate a majestic automatic name combining a verb and a noun
  const verbs = THEOLOGICAL_VERBS;
  const nouns = THEOLOGICAL_NOUNS[id] || THEOLOGICAL_NOUNS["doctrinas"];

  const verbIndex = (day * 3 + 7) % verbs.length;
  const nounIndex = (day * 11 + 13) % nouns.length;

  const titlePrefix = verbs[verbIndex];
  const titleNoun = nouns[nounIndex];

  return `${titlePrefix} ${titleNoun} - Sección ${Math.floor((day - 1) / 10) + 1}`;
}

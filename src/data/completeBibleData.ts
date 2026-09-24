export interface BibleBookMeta {
  id: string;
  name: string;
  shortName: string;
  testament: 'Antiguo Testamento' | 'Nuevo Testamento';
  division: 
    | 'Pentateuco' 
    | 'Históricos' 
    | 'Poéticos y Sabiduría' 
    | 'Profetas Mayores' 
    | 'Profetas Menores' 
    | 'Evangelios' 
    | 'Histórico NT' 
    | 'Epístolas Paulinas' 
    | 'Epístolas Generales' 
    | 'Profecía (Apocalipsis)';
  chaptersCount: number;
  originalLanguage: 'Hebreo Bíblico' | 'Griego Koiné' | 'Hebreo / Arameo';
  author: string;
  date: string;
  theme: string;
  summary: string;
}

export interface BibleVerse {
  bookId: string;
  chapter: number;
  verse: number;
  rvr1960: string;
  lbla: string;
  ntv: string;
  nvi?: string;
  original?: string;
  strong?: string;
  theologicalNote?: string;
}

// 66 BOOKS OF THE CANON
export const BIBLE_BOOKS_CANON: BibleBookMeta[] = [
  // ANTIGUO TESTAMENTO - Pentateuco (5)
  {
    id: 'gen',
    name: 'Génesis',
    shortName: 'Gén',
    testament: 'Antiguo Testamento',
    division: 'Pentateuco',
    chaptersCount: 50,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Moisés',
    date: 'c. 1446–1406 a.C.',
    theme: 'El principio de la creación, la caída, el pacto abrahámico y la elección soberana de Dios.',
    summary: 'El libro de los orígenes: la creación divina ex-nihilo, la entrada del pecado, el juicio del diluvio, la torre de Babel y el llamado pactual a los patriarcas Abraham, Isaac, Jacob y José.'
  },
  {
    id: 'exo',
    name: 'Éxodo',
    shortName: 'Éxo',
    testament: 'Antiguo Testamento',
    division: 'Pentateuco',
    chaptersCount: 40,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Moisés',
    date: 'c. 1446–1406 a.C.',
    theme: 'La redención soberana de Egipto, la entrega de la Ley en el Sinaí y la presencia de Dios en el Tabernáculo.',
    summary: 'Dios libera a Su pueblo con mano poderosa, establece el pacto mosaico en el monte Sinaí y desciende a morar en medio de Su pueblo a través del Tabernáculo.'
  },
  {
    id: 'lev',
    name: 'Levítico',
    shortName: 'Lev',
    testament: 'Antiguo Testamento',
    division: 'Pentateuco',
    chaptersCount: 27,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Moisés',
    date: 'c. 1445 a.C.',
    theme: 'La santidad de Jehová, el sistema sacrificial expiatorio y el sacerdocio levítico.',
    summary: 'Manual de santidad sacerdotal: sacrificios, el Día de la Expiación (Yom Kipur), leyes de pureza y el llamado supremo: «Sed santos, porque yo soy santo».'
  },
  {
    id: 'num',
    name: 'Números',
    shortName: 'Núm',
    testament: 'Antiguo Testamento',
    division: 'Pentateuco',
    chaptersCount: 36,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Moisés',
    date: 'c. 1406 a.C.',
    theme: 'La peregrinación en el desierto, la incredulidad humana y la fidelidad preservadora de Dios.',
    summary: 'El censo de Israel, la rebelión en Cades-barnea, los 40 años de juicio en el desierto y la preparación de la nueva generación para entrar a Canaán.'
  },
  {
    id: 'deu',
    name: 'Deuteronomio',
    shortName: 'Deu',
    testament: 'Antiguo Testamento',
    division: 'Pentateuco',
    chaptersCount: 34,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Moisés',
    date: 'c. 1406 a.C.',
    theme: 'La renovación del Pacto, el Shemá y la obediencia motivada por la gracia.',
    summary: 'Los tres grandes discursos de despedida de Moisés en las llanuras de Moab, recordando los mandamientos de Dios, bendiciones y maldiciones, y la elección de la vida.'
  },

  // Libros Históricos (12)
  {
    id: 'jos',
    name: 'Josué',
    shortName: 'Jos',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 24,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Josué (con adiciones finales)',
    date: 'c. 1400–1370 a.C.',
    theme: 'La conquista de Canaán y el cumplimiento de la promesa territorial de Dios.',
    summary: 'Paso del Jordán, caída de Jericó y Hai, conquista del norte y sur, repartición de la tierra entre las doce tribus y el pacto en Siquem.'
  },
  {
    id: 'jue',
    name: 'Jueces',
    shortName: 'Jue',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 21,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Tradicionalmente Samuel',
    date: 'c. 1050–1000 a.C.',
    theme: 'El ciclo del pecado, servidumbre, clamor y liberación; la necesidad de un Rey piadoso.',
    summary: 'La espiral descendente moral de Israel: apostasía, opresión extranjera, levantamiento de jueces (Gedeón, Sansón, Débora) y anarquía moral.'
  },
  {
    id: 'rut',
    name: 'Rut',
    shortName: 'Rut',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 4,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Desconocido (Trad. Samuel)',
    date: 'c. 1000 a.C.',
    theme: 'La providencia divina, el pariente redentor (Goel) y la genealogía del linaje davídico/mesiánico.',
    summary: 'La lealtad de la moabita Rut hacia Noemí, su matrimonio de redención con Booz y el nacimiento de Obed, abuelo del rey David.'
  },
  {
    id: '1sa',
    name: '1 Samuel',
    shortName: '1Sa',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 31,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Samuel, Natán y Gad',
    date: 'c. 930–722 a.C.',
    theme: 'La transición de la teocracia a la monarquía; Saúl y la unción de David.',
    summary: 'El ministerio profético de Samuel, el trágico reinado de Saúl y la elección de David conforme al corazón de Dios.'
  },
  {
    id: '2sa',
    name: '2 Samuel',
    shortName: '2Sa',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 24,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Natán y Gad',
    date: 'c. 930–722 a.C.',
    theme: 'El reinado de David y el Pacto Davídico del Reino Eterno (2 Sam 7).',
    summary: 'Consolidación del reino de David en Jerusalén, el pacto mesiánico eterno, la caída con Betsabé y las consecuencias providenciales.'
  },
  {
    id: '1re',
    name: '1 Reyes',
    shortName: '1Re',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 22,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Tradicionalmente Jeremías',
    date: 'c. 560–550 a.C.',
    theme: 'El reinado de Salomón, la construcción del Templo, la división del reino y el ministerio de Elías.',
    summary: 'Esplendor y apostasía de Salomón, la división de Israel y Judá bajo Roboam y Jeroboam, y la confrontación profética de Elías contra Baal.'
  },
  {
    id: '2re',
    name: '2 Reyes',
    shortName: '2Re',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 25,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Tradicionalmente Jeremías',
    date: 'c. 560–550 a.C.',
    theme: 'La decadencia de los reinos divididos, el exilio asirio del norte y el cautiverio babilónico de Judá.',
    summary: 'Ministerio de Eliseo, reyes de Israel y Judá, reformas de Ezequías y Josías, y la caída final de Jerusalén en el 586 a.C.'
  },
  {
    id: '1cr',
    name: '1 Crónicas',
    shortName: '1Cr',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 29,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Tradicionalmente Esdras',
    date: 'c. 450–400 a.C.',
    theme: 'Genealogías del pueblo de Dios, el culto sacerdotal y el reinado de David.',
    summary: 'Perspectiva sacerdotal y pactual pos-exílica centrada en el linaje davídico y los preparativos para el Templo del Señor.'
  },
  {
    id: '2cr',
    name: '2 Crónicas',
    shortName: '2Cr',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 36,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Tradicionalmente Esdras',
    date: 'c. 450–400 a.C.',
    theme: 'La gloria del Templo de Salomón, los reyes de Judá y los grandes avivamientos espirituales.',
    summary: 'Construcción del Templo, avivamientos bajo Asá, Josafat, Ezequías y Josías, juicio del exilio y el decreto de Ciro de reconstrucción.'
  },
  {
    id: 'esd',
    name: 'Esdras',
    shortName: 'Esd',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 10,
    originalLanguage: 'Hebreo / Arameo',
    author: 'Esdras',
    date: 'c. 440 a.C.',
    theme: 'El retorno del exilio babilónico, la reconstrucción del Templo y la restauración de la Ley.',
    summary: 'Primer retorno bajo Zorobabel, reconstrucción del Templo pese a la oposición, y segundo retorno bajo el escriba Esdras enseñando la Torá.'
  },
  {
    id: 'neh',
    name: 'Nehemías',
    shortName: 'Neh',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 13,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Nehemías',
    date: 'c. 430 a.C.',
    theme: 'La reconstrucción de los muros de Jerusalén, liderazgo piadoso y avivamiento del Pacto.',
    summary: 'Reconstrucción de las murallas en 52 días bajo intensa hostilidad, lectura pública de la Ley por Esdras y reformas sociales y religiosas.'
  },
  {
    id: 'est',
    name: 'Ester',
    shortName: 'Est',
    testament: 'Antiguo Testamento',
    division: 'Históricos',
    chaptersCount: 10,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Desconocido (Mardoqueo o contemporáneo)',
    date: 'c. 460–400 a.C.',
    theme: 'La soberana providencia invisible de Dios preservando a Su pueblo del exterminio en Persia.',
    summary: 'Coronación de Ester como reina persa, el complot genocida de Amán, la valentía de Mardoqueo y Ester, y la institución de la fiesta de Purim.'
  },

  // Poéticos y Sabiduría (5)
  {
    id: 'job',
    name: 'Job',
    shortName: 'Job',
    testament: 'Antiguo Testamento',
    division: 'Poéticos y Sabiduría',
    chaptersCount: 42,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Desconocido (época patriarcal)',
    date: 'c. 2000–1800 a.C.',
    theme: 'La soberanía de Dios sobre el sufrimiento del justo y el misterio inescrutable de Su sabiduría.',
    summary: 'La aflicción severa de Job, los debates teológicos con sus tres amigos, el discurso de Eliú, la teofanía de Dios desde el torbellino y la restauración de Job.'
  },
  {
    id: 'sal',
    name: 'Salmos',
    shortName: 'Sal',
    testament: 'Antiguo Testamento',
    division: 'Poéticos y Sabiduría',
    chaptersCount: 150,
    originalLanguage: 'Hebreo Bíblico',
    author: 'David, Asaf, hijos de Coré, Moisés, Salomón',
    date: 'c. 1400–450 a.C.',
    theme: 'El himnario pactual de Israel: alabanza, lamento, profecías mesiánicas y adoración soberana.',
    summary: 'Cinco libros de poesía hebrea rica en teología: el Rey Mesiánico (Sal 2, 22, 110), el Pastor Soberano (Sal 23), confesión y arrepentimiento (Sal 51) y la inerrancia de la Palabra (Sal 119).'
  },
  {
    id: 'pro',
    name: 'Proverbios',
    shortName: 'Pro',
    testament: 'Antiguo Testamento',
    division: 'Poéticos y Sabiduría',
    chaptersCount: 31,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Salomón, Agur, Lemuel',
    date: 'c. 950–700 a.C.',
    theme: 'El temor de Jehová como principio de la sabiduría y la vida práctica piadosa.',
    summary: 'Colección de máximas divinamente inspiradas sobre la disciplina moral, el trabajo, el matrimonio, las palabras y el contraste entre el sabio y el necio.'
  },
  {
    id: 'ecl',
    name: 'Eclesiastés',
    shortName: 'Ecl',
    testament: 'Antiguo Testamento',
    division: 'Poéticos y Sabiduría',
    chaptersCount: 12,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Salomón (El Predicador / Qohélet)',
    date: 'c. 935 a.C.',
    theme: 'La vanidad de la vida terrenal «debajo del sol» separada del propósito supremo de Dios.',
    summary: 'La búsqueda exhaustiva de satisfacción en el placer, la riqueza y el intelecto, concluyendo con: «Teme a Dios, y guarda sus mandamientos; porque esto es el todo del hombre».'
  },
  {
    id: 'cnt',
    name: 'Cantares',
    shortName: 'Cnt',
    testament: 'Antiguo Testamento',
    division: 'Poéticos y Sabiduría',
    chaptersCount: 8,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Salomón',
    date: 'c. 965 a.C.',
    theme: 'La belleza del amor conyugal santo y figura del amor de Cristo por Su Iglesia.',
    summary: 'Poema lírico apasionado entre la sulamita y su amado esposo, celebrando la santidad de la intimidad matrimonial ordenada por Dios.'
  },

  // Profetas Mayores (5)
  {
    id: 'isa',
    name: 'Isaías',
    shortName: 'Isa',
    testament: 'Antiguo Testamento',
    division: 'Profetas Mayores',
    chaptersCount: 66,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Isaías hijo de Amoz',
    date: 'c. 740–680 a.C.',
    theme: 'La santidad del «Santo de Israel», el juicio a las naciones y el Siervo Sufriente Salvador (Isa 53).',
    summary: 'Llamado el «Príncipe de los Profetas» o el «Quinto Evangelio»: anuncia la encarnación (Isa 7:14; 9:6), la expiación sustitutiva (Isa 53) y los nuevos cielos y tierra (Isa 65–66).'
  },
  {
    id: 'jer',
    name: 'Jeremías',
    shortName: 'Jer',
    testament: 'Antiguo Testamento',
    division: 'Profetas Mayores',
    chaptersCount: 52,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Jeremías (con Baruc)',
    date: 'c. 627–580 a.C.',
    theme: 'El juicio inminente a Judá, el llamado al arrepentimiento y la promesa del Nuevo Pacto (Jer 31).',
    summary: 'El profeta llorón advierte a Jerusalén del asedio babilónico, denuncia la falsa religión y profetiza el pacto eterno grabado en los corazones.'
  },
  {
    id: 'lam',
    name: 'Lamentaciones',
    shortName: 'Lam',
    testament: 'Antiguo Testamento',
    division: 'Profetas Mayores',
    chaptersCount: 5,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Jeremías',
    date: 'c. 586 a.C.',
    theme: 'El duelo desgarrador por la caída de Jerusalén y la inagotable fidelidad y misericordia de Dios.',
    summary: 'Cinco poemas acrósticos fúnebres sobre la ruina del Templo, destacando la cumbre teológica: «Nuevas son cada mañana; grande es tu fidelidad» (Lam 3:23).'
  },
  {
    id: 'eze',
    name: 'Ezequiel',
    shortName: 'Eze',
    testament: 'Antiguo Testamento',
    division: 'Profetas Mayores',
    chaptersCount: 48,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Ezequiel hijo de Buzi',
    date: 'c. 593–571 a.C.',
    theme: 'La gloria de Dios que sale y retorna, la regeneración del corazón de piedra y el Templo futuro.',
    summary: 'Visiones del carro de la gloria de Dios, actos proféticos, la visión del valle de los huesos secos regenerados por el Espíritu (Eze 37) y la ciudad de Jehová-sama.'
  },
  {
    id: 'dan',
    name: 'Daniel',
    shortName: 'Dan',
    testament: 'Antiguo Testamento',
    division: 'Profetas Mayores',
    chaptersCount: 12,
    originalLanguage: 'Hebreo / Arameo',
    author: 'Daniel',
    date: 'c. 605–530 a.C.',
    theme: 'La soberanía absoluta del Altísimo sobre los imperios humanos y el Reino eterno del Hijo del Hombre.',
    summary: 'Fidelidad en Babilonia (el foso de los leones, el horno de fuego) y visiones apocalípticas de las cuatro bestias, las 70 semanas y la resurrección final.'
  },

  // Profetas Menores (12)
  {
    id: 'ose',
    name: 'Oseas',
    shortName: 'Ose',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 14,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Oseas hijo de Beeri',
    date: 'c. 755–715 a.C.',
    theme: 'El amor redentor inquebrantable de Dios frente al adulterio espiritual de Israel.',
    summary: 'El matrimonio profético de Oseas con Gómer como vívida parábola del pacto divino y la restauración escatológica.'
  },
  {
    id: 'joe',
    name: 'Joel',
    shortName: 'Joe',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 3,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Joel hijo de Petuel',
    date: 'c. 835 a.C. / pos-exilio',
    theme: 'El Día de Jehová y el derramamiento universal del Espíritu Santo.',
    summary: 'La plaga de langostas como juicio preliminar, el llamado al ayuno y la profecía de Pentecostés cumplida en Hechos 2.'
  },
  {
    id: 'amo',
    name: 'Amós',
    shortName: 'Amo',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 9,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Amós el pastor de Tecoa',
    date: 'c. 760–750 a.C.',
    theme: 'La justicia social, el juicio a las naciones y la fidelidad al pacto ético de Dios.',
    summary: 'Un boyero enviado a reprender la arrogancia, hipocresía religiosa y opresión a los pobres en el reino del norte.'
  },
  {
    id: 'abd',
    name: 'Abdías',
    shortName: 'Abd',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 1,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Abdías',
    date: 'c. 586 a.C.',
    theme: 'El juicio ineludible a Edom por su orgullo y crueldad contra su hermano Jacob.',
    summary: 'La profecía más corta del AT sobre la destrucción del reino rocoso de Edom y el establecimiento del Reino de Jehová.'
  },
  {
    id: 'jon',
    name: 'Jonás',
    shortName: 'Jon',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 4,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Jonás hijo de Amitai',
    date: 'c. 780–760 a.C.',
    theme: 'La soberana misericordia y gracia misionera de Dios extendida a los gentiles en Nínive.',
    summary: 'La huida a Tarsis, los tres días en el vientre del gran pez (señal de la resurrección de Cristo) y el arrepentimiento masivo de Nínive.'
  },
  {
    id: 'miq',
    name: 'Miqueas',
    shortName: 'Miq',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 7,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Miqueas de Moreset',
    date: 'c. 735–700 a.C.',
    theme: 'Juicio por la injusticia, el nacimiento del Mesías en Belén (Miq 5:2) y el perdón de los pecados.',
    summary: 'Contraste entre los falsos líderes y el Buen Pastor Soberano que perdonará la iniquidad y sepultará los pecados en las profundidades del mar.'
  },
  {
    id: 'nah',
    name: 'Nahúm',
    shortName: 'Nah',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 3,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Nahúm de Elcos',
    date: 'c. 663–612 a.C.',
    theme: 'La justicia retributiva de Dios y la destrucción definitiva del imperio asirio en Nínive.',
    summary: 'Consuelo para Judá proclamando que el Dios celoso y vengador no dejará impune al opresor sangriento.'
  },
  {
    id: 'hab',
    name: 'Habacuc',
    shortName: 'Hab',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 3,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Habacuc',
    date: 'c. 608–598 a.C.',
    theme: 'El dilema de la justicia divina y la cumbre de la Reforma: «Mas el justo por su fe vivirá» (Hab 2:4).',
    summary: 'El profeta dialoga con Dios sobre el avance de los caldeos y concluye con una gloriosa oración de fe inquebrantable en medio de la prueba.'
  },
  {
    id: 'sof',
    name: 'Sofonías',
    shortName: 'Sof',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 3,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Sofonías tataranieto de Ezequías',
    date: 'c. 630 a.C.',
    theme: 'El gran y temible Día de Jehová, la purificación de las naciones y el gozo sobre el remanente.',
    summary: 'Juicio global contra la idolatría y la tierna promesa: «Jehová está en medio de ti... se gozará sobre ti con cánticos».'
  },
  {
    id: 'hageo',
    name: 'Hageo',
    shortName: 'Hag',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 2,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Hageo',
    date: 'c. 520 a.C.',
    theme: 'El llamado urgente a reconstruir la Casa de Dios y la gloria mayor del templo futuro.',
    summary: 'Cuatro mensajes que confrontan las prioridades carnales de los retornados y motivan a Zorobabel a terminar el Templo.'
  },
  {
    id: 'zac',
    name: 'Zacarías',
    shortName: 'Zac',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 14,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Zacarías hijo de Berequías',
    date: 'c. 520–480 a.C.',
    theme: 'Visiones apocalípticas mesiánicas: el Rey humilde sobre el pollino (Zac 9:9) y el traspasado (Zac 12:10).',
    summary: 'Ocho visiones nocturnas, coronación simbólica del sumo sacerdote Josué y profecías de la primera y segunda venida de Cristo.'
  },
  {
    id: 'mal',
    name: 'Malaquías',
    shortName: 'Mal',
    testament: 'Antiguo Testamento',
    division: 'Profetas Menores',
    chaptersCount: 4,
    originalLanguage: 'Hebreo Bíblico',
    author: 'Malaquías',
    date: 'c. 433–400 a.C.',
    theme: 'El amor de Dios, el reclamo a sacerdotes corruptos y el anuncio del Sol de Justicia y el heraldo Elías.',
    summary: 'El último libro del AT que cierra el canon veterotestamentario con una severa disputa contra la apatía y anticipa a Juan el Bautista.'
  },

  // NUEVO TESTAMENTO - Evangelios (4)
  {
    id: 'mat',
    name: 'Mateo',
    shortName: 'Mat',
    testament: 'Nuevo Testamento',
    division: 'Evangelios',
    chaptersCount: 28,
    originalLanguage: 'Griego Koiné',
    author: 'Mateo (Leví el publicano)',
    date: 'c. 55–65 d.C.',
    theme: 'Jesús como el Rey Mesías de Israel, cumplimiento de las profecías del AT y la Gran Comisión.',
    summary: 'Genealogía real davídica, el Sermón del Monte (Mat 5–7), las parábolas del Reino de los Cielos, la muerte expiatoria y el mandato de hacer discípulos a todas las naciones.'
  },
  {
    id: 'mar',
    name: 'Marcos',
    shortName: 'Mar',
    testament: 'Nuevo Testamento',
    division: 'Evangelios',
    chaptersCount: 16,
    originalLanguage: 'Griego Koiné',
    author: 'Juan Marcos (con el apóstol Pedro)',
    date: 'c. 55–62 d.C.',
    theme: 'Jesucristo como el Siervo Sufriente de Dios y el Hijo con autoridad todopoderosa (Mar 10:45).',
    summary: 'Evangelio de ritmo ágil y dinámico, repleto de milagros, exorcismos y centrado intensamente en la Semana de Pasión y la Cruz.'
  },
  {
    id: 'luc',
    name: 'Lucas',
    shortName: 'Luc',
    testament: 'Nuevo Testamento',
    division: 'Evangelios',
    chaptersCount: 24,
    originalLanguage: 'Griego Koiné',
    author: 'Lucas el médico amado',
    date: 'c. 60–62 d.C.',
    theme: 'El Hijo del Hombre perfecto que vino a buscar y a salvar lo que se había perdido (Luc 19:10).',
    summary: 'Investigación histórica rigurosa, relatos de la infancia de Jesús, parábolas de la gracia (hijo pródigo, buen samaritano) y compasión hacia los marginados.'
  },
  {
    id: 'jua',
    name: 'Juan',
    shortName: 'Jua',
    testament: 'Nuevo Testamento',
    division: 'Evangelios',
    chaptersCount: 21,
    originalLanguage: 'Griego Koiné',
    author: 'Juan el apóstol amado',
    date: 'c. 85–90 d.C.',
    theme: 'La plena Deidad de Jesucristo, el Verbo Eterno hecho carne, para que creyendo tengáis vida eterna (Juan 20:31).',
    summary: 'El prólogo teológico del Logos (Juan 1), los 7 grandes milagros/señales, las 7 declaraciones «YO SOY», el discurso del aposento alto y la resurrección.'
  },

  // Histórico del NT (1)
  {
    id: 'hch',
    name: 'Hechos',
    shortName: 'Hch',
    testament: 'Nuevo Testamento',
    division: 'Histórico NT',
    chaptersCount: 28,
    originalLanguage: 'Griego Koiné',
    author: 'Lucas',
    date: 'c. 62–64 d.C.',
    theme: 'El poder soberano del Espíritu Santo expandiendo la Iglesia desde Jerusalén hasta lo último de la tierra.',
    summary: 'Pentecostés, el ministerio de Pedro y Esteban, la conversión de Saulo de Tarso, los tres viajes misioneros de Pablo y el evangelio llegando al corazón del Imperio Romano.'
  },

  // Epístolas Paulinas (14)
  {
    id: 'rom',
    name: 'Romanos',
    shortName: 'Rom',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 16,
    originalLanguage: 'Griego Koiné',
    author: 'El apóstol Pablo',
    date: 'c. 57 d.C.',
    theme: 'La justicia de Dios revelada en el Evangelio: justificación por la sola fe, santificación y soberana elección.',
    summary: 'La obra magna teológica de Pablo: depravación universal, justificación por gracia mediante la expiación en Cristo, la vida en el Espíritu (Rom 8), la soberanía en la elección (Rom 9–11) y la ética de servicio vivo (Rom 12).'
  },
  {
    id: '1co',
    name: '1 Corintios',
    shortName: '1Co',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 16,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 55 d.C.',
    theme: 'El orden, la santidad y la doctrina en la vida de la Iglesia local; la Cruz y la Resurrección corporal.',
    summary: 'Corrección de divisiones, inmoralidad, pleitos, dones espirituales (cap. 12-14), la supremacía del amor (cap. 13) y la defensa de la resurrección física (cap. 15).'
  },
  {
    id: '2co',
    name: '2 Corintios',
    shortName: '2Co',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 13,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 56 d.C.',
    theme: 'La defensa del ministerio apostólico, el poder de Dios perfeccionado en la debilidad humana y la reconciliación.',
    summary: 'El consuelo divino en la aflicción, el ministerio del Nuevo Pacto, los vasos de barro, la ofrenda para los santos y el «aguijón en la carne».'
  },
  {
    id: 'gal',
    name: 'Gálatas',
    shortName: 'Gál',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 6,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 48–49 d.C.',
    theme: 'La carta magna de la libertad cristiana: justificación por fe sola sin las obras de la ley mosaica.',
    summary: 'Anatema contra el falso evangelio judaizante, defensa del apostolado de Pablo, la ley como ayo hacia Cristo y el fruto del Espíritu vs. las obras de la carne.'
  },
  {
    id: 'efe',
    name: 'Efesios',
    shortName: 'Efe',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 6,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 60–62 d.C. (Prisión)',
    theme: 'El misterio eterno de la Iglesia en Cristo: elección eterna por gracia, regeneración y la armadura de Dios.',
    summary: 'Bendiciones espirituales en lugares celestiales (Efe 1), salvación por pura gracia (Efe 2:8-10), la unidad del cuerpo, el matrimonio cristiano y la guerra espiritual.'
  },
  {
    id: 'fil',
    name: 'Filipenses',
    shortName: 'Fil',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 4,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 61 d.C. (Prisión)',
    theme: 'El gozo supremo en Cristo en medio de cualquier circunstancia y el himno de la humillación y exaltación de Jesús.',
    summary: '«Para mí el vivir es Cristo, y el morir es ganancia», el Canto de la Kénosis (Fil 2:5-11), perseverancia hacia la meta y la paz de Dios que sobrepasa todo entendimiento.'
  },
  {
    id: 'col',
    name: 'Colosenses',
    shortName: 'Col',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 4,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 60–62 d.C. (Prisión)',
    theme: 'La absoluta preeminencia y suficiencia total de Cristo como Creador y Cabeza de la Iglesia.',
    summary: 'Refutación de la herejía gnóstica y legalista, proclamando que en Cristo habita corporalmente toda la plenitud de la Deidad (Col 2:9).'
  },
  {
    id: '1ts',
    name: '1 Tesalonicenses',
    shortName: '1Ts',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 5,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 51 d.C.',
    theme: 'La santificación del creyente y la gloriosa esperanza de la Segunda Venida de Cristo.',
    summary: 'El crecimiento de una iglesia modelo bajo persecución, el arrebato de los creyentes en la venida del Señor y la exhortación a velar en sobriedad.'
  },
  {
    id: '2ts',
    name: '2 Tesalonicenses',
    shortName: '2Ts',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 3,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 51–52 d.C.',
    theme: 'Claridad escatológica sobre el Día del Señor, la manifestación del hombre de pecado y el trabajo diligente.',
    summary: 'Consuelo frente a falsas alarmas del regreso de Cristo, revelación sobre la apostasía final y advertencia contra la ociosidad.'
  },
  {
    id: '1ti',
    name: '1 Timoteo',
    shortName: '1Ti',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 6,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 63–65 d.C.',
    theme: 'El orden pastoral, la sana doctrina y los requisitos bíblicos de pastores y diáconos en la Casa de Dios.',
    summary: 'Instrucciones pastorales a Éfeso para refutar falsos maestros, regular la oración y el culto, y establecer líderes piadosos.'
  },
  {
    id: '2ti',
    name: '2 Timoteo',
    shortName: '2Ti',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 4,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 67 d.C. (Mamertina)',
    theme: 'El testamento final del apóstol: fidelidad en el ministerio, la inerrancia e inspiración de las Escrituras.',
    summary: 'La última carta de Pablo antes de ser martirizado: «Predica la palabra», la doctrina de la Teopneustos (2 Tim 3:16-17) y el testimonio victorioso de haber peleado la buena batalla.'
  },
  {
    id: 'tit',
    name: 'Tito',
    shortName: 'Tit',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 3,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 63–65 d.C.',
    theme: 'La correlación inseparable entre la sana doctrina y las buenas obras en la vida de la congregación.',
    summary: 'Establecimiento de ancianos en Creta, exhortación a ancianos, jóvenes y siervos, y la manifestación de la gracia que nos enseña a vivir piadosamente.'
  },
  {
    id: 'flm',
    name: 'Filemón',
    shortName: 'Flm',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    chaptersCount: 1,
    originalLanguage: 'Griego Koiné',
    author: 'Pablo',
    date: 'c. 60–62 d.C.',
    theme: 'El perdón, la reconciliación y la imputación de deudas en Cristo entre un amo y su siervo Onésimo.',
    summary: 'Carta personal y tierna donde Pablo intercede por el esclavo prófugo convertido, asumiendo él mismo su deuda como imagen del evangelio.'
  },
  {
    id: 'heb',
    name: 'Hebreos',
    shortName: 'Heb',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas', // También catalogada epistolar
    chaptersCount: 13,
    originalLanguage: 'Griego Koiné',
    author: 'Desconocido (Trad. Pablo / Lucas / Apolos)',
    date: 'c. 64–68 d.C.',
    theme: 'La supremacía absoluta y final de Jesucristo sobre ángeles, Moisés, el sacerdocio aarónico y el antiguo pacto.',
    summary: 'Tratado teológico monumental que muestra a Cristo como el Sumo Sacerdote Eterno según el orden de Melquisedec, el único sacrificio perfecto y el Gran Salón de la Fe (Heb 11).'
  },

  // Epístolas Generales (7)
  {
    id: 'stg',
    name: 'Santiago',
    shortName: 'Stg',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    chaptersCount: 5,
    originalLanguage: 'Griego Koiné',
    author: 'Santiago (Jacobo), hermano del Señor',
    date: 'c. 45–48 d.C.',
    theme: 'La fe genuina viva demostrada por las obras; la sabiduría práctica cristiana.',
    summary: 'El libro sapiencial del NT: pruebas y tentaciones, dominio de la lengua, advertencia a los ricos opresores y la oración de fe.'
  },
  {
    id: '1pe',
    name: '1 Pedro',
    shortName: '1Pe',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    chaptersCount: 5,
    originalLanguage: 'Griego Koiné',
    author: 'El apóstol Pedro',
    date: 'c. 62–64 d.C.',
    theme: 'La esperanza viva de los elegidos peregrinos en medio del sufrimiento y la persecución.',
    summary: 'La salvación incorruptible, el sacerdocio real de los creyentes, sumisión a las autoridades, el matrimonio y el ejemplo de Cristo en el sufrimiento.'
  },
  {
    id: '2pe',
    name: '2 Pedro',
    shortName: '2Pe',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    chaptersCount: 3,
    originalLanguage: 'Griego Koiné',
    author: 'Pedro',
    date: 'c. 66–67 d.C.',
    theme: 'La advertencia contra los falsos maestros apóstatas y la certeza de la Palabra profética más segura.',
    summary: 'Crecimiento en las virtudes cristianas, la inspiración divina de las Escrituras movidas por el Espíritu Santo y el juicio del fuego final en el Día del Señor.'
  },
  {
    id: '1ju',
    name: '1 Juan',
    shortName: '1Ju',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    chaptersCount: 5,
    originalLanguage: 'Griego Koiné',
    author: 'El apóstol Juan',
    date: 'c. 85–95 d.C.',
    theme: 'La seguridad de la salvación basada en tres pruebas: doctrina ortodoxa, obediencia moral y amor fraternal.',
    summary: 'Comunión con Dios que es Luz y Amor, Cristo nuestro Abogado ante el Padre, victoria sobre el mundo y discernimiento contra el espíritu del anticristo.'
  },
  {
    id: '2ju',
    name: '2 Juan',
    shortName: '2Ju',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    chaptersCount: 1,
    originalLanguage: 'Griego Koiné',
    author: 'Juan',
    date: 'c. 85–95 d.C.',
    theme: 'Caminar en la verdad divina y rehusar la hospitalidad a maestros que niegan la encarnación de Cristo.',
    summary: 'Breve carta a la «señora elegida» enfatizando el equilibrio vital entre el amor cristiano y la fidelidad inquebrantable a la verdad doctrinaria.'
  },
  {
    id: '3ju',
    name: '3 Juan',
    shortName: '3Ju',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    chaptersCount: 1,
    originalLanguage: 'Griego Koiné',
    author: 'Juan',
    date: 'c. 85–95 d.C.',
    theme: 'El apoyo a los obreros de la verdad (Gayo) frente a la arrogancia autoritaria en la iglesia (Diótrefes).',
    summary: 'Elogio a la hospitalidad cristiana y advertencia solemne contra el orgullo que ama tener el primer lugar en la congregación.'
  },
  {
    id: 'jud',
    name: 'Judas',
    shortName: 'Jud',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    chaptersCount: 1,
    originalLanguage: 'Griego Koiné',
    author: 'Judas, siervo de Jesucristo y hermano de Jacobo',
    date: 'c. 65–80 d.C.',
    theme: 'El deber urgente de contender ardientemente por la fe que de una vez para siempre fue dada a los santos.',
    summary: 'Denuncia severa de los hombres impíos infiltrados que convierten en libertinaje la gracia de Dios y la gloriosa doxología final.'
  },

  // Profecía (1)
  {
    id: 'apo',
    name: 'Apocalipsis',
    shortName: 'Apo',
    testament: 'Nuevo Testamento',
    division: 'Profecía (Apocalipsis)',
    chaptersCount: 22,
    originalLanguage: 'Griego Koiné',
    author: 'El apóstol Juan en la isla de Patmos',
    date: 'c. 95 d.C.',
    theme: 'La revelación de Jesucristo triunfante: el Cordero inmolado vence al dragón y reina eternamente como Rey de reyes.',
    summary: 'Cartas a las siete iglesias de Asia, la visión del trono celestial, los sellos, trompetas y copas de la ira divina, la caída de Babilonia, la Segunda Venida, el juicio final y la Nueva Jerusalén descendiendo del cielo.'
  }
];

// Helper to get book by id or name
export function findBibleBook(identifier: string): BibleBookMeta | undefined {
  if (!identifier) return undefined;
  
  const normalize = (str: string) => 
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  
  const clean = normalize(identifier);
  
  // Normalización de alias comunes en español
  let mapped = clean;
  if (clean === 'salmo') mapped = 'salmos';
  if (clean === 'cantar') mapped = 'cantares';
  if (clean === 'revelacion') mapped = 'apocalipsis';
  if (clean === 'hechos de los apostoles') mapped = 'hechos';

  return BIBLE_BOOKS_CANON.find(b => 
    normalize(b.id) === mapped || 
    normalize(b.name) === mapped || 
    normalize(b.shortName) === mapped
  );
}

import { Course } from '../../types';

export const consejeriaBiblicaSuperior: Course = {
  id: 'lic-consejeria-biblica',
  title: 'Licenciatura: Consejería Bíblica y Cuidado Pastoral',
  type: 'LICENCIATURA',
  durationMonths: 6,
  description: 'Un estudio intensivo sobre la suficiencia de las Escrituras para aconsejar, abordando problemas del alma, crisis matrimoniales, salud mental desde una perspectiva teológica y la aplicación de la gracia restauradora.',
  lessons: [
    {
      id: 'lic-cbs-day1',
      day: 1,
      title: 'La Suficiencia de las Escrituras en la Consejería',
      blocks: [
        {
          type: 'text',
          id: 'lic-cbs-d1-b1',
          content: 'La pilar de la Consejería Bíblica, a diferencia de la psicoterapia secular, es la creencia en la **Suficiencia de las Escrituras** (2 Timoteo 3:16-17). La Biblia provee el marco interpretativo perfecto para entender la condición humana (el problema del pecado) y la solución única (la gracia redentora en Cristo). El consejero cristiano no se apoya en sabidurías humanas, sino que administra la Palabra para diagnosticar los ídolos del corazón y guiar al arrepentimiento.'
        }
      ],
      finalExam: [
        {
          id: 'f-cbs-1',
          question: '¿Qué principio fundamental distingue a la consejería bíblica de la psicología secular?',
          options: [
            'El uso prioritario de métodos freudianos.',
            'La creencia en la suficiencia de las Sagradas Escrituras para conocer y restaurar el alma humana.',
            'La ausencia total de empatía humana.',
            'El rechazo al sufrimiento y las lágrimas.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La consejería bíblica confía en que la Palabra de Dios contiene al Espíritu que transforma de raíz al ser humano.'
        }
      ],
      baseVerse: {
        reference: '2 Timoteo 3:16-17',
        text: 'Toda la Escritura es inspirada por Dios y útil para enseñar, para redargüir, para corregir, para instruir en justicia.'
      }
    },
    {
      id: 'lic-cbs-day2',
      day: 2,
      title: 'Dinámicas del Corazón y los Ídolos del Alma',
      blocks: [
        {
          type: 'text',
          id: 'lic-cbs-d2-b1',
          content: 'Bíblicamente, el asiento de las emociones, pensamientos y decisiones humanas es el **corazón** (Proverbios 4:23). El problema central en todo conflicto, como el miedo, el divorcio y la depresión espiritual, surge de adorar cosas creadas en lugar del Creador (ídolos del corazón). El consejero ayuda a exponer estos ídolos para sustituirlos con una adoración suprema a Cristo Jesús.'
        }
      ],
      finalExam: [
        {
          id: 'f-cbs-2',
          question: '¿Cuál es la raíz de los conflictos conductuales graves desde la visión bíblica?',
          options: [
            'Genética defectuosa exclusivamente.',
            'Condicionamiento ambiental aleatorio.',
            'Ídolos del corazón que usurpan el lugar de autoridad y afecto supremo que le corresponde a Dios.',
            'Falta de recursos económicos temporales.'
          ],
          correctAnswerIndex: 2,
          explanation: 'Todo comportamiento pecaminoso nace de un corazón que adora algo aparte del Señor (éxito, comodidad, aprobación).'
        }
      ],
      baseVerse: {
        reference: 'Proverbios 4:23',
        text: 'Sobre toda cosa guardada, guarda tu corazón; Porque de él mana la vida.'
      }
    },
    {
      id: 'lic-cbs-day3',
      day: 3,
      title: 'Asesoramiento Matrimonial y Resolución de Conflictos',
      blocks: [
        {
          type: 'text',
          id: 'lic-cbs-d3-b1',
          content: 'El matrimonio cristiano es un testimonio terrenal de la unión mística de Cristo y la Iglesia (Efesios 5). La consejería conyugal asume que el egocentrismo humano es el destructor de la paz. A través de la gracia cruzada, los cónyuges aprenden a la confesión de pecados, el otorgamiento de perdón ilimitado, y el abandono de exigencias de derechos, abrazando la sumisión servicial mutua.'
        }
      ],
      finalExam: [
        {
          id: 'f-cbs-3',
          question: 'En lugar de buscar la incompatibilidad temporal, ¿qué modela el matrimonio cristiano?',
          options: [
            'El misterio del pacto perfecto entre Cristo y Su amada Iglesia.',
            'Una sociedad civil de conveniencia económica.',
            'Un arreglo terapéutico para estar siempre felices.',
            'El aislamiento absoluto del mundo impío.'
          ],
          correctAnswerIndex: 0,
          explanation: 'El matrimonio fue instituido para reflejar el carácter amoroso, perdonador y abnegado del evangelio de Jesucristo.'
        }
      ],
      baseVerse: {
        reference: 'Efesios 5:25',
        text: 'Maridos, amad a vuestras mujeres, así como Cristo amó a la iglesia, y se entregó a sí mismo por ella.'
      }
    },
    {
      id: 'lic-cbs-day4',
      day: 4,
      title: 'El Consejero Bíblico: Gracia y Compasión Práctica',
      blocks: [
        {
          type: 'text',
          id: 'lic-cbs-d4-b1',
          content: 'El consejero cristiano no es un juez frío y clínico, sino un **pastor tierno**, lleno de empatía compasiva (Hechos 20:31). Imitando a Jesucristo, encarna la gracia y la verdad de forma simultánea. Sabe llevar las cargas espirituales y proveer instrucción profunda pero saturada de misericordia, sin avergonzar a las almas rotas sino elevándolas mediante el consuelo de Dios.'
        }
      ],
      finalExam: [
        {
          id: 'f-cbs-4',
          question: '¿Qué actitud debe caracterizar esencialmente al consejero que aplica las Escrituras?',
          options: [
            'Fria indiferencia clínica para ser objetivo.',
            'Actitud de regaño y juicio condenatorio implacable.',
            'Empatía misericordiosa, encarnando tanto el consuelo como la verdad de la Palabra en humildad.',
            'Superficialidad evitando los temas donde hay conflicto.'
          ],
          correctAnswerIndex: 2,
          explanation: 'Un verdadero ministro del evangelio derrama amor y sana misericordia por medio del bálsamo de las Escrituras.'
        }
      ],
      baseVerse: {
        reference: 'Gálatas 6:2',
        text: 'Sobrellevad los unos las cargas de los otros, y cumplid así la ley de Cristo.'
      }
    }
  ]
};

export const misionologiaTranscultural: Course = {
  id: 'lic-misionologia',
  title: 'Licenciatura: Misionología y Plantación de Iglesias Globales',
  type: 'LICENCIATURA',
  durationMonths: 6,
  description: 'Un abordaje académico totalizante sobre la Gran Comisión, historia de los grandes avivamientos, antropología de la adaptación cultural, estrategias de evangelismo sistemático, y modelos eclesiásticos viables de plantación.',
  lessons: [
    {
      id: 'lic-mis-day1',
      day: 1,
      title: 'Fundamentos Teológicos de la Missio Dei',
      blocks: [
        {
          type: 'text',
          id: 'lic-mis-d1-b1',
          content: 'El término **Missio Dei** (La Misión de Dios) subraya que es el Creador mismo quien está reconciliando activamente la creación consigo. La Iglesia no inventa de manera altruista la obra misionera, sino que Dios, al salvar incondicionalmente, convoca y comisiona al creyente para integrarse a Su grandiosa estrategia global redentora (Mateo 28). Somos sus medios escogidos e instruidos para proclamar la preeminencia y salvación de su Reino.'
        }
      ],
      finalExam: [
        {
          id: 'f-mis-1',
          question: '¿Qué es el concepto teológico de la Missio Dei?',
          options: [
            'Un evento caritativo trimestral en iglesias locales.',
            'El principio que afirma que las misiones son un atributo y propósito del corazón y voluntad de Dios mismo por salvar el mundo, para lo cual la Iglesia sirve de instrumento.',
            'Una sociedad civil de los cruzados medievales modernos.',
            'El método de recolectar cuotas obligatorias en las naciones ricas.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La misión no es un pequeño departamento eclesiástico, es el pálpito medular de Dios Padre extendiéndose triunfalmente al mundo.'
        }
      ],
      baseVerse: {
        reference: 'Mateo 28:19',
        text: 'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.'
      }
    },
    {
      id: 'lic-mis-day2',
      day: 2,
      title: 'Antropología Práctica y Contextualización Cultural',
      blocks: [
        {
          type: 'text',
          id: 'lic-mis-d2-b1',
          content: 'Al llevar el Evangelio a un entorno pagano o transcultural, el misionero debe cuidarse del **sincretismo** (mezclar verdades santas con ideologías falsas) y al mismo tiempo buscar una excelente **contextualización** (comunicar el mensaje inmutable usando métodos y el idioma propio del oyente). El apóstol Pablo encarnó esta labor (1 Cor. 9) comprendiendo las cosmovisiones del lugar para que la piedra de tropiezo fuera el Evangelio y no formas occidentalizadas irrelevantes.'
        }
      ],
      finalExam: [
        {
          id: 'f-mis-2',
          question: '¿Cuál es el equilibrio perfecto que el misionero debe tener en la transmisión del Evangelio?',
          options: [
            'Hacerse indígena eliminando todas las creencias cristianas iniciales.',
            'Contextualizar radicalmente sacrificando doctrinas bíblicas que ofendan.',
            'Contextualizar culturalmente los medios y la comunicación, mientras se protege íntegra y ortodoxa la verdad dogmática eterna (sincretismo cero).',
            'Imponer exclusivamente ropa occidental o idioma inglés en adoración.'
          ],
          correctAnswerIndex: 2,
          explanation: 'El mensaje evangélico no cambia en sustancia, pero se explica traduciendo la piedad cristiana al entorno conceptual del pueblo sin corromperlo.'
        }
      ],
      baseVerse: {
        reference: '1 Corintios 9:22',
        text: 'Me he hecho débil a los débiles, para ganar a los débiles; a todos me he hecho de todo, para que de todos modos salve a algunos.'
      }
    },
    {
      id: 'lic-mis-day3',
      day: 3,
      title: 'Estrategias de Plantación Eclesiástica Orada',
      blocks: [
        {
          type: 'text',
          id: 'lic-mis-d3-b1',
          content: 'El objetivo evangélico supremo en las misiones globales no es simplemente hacer conversos individuales, sino **plantar iglesias viables y sanas** teológicamente en cada contexto poblacional. Una iglesia debe apuntar a tres metas: Ser autogobernada (tener ancianos/pastores nativos y no depender crónicamente del extranjero), autosustentable económicamente, y autónomamente reprodutora (evangelizar y lanzar ella sola nuevas misiones en su región).'
        }
      ],
      finalExam: [
        {
          id: 'f-mis-3',
          question: '¿Cuáles son las metas institucionales de la plantación de iglesias sanas?',
          options: [
            'Lograr autonomía eclesiástica e independencia financiera local para no ser esclava de subsidios, logrando reproducción sana.',
            'Tener siempre un pastor extranjero de por vida rigiendo su economía en secreto.',
            'Llegar a tener el templo enorme construido en un mes.',
            'Adoptar leyes que desmantelen el Estado laico violentamente.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Las verdaderas misiones son temporales; su éxito está en levantar a hombres espirituales de la propia cultura capacitados para el liderzago.'
        }
      ],
      baseVerse: {
        reference: 'Tito 1:5',
        text: 'Por esta causa te dejé en Creta, para que corrigieses lo deficiente, y establecieses ancianos en cada ciudad, así como yo te mandé.'
      }
    },
    {
      id: 'lic-mis-day4',
      day: 4,
      title: 'Historia de los Mártires y Despertares Misioneros',
      blocks: [
        {
          type: 'text',
          id: 'lic-mis-d4-b1',
          content: 'El avance global del Evangelio nunca fue un sendero romántico y fácil. Hombres como William Carey (india), Adoniram Judson (Birmania), y Hudson Taylor (China) sembraron la semilla sagrada a menudo entre agonías indecibles y martirio local. Sin la convicción de la Soberanía de Dios sobre cada latido, corazón y etnia, las misiones foráneas desvanecerían (Juan 12:24). Es el sufrimiento cristiano el que produce la mayor cosecha mundial.'
        }
      ],
      finalExam: [
        {
          id: 'f-mis-4',
          question: 'Según el desarrollo histórico de las misiones globales (Carey, Judson, Taylor), ¿qué elemento suele preceder a una gran cosecha evangélica?',
          options: [
            'Reyes terrenales financiándolo con ejércitos de infantería.',
            'Fórmulas exóticas mediáticas llenas de prosperidad material.',
            'Rico sufrimiento santificado, dolor sacrificial e incluso la sangre de valientes mártires redimidos que sembraron la Palabra con dolor.',
            'Apoyo constante de la Organización de Naciones Unidas.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La historia demuestra que "la sangre de los mártires es la semilla de la Iglesia" (Tertuliano), glorificando la obra sacrificial del evangelio puro.'
        }
      ],
      baseVerse: {
        reference: 'Juan 12:24',
        text: 'De cierto, de cierto os digo, que si el grano de trigo no cae en la tierra y muere, queda solo; pero si muere, lleva mucho fruto.'
      }
    }
  ]
};

export const educacionCristianaSuperior: Course = {
  id: 'lic-educacion-cristiana',
  title: 'Licenciatura: Educación Cristiana y Pedagogía Bíblica',
  type: 'LICENCIATURA',
  durationMonths: 6,
  description: 'Un robusto desarrollo formativo sobre hermenéutica y metodología pedagógica exegética en el marco de la adoración, para forjar maestros, pastores formativos, currículos constructivos para escuelas dominicales y programas confesionales juveniles.',
  lessons: [
    {
      id: 'lic-ecs-day1',
      day: 1,
      title: 'Filosofía Educativa Consagrada',
      blocks: [
        {
          type: 'text',
          id: 'lic-ecs-d1-b1',
          content: 'La educación cristiana no es meramente transferir datos cronológicos del Antiguo Testamento a la mente, sino inculcar una **cosmovisión transformada e integral**. A diferencia del pragmatismo griego secular, la pedagogía cristiana concibe al ser humano como imagen inalienable de Dios y persigue el amor por la Verdad Absoluta, capacitando la transformación del corazón de forma moral, espiritual, relacional y académica.'
        }
      ],
      finalExam: [
        {
          id: 'f-ecs-1',
          question: '¿Cuál es la meta integral suprema de la verdadera educación cristiana orientada por las Escrituras?',
          options: [
            'Proveer un simple compendio intelectual de tradiciones judías irrelevantes al siglo moderno.',
            'Entrenar la cognición para pasar exámenes de historia eclesial exclusivamente.',
            'Formar e inculcar una cosmovisión cristocéntrica profunda que abarque y redima el intelecto, el corazón y la vida práctica.',
            'Entretener sanamente y vigilar a los niños y jóvenes durante el culto pascual.'
          ],
          correctAnswerIndex: 2,
          explanation: 'Toda educación bíblica apunta a transformar radicalmente cómo el estudiante interpreta, procesa y valora el cosmos entero rindiendo su vida al Creador.'
        }
      ],
      baseVerse: {
        reference: 'Proverbios 1:7',
        text: 'El principio de la sabiduría es el temor de Jehová; Los insensatos desprecian la sabiduría y la enseñanza.'
      }
    },
    {
      id: 'lic-ecs-day2',
      day: 2,
      title: 'El Papel Primordial del Hogar en el Aprendizaje Teológico',
      blocks: [
        {
          type: 'text',
          id: 'lic-ecs-d2-b1',
          content: 'El diseño bíblico primario para el desarrollo del conocimiento doctrinal no reposa en la institución, sino en la **familia** (Deuteronomio 6). Los padres y cabezas del hogar son los principales pedagogos de la fe evangélica. La iglesia (incluyendo el ministerio juvenil o escuela dominical) no debe suplantar la catequesis familiar paterna, sino suplementarla, entrenando y estimulando a los progenitores para gobernar espiritualmente su hogar con devoción.'
        }
      ],
      finalExam: [
        {
          id: 'f-ecs-2',
          question: 'Bíblicamente estipulado en Deuteronomio 6, ¿a quién recae la responsabilidad más alta de instrucción discipular?',
          options: [
            'A un seminario bíblico estatal centralizado fuera del hogar.',
            'A la escuela secular apoyada por las instituciones cívicas paganas.',
            'A los padres y cabezas terrenales de la estructura central de la familia cristiana de pacto.',
            'Los ancianos ordenados son los únicos capacitados de reprender la mala doctrina de los niños.'
          ],
          correctAnswerIndex: 2,
          explanation: 'Deuteronomio 6 y Efesios 6 mandan a los padres criar, moldear, disciplinar e instruir incesantemente la Palabra a los hijos en el Señor.'
        }
      ],
      baseVerse: {
        reference: 'Deuteronomio 6:6-7',
        text: 'Y estas palabras que yo te mando hoy, estarán sobre tu corazón; y las repetirás a tus hijos, y hablarás de ellas estando en tu casa, y andando por el camino, y al acostarte, y cuando te levantes.'
      }
    },
    {
      id: 'lic-ecs-day3',
      day: 3,
      title: 'Desarrollo Curricular Analítico',
      blocks: [
        {
          type: 'text',
          id: 'lic-ecs-d3-b1',
          content: 'Crear currículos de estudio requiere una hermenéutica impecable (exégesis bíblica en lugar de exégesis pragmática) y rigor histórico (confesiones). Un maestro de sana doctrina se rehúsa categóricamente a hacer uso de versículos descontextualizados como mero adorno poético, edificando lecciones que exponen textualmente Cristo, el Calvario y la redención por Gracia pura como la médula de toda la historia bíblica, ya sea con niños pequeños o ancianos sabios.'
        }
      ],
      finalExam: [
        {
          id: 'f-ecs-3',
          question: '¿Qué rasgo hermenéutico debe salvaguardar rigurosamente un educador reformado en la Escuela Dominical?',
          options: [
            'Evitar contextualizar teológicamente la doctrina y hacer historias místicas aisladas puramente moralistas (Ej. "Sé fuerte como David").',
            'No exponer los juicios inminentes divinos del Antiguo Testamento para proteger mentes sensibles.',
            'Una exégesis íntegra y hermenéutica honesta donde todo texto bíblico es comprendido a la sombra exultante de la persona redentora del Cristo Salvador.',
            'Modificar pasajes poéticos ignorando sus desvíos e injusticias.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La historia bíblica no es una simple antología o colección de fábulas de moral, sino un poderoso drama unificado que dirige al Mesías.'
        }
      ],
      baseVerse: {
        reference: 'Lucas 24:27',
        text: 'Y comenzando desde Moisés, y siguiendo por todos los profetas, les declaraba en todas las Escrituras lo que de él decían.'
      }
    },
    {
      id: 'lic-ecs-day4',
      day: 4,
      title: 'Espiritualidad del Mentor Expositivo',
      blocks: [
        {
          type: 'text',
          id: 'lic-ecs-d4-b1',
          content: 'No basta con el brillante rigor académico. El **maestro genuino** transmite aquello que encarna (1 Timoteo 4). Si el corazón magisterial resuena con reverencia soberana y asombro por la misericordia, los pupilos adquieren ese asombro por el amor del Altísimo. La integridad dogmática debe entrelazarse de forma inviolable con el desarrollo del amor por la piedad devota, manifestándose vivamente ante la grey del aula formativa y el rebaño.'
        }
      ],
      finalExam: [
        {
          id: 'f-ecs-4',
          question: '¿Qué advertencia lanza el Apóstol Pablo a los educadores y maestros espirituales en 1 Timoteo?',
          options: [
            'Deben abstenerse rotundamente al estudio lingüístico antiguo puesto y solo predicar pasión vacía.',
            'Deben descuidar celosamente la familia en pos de estudiar textos históricos todo el día y noche en claustros.',
            'Tener extremo cuidado incesante tanto de su vida consagrada moral íntegra como de su pura y estricta ortodoxia del texto divino.',
            'Deben enfocarse solo en hacer maravillas emocionales y musicales grandiosas y desechar exégesis profundas.'
          ],
          correctAnswerIndex: 2,
          explanation: '"Ten cuidado de ti mismo y de la doctrina" — la ortodoxia rigurosa (creencias puras) convive indivisiblemente en unidad con la ortopraxis amorosa (práctica devota).'
        }
      ],
      baseVerse: {
        reference: '1 Timoteo 4:16',
        text: 'Ten cuidado de ti mismo y de la doctrina; persiste en ello, pues haciendo esto, te salvarás a ti mismo y a los que te oyeren.'
      }
    }
  ]
};

export const licenciaturasExtra = [
  consejeriaBiblicaSuperior,
  misionologiaTranscultural,
  educacionCristianaSuperior
];

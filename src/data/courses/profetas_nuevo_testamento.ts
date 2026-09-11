import { Course } from '../../types';

export const profetasCourse: Course = {
  id: 'profetas',
  title: 'Los Profetas: Voz de Aliento y Juicio',
  type: 'BIBLE_STUDY',
  description: 'Un estudio de los profetas mayores y menores, su llamado al arrepentimiento y sus visiones gloriosas del Reino de Dios y del Mesías.',
  lessons: [
    {
      id: 'pro-day1',
      day: 1,
      title: 'Isaías: El Evangelio en el Antiguo Testamento',
      blocks: [
        {
          type: 'note',
          id: 'pro-d1-reading',
          content: '**Visión de Santidad (50 mins):**\nLea **Isaías 1**, **Isaías 6**, **Isaías 52:13-53:12** y **Mateo 8:14-17**. \n\n**Tarea de Análisis:**\n1. En el capítulo 6, ¿cuál es la reacción de Isaías ante la santidad de Dios?\n2. Compare Isaías 53 con el relato de la pasión de Cristo en los Evangelios.\n3. Note el contraste entre el juicio de los primeros capítulos y el consuelo de los últimos.'
        },
        {
          type: 'text',
          id: 'pro-d1-b1',
          content: `El libro de **Isaías** es conocido como la "Biblia en miniatura". Tiene 66 capítulos, al igual que la Biblia tiene 66 libros. Los primeros 39 capítulos (como el AT) enfatizan el juicio de Dios sobre el pecado, y los últimos 27 capítulos (como el NT) enfatizan el consuelo y la redención por medio del Mesías.\n\nIsaías 6 es el pivote de su ministerio. Su encuentro con el "Santo de Israel" le enseña que antes de ser un mensajero, debe ser un pecador perdonado. Solo cuando el carbón del altar purifica sus labios, él puede responder: "Heme aquí, envíame a mí". Esto establece el patrón de todo ministerio bíblico: la visión de Dios precede a la misión para Dios.`
        },
        {
          type: 'text',
          id: 'pro-d1-b2-servant',
          content: `El corazón de Isaías es la revelación del **Siervo Sufriente**. En el capítulo 53, Isaías describe con una precisión sobrenatural la expiación sustitutiva. "Él herido fue por nuestras rebeliones... el castigo de nuestra paz fue sobre él". Es el pasaje más citado del AT en el NT. Isaías nos muestra que Dios no es indiferente a nuestra maldad, sino que Él mismo pagaría la fianza de Su pueblo. Estudiar a Isaías es ver a Cristo a través de los lentes de la profecía judía antigua.`
        },
        {
          type: 'note',
          id: 'pro-d1-reflection',
          content: `**El Santo de Israel (20 min):**\nIsaías llama a Dios "El Santo de Israel" más de 25 veces. En una cultura que ha perdido el sentido de lo sagrado, ¿cómo podemos recuperar ese temor reverente a Dios?\n\n**Pregunta:** ¿De qué manera la visión de la santidad de Dios te motiva más a la obediencia que el miedo al castigo?`
        }
      ],
      finalExam: [
        {
          id: 'f-pro-1-1',
          question: '¿Por qué se llama a Isaías el "Profeta Evangélico"?',
          options: ['Porque escribía en el Nuevo Testamento.', 'Debido a la asombrosa claridad con la que profetizó sobre la persona y obra de Cristo.', 'Porque era un evangelista itinerante.', 'Porque sus mensajes eran cortos y sencillos.'],
          correctAnswerIndex: 1,
          explanation: 'Isaías describe el nacimiento, vida, muerte y resurrección de Jesús cientos de años antes de que ocurrieran.'
        }
      ],
      baseVerse: { 
        reference: 'Isaías 6:3', 
        text: 'Y el uno al otro daba voces, diciendo: Santo, santo, santo, Jehová de los ejércitos; toda la tierra está llena de su gloria.' 
      },
      commentaries: [
        { author: 'Lutero', text: 'Isaías es el más grande de los profetas; parece un evangelista más que un profeta.' }
      ],
      assignments: [
        { id: 't-pr1', description: 'Realice un cuadro comparativo entre Isaías 53 y los sufrimientos de Cristo descritos en Marcos 15.' }
      ]
    }
  ]
};

export const evangeliosCourse: Course = {
  id: 'evangelios',
  title: 'El Nuevo Testamento: Cristo, el cumplimiento de todo',
  type: 'BIBLE_STUDY',
  description: 'Un estudio de la vida, muerte y resurrección de Jesús a través de los cuatro Evangelios, y la expansión del Reino en el libro de Hechos.',
  lessons: [
    {
      id: 'eva-day1',
      day: 1,
      title: 'Los Cuatro Evangelios: Un Solo Salvador',
      blocks: [
        {
          type: 'note',
          id: 'eva-d1-reading',
          content: '**Inmersión en el Verbo (55 mins):**\nLea **Mateo 1**, **Marcos 1**, **Lucas 1** y **Juan 1**. \n\n**Observación de Retratos:**\n1. Note cómo Mateo enfatiza a Jesús como Rey y cumplimiento de las profecías del AT.\n2. Note la rapidez y acción en Marcos (Jesús como Siervo).\n3. Observe el detalle histórico y la humanidad de Jesús en Lucas.\n4. Analice la profundidad teológica y la deidad de Jesús en Juan.'
        },
        {
          type: 'text',
          id: 'eva-d1-b1',
          content: `Los cuatro Evangelios no son biografías exhaustivas, sino retratos teológicos inspirados. Se dividen en los **Sinópticos** (Mateo, Marcos, Lucas) y el de **Juan**. Los sinópticos ("ver juntos") comparten una estructura similar, enfocándose mucho en el ministerio en Galilea. Juan, escrito más tarde, se enfoca más en el ministerio en Judea y en los largos discursos y señales que prueban que Jesús es el Hijo de Dios.\n\nEs fundamental entender que cada autor escribió a una audiencia distinta:\n- **Mateo:** A los judíos (presenta al Mesías).\n- **Marcos:** A los romanos (presenta al Siervo paciente y poderoso).\n- **Lucas:** A los gentiles/griegos (presenta al Hombre perfecto y Salvador universal).\n- **Juan:** A todos los creyentes (presenta al Verbo eterno Dios). \nJuntos, nos dan una visión tridimensional y completa de Aquel que cambió la historia.`
        },
        {
          type: 'text',
          id: 'eva-d1-b2-kingdom',
          content: `El tema central de los Evangelios es el **Reino de Dios**. Jesús anuncia que el Reino ya está aquí (en Su Persona) pero todavía no se ha consumado plenamente. Las señales (milagros) no eran solo para sanar gente, sino para demostrar que el Rey había llegado para restaurar la creación. \n\nEl clímax de los cuatro es la **Semana de la Pasión**. Casi un tercio de los evangelios se dedica a los últimos siete días de la vida de Jesús, subrayando que su muerte y resurrección son el evento más importante de Su misión terrenal.`
        },
        {
          type: 'note',
          id: 'eva-d1-reflection',
          content: `**Siguiendo al Maestro (20 min):**\nJesús dijo: "Sígueme". Esto no es una invitación a admirarlo, sino a rendirse a Él. \n\n**Pregunta:** Si hoy tuvieras que escribir un quinto evangelio basado en lo que Jesús ha hecho en TU vida, ¿cómo empezaría el primer capítulo?`
        }
      ],
      finalExam: [
        {
          id: 'f-eva-1-1',
          question: '¿Qué significa el término "Evangelio"?',
          options: ['Un conjunto de leyes morales.', 'Buenas Noticias de salvación en Cristo.', 'Un libro de historia antigua.', 'Un manual de rituales eclesiales.'],
          correctAnswerIndex: 1,
          explanation: 'Proviene del griego *Euangelion*, que significa el anuncio de una gran noticia de victoria.'
        }
      ],
      baseVerse: { 
        reference: 'Marcos 1:15', 
        text: 'El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio.' 
      },
      commentaries: [
        { author: 'J.C. Ryle', text: 'Los Evangelios son los cimientos sobre los cuales descansa toda nuestra fe cristiana.' }
      ],
      assignments: [
        { id: 't-e1', description: 'Investigue y explique las siete declaraciones "Yo Soy" en el Evangelio de Juan.' }
      ]
    }
  ]
};

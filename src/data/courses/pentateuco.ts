import { Course } from '../../types';

export const pentateucoCourse: Course = {
  id: 'pentateuco',
  title: 'El Pentateuco: Orígenes, Ley y Promesa de Pacto',
  type: 'BIBLE_STUDY',
  description: 'Un estudio profundo de los cinco libros de Moisés, analizando la creación, la caída, los patriarcas y la formación de Israel como nación de pacto.',
  lessons: [
    {
      id: 'pen-day1',
      day: 1,
      title: 'Génesis: Los Fundamentos de la Realidad',
      blocks: [
        {
          type: 'note',
          id: 'pen-d1-reading',
          content: '**Lectura de Orígenes (50 mins):**\nLea **Génesis 1-3**, **Génesis 12**, **Génesis 15** y **Génesis 22**. \n\n**Observación Teológica:**\n1. Note el orden y la bondad de la creación.\n2. Analice la anatomía de la caída en el capítulo 3: el engaño, la desobediencia y la vergüenza.\n3. Busque la primera promesa del Redentor (el *Protoevangelio*) en Génesis 3:15.'
        },
        {
          type: 'text',
          id: 'pen-d1-b1',
          content: `El libro de **Génesis** (del griego "origen") es el cimiento de toda la Biblia. Sin él, no entenderíamos quién es Dios, qué es el hombre ni por qué necesitamos un Salvador. Comienza con la **Creación *ex nihilo*** (de la nada), revelando a un Dios que habla y la realidad llega a existir. El hombre es creado a **Imagen de Dios** (*Imago Dei*), lo cual le otorga una dignidad y propósito únicos en la creación.\n\nSin embargo, el capítulo 3 introduce la **Caída**. El pecado no fue solo "comer una fruta", fue un acto de rebelión cósmica e idolatría, donde el hombre quiso ser como Dios. Esto trajo la muerte física y espiritual, y la corrupción de toda la naturaleza. Inmediatamente, Dios revela Su plan de rescate: la simiente de la mujer herirá en la cabeza a la serpiente. Toda la Biblia es la historia del cumplimiento de esa promesa.`
        },
        {
          type: 'text',
          id: 'pen-d1-b2-covenant',
          content: `La segunda parte de Génesis se enfoca en los **Patriarcas**. El **Pacto Abrahámico** (Génesis 12, 15, 17) es el eje de la historia de la salvación. Dios promete a Abraham una tierra, una descendencia y que en él serían benditas todas las naciones. Este pacto es incondicional y se fundamenta solo en la fidelidad de Dios. \n\nLa justicia se le contó a Abraham por la fe (Génesis 15:6), estableciendo el patrón para la justificación en el Nuevo Testamento. El sacrificio de Isaac en Génesis 22 es un cuadro profético impresionante del Padre ofreciendo al Hijo en el madero, proveyendo Dios mismo el cordero para el sacrificio.`
        },
        {
          type: 'note',
          id: 'pen-d1-reflection',
          content: `**El Dios de las Promesas (20 min):**\nAbraham tuvo que esperar décadas para ver la promesa cumplida. José pasó años en prisión antes de ser exaltado. Génesis nos enseña que Dios es soberano sobre el tiempo y las circunstancias difíciles. \n\n**Pregunta:** ¿Cuál es la "promesa" o verdad de Dios en la que te cuesta descansar hoy?`
        }
      ],
      finalExam: [
        {
          id: 'f-pen-1-1',
          question: '¿Qué es el Protoevangelio?',
          options: ['El primer evangelio escrito por Mateo.', 'La primera promesa de un Redentor en Génesis 3:15.', 'El relato de la creación.', 'La ley dada en el Sinaí.'],
          correctAnswerIndex: 1,
          explanation: 'Es la primera mención de que la descendencia de la mujer vencería al pecado y a la muerte.'
        }
      ],
      baseVerse: { 
        reference: 'Génesis 1:1', 
        text: 'En el principio creó Dios los cielos y la tierra.' 
      },
      commentaries: [
        { author: 'Matthew Henry', text: 'Génesis es el libro de los comienzos; si fallamos en entender el comienzo, fallaremos en entender el final.' }
      ],
      assignments: [
        { id: 't-p1', description: 'Realice un mapa genealógico desde Adán hasta los doce hijos de Jacob.' }
      ]
    },
    {
      id: 'pen-day2',
      day: 2,
      title: 'Éxodo y Levítico: Redención y Santidad',
      blocks: [
        {
          type: 'note',
          id: 'pen-d2-reading',
          content: '**Lectura de la Redención (50 mins):**\nLea **Éxodo 1-3**, **Éxodo 12-14**, **Levítico 16** y **Hebreos 9**. \n\n**Análisis del Tabernáculo:**\n1. Identifique el significado de la Pascua (Éxodo 12).\n2. Note cómo Dios se revela como "YO SOY" (Éxodo 3).\n3. Analice el propósito del Día de la Expiación (Levítico 16).'
        },
        {
          type: 'text',
          id: 'pen-d2-b1',
          content: `El libro de **Éxodo** es el evento redentor central del Antiguo Testamento. Muestra a Dios como el **Libertador** que recuerda Su pacto. Las diez plagas no fueron solo milagros, fueron juicios contra los ídolos de Egipto. La **Pascua** es el tipo más claro de Cristo en el Pentateuco: el cordero sustituto cuya sangre protege del juicio de Dios.\n\nEn el Sinaí, Dios da la **Ley (Torá)**. Es crucial entender que la redención (salida de Egipto) ocurrió ANTES de la Ley. El pueblo no obedeció para ser salvo; obedeció porque YA había sido salvo. La Ley revela el carácter santo de Dios y nuestra incapacidad para cumplirla, llevándonos a depender de la gracia.`
        },
        {
          type: 'text',
          id: 'pen-d2-b2-holiness',
          content: `**Levítico** a menudo es ignorado, pero es vital. Su tema es: "Sed santos, porque yo soy santo". Establece el sistema de sacrificios que permite que un Dios santo habite en medio de un pueblo pecador. El **Tabernáculo** es una representación terrenal de la presencia de Dios, donde el acceso está restringido por el pecado, pero abierto mediante el sacrificio de sangre.\n\nEl sistema levítico apunta constantemente a Jesús, nuestro Gran Sumo Sacerdote y Sacrificio Perfecto. Las leyes de pureza nos enseñan que el pecado contamina todas las áreas de la vida y que necesitamos una limpieza que solo Dios puede proveer.`
        },
        {
          type: 'note',
          id: 'pen-d2-substitution',
          content: `**El Cordero de Dios (20 min):**\nEn el Día de la Expiación (*Yom Kippur*), un macho cabrío era sacrificado y otro enviado al desierto (el "chivo expiatorio"), cargando simbólicamente con los pecados del pueblo. \n\n**Reflexión:** ¿Cómo te sientes al saber que Jesús cargó con tus pecados y los llevó "fuera del campamento" para que tú nunca tengas que cargarlos de nuevo?`
        }
      ],
      finalExam: [
        {
          id: 'f-pen-2-1',
          question: '¿Por qué la Pascua prefigura a Cristo?',
          options: ['Porque Moisés fue un gran líder.', 'Porque la sangre de un cordero inocente protegía del juicio de Dios.', 'Porque los israelitas eran mejores que los egipcios.', 'Porque se celebraba en el desierto.'],
          correctAnswerIndex: 1,
          explanation: 'La Pascua enseña que Dios provee un sustituto para que Su pueblo sea libre del juicio.'
        }
      ],
      baseVerse: { 
        reference: 'Éxodo 14:14', 
        text: 'Jehová peleará por vosotros, y vosotros estaréis tranquilos.' 
      },
      commentaries: [
        { author: 'John MacArthur', text: 'Toda la estructura de Levítico está diseñada para mostrar la inaccesibilidad de Dios al pecador, excepto a través de la sangre de un sacrificio.' }
      ],
      assignments: [
        { id: 't-p2', description: 'Investigue y dibuje los planos del Tabernáculo y su significado simbólico.' }
      ]
    }
  ]
};

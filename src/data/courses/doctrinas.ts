import { Course } from '../../types';

export const doctrinasCourse: Course = {
  id: 'doctrinas',
  title: 'Lo que Creemos: Teología Sistemática y Doctrina Bíblica',
  type: 'SPECIALIZED',
  description: 'Un estudio exhaustivo de las verdades fundamentales de la fe cristiana, desde la naturaleza de Dios hasta la salvación y el fin de los tiempos.',
  lessons: [
    {
      id: 'doc-day1',
      day: 1,
      title: 'Dios en Tres Personas: El Misterio de la Trinidad',
      blocks: [
        {
          type: 'note',
          id: 'doc-d1-reading',
          content: '**Escuela de Doctrina (50 mins):**\nLea **Génesis 1:1-3, 26**, **Mateo 3:13-17**, **Juan 1:1-18**, **Juan 14** y **2 Corintios 13:14**. \n\n**Investigación de Pasajes:**\n1. Busque el uso de términos en plural para Dios en el AT (ej. "Hagamos").\n2. Observe la interacción de las tres Personas en el bautismo de Jesús.\n3. Note cómo Jesús afirma ser uno con el Padre pero a la vez distinto del Padre.'
        },
        {
          type: 'text',
          id: 'doc-d1-b1',
          content: `La doctrina de la **Trinidad** es el corazón distintivo del cristianismo. No es una contradicción lógica, sino una paradoja revelada. Afirmamos que hay **un solo Dios** (*monoteísmo*) en **tres Personas** distintas y co-eternas. Dios no es 1+1+1 (tres dioses), ni es 1/3+1/3+1/3 (partes de Dios). Dios es una sola esencia (sustancia) que subsiste en tres Personas.\n\nEs fundamental distinguir entre **Esencia (*Ousia*)** y **Persona (*Hypostasis*)**. \n- El **Padre** es Dios, no creado ni nacido de nadie. \n- El **Hijo** es Dios, eternamente generado (no creado) por el Padre.\n- El **Espíritu Santo** es Dios, procediendo eternamente del Padre y del Hijo.\n\nNo son tres "máscaras" de un solo Dios (la herejía del **Modalismo**), ni tres voluntades separadas que podrían entrar en conflicto. Son tres Personas que viven en una danza eterna de amor y comunión (conocida teológicamente como *Perichoresis*).`
        },
        {
          type: 'text',
          id: 'doc-d1-b2-history',
          content: `Históricamente, la Iglesia tuvo que defender esta verdad en el **Concilio de Nicea (325 d.C.)** contra Arrio, quien decía que "hubo un tiempo en que el Hijo no existía". Los padres de la Iglesia usaron el término **Homoousios** (de la misma esencia) para afirmar la deidad plena de Jesús. \n\n¿Por qué importa esto para tu vida? Porque si Jesús no es Dios, Él no podría salvarnos. Solo Dios tiene el poder de redimir y de pagar una deuda infinita contra un Dios infinito. Si el Espíritu Santo no es Dios, Él no podría santificarnos ni darnos vida eterna. La Trinidad es la base de nuestra salvación.`
        },
        {
          type: 'note',
          id: 'doc-d1-error-warning',
          content: `**Alertas de Herejía (20 min):**\n- **Tritetismo:** Creer en tres dioses separados.\n- **Subordinacionismo:** Creer que el Hijo es "menos Dios" que el Padre.\n- **Modalismo (Monarquismo Modal):** Creer que Dios es una persona que cambia de papel (como un actor).\n\n**Reflexión:** ¿Cómo cambia tu oración cuando te diriges al Padre, a través del Hijo, por el poder del Espíritu?`
        }
      ],
      finalExam: [
        {
          id: 'f-doc-1-1',
          question: '¿Qué término griego describe que el Hijo es de la "misma esencia" que el Padre?',
          options: ['Homoiousios (esencia similar)', 'Homoousios (misma esencia)', 'Heteroousios (distinta esencia)', 'Gnosis'],
          correctAnswerIndex: 1,
          explanation: 'Homoousios fue el término clave en Nicea para defender que Jesús es Dios en el mismo sentido que el Padre.'
        }
      ],
      baseVerse: { 
        reference: 'Mateo 28:19', 
        text: 'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.' 
      },
      commentaries: [
        { author: 'Atanasio de Alejandría', text: 'El Padre es Dios, el Hijo es Dios y el Espíritu Santo es Dios; y sin embargo no son tres Dioses, sino un solo Dios.' }
      ],
      verses: [
        { reference: '2 Corintios 13:14', text: 'La gracia del Señor Jesucristo... sea con todos vosotros.' }
      ],
      assignments: [
        { id: 't-d1', description: 'Investigue y explique qué es la Perichoresis trinitaria.' }
      ]
    },
    {
      id: 'doc-day2',
      day: 2,
      title: 'Jesucristo: La Unión Hipostática',
      blocks: [
        {
          type: 'note',
          id: 'doc-d2-reading',
          content: '**Inmersión en la Persona de Cristo (45 mins):**\nLea **Filipenses 2:5-11**, **Colosenses 1:15-20**, **Hebreos 1-2** y **Juan 11**. \n\n**Observación Dual:**\n1. Encontramos a Jesús llorando (humanidad) y resucitando a Lázaro (deidad).\n2. Encontramos a Jesús cansado en el pozo (humanidad) y ofreciendo agua de vida eterna (deidad).\n3. Analice el concepto de "Kénosis" en Filipenses 2.'
        },
        {
          type: 'text',
          id: 'doc-day2-b1',
          content: `La doctrina de la **Unión Hipostática** afirma que en la única Persona de Jesucristo se unen dos naturalezas: una **naturaleza divina completa** y una **naturaleza humana completa**, sin mezcla, sin cambio, sin división y sin separación. \n\nJesús no es un "híbrido" (mitad y mitad). Él es el Dios-Hombre. Como Dios, Él es el Creador de todas las cosas. Como hombre, Él es el descendiente de Abraham y David. Esta unión era necesaria para que Cristo pudiera actuar como el único **Mediador** entre Dios y los hombres (1 Timoteo 2:5).`
        },
        {
          type: 'text',
          id: 'doc-day2-b2-necessity',
          content: `¿Por qué era necesario que fuera hombre? \n1. Para representar a la humanidad como el "Segundo Adán" (Romanos 5).\n2. Para poder sufrir y morir (ya que Dios como espíritu puro no puede morir).\n3. Para simpatizar con nuestras debilidades (Hebreos 4:15).\n\n¿Por qué era necesario que fuera Dios?\n1. Para que Su sacrificio tuviera un valor infinito.\n2. Para poder soportar el peso de la ira de Dios sin ser destruido.\n3. Para poder darnos vida y transformarnos desde adentro.`
        },
        {
          type: 'note',
          id: 'doc-day2-kenosis',
          content: `**El Misterio de la Kénosis (15 min):**\nEn Filipenses 2 se dice que Jesús "se despojó a sí mismo". Esto no significa que dejó de ser Dios, sino que voluntariamente dejó de lado el uso independiente de Sus atributos divinos y tomó forma de siervo. Él caminó en la tierra dependiendo del Espíritu Santo, dándonos el ejemplo perfecto de dependencia de Dios.`
        }
      ],
      finalExam: [
        {
          id: 'f-doc-2-1',
          question: '¿Qué es la Unión Hipostática?',
          options: ['La unión de todos los cristianos en la iglesia.', 'La unión de las dos naturalezas (divina y humana) en la única persona de Cristo.', 'El bautismo de Jesús en el Jordán.', 'La relación entre Cristo y el Papa.'],
          correctAnswerIndex: 1,
          explanation: 'Es el término técnico para describir cómo Jesús puede ser Dios y hombre simultáneamente.'
        }
      ],
      baseVerse: { 
        reference: 'Juan 1:14', 
        text: 'Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.' 
      },
      commentaries: [
        { author: 'Juan Calvino', text: 'El Hijo de Dios descendió del cielo de tal manera que, sin dejar el cielo, quiso ser concebido en el vientre de la Virgen.' }
      ],
      assignments: [
        { id: 't-d2', description: 'Investigue y defina qué fue el Concilio de Calcedonia (451 d.C.).' }
      ]
    },
    {
      id: 'doc-day3',
      day: 3,
      title: 'Soteriología: La Gracia Irresistible y la Expiación',
      blocks: [
        {
          type: 'note',
          id: 'doc-d3-reading',
          content: '**Lectura de la Redención (60 mins):**\nLea **Romanos 3-5**, **Efesios 1-2**, **Juan 3**, **Juan 6** y **Tito 3**. \n\n**Tarea de Análisis Profundo:**\n1. Identifique el estado del hombre antes de la gracia (Efesios 2:1-3).\n2. ¿Cuál es la base de nuestra elección según Efesios 1?\n3. ¿Qué significa que la fe es un "don de Dios" (Efesios 2:8)?'
        },
        {
          type: 'text',
          id: 'doc-day3-b1',
          content: `La **Soteriología** es el estudio de la salvación. El cristianismo histórico afirma que la salvación es **Monergista** (obra de Dios solo), no Sinergista (colaboración entre Dios y el hombre). Debido a la **Depravación Total**, el hombre está muerto espiritualmente y es incapaz de buscar a Dios o tener fe por sí mismo. Por lo tanto, Dios debe tomar la iniciativa.\n\nAspectos clave de la salvación:\n- **Regeneración:** El Espíritu Santo nos da un "nuevo corazón" antes de que podamos creer (Nuevo Nacimiento).\n- **Justificación:** Es un acto legal donde Dios nos declara justos basándose solamente en la justicia de Cristo imputada (acreditada) a nosotros por la fe.\n- **Adopción:** Pasamos de ser enemigos a ser hijos de Dios.\n- **Santificación:** El proceso progresivo de ser conformados a la imagen de Cristo.`
        },
        {
          type: 'text',
          id: 'doc-day3-b2-atonement',
          content: `En el centro de la salvación está la **Expiación Sustitutiva Penal**. Esto significa que en la cruz, Jesús actuó como nuestro sustituto, cargando legalmente con nuestro pecado y recibiendo la pena (castigo) que nosotros merecíamos. La ira de Dios contra el pecado fue satisfecha (*Propiciación*) y nosotros fuimos reconciliados con Dios. \n\nNo es solo un ejemplo de amor, es una transacción judicial divina. La salvación es "Solo por Gracia" (*Sola Gratia*), "Solo por Fe" (*Sola Fide*) y "Solo en Cristo" (*Solus Christus*). Cualquier intento de añadir obras humanas a la salvación anula la gracia.`
        },
        {
          type: 'note',
          id: 'doc-d3-reflection',
          content: `**El Descanso en la Gracia (15 min):**\nSi tu salvación dependiera en un 1% de tu fidelidad, estarías perdido. Pero como depende en un 100% de la fidelidad de Cristo, puedes tener seguridad eterna. \n\n**Pregunta:** ¿Estás tratando de ganar el favor de Dios o estás viviendo DESDE el favor que ya tienes en Cristo?`
        }
      ],
      finalExam: [
        {
          id: 'f-doc-3-1',
          question: '¿Qué significa que la salvación es "Monergista"?',
          options: ['Que el hombre y Dios trabajan juntos al 50%.', 'Que es una obra exclusiva de la gracia de Dios en el corazón del hombre.', 'Que solo los monjes pueden ser salvos.', 'Que la salvación se gana por el conocimiento.'],
          correctAnswerIndex: 1,
          explanation: 'Monergismo significa que Dios es el único que da vida al muerto espiritual.'
        }
      ],
      baseVerse: { 
        reference: 'Efesios 2:8-9', 
        text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.' 
      },
      commentaries: [
        { author: 'Martín Lutero', text: 'La justificación por la fe es el artículo sobre el cual la iglesia se mantiene o cae.' },
        { author: 'Charles Spurgeon', text: 'Yo creo en la doctrina de la elección porque estoy seguro de que si Dios no me hubiera elegido a mí, yo nunca lo hubiera elegido a Él.' }
      ],
      assignments: [
        { id: 't-d3', description: 'Escriba una explicación de la diferencia entre Justificación e Imputación.' }
      ]
    }
  ]
};

import { Course } from '../../types';

export const apologeticaCourse: Course = {
  id: 'apologetica',
  title: 'Defendiendo la Esperanza: Apologética Racional y Presuposicional',
  type: 'SPECIALIZED',
  description: 'Proporciona una defensa sólida y coherente de la fe cristiana frente a los desafíos del ateísmo, el escepticismo y las cosmovisiones modernas.',
  lessons: [
    {
      id: 'apol-day1',
      day: 1,
      title: 'Principios de Apologética: Mansedumbre y Razón',
      blocks: [
        {
          type: 'note',
          id: 'apol-d1-reading',
          content: '**Fundamentación Bíblica (40 mins):**\nLea **1 Pedro 3:8-22**, **Hechos 17** y **Colosenses 4:2-6**. \n\n**Ejercicio de Análisis:**\n1. En 1 Pedro 3:15, ¿cuál es el requisito previo para dar defensa (apologia)?\n2. En Hechos 17, observe cómo Pablo adapta su discurso según su audiencia (Judíos vs. Filósofos Atenienses).\n3. ¿Qué papel juega la "sal" y la "gracia" en Colosenses 4:6?\n\n*La apologética no es ganar discusiones, es presentar la Verdad con integridad.*'
        },
        {
          type: 'text',
          id: 'apol-d1-b1',
          content: `La palabra **apologética** proviene del término griego *apologia*, que en el contexto legal de la antigüedad se refería a una defensa formal presentada en un tribunal. No se trata de "pedir disculpas" (apology en inglés), sino de presentar una defensa razonada. \n\nExisten dos enfoques principales en la apologética moderna que debemos estudiar a fondo:\n\n1. **Apologética Evidencial/Clásica:** Busca construir un caso para el cristianismo usando la razón, la lógica y las evidencias históricas o científicas (ej. la resurrección de Cristo o el ajuste fino del universo). \n2. **Apologética Presuposicional:** Argumenta que no hay "neutralidad". Todo el mundo empieza con presuposiciones (creencias básicas). Esta rama afirma que el cristianismo es la única cosmovisión que puede dar sentido a las leyes de la lógica, la ciencia y la moralidad. Sin Dios, el pensamiento racional mismo colapsa en el absurdo.`
        },
        {
          type: 'text',
          id: 'apol-d1-b2-depth',
          content: `Un auténtico apologista debe dedicar tiempo a entender las **Falacias Lógicas**. A menudo, los ataques contra la fe no son intelectuales, sino errores de razonamiento. Algunas falacias comunes son:\n\n- **Ad Hominem:** Atacar a la persona en lugar de su argumento.\n- **Hombre de Paja:** Tergiversar la creencia cristiana para que parezca ridícula y luego "destruirla" fácilmente.\n- **Petición de Principio:** Asumir en la premisa lo que se quiere demostrar (ej. "Los milagros son imposibles porque la ciencia dice que no ocurren").\n\nIdentificar estas falacias requiere un estudio exhaustivo de al menos una hora por sesión de debate. La claridad de pensamiento es una forma de honrar al Dios de la Verdad.`
        },
        {
          type: 'note',
          id: 'apol-d1-ethics',
          content: `**El Corazón del Apologista (20 min):**\nLa apologética sin amor es un ruido molesto (1 Corintios 13). \n\n**Preguntas de introspección:**\n1. ¿Mi meta es humillar al oponente o que conozca a Cristo?\n2. ¿He estudiado lo suficiente para responder con honestidad o solo repito frases hechas?\n3. ¿Mi vida respalda la "esperanza" que defiendo? \n\nRecuerde: A veces la mejor apologética es un carácter transformado por el Espíritu Santo.`
        },
        {
          type: 'text',
          id: 'apol-d1-reflection',
          content: `**Reflexión Final:**\nLa apologética es un mandamiento, no una opción para intelectuales. Estamos llamados a amar a Dios con toda nuestra *mente*. Esto implica un esfuerzo deliberado por estudiar no solo la Biblia, sino también los desafíos de nuestra cultura. La fe cristiana no es un salto al vacío en la oscuridad, sino un paso hacia la Luz basado en la revelación histórica de Dios.`
        }
      ],
      finalExam: [
        {
          id: 'f-apol-1-1',
          question: '¿Qué significa el término "Apologia" en su contexto original?',
          options: ['Pedir perdón por un error.', 'Una defensa legal razonada.', 'Un cántico de alabanza.', 'Una predicación de arrepentimiento.'],
          correctAnswerIndex: 1,
          explanation: 'Era una defensa formal en un juicio, como la que Pablo dio ante Agripa.'
        },
        {
          id: 'f-apol-1-2',
          question: '¿Cuál es la diferencia entre la apologética clásica y la presuposicional?',
          options: ['La clásica usa la Biblia y la presuposicional no.', 'La clásica busca evidencias externas; la presuposicional analiza las bases del pensamiento mismo.', 'La presuposicional es solo para filósofos ateos.', 'No hay diferencia real.'],
          correctAnswerIndex: 1,
          explanation: 'La clásica construye un caso paso a paso; la presuposicional muestra que sin Dios, el conocimiento mismo es imposible.'
        }
      ],
      baseVerse: { 
        reference: '1 Pedro 3:15', 
        text: 'Sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defensa con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros.' 
      },
      commentaries: [
        { author: 'C.S. Lewis', text: 'Ser ignorante y descuidado en nuestro pensamiento no es una virtud cristiana; es una negligencia del deber.' },
        { author: 'Cornelius Van Til', text: 'Si el cristianismo es verdadero, entonces es la única base coherente para cualquier tipo de razonamiento.' }
      ],
      verses: [
        { reference: '2 Corintios 10:5', text: 'Derribando argumentos y toda altivez que se levanta contra el conocimiento de Dios...' }
      ],
      assignments: [
        { id: 't-ap1', description: 'Investigue y defina tres falacias lógicas que haya escuchado en debates actuales.' }
      ]
    },
    {
      id: 'apol-day2',
      day: 2,
      title: 'Cosmología y Teleología: El Diseño del Universo',
      blocks: [
        {
          type: 'note',
          id: 'apol-d2-reading',
          content: '**Lectura y Observación (45 mins):**\nLea **Génesis 1**, **Salmo 19**, **Salmo 139** y **Romanos 1:18-32**. \n\n**Preguntas Clave:**\n1. Según Romanos 1, ¿por qué el hombre es "inexcusable" ante Dios?\n2. ¿Qué revelan los cielos según el Salmo 19?\n3. ¿Cómo sustenta Dios Su creación según Colosenses 1:17?\n\n*La creación es un libro abierto que testifica de la gloria de su Autor.*'
        },
        {
          type: 'text',
          id: 'apol-day2-b1',
          content: `El **Argumento Cosmológico Kalam** es una de las herramientas más poderosas: \n1. Todo lo que comienza a existir tiene una causa. \n2. El universo comenzó a existir (evidencia de la expansión y la termodinámica). \n3. Por tanto, el universo tiene una causa. \n\nEsta causa debe ser incausada, atemporal, inmaterial, poderosa y personal. Esto se ajusta perfectamente a la descripción bíblica de Dios. Negar esto requiere creer que el universo surgió "de la nada, por nada y para nada", lo cual es un salto de fe mucho mayor que creer en un Creador inteligente.`
        },
        {
          type: 'text',
          id: 'apol-day2-b2-fine-tuning',
          content: `El **Argumento del Ajuste Fino (Teleológico)** analiza las constantes físicas de nuestro universo. Si la fuerza de gravedad o la tasa de expansión del universo variaran en una fracción ínfima (como una parte en 10^120), la vida sería imposible. Estamos en un universo "calibrado" para la vida. \n\nLos ateos intentan explicar esto con la teoría del "Multiverso" (un número infinito de universos), pero esto es una postulación metafísica sin evidencia científica. La explicación más simple y lógica (Navaja de Ockham) es que hubo un Diseñador inteligente. Dedicar tiempo a estudiar estas constantes es una forma de maravillarse ante la precisión de Dios.`
        },
        {
          type: 'note',
          id: 'apol-d2-complexity',
          content: `**La Complejidad del ADN (20 min):**\nEl código genético contiene una cantidad de información equivalente a miles de libros enciclopédicos. La información siempre proviene de una inteligencia; nunca hemos visto que la información surja por azar. \n\n**Reflexión:** Si ves tu nombre escrito en la arena, ¿piensas que lo hizo el viento o que alguien lo escribió? El ADN es el nombre de Dios escrito en cada una de tus células.`
        }
      ],
      finalExam: [
        {
          id: 'f-apol-2-1',
          question: '¿Qué sostiene el Argumento del Ajuste Fino?',
          options: ['Que el universo es muy caótico.', 'Que las leyes de la física están calibradas de forma extremadamente precisa para permitir la vida.', 'Que el hombre puede ajustar el clima a su voluntad.', 'Que Dios no se preocupa por los detalles.'],
          correctAnswerIndex: 1,
          explanation: 'Incluso cambios minúsculos en las leyes físicas harían que los átomos no se formaran o que las estrellas explotaran prematuramente.'
        }
      ],
      baseVerse: { 
        reference: 'Romanos 1:20', 
        text: 'Porque las cosas invisibles de él, su eterno poder y deidad, se hacen claramente visibles desde la creación del mundo, siendo entendidas por medio de las cosas hechas, de modo que no tienen excusa.' 
      },
      commentaries: [
        { author: 'William Lane Craig', text: 'El universo no es un accidente cósmico, sino el resultado de un propósito deliberado.' }
      ],
      assignments: [
        { id: 't-ap2', description: 'Investigue qué es la "Complejidad Irreducible" de Michael Behe.' }
      ]
    },
    {
      id: 'apol-day3',
      day: 3,
      title: 'El Problema del Mal y el Sufrimiento',
      blocks: [
        {
          type: 'note',
          id: 'apol-d3-reading',
          content: '**Lectura Bíblica de Consuelo y Razón (50 mins):**\nLea **Job 38-42**, **Génesis 50:15-21**, **Isaías 53** y **Apocalipsis 21**. \n\n**Tarea de Reflexión:**\n1. En Job, ¿Dios da una explicación filosófica al dolor o se revela a Sí mismo?\n2. ¿Cómo transformó Dios el mal en bien en la historia de José (Génesis 50)?\n3. ¿Cuál es el significado del sufrimiento de Cristo en relación con el nuestro?'
        },
        {
          type: 'text',
          id: 'apol-day3-b1',
          content: `Este es el desafío más emocional: si Dios es bueno (*Omnibenevolente*) y poderoso (*Omnipotente*), ¿por qué existe el mal? \n\nLa respuesta apologética comienza aclarando que el mal no es una "cosa" creada por Dios, sino una **privación del bien**, así como la oscuridad es la ausencia de luz. Dios creó un mundo perfecto, pero dotado de libertad. La libertad real implica la posibilidad de rechazar a Dios (pecado). Un mundo de robots que no pueden pecar sería un mundo sin amor, porque el amor requiere voluntad.\n\nAdemás, el "Problema del Mal" es en realidad una prueba a favor de Dios. Para que el ateo se queje de que el mundo es "injusto", debe asumir que existe un estándar de justicia objetivo. Si Dios no existe, el mal es solo "biología haciendo lo que la biología hace". Solo si Dios existe podemos llamar al mal "mal".`
        },
        {
          type: 'text',
          id: 'apol-day3-b2-cross',
          content: `La respuesta final de Dios al mal no es una respuesta teórica, sino una Persona: **Jesucristo**. Dios no se quedó distante en el cielo mirando nuestro dolor; Él bajó y sufrió el máximo mal e injusticia en la cruz. \n\nCristo es el "Varón de Dolores". En la cruz, Dios toma el mal sobre Sí mismo para vencerlo. El mal es temporal, pero la gloria que viene no tiene comparación. La apologética aquí se vuelve pastoral: no solo defendemos una tesis, sino que apuntamos a un Salvador que tiene cicatrices que prueban que Él entiende nuestro dolor.`
        },
        {
          type: 'note',
          id: 'apol-d3-teodicea',
          content: `**Teodicea vs. Defensa (15 min):**\nUna Teodicea intenta explicar las razones específicas de por qué Dios permite un mal particular (algo muy difícil de saber). Una Defensa solo busca demostrar que no hay una contradicción lógica entre la existencia de Dios y el mal. \n\n**Reflexión:** ¿Puedes confiar en la bondad de Dios aunque no entiendas Sus razones inmediatas?`
        }
      ],
      finalExam: [
        {
          id: 'f-apol-3-1',
          question: '¿Por qué el "Problema del Mal" supone un problema para el ateísmo?',
          options: ['Porque los ateos no sufren.', 'Porque para llamar a algo "mal" o "injusto" se requiere un estándar moral objetivo que el ateísmo no puede fundamentar.', 'Porque el mal prueba que Dios existe.', 'No supone ningún problema.'],
          correctAnswerIndex: 1,
          explanation: 'Sin Dios, el mal es solo una preferencia subjetiva o un proceso evolutivo natural sin peso moral real.'
        }
      ],
      baseVerse: { 
        reference: 'Génesis 50:20', 
        text: 'Vosotros pensasteis mal contra mí, mas Dios lo encaminó a bien, para hacer lo que vemos hoy, para mantener en vida a mucho pueblo.' 
      },
      commentaries: [
        { author: 'Alvin Plantinga', text: 'La existencia del mal no es incompatible con la existencia de un Dios omnipotente y omnibenevolente.' },
        { author: 'Tim Keller', text: 'Si tienes un Dios lo suficientemente grande para estar enojado con Él por permitir el dolor, tienes un Dios lo suficientemente grande para tener razones que tú no puedes comprender.' }
      ],
      assignments: [
        { id: 't-ap3', description: 'Escriba un ensayo de 300 palabras sobre cómo la resurrección de Cristo es la derrota final del mal.' }
      ]
    }
  ]
};

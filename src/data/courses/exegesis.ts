import { Course } from '../../types';

export const exegesisCourse: Course = {
  id: 'exegesis',
  title: 'Entendiendo la Biblia: Exégesis y Hermenéutica Avanzada',
  type: 'SPECIALIZED',
  description: 'Un viaje profundo a las herramientas académicas y espirituales para descubrir el mensaje original de Dios con precisión técnica y humildad devocional.',
  lessons: [
    {
      id: 'exegesis-day1',
      day: 1,
      title: 'Fundamentos de la Exégesis: El Arte de Extraer la Verdad',
      estimatedMinutes: 50,
      baseVerse: {
        reference: '2 Timoteo 2:15',
        text: 'Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad.'
      },
      objectives: [
        'Diferenciar con precisión técnica entre la exégesis (extraer la verdad) y la eiségesis (proyectar ideas ajenas).',
        'Dominar las tres fases cardinales del método inductivo: observación exhaustiva, interpretación contextual y aplicación transformadora.',
        'Comprender el valor de la crítica textual en la preservación providencial de las Sagradas Escrituras.'
      ],
      originalTerms: [
        {
          term: 'ἐξηγέομαι',
          transliteration: 'Exēgéomai',
          language: 'Griego',
          strong: 'G1834',
          meaning: 'Guiar hacia afuera, relatar en detalle, exponer con fidelidad',
          context: 'Raíz de "exégesis". El expositor no inventa el mensaje; lo guía hacia afuera desde las profundidades del texto.'
        },
        {
          term: 'ὀρθοτομέω',
          transliteration: 'Orthotoméō',
          language: 'Griego',
          strong: 'G3718',
          meaning: 'Trazar derecho, cortar en línea recta, manejar con precisión',
          context: 'En 2 Timoteo 2:15: "que usa bien la palabra de verdad", como un artesano que no tuerce el camino del texto sagrado.'
        }
      ],
      hermeneuticalExercise: {
        title: 'Taller de Rigor Exegético: Filipenses 4:13',
        observation: 'Lea desde el v. 10. Observe las antítesis de Pablo: "humillado" frente a "tener abundancia", "tener hambre" frente a "estar saciado". El sujeto de la fortaleza es la gracia de Cristo en cualquier circunstancia.',
        historicalContext: 'Pablo se encuentra en prisión romana. No escribe un eslogan motivacional moderno, sino un testimonio de fidelidad en la escasez física severa.',
        christocentricFocus: 'Cristo es la fuente de gozo y autosuficiencia piadosa (autarkeia). En Él, el creyente está completo aunque carezca de comodidades terrenales.',
        practicalApplication: 'Deje de usar las promesas bíblicas como amuletos de prosperidad y someta sus pruebas presentes al propósito formativo del Señor.'
      },
      blocks: [
        {
          type: 'note',
          id: 'exe-d1-reading',
          content: '**Laboratorio de Lectura Intensiva (45 mins):**\nAntes de profundizar en la teoría, debe leer con extrema atención **Nehemías 8**, **Salmo 119:1-32** y **2 Timoteo 2:1-15**. \n\n**Tarea de Observación:**\n1. Identifique en Nehemías 8 qué acciones específicas realizaron los levitas para que el pueblo entendiera (v. 8).\n2. En el Salmo 119, anote la relación entre la "Ley" y el "deleite" del autor.\n3. En 2 Timoteo, ¿qué significa para usted "usar bien" la palabra de verdad?\n\n*Este ejercicio es la base de su formación como exégeta. No lo pase por alto.*'
        },
        {
          type: 'text',
          id: 'exe-d1-b1',
          content: `La palabra **exégesis** no es un término meramente académico; es una disciplina de amor. Proviene del griego *exēgeomai*, que literalmente significa "guiar hacia afuera" o "exponer". El exégeta es aquel que permite que el texto hable por sí mismo, guiando el significado desde el interior del documento hacia el exterior, hacia la mente del lector.\n\nContrario a esto, encontramos la **eiségesis** (del griego *eis*, "hacia adentro"). Este es el error más común y peligroso en la iglesia contemporánea. Ocurre cuando el lector proyecta sus propios miedos, deseos, agendas políticas o prejuicios culturales sobre el texto sagrado. El eiségeta no escucha a Dios; se escucha a sí mismo usando la Biblia como un megáfono para su propio ego. Para evitar esto, debemos cultivar una "humildad hermenéutica", reconociendo que nuestras presuposiciones a menudo actúan como lentes que distorsionan la realidad bíblica.`
        },
        {
          type: 'control',
          id: 'exe-d1-control-1',
          question: {
            id: 'cp-exe-d1-1',
            question: '¿Cuál es la diferencia medular entre la Exégesis y la Eiségesis al abordar un texto bíblico difícil?',
            options: [
              'La exégesis inventa doctrinas nuevas mientras que la eiségesis repite la tradición eclesiástica.',
              'La exégesis extrae el significado intrínseco del autor original, mientras que la eiségesis introduce presuposiciones y deseos del lector.',
              'No existe diferencia sustancial, ambos son métodos poéticos y libres de interpretación espiritual.',
              'La exégesis solo se aplica a los evangelios y la eiségesis a las epístolas paulinas.'
            ],
            correctAnswerIndex: 1,
            explanation: 'Correcto. La exégesis respeta la autoridad de Dios dejando que el texto comunique su mensaje original (ex = hacia afuera), mientras la eiségesis impone ideas humanas externas (eis = hacia adentro).'
          }
        },
        {
          type: 'text',
          id: 'exe-d1-b2-advanced',
          content: `Para alcanzar un nivel de estudio que supere la hora de dedicación, debemos dominar el **Método de Estudio Inductivo** en su máxima expresión. Este método se opone al deductivo (donde empezamos con una idea y buscamos versículos que la "prueben"). El método inductivo se divide en tres pilares que requieren tiempo y paciencia:\n\n1. **Observación Exhaustiva (¿Qué veo realmente?):** No lea el texto, "mire" el texto. Identifique los sujetos, los verbos de acción, los conectores lógicos (como "porque", "por tanto", "así que"). Estos conectores son las bisagras de la teología. Si Pablo dice "por tanto", usted debe detenerse y buscar a qué se refiere ese "por tanto" en los capítulos anteriores. La observación es la etapa más larga; si dedica 20 minutos a un pasaje, 15 deberían ser de observación pura.\n\n2. **Interpretación Contextual (¿Qué significaba para ellos?):** El texto no puede significar para nosotros hoy lo que nunca significó para el autor original y sus primeros lectores. Debemos cruzar el "puente del tiempo, la cultura y el lenguaje". ¿Cómo entendía un campesino galileo la parábola de la semilla? ¿Qué implicaciones legales tenía un "pacto" para un nómada en el desierto? Sin este paso, terminamos con interpretaciones que son puramente alegóricas o místicas, carentes de fundamento histórico.\n\n3. **Aplicación Transformativa (¿Cómo muero a mí mismo hoy?):** La interpretación que no lleva a la santidad es solo curiosidad intelectual. La aplicación busca principios universales que se desprenden del texto para informar nuestra moral, nuestros afectos y nuestras acciones. La aplicación debe ser específica, medible y centrada en Cristo.`
        },
        {
          type: 'note',
          id: 'exe-d1-observation-deep-dive',
          content: `**Taller de Observación Microscópica (20 minutos):**\nAbra su Biblia en **Filipenses 4:13**. \n\nMuchos lo usan como un "amuleto" para el éxito. Pero observe contextualmente:\n1. Lea desde el v. 10.\n2. Note que Pablo habla de estar "humillado" y tener "hambre".\n3. El "todo" de Cristo se refiere a la capacidad de estar satisfecho en la escasez extrema tanto como en la abundancia.\n\n**Pregunta de reflexión:** ¿Cómo cambia su percepción de la soberanía de Dios saber que el "TODO lo puedo" incluye sufrir hambre por causa del Evangelio?`
        },
        {
          type: 'text',
          id: 'exe-d1-b3-text-criticism',
          content: `Una rama vital de la exégesis es la **Crítica Textual**. Es importante entender que no poseemos los originales (autógrafos). Poseemos miles de copias manuscritas. La crítica textual no "critica" la autoridad de la Biblia, sino que analiza científicamente las variantes manuscritas para asegurar que el texto que tenemos es el más fiel al original. Gracias a este rigor académico, podemos afirmar con certeza que el 99.5% del texto bíblico es indiscutible, y las variantes restantes no afectan ninguna doctrina fundamental de la fe cristiana. Valorar la crítica textual es valorar la providencia de Dios en la preservación de Su Palabra.`
        },
        {
          type: 'text',
          id: 'exe-d1-reflection',
          content: `**Reflexión Teológica:**\nEl estudio de la Biblia es un acto de adoración. Cuando dedicamos tiempo a entender la gramática, el contexto y la historia, estamos diciendo: "Señor, tu Palabra es tan valiosa que no permitiré que mi pereza distorsione tu mensaje". La exégesis es el guardián de la ortodoxia. Sin ella, la iglesia se deriva hacia el sentimentalismo y el error doctrinal. ¿Está usted dispuesto a ser un 'obrero que no tiene de qué avergonzarse'?`
        },
        {
          type: 'note',
          id: 'exe-d1-final-activity',
          content: `**Desafío Hermenéutico Final (30 mins):**\nTome el pasaje de **Jeremías 29:1-14**.\n1. Identifique a quién se le escribió (Exiliados en Babilonia).\n2. Observe el v. 10: ¿Cuánto tiempo debían esperar?\n3. Relacione el v. 11 con la realidad de personas que morirían en el exilio antes de ver el cumplimiento material de la promesa.\n4. Escriba un ensayo breve sobre qué significa la "esperanza" de Dios cuando la circunstancia inmediata es de cautiverio.`
        }
      ],
      finalExam: [
        {
          id: 'f-exe-1-1',
          question: '¿Qué término técnico describe el error de proyectar ideas propias sobre la Biblia?',
          options: ['Exégesis', 'Eiségesis', 'Hermenéutica', 'Apologética'],
          correctAnswerIndex: 1,
          explanation: 'La eiségesis es el acto de "meter" significados externos al texto, mientras que la exégesis los "extrae".'
        },
        {
          id: 'f-exe-1-2',
          question: 'En el método inductivo, ¿cuál es el orden correcto de las etapas?',
          options: ['Interpretación, Observación, Aplicación', 'Observación, Interpretación, Aplicación', 'Aplicación, Observación, Interpretación', 'Observación, Aplicación, Interpretación'],
          correctAnswerIndex: 1,
          explanation: 'Debemos ver el texto primero (Observación), entenderlo después (Interpretación) y entonces aplicarlo (Aplicación).'
        },
        {
          id: 'f-exe-1-3',
          question: 'La Crítica Textual se enfoca primordialmente en:',
          options: ['Criticar los mandamientos difíciles.', 'Comparar manuscritos para restaurar el texto original.', 'Analizar las fallas morales de los autores bíblicos.', 'Traducir la Biblia a idiomas modernos.'],
          correctAnswerIndex: 1,
          explanation: 'Su función es puramente técnica: asegurar que el texto que leemos hoy corresponde al que escribieron los apóstoles y profetas.'
        }
      ],
      commentaries: [
        { author: 'Spurgeon', text: 'Hay quien lee la Biblia para encontrar apoyo a sus errores; pero el verdadero santo la lee para corregir sus caminos.' },
        { author: 'Lutero', text: 'La Biblia es un libro vivo, no solo para ser leído, sino para ser estudiado con el corazón arrodillado.' }
      ],
      verses: [
        { reference: 'Esdras 7:10', text: 'Porque Esdras había preparado su corazón para inquirir la ley de Jehová y para cumplirla...' },
        { reference: 'Salmo 119:18', text: 'Abre mis ojos, y miraré las maravillas de tu ley.' }
      ],
      assignments: [
        { id: 't1-1', description: 'Realice una observación detallada (mínimo 15 puntos) de Juan 3:16, evitando anacronismos.' },
        { id: 't1-2', description: 'Investigue la diferencia entre Hermenéutica General y Hermenéutica Especial.' }
      ]
    },
    {
      id: 'exegesis-day2',
      day: 2,
      title: 'Contexto y Mundo Bíblico: Cruzando el Abismo Cultural',
      blocks: [
        {
          type: 'note',
          id: 'exe-d2-reading',
          content: '**Laboratorio de Contexto (40 mins):**\nLea **Apocalipsis 3:14-22** (La carta a Laodicea). \nNo use comentarios aún. Observe la mención de "frío", "caliente" y "tibio". \n\n**Investigación Geográfica Sugerida:**\nBusque información sobre las fuentes de agua de las ciudades vecinas de Colosas (fría) e Hierápolis (caliente). ¿Cómo influye la geografía en la interpretación de este pasaje?\n\n*Esta tarea le demostrará por qué el contexto geográfico es vital.*'
        },
        {
          type: 'text',
          id: 'exe-d2-b1',
          content: `Ignorar el **contexto** es la receta perfecta para la herejía. El contexto no es solo el capítulo anterior; es un sistema de círculos concéntricos. \n\n1. **Contexto Literario Inmediato:** Las palabras y oraciones que rodean al pasaje. Si Pablo usa la palabra "justificado", debemos ver cómo la usó tres versículos antes.\n2. **Contexto del Libro:** El propósito por el cual se escribió el libro. Proverbios se lee distinto a Romanos. Santiago escribe para probar la fe, Pablo para establecer la base de la fe.\n3. **Contexto del Autor:** La teología completa de quien escribe. ¿Qué significa "gracia" para Juan versus qué significa para Pedro?\n4. **Contexto del Pacto:** ¿Estamos en el Pacto Sinaítico o en el Nuevo Pacto? Aplicar leyes del Antiguo Pacto sin filtros teológicos al Nuevo es un error común.`
        },
        {
          type: 'text',
          id: 'exe-d2-b2-worldview',
          content: `Debemos entender la **Cosmovisión Bíblica**. El mundo de la Biblia es un mundo de honor y vergüenza, de pactos de sangre, de monarquías absolutas y de una dependencia total de la tierra. Cuando Jesús habla de la "puerta estrecha", no está hablando de un sentimiento; está evocando una realidad física de las ciudades amuralladas. \n\nAdemás, el **estudio léxico (palabras)** debe ser riguroso. Estudiar la palabra "amor" requiere entender la distinción entre *agape*, *philia* y *eros*, pero sobre todo, ver cómo el contexto define la palabra. Muchas veces caemos en la "falacia de la raíz" (creer que el significado de una palabra es igual a su origen etimológico). Recuerde: el uso actual en el contexto siempre gana a la etimología.`
        },
        {
          type: 'note',
          id: 'exe-d2-cultural-clash',
          content: `**Desmitificando el Contexto (15 minutos):**\nConsidere **Mateo 18:20** ("Donde están dos o tres congregados..."). \nContextualmente, Jesús está hablando de disciplina eclesial y juicios legales, no de que Él solo está presente si hay un grupo. Él está presente incluso cuando estás solo, pero en el contexto judicial judío, se requerían dos o tres testigos.\n\n**Reflexión:** ¿Cuántas veces hemos "espiritualizado" un texto ignorando su aplicación práctica y legal original?`
        },
        {
          type: 'text',
          id: 'exe-d2-reflection',
          content: `**El Puente Hermenéutico:**\nSomos extranjeros en el mundo de la Biblia. Para ser buenos intérpretes, debemos ser buenos antropólogos. Debemos despojarnos de nuestra mentalidad occidental del siglo XXI y tratar de sentarnos a la mesa con los apóstoles. Esto requiere tiempo, lectura de historia secular del Cercano Oriente y, sobre todo, una mente abierta. La Biblia no se escribió PARA nosotros, pero se escribió PARA que nosotros, al entender su mensaje original, fuéramos transformados hoy.`
        }
      ],
      finalExam: [
        {
          id: 'f-exe-2-1',
          question: '¿Cuál es el "círculo concéntrico" de contexto más cercano a un versículo?',
          options: ['El contexto del autor', 'El contexto literario inmediato', 'El contexto del pacto', 'Toda la Biblia'],
          correctAnswerIndex: 1,
          explanation: 'El contexto inmediato (versículos anteriores y posteriores) es siempre la primera guía de interpretación.'
        },
        {
          id: 'f-exe-2-2',
          question: '¿Qué es la "falacia de la raíz"?',
          options: ['Olvidar las raíces judías de la fe.', 'Asumir que el significado de una palabra es siempre e idéntico a su origen etimológico antiguo.', 'Negar la inspiración de las lenguas originales.', 'No estudiar el griego y el hebreo.'],
          correctAnswerIndex: 1,
          explanation: 'La etimología ayuda, pero el uso contextual es el que determina el significado final de una palabra.'
        }
      ],
      baseVerse: { 
        reference: 'Hechos 17:11', 
        text: 'Y éstos eran más nobles que los que estaban en Tesalónica, pues recibieron la palabra con toda solicitud, escudriñando cada día las Escrituras para ver si estas cosas eran así.' 
      },
      commentaries: [
        { author: 'John MacArthur', text: 'El contexto es el rey de la interpretación. Saca un versículo de su contexto y lo convertirás en un pretexto para el error.' }
      ],
      verses: [
        { reference: 'Nehemías 8:8', text: 'Y leían en el libro de la ley de Dios claramente, y ponían el sentido...' }
      ],
      assignments: [
        { id: 't2-1', description: 'Elija un pasaje difícil (ej. 1 Corintios 11:10) e investigue su contexto cultural detallado.' }
      ]
    }
  ]
};

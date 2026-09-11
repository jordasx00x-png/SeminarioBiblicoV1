import { Course } from '../../types';

export const historicosCourse: Course = {
  id: 'historicos',
  title: 'Libros Históricos: Reino, Ruina y Restauración',
  type: 'BIBLE_STUDY',
  description: 'Un recorrido por la historia de Israel desde la entrada a Canaán hasta el retorno del exilio, viendo la fidelidad de Dios frente a la infidelidad humana.',
  lessons: [
    {
      id: 'his-day1',
      day: 1,
      title: 'Josué y Jueces: La Lucha por la Tierra y el Corazón',
      blocks: [
        {
          type: 'note',
          id: 'his-d1-reading',
          content: '**Lectura de Conquista y Crisis (50 mins):**\nLea **Josué 1**, **Josué 6**, **Jueces 2** y **Jueces 21**. \n\n**Observación Crítica:**\n1. Note la clave del éxito de Josué (1:8).\n2. Analice el "Ciclo de los Jueces" en Jueces 2: pecado, castigo, clamor, liberación y caída de nuevo.\n3. Observe la última frase de Jueces: "cada uno hacía lo que bien le parecía".'
        },
        {
          type: 'text',
          id: 'his-d1-b1',
          content: `El libro de **Josué** comienza con un traspaso de liderazgo. Moisés el legislador ha muerto, y Josué el guerrero es llamado a cruzar el Jordán. La clave no es su habilidad militar, sino su obediencia a la Torá. La caída de **Jericó** es un acto litúrgico: Dios entrega la ciudad, el pueblo solo marcha en obediencia. Sin embargo, la conquista total dependía de la fidelidad del pueblo a Dios, algo que falló miserablemente en el siguiente libro.\n\n**Jueces** narra el período de "caos teocrático". Sin una guía clara y con un corazón propenso a la idolatría, Israel entra en un ciclo destructivo. Los jueces como Gedeón o Sansón son líderes imperfectos que Dios usa por misericordia pura. Jueces es un libro oscuro que grita por la necesidad de un Rey que no solo gobierne externamente, sino que transforme el corazón.`
        },
        {
          type: 'text',
          id: 'his-d1-b2-grace',
          content: `A pesar de la oscuridad de Jueces, encontramos el libro de **Rut**. Es un oasis de gracia que ocurre "en los días que gobernaban los jueces". Muestra que Dios está obrando incluso en los tiempos de mayor apostasía nacional, preparando la línea mesiánica a través de una mujer gentil (Rut) y un hombre justo (Booz). Esto nos enseña que la soberanía de Dios no descansa, ni siquiera cuando parece que el mundo ha olvidado Su nombre.`
        },
        {
          type: 'note',
          id: 'his-d1-reflection',
          content: `**El Fracaso del Hombre y el Triunfo de Dios (20 min):**\n¿Por qué crees que Israel volvía a los ídolos tan rápido después de ser liberado? \n\n**Reflexión:** Todos tenemos un "juez" interno que quiere hacer lo que bien le parece. ¿Cómo estás sometiendo hoy tu voluntad a la Palabra de Dios para no caer en el ciclo de la derrota espiritual?`
        }
      ],
      finalExam: [
        {
          id: 'f-his-1-1',
          question: '¿Cuál era el ciclo repetitivo en el libro de Jueces?',
          options: ['Prosperidad, gratitud, paz y bendición.', 'Pecado, opresión, clamor y liberación.', 'Construcción del templo, oración y ayuno.', 'Exilio, retorno y reconstrucción.'],
          correctAnswerIndex: 1,
          explanation: 'Israel pecaba, Dios permitía opresión, el pueblo clamaba y Dios enviaba un juez para liberarlos.'
        }
      ],
      baseVerse: { 
        reference: 'Josué 1:8', 
        text: 'Nunca se apartará de tu boca este libro de la ley, sino que de día y de noche meditarás en él...' 
      },
      commentaries: [
        { author: 'John MacArthur', text: 'Jueces muestra que el corazón humano no cambia con milagros externos, necesita una transformación interna producida por el Espíritu Santo.' }
      ],
      assignments: [
        { id: 't-h1', description: 'Realice un esquema del "Ciclo de los Jueces" con un ejemplo de un juez específico.' }
      ]
    }
  ]
};

export const poeticosCourse: Course = {
  id: 'poeticos',
  title: 'Libros Poéticos y Sapienciales: El Corazón de la Sabiduría',
  type: 'BIBLE_STUDY',
  description: 'Un estudio de Job, Salmos, Proverbios, Eclesiastés y Cantares, explorando la comunicación del alma con Dios y el camino de la sabiduría práctica.',
  lessons: [
    {
      id: 'poe-day1',
      day: 1,
      title: 'Salmos: Los Cantos del Alma',
      blocks: [
        {
          type: 'note',
          id: 'poe-d1-reading',
          content: '**Lectura Devocional y Analítica (50 mins):**\nLea los Salmos **1**, **22**, **23**, **51**, **110** y **139**. \n\n**Tarea de Identificación:**\n1. Identifique pasajes mesiánicos en el Salmo 22 y 110.\n2. Note la estructura del arrepentimiento en el Salmo 51.\n3. Observe la maravilla de la omnipresencia de Dios en el Salmo 139.'
        },
        {
          type: 'text',
          id: 'poe-d1-b1',
          content: `Los **Salmos** son el himnario inspirado de Dios. Mientras que en la Ley Dios nos habla, en los Salmos nosotros hablamos a Dios bajo Su inspiración. Cubren toda la gama de emociones humanas: gozo, desesperación, ira, culpa y alabanza. La poesía hebrea no usa rima de sonidos, sino **paralelismo de ideas** (repetir o contrastar pensamientos), lo que la hace perfectamente traducible a cualquier cultura.\n\nEl Salmo 1 es el portal: presenta el camino del justo (que medita en la Ley) versus el del impío. Los Salmos también son profundamente proféticos. Los **Salmos Mesiánicos** describen con precisión la crucifixión (Salmo 22) y la ascensión y reino de Cristo (Salmo 110). Jesús mismo oró los salmos con frecuencia, validando su autoridad y poder espiritual.`
        },
        {
          type: 'text',
          id: 'poe-d1-b2-categories',
          content: `Existen distintas categorías de Salmos que debemos conocer:\n1. **Himnos de Alabanza:** Enfocados en los atributos de Dios.\n2. **Lamentos:** Gritos de auxilio en el dolor.\n3. **Cantos de Ascensión:** Cantados mientras los peregrinos subían a Jerusalén.\n4. **Salmos Imprecatorios:** Gritos por la justicia de Dios contra el mal.\n5. **Salmos de Sabiduría:** Instrucciones para una vida bendecida.\n\nLos Salmos enseñan que la oración honesta es la base de una relación real con Dios. No hay emoción que los Salmos no puedan redimir y elevar hacia el trono de la gracia.`
        },
        {
          type: 'note',
          id: 'poe-d1-reflection',
          content: `**Orando con la Biblia (20 min):**\nElige el Salmo 23 o el 139. Léelo despacio, deteniéndote en cada frase. Convierte cada versículo en una oración personal. \n\n**Pregunta:** ¿Cómo cambia tu perspectiva de tus problemas saber que Dios te conoce antes de que nacieras (Salmo 139)?`
        }
      ],
      finalExam: [
        {
          id: 'f-poe-1-1',
          question: '¿Qué es el paralelismo en la poesía hebrea?',
          options: ['Repetición de sonidos al final de las palabras.', 'Correspondencia o contraste de pensamientos e ideas entre versos.', 'Uso de instrumentos musicales específicos.', 'Escribir solo en acrósticos.'],
          correctAnswerIndex: 1,
          explanation: 'La rima hebrea es de ideas, no de sonidos, lo que permite que su belleza se preserve en la traducción.'
        }
      ],
      baseVerse: { 
        reference: 'Salmo 119:105', 
        text: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.' 
      },
      commentaries: [
        { author: 'Spurgeon', text: 'El Libro de los Salmos ha sido llamado "El Jardín de las Escrituras", donde florecen todas las flores de la gracia divina.' }
      ],
      assignments: [
        { id: 't-po1', description: 'Identifique 5 profecías mesiánicas en los Salmos y su cumplimiento en el NT.' }
      ]
    }
  ]
};

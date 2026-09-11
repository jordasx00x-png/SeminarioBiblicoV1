import { Course } from '../../types';

export const fundamentosCourse: Course = {
  id: 'fundamentos', // Changing previous 'bases' or similar to 'fundamentos' for clarity
  title: 'Fundamentos de la Vida Cristiana: El ABC del Discípulo',
  type: 'BIBLE_STUDY',
  description: 'Clases esenciales para el crecimiento espiritual, cubriendo desde la familia y la oración hasta la naturaleza del pecado y la esperanza eterna.',
  lessons: [
    {
      id: 'fun-day1',
      day: 1,
      title: 'El Espíritu Santo: Nuestro Consolador y Maestro',
      blocks: [
        {
          type: 'note',
          id: 'fun-d1-reading',
          content: '**Encuentro con el Consolador (45 mins):**\nLea **Juan 14**, **Juan 16**, **Hechos 2** y **Gálatas 5:16-26**. \n\n**Preguntas de Estudio:**\n1. ¿Cuál es el nombre que Jesús da al Espíritu Santo (Juan 14:26)?\n2. ¿De qué convence el Espíritu al mundo (Juan 16:8)?\n3. ¿Cuál es la diferencia entre los dones del Espíritu y el fruto del Espíritu?'
        },
        {
          type: 'text',
          id: 'fun-d1-b1',
          content: `El **Espíritu Santo** no es un "algo" o una influencia mística; Él es una Persona divina, la tercera Persona de la Trinidad. Él tiene voluntad, sentimientos e intelecto. Su misión principal es glorificar a Jesucristo y aplicar la obra de la redención al corazón del creyente. Sin el Espíritu Santo, la Biblia es un libro muerto para nosotros, pero con Su iluminación, se convierte en vida y verdad.\n\nEn el momento de la conversión, el Espíritu Santo realiza varias obras vitales:\n- **Regeneración:** Nos da vida espiritual.\n- **Bautismo:** Nos une al cuerpo de Cristo (la Iglesia).\n- **Morada:** Él viene a vivir permanentemente en nosotros.\n- **Sello:** Garantiza que somos propiedad de Dios hasta el día de la redención final.`
        },
        {
          type: 'text',
          id: 'fun-d1-b2-walk',
          content: `Vivir la vida cristiana es aprender a **"andar en el Espíritu"**. Esto significa rendir nuestra voluntad día a día al control del Espíritu Santo. No es algo que hacemos con nuestras fuerzas, sino por fe. Cuando andamos en el Espíritu, Su carácter (Amor, Gozo, Paz, etc.) comienza a fluir a través de nosotros de forma natural, venciendo los deseos de nuestra vieja naturaleza pecaminosa.`
        },
        {
          type: 'note',
          id: 'fun-d1-reflection',
          content: `**Dependencia Diaria (20 min):**\nEl Espíritu Santo es gentil; Él no nos obligará a obedecer. Él nos guía a través de la Palabra y de una conciencia limpia. \n\n**Reflexión:** ¿Has entristecido al Espíritu Santo hoy con alguna actitud u orgullo? Tómate un tiempo para confesar y pedirle Su llenura (control) nuevamente.`
        }
      ],
      finalExam: [
        {
          id: 'f-fun-1-1',
          question: '¿Quién es el Espíritu Santo?',
          options: ['Una fuerza de energía divina.', 'La tercera Persona de la Trinidad, plenamente Dios.', 'Un ángel especial enviado por Dios.', 'Nuestra propia conciencia mejorada.'],
          correctAnswerIndex: 1,
          explanation: 'La Biblia enseña que el Espíritu Santo es Dios, con todos los atributos de la deidad y personalidad.'
        }
      ],
      baseVerse: { 
        reference: 'Juan 14:16', 
        text: 'Y yo rogaré al Padre, y os dará otro Consolador, para que esté con vosotros para siempre.' 
      },
      commentaries: [
        { author: 'Charles Spurgeon', text: 'Sin el Espíritu Santo no podemos hacer nada; Él es el aliento de nuestra vida espiritual.' }
      ],
      assignments: [
        { id: 't-f1', description: 'Realice una lista de 5 funciones del Espíritu Santo encontradas en Juan 16.' }
      ]
    },
    {
      id: 'fun-day2',
      day: 2,
      title: 'La Familia: El Diseño del Reino en el Hogar',
      blocks: [
        {
          type: 'note',
          id: 'fun-d2-reading',
          content: '**Lectura del Hogar Cristiano (50 mins):**\nLea **Efesios 5:21-6:4**, **Colosenses 3:18-21**, **Génesis 2:18-25** y **1 Pedro 3:1-7**. \n\n**Análisis de Funciones:**\n1. ¿Cuál es el mandato principal para los esposos (Efesios 5:25)?\n2. ¿Cómo deben los hijos honrar a sus padres?\n3. ¿Cuál es el propósito del matrimonio según el diseño original de Dios?'
        },
        {
          type: 'text',
          id: 'fun-d2-b1',
          content: `La **familia** es la institución básica de la sociedad y fue creada por Dios antes que la iglesia o el estado. El matrimonio es un pacto sagrado que refleja la relación entre Cristo y Su Iglesia. El esposo está llamado a liderar con un amor sacrificado, proveyendo y protegiendo a su familia como Cristo lo hace. La esposa está llamada a ser la ayuda idónea, colaborando en unidad y respeto mutuo para cumplir el propósito de Dios en el hogar.\n\nLos hijos son una "herencia de Jehová", no una carga. Los padres tienen la responsabilidad primordial de discipular a sus hijos, no solo llevándolos a la escuela dominical, sino viviendo el Evangelio en el "laboratorio" de la vida diaria: en la mesa, al levantarse y al acostarse.`
        },
        {
          type: 'text',
          id: 'fun-d2-b2-clash',
          content: `En un mundo que ataca el diseño bíblico de la familia, el hogar cristiano debe ser un refugio de paz y verdad. Esto requiere el **perdón mutuo constante**. No hay familias perfectas, sino familias que aplican el Evangelio en sus conflictos. El altar familiar (tiempos de oración y lectura bíblica en casa) es el motor que mantiene sana la salud espiritual del hogar.`
        },
        {
          type: 'note',
          id: 'fun-d2-reflection',
          content: `**Ministrando en Casa (20 min):**\nA veces es más fácil ser amable con los de afuera que con nuestra propia familia. \n\n**Pregunta:** ¿Cuál es un acto concreto de servicio o una palabra de afirmación que puedes dar hoy a un miembro de tu familia para reflejar el amor de Dios?`
        }
      ],
      finalExam: [
        {
          id: 'f-fun-2-1',
          question: '¿Cuál es el modelo para el amor del esposo hacia su esposa?',
          options: ['El modelo de sus propios padres.', 'El amor de Cristo por Su Iglesia.', 'El modelo que dicta la cultura actual.', 'El amor romántico de las películas.'],
          correctAnswerIndex: 1,
          explanation: 'Efesios 5:25 manda a los esposos a amar a sus mujeres "como Cristo amó a la iglesia, y se entregó a sí mismo por ella".'
        }
      ],
      baseVerse: { 
        reference: 'Josué 24:15', 
        text: 'Pero yo y mi casa serviremos a Jehová.' 
      },
      commentaries: [
        { author: 'Matthew Henry', text: 'Tanto el esposo como la esposa deben buscar no ser señores el uno del otro, sino ayudarse mutuamente en el camino al cielo.' }
      ],
      assignments: [
        { id: 't-f2', description: 'Planifique un tiempo de "altar familiar" (oración y lectura) para esta semana y anote los resultados.' }
      ]
    }
  ]
};

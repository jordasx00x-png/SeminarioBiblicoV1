import { Course } from '../../types';

export const pabloCourse: Course = {
  id: 'cartas-pascuales-pablo',
  title: 'Epístolas del Apóstol Pablo: Doctrina, Gracia y Vida de Pacto',
  type: 'BIBLE_STUDY',
  description: 'Un estudio exhaustivo de las cartas paulinas, explorando la justificación por la fe sola, la soberanía de la gracia, la unión con Cristo y la comunión práctica de la Iglesia.',
  lessons: [
    {
      id: 'pablo-day1',
      day: 1,
      title: 'Romanos y Gálatas: Sola Fide y el Evangelio de la Gracia',
      blocks: [
        {
          type: 'note',
          id: 'pablo-d1-reading',
          content: '**Lectura de la Gracia y Justificación (50 mins):**\nLea **Romanos 1-4**, **Romanos 8**, y **Gálatas 1-3**. \n\n**Preguntas de Observación:**\n1. Atienda al diagnóstico universal del pecado humano en Romanos 1:18-3:20.\n2. Busque la definición legal de la justificación imputada por la fe sola en Romanos 3:21-28 y Gálatas 2:15-21.\n3. Note el contraste radical entre las obras de la ley y la promesa soberana del Espíritu.'
        },
        {
          type: 'text',
          id: 'pablo-d1-b1',
          content: `Las epístolas a los **Romanos** y a los **Gálatas** constituyen el manifiesto teológico de la Reforma y la espina dorsal del dogma de la gracia. En ellas, el apóstol Pablo expone con rigor jurídico y fervor pastoral el evangelio de la salvación. El punto de partida es la **Depravación Total** de la humanidad (Romanos 3:23): tanto paganos moralistas como religiosos observantes carecen del estándar moral requerido ante la santidad de Dios. La Ley no se dio para salvar, sino para mostrar la gravedad de nuestra transgresión y sellar nuestra boca ante el juez divino.\n\nFrente al abismo de nuestra maldad, Pablo revela la **Justificación por la fe sola** (*Sola Fide*). Dios justifica al impío no declarando que es inherentemente bueno, sino imputándole legalmente la justicia perfecta de Jesucristo. Cristo pagó el castigo judicial en la cruz, y Su obediencia es cargada a nuestra cuenta por la fe (Romanos 4:3-5). Abraham es el ejemplo supremo de esta fe que cree en Aquel que levanta a los muertos, demostrando que la salvación siempre reposó en la soberanía de la gracia y no en los méritos carnales o circuncisiones humanas.`
        },
        {
          type: 'text',
          id: 'pablo-d1-b2',
          content: `En la epístola a los **Gálatas**, Pablo defiende vehementemente este evangelio ante los judaizantes, quienes querían añadir la circuncisión y la observancia de leyes rituales como requisitos para la justificación. Para Pablo, añadir cualquier mérito humano al sacrificio de la Cruz es "otro evangelio que no es otro" y anula la gracia de Dios (Gálatas 1:6-9; 2:21). \n\nLa verdadera libertad cristiana no es libertinaje carnal, sino la capacidad sobrenatural provista por el **Espíritu Santo** para andar en amor y producir frutos celestiales (Gálatas 5:22-23), habiendo sido crucificados juntamente con Cristo (Gálatas 2:20). Quien ha sido justificado entra de forma inmediata al pacto eterno, convirtiéndose en heredero legítimo de las promesas del Padre por la gracia pura de Cristo.`
        },
        {
          type: 'note',
          id: 'pablo-d1-reflection',
          content: `**El Dios de la Justicia Gratuita (20 min):**\nLa justificación es un veredicto definitivo. Dios ya no está enojado contigo si estás en Cristo. La condenación eterna ha sido borrada para siempre.\n\n**Pregunta:** ¿Sueles recurrir en secreto al legalismo espiritual, midiendo el amor de Dios hacia ti según tus desempeños diarios en lugar de descansar en la justicia imputada de Cristo?`
        }
      ],
      finalExam: [
        {
          id: 'f-pablo-1-1',
          question: '¿Cómo define Pablo la justificación en sus epístolas?',
          options: [
            'Un proceso continuo donde el hombre se hace justo poco a poco mediante buenas obras.',
            'Un veredicto legal donde Dios imputa la perfecta justicia de Cristo al pecador y lo declara justo únicamente por medio de la fe.',
            'Un acuerdo mutuo donde Dios perdona la mitad del pecado y el pecador debe pagar el resto.',
            'Un estado temporal que se pierde con cualquier duda intelectual.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La justificación paulina es forense e imputada: se nos viste espiritualmente con la justicia perfecta de Cristo inmediatamente al depositar nuestra fe en Su sacrificio.'
        }
      ],
      baseVerse: { 
        reference: 'Gálatas 2:20', 
        text: 'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó y se entregó a sí mismo por mí.' 
      },
      commentaries: [
        { author: 'Martin Lutero', text: 'La doctrina de la justificación por la fe sola es el artículo sobre el cual la iglesia se sostiene o cae; si se pierde esta verdad, se pierde el evangelio por entero y reina la oscuridad.' }
      ],
      assignments: [
        { id: 't-pa1', description: 'Redacte una tabla comparativa sobre el papel de la Ley de Moisés según Gálatas 3 y Romanos 7.' }
      ]
    },
    {
      id: 'pablo-day2',
      day: 2,
      title: 'Efesios, Colosenses y Filipenses: La Supremacía de Cristo y el Misterio de la Iglesia',
      blocks: [
        {
          type: 'note',
          id: 'pablo-d2-reading',
          content: '**Lectura de la Gloria de Cristo (50 mins):**\nLea **Efesios 1-2**, **Colosenses 1-2**, y **Filipenses 1-2**. \n\n**Puntos clave:**\n1. Examine la soberanía y elección del Padre antes de la fundación del mundo (Efesios 1:3-14).\n2. Note el extraordinario Himno Cristológico en Colosenses 1:15-20, evaluando Su supremacía en la creación y redención.\n3. Medite en el ejemplo de humillación voluntaria de Cristo en Filipenses 2:5-11.'
        },
        {
          type: 'text',
          id: 'pablo-d2-b1',
          content: `Las epístolas escritas en prisión presentan las alturas más sublimes de la revelación de la persona de Cristo. En **Colosenses**, Pablo refuta las herejías gnósticas y místicas exaltando el carácter absoluto de la **Deidad de Jesús**. Él es la imagen visible del Dios invisible, el primogénito sobre toda la creación, y en Él habita corporalmente toda la plenitud de la deidad (Colosenses 1:15, 2:9). No necesitamos filosofías huecas ni intermediarios espirituales astrales: Cristo es Suficiente.\n\nEn **Efesios**, Pablo desvela el **Misterio de la Iglesia**, que trasciende barreras étnicas y geográficas. Es el cuerpo místico y el templo santo del Espíritu Santo, edificado sobre el fundamento de apóstoles y profetas. Dios eligió de forma soberana a Su pueblo desde la eternidad para alabanza de la gloria de Su gracia, dándoles vida cuando estaban espiritualmente muertos en sus delitos y pecados (Efesios 2:1-5).`
        },
        {
          type: 'text',
          id: 'pablo-d2-b2',
          content: `En **Filipenses**, por su parte, abunda el gozo triunfal e inquebrantable que prevalece sobre el sufrimiento mundano. Pablo enseña que para el creyente "el vivir es Cristo, y el morir es ganancia" (Filipenses 1:21). El **Himno de Cristo** (*Kenosis*) en Filipenses 2:5-11 detalla el camino de la exaltación mediante la humillación: el Verbo eterno se despojó del uso independiente de Sus atributos divinos, adoptando forma de siervo, y se humilló a sí mismo hasta la muerte de cruz. Por lo cual Dios lo exaltó soberanamente dándole el Nombre sobre todo nombre.\n\nEste misterio de nuestra unión con Cristo modela la forma en que los discípulos deben vivir e interactuar en comunidad, reflejando una mente humilde, sacrificial, desinteresada y rebosante del gozo inmutable que brota del cielo.`
        },
        {
          type: 'note',
          id: 'pablo-d2-reflection',
          content: `**La Supremacía de la Suficiencia (20 min):**\nEn Cristo estamos completos. Ninguna circunstancia externa, opresión política, encierro o debilidad física puede arrebatarnos del amor soberano del Verbo eterno.\n\n**Pregunta:** ¿Cómo inspira la humillación y el servicio voluntario de Jesús tu disposición diaria a perdonar y servir en medio de los conflictos cotidianos?`
        }
      ],
      finalExam: [
        {
          id: 'f-pablo-2-1',
          question: 'De acuerdo con Colosenses 1 y 2, ¿cuál es la posición real de Cristo?',
          options: [
            'Un gran maestro espiritual que nos ayuda a acercarnos a Dios basándose en el intelecto.',
            'La cabeza suprema del universo, creador absoluto de todo lo visible e invisible, en quien habita corporalmente toda la plenitud divina.',
            'Un mensajero angélico menor en la escala jerárquica del cosmos.',
            'Una idea poética inventada en la Edad Media para calmar a los desfavorecidos.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Colosenses proclama de manera contundente la Deidad absoluta de Cristo y Su supremacía cósmica total sobre toda la creación y la obra de reconciliación redentora.'
        }
      ],
      baseVerse: { 
        reference: 'Colosenses 1:16-17', 
        text: 'Porque en él fueron creadas todas las cosas... todo fue creado por medio de él y para él. Y él es antes de todas las cosas, y todas las cosas en él subsisten.' 
      },
      commentaries: [
        { author: 'Juan Calvino', text: 'La Iglesia es el cuerpo de Cristo; por lo tanto, no se puede dividir Su herencia sin dividirlo a Él, lo que constituye un sacrilegio contra Su gloria eterna.' }
      ],
      assignments: [
        { id: 't-pa2', description: 'Investigue la geografía e historia de la antigua ciudad de Éfeso, y explique la importancia sociocultural del templo de Diana en relación con Efesios 2.' }
      ]
    }
  ]
};

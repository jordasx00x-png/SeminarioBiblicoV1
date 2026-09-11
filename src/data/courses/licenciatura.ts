import { Course } from '../../types';

export const teologiaSistematicaSuperior: Course = {
  id: 'lic-teologia-sistematica',
  title: 'Licenciatura: Teología Sistemática Superior (Soteriología y Escatología)',
  type: 'LICENCIATURA' as any, // Cast as we will expand types.ts
  durationMonths: 8,
  description: 'Un escrutinio exhaustivo y de nivel de posgrado sobre los decretos eternos, la expiación definida, el orden de la salvación (Ordo Salutis) de carácter monergista, los pactos divinos, las variantes infralapsarianas y supralapsarianas, y los modelos de interpretación escatológica.',
  lessons: [
    {
      id: 'lic-tss-day1',
      day: 1,
      title: 'El Ordo Salutis: El Orden Sobrenacional de la Redención',
      blocks: [
        {
          type: 'note',
          id: 'lic-tss-d1-reading',
          content: '**Lectura de Investigación Superior Integral de Posgrado (60 mins):**\nLea comprensivamente **Romanos 8:28-30**, **Efesios 1:3-14**, **Juan 6:37-44** y de forma avanzada los **Cánones del Sínodo de Dort (Primer Punto de Doctrina)**. \n\n**Preguntas de Análisis Técnico y Exegesis Hermenéutica:**\n1. ¿Cuál es el significado gramatical y morfológico del término griego para "Presciencia" (Prognosis) en Romanos 8:29, y por qué el monergismo sostiene que no equivale a una simple previsión pasiva de la fe futura del hombre?\n2. Identifique las bases filosóficas y bíbicas por las cuales la regeneración antecede ontológica y lógicamente a la fe salvadora en el monergismo de la Reforma ortodoxa.\n3. Diferencie de forma sistemática entre la llamada externa u *offerta* general del Evangelio hecha a toda criatura y el llamamiento selectivo eficaz o interno obrado por el Espíritu Santo.'
        },
        {
          type: 'text',
          id: 'lic-tss-d1-b1',
          content: `El **Ordo Salutis** (Orden de la Salvación) es un término técnico sistemático que describe el encadenamiento teológico, conceptual y lógico de las diversas etapas del proceso redentor aplicadas por la gracia del Espíritu Santo al pecador elegido. No debe comprenderse como una secuencia cronológicamente lineal o una serie de eventos aislados en el tiempo, sino como un lazo indestructible e irreversible de soberbia soberanía trinitaria.\n\nLa estructura reformada ortodoxa del Ordo Salutis postula de manera precisa el siguiente encadenamiento:\n\n1. **Predestinación, Presciencia y Elección Soberana:** El decreto eterno, incondicional e inmutable de Dios ejecutado antes de la fundación del mundo por beneplácito de Su sola gracia.\n2. **Llamamiento Eficaz (Interno e Irresistible):** La obra soberana del Espíritu Santo obrando a través de la proclamación de la Palabra, iluminando las mentes ciegas y resucitando el alma dormida del elegido.\n3. **Regeneración o Nuevo Nacimiento:** Un acto creativo, instantáneo y exclusivamente divino (monergista) por el cual Dios implanta un nuevo principio de vida espiritual en el alma, removiendo el corazón de piedra e infundiendo un corazón de carne capaz de amarle.\n4. **Conversión (Fe Salvadora y Arrepentimiento Sanador):** La respuesta activa, consciente e inmediata del pecador regenerado. Al recibir ojos espirituales, se arrepiente verdaderamente e interactúa rindiéndose ante el Redentor sustituto en fe sincera.\n5. **Justificación Forense:** El veredicto judicial perfecto del Padre, donde imputa legalmente la justicia perfecta activa y pasiva del Señor Jesucristo al creyente y declara pagada toda su deuda condenatoria.\n6. **Adopción Filial:** El ingreso de carácter gubernamental y legal del justificado a la familia divina, concediéndole todos los derechos, privilegios e inestimable herencia de los hijos legítimos de Dios.\n7. **Santificación Progresiva:** El proceso cooperativo (sinergismo místico de gracia regulada) de madurez espiritual progresiva, donde el Espíritu capacita al creyente para morir diariamente al pecado y vivir para la justicia.\n8. **Perseverancia de los Santos:** La incuestionable fe activa sostenida y preservada unilateralmente por Dios, asegurando que ningún verdadero regenerado se pierda eternamente.\n9. **Glorificación Escatológica:** La total perfección física e incorruptible recibida por los santos en la resurrección general corporal.`
        },
        {
          type: 'text',
          id: 'lic-tss-d1-b2',
          content: `El debate soteriológico central e histórico divide radicalmente el **monergismo** y el **sinergismo**. El sinergismo (presente en el arminianismo y el semipelagianismo) declara que el llamado divino espera la decisión neutral y autónoma del libre albedrío humano para coparticipar en la regeneración. En contraste absoluto, el monergismo clásico enseña que el hombre, al encontrarse muerto en sus delitos y pecados (Efesios 2:1), posee una ceguera e incapacidad total; por tanto, requiere de forma indispensable recibir la vida espiritual mediante la regeneración *antes* de que sea ontológicamente capaz de manifestar cualquier inclinación o fe salvadora verdadera en Dios.\n\nAdicionalmente, se estudia dentro de la sistemática de los decretos la diferencia teológica entre:\n- **Supralapsarianismo:** El punto de vista extremo que sitúa el decreto divino de elección y reprobación lógicamente *antes* del decreto de permitir la caída del ser humano.\n- **Infralapsarianismo:** El modelo ortodoxo ampliamente mayoritario que sitúa el decreto de elección y reprobación lógicamente *después* del decreto de permitir la caída, viendo a los hombres en el decreto de elección como pecadores ya caídos que necesitan redención.`
        },
        {
          type: 'note',
          id: 'lic-tss-d1-summary',
          content: `**Conclusión Académica Rigurosa:**\nLa justificación es un acto legal representativo perfectísimo, forense e instantáneo que imputa justicia, mientras que la santificación es un proceso perfectible y progresivo de por vida que imparte justicia. Confundir ambos destruye el núcleo teológico del Evangelio.`
        }
      ],
      finalExam: [
        {
          id: 'f-tss-1',
          question: '¿Por qué en el monergismo la regeneración precede lógicamente a la fe salvadora?',
          options: [
            'Porque la fe es una obra humana natural que convence a Dios de salvarnos.',
            'Porque un pecador que está espiritualmente muerto necesita recibir vida espiritual nueva por gracia divina para poder ejercer fe genuina.',
            'Porque el bautismo de agua otorga la salvación mecánica sin necesidad de fe.',
            'No hay precedencia lógica, ocurren meses después de manera separada.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La regeneración es la resurrección espiritual efectuada de forma soberana por el Espíritu Santo, capacitando la posterior fe del pecador redimido.'
        }
      ],
      baseVerse: {
        reference: 'Romanos 8:30',
        text: 'Y a los que predestinó, a éstos también llamó; y a los que llamó, a éstos también justificó; y a los que justificó, a éstos también glorificó.'
      },
      commentaries: [
        { author: 'Dr. R.C. Sproul', text: 'La fe no causa la regeneración. La regeneración es la causa soberana de la fe.' }
      ],
      assignments: [
        { id: 't-tss-1', description: 'Elabore un ensayo de 500 palabras comparando detalladamente los decretos de salvación monergistas frente a los sinergistas.' }
      ]
    },
    {
      id: 'lic-tss-day2',
      day: 2,
      title: 'Modelos Escatológicos y la Estructura de los Pactos',
      blocks: [
        {
          type: 'text',
          id: 'lic-tss-d2-b1',
          content: `El término **Escatología** no se circunscribe únicamente al estudio cronológico del fin del mundo, sino a la culminación del Reino de Jesucristo en la historia de la redención. Existen tres interpretaciones principales acerca del Reinado Milenial en Apocalipsis 20:\n\n- **Amilenialismo:** Sostiene que el "milenio" es una cifra simbólica que representa el reinado espiritual actual de Cristo desde Su ascensión hasta Su regreso físico personal, donde se librará el juicio final y la restauración de los cielos y tierra nuevos.\n- **Premilenialismo:** Postula que el retorno visible de Jesucristo precederá conceptual y geográficamente a un reinado literal de mil años sobre la tierra física dominando las naciones desde Jerusalén.\n- **Postmilenialismo:** Sigue la idea de que la propagación global del Evangelio y la influencia transformadora de la Iglesia cristianizarán progresivamente la tierra, preparando un milenio de paz y rectitud tras el cual Cristo retornará físicamente.`
        },
        {
          type: 'text',
          id: 'lic-tss-d2-b2',
          content: `Toda la Escatología está ligada con la **Teología de los Pactos** o el **Dispensacionalismo**. Ambas macro-estructuras interpretan las promesas de Dios al Israel histórico y la Iglesia de formas contrastantes: la Teología del Pacto observa una continuidad orgánica y redentora bajo un único "Pacto de Gracia", donde la Iglesia es la herencia de las promesas de Abraham; el Dispensacionalismo clásico postula una distinción estricta de orden escatológico, legal, y terrenal entre Israel y la Iglesia de Cristo.`
        }
      ],
      finalExam: [
        {
          id: 'f-tss-2',
          question: '¿Qué sostiene la perspectiva Amilenial clásica?',
          options: [
            'Que el milenio es un periodo literal de 1000 años ubicado en el pasado intermedio de la tierra.',
            'Que el milenio es una cifra simbólica que representa el reinado espiritual de Cristo en la era de la Iglesia contemporánea.',
            'Que no existe el cielo ni el infierno, y la muerte terrenal es la desaparición absoluta del alma.',
            'La creencia de que la tierra será gobernada por imperios feudales eternos de forma aleatoria.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El amilenialismo entiende el milenio como el reinado de Cristo que inició con Su ascensión, donde resalta Su autoridad definitiva y soberana sobre Su pueblo espiritual.'
        }
      ],
      baseVerse: {
        reference: 'Hebreos 13:20',
        text: 'Y el Dios de paz que resucitó de los muertos a nuestro Señor Jesucristo, el gran pastor de las ovejas, por la sangre del pacto eterno...'
      }
    },
    {
      id: 'lic-tss-day3',
      day: 3,
      title: 'Pactos Bíblicos: Estructuración Orgánica de la Teología Federal',
      blocks: [
        {
          type: 'text',
          id: 'lic-tss-d3-b1',
          content: `La **Teología Federal o de los Pactos** organiza la verdad bíblica en torno a los pactos solemnes que Dios ha establecido con la humanidad a través de representantes federales. Se identifican tres pactos ontológicos primarios:\n\n1. **Pacto de Redención (*Pactum Salutis*):** El pacto eterno intraterrenal e intratrinitario entre el Padre y el Hijo antes del tiempo, donde el Hijo se ofreció a asumir nuestra naturaleza y pagar la deuda legal de la elección.\n2. **Pacto de Obras:** Establecido originalmente con Adán en el Jardín del Edén. Exigía obediencia perfecta y personal como condición para la vida eterna y la filiación, el cual fue quebrantado por la caída imputando culpa a toda su posteridad.\n3. **Pacto de Gracia:** Ejecutado por Jesucristo (el segundo Adán) tras el fracaso del hombre, donde Dios ofrece libremente vida y salvación por medio de la fe en el Redentor sustituto, quien cumplió perfectamente el Pacto de Obras en nuestro lugar.`
        }
      ],
      finalExam: [
        {
          id: 'f-tss-3',
          question: '¿Qué es el "Pactum Salutis" o Pacto de Redención en la Teología Federal?',
          options: [
            'Un acuerdo temporal firmado por los obispos de Roma en el siglo IV.',
            'El pacto intratrinitario eterno entre el Padre y el Hijo para la redención de los escogidos.',
            'El tratado pacífico con los gobernantes locales de Israel en la era monárquica.',
            'Un canon místico que permite evitar el arrepentimiento formal.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El Pactum Salutis describe el designio eterno e intratrinitario donde Cristo pacta con el Padre ser el Mediador y fiador de la salvación de Su pueblo escogido.'
        }
      ],
      baseVerse: {
        reference: 'Efesios 1:4',
        text: 'Según nos escogió en él antes de la fundación del mundo, para que fuésemos santos y sin mancha delante de él...'
      }
    },
    {
      id: 'lic-tss-day4',
      day: 4,
      title: 'La Glorificación, Resurrección General y el Estado Eterno',
      blocks: [
        {
          type: 'text',
          id: 'lic-tss-d4-b1',
          content: `La etapa final del Ordo Salutis es la **Glorificación**. Este acto soberano representa la consumación última de la salvación, donde el creyente redimido es perfeccionado tanto en alma como en cuerpo físico resucitado, siendo librado absolutamente de toda presencia, poder, y consecuencia del pecado originario.\n\nSucesos del Escatón Final:\n- **La Resurrección Corporal:** El creyente no habitará la eternidad como un espectro místico incorpóreo. Así como Cristo resucitó corporalmente venciendo al sepulcro, los santos recibirán cuerpos glorificados, incorruptibles, poderosos y espirituales (1 Corintios 15).\n- **El Juicio Final:** Toda criatura comparecerá ante el trono judicial de Cristo. Los creyentes serán vindicados públicamente no por mérito personal, sino por la perfecta imputed righteousness de Jesucristo registrada en el Libro de la Vida.\n- **Tierra Nueva y Cielos Nuevos:** La creación entera será redimida y restaurada de la maldición del pecado, sirviendo como escenario eterno de la comunión sin velo entre el Creador y Su pueblo.`
        }
      ],
      finalExam: [
        {
          id: 'f-tss-4',
          question: '¿En qué consiste el estado de Glorificación final para el creyente?',
          options: [
            'La disolución completa del espíritu humano para fundirse con la energía cósmica.',
            'La restauración y perfeccionamiento definitivo del alma y la resurrección corporal incorruptible de los santos para reinar con Dios en justicia.',
            'Una existencia fantasmal vaga sin identidad ni memoria de la vida terrenal anterior.',
            'El traslado periódico e infinito del creyente entre distintos planetas materiales.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La glorificación proporciona la resurrección corporal incorruptible y la renovación de la creación entera para la comunión pacífica y gozosa con Dios.'
        }
      ],
      baseVerse: {
        reference: '1 Corintios 15:52',
        text: 'En un momento, en un abrir y cerrar de ojos, a la final trompeta; porque se tocará la trompeta, y los muertos serán resucitados incorruptibles, y nosotros seremos transformados.'
      }
    }
  ]
};

export const hermeneuticaIdiomasBiblicos: Course = {
  id: 'lic-idiomas-biblicos',
  title: 'Licenciatura: Hermenéutica Superior e Idiomas Bíblicos',
  type: 'LICENCIATURA' as any,
  durationMonths: 7,
  description: 'Un estudio filológico y exegético exhaustivo de la morfología, sintaxis avanzada y aspectos verbales del Griego Koiné del Nuevo Testamento, junto con nociones profundas de la lingüística del Hebreo de la Tanaj bíblica, su paralelismo poético y la ciencia de la Crítica Textual.',
  lessons: [
    {
      id: 'lic-hib-day1',
      day: 1,
      title: 'Estructuras Lingüísticas del Griego Koiné',
      blocks: [
        {
          type: 'text',
          id: 'lic-hib-d1-b1',
          content: `El Nuevo Testamento fue redactado por provisión divina en **Griego Koiné**, el lenguaje común, versátil y popular desarrollado a partir del dialecto ático tras las conquistas macedónicas. Lejos de constituir un idioma críptico o exclusivamente litúrgico, resalta en la antigüedad clásica por su extraordinaria precisión analítica, su flexibilidad verbal y su rigor de matización sintáctica. El estudio científico y estructurado de su sistema flexivo y morfológico es la herramienta exegética más valiosa para evitar anacronismos o generalizaciones teológicas modernas erróneas.\n\nEstructuras de Sintaxis Críticas indispensables:\n\n- **El Sistema de Flexión y Casos:** A diferencia de las lenguas romances contemporáneas (que estructuran las oraciones de forma rígida basada en el orden sintáctico), el griego declina sus nombres, adjetivos y participios mediante desinencias (terminaciones específicas) que delimitan exactamente su papel gramatical y teológico en el texto. Sus cinco casos principales son:\n  1. *Nominativo:* El caso del sujeto oracional o del predicado nominal.\n  2. *Genitivo:* El caso de la posesión, origen, descripción cualitativa o separación (ablativo).\n  3. *Dativo:* El caso del interés, objeto indirecto, instrumento (instrumental) o locación (locativo).\n  4. *Acusativo:* El caso de la limitación o del objeto directo de la acción verbal.\n  5. *Vocativo:* El caso de interpelación o de apelación personal directa.\n\n- **El Aspecto Verbal (Semántica de la Acción):** En el sistema verbal del griego koiné, la noción central del verbo no reposa primordialmente en el *tiempo cronológico* (cuándo ocurre: pasado, presente, futuro), sino en la perspectiva o **aspecto de la acción** (cómo es presentada por el autor). El aspecto puede ser:\n  1. *Aorístico (Cerrado/Puntual):* Concibe la acción como un hecho histórico globalizado y cerrado, sin detallar su progreso interno.\n  2. *Presente o Imperfecto (Progresivo/Durativo):* Enfoca la acción de forma continua, lineal, repetitiva o en desarrollo actual.\n  3. *Perfecto (Consumado/Permanente):* Describe una acción completamente consumada en el pasado cuyos efectos duraderos permanecen plenamente vigentes en el presente (muy relevante en declaraciones soteriológicas como el "Tetélestai" [Consumado es] de Juan 19:30).`
        },
        {
          type: 'note',
          id: 'lic-hib-d1-greek-examples',
          content: `**Caso de Estudio Exegético Avanzado (Juan 1:1):**\nEn el texto griego, la frase 'kai theos en ho logos' (y/entonces Dios era el Verbo) carece del artículo definido 'ho' antes del sustantivo 'theos'. Esto no obedece a un descuido sintáctico del apóstol, sino a la aplicación rigurosa de las leyes gramaticales del griego helenístico:\n\n1. Al colocar el artículo únicamente delante de 'logos' ('ho logos'), se identifica de forma inequívoca al Verbo como el sujeto de la cópula verbal 'en' (era).\n2. Al omitir deliberadamente el artículo definido antes de 'theos', se resalta la cualidad, esencia o naturaleza divina de la Persona del Verbo. El autor declara que el Verbo poseía en Sí mismo toda la dimensión y los atributos de la deidad esencial del Padre, pero sin confundirse personalmente con el Padre (salvaguardando la trinidad contra la herejía sabeliana o del modalismo monarquiano).\n\nSi el apóstol hubiese escrito 'kai ho theos en ho logos', la proposición resultaría reversible y obligaría lógicamente al sabelianismo (declarando que el Verbo es exactamente la misma Persona que el Padre). Si hubiese omitido 'theos' de forma categórica, se reduciría Su dignidad absoluta. La gramática griega provee así la mayor precisión trinitaria.`
        }
      ],
      finalExam: [
        {
          id: 'f-hib-1',
          question: '¿Qué caracteriza el tiempo verbal "Aoristo" en el griego del Nuevo Testamento?',
          options: [
            'Describe un futuro hipotético que sólo ocurrirá si se cumplen profecías específicas.',
            'Indica una acción continua, repetitiva y persistente que nunca se completa.',
            'Presenta la acción de manera global e indefinida, como un hecho completo y cerrado en sí mismo, sin enfocar su duración en el tiempo.',
            'Un término que describe la destrucción poética de los manuscritos literarios.'
          ],
          correctAnswerIndex: 2,
          explanation: 'El aoristo es el aspecto sustancial por excelencia de la lengua griega, utilizado frecuentemente para enunciar acontecimientos salvíficos definitivos o históricos singulares.'
        }
      ],
      baseVerse: {
        reference: 'Juan 1:1',
        text: 'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.'
      }
    },
    {
      id: 'lic-hib-day2',
      day: 2,
      title: 'Sintaxis del Hebreo Bíblico y Estructura Poética',
      blocks: [
        {
          type: 'text',
          id: 'lic-hib-d2-b1',
          content: `El **Hebreo Bíblico** pertenece a la family de lenguas semíticas, caracterizándose por ser eminentemente concreto, dinámico y arraigado en la acción tangible. Mientras la mente grecorromana es abstracta y formal, el pensamiento hebreo se expresa mediante analogías de la naturaleza y metáforas vivenciales corporales.\n\nEl sistema verbal semítico no define el tiempo absoluto, sino el estado de la acción:\n- **Perfecto:** La acción se concibe como terminada, resuelta e irrevocable (por ello muy usado en profecías que se dan por seguras).\n- **Imperfecto:** La acción se percibe como incompleta, progresiva, recurrente o en desarrollo.\n\nUn rasgo literario central de su poesía y profecía es el **Paralelismo Hebreo**. Consiste en repetir y expandir el pensamiento de una línea (Estrofa A) en la siguiente (Estrofa B). Se organizan de forma **Sinonímica** (cuando la segunda aclara o refuerza a la primera con términos análogos), **Antitética** (donde contrasta la rectitud y la maldad, frecuente en Proverbios), o **Sintética** (donde la segunda línea completa o expande la información de la primera).`
        }
      ],
      finalExam: [
        {
          id: 'f-hib-2',
          question: '¿Qué es el Paralelismo Antitético en la literatura poética hebrea?',
          options: [
            'Repetir exactamente lo mismo en dos líneas usando las mismas palabras griegas.',
            'Contrastar el pensamiento de la primera línea con una declaración contraria o de juicio en la segunda para resaltar los opuestos morales.',
            'Inventar profecías enigmáticas sobre el fin del imperio babilónico secular.',
            'Un error idiomático surgido al traducir los pergaminos arameos al latín vulgar.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El paralelismo antitético opone ideas éticas o existenciales paralelas, un recurso clásico de la literatura sapiencial (ej: "El hijo sabio alegra al padre, pero el hijo necio es tristeza de su madre").'
        }
      ],
      baseVerse: {
        reference: 'Salmo 119:105',
        text: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.'
      }
    },
    {
      id: 'lic-hib-day3',
      day: 3,
      title: 'Transmisión del Texto y Crítica Textual del Testamento Sagrado',
      blocks: [
        {
          type: 'text',
          id: 'lic-hib-d3-b1',
          content: `La **Crítica Textual** es la disciplina científica que examina los miles de manuscritos bíblicos antiguos (papiros, unciales, minúsculos, y leccionarios) con el fin de reconstruir con la mayor exactitud posible las lecturas originales de los autógrafos sagrados.\n\nNo poseemos los pergaminos originales escritos por el puño de los apóstoles o profetas, sino copias de copias. Sin embargo, la providencia de Dios ha preservado Su Palabra a través de una riqueza documental inigualable (más de 5,800 manuscritos griegos del NT).\n\nLos críticos textuales emplean reglas estrictas de evidencia interna y externa:\n- **Lectio Brevior Praeferenda (La lectura más corta es preferible):** Es menos probable que un copista omitiera información adrede a que añadiera glosas explicativas en los márgenes.\n- **Lectio Difficilior Potior (La lectura más difícil es preferible):** Los copistas tendían a suavizar o corregir pasajes teológicamente complejos o gramaticalmente difíciles, mas no a crearlos.`
        }
      ],
      finalExam: [
        {
          id: 'f-hib-3',
          question: '¿Cuál es el propósito fundamental de la Crítica Textual bíblica?',
          options: [
            'Crear nuevas doctrinas místicas ajenas a la tradición clásica de la Iglesia.',
            'Evaluar las variantes en las copias manuscritas antiguas para recuperar con fidelidad científica e histórica las palabras exactas de los autógrafos originales.',
            'Demostrar que todos los evangelios son falsos escritos medievales sin valor divino.',
            'Traducir mecánicamente la Biblia a dialectos autóctonos de la edad neolítica.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La crítica textual no debilita la fe, sino que corrobora científicamente la impresionante exactitud e inalterabilidad histórica de las Escrituras.'
        }
      ],
      baseVerse: {
        reference: 'Isaías 40:8',
        text: 'Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre.'
      }
    },
    {
      id: 'lic-hib-day4',
      day: 4,
      title: 'Falacias Hermenéuticas y exégesis rigurosa',
      blocks: [
        {
          type: 'text',
          id: 'lic-hib-d4-b1',
          content: 'Una exégesis deficiente produce doctrinas erróneas y abusos prácticos. El biblista D.A. Carson identifica varias **Falacias Hermenéuticas** comunes en las que caen frecuentemente maestros sin formación rigurosa:\n\n1. **Falacia de la Raíz:** Creer erróneamente que el significado de una palabra siempre está determinado por su origen etimológico (por ejemplo, definir la fuerza moral de "iglesia" a partir del término griego *ekklesia* como únicamente "los llamados afuera"). El uso contemporáneo de la palabra determina su significado real, no su raíz filológica.\n2. **Anacronismo Semántico:** Consiste en interpretar palabras bíblicas antiguas usando definiciones conceptuales derivadas de épocas o discusiones teológicas muy posteriores.'
        }
      ],
      finalExam: [
        {
          id: 'f-hib-4',
          question: '¿En qué consiste la "Falacia de la Raíz" en la hermenéutica bíblica?',
          options: [
            'Asumir que las plantas mencionadas en las parábolas tienen significados mágicos.',
            'Garantizar que el valor semántico de una palabra en un texto está limitado de por vida a su raíz etimológica, ignorando que el significado real es determinado por el contexto de uso habitual de la época.',
            'Afirmar que toda interpretación bíblica debe centrarse exclusivamente en el libro de Génesis.',
            'Olvidar traducir los modismos griegos al idioma arameo antiguo.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La etimología puede dar matices históricos, pero el significado de cualquier término hebreo o griego se determina de forma soberana por su contexto inmediato de uso literario.'
        }
      ],
      baseVerse: {
        reference: '2 Timoteo 2:15',
        text: 'Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad.'
      }
    }
  ]
};

export const historiaDelDogma: Course = {
  id: 'lic-historia-dogma',
  title: 'Licenciatura: Historia del Dogma Cristiano y la Reforma Protestante',
  type: 'LICENCIATURA' as any,
  durationMonths: 6,
  description: 'Análisis minucioso del desarrollo confesional, hermenéutico e histórico dogmático de la Iglesia, desde los cinco concilios ecuménicos de la antigüedad tardía frente a las herejías primitivas, hasta las confesiones de fe continentales de la Reforma luterana y reformada del siglo XVI.',
  lessons: [
    {
      id: 'lic-hdd-day1',
      day: 1,
      title: 'Las Heresías Cristológicas y los Concilios Ecuménicos Primitivos',
      blocks: [
        {
          type: 'text',
          id: 'lic-hdd-d1-b1',
          content: 'La defensa formal y sistemática de las verdades medulares de la fe cristiana exigió que el liderazgo teológico primitivo articulara de manera precisa el dogma trinitario frente a numerosas corrientes interpretativas desviadas que surgieron en los primeros siglos. Los concilios ecuménicos marcaron las directrices de la ortodoxia histórica frente a las herejías:\n\n1. **Concilio de Nicea (325 d.C.):** Convocado fundamentalmente bajo el obispado de Atanasio de Alejandría para contrarrestar de lleno la influyente herejía del **arrianismo** (enseñada por Arrio de Alejandría, quien postulaba que el Hijo poseía una esencia inferior al Padre, siendo la primera criatura creada y no deidad absoluta). El concilio ratificó doctrinalmente el uso del controvertido término griego **homoousios** (exactamente de la misma sustancia, co-igual y co-esencial con la del Padre), consolidando la divinidad intemporal de Jesucristo.\n\n2. **Concilio de Constantinopla (381 d.C.):** Confirmó definitivamente el credo trinitario proclamado en Nicea, denunciando las doctrinas de los macedonianos (los *pneumatómacos* o detractores de la naturaleza del Espíritu), al fijar de forma rigurosa que el Espíritu Santo procede eternamente glorificado y debe adorarse en paridad con el Padre y con el Hijo en una única esencia soplada.\n\n3. **Concilio de Éfeso (431 d.C.):** Condenó de forma categórica el **nestorianismo** (la escuela del patriarca Nestorio, quien sostendría una separación tan rígida de las naturalezas divina y humana del Redentor que lógicamente concebía a Cristo como dos personas asociadas moralmente en un mismo cuerpo). El sínodo afirmó la indivisibilidad de Su única Persona y sancionó el uso doctrinal del título *Theotokos* (madre del Cristo Dios hecho hombre, asegurando que Aquel nacido en la carne poseía intrínsecamente naturaleza divina suprema).\n\n4. **Concilio de Calcedonia (451 d.C.):** Ofreció la bellísima y definitiva formulación dogmática sobre la **Unión Hipostática** contra la disidencia del monofisismo capitaneado por Eutiques (que postulaba la total desaparición o disolución de la naturaleza humana de Jesús fundida dentro de la naturaleza divina). Se reitera así que en el único Mediador coexisten simétricamente **dos naturalezas completas y perfectas (divina y humana)** unidas idénticamente en una sola Persona *sin confusión, sin cambio, sin división y sin separación*.'
        }
      ],
      finalExam: [
        {
          id: 'f-hdd-1',
          question: '¿Qué condena y aclara teológicamente el Concilio de Calcedonia en el 451 d.C.?',
          options: [
            'Prohíbe la lectura literal del apocalipsis determinando que toda la Biblia es mitológica.',
            'Establece la doctrina de la transubstanciación en los ritos feudales papales.',
            'Confiesa una sola persona trina que asume tres formas impersonales cambiantes.',
            'Previene la mezcla y confusión de las naturalezas divina y humana en Cristo, formulando su unión hipostática sin confusión, cambio, división o separación.'
          ],
          correctAnswerIndex: 3,
          explanation: 'Calcedonia consolida doctrinalmente la teología patrística de la encarnación, declarando que Jesucristo es verdadero Dios y verdadero hombre.'
        }
      ],
      baseVerse: {
        reference: 'Judas 1:3',
        text: 'Amados, por la gran solicitud que tenía de escribiros acerca de nuestra común salvación, me ha sido necesario escribiros exhortándoos que contendáis ardientemente por la fe que ha sido una vez dada a los santos.'
      }
    },
    {
      id: 'lic-hdd-day2',
      day: 2,
      title: 'Las Cinco Solas y el Desarrollo Teológico Reformado',
      blocks: [
        {
          type: 'text',
          id: 'lic-hdd-d2-b1',
          content: 'La **Reforma Protestante** del siglo XVI no representó la invención de una nueva religión, sino un retorno y recuperación providencial de la pureza apostólica y la supremacía de la gracia de Dios sobre la degeneración de la iglesia medieval. Esta gesta se asienta formalmente sobre las **Cinco Solas**:\n\n- **Sola Scriptura (Solo la Escritura):** La Palabra de Dios como la única autoridad suprema e infalible reguladora del dogma. No anula concilios históricos o maestros, sino que los subordina judicialmente al canon bíblico.\n- **Sola Fide (Solo por la Fe):** El medio instrumental único de justificación, excluyendo méritos, satisfacciones pecuniarias o indulgencias penitenciales.\n- **Sola Gratia (Solo por Gracia):** La causa eficiente absoluta de la salvación eterna de las almas.\n- **Solus Christus (Solo Cristo):** Cristo Jesús es el único mediador y sumo sacerdote sustituto perpetuo.\n- **Soli Deo Gloria (Solo a Dios sea la Gloria):** El fin supremo, inmutable e integral de la existencia de toda la creación.'
        }
      ],
      finalExam: [
        {
          id: 'f-hdd-2',
          question: '¿Qué papel normativo asume Sola Scriptura?',
          options: [
            'Prohíbe cualquier estudio histórico ajeno a los versículos textuales del Génesis.',
            'Coloca a las Escrituras bíblicas como la máxima e infalible regla de fe y de obediencia, bajo la cual debe subordinarse la tradición de la Iglesia y los credos humanos.',
            'Exige memorizar el texto bíblico en latín medieval para la salvación real de los hogares.',
            'Sostiene que la revelación continua de los apóstoles contemporáneos prevalece sobre profecías pasadas.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Sola Scriptura es el principio formal de la Reforma, instando a que sólo la divina palabra de Dios, depositada en el canon sagrado, juzgue autoritativamente las ideas humanas.'
        }
      ],
      baseVerse: {
        reference: 'Efesios 2:8',
        text: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.'
      }
    },
    {
      id: 'lic-hdd-day3',
      day: 3,
      title: 'El Periodo Confesional y Escritos Históricos de Fe',
      blocks: [
        {
          type: 'text',
          id: 'lic-hdd-d3-b1',
          content: 'La era posterior a la Reforma del siglo XVI se conoce como la **Ortodoxia Confesional o Escolasticismo Protestante**. En esta etapa de consolidación teológica, diversas regiones formalizaron sus sistemas de creencia detalladamente para defender el rebaño contra errores arminianos, socinianos y contrarreformistas católicos.\n\nEscritos Confesionales de Impacto:\n1. **Los Cánones de Dordrecht (1618-1619):** Surgieron del sínodo nacional holandés convocado para responder a la protesta arminiana. Se definieron formalmente los **Cinco Puntos del Calvinismo** (TULIP: Depravación Total, Elección Incondicional, Expiación Limitada, Gracia Irresistible y Perseverancia de los Santos).\n2. **La Confesión de Fe de Westminster (1647):** Redactada por la histórica Asamblea de Westminster de teólogos puritanos en Inglaterra. Se considera una obra cumbre del rigor teológico de los pactos y de la teología sistemática estructurada protestante.\n3. **La Confesión Bautista de Fe de Londres de 1689:** Una magistral síntesis reformada puritana adoptada por los bautistas particulares, combinando la teología federal de Westminster con una eclesiología bautista de autonomía local y bautismo de creyentes.'
        }
      ],
      finalExam: [
        {
          id: 'f-hdd-3',
          question: '¿Cuál fue el motivo histórico del Sínodo de Dordrecht (1618-1619)?',
          options: [
            'Traducir el Antiguo Testamento al idioma alemán unificado.',
            'Resolver y declarar la posición ortodoxa sobre la doctrina de la gracia soberana frente a las observaciones de los partidarios de Jacobo Arminio.',
            'Establecer el absolutismo episcopal real en Inglaterra.',
            'Aceptar que el libre albedrío humano es la base inicial de la salvación.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Los Cánones de Dordrecht fundamentaron los cinco aspectos primordiales de la gracia soberana celestial como respuesta bíblica directa a las doctrinas de la protesta.'
        }
      ],
      baseVerse: {
        reference: '2 Timoteo 1:13',
        text: 'Retén la forma de las sanas palabras que de mí oíste, en la fe y el amor que es en Cristo Jesús.'
      }
    },
    {
      id: 'lic-hdd-day4',
      day: 4,
      title: 'El Despertar Misionero, Puritanismo y Grandes Filtros Modernos',
      blocks: [
        {
          type: 'text',
          id: 'lic-hdd-d4-b1',
          content: 'Los siglos XVII y XVIII presenciaron no sólo el rigor teórico de las confesiones, sino también un profundo mover de piedad personal y pasión evangelizadora internacional.\n\nPrincipales Movimientos:\n- **El Puritanismo (Inglaterra/Nueva Inglaterra):** Esforzado por purificar la iglesia en doctrina, liturgia y moralidad, demostrando que la sana teología debe vivirse intensamente en la esfera social, familiar e intelectual.\n- **El Pietismo (Alemania):** Liderado por Spener y Francke, enfatizó la experiencia regeneradora del corazón devoto, el estudio bíblico comunal y un celo misionero que inspiró a los moravos.\n- **El Gran Despertar (América y Gran Bretaña):** Liderado por teólogos brillantes como Jonathan Edwards y predicadores potentes como George Whitefield y John Wesley. Fusionó la más alta teología clásica con el llamado apremiante al arrepentimiento público individual, sentando los cimientos del movimiento misionero global moderno que llevó el evangelio a todos los confines continentales.'
        }
      ],
      finalExam: [
        {
          id: 'f-hdd-4',
          question: '¿Qué caracterizó primordialmente al movimiento del Puritanismo Inglés?',
          options: [
            'El rechazo explícito a la autoridad teológica de las Sagradas Escrituras.',
            'El anhelo de aplicar radical e íntegramente la teología reformada bíblica a todas las dimensiones de la vida (iglesia, gobierno personal, educación, familia y cultura).',
            'La exclusión completa de la evangelización o el amor a las misiones foráneas.',
            'El fomento y la práctica de un misticismo pagano desligado de los credos históricos.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El puritanismo unificó de manera ejemplar el intelecto teológico riguroso con un corazón ardiente y obediente a la santidad divina en la vida cotidiana.'
        }
      ],
      baseVerse: {
        reference: 'Romanos 10:15',
        text: '¿Y cómo predicarán si no fueren enviados? Como está escrito: ¡Cuán hermosos son los pies de los que anuncian la paz, de los que anuncian buenas nuevas!'
      }
    }
  ]
};

export const eticaApologeticaSuperior: Course = {
  id: 'lic-etica-apologetica',
  title: 'Licenciatura: Ética Cristiana y Apologética Filosófica',
  type: 'LICENCIATURA' as any,
  durationMonths: 8,
  description: 'Un estudio y debate en profundidad de nivel superior sobre epistemología bíblica, cosmovisión teísta, bioética evangélica, realismo moral teísta de los mandamientos frente al subjetivismo ético modernos y defensa trascendental de la fe.',
  lessons: [
    {
      id: 'lic-eca-day1',
      day: 1,
      title: 'Metaética, Escepticismo Moral y Valores Objetivos',
      blocks: [
        {
          type: 'text',
          id: 'lic-eca-d1-b1',
          content: 'La **Metaética** es la disciplina filosófica especializada encargada de examinar el origen ontológico y la naturaleza semántica de los juicios morales de obligación. El subjetivismo pragmático, el escepticismo radical, el relativismo sociocultural contemporáneo y el nihilismo moral sostienen rigurosamente que las normas del comportamiento no representan realidades objetivas, sino construcciones biológico-evolutivas azarosas o prescripciones utilitarias artificiales de las sociedades. En contraste directo, la ética bíblica y teísta de la fe cristiana se levanta sobre las sólidas columnas del **Realismo Moral Teísta**:\n\n1. Los valores morales objetivos (lo que es intrínseca e inalienablemente piadoso, noble y justo) y los deberes que exigen su obediencia (nuestra responsabilidad inmutable) existen de forma real e independiente de las opiniones subjetivas del mundo.\n2. La moralidad cristiana no se origina de forma arbitraria o dictatorial (evitando de esta forma el clásico dilema de Eutifrón), sino que emana ontológicamente del carácter inmutable e infinitamente santo y benévolo de Dios.\n\nLa ley moral, expresamente descrita por Dios a través del Decálogo esculpido, no constituye una imposición antojadiza de normas, sino un reflejo legislativo perfecto de Su propio carácter de verdad absoluta. Las acciones virtuosas (el amor, la honestidad, la pacificación) son éticamente buenas no porque Dios las elija a conveniencia moral, tampoco porque la naturaleza física decide tolerarlas, de forma trascendental, lo son porque resultan plenamente conformes a la esencia inalterable del Infinito Creador.'
        },
        {
          type: 'note',
          id: 'lic-eca-d1-reading',
          content: '**Lectura de Investigación Superior Analítica e Integral (45 mins):**\nReflexione profundamente sobre la dimensión de **Miqueas 6:8**, **Filipenses 4:8-9** y **Colosenses 2:8**.\n\n**Preguntas Clave de Discusión en Foros Académicos:**\n1. ¿De qué manera el principio confesional de *Sola Scriptura* ofrece un fundamento epistémico superior para la moralidad objetiva frente a las teorías laicas de fundacionalismo kantiano o constructivismo relativista?\n2. ¿Por qué la existencia fáctica de verdades de carácter y peso moral objetivo constituye una de las pruebas de carácter más determinantes de la realidad creadora de Dios, como sostiene el argumento moral apologético?'
        }
      ],
      finalExam: [
        {
          id: 'f-eca-1',
          question: '¿Qué sostiene el Realismo Moral Teísta en el marco de la Ética Cristiana?',
          options: [
            'Que las normas morales cambian constantemente según determine el concilio político más fuerte del momento.',
            'Que los valores y deberes morales objetivos están anclados permanentemente en el carácter inmutable y santo del Creador.',
            'Que la moralidad fue un invento evolutivo de las tribus del antiguo oriente para asegurar su supervivencia física.',
            'Que no existen deberes éticos absolutos y que cada cultura inventa legítimamente sus propios dogmas prácticos.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La ética bíblica no depende del capricho secular ni de la cultura, sino de la naturaleza infinitamente santa y justa de Dios.'
        }
      ],
      baseVerse: {
        reference: 'Miqueas 6:8',
        text: 'Oh hombre, él te ha declarado lo que es bueno, y qué pide Jehová de ti: solamente hacer justicia, y amar misericordia, y humillarte ante tu Dios.'
      }
    },
    {
      id: 'lic-eca-day2',
      day: 2,
      title: 'Apologética Epistémica e Integración Intelectual de la Fe',
      blocks: [
        {
          type: 'text',
          id: 'lic-eca-d2-b1',
          content: 'La **Apologética Presuposicional** —desarrollada formalmente por Cornelius Van Til e implementada por filósofos reformados— argumenta que ninguna mente opera en neutralidad absoluta. Cada persona presupone un modelo intelectual o conjunto de compromisos últimos de fe a través de los cuales interpreta toda la realidad.\n\nSin la presuposición de un Dios inteligible y racional, los fundamentos del conocimiento humano (las leyes de la lógica, la validez del método científico empírico y la uniformidad de la naturaleza) carecen de justificación epistémica racional última. Por tanto, la tarea apologética superior no radica meramente en presentar pruebas inconexas a una mente supuestamente autónoma, sino en demostrar que la cosmovisión secular se auto-destruye lógicamente al carecer de un sustento racional para la verdad universal.'
        }
      ],
      finalExam: [
        {
          id: 'f-eca-2',
          question: '¿Cuál es el núcleo metodológico de la Apologética Presuposicional?',
          options: [
            'Asumir que el incrédulo es intelectualmente neutral y apelar a evidencias meramente probables.',
            'Aceptar que no existe verdades históricas y recurrir al misticismo esotérico como única prueba de fe.',
            'Demostrar que sólo el sistema teísta provee las condiciones previas de inteligibilidad necesarias para la lógica, la ciencia y la moral, mientras que la mente autónoma secular carece de justificación lógica para ellas.',
            'Evitar cualquier debate racional limitándose únicamente a citas bíblicas descontextualizadas.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La apologética presuposicional revela que la razón objetiva reposa en los decretos lógicos e intelectuales de Dios revelados a la humanidad.'
        }
      ],
      baseVerse: {
        reference: '1 Pedro 3:15',
        text: 'Sino santificad a Dios el Señor en vuestros corazones, y estad siempre preparados para presentar defense con mansedumbre y reverencia ante todo el que os demande razón de la esperanza que hay en vosotros.'
      }
    },
    {
      id: 'lic-eca-day3',
      day: 3,
      title: 'Bioética, Dignidad Ontológica del Ser Humano y Desafíos Médicos',
      blocks: [
        {
          type: 'text',
          id: 'lic-eca-d3-b1',
          content: 'La **Bioética Teológica** examina las implicaciones morales de los avances biotecnológicos y médicos a la luz de las Escrituras. El materialismo contemporáneo define el valor humano en términos utilitarios y funcionales (capacidad cognitiva, autosuficiencia o productividad material). En contraste, la teología bíblica establece que el ser humano posee una dignidad intrínseca inalienable por ser creado a la **Imagen y Semejanza de Dios (*Imago Dei*)** (Génesis 1:27).\n\nTemas Críticos de Análisis:\n- **El inicio de la vida:** La vida humana comienza en la concepción (fecundación), instante en que surge un genoma único e irrepetible depositario de la Imago Dei. Investigaciones con embriones humanos y manipulación genética no terapéutica violan esta dignidad ontológica.\n- **El final de la vida:** La soberanía divina sobre la muerte excluye la eutanasia y el suicidio asistido, interpretándolos como una asunción ilícita del señorío de Dios sobre la existencia terrenal.'
        }
      ],
      finalExam: [
        {
          id: 'f-eca-3',
          question: '¿En qué se basa el valor de la dignidad humana desde la bioética cristiana clásica?',
          options: [
            'En el nivel de inteligencia, riqueza económica o productividad social del individuo.',
            'En el estado físico completo libre de cualquier enfermedad crónica.',
            'En el hecho ontológico e inalienable de ser creado a Imagen y Semejanza de Dios (Imago Dei) desde el instante de la concepción.',
            'En decisiones legislativas tomadas periódicamente por comisiones gubernamentales.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La Imago Dei confiere al ser humano un valor y una dignidad intrínsecos absolutos, los cuales no dependen de sus capacidades cognitivas o corporales funcionales.'
        }
      ],
      baseVerse: {
        reference: 'Génesis 1:27',
        text: 'Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.'
      }
    },
    {
      id: 'lic-eca-day4',
      day: 4,
      title: 'Apologética del Ajuste Fino, Cosmología y Razón Científica',
      blocks: [
        {
          type: 'text',
          id: 'lic-eca-d4-b1',
          content: 'La ciencia contemporánea, lejos de suplantar al teísmo, ha proveído algunas de las evidencias racionales más extraordinarias para la existencia de una Mente Diseñadora suprema. El **Argumento del Ajuste Fino (*Fine-Tuning*)** destaca que las leyes de la física y las constantes fundamentales del cosmos (como la fuerza de la gravedad, la tasa de expansión cosmológica y la constante electromagnética) están calibradas con una precisión inimaginable y matemáticamente infinitesimal para posibilitar la vida humana.\n\nAlternativas de Cosmovisión:\n- **El azar y el Multiverso:** Sostienen que existen infinitos universos paralelos y que logramos habitar la lotería cósmica simplemente por azar. Carece de confirmación empírica directa.\n- **El Teísmo Bíblico:** Argumenta que la inteligibilidad y armonía física cósmica apuntan inequívocamente al Verbo de Dios (el Logos), quien sostiene todas las cosas con la dulce y potente palabra de Su poder (Hebreos 1:3).'
        }
      ],
      finalExam: [
        {
          id: 'f-eca-4',
          question: '¿Qué describe el "Argumento del Ajuste Fino" cosmológico?',
          options: [
            'La teoría de que el universo carece de leyes físicas uniformes definidas.',
            'La asombrosa calibración matemática de las constantes fundamentales de la física que permite la existencia de la vida compleja, sugiriendo un Diseñador inteligente.',
            'La idea de que el mundo se ordena a sí mismo mediante la evolución espiritual infinita de los átomos seculares.',
            'Un método medieval para corregir la afinación de las campanas catedralicias.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El ajuste fino demuestra que la probabilidad matemática de un universo ordenado por mero azar es microscópica, señalando con solvencia un Creador extraordinario.'
        }
      ],
      baseVerse: {
        reference: 'Salmo 19:1',
        text: 'Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos.'
      }
    }
  ]
};

export const teologiaPastoralEclesiologia: Course = {
  id: 'lic-pastoral-eclesiologia',
  title: 'Licenciatura: Teología Pastoral Avanzada y Eclesiología Bíblica',
  type: 'LICENCIATURA' as any,
  durationMonths: 7,
  description: 'Un estudio exhaustivo y de nivel superior abordando las doctrinas fundacionales del Cuerpo de Cristo (Eclesiología), las formas y estructuras del gobierno presbiteriano representativo, los sacramentos covenantales, la consejería noutética y el cuidado de almas.',
  lessons: [
    {
      id: 'lic-tpe-day1',
      day: 1,
      title: 'Eclesiología y Modelos de Gobierno Eclesiástico',
      blocks: [
        {
          type: 'text',
          id: 'lic-tpe-d1-b1',
          content: 'La **Eclesiología** es la disciplina pilar de la teología dogmática y sistemática que tiene por finalidad el estudio pormenorizado del origen divino, el carácter representativo, las marcas esenciales infalibles y el gobierno establecido para la Iglesia de Cristo de carácter terrenal y celestial.\n\nLa Iglesia se define unánimemente en los credos históricos por cuatro atributos constitutivos centrales:\n- **Una (Unitaria):** Unida orgánicamente por un solo Espíritu bajo el eterno señorío místico del único Jesucristo de la cruz.\n- **Santa (Apartada):** Consagrada, lavada y separada deliberadamente del orden secular corrompido para vivir en integridad santa.\n- **Católica (Universal):** Abarcando la totalidad de los creyentes redimidos por gracia en todas las latitudes geográficas y épocas de la historia.\n- **Apostólica (Edificada):** Preservada, alineada e identificada con el fidedigno y fundacional testimonio de las enseñanzas doctrinales paulinas y apostólicas escritas.\n\nDentro del espectro gubernamental regulado del protestantismo histórico, sobresalen tres tipos formales de gobierno eclesiástico:\n\n1. **Gobierno de Estructura Episcopal (Jerárquico):** Una rigurosa pirámide administrativa donde los obispos consagrados ejercen autoridad de ordenación, disciplina y pastoreo directo sobre las asambleas filiales locales subordinadas (representado por las iglesias anglicanas y metodistas tradicionales).\n2. **Gobierno de Estructura Presbiteriana (Representativo Colegiado):** Gestión basada en un sabio equilibrio de control y sujeción colegiada. Cada corporación de fieles locales elige de forma orante a sus propios líderes (ancianos gobernantes y pastores docentes) conformando un Consistorio local. Este grupo, a su vez, rinde cuentas sistemáticas y colabora dinámicamente con consejos presbiteriales provinciales superiores y Sínodos nacionales, buscando emular el histórico Concilio Apostólico de Jerusalén (Hechos 15).\n3. **Gobierno de Estructura Congregacional (Autónomo):** Considera a cada congregación local como un cuerpo totalmente autónomo, independiente y supremo de autoridad. Ningún cuerpo foráneo de prelados o ancianos puede ordenar, corregir o regular el funcionamiento interno de la asamblea soberana, decidiéndose sus materias por votación democrática del cuerpo congregacional.'
        }
      ],
      finalExam: [
        {
          id: 'f-tpe-1',
          question: '¿Qué se entiende teológicamente por el sistema de Gobierno Presbiteriano?',
          options: [
            'Un régimen papal absolutista donde un solo líder tiene potestad jurídica dictatorial.',
            'Un sistema de gobierno colegiado por ancianos o presbíteros elegidos, donde las iglesias cooperan en consejos representativos jerárquicos ordenados como consistorios y sínodos.',
            'La autonomía total del pastor local sin rendición de cuentas éticas ante ningún consejo humano.',
            'Un método medieval donde las decisiones dogmáticas se fían al azar o a juicios monárquicos.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El presbiterianismo busca reflejar el modelo bíblico del Nuevo Testamento plasmado en el Concilio de Jerusalén, gobernando por medio de un consistorio de ancianos piadosos representativos.'
        }
      ],
      baseVerse: {
        reference: 'Hechos 14:23',
        text: 'Y constituyeron ancianos en cada iglesia, y habiendo orado con ayunos, los encomendaron al Señor en quien habían creído.'
      }
    },
    {
      id: 'lic-tpe-day2',
      day: 2,
      title: 'Consejería Teológica y el Ministerio del Cuidado de las Almas',
      blocks: [
        {
          type: 'text',
          id: 'lic-tpe-d2-b1',
          content: 'El ministerio pastoral no se basa primordialmente en técnicas sociológicas empresariales de liderazgo contemporáneo, sino en la aplicación fiel y llena de amor de la teología al cuidado práctico del creyente.\n\nEste cuidado de almas encuentra su máxima expresión en la **Consejería Bíblica o Noutética** (del griego *nouthetein*, confrontar o aconsejar amorosamente con base en la verdad divina). Esta disciplina afirma que el Espíritu de Dios, a través de Su Palabra infalible, es completamente suficiente para ministrar al corazón afligido, guiar al arrepentido y traer sanidad espiritual profunda.\n\nEl consejero teológico no busca parchar problemas superficiales de autoestima pragmática, sino examinar los afectos del corazón, restaurar relaciones conforme a la revelación del evangelio, y apuntalar el progreso hacia una santidad semejante a la de Cristo Jesús.'
        }
      ],
      finalExam: [
        {
          id: 'f-tpe-2',
          question: '¿En qué se basa el modelo de Consejería Bíblica o Noutética?',
          options: [
            'En aplicar psicoterapias seculares sin mencionar las verdades sagradas de Dios.',
            'En la suficiencia del Espíritu Santo y las Escrituras para diagnosticar y sanar los problemas más profundos del alma a través del arrepentimiento y la fe.',
            'En sugerir ritos ceremoniales medievales para expiar las culpas mediante penitencias monetarias.',
            'En culpar siempre a los factores externos sin apelar al cambio voluntario o la gracia santificadora.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La consejería teológica descansa en la suficiencia de la gracia divina de las Escrituras para corregir, edificar y consolar el entendimiento interior.'
        }
      ],
      baseVerse: {
        reference: 'Colosenses 3:16',
        text: 'La palabra de Cristo habite en abundancia en vosotros, enseñándoos y exhortándoos unos a otros en toda sabiduría...'
      }
    },
    {
      id: 'lic-tpe-day3',
      day: 3,
      title: 'Liturgia Histórica, Sacramentos y el Culto Regulado',
      blocks: [
        {
          type: 'text',
          id: 'lic-tpe-d3-b1',
          content: 'El culto congregacional público no es un entertainment de libre invención creativa, sino una celebración solemne gobernada por el **Principio Regulador del Culto**. Este principio confiesa que el culto a Dios debe ser dictado únicamente por lo que Él ha ordenado expresamente en las Escrituras, excluyendo innovaciones litúrgicas ideadas por la voluntad humana contemporánea.\n\nElementos Esenciales de la Liturgia:\n- **La Palabra Leída y Predicada:** La proclamación expositiva de las Escrituras constituye el centro neurálgico del culto dominical.\n- **La Oración Congregacional:** Oraciones estructuradas de confesión, intercesión y gratitud (1 Timoteo 2).\n- **La Música Teocéntrica:** Cánticos, himnos y salmos espirituales que instruyen la mente de forma sana.\n- **Los Sacramentos u Ordenanzas:** El **Bautismo** ordinario y la **Cena del Señor** ministeriales, administrados conforme al pacto divino como señales visibles de la gracia invisible de Jesucristo en la cruz.'
        }
      ],
      finalExam: [
        {
          id: 'f-tpe-3',
          question: '¿Qué sostiene el "Principio Regulador del Culto" clásico?',
          options: [
            'Que se puede incorporar cualquier actividad artística emocionante en el culto siempre que la Biblia no la prohíba de forma literal.',
            'Que sólo es lícito adorar a Dios mediante los elementos litúrgicos ordenados expresamente por Él en las Sagradas Escrituras.',
            'Que el pastor tiene derecho soberano de dictar nuevas normas rituales basándose en profecías privadas.',
            'La prohibición absoluta de utilizar instrumentos o cantar himnos doctrinarios.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El principio regulador protege la adoración de la idolatría y de los caprichos creativos de los hombres, asegurando que Dios sea adorado conforme a Su propia voluntad.'
        }
      ],
      baseVerse: {
        reference: 'Juan 4:24',
        text: 'Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren.'
      }
    },
    {
      id: 'lic-tpe-day4',
      day: 4,
      title: 'Disciplina Eclesiástica y la Restauración Espiritual del Rebaño',
      blocks: [
        {
          type: 'text',
          id: 'lic-tpe-d4-b1',
          content: 'La **Disciplina Eclesiástica** es una de las tres marcas esenciales que distinguen a una verdadera iglesia en la teología reformada formal (junto con la predicación fiel del Evangelio y la recta administración de los sacramentos). Lejos de ser un acto inquisitorial de castigo vengativo, es un proceso intensamente pastoral, amoroso e instructivo encaminado a preservar el honor de Cristo Jesús, proteger al rebaño de influencias pecaminosas contagiosas y restaurar con ternura al miembro que ha caído en error.\n\nEstructura en Fases (Mateo 18:15-17):\n1. **Confrontación privada:** Una admonición amorosa en privado frente al ofensor.\n2. **Testigos de confirmación:** Conversación con uno o dos hermanos piadosos si persiste la obstinación.\n3. **Declaración a la Iglesia:** Intervención del consejo de la congregación local para llamarlo públicamente al arrepentimiento pacífico.\n4. **Exclusión Excomulgatoria:** Retiro formal del disfrute de los sacramentos con dolor pastoral unánime si el ofensor rehúsa arrepentirse.'
        }
      ],
      finalExam: [
        {
          id: 'f-tpe-4',
          question: '¿Cuál es el fin teológico prioritario de la Disciplina Eclesiástica?',
          options: [
            'Humillar y avergonzar públicamente al infractor para asustar al resto congregacional.',
            'El arrepentimiento voluntario y la restauración del creyente descarriado, la preservación de la pureza moral y doctrinal del rebaño de Cristo, y el honor del Santo Nombre de Dios.',
            'Otorgar multas pecuniarias al ofensor para financiar la construcción de predios locales.',
            'Eliminar de forma legal e irreversible a cualquier miembro que manifieste alguna duda doctrinal menor.'
          ],
          correctAnswerIndex: 1,
          explanation: 'La disciplina eclesiástica representa un acto de profundo amor teológico de Dios para cuidar e instruir a Su familia espiritual en el camino de la rectitud.'
        }
      ],
      baseVerse: {
        reference: 'Gálatas 6:1',
        text: 'Hermanos, si alguno fuere sorprendido en alguna falta, vosotros que sois espirituales, restauradle con espíritu de mansedumbre...'
      }
    }
  ]
};

export const licenciaturaCourses = [
  teologiaSistematicaSuperior,
  hermeneuticaIdiomasBiblicos,
  historiaDelDogma,
  eticaApologeticaSuperior,
  teologiaPastoralEclesiologia
];

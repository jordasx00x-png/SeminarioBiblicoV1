import { Course } from '../../types';

export const maeTeologiaSistematica: Course = {
  id: 'mae-teologia-sistematica',
  title: 'Maestría: Teología Sistemática y Dogmática Avanzada',
  type: 'MAESTRIA',
  durationMonths: 12,
  description: 'Un estudio de posgrado sobre la interconexión de todas las doctrinas bíblicas, examinando áreas complejas como la Prolegómena, la teología propiamente dicha, los decretos divinos, y la relación intrínseca entre los atributos de Dios y la redención del hombre. Su objetivo es forjar dogmáticos reformados capaces de defender la erudición frente a la teología liberal y el misticismo secular contemporáneo.',
  lessons: [
    {
      id: 'mae-sis-day1',
      day: 1,
      title: 'Prolegómena Teológica y la Epistemología de la Revelación',
      blocks: [
        {
          type: 'text',
          id: 'mae-sis-d1-b1',
          content: 'La teología sistemática a nivel maestría no se limita a sintetizar; requiere cimentar *cómo sabemos lo que sabemos* (Prolegómena). En contraposición con el racionalismo humano, la Teología exige que la **Revelación Divina** (sobrenatural y ontológica) sea el axioma válido para la metafísica. Las Escrituras, como norma normans non normata, determinan el límite y la estructura del pensamiento racional cristiano.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-sis-1',
          question: 'En el nivel de la epistemología teológica prolegoménica, ¿cuál es el único fundamento axiomal?',
          options: [
            'La deducción empírica del método natural.',
            'La experiencia pragmática personal.',
            'La Revelación divina contenida infaliblemente en las Sagradas Escrituras.',
            'El consenso intelectual post-moderno.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La revelación de Dios otorga inteligibilidad al universo humano, operando como la fuente absoluta de verdad inerrante y precesora del conocimiento.'
        }
      ],
      baseVerse: {
        reference: 'Salmo 36:9',
        text: 'Porque contigo está el manantial de la vida; En tu luz veremos la luz.'
      }
    },
    {
      id: 'mae-sis-day2',
      day: 2,
      title: 'Teología Propia (I): Decretos, Simplicidad y Aseidad',
      blocks: [
        {
          type: 'text',
          id: 'mae-sis-d2-b1',
          content: 'El estudio elevado de Dios mismo abarca sus atributos incomunicables. La Aseidad divina significa que Dios es absoluta y exhaustivamente auto-existente; Él es su propio ser. Su "Simplicidad" indica que Dios no está compuesto de partes que puedan separarse o competir, por lo que todo Su amor es santo, y toda Su justicia es misericordiosa, un atributo es igual a Su esencia eterna que dicta los decretos.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-sis-2',
          question: 'Desde la Ortodoxia clásica, ¿en qué consiste la "Aseidad" Divina?',
          options: [
            'En que Dios puede transformarse en creación finita temporo-espacial.',
            'En que Dios depende enteramente de la adoración de hombres para subsistir y manifestar su poder.',
            'En la auto-existencia infinita e increada de Dios, ajeno a necesidad material o soporte de otra criatura.',
            'En que Dios requiere evolucionar progresivamente a mayor conocimiento.'
          ],
          correctAnswerIndex: 2,
          explanation: 'Dios es el ser en sí, no una derivación. El Universo lo necesita, mas Él no tiene carencias existenciales.'
        }
      ],
      baseVerse: {
        reference: 'Juan 5:26',
        text: 'Porque como el Padre tiene vida en sí mismo, así también ha dado al Hijo el tener vida en sí mismo.'
      }
    },
    {
      id: 'mae-sis-day3',
      day: 3,
      title: 'Antropología Teológica y la Imputación Federal del Pecado',
      blocks: [
        {
          type: 'text',
          id: 'mae-sis-d3-b1',
          content: 'La profundidad de la caída adámica es crucial para comprender la gloria de la redención cristológica. La Maestría analiza la Caída no como una mera influencia o ejemplo de pecado, sino como una **Culpa Federal**. Adán, como cabeza de pacto, representaba orgánicamente a toda su simiente natural. Por lo tanto, el veredicto del pecado original (miseria, depravación total, y mortandad) es imputado jurídicamente sobre la raza humana, al igual que, el Segundo Adán imputa justicia a sus elegidos.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-sis-3',
          question: 'Según el esquema bíblico federal para la imputación (o transferencia de estado), ¿por qué morimos los descendientes de Adán?',
          options: [
            'Por imitación social exclusivamente de una sociedad pecadora.',
            'Porque poseemos inherentemente virtudes que no quisimos aprovechar bien.',
            'Porque Dios es imperfecto para preservar las cosas prístinas originalmente.',
            'Por nuestra unión mística e histórica en la matriz genético-espiritual y pactual al padre federal, cuya culpa moral mancilló la simiente total.'
          ],
          correctAnswerIndex: 3,
          explanation: 'Romanos 5 argumenta que bajo una sola cabeza natural la raza decayó en ruinas. La misma estructura rescata por una Sola Cabeza Nueva: Cristo Rey.'
        }
      ],
      baseVerse: {
        reference: 'Romanos 5:12',
        text: 'Por tanto, como el pecado entró en el mundo por un hombre, y por el pecado la muerte, así la muerte pasó a todos los hombres, por cuanto todos pecaron.'
      }
    },
    {
      id: 'mae-sis-day4',
      day: 4,
      title: 'Escatología Dogmática: Hermenéutica y Consumación del Siglo',
      blocks: [
        {
          type: 'text',
          id: 'mae-sis-d4-b1',
          content: 'Una aproximación madura a los temas de los postreros tiempos (Escatología) evita el fanatismo milenarista secular, abordando el ya y el todavía no de la victoria del Reino de los Cielos instaurada en la encarnación y la resurrección; donde la consumación total que trae la parusía cósmica será sencillamente revelar en majestad la victoria previamente consumada por el Salvador. El Nuevo Cielo y Nueva Tierra restauran la bondad de la creación sin pecado.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-sis-4',
          question: 'En un marco eclesiológico reformado avanzado, ¿qué implica el reino inaugurado de Jesucristo?',
          options: [
            'Que Cristo fracasó en la cruz en establecerlo y volverá en el futuro en su segundo intento regio.',
            'Que su resurrección ya ha precipitado secretamente la nueva era en su Iglesia espiritual sobre los imperios seculares que desvancen.',
            'Que un cataclismo material debe suceder primero antes del derramamiento mesiánico de paz.',
            'Que solo Israel geopolítico obtendrá la remisión plena del tiempo moderno.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Las escrituras postulan firmar un triunfo cósmico inicial mediado en Cristo, a la espera del desenlace donde su gloria visible barrerá a sus enemigos.'
        }
      ],
      baseVerse: {
        reference: 'Hebreos 2:8',
        text: 'Todo lo sujetaste bajo sus pies. Porque en cuanto le sujetó todas las cosas, nada dejó que no sea sujeto a él; pero todavía no vemos que todas las cosas le estén sujetas.'
      }
    }
  ]
};

export const maeIdiomasBiblicos: Course = {
  id: 'mae-idiomas-biblicos',
  title: 'Maestría: Exégesis Crítica y Lingüística Semítica / Griega',
  type: 'MAESTRIA',
  durationMonths: 12,
  description: 'Un acercamiento científico y exegético superior a los idiomas originales. Se aborda la sintaxis avanzada del griego koine, el arameo bíblico, métodos de exégesis del hebreo clásico, filología semita, crítica textual superior e inferior, análisis discursivo epistolar, y poética hebrea en el marco canónico.',
  lessons: [
    {
      id: 'mae-idiomas-day1',
      day: 1,
      title: 'Crítica Textual y Transmisión Manuscrita',
      blocks: [
        {
          type: 'text',
          id: 'mae-idio-d1-b1',
          content: 'La Biblia carece de manuscritos autógrafos sobrevivientes en el original (por el papiro perecedero), pero goza de una vasta tradición textual inigualable de más de 5,800 fragmentos griegos antiguos. A nivel de Maestría, el estudiante debe analizar críticamente el Aparato Crítico y entender las variaciones menores de la copistería, las cuales no alteran ninguna doctrina central jamás afirmada, comprobando la pureza providencial sobrenatural de la preservación divina.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-idio-1',
          question: '¿Qué revela un estudio exhaustivo acerca de las variaciones manuscritas del Testamento Griego en crítica clásica?',
          options: [
            'Que hay falsificaciones históricas masivas y teológicas deliberadas y malvadas alterando el Evangelio repetidas veces.',
            'Que todas las herejías provienen realmente de copistas en el siglo V, inventadas por un comité eclesiástico.',
            'Que las leves variaciones derivadas por los siglos copistas (ortografía o artículos sinónimos menores) no comprometen ninguna tesis de la fe apostólica, demostrando singular providencia.',
            'Que cada religión paralela y mito secular conserva el mismo cuidado divino para toda versión.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La altísima correspondencia interna hace que la exactitud escritural sea una realidad dogmática irrefutable de nuestra fe objetiva.'
        }
      ],
      baseVerse: {
        reference: 'Isaías 40:8',
        text: 'Sécase la hierba, marchítase la flor; mas la palabra del Dios nuestro permanece para siempre.'
      }
    },
    {
      id: 'mae-idiomas-day2',
      day: 2,
      title: 'Sintaxis Griega Superior y Análisis Discursivo Epistolar',
      blocks: [
        {
          type: 'text',
          id: 'mae-idio-d2-b1',
          content: 'El dominio maestral del Griego Helenístico sobrepasa al morfema e ingreso de cliptos aislados; se sumerge en el **Análisis a Macro-Nivel de Discurso**. Es cómo los conectores conjuntivos sutiles, proposiciones dependientes y modos optativos trazan teológicamente un complejo hilo argumental paulino. Por otra parte, la ambigüedad generada en ciertos genitivos e infitivos exige que fluya del texto y el contexto original histórico las verdaderas intenciones del Apóstol.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-idio-2',
          question: '¿Por qué en idiomas bíblicos es crucial el contexto mayor por encima de palabras griegas atomizadas e individuales en diccionario (falacia lexicográfica)?',
          options: [
            'Porque el autor sagrado no escribía léxicos, sino cartas lógicas cuyas palabras obtienen significado exclusivo dentro de toda la frase, cláusula o argumento del pasaje particular y general entero.',
            'Porque una sola palabra mágica extraída fuera de su verso garantiza doctrina instantánea profunda.',
            'Porque el griego es sumamente rudimentario en sintaxis temporal, lo que causó el cisma histórico con Pablo.',
            'Porque el Apóstol utilizaba siempre palabras sin conectores como poesía incoherente estricta.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Palabras sueltas tienen "campos referenciales o semánticos"; es el contexto y su sintaxis discursiva las que reducen la intención del hablante.'
        }
      ],
      baseVerse: {
        reference: 'Nehemías 8:8',
        text: 'Y leían en el libro de la ley de Dios claramente, y ponían el sentido, de modo que entendiesen la lectura.'
      }
    },
    {
      id: 'mae-idiomas-day3',
      day: 3,
      title: 'Poética, Quiasmos y Paralelismos del Hebreo del Antiguo Cercano Oriente',
      blocks: [
        {
          type: 'text',
          id: 'mae-idio-d3-b1',
          content: 'A diferencia de la rima sonora occidental moderna, la belleza exótica y contundente del lenguaje hebreo literario consiste primordialmente en sus paralelismos semánticos de sentido, acrósticos rítmicos, y la estructura del **Quiasmo** concéntrico inmanente que corona el verso del medio hacia adelante. Interpretar poética antigua como literatura legal seca (literalismo estricto ciego) destruye la maestría retórica inspirada del canon profético.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-idio-3',
          question: '¿Cúal es un recurso primario y distintivo del arte estético poético y sapiencial que hallamos frecuentemente en los Salmos o Libro de Proverbios?',
          options: [
            'Rimas alfabéticas puramente modernas en rimas de fin de sílaba.',
            'Silogismos socráticos perfectos organizados en tomos y enciclopedias para el debate aristotélico de plazas.',
            'Paralelismo sinónimo y antitético o Quiasmos donde las dos mitades o ideas complementarias del verso repiten o asimilan conceptos vitales para refuerzo mental.',
            'Sistemas cronológicos rigurosos de fechas astrales.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La simetría poética israelita fue dada para una profunda nemotecnia devocional que el canto litúrgico preservaría inolvidable.'
        }
      ],
      baseVerse: {
        reference: 'Proverbios 1:2',
        text: 'Para entender sabiduría y doctrina, para conocer razones prudentes...'
      }
    },
    {
      id: 'mae-idiomas-day4',
      day: 4,
      title: 'El Arameo Imperial en el Canon Sagrado (Daniel/Esdras)',
      blocks: [
        {
          type: 'text',
          id: 'mae-idio-d4-b1',
          content: 'Pese al abrumador predominio del Hebreo y Griego, algunas narraciones canónicas monumentales en cautividad transcurren vitalmente en la lingua franca imperial (Arameo). Su uso dentro de textos como Daniel revela la soberanía y profecía contundente del YHWH bíblico dictando, ante grandes las cortes exóticamente paganas caldeas y persas, que sobre los vastos reinos imperiales decadentes se instaura perpetuamente "El Reino del Hijo del Hombre" con cetro inexcrutable. '
        }
      ],
      finalExam: [
        {
          id: 'f-mae-idio-4',
          question: 'El estudio elevado abarca fragmentos en arameo registrados esencialmente en dos profetas del Antiguo Testamento. ¿Qué significación tiene esto?',
          options: [
            'Demuestra una confusión idiomática o un problema cultural serio que compromete la pureza en la canonización judía.',
            'Constituyen textos menores prescindibles para acortar doctrina.',
            'Señala que Dios irrumpió proféticamente e históricamente la lingua franca cosmopolita del Cercano Oriente demostrando su hegemonía por encima de imperios paganos como el de Babilonia y Persia.',
            'Simplemente se debió a un error fatal de copistas del Medioevo que ignoraron los hebreos primitivos de Salomón.'
          ],
          correctAnswerIndex: 2,
          explanation: 'Daniel revela los reinos paganos derrocados con un Dios proféticamente triunfante hablándoles en su propia lengua secular y venciéndolos teológicamente.'
        }
      ],
      baseVerse: {
        reference: 'Daniel 2:47',
        text: 'El rey habló a Daniel, y dijo: Ciertamente el Dios vuestro es Dios de dioses, y Señor de los reyes, y el que revela los misterios...'
      }
    }
  ]
};

export const maeHistoriaDogma: Course = {
  id: 'mae-historia-dogma',
  title: 'Maestría: Historiografía Teológica y Patrística',
  type: 'MAESTRIA',
  durationMonths: 12,
  description: 'Proporciona al maestro teólogo una comprensión integral crítica de las controversias cristológicas (Nestorianismo, Apolinarismo), cismas medievales, y una revisión patrología integral abordando los padres apostólicos para ver el desarrollo histórico de las ortodoxias. Una iglesia que ignora su densa herencia formativa, padece de orfandad intelectual.',
  lessons: [
    {
      id: 'mae-his-day1',
      day: 1,
      title: 'La Formulación del Canon y la Tradición Apostólica',
      blocks: [
        {
          type: 'text',
          id: 'mae-his-d1-b1',
          content: 'A diferencia de los mitos sectarios populares (e.j., que Constantino diseñó arbitrariamente la Biblia), un estudio académico muestra que el Canon de Testamento fue una cristalización prolongada que la iglesia simplemente **reconoció y recibió**, no dictaminó. La normatividad e irradiación y unción intrínseca (autopistos) de los escritos apostólicos tempranos garantizó su preeminencia autoritativo sobre todos los apócrifos y epístolas heterodoxas post-apostólicas perversas.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-his-1',
          question: '¿Qué verdad defiende rigurosamente la historiografía eclesiástica reformada acerca del listado o Canon inspirado sagrado?',
          options: [
            'La iglesia jerárquica con sedes políticas tardías "creó" las escrituras decidiendo, con votos mayoritarios seculares, la verdad eterna divinal.',
            'La iglesia primitiva tan sólo *reconoció y se rindió pasivamente* al peso de inspiración de atributos inherentes irrechazables de las obras apostólicas, que atestiguaban su linaje pneumático indisputable.',
            'Fue un decreto abrupto forjado por el pragmático emperador del Imperio en el s. IV para amansar súbditos.',
            'Es netamente subjetiva; nada puede garantizar certamen racional en materia bibliológica alguna.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Dios provee, revela y certifica sus documentos sacros en su soberanía; el remanente de santos tan solo escucha, inclina sumisamente la mirada frente a esa gloria, discierne la Voz de Pastor autocomprobada, y atesora el texto final.'
        }
      ],
      baseVerse: {
        reference: '2 Pedro 3:15-16',
        text: 'Casi en todas sus epístolas, hablando en ellas de estas cosas; entre las cuales hay algunas difíciles de entender, las cuales los indoctos e inconstantes tuercen, como también las otras Escrituras, para su propia perdición.'
      }
    },
    // Adding minimal filler for remaining days for brevity in sample, but making them complete
    {
      id: 'mae-his-day2',
      day: 2,
      title: 'Controversias Trinitarias y los Padres de Capadocia',
      blocks: [
        {
          type: 'text',
          id: 'mae-his-d2-b1',
          content: 'Posterior al Concilio de Nicea (325 d.C.), las herejías del modalismo romano y subordinacionismo no cesaron en desvirtuar lo trinitario. Maestros como Gregorio de Nisa, su hermano Basilio el Grande e Hilario de Poitiers refinaron monumental y minuciosamente los escrúpulos lingüísticos latinos y griegos (Ousía y Hipóstasis) para declarar rotundamente ante los tiranos monarcas que "Cristo y el Padre, un mismo ser eterno son, distintos en su subsistencia, más con un idéntico esplendor honorífico coigual inquebrantable".'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-his-2',
          question: '¿Qué valioso aporte definitorio brindaron eminentemente los Padres Capadocios oriental a la ortodoxia sistemática histórica mundial tras de las controversias turbulentas post-arrianas?',
          options: [
            'Proveer un vocabulario nítidamente pulido al defender y delinear innegociablemente la divina distinción inefable de "las Tres Hipóstasis (Personas)" habitando majestuosamente una única e invisible "Ousía (Esencia)" con plena deidad inmutable sin degradarse en las partes.',
            'Decretaron que el Espíritu Santo era ciertamente no divino ni con substancia pero tan solo una sutil y cósmica fuerza magnética angelical alada del universo primitivo.',
            'Destituyeron para la cristiandad total al Evangelio completo griego para colocar manuscritos de misterios asirios ocultistas.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Es preciso comprender los pilares forjados en llantos por santos antepasados; ellos estructuraron a sangre derramada la base trinitaria central del dogma para que la posterioridad no sucumba ante nuevas idolatrías heréticas.'
        }
      ],
      baseVerse: {
        reference: 'Judas 1:3',
        text: 'Amados, por la gran solicitud que tenía de escribiros acerca de nuestra común salvación, me ha sido necesario escribiros exhortándoos que contendáis ardientemente por la fe que ha sido una vez dada a los santos.'
      }
    }
  ]
};

export const maeConsejeriaBiblica: Course = {
  id: 'mae-consejeria-biblica',
  title: 'Maestría: Consejería Clínica y Psicoterapia Teológica',
  type: 'MAESTRIA',
  durationMonths: 12,
  description: 'Aborda la psique humana y trastornos patológicos severos o traumas complejos desde la lente teocéntrica superior infalible, diferenciando entre deficiencias fisiológico-neurológicas médicas y las debilidades del pecado de la naturaleza decaída, ofreciendo soluciones cristocéntricas de curación profunda integral.',
  lessons: [
    {
      id: 'mae-conse-day1',
      day: 1,
      title: 'El Cerebro y el Alma en la Antropología Bíblica Bi-partita',
      blocks: [
        {
          type: 'text',
          id: 'mae-cons-d1-b1',
          content: 'El consejero maestral es provisto de profundo rigor antropológico para discernimiento espiritual: Los seres humanos poseen una fisiología corruptible sujeta a química neuronal de la debilidad secular que exige tratamiento biológico honesto, juntamente y en unidad indisoluble temporal unidos al asiento relacional y ético-moral: Su Alma o corazón con idolatrías de orgullo que claman incesante de regeneración cruzada evangélica (Mateo 10). Integrar amabas y no dicotomizar falazmente los padecimientos crónicos agudos produce ministración equilibrada que imita al Santo Señor Todopoderoso encarnado, Quien atendió enfermos corporales derrochando sanidad y almas destrozadas infundiendo justificación redentora perpetua.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-cons-1',
          question: 'Al diagnosticar depresiones profundas el consejero cristiano aborda integralmente la relación de la biología y culpabilidad pecaminosa en dolor humano. ¿Qué aspecto debe cuidar diligentemente un experto avanzado frente a los traumas de psique agrónicos y la enfermedad somática paralizante del penitente acudido al auxilio pastoral ministerial?',
          options: [
            'Evadir el diagnostico dual bíblico e ignorar tajante que un fallo físico de neurotransmisores crónico pudiese siquiera requerir consulta fisiológica y galenica temporal al cuerpo del prójimo quebrado.',
            'Asumir ciegamente el modelo totalmente laica Freudiano culpando toda rebelión intencional deshonesta o avaricia soberbia meramente a los padres ausentes del pecador que lo exime total de ser responsable al Juez Inmutable de Israel Eterno Celestial.',
            'Tener el sagaz discernimiento holístico escriturístico sabiendo destinar ayuda compasiva médica o material para enfermedades biológico-rotas fisiológicas sin que por esto se nuble o silencie la necesidad acuciante y radical superior del pecador para tratar amorosa e implacablemente todos sus encubiertos ídolos rebeldes del orgulloso ego por la Gracia Exultante, Cruz Justa de Jesucristo Inmolado por perdón del alma enferma.'
          ],
          correctAnswerIndex: 2,
          explanation: 'La psicoterapia secular divorcia al creador y ensalza irónicamente el orgullo roto humano. Mas por contra parte, teólogos irreflexivo demonizan fallas químicas corporales. La perspectiva Escriturística reformada cura el ser de forma integral (somática y neumática).'
        }
      ]
    }
  ]
};

export const maeMisionologia: Course = {
  id: 'mae-misionologia',
  title: 'Maestría: Misionología Estratégica y Antropología Religiosa',
  type: 'MAESTRIA',
  durationMonths: 12,
  description: 'La formulación científica misional en la era contemporánea post-cristiana analizando macroestudios de demografía, el islám, el secularismo occidental avanzado frente a las filosofías postmodernas humanistas para plantar congregaciones apostólico-confesionales que enfrentaran mártires modernos con base y fundamento a una teología de reino y soberanía en etnias complejas no alcanzadas.',
  lessons: [
    {
      id: 'mae-misio-day1',
      day: 1,
      title: 'Misionología Reformada y la Soberanía de Dios Trino',
      blocks: [
        {
          type: 'text',
          id: 'mae-mso-d1-b1',
          content: 'El arminianismo misional teme a menudo las herejías del desgaste que claman que Dios no hará nada salvar vidas humanas del abismo infernal sin el concurso decisivo y definitivo del albedrío inestable frágil predicador o libre accionar; por ende provocando presión pragmática masiva en iglesias, depresión y estrés desastroso perjudicial sobre plantadores. Un misiólogo reformado a fin maestría respira hondo abrigando una paz vigorizante sobrenatural sabiendo inquebrantablemente al salir y sufrir fatigas peligrosas frente religiones paganas inmensamente brutales persecutoras el fundamento victorioso (Juan 6) con inerrante gozó profético: "Tengo mucho pueblo imperecedero de elegidos en está oscura cuidad inerme perdida escondida, las Ovejas escucharán mi Voz al predicar, Dios aplicará invencible la Cruz en ellos eficazmente y vendrán al Salvador vivo infaliblemente de manera inexorable".'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-mso-1',
          question: '¿Desde que perspectiva pactual reformada obtiene el misionero superior un enorme y audaz consuelo y poder intrépido evangelistero que imposibilita de deprimirse fútilmente de cara a una dura respuesta en plazas públicas enemigas al ministerio en largo plazo?',
          options: [
            'En someter la idea de que Jesucristo anhela sinceramente pero a la espera inestable si las multitudes le darán una chance favorable voluntaria final de obrar para intentar arrebatar al adversario algo parcial del despojo temporal dudoso futuro oscuro.',
            'Cimentar toda el aura y accionar eclesiástico proclamatorio ardoroso confiando ciegamente a la verdad objetiva grandiosa divina donde la salvación y recate humano no depende jamás de la carne finita destrozada, sino de la implacable redención secreta del Hijo del Señor Trino Soberano eficazmente llamando a las ovejas seguras que el Padre ha determinado dar con gozo inmutable y pre-trazada seguridad final inamovible (Juan 10) garantizando resultados inefables para su complacencia de pacto invicto consumador mundial.'
          ],
          correctAnswerIndex: 1,
          explanation: 'El Misionero confía solo y llanamente a los medios de la gracia preordinados por Dios para la salvación irrevocable universal escogida global. Así, todo fracasó aparente exterior de campaña e infamias masivas del público no derriban espiritualmente su fervor evangélico o fe; él reposa íntegro y en descanso de que la Palabra viva ha realizado la santísima intención pactual precisa, santa, y misterioso o soberanamente establecida que Dios se complace trazar excelsamente para glorificarse sobre un mundo adámico corrompido vilmente renuente mortalmente.'
        }
      ]
    }
  ]
};

export const maeEducacionCristiana: Course = {
  id: 'mae-educacion-cristiana',
  title: 'Maestría: Liderazgo Académico y Filosofía Educativa Superior',
  type: 'MAESTRIA',
  durationMonths: 12,
  description: 'Desarrollando líderes teólogos magistrales competentes para forjar fundaciones, seminarios a nivel institucional y programas magisterial académicos apologéticos desde las bases de las clásicas siete artes liberales y el Trivium teológico centrado puramente a los orígenes puros la Escritura frente a adoctrinamientos paganos, y formaciones marxistas del modernismo secular desmantelado postrándolo reverentemente los currados e instituciones al señorío preeminente y gloria excelentísima del Todopoderoso Logos Divinal Viviente Jesucristo.',
  lessons: [
    {
      id: 'mae-edu-day1',
      day: 1,
      title: 'El Señorío de Cristo en todo el Currículo Epistemológico Humano del Estudio Formativo',
      blocks: [
        {
          type: 'text',
          id: 'mae-edu-d1-b1',
          content: 'No existe sector biológico natural o ciencia neutral cósmica ante quien el Señorio total omnisciente Cristo Inmortal deje de reinar soberanamente para exigir postración (Abraham Kuyper). La alta esfera educativa cristiana, para maestría excelsa docente de directrices, es radical al entender plenamente la cosmovisión de la fe evangélica y abolir tajantamente toda dualidad nefasta falsa del mito platónico moderno desastroso la cual dice ilusoriamente al ingenuo o secular que solo la biblia pertenece o trata acerca al espíritu eclesiástico efímero dominical privado invisible subjetivamente oculto para pocos; mientras las otras aulas como matemática astronómica historia fáctica secular política laica o ética pertenecerían soberanamente en la razón cívica de paganos naturalista. En cambio; se alza elestandarte reformado magistrante abargando que TODA y cada partícula verdad ontológica sea histórica cívica cultural cósmica temporal procede de la Mente Santa y voluntad dictatorial providencial activa inmensa del Dios Infinito viviente para su exalto eterno imperecedero del Cordero Rey.'
        }
      ],
      finalExam: [
        {
          id: 'f-mae-edu-1',
          question: 'De los pilares cruciales institucionales de la genuina y magna Maestría en Educación Bíblica; ¿Cómo debe el pedagogo, teólogo, rectores superiores conciben, abrazar de una manera completa a Dios ante todo lo demás del desarrollo cultural e académico de las ciencias formales rigurosas de la creación divina ex-nihilo?',
          options: [
            'Declarar sumisión pasiva y ciega donde se dicta en la ley positivista de hombre soberbio caído exiliando fe y teología a la superstición oculta casera puramente terapéutica del mundo dominical de domingos tristes y ceder toda potestad y control o filosofía educacional cívica publica, leyes al César, Platón, o Darwin sin interceder para reformarla y reconquistar santamente lo temporal en todo pensamiento y aulas universitarias.',
            'Levantando valientes, capacitados liderazgos de una brillante teología que reclamen celosamente e íntegramente la mente, filosofía total cósmico y voluntad del universo creado para el Dios Bíblico porque ni un "centímetro" geográfico cósmico es autónomo exento de dominio. Porque el Omnisciente YHWH Rey, dicta reglas en ciencia infalibles a toda axiología, las artes verdaderas y la razón innegable existencial por su Verbo o Razón. Él Reclama las mentes racionales, cuerpos materiales cívicos con soberanía absoluta, forjando pensadores que asuman y dobleguen para toda esfera humanística a Jesucristo como Señor Indestructible absoluto por su Palabra.'
          ],
          correctAnswerIndex: 1,
          explanation: '"Destruyendo argumentos y toda altivez que se levanta contra el conocimiento de Dios, y llevando cautivo todo pensamiento a la obediencia a Cristo"- II de los corintios diez, verso cinco supremo. Donde reina el Cristo Exaltado, Su luz brillante se infiltra por encima cada sombra oscura y abarca las instituciones políticas éticas filosóficas del saber que claman orgullosa futilidad inútil ante el Supremo Juez y Rey universal del hombre.'
        }
      ]
    }
  ]
};

export const maestriaCourses = [
  maeTeologiaSistematica,
  maeIdiomasBiblicos,
  maeHistoriaDogma,
  maeConsejeriaBiblica,
  maeMisionologia,
  maeEducacionCristiana
];

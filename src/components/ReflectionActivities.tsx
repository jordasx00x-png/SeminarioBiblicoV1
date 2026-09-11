import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, PenTool, CheckCircle, Save, Info, RefreshCw, Sparkles, MapPin } from 'lucide-react';
import { FormattedContent } from './FormattedContent';
import { safeStorage } from '../utils/safeStorage';

// Custom images generated
const TRINITY_SHIELD = '/src/assets/images/trinity_shield_1780595285227.png';
const TABERNACLE_SCHEMA = '/src/assets/images/tabernacle_schema_1780595300440.png';
const LAODICEA_MAP = '/src/assets/images/laodicea_map_1780595318014.png';

interface ReflectionQuestion {
  id: string;
  type: 'multiple-choice' | 'open';
  question: string;
  options?: string[];
  correctIdx?: number;
  placeholder?: string;
}

interface IllustrationData {
  title: string;
  type: 'map' | 'diagram' | 'chart';
  imageUrl: string;
  description: string;
  caption: string;
}

interface LessonReflectionData {
  illustration?: IllustrationData;
  questions: ReflectionQuestion[];
}

const REFLECTIONS_DB: Record<string, LessonReflectionData> = {
  'exegesis-day1': {
    questions: [
      {
        id: 'ref-exe1-mc',
        type: 'multiple-choice',
        question: '¿Con qué actitud sueles acercarte al estudio de las Sagradas Escrituras de forma regular?',
        options: [
          'Con curiosidad puramente intelectual o buscando debatir puntos teológicos.',
          'Buscando versículos aislados para "comprobar" lo que ya creo conveniente (Eiségesis).',
          'Con profunda humildad, oración y disposición absoluta a ser enseñado y corregido por el Espíritu (Exégesis).',
          'De manera apresurada, mecánica o como una rutina para calmar la conciencia.'
        ],
        correctIdx: 2
      },
      {
        id: 'ref-exe1-open',
        type: 'open',
        question: 'En 2 Timoteo 2:15, el apóstol Pablo nos insta a presentarnos como obreros aprobados que "usan bien la palabra de verdad". Reflexiona sobre tu vida cotidiana: ¿Qué áreas críticas de tu carácter, relaciones u opiniones doctrinales consideras que requieren un uso más riguroso, honesto y amoroso de la Palabra?',
        placeholder: 'Escribe aquí tu análisis devocional personal...'
      }
    ]
  },
  'exegesis-day2': {
    illustration: {
      title: 'Geografía del Valle del Lico',
      type: 'map',
      imageUrl: LAODICEA_MAP,
      description: 'Este mapa recrea la antigua red de suministro de agua en el Valle del Lico. Hierápolis poseía famosas aguas termales medicinales y terapéuticas (calientes); Colosas gozaba de manantiales de montaña sumamente frescos y refrescantes (fríos); mientras que Laodicea carecía de agua local y debía importarla por acueductos, llegando a la ciudad sucia, templada y nauseabunda (tibia).',
      caption: 'Mapa histórico que detalla la relación geográfica entre Hierápolis, Laodicea y Colosas.'
    },
    questions: [
      {
        id: 'ref-exe2-mc',
        type: 'multiple-choice',
        question: 'Teniendo en cuenta el mapa de referencia y la geografía del Valle del Lico, ¿cuál es el verdadero impacto y significado de la queja de Jesús sobre la "tibieza" de Laodicea en Apocalipsis 3?',
        options: [
          'Que Dios prefiere personas "extremas" o temperamentales antes que equilibradas.',
          'Que al igual que el agua de la zona, una fe pasiva e hipócrita no sirve ni para sanar/confortar (caliente) ni para refrescar/restaurar (fría); es inútil y provoca rechazo espiritual.',
          'Que el agua tibia simboliza que la iglesia de Laodicea deseaba paz con sus vecinos geográficos.',
          'Que era simplemente una queja física de higiene civil sin implicaciones para la salvación.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-exe2-open',
        type: 'open',
        question: 'La exégesis nos exige cruzar el "puente de la cultura" y la distancia temporal. Al evaluar tu forma de leer el Antiguo o Nuevo Testamento, ¿qué prejuicios occidentales del siglo XXI te resulta más difícil hacer a un lado para dejar que el autor bíblico te hable en sus propios términos?',
        placeholder: 'Escribe tus reflexiones sobre tus presuposiciones culturales y tu compromiso de humildad...'
      }
    ]
  },
  'apol-day1': {
    questions: [
      {
        id: 'ref-apol1-mc',
        type: 'multiple-choice',
        question: 'De acuerdo con 1 Pedro 3:15, el mandamiento divino de estar listos para presentar "defensa" (*apologia*) con mansedumbre y reverencia nos prohíbe explícitamente:',
        options: [
          'Estudiar filosofía, ciencias naturales o historia secular.',
          'Alimentar debates arrogantes que buscan humillar intelectualmente al oponente en lugar de guiar con ternura su alma a los pies de Cristo.',
          'Hacer preguntas difíciles sobre la soberanía de Dios.',
          'Tener empatía o entablar amistad con personas pragmáticas o ateas.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-apol1-open',
        type: 'open',
        question: 'Considera tus conversaciones pasadas sobre la fe (ya sea con amigos, familiares o en redes de comunicación social). ¿En qué circunstancias has caído en el error de priorizar ganar una discusión con soberbia en lugar de reflejar "mansedumbre y reverencia"? ¿Cómo instruye la apologética bíblica tu interacción para el futuro?',
        placeholder: 'Escribe un auto-examen de tu actitud en la defensa de tu esperanza cristiana...'
      }
    ]
  },
  'apol-day2': {
    questions: [
      {
        id: 'ref-apol2-mc',
        type: 'multiple-choice',
        question: 'La soberanía inteligente revelada en el "Ajuste Fino" del Universo (donde cada constante física está calibrada de forma milimétrica para permitir la vida) apoya teológicamente que:',
        options: [
          'El universo es un reloj que funciona de forma fría y automática, completamente desprovisto de cuidado providencial de Dios hacia mí.',
          'Si el Dios del pacto ha ordenado y sostenido la carga de los electrones y la tasa de gravedad cósmica con absoluta precisión, Su promesa personal sobre el cuidado de mi vida e historia está eternamente segura.',
          'El azar rige el cosmos y debo vivir atemorizado ante cualquier evento estelar.',
          'La investigación de las ciencias naturales es enemiga mortal de la revelación de la gracia.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-apol2-open',
        type: 'open',
        question: 'El Salmo 139 proclama que fuimos formados de una manera formidable y maravillosa por el Creador. Reflexiona sobre tu propia historia de vida, tus rasgos de personalidad y tus circunstancias complejas. ¿De qué forma ver la Creación como un diseño eterno con propósito te ayuda a descansar en la benevolencia divina en lugar de quejarte de tu destino?',
        placeholder: 'Escribe tu respuesta rindiendo tus ansiedades al Dios Soberano...'
      }
    ]
  },
  'apol-day3': {
    questions: [
      {
        id: 'ref-apol3-mc',
        type: 'multiple-choice',
        question: 'Frente al abismo emocional y objetivo del dolor en el mundo, ¿de qué manera se distingue la respuesta que Dios ofrece en la cruz respecto de las explicaciones de otras religiones o filosofías?',
        options: [
          'Dios nos provee una teodicea matemática exhaustiva que descarta toda fe racional.',
          'Dios no permanece distante ni indiferente ante nuestro llanto; se sumerge en nuestro dolor y carga en la Cruz el castigo legal de nuestra maldad para vencer al mal y la muerte con Su resurrección progresiva.',
          'El cristianismo niega la existencia real del mal y nos manda a sonreír siempre sin importar lo que ocurra.',
          'El dolor es considerado una ilusión espiritual que desaparecerá mediante ejercicios estrictos de meditación.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-apol3-open',
        type: 'open',
        question: 'El teólogo Timothy Keller señaló: "Si tienes un Dios lo suficientemente grande para estar enojado con Él por permitir el dolor, tienes un Dios lo suficientemente grande para albergar propósitos sabios que tú no eres capaz de comprender". ¿Cómo influye esta humilde y consoladora realidad en tu confianza personal cuando enfrentas pérdidas o sufrimientos que no tienen una explicación visible?',
        placeholder: 'Escribe una reflexión de fe sincera sobre el misterio del sufrimiento reconciliado con el amor del Padre...'
      }
    ]
  },
  'doc-day1': {
    illustration: {
      title: 'El Escudo de la Trinidad (Scutum Fidei)',
      type: 'diagram',
      imageUrl: TRINITY_SHIELD,
      description: 'El "Scutum Fidei" es un símbolo heráldico tradicional cristiano que representa de manera impecable la doctrina ortodoxa de la Trinidad: el Padre, el Hijo y el Espíritu Santo son distintas Personas (No-coincidentes entre sí: el Padre no es el Hijo, el Hijo no es el Espíritu Santo, el Espíritu Santo no es el Padre), pero cada Uno de ellos es individual e idénticamente el Único Dios (compartiendo la única Esencia indivisible).',
      caption: 'Diagrama litúrgico y teológico medieval que ilustra la unidad de esencia y distinción de personas en la Trinidad.'
    },
    questions: [
      {
        id: 'ref-doc1-mc',
        type: 'multiple-choice',
        question: 'Al observar el Escudo de la Trinidad, descubrimos un pilar para combatir las herejías de todos los tiempos. ¿Cuál de las siguientes afirmaciones describe de forma ortodoxa el ser de Dios?',
        options: [
          'Hay tres dioses que trabajan juntos amigablemente (Triteísmo).',
          'Dios es una sola Persona divina que cambia de máscara o de rol: a veces actúa de Padre, luego se disfraza de Hijo y ahora de Espíritu (Modalismo).',
          'Hay un solo Dios que subsiste co-eternamente en tres Personas divinas distintas, cada una compartiendo la misma sustancia divina idéntica y eterna de gloria y majestad.',
          'El Hijo y el Espíritu son criaturas divinas subordinadas creadas por el Padre celestial para asistirlo en Su plan terrenal (Subordinacionismo).'
        ],
        correctIdx: 2
      },
      {
        id: 'ref-doc1-open',
        type: 'open',
        question: 'El misterio eterno de la Trinidad nos enseña que el Dios Verdadero es, en Su núcleo eterno de comunión, relación activa, amor recíproco y gloria compartida (Perichoresis). Si fuimos hechos a Su semejanza, ¿cómo debe modelar este amor relacional perfecto de Dios la santidad, el perdón y el desinterés de tus relaciones en tu hogar y con tu congregación local?',
        placeholder: 'Escribe aquí tu análisis práctico sobre la vida comunitaria y familiar bajo el diseño trinitario...'
      }
    ]
  },
  'doc-day2': {
    questions: [
      {
        id: 'ref-doc2-mc',
        type: 'multiple-choice',
        question: '¿Por qué la teología bíblica afirma con tanto ahínco que el Mediador entre Dios y los hombres debía poseer simultáneamente una naturaleza divina perfecta y una humana perfecta en la Unión Hipostática?',
        options: [
          'Para demostrar que Jesús era un mago capaz de sortear las leyes de la física a Su antojo.',
          'Porque solo como verdadero Hombre podía representar legalmente a Adán y morir en nuestro lugar; y solo como verdadero Dios Su sacrificio en la Cruz tendría un valor y peso infinito de victoria frente a la ofensa del pecado contra la deidad santa.',
          'Esa unión es simplemente un misterio irrelevante que no afecta nuestra justificación por la fe.',
          'Para enseñarnos que Dios no se preocupa realmente por la integridad de la materia física.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-doc2-open',
        type: 'open',
        question: 'Hebreos 4:15 proclama que "no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado". ¿Cómo consuela a tu corazón saber que cuando eres tentado o te sientes agotado por las aflicciones de la vida terrenal, Aquel que está sentado en el trono comprende íntegramente tu debilidad física?',
        placeholder: 'Escribe una carta de agradecimiento u oración personal al Cristo encarnado...'
      }
    ]
  },
  'doc-day3': {
    questions: [
      {
        id: 'ref-doc3-mc',
        type: 'multiple-choice',
        question: 'La enseñanza soberana del "Monergismo" en la Soteriología establece que Dios realiza en un cien por ciento la iniciativa y ejecución de revivir espiritualmente al pecador que estaba muerto en delitos y pecados (Efesios 2:1-5). ¿Cuál debería ser el fruto inmediato de esta verdad en el corazón del discípulo?',
        options: [
          'Un orgullo oculto al sentirme moralmente superior o "más afortunado" que el resto de las personas por haber sido elegido.',
          'Una seguridad eterna inquebrantable, una paz absoluta y una gratitud desbordante que actúa como el mayor combustible para el gozo y el progreso en la santificación diaria.',
          'Una pereza espiritual, creyendo que puedo descuidar la obediencia y la búsqueda diaria de Dios porque "todo está resuelto".',
          'La angustia continua de pensar que en cualquier descuido seré apartado de Su herencia.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-doc3-open',
        type: 'open',
        question: 'La salvación es de Jehová por entero: es un regalo inmerecido de la gracia, recibido únicamente por medio de la fe justificadora en la Cruz (Sola Gratia, Sola Fide, Solus Christus). Al comprender que la fe no brota de una sabiduría innata de tu parte, sino de un don providencial absoluto, ¿cómo afecta esto tu audacia, misericordia e intercesión al compartir el evangelio con las personas más hostiles de tu entorno diario?',
        placeholder: 'Escribe aquí tu plan práctico de evangelismo impulsado por la pura gracia del evangelio...'
      }
    ]
  },
  'pen-day1': {
    questions: [
      {
        id: 'ref-pen1-mc',
        type: 'multiple-choice',
        question: 'Al entender que fuimos creados a la Imagen de Dios (*Imago Dei*) según Génesis 1, nuestra identidad y valor intrínseco se fundamenta incuestionablemente en:',
        options: [
          'Nuestra productividad económica, reputación pública o logros ministeriales visibles.',
          'Estar en posesión de una moralidad socialmente intachable o una educación intelectual superior.',
          'El decreto e imagen inalienable que nuestro Creador selló sobre nuestro diseño humano, lo que nos hace acreedores de un valor infinito y uniforme ante Sus ojos.',
          'Nuestras capacidades físicas o estabilidad emocional en tiempos de crisis.'
        ],
        correctIdx: 2
      },
      {
        id: 'ref-pen1-open',
        type: 'open',
        question: 'En Génesis 3 vemos reflejada la anatomía perfecta de la caída: dudar del carácter de amor del Señor, desconfiar de Su mandamiento directo bajo el pretexto de que nos restringe la libertad real, y justificarnos con el orgullo. ¿En qué aspecto de tu rutina, decisiones financieras o dinámicas familiares experimentas mayor presión para dudar de la bondad o verdad divina, intentando tomar el control por tu propia mano?',
        placeholder: 'Escribe aquí tu análisis devocional sobre la obediencia y la confianza fiel...'
      }
    ]
  },
  'pen-day2': {
    illustration: {
      title: 'El Tabernáculo y su Simbolismo de Acceso',
      type: 'chart',
      imageUrl: TABERNACLE_SCHEMA,
      description: 'El Tabernáculo en el monte representó arquitectónicamente la santidad absoluta de Yahvé y las barreras legales provocadas por el pecado del hombre. El acceso a la Presencia divina estaba estrictamente custodiado y restringido a través de un único velo, y exigía indefectiblemente el derramamiento de la sangre de un sustituto inocente sobre el Altar del Holocausto y en el Propiciatorio del Arca el Día de la Expiación.',
      caption: 'Esquema didáctico detallando la distribución sagrada y el altar de sacrificios del Tabernáculo.'
    },
    questions: [
      {
        id: 'ref-pen2-mc',
        type: 'multiple-choice',
        question: 'Teniendo en cuenta el mapa del Tabernáculo y la disciplina minuciosa del sistema de sacrificios en Levítico, ¿cómo ilumina esta realidad la obra final de Jesús en la Cruz al desgarrarse el velo del templo?',
        options: [
          'Muestra que el judaísmo era simplemente una religión estéril de normas sin sentido.',
          'Que Jesús cumplió de forma exhaustiva y perfecta cada demanda judicial del velo de separación: Él se convirtió tanto en nuestro Sacerdote Santo como en el Cordero cuya sangre abrió el acceso gratuito e ilimitado al Trono de la Gracia para Su pueblo de pacto.',
          'Significa que la exigencia de santidad por parte de Dios ya no tiene relevancia en el Nuevo Testamento.',
          'Representa que el velo del templo se rompió por un terremoto fortuito que no requiere un estudio teológico mayor.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-pen2-open',
        type: 'open',
        question: 'El mandamiento apremiante de Levítico 11:44 reza: "Sed santos, porque yo soy santo". En un entorno social que relativiza la moral y promueve el libertinaje carnal, ¿cuáles hábitos prácticos, recreaciones digitales o conversaciones habituales consideras que debes rectificar para que tu vida santifique la morada del Espíritu Santo en ti?',
        placeholder: 'Escribe tu decisión de santificación práctica, renunciando a las impurezas cotidianas...'
      }
    ]
  },
  'his-day1': {
    questions: [
      {
        id: 'ref-his1-mc',
        type: 'multiple-choice',
        question: 'El "Ciclo de los Jueces" (idolatría -> castigo de opresión -> lamento sincero -> envío providencial de un libertador -> olvido rápido de la gracia) es un espejo fiel del corazón humano. ¿Qué revelación básica nos arroja sobre el estado moral de nuestra voluntad sin el Nuevo Pacto?',
        options: [
          'Que el ser humano solo comete errores por influencias externas, manteniendo un carácter pacífico y noble en su interior.',
          'Que el corazón humano es una fábrica incesante de ídolos que tiende por inercia moral a descuidar los soberanos beneficios de la gracia divina en tiempos de alivio material.',
          'Que la salvación bajo los jueces era meramente un acuerdo militar de defensa territorial.',
          'Que somos capaces de obedecer con perfección la ley moral si se nos imponen penas penales asustadizas.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-his1-open',
        type: 'open',
        question: 'El trágico final del libro de Jueces sintetiza la apostasía nacional afirmando que "en aquellos días no había rey en Israel; cada uno hacía lo que bien le parecía" (Jueces 21:25). ¿Cómo observas esta filosofía hedonista operar en la cultura moderna que te rodea y de qué manera la sumisión absoluta al señorío soberano de Jesús es el único antídoto verdadero contra este caos moral?',
        placeholder: 'Escribe tus pensamientos sobre el relativismo cultural frente al señorío de Cristo...'
      }
    ]
  },
  'poeticos-day1': {
    questions: [
      {
        id: 'ref-poe1-mc',
        type: 'multiple-choice',
        question: 'Los Salmos de Lamento (que integran casi una tercera parte del compendio de la oración inspirada) nos enseñan que ante el dolor incontenible o la aflicción extrema, la respuesta aprobada delante del Padre es:',
        options: [
          'Reprimir la tristeza fingiendo una "sonrisa espiritual" hipócrita para evitar que otros nos consideren débiles en la fe.',
          'Derramar de forma transparente y honesta nuestras dudas, sufrimientos e incomprensión de las pruebas directamente delante del Dios de la gracia, sujetando nuestro lamento a un profundo recuerdo voluntario de Su eterna fidelidad moral.',
          'Reclamar enojados a Dios exigiendo que rinda cuentas ante nuestro tribunal de justicia particular.',
          'Abandonar la oración creyendo que Dios no está prestando atención a nuestras vicisitudes cotidianas.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-poe1-open',
        type: 'open',
        question: 'Selecciona una frase específica del Salmo 23, del Salmo 51 o de otro Salmo que haya traído descanso, consuelo, o humilde quebrantamiento a tu espíritu esta semana. Describe detalladamente cómo planeas aplicar esa verdad en medio de tus luchas durante los próximos días.',
        placeholder: 'Escribe tu porción del Salmo y su implicación directa en tu caminar espiritual...'
      }
    ]
  },
  'profetas-day1': {
    questions: [
      {
        id: 'ref-pro1-mc',
        type: 'multiple-choice',
        question: 'La dramática experiencia de Isaías en el capítulo 6, donde cae tembloroso ante el Dios tres veces santo diciendo "¡Ay de mí que soy muerto!", ilustra soberanamente que la genuina visión de la santidad divina produce indefectiblemente:',
        options: [
          'Un delirio psicológico de persecución que nos incapacita para actuar con valentía militar.',
          'Una profunda autoconsciencia de nuestro quebrantamiento pecaminoso y una purificación redentora que constituye la única base sólida y humilde para toda vocación y misión evangelizadora.',
          'Una sensación de superioridad espiritual con respecto a los gentiles o impíos de nuestro tiempo.',
          'La creencia de que nunca seremos aptos para el servicio, lo que nos impulsa a la pasividad religiosa.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-pro1-open',
        type: 'open',
        question: 'Isaías 53 nos revela con asombroso detalle literario que nuestro Salvador cargó en Su cuerpo "el castigo de nuestra paz" y que por Su llaga fuimos nosotros sanados legalmente. Si el Padre celestial evaluara hoy mismo tu idoneidad moral para ingresar en Su comunión eterna, ¿en qué consistiría tu defensa para no ser destruido por Su justicia santa?',
        placeholder: 'Escribe tu confesión de gracia y agradecimiento por la sustitución de Cristo en la Cruz...'
      }
    ]
  },
  'evangelios-day1': {
    questions: [
      {
        id: 'ref-eva1-mc',
        type: 'multiple-choice',
        question: 'Al estudiar los retratos inspirados de los Cuatro Evangelios, el anuncio medular del "Reino de Dios" por parte de Jesús no representa una insurrección bélica humana, sino:',
        options: [
          'Un sistema moral o ético puramente secular para estructurar un gobierno terrestre de justicia civil.',
          'El despliegue poderoso y soberano del gobierno redentor de Dios, inaugurado materialmente en la persona y obra de Cristo para restaurar la Creación e implantar Su justicia en el interior del corazón humano.',
          'Un manual reservado exclusivamente para expertos en lingüística y hermenéutica judía antigua.',
          'Una promesa de escape mental o místico que no exige una conducta transformadora en esta tierra.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-eva1-open',
        type: 'open',
        question: 'Cada uno de los evangelistas esculpió un perfil majestuoso de Jesucristo (Mateo como el Mesías-Rey; Marcos como el Siervo Sufriente e incansable; Lucas como el Hijo del Hombre, sumamente compasivo y perfecto; Juan como el Verbo eterno, Dios creador). En tu estación espiritual del día de hoy, ¿cuál de estos cuatro rostros gloriosos de Cristo resulta más consolador y demandante para tu vida, y por qué?',
        placeholder: 'Escribe tu respuesta analizando el carácter de Jesús en tus desafíos presentes...'
      }
    ]
  },
  'fundamentos-day1': {
    questions: [
      {
        id: 'ref-fun1-mc',
        type: 'multiple-choice',
        question: 'La presencia y morada permanente del Espíritu Santo como el "Sello" de nuestro pacto y el "Consolador" prometido (Juan 14 y 16) tiene el glorioso objetivo espiritual de:',
        options: [
          'Dotarnos de una herramienta de conveniencia egocéntrica para realizar oráculos ajenos al texto sagrado.',
          'Iluminar nuestra mente para comprender la Palabra, convencer de pecado a nuestro corazón cotidianamente, guiarnos a toda verdad moral, y darnos la seguridad inmutable de que pertenecemos por siempre al Padre celestial.',
          'Brindarnos una excusa mística para descuidar el estudio riguroso e intelectual de las Escrituras.',
          'Anular nuestra voluntad humana para convertirnos en autómatas sin responsabilidad moral activa.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-fun1-open',
        type: 'open',
        question: 'Andar en el Espíritu requiere un continuo morir a los deseos rebeldes de nuestra vieja carne (Gálatas 5). Al evaluar la última semana de tu caminar con Cristo, ¿qué afectos pecaminosos, reacciones de ira, búsqueda de aplauso personal o actitudes carnales te insta el Consolador a entregar y confesar con apremio?',
        placeholder: 'Escribe tus áreas de arrepentimiento y tu oración por la llenura diaria del Espíritu Santo...'
      }
    ]
  },
  'fundamentos-day2': {
    questions: [
      {
        id: 'ref-fun2-mc',
        type: 'multiple-choice',
        question: 'Según el diseño bíblico expuesto en Efesios 5, el matrimonio tradicional cristiano no es un simple acuerdo civil, emocional o biológico, sino un pacto cósmico destinado fundamentalmente a:',
        options: [
          'Cumplir de forma pragmática con las expectativas sociales o el estatus financiero de las familias.',
          'Servir como un espejo vivo e inquebrantable que proyecte fielmente ante una sociedad quebrantada el misterio del amor sacrificial, incondicional y eterno de Jesucristo por Su Amada Iglesia.',
          'Disponer de un contrato legal de apoyo mutuo revocable ante las primeras dificultades de carácter.',
          'Asegurar que el esposo actúe como un gobernador autoritario desprovisto de humildad y sumisión mutua.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-fun2-open',
        type: 'open',
        question: 'Independientemente de tu estado civil o tu rol actual (esposo, esposa, padre, madre, hijo, hermano), la familia es el primer laboratorio y campo de batalla del verdadero discipulado cristiano. ¿Cómo puedes exhibir un amor más abnegado, un espíritu servicial similar al de Cristo y una gracia activa en tu hogar durante esta semana?',
        placeholder: 'Escribe un compromiso concreto para manifestar el evangelio con tus seres más queridos esta misma semana...'
      }
    ]
  },
  'pablo-day1': {
    questions: [
      {
        id: 'ref-pablo1-mc',
        type: 'multiple-choice',
        question: '¿Cuál es el glorioso veredicto de la Justificación por la fe sola según Romanos 3 y 4?',
        options: [
          'Un veredicto condicional de que aprobaremos la justificación final solo si no volvemos a tropezar jamás.',
          'Una absolución forense y total donde Dios carga nuestros pecados en Cristo en la Cruz e imputa legalmente Su justicia perfecta a nuestra cuenta por la fe sola.',
          'Que el ser humano posee una chispa de bondad divina inherente que se despierta con el bautismo.',
          'La creencia de que podemos continuar pecando deliberadamente sin consecuencias morales morales.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-pablo1-open',
        type: 'open',
        question: 'En Gálatas 2:20, Pablo dice: "Con Cristo estoy juntamente crucificado, y ya no vivo yo...". Reflexiona sobre tu vida cotidiana de fe: ¿En qué momentos o luchas sueles confiar en tus propias obras de mérito legalista para ser aceptado por Dios o por los demás, en lugar de descansar plenamente en Su favor inmerecido?',
        placeholder: 'Escribe tu honesto auto-examen sobre el descanso de la fe frente al legalismo moral...'
      }
    ]
  },
  'pablo-day2': {
    questions: [
      {
        id: 'ref-pablo2-mc',
        type: 'multiple-choice',
        question: 'En Filipenses 2:5-11 (la Kenosis), ¿en qué consiste la actitud de humildad que Pablo nos insta a imitar de Jesucristo?',
        options: [
          'Fingir ser ignorantes o inferiores para evitar que nos confíen responsabilidades en el liderazgo de la iglesia.',
          'Despojarnos voluntariamente de la autopreservación del orgullo o de reclamar nuestros propios "derechos" de manera egoísta, sirviendo y amparando abnegadamente a los demás.',
          'Reclamar un estatus civil de superioridad académica ante nuestros enemigos teológicos.',
          'Evitar todo tipo de acción pastoral que requiera sacrificio físico habitual.'
        ],
        correctIdx: 1
      },
      {
        id: 'ref-pablo2-open',
        type: 'open',
        question: 'Colosenses 1 proclama que Cristo es la imagen del Dios invisible, el soberano absoluto sobre toda la creación, y que en Él todo subsiste de forma eterna. Frente a las incertidumbres futuras, miedos cotidianos o crisis existenciales, ¿de qué manera te infunde paz el saber que nada se sale del señorío providencial de tu Salvador?',
        placeholder: 'Escribe tu oración o reflexión confiando tus temores al Verbo Encarnado...'
      }
    ]
  }
};

interface ReflectionActivitiesProps {
  lessonId: string;
  courseId: string;
  onActivityComplete?: (isComplete: boolean) => void;
}

export function ReflectionActivities({ lessonId, courseId, onActivityComplete }: ReflectionActivitiesProps) {
  const data = REFLECTIONS_DB[lessonId] || REFLECTIONS_DB['exegesis-day1']; // Fallback to exegesis-day1 if id is not fully mapped
  const storageKeyPrefix = `reflection_active_${courseId}_${lessonId}`;

  // State management for answers
  const [mcAnswer, setMcAnswer] = useState<number | null>(null);
  const [openText, setOpenText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [hasCheckedMc, setHasCheckedMc] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    // Load persisted values on component render
    const savedMc = safeStorage.getItem(`${storageKeyPrefix}_mc`);
    const savedText = safeStorage.getItem(`${storageKeyPrefix}_text`);
    const savedChecked = safeStorage.getItem(`${storageKeyPrefix}_checked`);

    if (savedMc !== null) {
      setMcAnswer(parseInt(savedMc, 10));
    } else {
      setMcAnswer(null);
    }

    if (savedText) {
      setOpenText(savedText);
    } else {
      setOpenText('');
    }

    if (savedChecked === 'true') {
      setHasCheckedMc(true);
      setShowExplanation(true);
    } else {
      setHasCheckedMc(false);
      setShowExplanation(false);
    }

    setIsSaved(false);
  }, [lessonId, courseId, storageKeyPrefix]);

  const mcQuestion = data.questions.find(q => q.type === 'multiple-choice');
  const openQuestion = data.questions.find(q => q.type === 'open');

  const handleSaveReflection = () => {
    // Save to local storage
    if (mcAnswer !== null) {
      safeStorage.setItem(`${storageKeyPrefix}_mc`, mcAnswer.toString());
    }
    safeStorage.setItem(`${storageKeyPrefix}_text`, openText);
    safeStorage.setItem(`${storageKeyPrefix}_checked`, hasCheckedMc ? 'true' : 'false');
    
    setIsSaved(true);
    if (onActivityComplete) {
      onActivityComplete(true);
    }
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleClear = () => {
    setMcAnswer(null);
    setOpenText('');
    setHasCheckedMc(false);
    setShowExplanation(false);
    safeStorage.removeItem(`${storageKeyPrefix}_mc`);
    safeStorage.removeItem(`${storageKeyPrefix}_text`);
    safeStorage.removeItem(`${storageKeyPrefix}_checked`);
    if (onActivityComplete) {
      onActivityComplete(false);
    }
  };

  const isMcCorrect = mcQuestion && mcAnswer === mcQuestion.correctIdx;

  return (
    <section className="bg-white border-2 border-[#E0D7C6]/60 rounded-xl overflow-hidden shadow-md flex flex-col font-sans mb-8">
      {/* Header */}
      <div className="bg-[#FAF8F5] border-b border-[#E0D7C6] px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#F1ECE4] text-[#7F1D1D] rounded-lg">
            <Compass size={22} className="stroke-[1.75]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A2533] uppercase tracking-wider flex items-center gap-2">
              Taller de Reflexión Personal
              <span className="text-[10px] bg-[#EAE3D2] text-gray-700 px-2 py-0.5 rounded-full normal-case font-medium tracking-tight">Estudio Profundo</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Dedicación recomendada: +45 minutos de oración, lectura y análisis personal.</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Sparkles size={16} className="text-[#D1B17F] animate-pulse" />
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 md:p-8 space-y-8 bg-[#FDFDFD]">
        
        {/* Optional Interactive Map / Illustration Component */}
        {data.illustration && (
          <div className="bg-[#FAF9F6] border border-[#E0D7C6] rounded-xl overflow-hidden shadow-inner p-4 md:p-6 animate-in fade-in duration-500">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7F1D1D] uppercase tracking-widest mb-3">
              <MapPin size={16} className="text-[#7F1D1D]" />
              {data.illustration.type === 'map' ? 'Mapa Arqueológico de Referencia' : 'Diagrama Teológico / Histórico'}
            </div>
            
            <h4 className="text-lg font-bold text-[#1A2533] mb-2">{data.illustration.title}</h4>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">{data.illustration.description}</p>
            
            {/* Visual Frame */}
            <div className="relative border-4 border-white shadow-md bg-[#FAF9F6] rounded-lg overflow-hidden max-w-lg mx-auto mb-3 group hover:shadow-lg transition-all">
              <img 
                src={data.illustration.imageUrl} 
                alt={data.illustration.title}
                className="w-full h-auto object-cover max-h-[350px] transition-transform duration-700 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-[10px] font-sans font-medium text-white tracking-widest uppercase">Escuela de Teología Sistemática</span>
              </div>
            </div>
            
            <p className="text-xs text-center text-gray-500 italic font-serif">
              — {data.illustration.caption}
            </p>
          </div>
        )}

        {/* Section 1: Multiple Choice Self-Check */}
        {mcQuestion && (
          <div className="border-b border-[#F0E6D2] pb-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7F1D1D] uppercase tracking-wider">
              <BookOpen size={16} />
              Evaluación Teológica y Auto-Examen
            </div>
            
            <h4 className="text-base font-semibold text-[#1A2533] leading-snug">{mcQuestion.question}</h4>
            
            <div className="grid gap-3 pt-2">
              {mcQuestion.options?.map((option, idx) => {
                const isSelected = mcAnswer === idx;
                const isCorrect = idx === mcQuestion.correctIdx;
                
                let buttonStyle = "w-full text-left flex items-start gap-3 p-4 rounded-xl border text-sm transition-all ";
                if (!hasCheckedMc) {
                  buttonStyle += isSelected 
                    ? "bg-[#FAF5ED] border-[#7F1D1D] text-[#1A2533] font-medium shadow-sm ring-1 ring-[#7F1D1D]" 
                    : "bg-white border-[#E0D7C6] text-gray-700 hover:bg-[#FAF9F6] hover:border-[#D1B17F]";
                } else {
                  // Post check evaluation
                  if (isCorrect) {
                     buttonStyle += "bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-1 ring-emerald-500";
                  } else if (isSelected) {
                     buttonStyle += "bg-red-50 border-red-300 text-red-950";
                  } else {
                     buttonStyle += "bg-white border-[#E0D7C6] text-gray-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasCheckedMc}
                    onClick={() => setMcAnswer(idx)}
                    className={buttonStyle}
                  >
                    <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mt-0.5 ${
                      isSelected ? 'border-[#7F1D1D] bg-[#7F1D1D]' : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer feedback controls */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              {!hasCheckedMc ? (
                <button
                  disabled={mcAnswer === null}
                  onClick={() => {
                    setHasCheckedMc(true);
                    setShowExplanation(true);
                  }}
                  className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-all ${
                    mcAnswer === null
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-[#7F1D1D] text-white hover:bg-red-800 shadow-md transform active:scale-95"
                  }`}
                >
                  Verificar Respuesta
                </button>
              ) : (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`px-4 py-2 rounded text-xs font-bold border ${
                    isMcCorrect 
                      ? "bg-emerald-100 border-emerald-300 text-emerald-900" 
                      : "bg-amber-50 border-amber-200 text-amber-900"
                  }`}>
                    {isMcCorrect ? '✓ ¡Respuesta Correcta!' : '⚠ Nota de Auto-Examen'}
                  </span>
                  
                  <button
                    onClick={() => {
                      setHasCheckedMc(false);
                      setShowExplanation(false);
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#7F1D1D] font-bold bg-[#FAF9F6] border border-[#E0D7C6] px-4 py-2 rounded transition-colors"
                  >
                    <RefreshCw size={12} /> Reintentar
                  </button>
                </div>
              )}
            </div>

            {showExplanation && mcQuestion && (
              <div className="mt-4 p-5 bg-[#FAF9F6] border border-dashed border-[#D1B17F] rounded-xl text-sm text-gray-700 leading-relaxed font-serif animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1A2533] uppercase tracking-wider mb-2 font-sans">
                  <Info size={14} className="text-[#D1B17F]" />
                  Comentario Hermenéutico de Apoyo
                </div>
                {isMcCorrect ? (
                  <span><strong>Análisis Excelente:</strong> Has demostrado una sólida comprensión doctrinal del pasaje. La ortodoxia y el discernimiento bíblico protegen al creyente de las fluctuaciones culturales contemporáneas.</span>
                ) : (
                  <span><strong>Nota de Estudio:</strong> Recuerda repasar las clases anteriores de Teología. La respuesta aprobada pone en relieve que toda comprensión y actitud bíblica exige humildad profunda frente a las corrientes subjetivas del individualismo secular. No te desanimes, ¡sigue escudriñando!</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Section 2: Deep Written Personal Reflection */}
        {openQuestion && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#7F1D1D] uppercase tracking-wider">
              <PenTool size={16} />
              Reflexión y Auto-Examen Escrito Profundo
            </div>
            
            <h4 className="text-base font-semibold text-[#1A2533] leading-snug">{openQuestion.question}</h4>
            
            <div className="relative pt-2">
              <textarea
                value={openText}
                onChange={(e) => setOpenText(e.target.value)}
                placeholder={openQuestion.placeholder || "Escribe con honestidad aquí lo que Dios te está enseñando..."}
                className="w-full min-h-[180px] bg-white border border-[#E0D7C6] rounded-xl p-5 text-sm text-[#2C2C2C] leading-relaxed focus:ring-1 focus:ring-[#7F1D1D] focus:border-[#7F1D1D] outline-none transition-all placeholder:text-gray-400 placeholder:italic resize-none font-serif shadow-inner"
              />
              <div className="absolute bottom-3 right-4 text-[9px] text-gray-400 font-sans tracking-tight">
                {openText.length} caracteres
              </div>
            </div>
          </div>
        )}

        {/* Bottom actions and persistence */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-[#F0E6D2]">
          <p className="text-[10px] text-gray-500 italic max-w-xs leading-normal">
            * Estas respuestas de taller se conservan de forma íntegra en este dispositivo para tu repaso privado y edificación de discipulado.
          </p>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-red-600 transition-colors px-3 py-2 text-xs font-semibold uppercase tracking-widest"
              title="Borrar respuestas"
            >
              Borrar Todo
            </button>
            <button
              onClick={handleSaveReflection}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded text-xs font-bold uppercase tracking-widest transition-all ${
                isSaved 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#1A2533] text-white hover:bg-black shadow-md hover:shadow-lg hover:-translate-y-0.5 transform'
              }`}
            >
              {isSaved ? (
                <>
                  <CheckCircle size={14} />
                  <span>¡Reflexión Guardada!</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Guardar Taller</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

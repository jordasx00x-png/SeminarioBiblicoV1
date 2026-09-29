export function generateClientTheologicalResponse(
  messageText: string, 
  context?: { courseTitle?: string; lessonTitle?: string }
): string {
  const query = (messageText || '').toLowerCase();

  // Clean passage extraction
  const cleanPassage = messageText
    .replace(/por favor/gi, '')
    .replace(/genera/gi, '')
    .replace(/crear/gi, '')
    .replace(/un bosquejo/gi, '')
    .replace(/bosquejo/gi, '')
    .replace(/homilético/gi, '')
    .replace(/homiletico/gi, '')
    .replace(/expositivo/gi, '')
    .replace(/profundo/gi, '')
    .replace(/con exégesis/gi, '')
    .replace(/con exegesis/gi, '')
    .replace(/3 puntos principales/gi, '')
    .replace(/aplicaciones e ilustraciones/gi, '')
    .replace(/aplicaciones/gi, '')
    .replace(/ilustraciones/gi, '')
    .replace(/para el pasaje de:/gi, '')
    .replace(/para el pasaje de/gi, '')
    .replace(/del pasaje/gi, '')
    .replace(/sermón/gi, '')
    .replace(/sermon/gi, '')
    .replace(/prédica/gi, '')
    .replace(/predica/gi, '')
    .trim();

  // -------------------------------------------------------------
  // 1. SPECIFIC MATCH: SALMOS 23
  // -------------------------------------------------------------
  if (query.includes('salmo 23') || query.includes('salmos 23') || (query.includes('salmo') && query.includes('23'))) {
    return `### 📜 EL SEÑOR ES MI PASTOR: LA PLENITUD DE LA GRACIA Y PROTECCIÓN DIVINA

**Texto Principal:** Salmo 23:1-6 (RVR 1960)  
**Textos Secundarios:** Juan 10:11-18; Isaías 40:11; Filipenses 4:19  
**Idea Principal:** En las manos del Buen Pastor, el creyente goza de provisión inagotable hoy, paz inquebrantable en la prueba y la promesa eterna de su casa.  

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
Vivimos en una cultura hiperconectada pero profundamente ansiosa, donde la insatisfacción y el temor al futuro devoran la paz de los hombres. El ser humano busca desesperadamente seguridad en fuentes perecederas.

Este salmo fue compuesto por el rey David, quien conoció de primera mano la vida abnegada del pastor en el árido desierto de Judea. David utiliza dos metáforas poderosas: el *Pastor Cuidador* de ovejas y el *Anfitrión Real* que recibe a sus siervos.

En el idioma hebreo original, el pasaje abre con **YHVH Ro'i (יְהוָה רֹעִי)** ("El Señor es mi Pastor"), un pacto de relación íntima y gobierno soberano. La declaración **Lo Echsas (לֹא אֶחְסָר)** ("nada me faltará") no promete opulencia material, sino la garantía de que jamás careceremos de lo verdaderamente vital para nuestra alma.

*¿De qué manera podemos descansar con absoluta certidumbre en el cuidado del Buen Pastor en medio de nuestras crisis cotidianas?*

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### I. LA PROVISIÓN Y RESTAURACIÓN INAGOTABLE DEL PASTOR
> **Lectura:** *"En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará. Confortará mi alma."* — **Salmo 23:2-3a**

Dios no nos promete una vida libre de desiertos, sino su provisión constante que sacia y restaura el alma cansada.

**Exégesis:** Las expresiones "delicados pastos" (*De'she*) y "aguas de reposo" (*Menuhot*) describen lugares protegidos donde la oveja puede alimentarse sin temor. El verbo "confortará" (*Shuv*) significa literalmente hacer volver, restaurar o enderezar el alma que ha caído de espaldas (*cast down*).

**Desarrollo y Aplicación Pastoral:** En la predicación, debemos enfatizar cómo la Palabra de Dios y el Espíritu Santo son las verdaderas aguas que calman la sed espiritual del creyente. Ilustra con la terna compasión del pastor levantando a la oveja indefensa. Exhorta a la congregación a dejar de buscar saciedad en cisternas rotas y volverse a la lectura bíblica y la oración constante.

> 🔥 *"Tu satisfacción no depende de lo que posees en las manos, sino de quién te sostiene en las suyas."*

*Sin embargo, el camino del rebaño no siempre transcurre en prados verdes; a veces es necesario descender al valle profundo...*

#### II. LA PRESENCIA CONSOLADORA EN MEDIO DEL VALLE OSCURO
> **Lectura:** *"Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento."* — **Salmo 23:4**

El creyente no está exento de atravesar momentos de dolor, enfermedad o pérdida, pero jamás camina en soledad en medio de la tormenta.

**Exégesis:** El vocablo hebreo **Tzalmaveth (צַלְמָוֶת)** se traduce como "sombra densa" o "tinieblas profundas". En el desierto de Judea, los barrancos eran oscuros y peligrosos. La "vara" (*Shevet*) era el garrote para defender al rebaño de los lobos; el "cayado" (*Mish'enet*) era el bastón curvo para guiar y rescatar a la oveja atascada.

**Desarrollo y Aplicación Pastoral:** Al predicar este punto, recuerda a la iglesia que Dios no siempre quita el valle, pero siempre camina a nuestro lado dentro de él. La vara de Dios nos defiende del enemigo y su cayado nos disciplina con amor. Transmite aliento a los que sufren duelo o crisis económica, asegurándoles que la presencia de Cristo es más real que cualquier amenaza.

> 🔥 *"En el valle de sombra, la oscuridad es real, pero la presencia de Dios es infinitamente superior a tu temor."*

*Y el Señor no solo nos defiende en medio del valle, sino que nos invita a su mesa de victoria...*

#### III. EL BANQUETE DE LA GRACIA Y LA MORADA ETERNA
> **Lectura:** *"Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando. Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días."* — **Salmo 23:5-6**

Dios pasa de la figura del Pastor al Anfitrión Divino que honra a sus hijos y les asegura un destino glorioso.

**Exégesis:** En la cultura oriental, ungir la cabeza con aceite (*Shemen*) era el mayor honor brindado a un huésped distinguido. La copa "rebosante" (*Revayah*) habla de gozo colmado e inagotable. El vocablo **Hesed (חֶסֶד)** expresa el amor inquebrantable de pacto que persigue activamente al creyente como un guardián celestial.

**Desarrollo y Aplicación Pastoral:** Proclama con autoridad la seguridad de la salvación en Jesucristo. El creyente no es un vagabundo en este mundo; es un invitado de honor en la mesa del Rey. Invita a la congregación a vivir con mentalidad de eternidad, sabiendo que las pruebas terrenales son temporales, pero nuestra morada final en la casa del Padre es para siempre.

> 🔥 *"La misericordia de Dios no solo te perdona el pasado, sino que te escolta hoy y te asegura la eternidad."*

*Por lo tanto, concluyamos este mensaje rindiendo nuestro corazón ante el Gran Pastor de nuestras almas...*

---

#### 🎯 CONCLUSIÓN Y LLAMADO
Con Jehová como tu Pastor, tu pasado está cubierto por su gracia, tu presente protegido por su presencia en el valle y tu futuro asegurado en su banquete celestial.

Rinde hoy todas tus ansiedades y temores en el altar. Si has estado caminando descarriado o alejado del rebaño, escucha hoy la voz del Buen Pastor que dio su vida por ti en la cruz y regresa a su redil.

> **Versículo de Cierre:** *"Yo soy el buen pastor; el buen pastor su vida da por las ovejas."* — **Juan 10:11**`;
  }

  // -------------------------------------------------------------
  // 2. SPECIFIC MATCH: 1 TIMOTEO 4:12
  // -------------------------------------------------------------
  if (query.includes('1 timoteo 4:12') || query.includes('1 timoteo 4') || (query.includes('timoteo') && query.includes('juventud'))) {
    return `### 📜 INQUEBRANTABLES: SÉ EJEMPLO DE INTEGRIDAD EN EL LIDERAZGO

**Texto Principal:** 1 Timoteo 4:12 (RVR 1960)  
**Textos Secundarios:** Jeremías 1:6-8; 2 Timoteo 2:15; Tito 2:7-8  
**Idea Principal:** La autoridad espiritual de un servidor de Dios no emana de su edad biológica, sino de la excelencia e intachabilidad de su testimonio cristiano.  

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
A menudo el mundo evalúa la capacidad de un líder por sus años de experiencia o posición social. Sin embargo, en el Reino de Dios, el calibre espiritual se mide exclusivamente por la integridad del carácter y la fidelidad a la verdad.

El apóstol Pablo escribe esta carta pastoral a su joven colaborador Timoteo, a quien había encomendado la exigente tarea de estructurar el liderazgo de la iglesia en Éfeso y combatir corrientes heréticas.

En el texto griego original, la palabra **Neotes (νεότης)** alude a la juventud o madurez temprana (menores de 40 años en la cultura grecorromana). Frente a un consejo de ancianos (*presbyteros*), Timoteo corría el riesgo de ser menospreciado. Por eso Pablo utiliza el vocablo **Typos (τύπος)**, que significa "modelo", "patrón" o "estampa de sello".

*¿Cómo podemos ganarnos el respeto espiritual en nuestro ministerio y vencer el menosprecio a través del testimonio piadoso?*

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### I. SUPERANDO EL MENOSPRECIO MEDIANTE LA AUTORIDAD DEL CARÁCTER
> **Lectura:** *"Ninguno tenga en poco tu juventud..."* — **1 Timoteo 4:12a**

Las dudas externas, la inexperiencia o el juicio de otros jamás deben apagar el fuego del llamado divino sobre tu vida.

**Exégesis:** El verbo **Kataphroneo (καταφρονέω)** significa mirar hacia abajo con desdén o menospreciar. Pablo no le pide a Timoteo que exija respeto de manera impositiva o autoritaria, sino que inspire reverencia y credibilidad a través de una conducta irreprensible.

**Desarrollo y Aplicación Pastoral:** Al predicar este punto, anima a los líderes jóvenes y servidores a no acomplejarse frente a las críticas. Muestra cómo la autoridad espiritual no se exige con títulos ni fuerza, sino que se gana con humildad, servicio y coherencia de vida. Ilustra con una pequeña luz que no necesita gritar para ser vista en medio de una habitación a oscuras.

> 🔥 *"No dejes que el juicio de los hombres silencie la voz del llamado divino en tu vida."*

*Y para inspirar esa autoridad espiritual, Pablo desglosa los pilares fundamentales del modelo cristiano...*

#### II. LAS COLUMNAS INSUSTITUIBLES DEL TESTIMONIO PÚBLICO
> **Lectura:** *"...sino sé ejemplo de los creyentes en palabra, conducta, amor, espíritu, fe y pureza."* — **1 Timoteo 4:12b**

El testimonio del creyente abarca de manera integral la comunicación verbal, las acciones visibles y la devoción del corazón.

**Exégesis:** Pablo enumera seis áreas clave en el idioma griego: **Logos** (hablar edificante sin chisme), **Anastrophe** (estilo de vida transparente), **Agape** (amor abnegado por la iglesia), **Pneuma** (fervor espiritual), **Pistis** (fidelidad doctrinal) y **Hagneia** (pureza e intachabilidad moral).

**Desarrollo y Aplicación Pastoral:** Desglosa con claridad estas áreas durante el mensaje. Haz hincapié en la pureza moral (*Hagneia*) en un mundo hipersexualizado y en la palabra (*Logos*) evitando la chismografía en la iglesia. Desafía a la congregación a evaluar si sus vidas son un molde (*typos*) que otros pueden imitar con seguridad.

> 🔥 *"Tu vida hablada debe coincidir perfectamente con la vida que vives cuando nadie te observa."*

*Cuando estas áreas están cimentadas, la proclamación del Evangelio se vuelve poderosa e irrefutable...*

#### III. EL IMPACTO CUMPLIDO DEL EJEMPLO VIVO
> **Lectura:** *"Ten cuidado de ti mismo y de la doctrina; persiste en ello, pues haciendo esto, te salvarás a ti mismo y a los que te oyeren."* — **1 Timoteo 4:16**

Un mensaje bíblico respaldado por un testimonio santo tiene el poder de consolidar familias y transformar congregaciones enteras.

**Exégesis:** Cuando la vida del predicador coincide con su doctrina, la apología de la fe se vuelve invencible ante los de afuera y consolidadora para los creyentes débiles.

**Desarrollo y Aplicación Pastoral:** Concluye el desarrollo llamando a cada miembro de la iglesia a asumir la responsabilidad de ser referentes piadosos para las nuevas generaciones. Muestra cómo los jóvenes y niños de la iglesia necesitan ver modelos vivos de fe inquebrantable en sus hogares y ministerios.

> 🔥 *"Predica el Evangelio en todo momento; si es necesario, utiliza palabras, pero sobre todo utiliza tu vida."*

*Avancemos con esta profunda convicción hacia nuestra conclusión y compromiso final...*

---

#### 🎯 CONCLUSIÓN Y LLAMADO
Dios no busca gigantes de edad o posición, sino siervos y siervas dispuestos a ser moldeados como referentes (*typos*) de Cristo en la tierra.

Arrepiéntete si has excusado la tibieza espiritual en tu inexperiencia o juventud. Comprométete hoy a cultivar un testimonio limpio en palabra, conducta, amor y pureza.

> **Versículo de Cierre:** *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."* — **2 Timoteo 2:15**`;
  }

  // -------------------------------------------------------------
  // 3. DYNAMIC SERMON GENERATOR FOR ANY BIBLE PASSAGE
  // -------------------------------------------------------------
  const targetTopic = cleanPassage && cleanPassage.length > 2 ? cleanPassage.toUpperCase() : 'LA FIDELIDAD Y LA GRACIA DE DIOS';

  return `### 📜 LA GLORIA DE LA VERDAD Y EL LLAMADO A LA SANTIDAD

**Texto Principal:** ${targetTopic}  
**Textos Secundarios:** Salmo 119:105; 2 Timoteo 3:16-17; Romanos 12:1-2  
**Idea Principal:** Dios revela su voluntad soberana en las Sagradas Escrituras para transformar la mente, el corazón y la conducta diaria de todo creyente.  

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
Frente al relativismo moral, la confusión de valores y la incertidumbre moderna, la Palabra de Dios permanece como la única ancla inamovible para la fe de la iglesia.

El pasaje de **${targetTopic}** se enmarca dentro de la revelación divina inspirada por el Espíritu Santo para impartir sabiduría, rumbo y edificación a su pueblo en el contexto de la historia redentora.

En el idioma original de este texto, los verbos y términos clave revelan la autoridad del Dios Soberano llamando a su pueblo a la obediencia, al arrepentimiento y a la confianza absoluta en su gracia.

*¿De qué manera esta verdad eterna transforma nuestras decisiones cotidianas y fortalece nuestra caminata con Cristo?*

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### I. LA FIRMEZA DE LA VERDAD REVELADA EN LA PALABRA
> **Lectura:** *"${targetTopic}"*

Toda instrucción bíblica tiene como propósito divino dar luz a nuestras decisiones y edificar convicciones inquebrantables.

**Exégesis:** El análisis sintáctico y literario de este pasaje destaca la fidelidad del pacto de Dios con su pueblo. Las verdades aquí expresadas no son opiniones humanas, sino decretos divinos inspirados para la instrucción en justicia.

**Desarrollo y Aplicación Pastoral:** Al predicar este punto, enfatiza la urgencia de meditar en la Biblia diariamente. Ilustra con la firmeza de un faro en medio de la tormenta marítima que no vacila ante el oleaje. Exhorta a la iglesia a filtrar las ideologías contemporáneas a través del tamiz inmutable de la Escritura.

> 🔥 *"Cuando las emociones vacilan y las circunstancias cambian, la Palabra de Dios permanece firme como nuestra roca eterna."*

*Y esa verdad divina revelada exige una respuesta viva e inmediata en nuestra conducta diaria...*

#### II. LA TRANSFORMACIÓN PRÁCTICA DEL CARÁCTER
> **Lectura:** *"Pero sed hacedores de la palabra, y no tan solo oidores engañándoos a vosotros mismos."* — **Santiago 1:22**

La fe genuina no se limita al asentimiento intelectual; se demuestra cuando la sana doctrina se traduce en un estilo de vida santo.

**Exégesis:** Los imperativos del texto bíblico nos instan a una obediencia continua (**Pistis** activa). La fe que salva es una fe que transforma el corazón y se manifiesta en obras de amor y rectitud.

**Desarrollo y Aplicación Pastoral:** Explica a la congregación cómo llevar las enseñanzas del culto dominical al hogar, al lugar de trabajo y a la comunidad. Ilustra con los cimientos profundos de un edificio que, aunque no se ven a simple vista, sostienen toda la estructura en tiempos de huracán.

> 🔥 *"Un sermón escuchado cambia tu entendimiento, pero un sermón vivido transforma tu eternidad."*

*Y esta transformación práctica es posible únicamente cuando contemplamos la gracia redentora de Jesucristo...*

#### III. LA ESPERANZA CRISTOCÉNTRICA Y EL LLAMADO ETERNO
> **Lectura:** *"Puestos los ojos en Jesús, el autor y consumador de la fe..."* — **Hebreos 12:2a**

El centro de todas las Escrituras es la persona gloriosa y la obra redentora de nuestro Señor Jesucristo en la cruz.

**Exégesis:** Lucas 24:27 nos enseña que todo el canon bíblico apunta hacia el Mesías. Su sacrificio perfecto nos libera de la condena y su Espíritu Santo nos capacita para perseverar hasta el fin.

**Desarrollo y Aplicación Pastoral:** Proclama el Evangelio con poder y convicción. Recuerda a los creyentes que no servimos a Dios por miedo o para ganar méritos, sino como respuesta de amor por la salvación que Él nos regaló en Cristo.

> 🔥 *"No servimos a Dios para ser aceptados; servimos a Dios porque en Cristo ya fuimos amados, perdonados y aceptados."*

*Avancemos con esta convicción hacia la conclusión y el llamado pastoral...*

---

#### 🎯 CONCLUSIÓN Y LLAMADO
La verdad contenida en **${targetTopic}** nos despierta del conformismo espiritual y nos desafía a vivir apasionadamente para la gloria de Dios.

Entrega hoy tus cargas en el altar del Señor Jesús, renueva tu compromiso con la lectura bíblica y la oración, y decide vivir como una luz irreprensible en medio de tu generación.

> **Versículo de Cierre:** *"Santifícalos en tu verdad; tu palabra es verdad."* — **Juan 17:17**`;
}

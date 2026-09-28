export function generateClientTheologicalResponse(
  messageText: string, 
  context?: { courseTitle?: string; lessonTitle?: string }
): string {
  const query = (messageText || '').toLowerCase();

  // Extract clean passage name from user query
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

**📖 TEXTO PRINCIPAL:** Salmo 23:1-6 (RVR 1960)
**📖 TEXTOS SECUNDARIOS (OPCIONAL):** Juan 10:11-18; Isaías 40:11; Filipenses 4:19
**💡 IDEA PRINCIPAL:** En las manos del Buen Pastor, el creyente goza de provisión inagotable hoy, paz inquebrantable en la prueba y la promesa de una morada eterna.

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
- **Gancho Inicial y Relevancia:** Vivimos en una cultura hiperconectada pero profundamente ansiosa, donde la insatisfacción y el temor al futuro devoran la paz de los hombres.
- **Contexto Histórico-Gramatical:** Escrito por el rey David, quien conoció de primera mano la vida dura del pastor de ovejas en el desierto de Judea. David contrapone el cuidado abnegado de Dios a los peligros de los depredadores y la sequía.
- **Análisis Exegético de Idiomas Originales:**
  * **YHVH Ro'i (יְהוָה רֹעִי):** "El Señor es mi Pastor" (término de pacto íntimo y cuidado personal).
  * **Lo Echsas (לֹא אֶחְסָר):** "Nada me faltará" (literalmente: "no tendré escasez de lo verdaderamente esencial").
  * **Tzalmaveth (צַלְמָוֶת):** "Valle de sombra de muerte" (sombra densa, tinieblas profundas).
- **Pregunta Transicional:** ¿De qué manera podemos descansar con absoluta certidumbre en el cuidado del Buen Pastor en medio de nuestras crisis?

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### PUNTO 1: LA PROVISIÓN Y RESTAURACIÓN INAGOTABLE DEL PASTOR
- **NOMBRE DEL PUNTO:** La Provisión y Restauración del Creyente
- **TEXTO DEL PUNTO:** Salmo 23:1-3
- **INTRODUCCIÓN DEL PUNTO:** Dios no nos promete una vida libre de desiertos, sino su provisión constante que sacia el alma cansada.
- **EXÉGESIS DEL PUNTO:** Las expresiones "delicados pastos" (*De'she*) y "aguas de reposo" (*Menuhot*) describen lugares seguros de nutrición y paz. El verbo "confortará" (*Shuv*) significa hacer volver, restaurar o rescatar el alma descarriada.
- **SOBRE QUÉ HABLAR DEL PUNTO:** Hablar de cómo la Palabra de Dios sacia las ansiedades modernas. Ilustrar con la oveja que cae de espaldas (*cast down*) y necesita la mano del pastor para incorporarse.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"Tu satisfacción no depende de lo que posees en las manos, sino de quién te sostiene en las suyas."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Sin embargo, el camino del rebaño no siempre transcurre en prados verdes; a veces es necesario descender al valle...

#### PUNTO 2: LA PRESENCIA CONSOLADORA EN MEDIO DEL VALLE OSCURO
- **NOMBRE DEL PUNTO:** Seguridad en la Prueba Profunda
- **TEXTO DEL PUNTO:** Salmo 23:4
- **INTRODUCCIÓN DEL PUNTO:** El creyente no está exento de angustias, pero nunca camina solo en medio de la tormenta.
- **EXÉGESIS DEL PUNTO:** En los barrancos de Judea la luz del sol se apaga. La "vara" (*Shevet*) era el instrumento de defensa contra fieras; el "cayado" (*Mish'enet*) servía para guiar y rescatar.
- **SOBRE QUÉ HABLAR DEL PUNTO:** Destacar que en el valle oscuro la voz y la vara del Pastor infunden aliento. Explicar cómo la presencia de Cristo consuela en el duelo y la enfermedad.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"En el valle de sombra, la oscuridad es real, pero la presencia de Dios es infinitamente superior a tu temor."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Y Dios no solo nos defiende en el valle, sino que nos prepara un banquete de victoria...

#### PUNTO 3: EL BANQUETE DE LA GRACIA Y LA MORADA ETERNA
- **NOMBRE DEL PUNTO:** La Abundancia del Anfitrión Divino y la Gloria Eterna
- **TEXTO DEL PUNTO:** Salmo 23:5-6
- **INTRODUCCIÓN DEL PUNTO:** Dios pasa de la figura del Pastor al Anfitrión Real que honra a sus siervos.
- **EXÉGESIS DEL PUNTO:** Ungir la cabeza con aceite (*Shemen*) simboliza distinción y sanidad. La copa rebosante (*Revayah*) habla de gozo colmado. El bien y la misericordia (*Hesed*) nos persiguen activamente todos los días.
- **SOBRE QUÉ HABLAR DEL PUNTO:** Explicar la seguridad de la salvación y la esperanza de la casa celestial. El creyente no es un vagabundo espiritual, sino un ciudadano del Reino.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"La misericordia de Dios no solo te perdona el pasado, sino que te escolta hoy y te asegura la eternidad."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Por lo tanto, concluyamos rindiendo nuestra vida ante el Rey de Gloria.

---

#### 🎯 CONCLUSIÓN
- **Resumen Homilético:** Con YHVH como tu Pastor, tu pasado está perdonado por su gracia, tu presente protegido por su vara y tu futuro colmado en su casa.
- **Llamado Pastoral y Aplicación Directa:** Rinde hoy tus angustias y temores al Señor Jesús. Si has estado caminando alejado del rebaño, regresa al Buen Pastor que dio su vida por ti en la cruz.
- **TEXTO PARA TERMINAR:** *"Yo soy el buen pastor; el buen pastor su vida da por las ovejas."* — **Juan 10:11**`;
  }

  // -------------------------------------------------------------
  // 2. SPECIFIC MATCH: 1 TIMOTEO 4:12
  // -------------------------------------------------------------
  if (query.includes('1 timoteo 4:12') || query.includes('1 timoteo 4') || (query.includes('timoteo') && query.includes('juventud'))) {
    return `### 📜 INQUEBRANTABLES: SÉ EJEMPLO DE INTEGRIDAD EN EL LIDERAZGO

**📖 TEXTO PRINCIPAL:** 1 Timoteo 4:12 (RVR 1960)
**📖 TEXTOS SECUNDARIOS (OPCIONAL):** Jeremías 1:6-8; 2 Timoteo 2:15; Tito 2:7-8
**💡 IDEA PRINCIPAL:** La autoridad espiritual de un servidor de Dios no emana de su edad biológica, sino de la excelencia e intachabilidad de su testimonio cristiano.

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
- **Gancho Inicial y Relevancia:** A menudo el mundo evalúa la capacidad de un líder por sus años de experiencia o posición social. Sin embargo, en el Reino de Dios, el calibre espiritual se mide por el carácter.
- **Contexto Histórico-Gramatical:** Pablo escribe a Timoteo en Éfeso, donde el joven pastor debía liderar a ancianos y enfrentar corrientes heréticas.
- **Análisis Exegético de Idiomas Originales:**
  * **Typos (τύπος):** "Modelo", "patrón", "estampa de sello". El testimonio de Timoteo debía ser el estándar visible.
  * **Neotes (νεότης):** "Juventud". Menores de 40 años en el consejo cultural de ancianos (*presbyteros*).
- **Pregunta Transicional:** ¿Cómo ganarnos el respeto espiritual y vencer el menosprecio en nuestro servicio al Señor?

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### PUNTO 1: SUPERANDO EL MENOSPRECIO MEDIANTE LA AUTORIDAD ESPIRITUAL
- **NOMBRE DEL PUNTO:** Venciendo el Prejuicio Humano
- **TEXTO DEL PUNTO:** 1 Timoteo 4:12a
- **INTRODUCCIÓN DEL PUNTO:** Las dudas externas o la inexperiencia no pueden apagar el llamado de Dios sobre tu vida.
- **EXÉGESIS DEL PUNTO:** *Kataphroneo* (mirar hacia abajo con desdén). Pablo no le pide a Timoteo imponerse con agresividad, sino inspirar reverencia con su carácter.
- **SOBRE QUÉ HABLAR DEL PUNTO:** La autoridad no se exige, se inspira mediante el servicio humilde y la fidelidad doctrinal.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"No dejes que el juicio de los hombres silencie la voz del llamado divino en tu vida."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Y para inspirar esa autoridad, Pablo desglosa seis pilares de integridad...

#### PUNTO 2: LAS SEIS COLUMNAS DEL TESTIMONIO PÚBLICO
- **NOMBRE DEL PUNTO:** El Estándar Visible del Servidor
- **TEXTO DEL PUNTO:** 1 Timoteo 4:12b
- **INTRODUCCIÓN DEL PUNTO:** El testimonio cristiano abarca la comunicación, las acciones y la devoción interna.
- **EXÉGESIS DEL PUNTO:** Explicación del vocabulario griego: *Logos* (palabra edificante), *Anastrophe* (conducta irreprensible), *Agape* (amor sacrificial), *Pneuma* (fervor), *Pistis* (fe leal) y *Hagneia* (pureza moral).
- **SOBRE QUÉ HABLAR DEL PUNTO:** Detallar cada una de las 6 áreas. Aplicar la pureza en un mundo hipersexualizado y la palabra en tiempos de chisme.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"Tu vida hablada debe coincidir perfectamente con la vida que vives cuando nadie te observa."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Cuando estas áreas están cimentadas, el impacto del Evangelio se vuelve irrefutable...

#### PUNTO 3: EL IMPACTO TRANSFORMADOR DEL EJEMPLO VIVO
- **NOMBRE DEL PUNTO:** La Apología Incorruptible del Evangelio
- **TEXTO DEL PUNTO:** 1 Timoteo 4:12c
- **INTRODUCCIÓN DEL PUNTO:** Un mensaje respaldado por una vida santa tiene el poder de transformar familias y congregaciones.
- **EXÉGESIS DEL PUNTO:** El ejemplo piadoso consolida a los creyentes débiles y silencia a los detractores de la fe.
- **SOBRE QUÉ HABLAR DEL PUNTO:** Desafiar a los creyentes a asumir la responsabilidad de ser modelos para las nuevas generaciones.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"Predica el Evangelio en todo momento; si es necesario, utiliza palabras, pero sobre todo utiliza tu vida."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Avancemos con esta convicción hacia el compromiso final.

---

#### 🎯 CONCLUSIÓN
- **Resumen Homilético:** Dios no busca gigantes de edad, sino siervos dispuestos a ser moldeados como referentes de Cristo.
- **Llamado Pastoral y Aplicación Directa:** Arrepiéntete si has excusado tu tibieza en tu inexperiencia. Comprométete hoy a ser un modelo en palabra, conducta y pureza.
- **TEXTO PARA TERMINAR:** *"Procura con diligencia presentarte a Dios aprobado, como obrero que no tiene de qué avergonzarse, que usa bien la palabra de verdad."* — **2 Timoteo 2:15**`;
  }

  // -------------------------------------------------------------
  // 3. DYNAMIC SERMON GENERATOR FOR ANY REQUESTED BIBLE TEXT
  // -------------------------------------------------------------
  const targetTopic = cleanPassage && cleanPassage.length > 2 ? cleanPassage.toUpperCase() : 'LA FIDELIDAD Y LA GRACIA DE DIOS';

  return `### 📜 LA GLORIA DE LA VERDAD Y EL LLAMADO A LA SANTIDAD

**📖 TEXTO PRINCIPAL:** ${targetTopic}
**📖 TEXTOS SECUNDARIOS (OPCIONAL):** Salmo 119:105; 2 Timoteo 3:16-17; Romanos 12:1-2
**💡 IDEA PRINCIPAL:** Dios revela su voluntad soberana en su Palabra para transformar la mente, el corazón y la vida práctica de todo creyente.

---

#### 🎙️ INTRODUCCIÓN CON EXÉGESIS
- **Gancho Inicial y Relevancia:** Frente al relativismo moral y la incertidumbre moderna, la Palabra de Dios permanece como la única ancla inamovible para la iglesia.
- **Contexto Histórico-Gramatical:** El pasaje de **${targetTopic}** se enmarca dentro de la revelación inspirada por el Espíritu Santo para dar rumbo y edificación al pueblo de Dios.
- **Análisis Exegético de Idiomas Originales:** Examen del trasfondo del texto original (Hebreo/Griego), destacando la suficiencia y la autoridad bíblica para la vida del creyente.
- **Pregunta Transicional:** ¿De qué manera esta verdad eterna transforma nuestro caminar cotidiano y fortalece nuestra fe?

---

#### 🏛️ DESARROLLO HOMILÉTICO

#### PUNTO 1: LA FIRMEZA DE LA VERDAD REVELADA
- **NOMBRE DEL PUNTO:** Cimentados en la Palabra Inmutable
- **TEXTO DEL PUNTO:** ${targetTopic}
- **INTRODUCCIÓN DEL PUNTO:** Toda instrucción bíblica tiene como propósito dar luz y firmeza a nuestras decisiones.
- **EXÉGESIS DEL PUNTO:** Análisis del contexto sintáctico y literario del texto original, mostrando la fidelidad de las promesas divinas.
- **SOBRE QUÉ HABLAR DEL PUNTO:** La necesidad de meditar en las Escrituras diariamente para vencer el engaño del mundo. Ilustración del faro firme en la tormenta.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"Cuando las emociones vacilan, la Palabra de Dios permanece inamovible como nuestra roca."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Y esa verdad revelada exige una respuesta viva en nuestra conducta...

#### PUNTO 2: LA TRANSFORMACIÓN DE LA VIDA PRÁCTICA
- **NOMBRE DEL PUNTO:** Obediencia y Fe en Acción
- **TEXTO DEL PUNTO:** Santiago 1:22
- **INTRODUCCIÓN DEL PUNTO:** La fe genuina se demuestra cuando la doctrina se convierte en estilo de vida.
- **EXÉGESIS DEL PUNTO:** Los verbos imperativos bíblicos llaman a una acción continua (*Pistis* en acción constante).
- **SOBRE QUÉ HABLAR DEL PUNTO:** Cómo llevar el mensaje bíblico al hogar, al trabajo y al testimonio público. Ilustrar con el cimiento profundo de una casa.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"Un sermón escuchado cambia tu entendimiento, pero un sermón vivido transforma tu eternidad."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Esto solo es posible cuando contemplamos la gracia redentora de Cristo...

#### PUNTO 3: LA ESPERANZA CRISTOCÉNTRICA Y EL LLAMADO ETERNO
- **NOMBRE DEL PUNTO:** Fijando la Mirada en Jesucristo
- **TEXTO DEL PUNTO:** Hebreos 12:1-2
- **INTRODUCCIÓN DEL PUNTO:** El centro de toda la Escritura es la persona y la obra redentora del Señor Jesús.
- **EXÉGESIS DEL PUNTO:** Lucas 24:27 enseña que todo el canon bíblico apunta al Mesías y a su victoria en la cruz.
- **SOBRE QUÉ HABLAR DEL PUNTO:** La gracia inmerecida que sostiene al cristiano y la esperanza gloriosa de su venida.
- **UNA FRASE IMPORTANTE PARA LA CONGREGACIÓN:** *"No servimos a Dios para ser aceptados; servimos a Dios porque en Cristo ya fuimos amados y aceptados."*
- **EL PUENTE PARA EL SIGUIENTE PUNTO:** Avancemos a la conclusión con un corazón dispuesto a responder.

---

#### 🎯 CONCLUSIÓN
- **Resumen Homilético:** La verdad de **${targetTopic}** nos despierta del conformismo y nos desafía a vivir para la gloria de Dios.
- **Llamado Pastoral y Aplicación Directa:** Entrega tus cargas hoy al Señor Jesucristo, renueva tu compromiso con la oración y vive como luz en medio de tu comunidad.
- **TEXTO PARA TERMINAR:** *"Santifícalos en tu verdad; tu palabra es verdad."* — **Juan 17:17**`;
}

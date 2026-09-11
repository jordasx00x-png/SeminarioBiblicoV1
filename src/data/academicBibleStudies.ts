export interface InterlinearWord {
  original: string;
  transliteration: string;
  strong: string;
  morphology?: string;
  morphologyExpanded?: string;
  literal?: string;
  explanation?: string;
  english?: string;
  spanish?: string;
}

export interface VerseItemComparison {
  num: string;
  rvr1960: string;
  lbla: string;
  ntv: string;
  originalKeyHighlight?: string;
  theologicalNote?: string;
}

export interface AcademicPassageStudy {
  id: string;
  reference: string;
  title: string;
  testament: 'Antiguo Testamento' | 'Nuevo Testamento';
  division: 'Pentateuco' | 'Históricos' | 'Poéticos y Sabiduría' | 'Profetas Mayores' | 'Profetas Menores' | 'Evangelios' | 'Histórico NT' | 'Epístolas Paulinas' | 'Epístolas Generales' | 'Profecía (Apocalipsis)' | string;
  theologicalTheme: string;
  
  // Versions
  rvr1960Full: string;
  lblaFull: string;
  ntvFull: string;
  
  // Verse by verse breakdown for side-by-side comparative examination
  verses: VerseItemComparison[];
  
  // Translation notes comparing RV 1960, LBLA, and NTV
  versionAnalysis: {
    rvr1960Style: string;
    lblaStyle: string;
    ntvStyle: string;
    comparativeInsight?: string;
  };

  // Original Language
  originalLanguage: {
    language: 'Hebreo Bíblico' | 'Griego Koiné' | 'Hebreo / Arameo' | string;
    fullOriginal: string;
    fullTransliteration: string;
    manuscriptBasis: string; // e.g. NA28 / Códices Sinaítico (א) y Vaticano (B), BHS / Códice de Leningrado
    words: InterlinearWord[];
  };

  // Comentarios Bíblicos de Teólogos
  commentaries: {
    id: string;
    author: string;
    theologianEra: string;
    work: string;
    text: string;
    focus: string;
    crossReferences: string[];
  }[];

  // Exégesis Explicada Paso a Paso
  exegesis: {
    summary: string;
    step1_textualCriticism: string;
    step2_historicalContext: string;
    step3_syntacticalAnalysis: string;
    step4_christocentricTheology: string;
    step5_systematicTheology: string;
    step6_homiletics: {
      ptc: string; // Proposición Teológica Central
      outline: { point: string; textRef: string; explanation: string }[];
      pastoralApplication: string;
    };
  };
}

export const ACADEMIC_BIBLE_STUDIES: AcademicPassageStudy[] = [
  // 1. ROMANOS 3:21-26
  {
    id: 'rom-3-21-26',
    reference: 'Romanos 3:21-26',
    title: 'La Justificación por Gracia mediante la Redención y la Sangre Propiciatoria',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    theologicalTheme: 'Justificación Forense, Doble Imputación y Propiciación',
    
    rvr1960Full: 'Pero ahora, aparte de la ley, se ha manifestado la justicia de Dios, testificada por la ley y por los profetas; la justicia de Dios por medio de la fe en Jesucristo, para todos los que creen en él. Porque no hay diferencia, por cuanto todos pecaron, y están destituidos de la gloria de Dios, siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús, a quien Dios puso como propiciación por medio de la fe en su sangre, para manifestar su justicia, a causa de haber pasado por alto, en su paciencia, los pecados pasados, con la mira de manifestar en este tiempo su justicia, a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús.',
    
    lblaFull: 'Pero ahora, aparte de la ley, la justicia de Dios ha sido manifestada, atestiguada por la ley y los profetas; es decir, la justicia de Dios por medio de la fe en Jesucristo, para todos los que creen; pues no hay distinción; ya que todos pecaron y no alcanzan la gloria de Dios, siendo justificados gratuitamente por su gracia por medio de la redención que es en Cristo Jesús, a quien Dios exhibió públicamente como propiciación por su sangre a través de la fe, como demostración de su justicia, porque en su tolerancia, Dios pasó por alto los pecados cometidos anteriormente, para demostrar en este tiempo su justicia, a fin de que Él sea justo y sea el que justifica al que tiene fe en Jesús.',
    
    ntvFull: 'Pero ahora, Dios nos ha mostrado una manera diferente de ser justos ante él, no por la ley, sino como lo predijeron la ley de Moisés y los profetas: Dios nos hace justos ante sus ojos cuando ponemos nuestra fe en Jesucristo. Y eso es verdad para todo el que cree, sea quien sea. Pues todos hemos pecado; nadie puede alcanzar la meta gloriosa establecida por Dios. Sin embargo, Dios nos declara justos gratuita y bondadosamente por medio de Cristo Jesús, quien nos liberó del castigo de nuestros pecados. Pues Dios ofreció a Jesús como el sacrificio por el pecado. Las personas son declaradas justas cuando creen que Jesús sacrificó su vida al derramar su sangre. Con ese sacrificio, Dios demostró su justicia, porque pasó por alto los pecados de tiempos pasados en su paciencia; y en el tiempo presente, él demostró su justicia para ser a la vez el Dios justo y el que declara justos a los que confían en Jesús.',
    
    verses: [
      {
        num: '21',
        rvr1960: 'Pero ahora, aparte de la ley, se ha manifestado la justicia de Dios, testificada por la ley y por los profetas;',
        lbla: 'Pero ahora, aparte de la ley, la justicia de Dios ha sido manifestada, atestiguada por la ley y los profetas;',
        ntv: 'Pero ahora, Dios nos ha mostrado una manera diferente de ser justos ante él, no por la ley, sino como lo predijeron la ley de Moisés y los profetas:',
        originalKeyHighlight: 'Νυνὶ δὲ χωρὶς νόμου δικαιοσύνη θεοῦ πεφανέρωται (Nyni de chōris nomou dikaiosynē theou pephanerōtai)',
        theologicalNote: 'El quiebre escatológico «Nyni de» (Pero ahora) señala la irrupción de la era del Nuevo Pacto tras el diagnóstico de la culpabilidad humana total (vv. 1:18 - 3:20).'
      },
      {
        num: '22',
        rvr1960: 'la justicia de Dios por medio de la fe en Jesucristo, para todos los que creen en él. Porque no hay diferencia,',
        lbla: 'es decir, la justicia de Dios por medio de la fe en Jesucristo, para todos los que creen; pues no hay distinción;',
        ntv: 'Dios nos hace justos ante sus ojos cuando ponemos nuestra fe en Jesucristo. Y eso es verdad para todo el que cree, sea quien sea.',
        originalKeyHighlight: 'διὰ πίστεως Ἰησοῦ Χριστοῦ (dia pisteōs Iēsou Christou)',
        theologicalNote: 'La fe no es la base meritoria de la salvación, sino el instrumento receptor que se apropia de la justicia ajena (iustitia aliena) de Cristo.'
      },
      {
        num: '23',
        rvr1960: 'por cuanto todos pecaron, y están destituidos de la gloria de Dios,',
        lbla: 'ya que todos pecaron y no alcanzan la gloria de Dios,',
        ntv: 'Pues todos hemos pecado; nadie puede alcanzar la meta gloriosa establecida por Dios.',
        originalKeyHighlight: 'πάντες γὰρ ἥμαρτον καὶ ὑστεροῦνται (pantes gar hēmarton kai hysterountai)',
        theologicalNote: '«Pantes hemarton» (aoristo global: todos pecaron corporativamente en Adán y personalmente) y «hysterountai» (presente pasivo: caen continuamente cortos del estándar santo).'
      },
      {
        num: '24',
        rvr1960: 'siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús,',
        lbla: 'siendo justificados gratuitamente por su gracia por medio de la redención que es en Cristo Jesús,',
        ntv: 'Sin embargo, Dios nos declara justos gratuita y bondadosamente por medio de Cristo Jesús, quien nos liberó del castigo de nuestros pecados.',
        originalKeyHighlight: 'δικαιούμενοι δωρεὰν τῇ αὐτοῦ χάριτι διὰ τῆς ἀπολυτρώσεως (dikaioumenoi dōrean tē autou chariti dia tēs apolytrōseōs)',
        theologicalNote: 'Justificación forense: declaración jurídica irrevocable. «Dōrean» = de balde, sin causa intrínseca en el hombre.'
      },
      {
        num: '25',
        rvr1960: 'a quien Dios puso como propiciación por medio de la fe en su sangre, para manifestar su justicia, a causa de haber pasado por alto, en su paciencia, los pecados pasados,',
        lbla: 'a quien Dios exhibió públicamente como propiciación por su sangre a través de la fe, como demostración de su justicia, porque en su tolerancia, Dios pasó por alto los pecados cometidos anteriormente,',
        ntv: 'Pues Dios ofreció a Jesús como el sacrificio por el pecado. Las personas son declaradas justas cuando creen que Jesús sacrificó su vida al derramar su sangre. Con ese sacrificio, Dios demostró su justicia...',
        originalKeyHighlight: 'ὃν προέθετο ὁ θεὸς ἱλαστήριον (hon proetheto ho theos hilastērion)',
        theologicalNote: '«Hilastērion» (Propiciatorio / Sacrificio propiciatorio): la muerte de Cristo aplacó y satisfizo plenamente la santa ira de Dios contra el pecado.'
      },
      {
        num: '26',
        rvr1960: 'con la mira de manifestar en este tiempo su justicia, a fin de que él sea el justo, y el que justifica al que es de la fe de Jesús.',
        lbla: 'para demostrar en este tiempo su justicia, a fin de que Él sea justo y sea el que justifica al que tiene fe en Jesús.',
        ntv: 'y en el tiempo presente, él demostró su justicia para ser a la vez el Dios justo y el que declara justos a los que confían en Jesús.',
        originalKeyHighlight: 'εἰς τὸ εἶναι αὐτὸν δίκαιον καὶ δικαιοῦντα τὸν ἐκ πίστεως Ἰησοῦ',
        theologicalNote: 'La cruz resuelve el dilema cósmico: Dios es infinitamente justo (castigando el pecado en el Sustituto) y el que justifica al creyente impío.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Equivalencia formal de gran tradición hispana y peso litúrgico. Mantiene con fidelidad los términos teológicos técnicos («propiciación», «destituidos», «redención»).',
      lblaStyle: 'Máxima precisión literal académica. Traduce «proetheto» como «exhibió públicamente» (reflejando el acto público divino) y preserva la sintaxis griega de manera rigurosa.',
      ntvStyle: 'Equivalencia dinámica con énfasis en la claridad comunicativa contemporánea. Explica «propiciación» como «el sacrificio por el pecado» y «justificados» como «declarados justos gratuita y bondadosamente».'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'δικαιούμενοι δωρεὰν τῇ αὐτοῦ χάριτι διὰ τῆς ἀπολυτρώσεως τῆς ἐν Χριστῷ Ἰησοῦ, ὃν προέθετο ὁ θεὸς ἱλαστήριον διὰ [τῆς] πίστεως ἐν τῷ αὐτοῦ αἵματι εἰς ἔνδειξιν τῆς δικαιοσύνης αὐτοῦ...',
      fullTransliteration: 'dikaioumenoi dōrean tē autou chariti dia tēs apolytrōseōs tēs en Christō Iēsou, hon proetheto ho theos hilastērion dia [tēs] pisteōs en tō autou haimati...',
      manuscriptBasis: 'Nestle-Aland 28 (NA28), apoyado sólidamente por P46 (ca. 200 d.C.), Códice Sinaítico (א 01) y Códice Vaticano (B 03).',
      words: [
        {
          original: 'δικαιούμενοι',
          transliteration: 'dikaioumenoi',
          strong: 'G1344',
          morphology: 'Verbo Presente Pasivo Participio NMP',
          morphologyExpanded: 'Participio presente de dikaioō en voz pasiva (recibiendo la declaración forense)',
          literal: 'siendo declarados justos',
          explanation: 'Término forense legal: Dios emite el fallo absolutorio e imputa la justicia de Cristo.'
        },
        {
          original: 'δωρεάν',
          transliteration: 'dōrean',
          strong: 'G1432',
          morphology: 'Adverbio acusativo',
          morphologyExpanded: 'Gratis, sin costo, sin causa previa meritoria en el sujeto',
          literal: 'gratuitamente',
          explanation: 'La causa originaria está enteramente en el dador soberano, nunca en el receptor culpable.'
        },
        {
          original: 'ἀπολυτρώσεως',
          transliteration: 'apolytrōseōs',
          strong: 'G629',
          morphology: 'Sustantivo Genitivo Fem. Sing.',
          morphologyExpanded: 'Apolytrosis: liberación mediante el rescate completo (lytron)',
          literal: 'de la redención / liberación por rescate',
          explanation: 'Término de manumisión en el mercado de esclavos: comprados de la condenación por la sangre de Cristo.'
        },
        {
          original: 'ἱλαστήριον',
          transliteration: 'hilastērion',
          strong: 'G2435',
          morphology: 'Sustantivo Acusativo Neutro Sing.',
          morphologyExpanded: 'Propiciación / Propiciatorio (Kapporet hebreo en Éxodo 25:17-22)',
          literal: 'propiciación / sacrificio aplacador de la ira santa',
          explanation: 'La ofrenda de Cristo satisface y desvía la justa ira punitiva de Dios Padre contra el pecado.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-spurgeon-rom3',
        author: 'Charles Spurgeon',
        theologianEra: 'Príncipe de Predicadores',
        work: 'Sermones sobre la Justificación Gratuita (Vol. 18)',
        text: '«Siendo justificados gratuitamente por su gracia». Fíjense en la doble fuerza del texto sagrado: dice «gratuitamente» y luego añade «por su gracia». Es como si el Espíritu Santo supiera cuán inclinados somos a introducir nuestras propias obras ficticias en la cuenta de salvación. Dios nos justifica de balde, sin exigir precio alguno de nuestras manos, porque todo el precio infinito fue pagado por el Cordero en el Gólgota.',
        focus: 'Gratuidad Absoluta y Causa Eficiente de la Salvación',
        crossReferences: ['Romanos 5:1', 'Efesios 2:8-9', 'Isaías 55:1']
      },
      {
        id: 'c-macarthur-rom3',
        author: 'John MacArthur',
        theologianEra: 'Contemporáneo',
        work: 'Comentario MacArthur del NT: Romanos 1-8',
        text: 'La palabra clave aquí es hilastērion (propiciación). Algunos teólogos liberales intentan diluirla traduciéndola como "expiación" (simplemente cubrir el pecado), pero hilastērion en la literatura bíblica denota apaciguar la justa ira de un Dios ofendido. La cruz no solo limpia la mancha del pecador; satisface la indignación santa del Creador contra toda iniquidad.',
        focus: 'Propiciación vs Expiación y Teología Forense',
        crossReferences: ['1 Juan 2:2', 'Hebreos 2:17', 'Levítico 16:14']
      },
      {
        id: 'c-calvino-rom3',
        author: 'Juan Calvino',
        theologianEra: 'Reformador',
        work: 'Comentario a la Epístola a los Romanos',
        text: 'Pablo establece aquí la causa formal, material, eficiente y final de la justificación. La causa eficiente es la misericordia gratuita del Padre; la causa material es Cristo con su sangre y obediencia perfecta; la causa instrumental es la fe; y la causa final es la manifestación de la gloria y justicia soberana de Dios.',
        focus: 'Las Cuatro Causas Aristotélico-Teológicas de la Justificación',
        crossReferences: ['Romanos 11:36', 'Gálatas 3:11', 'Tito 3:7']
      }
    ],

    exegesis: {
      summary: 'Romanos 3:21-26 constituye el centro teológico del Nuevo Testamento. Pablo demuestra cómo la justicia de Dios se manifiesta aparte de las obras de la ley mediante la fe en la obra redentora y propiciatoria de Cristo Jesús.',
      step1_textualCriticism: 'El texto en NA28 es extraordinariamente seguro. En el v. 25, la variante de omitir el artículo «tēs» antes de «pisteōs» está respaldada por P46, א y B, lo que enfatiza la naturaleza cualitativa de la fe como instrumento puro receptor.',
      step2_historicalContext: 'Escrito por Pablo desde Corinto (ca. 57 d.C.) a una congregación mixta de judíos y gentiles en la capital del imperio. Pablo derriba el orgullo nacionalista judío demostrando que no hay distinción en la condenación ni en la justificación.',
      step3_syntacticalAnalysis: 'Oración densa gobernada por el verbo principal «pephanerōtai» (Perfecto Pasivo: la justicia ha sido manifestada históricamente en la cruz y permanece revelada). De allí se desprenden los participios dependientes «dikaioumenoi» (justificados) y el pronombre relativo «hon proetheto» (a quien Dios propuso públicamente).',
      step4_christocentricTheology: 'Cristo es el verdadero Propiciatorio (Kapporet) sobre el cual se derrama la sangre del Nuevo Pacto en el verdadero Día de Expiación. Todo el sistema sacrificial levítico halla su cumplimiento perfecto y definitivo en su muerte sustitutiva.',
      step5_systematicTheology: 'Doctrina de la Doble Imputación (2 Co 5:21): nuestro pecado fue legalmente imputado a Cristo en la cruz, y su perfecta justicia es legalmente imputada al creyente mediante la sola fe (Confesión de Westminster Cap. XI).',
      step6_homiletics: {
        ptc: 'Dios reivindica su santa justicia y rescata a pecadores culpables declarándolos justos de manera gratuita mediante la fe en la sangre propiciatoria de Jesucristo.',
        outline: [
          { point: '1. La Necesidad Universal: La bancarrota moral de toda la humanidad (vv. 21-23)', textRef: 'vv. 21-23', explanation: 'Nadie puede justificarse por las obras de la ley.' },
          { point: '2. La Provisión Soberana: Redención y propiciación por la sangre de Cristo (vv. 24-25a)', textRef: 'vv. 24-25a', explanation: 'La ira de Dios es satisfecha y el esclavo es liberado.' },
          { point: '3. El Triunfo Divino: Dios es a la vez el Juez Justo y el Justificador misericordioso (vv. 25b-26)', textRef: 'vv. 25b-26', explanation: 'La gloria de Dios resplandece en el evangelio de la gracia.' }
        ],
        pastoralApplication: 'El creyente no vive bajo el terror de la condenación ni bajo la tiranía del legalismo, sino en el reposo inamovible del veredicto judicial de Dios sellado en el Calvario.'
      }
    }
  },

  // 2. ROMANOS 8:28-39
  {
    id: 'rom-8-28-39',
    reference: 'Romanos 8:28-39',
    title: 'La Cadena Dorada de la Redención y la Seguridad Eterna en Cristo',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    theologicalTheme: 'Ordo Salutis, Elección Soberana y Preservación de los Santos',

    rvr1960Full: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados. Porque a los que antes conoció, también los predestinó para que fuesen hechos conformes a la imagen de su Hijo, para que él sea el primogénito entre muchos hermanos. Y a los que predestinó, a estos también llamó; y a los que llamó, a estos también justificó; y a los que justificó, a estos también glorificó. ¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros?... Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir... nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.',

    lblaFull: 'Y sabemos que para los que aman a Dios, todas las cosas cooperan para bien, esto es, para los que son llamados conforme a su propósito. Porque a los que de antemano conoció, también los predestinó a ser hechos conformes a la imagen de su Hijo, para que Él sea el primogénito entre muchos hermanos; y a los que predestinó, a esos también llamó; y a los que llamó, a esos también justificó; y a los que justificó, a esos también glorificó. ¿Qué, pues, diremos a esto? Si Dios está por nosotros, ¿quién estará contra nosotros?... Porque estoy convencido de que ni la muerte, ni la vida, ni ángeles, ni principados, ni lo presente, ni lo por venir... nos podrá separar del amor de Dios que es en Cristo Jesús Señor nuestro.',

    ntvFull: 'Y sabemos que Dios hace que todas las cosas cooperen para el bien de quienes lo aman y son llamados según el propósito que él tiene para ellos. Pues Dios conoció a los suyos de antemano y los eligió para que llegaran a ser como su Hijo, con el fin de que su Hijo fuera el primogénito entre muchos hermanos. Una vez que los eligió, los llamó para que se acercaran a él; y una vez que los llamó, los puso en la relación correcta con él; y luego de ponerlos en la relación correcta con él, les dio su gloria. ¿Qué podemos decir acerca de cosas tan maravillosas como estas? Si Dios está a favor de nosotros, ¿quién podrá ponerse en nuestra contra?... Y estoy convencido de que nada podrá jamás separarnos del amor de Dios. Ni la muerte, ni la vida, ni ángeles ni demonios, ni nuestros temores de hoy ni nuestras preocupaciones de mañana... nada en toda la creación podrá jamás separarnos del amor de Dios, que está revelado en Cristo Jesús nuestro Señor.',

    verses: [
      {
        num: '28',
        rvr1960: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.',
        lbla: 'Y sabemos que para los que aman a Dios, todas las cosas cooperan para bien, esto es, para los que son llamados conforme a su propósito.',
        ntv: 'Y sabemos que Dios hace que todas las cosas cooperen para el bien de quienes lo aman y son llamados según el propósito que él tiene para ellos.',
        originalKeyHighlight: 'τοῖς κατὰ πρόθεσιν κλητοῖς οὖσιν (tois kata prothesin klētois ousin)',
        theologicalNote: '«Prothesin» (G4286): el decreto eterno e inmutable de Dios que rige todas las circunstancias providenciales.'
      },
      {
        num: '29',
        rvr1960: 'Porque a los que antes conoció, también los predestinó para que fuesen hechos conformes a la imagen de su Hijo, para que él sea el primogénito entre muchos hermanos.',
        lbla: 'Porque a los que de antemano conoció, también los predestinó a ser hechos conformes a la imagen de su Hijo, para que Él sea el primogénito entre muchos hermanos;',
        ntv: 'Pues Dios conoció a los suyos de antemano y los eligió para que llegaran a ser como su Hijo, con el fin de que su Hijo fuera el primogénito entre muchos hermanos.',
        originalKeyHighlight: 'οὓς προέγνω, καὶ προώρισεν συμμόρφους τῆς εἰκόνος τοῦ υἱοῦ αὐτοῦ',
        theologicalNote: '«Proegnō» (pre-conoció): en el pensamiento semítico no es mera presciencia pasiva, sino amor electivo íntimo y soberano fijado de antemano.'
      },
      {
        num: '30',
        rvr1960: 'Y a los que predestinó, a estos también llamó; y a los que llamó, a estos también justificó; y a los que justificó, a estos también glorificó.',
        lbla: 'y a los que predestinó, a esos también llamó; y a los que llamó, a esos también justificó; y a los que justificó, a esos también glorificó.',
        ntv: 'Una vez que los eligió, los llamó para que se acercaran a él; y una vez que los llamó, los puso en la relación correcta con él; y luego de ponerlos en la relación correcta con él, les dio su gloria.',
        originalKeyHighlight: 'οὓς δὲ ἐδικαίωσεν, τούτους καὶ ἐδόξασεν (edoxasen)',
        theologicalNote: 'La Cadena Dorada: cinco verbos en aoristo indicativo. El uso del tiempo aoristo para «glorificó» contempla la glorificación futura como un hecho consumado e infalible en el decreto de Dios.'
      },
      {
        num: '31-34',
        rvr1960: '¿Qué, pues, diremos a esto? Si Dios es por nosotros, ¿quién contra nosotros? El que no escatimó ni a su propio Hijo... ¿Cómo no nos dará también con él todas las cosas? ¿Quién acusará a los escogidos de Dios? Dios es el que justifica.',
        lbla: '¿Qué, pues, diremos a esto? Si Dios está por nosotros, ¿quién estará contra nosotros? El que no eximió ni a su propio Hijo... ¿Quién acusará a los escogidos de Dios? Dios es el que justifica.',
        ntv: '¿Qué podemos decir acerca de cosas tan maravillosas como estas? Si Dios está a favor de nosotros, ¿quién podrá ponerse en nuestra contra?... ¿Quién se atreve a acusarnos a nosotros, a quienes Dios ha elegido para sí mismo? Nadie, porque Dios mismo nos declaró justos.',
        originalKeyHighlight: 'τίς ἐγκαλέσει κατὰ ἐκλεκτῶν θεοῦ; θεὸς ὁ δικαιῶν',
        theologicalNote: 'Retórica forense triunfal: el Juez Supremo ha dictado sentencia absolutoria eterna.'
      },
      {
        num: '38-39',
        rvr1960: 'Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados... nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.',
        lbla: 'Porque estoy convencido de que ni la muerte, ni la vida, ni ángeles, ni principados... nos podrá separar del amor de Dios que es en Cristo Jesús Señor nuestro.',
        ntv: 'Y estoy convencido de que nada podrá jamás separarnos del amor de Dios. Ni la muerte, ni la vida, ni ángeles ni demonios... nada en toda la creación podrá jamás separarnos...',
        originalKeyHighlight: 'πέπεισμαι γὰρ ὅτι οὔτε θάνατος οὔτε ζωή... χωρίσαι ἀπὸ τῆς ἀγάπης τοῦ θεοῦ',
        theologicalNote: '«Pepeismai» (Perfecto Pasivo): convicción absoluta e inamovible anclada en el pacto eterno.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción monumental y majestuosa. Mantiene la resonancia rítmica inigualable de la Catena Aurea («a estos también llamó... a estos también justificó... a estos también glorificó»).',
      lblaStyle: 'Precisión técnica exacta. Traduce «de antemano conoció» y «predestinó a ser hechos conformes», conservando la fuerza sintáctica subordinada.',
      ntvStyle: 'Enfoque pastoral directo. Desagrega las fórmulas teológicas complejas en lenguaje accesible («los puso en la relación correcta con él», «hace que todas las cosas cooperen para el bien»).'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'οἴδαμεν δὲ ὅτι τοῖς ἀγαπῶσιν τὸν θεὸν πάντα συνεργεῖ εἰς ἀγαθόν, τοῖς κατὰ πρόθεσιν κλητοῖς οὖσιν. ὅτι οὓς προέγνω, καὶ προώρισεν συμμόρφους τῆς εἰκόνος τοῦ υἱοῦ αὐτοῦ...',
      fullTransliteration: 'oidamen de hoti tois agapōsin ton theon panta synergei eis agathon, tois kata prothesin klētois ousin...',
      manuscriptBasis: 'Aparato crítico NA28. En v. 28, manuscritos antiquísimos como P46 y Códice B contienen «ho theos synergei» (Dios obra todas las cosas para bien).',
      words: [
        {
          original: 'πρόθεσιν',
          transliteration: 'prothesin',
          strong: 'G4286',
          morphology: 'Sustantivo Acusativo Fem. Sing.',
          morphologyExpanded: 'Prothesis: propósito deliberado, designio soberano inmutable',
          literal: 'según el propósito decretivo',
          explanation: 'No es una reacción imprevista de Dios, sino su plan eterno trazado en la eternidad.'
        },
        {
          original: 'προέγνω',
          transliteration: 'proegnō',
          strong: 'G4267',
          morphology: 'Verbo Aoristo Activo Indicativo 3s',
          morphologyExpanded: 'Proginōskō: conocer de antemano en intimidad pactual de amor electivo',
          literal: 'conoció de antemano íntimamente',
          explanation: 'En hebreo (yada) denota unión pactual íntima (como en Amós 3:2 o Jeremías 1:5). Dios conoció a personas, no solo a hechos.'
        },
        {
          original: 'προώρισεν',
          transliteration: 'proōrisen',
          strong: 'G4309',
          morphology: 'Verbo Aoristo Activo Indicativo 3s',
          morphologyExpanded: 'Proorizō: trazar el límite o destino de antemano',
          literal: 'predestinó soberanamente',
          explanation: 'Fijar de antemano el destino glorioso de los elegidos para ser semejantes a Cristo.'
        },
        {
          original: 'ἐδόξασεν',
          transliteration: 'edoxasen',
          strong: 'G1392',
          morphology: 'Verbo Aoristo Activo Indicativo 3s',
          morphologyExpanded: 'Aoristo epistolar o proléptico (glorificación futura consumada)',
          literal: 'glorificó',
          explanation: 'Tan seguro es el decreto de Dios que la glorificación futura del creyente se narra como un hecho en tiempo pasado consumado.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-spurgeon-rom8',
        author: 'Charles Spurgeon',
        theologianEra: 'Príncipe de Predicadores',
        work: 'La Inquebrantable Cadena de la Salvación',
        text: 'Miren esta cadena celestial de cinco eslabones de oro puro: Conoció de antemano, predestinó, llamó, justificó y glorificó. Ni un solo eslabón puede quebrarse jamás. Si el primer eslabón está forjado en el consejo eterno de la Trinidad y el último eslabón está anclado en la gloria imperecedera del cielo, el creyente en medio de sus pruebas terrenales está infinitamente seguro.',
        focus: 'Seguridad Inmutable del Pacto y la Cadena Dorada',
        crossReferences: ['Juan 10:28-29', 'Efesios 1:4-5', 'Filipenses 1:6']
      },
      {
        id: 'c-sproul-rom8',
        author: 'Dr. R.C. Sproul',
        theologianEra: 'Contemporáneo',
        work: 'Escogidos por Dios',
        text: 'Pablo no dice que Dios miró por el túnel del tiempo para ver quiénes iban a tener fe por sí mismos. El conocimiento previo bíblico (prognosis) es el amor electivo y especial con que Dios puso su afecto salvífico sobre sus escogidos antes de la creación. La fe no es la causa de la elección; es el fruto bendito del llamamiento eficaz de Dios.',
        focus: 'Elección Incondicional y Llamamiento Eficaz',
        crossReferences: ['2 Timoteo 1:9', 'Jeremías 31:3', '1 Pedro 1:2']
      }
    ],

    exegesis: {
      summary: 'Romanos 8:28-39 es el clímax doxológico y consolatorio de la epístola a los Romanos, garantizando que el propósito redentor de Dios jamás será frustrado por sufrimiento, persecución o juicio.',
      step1_textualCriticism: 'Aparato NA28 sólido. La perícopa está perfectamente delimitada entre el gemido de la creación (vv. 18-27) y la doxología triunfal del amor divino en Cristo.',
      step2_historicalContext: 'Los creyentes en Roma enfrentaban la inminencia de persecuciones violentas bajo el imperio romano. Pablo les recuerda que el sufrimiento presente no es indicativo de abandono divino, sino parte del crisol soberano de santificación.',
      step3_syntacticalAnalysis: 'Estructura en cascada (Catena Aurea): cada verbo es el punto de partida del siguiente en paralelismo sintáctico estricto. La sección concluye con una serie de 7 preguntas retóricas de tribunal legal que desafían a todo acusador cósmico.',
      step4_christocentricTheology: 'Cristo es el primogénito (prōtotokos) no en orden cronológico creado, sino en preeminencia y señorío. Todo el plan de salvación converge en conformar a la iglesia a su imagen santa y perfecta.',
      step5_systematicTheology: 'La Doctrina de la Perseverancia y Preservación de los Santos (TULIP - Punto P). Ninguno de los justificados se pierde en el camino hacia la glorificación.',
      step6_homiletics: {
        ptc: 'La salvación de los elegidos está eternamente asegurada en el decreto inmutable de Dios, quien convierte toda aflicción presente en instrumento de conformación a Cristo y gloria final.',
        outline: [
          { point: '1. El Propósito Soberano: Dios gobierna todas las circunstancias para bien (v. 28)', textRef: 'v. 28', explanation: 'La providencia activa al servicio del plan redentor.' },
          { point: '2. La Cadena Irrompible: Del amor eterno a la glorificación consumada (vv. 29-30)', textRef: 'vv. 29-30', explanation: 'La seguridad inmutable de los escogidos.' },
          { point: '3. El Desafío Invicto: Ninguna fuerza cósmica nos separará de Cristo (vv. 31-39)', textRef: 'vv. 31-39', explanation: 'La victoria triunfal sobre la tribulación, espada o muerte.' }
        ],
        pastoralApplication: 'El cristiano descansa con firmeza en medio de la enfermedad o el dolor, sabiendo que su salvación no depende de su propia fuerza de voluntad, sino del amor invencible de Dios en Cristo.'
      }
    }
  },

  // 3. JUAN 1:1-14
  {
    id: 'jn-1-1-14',
    reference: 'Juan 1:1-14',
    title: 'El Verbo Eterno Encarnado: Deidad Ontológica y Plenitud de Gracia',
    testament: 'Nuevo Testamento',
    division: 'Evangelios',
    theologicalTheme: 'Cristología, Trinidad, Deidad del Verbo y Encarnación',

    rvr1960Full: 'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios. Este era en el principio con Dios. Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho. En él estaba la vida, y la vida era la luz de los hombres... Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.',

    lblaFull: 'En el principio ya existía el Verbo, y el Verbo estaba con Dios, y el Verbo era Dios. Él estaba en el principio con Dios. Todas las cosas fueron hechas por medio de Él, y sin Él nada de lo que ha sido hecho, fue hecho. En Él estaba la vida, y la vida era la luz de los hombres... Y el Verbo se hizo carne, y habitó entre nosotros, y vimos su gloria, gloria como del unigénito del Padre, lleno de gracia y de verdad.',

    ntvFull: 'En el principio la Palabra ya existía. La Palabra estaba con Dios, y la Palabra era Dios. El que es la Palabra existía en el principio con Dios. Dios creó todas las cosas por medio de él, y nada fue creado sin él. La Palabra le dio vida a todo lo creado, y su vida trajo luz a todos... Entonces la Palabra se hizo hombre y vino a vivir entre nosotros. Estaba lleno de amor inagotable y fidelidad. Y hemos visto su gloria, la gloria del único Hijo del Padre.',

    verses: [
      {
        num: '1',
        rvr1960: 'En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.',
        lbla: 'En el principio ya existía el Verbo, y el Verbo estaba con Dios, y el Verbo era Dios.',
        ntv: 'En el principio la Palabra ya existía. La Palabra estaba con Dios, y la Palabra era Dios.',
        originalKeyHighlight: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος.',
        theologicalNote: '1a: Coeternidad (ēn = imperfecto continuo); 1b: Distinción personal con el Padre (pros ton theon = cara a cara); 1c: Plena deidad ontológica (regla de Colwell).'
      },
      {
        num: '3',
        rvr1960: 'Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho.',
        lbla: 'Todas las cosas fueron hechas por medio de Él, y sin Él nada de lo que ha sido hecho, fue hecho.',
        ntv: 'Dios creó todas las cosas por medio de él, y nada fue creado sin él.',
        originalKeyHighlight: 'πάντα δι’ αὐτοῦ ἐγένετο (panta di’ autou egeneto)',
        theologicalNote: 'El Verbo es el Agente Creador de todo el cosmos. Si nada de lo creado existe sin Él, Él mismo no puede pertenecer a la categoría de lo creado.'
      },
      {
        num: '14',
        rvr1960: 'Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.',
        lbla: 'Y el Verbo se hizo carne, y habitó entre nosotros, y vimos su gloria, gloria como del unigénito del Padre, lleno de gracia y de verdad.',
        ntv: 'Entonces la Palabra se hizo hombre y vino a vivir entre nosotros. Estaba lleno de amor inagotable y fidelidad. Y hemos visto su gloria, la gloria del único Hijo del Padre.',
        originalKeyHighlight: 'καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν (eskēnōsen en hēmin)',
        theologicalNote: '«Eskēnōsen» (tabernaculizó): alude al Tabernáculo del Éxodo donde la Shejiná (gloria manifiesta de Yahvé) moraba en medio del campamento de Israel.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción clásica y solemne con el término latino eclesiástico «el Verbo» (derivado de Verbum en la Vulgata). Gran belleza poética.',
      lblaStyle: 'Precisión rigurosa: traduce «ya existía» para el imperfecto «ēn» en el v. 1, clarificando la preexistencia eterna e increada de Cristo.',
      ntvStyle: 'Enfoque comunicativo directo: traduce «la Palabra», «se hizo hombre y vino a vivir entre nosotros», y «lleno de amor inagotable y fidelidad» (traduciendo el hebraísmo jesed ve-emet).'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'Ἐν ἀρχῇ ἦν ὁ λόγος, καὶ ὁ λόγος ἦν πρὸς τὸν θεόν, καὶ θεὸς ἦν ὁ λόγος... καὶ ὁ λόγος σὰρξ ἐγένετο καὶ ἐσκήνωσεν ἐν ἡμῖν, καὶ ἐθεασάμεθα τὴν δόξαν αὐτοῦ...',
      fullTransliteration: 'En archē ēn ho logos, kai ho logos ēn pros ton theon, kai theos ēn ho logos... kai ho logos sarx egeneto kai eskēnōsen en hēmin...',
      manuscriptBasis: 'P66 (ca. 175-200 d.C.), P75 (ca. 200 d.C.), Códice Sinaítico (א 01) y Vaticano (B 03). Testimonio textual impecable.',
      words: [
        {
          original: 'λόγος',
          transliteration: 'logos',
          strong: 'G3056',
          morphology: 'Sustantivo Nominativo Masc. Sing.',
          morphologyExpanded: 'Logos: Palabra divina, revelación suprema, la Segunda Persona de la Trinidad',
          literal: 'el Verbo / la Palabra viva',
          explanation: 'Conecta con la Memra aramea (la Palabra creadora de Dios en el AT) y el Verbo revelador.'
        },
        {
          original: 'πρὸς τὸν θεόν',
          transliteration: 'pros ton theon',
          strong: 'G4314 + G3588 + G2316',
          morphology: 'Preposición pros con acusativo',
          morphologyExpanded: 'Orientado hacia, en comunión cara a cara íntima y recíproca',
          literal: 'cara a cara con Dios',
          explanation: 'Distingue eternamente la Persona del Hijo respecto de la Persona del Padre.'
        },
        {
          original: 'θεὸς ἦν',
          transliteration: 'theos ēn',
          strong: 'G2316 + G2258',
          morphology: 'Predicado nominal anartro + Verbo copulativo',
          morphologyExpanded: 'Regla de Colwell: Predicado theos precede al verbo sin artículo para denotar naturaleza y esencia absoluta',
          literal: 'Dios era el Verbo',
          explanation: 'El Verbo comparte en grado absoluto e infinito toda la sustancia divina con el Padre.'
        },
        {
          original: 'ἐσκήνωσεν',
          transliteration: 'eskēnōsen',
          strong: 'G4637',
          morphology: 'Verbo Aoristo Activo Indicativo 3s',
          morphologyExpanded: 'Skēnoō: plantar tabernáculo, morar como en tienda sagrada',
          literal: 'puso su tabernáculo entre nosotros',
          explanation: 'Cristo es el verdadero templo terrenal donde Dios habita visiblemente con los hombres.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-calvino-jn1',
        author: 'Juan Calvino',
        theologianEra: 'Reformador',
        work: 'Comentario al Evangelio según San Juan',
        text: 'Al decir que el Verbo era con Dios, Juan distingue al Verbo del Padre según su hipóstasis o subsistencia personal; y al añadir de inmediato que el Verbo era Dios, afirma enfáticamente la unidad indivisible de su esencia divina contra todo arrianismo y modalismo.',
        focus: 'Unidad de Esencia y Distinción de Personas en la Trinidad',
        crossReferences: ['Hebreos 1:3', 'Colosenses 1:15', 'Filipenses 2:6']
      },
      {
        id: 'c-macarthur-jn1',
        author: 'John MacArthur',
        theologianEra: 'Contemporáneo',
        work: 'Comentario MacArthur del NT: Juan 1-11',
        text: 'Juan 1:1 es el golpe de gracia a las herejías como los Testigos de Jehová. La ausencia de artículo antes de theos en la cláusula final no significa "un dios" menor, sino que califica la naturaleza del Sujeto: el Logos posee la esencia misma de Dios. Afirmar que Jesús fue creado es negar la piedra angular del cristianismo apostólico.',
        focus: 'Gramática Griega, Regla de Colwell y Apologética Trinitaria',
        crossReferences: ['Juan 10:30', 'Juan 20:28', 'Tito 2:13']
      }
    ],

    exegesis: {
      summary: 'El Prólogo de Juan (1:1-18) es el vestíbulo teológico del cuarto evangelio, donde el apóstol proclama la coeternidad, deidad consustancial y encarnación histórica del Hijo de Dios.',
      step1_textualCriticism: 'Aparato NA28 extraordinario. El papiro P66 confirma la lectura exacta de Juan 1:1 con absoluta pureza manuscrita.',
      step2_historicalContext: 'Escrito hacia el 85-90 d.C. desde Éfeso. Juan confronta el gnosticismo incipiente y el docetismo (que negaba que el Mesías hubiese venido verdaderamente en carne humana).',
      step3_syntacticalAnalysis: 'Construcción en quiasmo y progresión de escalera (clímax retórico). El contraste entre «ēn» (existía continuamente sin origen) en los vv. 1-2 y «egeneto» (llegó a ser / fue hecho) en el v. 14 resalta el misterio de la Encarnación.',
      step4_christocentricTheology: 'Cristo es el cumplimiento tipológico del Tabernáculo del desierto (Éx 40) y la gloria de la Shejiná. La gracia y verdad (hesed ve-emet) del pacto se encarnan personalmente en Jesús.',
      step5_systematicTheology: 'Unión Hipostática (Credo de Calcedonia 451 d.C.): Dos naturalezas completas (plenamente Dios y plenamente hombre) unidas en una sola Persona divina, sin confusión, sin mutación, sin división y sin separación.',
      step6_homiletics: {
        ptc: 'El Verbo eterno e increado, consustancial con el Padre, se hizo verdaderamente hombre para manifestar la gloria y gracia redentora de Dios a la humanidad caída.',
        outline: [
          { point: '1. La Gloria Eterna del Verbo: Coeterno y Plenamente Dios (vv. 1-3)', textRef: 'vv. 1-3', explanation: 'La deidad increada de Jesucristo.' },
          { point: '2. La Luz en las Tinieblas: Rechazado por los suyos pero recibido por los renacidos (vv. 4-13)', textRef: 'vv. 4-13', explanation: 'La necesidad de la fe salvífica por regeneración divina.' },
          { point: '3. El Misterio de la Encarnación: El Verbo hecho carne habitó entre nosotros (v. 14)', textRef: 'v. 14', explanation: 'La comunión restaurada con Dios en Cristo.' }
        ],
        pastoralApplication: 'Adorar con reverencia al Salvador encarnado, reconociendo que solo a través del Verbo hecho carne tenemos acceso directo a la gracia y al rostro del Padre.'
      }
    }
  },

  // 4. EFESIOS 2:1-10
  {
    id: 'eph-2-1-10',
    reference: 'Efesios 2:1-10',
    title: 'De la Muerte Espiritual a la Vida por Pura Gracia: Sola Gratia y Sola Fide',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    theologicalTheme: 'Depravación Total, Regeneración Monergista, Sola Gratia y Obras de Gratitud',

    rvr1960Full: 'Y él os dio vida a vosotros, cuando estabais muertos en vuestros delitos y pecados, en los cuales anduvisteis en otro tiempo... Pero Dios, que es rico en misericordia, por su gran amor con que nos amó, aun estando nosotros muertos en pecados, nos dio vida juntamente con Cristo (por gracia sois salvos), y juntamente con él nos resucitó... Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe. Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas.',

    lblaFull: 'Y él os dio vida a vosotros, que estabais muertos en vuestros delitos y pecados, en los cuales anduvisteis en otro tiempo... Pero Dios, que es rico en misericordia, por causa del gran amor con que nos amó, aun cuando estábamos muertos en nuestros delitos, nos dio vida juntamente con Cristo (por gracia habéis sido salvados), y con Él nos resucitó... Porque por gracia habéis sido salvados por medio de la fe, y esto no procede de vosotros, sino que es don de Dios; no por obras, para que nadie se gloríe. Porque somos hechura suya, creados en Cristo Jesús para hacer buenas obras, las cuales Dios preparó de antemano para que anduviéramos en ellas.',

    ntvFull: 'Antes ustedes estaban muertos a causa de su desobediencia y sus muchos pecados. Solían vivir en pecado, igual que el resto del mundo... Pero Dios es tan rico en misericordia y nos amó tanto que, a pesar de que estábamos muertos por causa de nuestros pecados, nos dio vida cuando levantó a Cristo de los muertos. (¡Es solo por la gracia de Dios que ustedes han sido salvados!)... Dios los salvó por su gracia cuando creyeron. Ustedes no tienen ningún mérito en eso; es un regalo de Dios. La salvación no es un premio por las cosas buenas que hayamos hecho, así que ninguno de nosotros puede jactarse de ser salvo. Pues somos la obra maestra de Dios. Él nos creó de nuevo en Cristo Jesús, a fin de que hagamos las cosas buenas que preparó para nosotros tiempo atrás.',

    verses: [
      {
        num: '1',
        rvr1960: 'Y él os dio vida a vosotros, cuando estabais muertos en vuestros delitos y pecados,',
        lbla: 'Y él os dio vida a vosotros, que estabais muertos en vuestros delitos y pecados,',
        ntv: 'Antes ustedes estaban muertos a causa de su desobediencia y sus muchos pecados.',
        originalKeyHighlight: 'Καὶ ὑμᾶς ὄντας νεκροὺς τοῖς παραπτώμασιν (nekrous tois paraptōmasin)',
        theologicalNote: '«Nekrous» (muertos): el pecador no está meramente débil, enfermo o herido moralmente; está espiritualmente cadavérico e incapaz de responder a Dios por sí mismo (Depravación Total).'
      },
      {
        num: '4-5',
        rvr1960: 'Pero Dios, que es rico en misericordia, por su gran amor con que nos amó, aun estando nosotros muertos en pecados, nos dio vida juntamente con Cristo (por gracia sois salvos),',
        lbla: 'Pero Dios, que es rico en misericordia, por causa del gran amor con que nos amó, aun cuando estábamos muertos en nuestros delitos, nos dio vida juntamente con Cristo...',
        ntv: 'Pero Dios es tan rico en misericordia y nos amó tanto que, a pesar de que estábamos muertos por causa de nuestros pecados, nos dio vida cuando levantó a Cristo de los muertos...',
        originalKeyHighlight: 'ὁ δὲ θεὸς πλούσιος ὢν ἐν ἐλέει... συνεζωοποίησεν τῷ Χριστῷ',
        theologicalNote: '«Ho de theos» (Pero Dios): las dos palabras más gloriosas de la teología bíblica que marcan la intervención monergista y soberana de Dios en la muerte del pecador.'
      },
      {
        num: '8-9',
        rvr1960: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.',
        lbla: 'Porque por gracia habéis sido salvados por medio de la fe, y esto no procede de vosotros, sino que es don de Dios; no por obras, para que nadie se gloríe.',
        ntv: 'Dios los salvó por su gracia cuando creyeron. Ustedes no tienen ningún mérito en eso; es un regalo de Dios. La salvación no es un premio por las cosas buenas que hayamos hecho...',
        originalKeyHighlight: 'τῇ γὰρ χάριτί ἐστε σεσῳσμένοι διὰ πίστεως· καὶ τοῦτο οὐκ ἐξ ὑμῶν, θεοῦ τὸ δῶρον',
        theologicalNote: '«Este sesōsmenoi» (Perfecto Pasivo Perifrástico): habéis sido salvados definitivamente con efectos que permanecen sellados. «Touto» abarca todo el proceso salvífico como don de Dios.'
      },
      {
        num: '10',
        rvr1960: 'Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas.',
        lbla: 'Porque somos hechura suya, creados en Cristo Jesús para hacer buenas obras, las cuales Dios preparó de antemano para que anduviéramos en ellas.',
        ntv: 'Pues somos la obra maestra de Dios. Él nos creó de nuevo en Cristo Jesús, a fin de que hagamos las cosas buenas que preparó para nosotros tiempo atrás.',
        originalKeyHighlight: 'αὐτοῦ γάρ ἐσμεν ποίημα (poiēma), κτισθέντες ἐν Χριστῷ Ἰησοῦ',
        theologicalNote: '«Poiēma» (obra maestra / creación artesanal): las buenas obras no son la raíz ni la causa de la justificación, sino el fruto necesario e ineludible de la nueva creación.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción señera y memorable, citada universalmente en la apologética de la justificación por fe sola.',
      lblaStyle: 'Fidelidad rigurosa a los tiempos verbales griegos: «habéis sido salvados» para el participio perfecto pasivo sesōsmenoi.',
      ntvStyle: 'Impacto comunicativo brillante: traduce poiēma como «la obra maestra de Dios» y hace vívida la gratuidad («Ustedes no tienen ningún mérito en eso; es un regalo de Dios»).'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'τῇ γὰρ χάριτί ἐστε σεσῳσμένοι διὰ πίστεως· καὶ τοῦτο οὐκ ἐξ ὑμῶν, θεοῦ τὸ δῶρον· οὐκ ἐξ ἔργων, ἵνα μή τις καυχήσηται. αὐτοῦ γάρ ἐσμεν ποίημα...',
      fullTransliteration: 'tē gar chariti este sesōzmenoi dia pisteōs; kai touto ouk ex hymōn, theou to dōron; ouk ex ergōn, hina mē tis kauchēsētai...',
      manuscriptBasis: 'NA28 basado en P46 (ca. 200 d.C.), Códice Sinaítico (א 01), Códice Alejandrino (A 02) y Códice Vaticano (B 03).',
      words: [
        {
          original: 'νεκρούς',
          transliteration: 'nekrous',
          strong: 'G3498',
          morphology: 'Adjetivo Acusativo Masc. Plural',
          morphologyExpanded: 'Nekros: muerto literalmente, cadáver sin pulso ni aliento vital',
          literal: 'muertos espiritualmente',
          explanation: 'Incapacidad total del hombre caído para buscar o agradar a Dios por iniciativa propia.'
        },
        {
          original: 'συνεζωοποίησεν',
          transliteration: 'synezōopoiēsen',
          strong: 'G4806',
          morphology: 'Verbo Aoristo Activo Indicativo 3s',
          morphologyExpanded: 'Syn (con) + zōopoieō (hacer vivir / resucitar con poder vital)',
          literal: 'nos dio vida juntamente con',
          explanation: 'La resurrección espiritual de los regenerados está indisolublemente unida a la resurrección histórica de Cristo.'
        },
        {
          original: 'ποίημα',
          transliteration: 'poiēma',
          strong: 'G4161',
          morphology: 'Sustantivo Nominativo Neutro Sing.',
          morphologyExpanded: 'Poiēma: manufactura divina, producto de diseño artístico supremo',
          literal: 'hechura / obra maestra',
          explanation: 'El cristiano renacido es una nueva creación forjada por las manos omnipotentes de Dios.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-washer-eph2',
        author: 'Paul Washer',
        theologianEra: 'Contemporáneo',
        work: 'El Poder del Evangelio: De Muerte a Vida',
        text: 'Un hombre muerto en un cementerio no puede levantarse por su propia fuerza ni colaborar con el médico. Tenía que ocurrir un milagro de resurrección espiritual donde la voz del Hijo de Dios llamara soberanamente al pecador: ¡Sal fuera! La salvación es monergista de principio a fin; toda la gloria pertenece a la gracia del Señor.',
        focus: 'Regeneración Monergista y Soli Deo Gloria',
        crossReferences: ['Juan 11:43-44', 'Ezequiel 37:4-10', 'Colosenses 2:13']
      },
      {
        id: 'c-spurgeon-eph2',
        author: 'Charles Spurgeon',
        theologianEra: 'Príncipe de Predicadores',
        work: 'Por Gracia Sois Salvos (Sermón 1282)',
        text: '«Por gracia sois salvos». Gracia es el favor libre y soberano de Dios hacia aquellos que solo merecían su ira y condenación. La fe es el canal vacío a través del cual fluye el río inagotable de la misericordia divina. No presumas de la copa con la que bebes; alaba a la fuente celestial que llenó tu sed.',
        focus: 'Sola Gratia y la Fe como Instrumento',
        crossReferences: ['Romanos 4:16', 'Tito 3:5', '2 Timoteo 1:9']
      }
    ],

    exegesis: {
      summary: 'Efesios 2:1-10 expone el drama de la redención: de la ruina mortal de la depravación bajo la tiranía del mundo, la carne y el diablo (vv. 1-3), al rescate soberano por la resurrección en Cristo (vv. 4-7) y la justificación por gracia mediante la fe para buenas obras preparadas por Dios (vv. 8-10).',
      step1_textualCriticism: 'Aparato NA28 uniforme. La cláusula entre paréntesis «chariti este sesōsmenoi» (v. 5) es reiterada en v. 8 para fijar la premisa innegociable de la carta.',
      step2_historicalContext: 'Éfeso era la metrópoli del paganismo y la magia oculta en Asia Menor (Templo de Artemisa). Pablo escribe desde su prisión en Roma (ca. 60-62 d.C.) para recordarles su nueva identidad real en el Mesías.',
      step3_syntacticalAnalysis: 'Los primeros 7 versículos en griego forman una sola unidad sintáctica magistral cuyo sujeto demorado irrumpe en el v. 4 con «ho de theos» (Pero Dios), rigiendo los tres verbos de resurrección con prefijo «syn» (synezōopoiēsen, synēgeiren, synekathisen).',
      step4_christocentricTheology: 'Unión Mística con Cristo: lo que ocurrió históricamente con Jesús en su muerte, resurrección y ascensión al trono se aplica espiritualmente a todos los elegidos unidos a Él por la fe.',
      step5_systematicTheology: 'Sola Gratia, Sola Fide y Monergismo frente al Sinergismo pelagiano. Las buenas obras son la consecuencia necesaria de la justificación, no su condición previa.',
      step6_homiletics: {
        ptc: 'Dios resucita espiritualmente a pecadores muertos en pecado mediante la pura gracia soberana en Cristo, justificándolos por la sola fe para una vida fructífera de buenas obras.',
        outline: [
          { point: '1. El Diagnóstico Trágico: Muertos en delitos y cautivos del pecado (vv. 1-3)', textRef: 'vv. 1-3', explanation: 'La bancarrota espiritual absoluta de la condición humana.' },
          { point: '2. La Intervención Divina: Pero Dios nos dio vida juntamente con Cristo (vv. 4-7)', textRef: 'vv. 4-7', explanation: 'La resurrección espiritual por amor soberano.' },
          { point: '3. El Regalo y su Propósito: Salvos por gracia para buenas obras (vv. 8-10)', textRef: 'vv. 8-10', explanation: 'La fe como don y la vocación a la santidad.' }
        ],
        pastoralApplication: 'Vivir en profunda humildad y adoración, desterrando toda arrogancia moral y caminando con gozo en las buenas obras que Dios trazó de antemano para nuestra santificación.'
      }
    }
  },

  // 5. ISAÍAS 53:4-6, 10-12
  {
    id: 'isa-53-4-12',
    reference: 'Isaías 53:4-6, 10-12',
    title: 'El Siervo Sufriente del Señor: Expiación Penal Sustitutiva',
    testament: 'Antiguo Testamento',
    division: 'Profetas Mayores',
    theologicalTheme: 'Cristología en el AT, Sustitución Penal y Justificación Vicaria',

    rvr1960Full: 'Ciertamente llevó él nuestras enfermedades, y sufrió nuestros dolores; y nosotros le tuvimos por azotado, por herido de Dios y abatido. Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados. Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino; mas Jehová cargó en él el pecado de todos nosotros... Con todo eso, Jehová quiso quebrantarlo, sujetándole a padecimiento... Por su conocimiento justificará mi siervo justo a muchos, y llevará las iniquidades de ellos.',

    lblaFull: 'Ciertamente Él llevó nuestras enfermedades, y cargó con nuestros dolores; con todo, nosotros le tuvimos por azotado, por herido de Dios y afligido. Mas Él fue herido por nuestras transgresiones, molido por nuestras iniquidades. El castigo, por nuestra paz, cayó sobre Él, y por sus heridas hemos sido sanados. Todos nosotros nos descarriamos como ovejas, nos apartamos cada cual por su camino; pero el Señor hizo que cayera sobre Él la iniquidad de todos nosotros... Pero quiso el Señor quebrantarle, sometiéndole a padecimiento... Por su conocimiento, el Justo, mi Siervo, justificará a muchos, y Él cargará con las iniquidades de ellos.',

    ntvFull: 'Sin embargo, fueron nuestras debilidades las que él cargó; fueron nuestros dolores los que lo agobiaron. Y pensamos que sus dificultades eran un castigo de Dios, ¡un castigo por sus propios pecados! Pero él fue traspasado por nuestras rebeliones y aplastado por nuestros pecados. Fue golpeado para que nosotros tuviéramos paz; fue azotado para que pudiéramos ser sanados. Todos nosotros nos hemos extraviado como ovejas; hemos dejado los caminos de Dios para seguir los nuestros. Sin embargo, el Señor puso sobre él los pecados de todos nosotros... Pero formaba parte del buen plan del Señor aplastarlo y causarle dolor... por medio de lo que experimente, mi siervo justo hará posible que muchos sean declarados justos, porque él cargará con todos los pecados de ellos.',

    verses: [
      {
        num: '4',
        rvr1960: 'Ciertamente llevó él nuestras enfermedades, y sufrió nuestros dolores; y nosotros le tuvimos por azotado, por herido de Dios y abatido.',
        lbla: 'Ciertamente Él llevó nuestras enfermedades, y cargó con nuestros dolores; con todo, nosotros le tuvimos por azotado, por herido de Dios y afligido.',
        ntv: 'Sin embargo, fueron nuestras debilidades las que él cargó; fueron nuestros dolores los que lo agobiaron. Y pensamos que sus dificultades eran un castigo de Dios...',
        originalKeyHighlight: 'אָכֵן חֳלָיֵנוּ הוּא נָשָׂא וּמַכְאֹבֵינוּ סְבָלָם (‘Āḵēn ḥŏlāyēnû hû’ nāśā’)',
        theologicalNote: '«Nāśā’» y «sāḇal» son los términos cúlticos levíticos exactos para el macho cabrío que carga sobre sí la culpa del pueblo en Yom Kippur.'
      },
      {
        num: '5',
        rvr1960: 'Mas él herido fue por nuestras rebeliones, molido por nuestros pecados; el castigo de nuestra paz fue sobre él, y por su llaga fuimos nosotros curados.',
        lbla: 'Mas Él fue herido por nuestras transgresiones, molido por nuestras iniquidades. El castigo, por nuestra paz, cayó sobre Él, y por sus heridas hemos sido sanados.',
        ntv: 'Pero él fue traspasado por nuestras rebeliones y aplastado por nuestros pecados. Fue golpeado para que nosotros tuviéramos paz; fue azotado para que pudiéramos ser sanados.',
        originalKeyHighlight: 'וְהוּא מְחֹלָל מִפְּשָׁעֵנוּ מְדֻכָּא מֵעֲו‍ֹנֹתֵינוּ (wəhû’ məḥōlāl mippəšā‘ēnû)',
        theologicalNote: 'Pronombre enfático «wəhû’» (Mas Él): contraste total entre el Siervo inocente y los transgresores culpables. «Meḥōlāl» = traspasado mortalmente.'
      },
      {
        num: '6',
        rvr1960: 'Todos nosotros nos descarriamos como ovejas, cada cual se apartó por su camino; mas Jehová cargó en él el pecado de todos nosotros.',
        lbla: 'Todos nosotros nos descarriamos como ovejas, nos apartamos cada cual por su camino; pero el Señor hizo que cayera sobre Él la iniquidad de todos nosotros.',
        ntv: 'Todos nosotros nos hemos extraviado como ovejas; hemos dejado los caminos de Dios para seguir los nuestros. Sin embargo, el Señor puso sobre él los pecados de todos nosotros.',
        originalKeyHighlight: 'וַיהוָה הִפְגִּיעַ בּוֹ אֵת עֲו‍ֹן כֻּלָּנוּ (Yahweh hip̄gîa‘ bô ’ēt ‘ăwōn kullānû)',
        theologicalNote: '«Hip̄gîa‘» (Hifil causativo de pāḡa‘): Yahvé hizo caer con fuerza violenta y judicial sobre el Siervo la carga aplastante de nuestra culpa.'
      },
      {
        num: '10-11',
        rvr1960: 'Con todo eso, Jehová quiso quebrantarlo, sujetándole a padecimiento... Por su conocimiento justificará mi siervo justo a muchos, y llevará las iniquidades de ellos.',
        lbla: 'Pero quiso el Señor quebrantarle, sometiéndole a padecimiento... Por su conocimiento, el Justo, mi Siervo, justificará a muchos, y Él cargará con las iniquidades de ellos.',
        ntv: 'Pero formaba parte del buen plan del Señor aplastarlo y causarle dolor... mi siervo justo hará posible que muchos sean declarados justos, porque él cargará con todos los pecados de ellos.',
        originalKeyHighlight: 'וַיהוָה חָפֵץ דַּכְּאוֹ... יַצְדִּיק צַדִּיק עַבְדִּי לָרַבִּים (yaṣdîq ṣaddîq ‘aḇdî lārabbîm)',
        theologicalNote: '«Yahweh ḥāp̄ēṣ dakka’ô» (El beneplácito del Señor fue molerlo). En el v. 11, «yaṣdîq» es la raíz verbal de justificación forense en el AT.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción profética sublime e indeleble en la memoria del pueblo cristiano hispanohablante.',
      lblaStyle: 'Gran rigor en la traducción de términos legales y cúlticos del hebreo bíblico («transgresiones», «iniquidades», «sometiéndole a padecimiento»).',
      ntvStyle: 'Explicación cristalina del propósito soberano: «formaba parte del buen plan del Señor aplastarlo» y «hará posible que muchos sean declarados justos».'
    },

    originalLanguage: {
      language: 'Hebreo Bíblico',
      fullOriginal: 'וְהוּא מְחֹלָל מִפְּשָׁעֵנוּ מְדֻכָּא מֵעֲו‍ֹנֹתֵינוּ מוּסַר שְׁלוֹמֵנוּ עָלָיו וּבַחֲבֻרָתוֹ נִרְפָּא־לָנוּ׃ כֻּלָּנוּ כַּצֹּאן תָּעִינוּ...',
      fullTransliteration: 'wəhû’ məḥōlāl mippəšā‘ēnû məḏukkā’ mē‘ăwōnōṯênû mûsar šəlômēnû ‘ālāyw ūḇaḥăḇurāṯô nirpā’-lānû...',
      manuscriptBasis: 'Biblia Hebraica Stuttgartensia (BHS), Códice de Leningrado (B19A, 1008 d.C.) y el Gran Rollo de Isaías de Qumrán (1QIsa-a, ca. 125 a.C.) que confirma la preservación milagrosa del texto.',
      words: [
        {
          original: 'מְחֹלָל',
          transliteration: 'məḥōlāl',
          strong: 'H2490',
          morphology: 'Verbo Pual Participio ms',
          morphologyExpanded: 'Pual (voz pasiva intensiva) de ḥālal: traspasado hasta la muerte',
          literal: 'fue traspasado mortalmente',
          explanation: 'Profecía asombrosa de las heridas de la crucifixión (las manos y el costado traspasado del Redentor).'
        },
        {
          original: 'מִפְּשָׁעֵנוּ',
          transliteration: 'mippəšā‘ēnû',
          strong: 'H6588',
          morphology: 'Preposición מִן (causal) + Sustantivo peša‘ + Sufijo 1pl',
          morphologyExpanded: 'A causa de nuestras rebeliones premeditadas contra la soberanía divina',
          literal: 'por causa de nuestras rebeliones',
          explanation: 'La causa penal del sufrimiento del Siervo es la culpa de los pecadores sustituidos.'
        },
        {
          original: 'יַצְדִּיק',
          transliteration: 'yaṣdîq',
          strong: 'H6663',
          morphology: 'Verbo Hifil Imperfecto 3ms',
          morphologyExpanded: 'Hifil causativo de ṣāḏaq: declarar legalmente justo en el tribunal divino',
          literal: 'hará justos judicialmente',
          explanation: 'El Siervo Justo transfiere su justicia a los muchos cuyas culpas Él absorbió.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-spurgeon-isa53',
        author: 'Charles Spurgeon',
        theologianEra: 'Príncipe de Predicadores',
        work: 'El Gran Sustituto del Calvario',
        text: '«Jehová quiso quebrantarlo». No busquen la causa final de la cruz en los clavos de hierro ni en la traición de Judas ni en la cobardía de Pilato. Busquen la causa suprema en el tribunal celestial del Padre. Dios tomó la copa de la justa condenación que nosotros debíamos beber por la eternidad y la puso en las manos de su Amado Hijo para que la bebiera hasta la última gota amarga.',
        focus: 'Expiación Penal Sustitutiva y la Voluntad Soberana del Padre',
        crossReferences: ['2 Corintios 5:21', 'Gálatas 3:13', '1 Pedro 2:24']
      },
      {
        id: 'c-macarthur-isa53',
        author: 'John MacArthur',
        theologianEra: 'Contemporáneo',
        work: 'El Siervo Sufriente: El Evangelio según Dios en Isaías 53',
        text: 'Isaías 53 es el capítulo más asombroso del Antiguo Testamento. Escrito 700 años antes de que naciera Jesús de Nazaret, describe la pasión, muerte vicaria, sepultura en la tumba de un rico y resurrección victoriosa del Mesías con una precisión histórica y teológica que solo el Espíritu Santo omnisciente pudo inspirar.',
        focus: 'Cumplimiento Profético y Cristología Veterotestamentaria',
        crossReferences: ['Mateo 8:17', 'Hechos 8:32-35', 'Romanos 4:25']
      }
    ],

    exegesis: {
      summary: 'El cuarto Cántico del Siervo de Yahvé (Isaías 52:13 - 53:12) revela la cúspide de la revelación de la expiación sustitutiva en el Antiguo Testamento, donde el Justo muere en el lugar de los impíos.',
      step1_textualCriticism: 'El hallazgo del rollo 1QIsa-a en las cuevas de Qumrán demostró una concordancia textual superior al 95% con el texto masorético preservado mil años después, disipando cualquier duda sobre la autenticidad de la profecía.',
      step2_historicalContext: 'Isaías profetizó en Judá durante los reinados de Uzías, Jotam, Acaz y Ezequías (siglo VIII a.C.), en medio del colapso del reino del norte y la amenaza asiria, mirando proféticamente hacia el exilio babilónico y la redención mesiánica definitiva.',
      step3_syntacticalAnalysis: 'Estructura poética hebrea en cinco estrofas de tres versículos cada una (52:13-15; 53:1-3; 53:4-6; 53:7-9; 53:10-12). El paralelismo antitético entre la desfiguración del Siervo y su exaltación cósmica enmarca la perícopa.',
      step4_christocentricTheology: 'Cristo es el Cordero de Dios que quita el pecado del mundo (Jn 1:29). La sustitución penal veterotestamentaria es la matriz que explica todo el significado de la cruz en el Nuevo Testamento.',
      step5_systematicTheology: 'Doctrina de la Expiación Definida y Sustitución Penal. La ira de Dios es satisfecha (propiciación) y la culpa es borrada (expiación).',
      step6_homiletics: {
        ptc: 'Jesucristo, el Siervo Justo del Señor, sufrió la condenación penal de nuestros pecados bajo la voluntad soberana del Padre para otorgar justificación y paz eterna a todos los suyos.',
        outline: [
          { point: '1. El Gran Error Humano: Confundir al Sustituto con un pecador castigado (v. 4)', textRef: 'v. 4', explanation: 'La ceguera del corazón humano ante la cruz.' },
          { point: '2. El Gran Intercambio Penal: Sus heridas por nuestra salvación (vv. 5-6)', textRef: 'vv. 5-6', explanation: 'Nuestra culpa imputada a Cristo en el madero.' },
          { point: '3. El Gran Triunfo del Siervo: La justificación de muchos por su sacrificio (vv. 10-12)', textRef: 'vv. 10-12', explanation: 'La resurrección, exaltación e intercesión del Redentor.' }
        ],
        pastoralApplication: 'Mirar a la cruz con lágrimas de arrepentimiento y cánticos de alabanza, sabiendo que toda la deuda de nuestra culpa quedó eternamente cancelada en el Cordero.'
      }
    }
  },

  // 6. GÁLATAS 2:16-21
  {
    id: 'gal-2-16-21',
    reference: 'Gálatas 2:16-21',
    title: 'Justificación por la Fe en Cristo y la Muerte Judicial a la Ley',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    theologicalTheme: 'Sola Fide, Libertad Cristiana y Muerte al Legalismo',

    rvr1960Full: 'Sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo, nosotros también hemos creído en Jesucristo, para ser justificados por la fe de Cristo y no por las obras de la ley, por cuanto por las obras de la ley nadie será justificado... Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó y se entregó a sí mismo por mí. No desecho la gracia de Dios; pues si por la ley fuese la justicia, entonces por demás murió Cristo.',

    lblaFull: 'Sabiendo que el hombre no es justificado por las obras de la ley, sino mediante la fe en Cristo Jesús, también nosotros hemos creído en Cristo Jesús, para que seamos justificados por la fe en Cristo, y no por las obras de la ley; puesto que por las obras de la ley ninguna carne será justificada... Con Cristo he sido crucificado, y ya no soy yo el que vive, sino que Cristo vive en mí; y la vida que ahora vivo en la carne, la vivo por fe en el Hijo de Dios, el cual me amó y se entregó a sí mismo por mí. No hago nula la gracia de Dios, porque si la justicia viene por medio de la ley, entonces Cristo murió en vano.',

    ntvFull: 'Sin embargo, sabemos que una persona es declarada justa ante Dios por la fe en Jesucristo y no por la obediencia a la ley. Y nosotros hemos creído en Cristo Jesús para poder ser declarados justos por la fe en Cristo, y no porque hayamos obedecido la ley. Porque nadie jamás será declarado justo ante Dios por obedecer la ley... Mi antiguo yo ha sido crucificado con Cristo. Ya no vivo yo, sino que Cristo vive en mí. Así que vivo en este cuerpo terrenal confiando en el Hijo de Dios, quien me amó y se entregó a sí mismo por mí. Yo no tomo la gracia de Dios como algo sin sentido. Pues si cumplir la ley pudiera hacernos justos ante Dios, entonces no habría sido necesario que Cristo muriera.',

    verses: [
      {
        num: '16',
        rvr1960: 'Sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo, nosotros también hemos creído en Jesucristo, para ser justificados por la fe de Cristo y no por las obras de la ley, por cuanto por las obras de la ley nadie será justificado.',
        lbla: 'Sabiendo que el hombre no es justificado por las obras de la ley, sino mediante la fe en Cristo Jesús, también nosotros hemos creído en Cristo Jesús, para que seamos justificados por la fe en Cristo, y no por las obras de la ley; puesto que por las obras de la ley ninguna carne será justificada.',
        ntv: 'Sin embargo, sabemos que una persona es declarada justa ante Dios por la fe en Jesucristo y no por la obediencia a la ley. Y nosotros hemos creído en Cristo Jesús para poder ser declarados justos por la fe en Cristo, y no porque hayamos obedecido la ley...',
        originalKeyHighlight: 'εἰδότες δὲ ὅτι οὐ δικαιοῦται ἄνθρωπος ἐξ ἔργων νόμου ἐὰν μὴ διὰ πίστεως Ἰησοῦ Χριστοῦ',
        theologicalNote: 'Pablo repite tres veces en un solo versículo la imposibilidad de la justificación por obras y la exclusividad de la fe en Cristo.'
      },
      {
        num: '20',
        rvr1960: 'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí; y lo que ahora vivo en la carne, lo vivo en la fe del Hijo de Dios, el cual me amó y se entregó a sí mismo por mí.',
        lbla: 'Con Cristo he sido crucificado, y ya no soy yo el que vive, sino que Cristo vive en mí; y la vida que ahora vivo en la carne, la vivo por fe en el Hijo de Dios, el cual me amó y se entregó a sí mismo por mí.',
        ntv: 'Mi antiguo yo ha sido crucificado con Cristo. Ya no vivo yo, sino que Cristo vive en mí. Así que vivo en este cuerpo terrenal confiando en el Hijo de Dios, quien me amó y se entregó a sí mismo por mí.',
        originalKeyHighlight: 'Χριστῷ συνεσταύρωμαι· ζῶ δὲ οὐκέτι ἐγώ, ζῇ δὲ ἐν ἐμοὶ Χριστός',
        theologicalNote: '«Synestaurōmai» (Perfecto Pasivo): he sido crucificado judicialmente en el pasado y permanezco muerto a la condenación de la ley.'
      },
      {
        num: '21',
        rvr1960: 'No desecho la gracia de Dios; pues si por la ley fuese la justicia, entonces por demás murió Cristo.',
        lbla: 'No hago nula la gracia de Dios, porque si la justicia viene por medio de la ley, entonces Cristo murió en vano.',
        ntv: 'Yo no tomo la gracia de Dios como algo sin sentido. Pues si cumplir la ley pudiera hacernos justos ante Dios, entonces no habría sido necesario que Cristo muriera.',
        originalKeyHighlight: 'εἰ γὰρ διὰ νόμου δικαιοσύνη, ἄρα Χριστὸς δωρεὰν ἀπέθανεν (dōrean apethanen)',
        theologicalNote: 'Si el hombre pudiese contribuir un solo miligramo de mérito para su justificación, la muerte del Hijo de Dios habría sido una farsa inútil («dōrean»).'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción clásica y penetrante del himno personal de Pablo en el v. 20.',
      lblaStyle: 'Exactitud impecable en la voz pasiva («he sido crucificado») y en la expresión condicional del v. 21 («no hago nula la gracia»).',
      ntvStyle: 'Claridad contundente para derribar el legalismo contemporáneo: «Mi antiguo yo ha sido crucificado con Cristo... entonces no habría sido necesario que Cristo muriera».'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'εἰδότες δὲ ὅτι οὐ δικαιοῦται ἄνθρωπος ἐξ ἔργων νόμου ἐὰν μὴ διὰ πίστεως Ἰησοῦ Χριστοῦ... Χριστῷ συνεσταύρωμαι· ζῶ δὲ οὐκέτι ἐγώ, ζῇ δὲ ἐν ἐμοὶ Χριστός...',
      fullTransliteration: 'eidotes de hoti ou dikaioutai anthrōpos ex ergōn nomou ean mē dia pisteōs Iēsou Christou... Christō synestaurōmai; zō de ouketi egō, zē de en emoi Christos...',
      manuscriptBasis: 'NA28 basado en P46 (ca. 200 d.C.), Códice Sinaítico (א 01) y Códice Vaticano (B 03).',
      words: [
        {
          original: 'δικαιοῦται',
          transliteration: 'dikaioutai',
          strong: 'G1344',
          morphology: 'Verbo Presente Pasivo Indicativo 3s',
          morphologyExpanded: 'Dikaioō: ser declarado libre de culpa forense ante el tribunal de Dios',
          literal: 'es justificado',
          explanation: 'Nadie puede ser absuelto por méritos propios basados en la ley.'
        },
        {
          original: 'συνεσταύρωμαι',
          transliteration: 'synestaurōmai',
          strong: 'G4957',
          morphology: 'Verbo Perfecto Pasivo Indicativo 1s',
          morphologyExpanded: 'Syn (con) + stauroō (crucificar): crucificado conjuntamente',
          literal: 'he sido crucificado juntamente con Cristo',
          explanation: 'Muerte legal al viejo hombre bajo la tutela y maldición de la ley.'
        },
        {
          original: 'δωρεάν',
          transliteration: 'dōrean',
          strong: 'G1432',
          morphology: 'Adverbio',
          morphologyExpanded: 'En vano, sin propósito, inútilmente',
          literal: 'sin causa / en vano',
          explanation: 'Añadir obras a la gracia hace que la cruz de Cristo pierda todo valor.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-lutero-gal2',
        author: 'Martín Lutero',
        theologianEra: 'Reformador',
        work: 'Comentario a la Epístola a los Gálatas (1535)',
        text: 'Este versículo 16 es el trueno que destruye toda la justicia del papa, los méritos de los santos y el libre albedrío corrompido. La fe no mira a lo que yo hago o siento, sino a lo que Cristo ha hecho en mi lugar. Cuando la ley me acusa de pecado y me condena a muerte, respondo: ¡Ley, tú no tienes jurisdicción sobre mí, porque yo morí en Cristo en el Calvario!',
        focus: 'El Veredicto de la Fe y la Muerte a la Ley',
        crossReferences: ['Romanos 7:4', 'Romanos 3:28', 'Filipenses 3:8-9']
      },
      {
        id: 'c-sproul-gal2',
        author: 'Dr. R.C. Sproul',
        theologianEra: 'Contemporáneo',
        work: 'La Justificación por la Fe Sola',
        text: 'Gálatas 2:21 es el argumento definitivo contra todo sinergismo. Si el hombre pudiera justificarse a sí mismo mediante la obediencia moral, entonces el Calvario habría sido el acto más superfluo y trágico del universo. Pero Cristo murió porque no había otra manera posible de salvar al pecador.',
        focus: 'La Necesidad Absoluta de la Cruz',
        crossReferences: ['Hebreos 10:1-4', 'Romanos 8:3', 'Hechos 4:12']
      }
    ],

    exegesis: {
      summary: 'Gálatas 2:16-21 es la defensa apasionada de Pablo contra el legalismo judaizante que amenazaba destruir el evangelio puro de la gracia.',
      step1_textualCriticism: 'Aparato NA28 seguro. La fórmula «pisteōs Iēsou Christou» subraya la fe cuyo objeto es la Persona de Cristo.',
      step2_historicalContext: 'Escrito hacia el 48-49 d.C. tras el incidente de Antioquía donde Pablo confrontó públicamente a Pedro por apartarse de comer con los gentiles bajo la presión de los judaizantes.',
      step3_syntacticalAnalysis: 'La antítesis triple «ou ex ergōn nomou... ean mē dia pisteōs» (no por obras de la ley... sino por medio de la fe) establece una exclusión mutua absoluta entre obras y fe para la justificación.',
      step4_christocentricTheology: 'La unión con Cristo en su muerte cancela la deuda legal del creyente. Cristo es ahora la vida misma del creyente.',
      step5_systematicTheology: 'Sola Fide. La justificación es forense y monergista. El legalismo es anatema porque anula la suficiencia de la cruz.',
      step6_homiletics: {
        ptc: 'La justificación es un veredicto puramente gratuito otorgado mediante la fe en Cristo, desterrando para siempre el legalismo y llamando al creyente a vivir por y para el Salvador.',
        outline: [
          { point: '1. La Imposibilidad de la Ley: Ninguna carne será justificada por obras (v. 16)', textRef: 'v. 16', explanation: 'La bancarrota del esfuerzo propio.' },
          { point: '2. La Unión con Cristo: Crucificados a la ley para vivir para Dios (vv. 17-20)', textRef: 'vv. 17-20', explanation: 'La nueva vida impulsada por el amor del Salvador.' },
          { point: '3. El Honor de la Cruz: La suficiencia absoluta del sacrificio de Cristo (v. 21)', textRef: 'v. 21', explanation: 'Rechazar cualquier mezcla de gracia y obras.' }
        ],
        pastoralApplication: 'Renunciar a toda autojustificación y descansar en el amor del Hijo de Dios que se entregó por nosotros.'
      }
    }
  },

  // 7. 2 TIMOTEO 3:14-17
  {
    id: '2tim-3-14-17',
    reference: '2 Timoteo 3:14-17',
    title: 'La Inspiración Divina Plenaria y la Suficiencia Total de las Escrituras',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    theologicalTheme: 'Sola Scriptura, Inerrancia e Inspiración (Theopneustos)',

    rvr1960Full: 'Pero persiste tú en lo que has aprendido y te persuadiste, sabiendo de quién has aprendido; y que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación por la fe que es en Cristo Jesús. Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.',

    lblaFull: 'Tú, sin embargo, persiste en las cosas que has aprendido y de las cuales te convenciste, sabiendo de quiénes las has aprendido; y que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden dar la sabiduría que lleva a la salvación mediante la fe en Cristo Jesús. Toda Escritura es inspirada por Dios y útil para enseñar, para reprender, para corregir, para instruir en justicia, a fin de que el hombre de Dios sea perfecto, equipado para toda buena obra.',

    ntvFull: 'Pero tú debes permanecer fiel a las cosas que se te han enseñado. Sabes que son verdad, porque sabes que puedes confiar en quienes te las enseñaron. Desde la niñez, se te han enseñado las sagradas Escrituras, las cuales te han dado la sabiduría para recibir la salvación que viene por confiar en Cristo Jesús. Toda la Escritura es inspirada por Dios y es útil para enseñarnos lo que es verdad y para hacernos ver lo que está mal en nuestra vida. Nos corrige cuando estamos equivocados y nos enseña a hacer lo correcto. Dios la usa para preparar y capacitar a su pueblo para que haga toda buena obra.',

    verses: [
      {
        num: '14-15',
        rvr1960: 'Pero persiste tú en lo que has aprendido y te persuadiste... y que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden hacer sabio para la salvación por la fe que es en Cristo Jesús.',
        lbla: 'Tú, sin embargo, persiste en las cosas que has aprendido... y que desde la niñez has sabido las Sagradas Escrituras, las cuales te pueden dar la sabiduría que lleva a la salvación mediante la fe en Cristo Jesús.',
        ntv: 'Pero tú debes permanecer fiel a las cosas que se te han enseñado... Desde la niñez, se te han enseñado las sagradas Escrituras, las cuales te han dado la sabiduría para recibir la salvación...',
        originalKeyHighlight: 'τὰ ἱερὰ γράμματα οἶδας, τὰ δυνάμενά σε σοφίσαι εἰς σωτηρίαν (ta hiera grammata oidas)',
        theologicalNote: 'El propósito supremo del Antiguo Testamento: dar la sabiduría que conduce a la salvación en el Mesías Jesús.'
      },
      {
        num: '16',
        rvr1960: 'Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir, para corregir, para instruir en justicia,',
        lbla: 'Toda Escritura es inspirada por Dios y útil para enseñar, para reprender, para corregir, para instruir en justicia,',
        ntv: 'Toda la Escritura es inspirada por Dios y es útil para enseñarnos lo que es verdad y para hacernos ver lo que está mal en nuestra vida. Nos corrige cuando estamos equivocados...',
        originalKeyHighlight: 'πᾶσα γραφὴ θεόπνευστος καὶ ὠφέλιμος (pasa graphē theopneustos kai ōphelimos)',
        theologicalNote: '«Theópneustos» (exhalada por Dios): las palabras de la Escritura emanan directamente de la boca de Dios, garantizando su inerrancia y autoridad absoluta.'
      },
      {
        num: '17',
        rvr1960: 'a fin de que el hombre de Dios sea perfecto, enteramente preparado para toda buena obra.',
        lbla: 'a fin de que el hombre de Dios sea perfecto, equipado para toda buena obra.',
        ntv: 'Dios la usa para preparar y capacitar a su pueblo para que haga toda buena obra.',
        originalKeyHighlight: 'ἵνα ἄρτιος ᾖ ὁ τοῦ θεοῦ ἄνθρωπος, πρὸς πᾶν ἔργον ἀγαθὸν ἐξηρτισμένος',
        theologicalNote: '«Artios / Exērtismenos» (enteramente equipado / suficiente): la Escritura provee todo lo necesario para la fe y la práctica sin necesidad de revelaciones extra-bíblicas.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción de precisión eclesiástica inmortal con «inspirada por Dios» y «para redargüir».',
      lblaStyle: 'Rigor léxico moderno («equipado para toda buena obra» y «para reprender»).',
      ntvStyle: 'Explicación práctica pedagógica: «útil para enseñarnos lo que es verdad y para hacernos ver lo que está mal en nuestra vida».'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'πᾶσα γραφὴ θεόπνευστος καὶ ὠφέλιμος πρὸς διδασκαλίαν, πρὸς ἐλεγμόν, πρὸς ἐπανόρθωσιν, πρὸς παιδείαν τὴν ἐν δικαιοσύνῃ...',
      fullTransliteration: 'pasa graphē theopneustos kai ōphelimos pros didaskalian, pros elegmon, pros epanorthōsin, pros paideian tēn en dikaiosynē...',
      manuscriptBasis: 'NA28, Códice Sinaítico (א 01), Códice Alejandrino (A 02), Códice Efrem Rescripto (C 04).',
      words: [
        {
          original: 'θεόπνευστος',
          transliteration: 'theopneustos',
          strong: 'G2315',
          morphology: 'Adjetivo Nominativo Fem. Sing.',
          morphologyExpanded: 'Theos (Dios) + pneō (respirar / exhalar): espirada por Dios',
          literal: 'exhalada por el aliento de Dios',
          explanation: 'La Biblia no es un texto humano que Dios luego bendijo; es la misma voz de Dios plasmada por escrito.'
        },
        {
          original: 'ἐξῃρτισμένος',
          transliteration: 'exērtismenos',
          strong: 'G1822',
          morphology: 'Verbo Perfecto Pasivo Participio NMS',
          morphologyExpanded: 'Exartizō: equipado completamente, provisto de todos los pertrechos necesarios',
          literal: 'enteramente equipado y capacitado',
          explanation: 'Fundamento de la doctrina reformada de la Suficiencia de las Escrituras (Sola Scriptura).'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-warfield-2tim3',
        author: 'B.B. Warfield',
        theologianEra: 'Puritano / Clásico',
        work: 'La Inspiración y Autoridad de la Biblia',
        text: 'La palabra theópneustos no significa que Dios insufló vida en escritos humanos previos, sino que las Escrituras fueron exhaladas por Dios. Provienen directamente de la boca divina. Por tanto, la Escritura es la Palabra misma de Dios y posee su inerrancia e infalibilidad inviolable.',
        focus: 'Inerrancia Plenaria y Origen Divino de las Escrituras',
        crossReferences: ['2 Pedro 1:20-21', 'Mateo 5:18', 'Juan 10:35']
      },
      {
        id: 'c-macarthur-2tim3',
        author: 'John MacArthur',
        theologianEra: 'Contemporáneo',
        work: 'Nuestra Suficiencia en Cristo',
        text: 'Si la Escritura es capaz de hacer al hombre de Dios perfecto y enteramente preparado para toda buena obra, ¿por qué la iglesia moderna recurre al pragmatismo secular, al entretenimiento mundano y a la psicología humanista? Creer en Sola Scriptura significa que la Palabra de Dios es suficiente para la salvación, el consejo pastoral y el crecimiento espiritual.',
        focus: 'Suficiencia Total frente al Pragmatismo Humano',
        crossReferences: ['Salmo 19:7-11', 'Hebreos 4:12', 'Deuteronomio 8:3']
      }
    ],

    exegesis: {
      summary: '2 Timoteo 3:14-17 es el texto clásico sobre la naturaleza divina, inerrancia y suficiencia práctica de las Sagradas Escrituras.',
      step1_textualCriticism: 'Aparato NA28 firme. La construcción nominal «pasa graphē theopneustos kai ōphelimos» afirma que toda Escritura canónica es a la vez inspirada y útil.',
      step2_historicalContext: 'Última carta de Pablo, escrita desde la mazmorra mamertina en Roma (ca. 67 d.C.) en vísperas de su martirio. Pablo instruye a su joven sucesor Timoteo sobre el único ancla segura frente a la apostasía.',
      step3_syntacticalAnalysis: 'Cuatro cláusulas preposicionales con «pros» que detallan el alcance pedagógico: enseñanza doctrinal (didaskalia), reprensión del error (elegmos), corrección moral (epanorthōsis) e instrucción en justicia (paideia).',
      step4_christocentricTheology: 'Las Escrituras son cristocéntricas: su meta última es «hacer sabio para la salvación por la fe que es en Cristo Jesús» (v. 15).',
      step5_systematicTheology: 'Sola Scriptura (Confesión de Westminster Cap. I): La Escritura es la única regla infalible de fe y conducta para la iglesia.',
      step6_homiletics: {
        ptc: 'La Sagrada Escritura, por ser la revelación plenamente inspirada por Dios, es enteramente suficiente para salvar, santificar y equipar al creyente para toda buena obra.',
        outline: [
          { point: '1. El Poder de la Palabra: Sabiduría para la salvación en Cristo (vv. 14-15)', textRef: 'vv. 14-15', explanation: 'La eficacia salvífica del evangelio bíblico.' },
          { point: '2. La Naturaleza de la Palabra: Exhalada por Dios e inerrante (v. 16a)', textRef: 'v. 16a', explanation: 'El origen divino de la revelación escrita.' },
          { point: '3. La Suficiencia de la Palabra: Equipamiento integral para la vida santa (vv. 16b-17)', textRef: 'vv. 16b-17', explanation: 'La autoridad y aplicación total en el ministerio y la vida.' }
        ],
        pastoralApplication: 'Predicar, enseñar y estudiar la Biblia con reverencia y total confianza en su suficiencia divina.'
      }
    }
  },

  // 8. FILIPENSES 2:5-11
  {
    id: 'phil-2-5-11',
    reference: 'Filipenses 2:5-11',
    title: 'El Himno Cristológico (Carmen Christi): Humillación y Exaltación Soberana',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Paulinas',
    theologicalTheme: 'Cristología, Kenosis, Unión Hipostática y Señorío Cósmico',

    rvr1960Full: 'Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús, el cual, siendo en forma de Dios, no estimó el ser igual a Dios como cosa a que aferrarse, sino que se despojó a sí mismo, tomando forma de siervo, hecho semejante a los hombres; y estando en la condición de hombre, se humilló a sí mismo, haciéndose obediente hasta la muerte, y muerte de cruz. Por lo cual Dios también le exaltó hasta lo sumo, y le dio un nombre que es sobre todo nombre, para que en el nombre de Jesús se doble toda rodilla... y toda lengua confiese que Jesucristo es el Señor, para gloria de Dios Padre.',

    lblaFull: 'Haya, pues, en vosotros esta actitud que hubo también en Cristo Jesús, el cual, aunque existía en forma de Dios, no consideró el ser igual a Dios como algo a qué aferrarse, sino que se despojó a sí mismo tomando forma de siervo, haciéndose semejante a los hombres. Y hallándose en forma de hombre, se humilló a sí mismo, haciéndose obediente hasta la muerte, y muerte de cruz. Por lo cual Dios también le exaltó hasta lo sumo, y le confirió el nombre que es sobre todo nombre, para que al nombre de Jesús se doble toda rodilla... y toda lengua confiese que Jesucristo es Señor, para gloria de Dios Padre.',

    ntvFull: 'Tengan la misma actitud que tuvo Cristo Jesús. Aunque era Dios, no pensó que ese ser igual a Dios fuera algo a lo que deba aferrarse. Al contrario, renunció a sus privilegios divinos; adoptó la humilde posición de un esclavo y nació como un ser humano. Cuando apareció en forma de hombre, se humilló a sí mismo en obediencia a Dios y murió en una cruz como morían los criminales. Por lo tanto, Dios lo elevó al lugar de máximo honor y le dio el nombre que está por encima de todos los demás nombres, para que, ante el nombre de Jesús, se doble toda rodilla... y toda lengua declare que Jesucristo es el Señor para la gloria de Dios Padre.',

    verses: [
      {
        num: '5-6',
        rvr1960: 'Haya, pues, en vosotros este sentir que hubo también en Cristo Jesús, el cual, siendo en forma de Dios, no estimó el ser igual a Dios como cosa a que aferrarse,',
        lbla: 'Haya, pues, en vosotros esta actitud que hubo también en Cristo Jesús, el cual, aunque existía en forma de Dios, no consideró el ser igual a Dios como algo a qué aferrarse,',
        ntv: 'Tengan la misma actitud que tuvo Cristo Jesús. Aunque era Dios, no pensó que ese ser igual a Dios fuera algo a lo que deba aferrarse.',
        originalKeyHighlight: 'ὃς ἐν μορφῇ θεοῦ ὑπάρχων οὐχ ἁρπαγμὸν ἡγήσατο τὸ εἶναι ἴσα θεῷ',
        theologicalNote: '«Morphe theou» denota la esencia ontológica y los atributos intrínsecos de Dios. «Harpagmon» indica que no usó su igualdad divina para su propia ventaja egoísta.'
      },
      {
        num: '7-8',
        rvr1960: 'sino que se despojó a sí mismo, tomando forma de siervo, hecho semejante a los hombres; y estando en la condición de hombre, se humilló a sí mismo, haciéndose obediente hasta la muerte, y muerte de cruz.',
        lbla: 'sino que se despojó a sí mismo tomando forma de siervo, haciéndose semejante a los hombres. Y hallándose en forma de hombre, se humilló a sí mismo, haciéndose obediente hasta la muerte, y muerte de cruz.',
        ntv: 'Al contrario, renunció a sus privilegios divinos; adoptó la humilde posición de un esclavo y nació como un ser humano... se humilló a sí mismo en obediencia a Dios y murió en una cruz...',
        originalKeyHighlight: 'ἀλλὰ ἑαυτὸν ἐκένωσεν μορφὴν δούλου λαβών... ὑπήκοος μέχρι θανάτου, θανάτου δὲ σταυροῦ',
        theologicalNote: '«Ekenōsen» (se anonadó / se despojó): no renunció a su deidad (lo cual es imposible), sino que veló su gloria y tomó la naturaleza de siervo (kenosis por adición de humanidad, no por sustracción de deidad).'
      },
      {
        num: '9-11',
        rvr1960: 'Por lo cual Dios también le exaltó hasta lo sumo, y le dio un nombre que es sobre todo nombre, para que en el nombre de Jesús se doble toda rodilla... y toda lengua confiese que Jesucristo es el Señor...',
        lbla: 'Por lo cual Dios también le exaltó hasta lo sumo, y le confirió el nombre que es sobre todo nombre, para que al nombre de Jesús se doble toda rodilla... y toda lengua confiese que Jesucristo es Señor...',
        ntv: 'Por lo tanto, Dios lo elevó al lugar de máximo honor y le dio el nombre que está por encima de todos los demás nombres, para que, ante el nombre de Jesús, se doble toda rodilla... y toda lengua declare que Jesucristo es el Señor...',
        originalKeyHighlight: 'διὸ καὶ ὁ θεὸς αὐτὸν ὑπερύψωσεν... κύριος Ἰησοῦς Χριστὸς εἰς δόξαν θεοῦ πατρός',
        theologicalNote: 'Aplica a Jesús el juramento monoteísta exclusivo de Yahvé en Isaías 45:23 («ante mí se doblará toda rodilla»), declarando que Jesús es YHWH / Kyrios.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción clásica con solemne fuerza teológica («se despojó a sí mismo», «le exaltó hasta lo sumo»).',
      lblaStyle: 'Precisión técnica inmejorable: «aunque existía en forma de Dios... le confirió el nombre que es sobre todo nombre».',
      ntvStyle: 'Explicación doctrinal clara: «renunció a sus privilegios divinos; adoptó la humilde posición de un esclavo... murió en una cruz como morían los criminales».'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'τοῦτο φρονεῖτε ἐν ὑμῖν ὃ καὶ ἐν Χριστῷ Ἰησοῦ, ὃς ἐν μορφῇ θεοῦ ὑπάρχων οὐχ ἁρπαγμὸν ἡγήσατο τὸ εἶναι ἴσα θεῷ, ἀλλὰ ἑαυτὸν ἐκένωσεν μορφὴν δούλου λαβών...',
      fullTransliteration: 'touto phroneite en hymin ho kai en Christō Iēsou, hos en morphē theou hyparchōn ouch harpagmon hēgēsato to einai isa theō, alla heauton ekenōsen morphēn doulou labōn...',
      manuscriptBasis: 'NA28 apoyado por P46, Códice Sinaítico (א), Vaticano (B), Alejandrino (A).',
      words: [
        {
          original: 'μορφῇ θεοῦ',
          transliteration: 'morphē theou',
          strong: 'G3444 + G2316',
          morphology: 'Sustantivo Dativo Fem. + Genitivo',
          morphologyExpanded: 'Morphe: la forma sustancial y ontológica exacta de la naturaleza divina',
          literal: 'en la forma y esencia de Dios',
          explanation: 'No es mera apariencia externa, sino la posesión plena y real de todos los atributos de la Deidad.'
        },
        {
          original: 'ἐκένωσεν',
          transliteration: 'ekenōsen',
          strong: 'G2758',
          morphology: 'Verbo Aoristo Activo Indicativo 3s',
          morphologyExpanded: 'Kenoō: vaciar, despojar de derechos o gloria manifiesta',
          literal: 'se anonadó / se despojó',
          explanation: 'La Kenosis bíblica: Cristo veló su gloria celestial tomando la fragilidad humana sin perder su divinidad.'
        },
        {
          original: 'ὑπερύψωσεν',
          transliteration: 'hyperypsōsen',
          strong: 'G5251',
          morphology: 'Verbo Aoristo Activo Indicativo 3s',
          morphologyExpanded: 'Hyper (sobre/máximo) + hypsoō (exaltar): sobreexaltar a la más alta cúspide',
          literal: 'lo sobreexaltó soberanamente',
          explanation: 'El Padre corona la obediencia perfecta del Hijo entronizándolo a su diestra.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-calvino-phil2',
        author: 'Juan Calvino',
        theologianEra: 'Reformador',
        work: 'Comentario a Filipenses, Colosenses y Tesalonicenses',
        text: 'Cristo no podía despojarse de su deidad, pues Dios no puede cesar de ser Dios; pero se anonadó en cuanto ocultó su majestad bajo el velo de la carne y tomó la condición de siervo obediente. Cuanto más profunda fue su humillación por nosotros en el madero infame, tanto más resplandeciente es su soberana exaltación.',
        focus: 'Humillación Voluntaria y Realeza Mediadora de Cristo',
        crossReferences: ['Juan 17:5', '2 Corintios 8:9', 'Isaías 52:13']
      },
      {
        id: 'c-spurgeon-phil2',
        author: 'Charles Spurgeon',
        theologianEra: 'Príncipe de Predicadores',
        work: 'La Humillación y Exaltación de Cristo',
        text: '¡Miren el descenso sin fondo del Redentor! De las alturas infinitas del trono eterno a la paja del pesebre; del canto de los querubines a la escupedura de los soldados romanos; de la gloria inmortal a la muerte de cruz. Y luego miren su ascenso: ¡el universo entero se postrará y confesará que Él es el Señor de señores!',
        focus: 'La Parábola Descendente y Ascendente del Carmen Christi',
        crossReferences: ['Apocalipsis 5:12-13', 'Hebreos 2:9', 'Efesios 1:20-22']
      }
    ],

    exegesis: {
      summary: 'Filipenses 2:5-11 es una de las joyas teológicas más sublimes del canon sagrado: describe el descenso voluntario del Verbo eterno desde la gloria celestial hasta la muerte de cruz, y su sobreexaltación cósmica.',
      step1_textualCriticism: 'Aparato NA28 unánime. Texto preservado con exactitud milimétrica en los manuscritos unciales tempranos.',
      step2_historicalContext: 'Escrito por Pablo desde la cárcel en Roma a la iglesia de Filipos (colonia romana). Pablo utiliza la cristología más sublime como fundamento ético de humildad contra el orgullo y la división congregacional.',
      step3_syntacticalAnalysis: 'Estructura en dos estrofas simétricas: 1) La humillación (vv. 6-8: seis pasos descendentes gobernados por participios y verbos aoristos); 2) La exaltación divina (vv. 9-11: tres pasos ascendentes introducidos por «dio kai», por lo cual).',
      step4_christocentricTheology: 'Cristo es el Siervo de Yahvé de Isaías 53 que vindica el nombre divino. La confesión «Kyrios Iēsous Christos» es la cumbre de la revelación del Antiguo al Nuevo Testamento.',
      step5_systematicTheology: 'Unión Hipostática, Estados de Cristo (Estado de Humillación y Estado de Exaltación), y Soberanía Mediatoria.',
      step6_homiletics: {
        ptc: 'La humillación voluntaria de Cristo en la cruz revela el corazón de Dios y fundamenta la humildad de los creyentes, culminando en la adoración universal de su soberano Señorío.',
        outline: [
          { point: '1. La Dignidad Eterna: Existiendo en la misma forma de Dios (v. 6)', textRef: 'v. 6', explanation: 'La deidad consustancial del Hijo.' },
          { point: '2. El Descenso Infinito: Obediente hasta la muerte de cruz (vv. 7-8)', textRef: 'vv. 7-8', explanation: 'La encarnación y el sacrificio vicario.' },
          { point: '3. La Coronación Universal: Toda rodilla se doblará ante Jesús (vv. 9-11)', textRef: 'vv. 9-11', explanation: 'La exaltación eterna para gloria del Padre.' }
        ],
        pastoralApplication: 'Desterrar todo orgullo y vana gloria en nuestras relaciones comunitarias, vistiendo la humildad sacrificial de Cristo Jesús.'
      }
    }
  },

  // 9. HEBREOS 1:1-4
  {
    id: 'heb-1-1-4',
    reference: 'Hebreos 1:1-4',
    title: 'La Revelación Suprema y Definitiva de Dios en la Persona del Hijo',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    theologicalTheme: 'Cristología, Revelación Progresiva, Sacerdocio y Deidad de Cristo',

    rvr1960Full: 'Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas, en estos postreros días nos ha hablado por el Hijo, a quien constituyó heredero de todo, y por quien asimismo hizo el universo; el cual, siendo el resplandor de su gloria, y la imagen misma de su sustancia, y quien sustenta todas las cosas con la palabra de su poder, habiendo efectuado la purificación de nuestros pecados por medio de sí mismo, se sentó a la diestra de la Majestad en las alturas, hecho tanto superior a los ángeles, cuanto heredó más excelente nombre que ellos.',

    lblaFull: 'Dios, habiendo hablado hace mucho tiempo, en muchas ocasiones y de muchas maneras a los padres por los profetas, en estos últimos días nos ha hablado por su Hijo, a quien constituyó heredero de todas las cosas, por medio de quien hizo también el universo. Él es el resplandor de su gloria y la expresión exacta de su naturaleza, y sostiene todas las cosas por la palabra de su poder. Habiendo hecho la purificación de los pecados, se sentó a la diestra de la Majestad en las alturas, habiendo llegado a ser tanto mejor que los ángeles, en cuanto ha heredado un nombre más excelente que ellos.',

    ntvFull: 'Hace mucho tiempo, Dios habló muchas veces y de diversas maneras a nuestros antepasados por medio de los profetas. Y ahora, en estos últimos días, nos ha hablado por medio de su Hijo. Dios le prometió todo al Hijo como herencia y, mediante el Hijo, creó el universo. El Hijo irradia la gloria de Dios y expresa el carácter mismo de Dios, y sostiene todo con el gran poder de su palabra. Después de habernos limpiado de nuestros pecados, se sentó en el lugar de honor, a la derecha del majestuoso Dios en el cielo. Esto demuestra que el Hijo es muy superior a los ángeles, así como el nombre que Dios le dio es superior al nombre de ellos.',

    verses: [
      {
        num: '1-2',
        rvr1960: 'Dios, habiendo hablado muchas veces y de muchas maneras en otro tiempo a los padres por los profetas, en estos postreros días nos ha hablado por el Hijo...',
        lbla: 'Dios, habiendo hablado hace mucho tiempo, en muchas ocasiones y de muchas maneras a los padres por los profetas, en estos últimos días nos ha hablado por su Hijo...',
        ntv: 'Hace mucho tiempo, Dios habló muchas veces y de diversas maneras a nuestros antepasados por medio de los profetas. Y ahora, en estos últimos días, nos ha hablado por medio de su Hijo.',
        originalKeyHighlight: 'Πολυμερῶς καὶ πολυτρόπως πάλαι ὁ θεὸς λαλήσας... ἐλάλησεν ἡμῖν ἐν υἱῷ',
        theologicalNote: 'Contraste entre la revelación fragmentaria y preparatoria del Antiguo Pacto y la revelación culminante, final y plena en el Hijo.'
      },
      {
        num: '3',
        rvr1960: 'el cual, siendo el resplandor de su gloria, y la imagen misma de su sustancia, y quien sustenta todas las cosas con la palabra de su poder, habiendo efectuado la purificación de nuestros pecados por medio de sí mismo, se sentó a la diestra de la Majestad en las alturas,',
        lbla: 'Él es el resplandor de su gloria y la expresión exacta de su naturaleza, y sostiene todas las cosas por la palabra de su poder. Habiendo hecho la purificación de los pecados, se sentó a la diestra de la Majestad en las alturas,',
        ntv: 'El Hijo irradia la gloria de Dios y expresa el carácter mismo de Dios, y sostiene todo con el gran poder de su palabra. Después de habernos limpiado de nuestros pecados, se sentó en el lugar de honor...',
        originalKeyHighlight: 'ὃς ὢν ἀπαύγασμα τῆς δόξης καὶ χαρακτὴρ τῆς ὑποστάσεως αὐτοῦ (apaugasma... charaktēr tēs hypostaseōs)',
        theologicalNote: '«Apaugasma» (resplandor emanado) y «Charaktēr» (impresión / estampa exacta del sello): Cristo manifiesta exactamente la esencia ontológica de Dios.'
      },
      {
        num: '4',
        rvr1960: 'hecho tanto superior a los ángeles, cuanto heredó más excelente nombre que ellos.',
        lbla: 'habiendo llegado a ser tanto mejor que los ángeles, en cuanto ha heredado un nombre más excelente que ellos.',
        ntv: 'Esto demuestra que el Hijo es muy superior a los ángeles, así como el nombre que Dios le dio es superior al nombre de ellos.',
        originalKeyHighlight: 'τοσούτῳ κρείττων γενόμενος τῶν ἀγγέλων (kreittōn genomenos)',
        theologicalNote: '«Kreittōn» (superior / mejor): la palabra clave de toda la carta a los Hebreos, demostrando la supremacía de Cristo sobre el sacerdocio levítico, Moisés, el templo y los ángeles.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción solemne de resonancia literaria insuperable («la imagen misma de su sustancia», «se sentó a la diestra de la Majestad»).',
      lblaStyle: 'Precisión dogmática moderna: «la expresión exacta de su naturaleza» para charaktēr tēs hypostaseōs.',
      ntvStyle: 'Claridad teológica contemporánea: «El Hijo irradia la gloria de Dios y expresa el carácter mismo de Dios, y sostiene todo con el gran poder de su palabra».'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'Πολυμερῶς καὶ πολυτρόπως πάλαι ὁ θεὸς λαλήσας τοῖς πατράσιν ἐν τοῖς προφήταις ἐπ’ ἐσχάτου τῶν ἡμερῶν τούτων ἐλάλησεν ἡμῖν ἐν υἱῷ... ὃς ὢν ἀπαύγασμα τῆς δόξης καὶ χαρακτὴρ τῆς ὑποστάσεως αὐτοῦ...',
      fullTransliteration: 'Polymerōs kai polytropōs palai ho theos lalēsas tois patrasin en tois prophētais ep’ eschatou tōn hēmerōn toutōn elalēsen hēmin en huiō...',
      manuscriptBasis: 'P46 (ca. 200 d.C.), Códice Sinaítico (א 01), Códice Vaticano (B 03).',
      words: [
        {
          original: 'ἀπαύγασμα',
          transliteration: 'apaugasma',
          strong: 'G541',
          morphology: 'Sustantivo Neutro Nominativo Sing.',
          morphologyExpanded: 'Apaugasma: fulgor, emanación luminosa resplandeciente',
          literal: 'el resplandor radiante',
          explanation: 'Así como el rayo de sol no puede separarse del sol, el Hijo irradia eternamente la gloria del Padre.'
        },
        {
          original: 'χαρακτὴρ',
          transliteration: 'charaktēr',
          strong: 'G5481',
          morphology: 'Sustantivo Masc. Nominativo Sing.',
          morphologyExpanded: 'Charaktēr: grabado exacto, estampa idéntica de un sello en cera',
          literal: 'la representación exacta / troquel idéntico',
          explanation: 'Cristo revela a Dios con fidelidad absoluta e indivisible: quien ha visto al Hijo ha visto al Padre (Jn 14:9).'
        },
        {
          original: 'φέρων τε τὰ πάντα',
          transliteration: 'pherōn te ta panta',
          strong: 'G5342 + G3956',
          morphology: 'Participio Presente Activo NMS',
          morphologyExpanded: 'Pherō: sostener activamente y conducir hacia su meta providencial',
          literal: 'sustentando y gobernando todas las cosas',
          explanation: 'Cristo no es un creador pasivo deísta; gobierna y preserva activamente cada átomo del universo.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-owen-heb1',
        author: 'John Owen',
        theologianEra: 'Puritano / Clásico',
        work: 'Exposición de la Epístola a los Hebreos (Vol. 1)',
        text: 'En estos cuatro versículos se compendian todas las excelencias de la Persona y los tres oficios mediadores de Cristo: Profeta (por quien Dios ha hablado definitivamente), Rey (heredero de todo y sustentador soberano del cosmos) y Sacerdote (habiendo efectuado la purificación de nuestros pecados por medio de sí mismo).',
        focus: 'El Triple Oficio Mediador (Munus Triplex) y la Deidad de Cristo',
        crossReferences: ['Salmo 110:1', 'Colosenses 1:17', 'Juan 1:18']
      },
      {
        id: 'c-macarthur-heb1',
        author: 'John MacArthur',
        theologianEra: 'Contemporáneo',
        work: 'Comentario MacArthur del NT: Hebreos',
        text: 'Note el contraste decisivo: los sacerdotes del Antiguo Testamento nunca se sentaban en el tabernáculo porque sus sacrificios de sangre de animales nunca podían expiar el pecado moral. Pero Cristo, habiendo consumado la purificación eterna de nuestros pecados, «se sentó». La postura sentada a la diestra de Dios proclama la consumación y suficiencia eterna de su obra.',
        focus: 'Suficiencia Absoluta y Consumación Sacerdotal',
        crossReferences: ['Hebreos 10:11-14', 'Romanos 8:34', 'Marcos 16:19']
      }
    ],

    exegesis: {
      summary: 'Hebreos 1:1-4 establece la tesis fundamental de toda la epístola: la supremacía insuperable, final y ontológica de Jesucristo sobre toda la economía preparatoria del Antiguo Testamento.',
      step1_textualCriticism: 'Aparato NA28 impecable. Papiro P46 confirma cada término cristológico en este prólogo monumental.',
      step2_historicalContext: 'Dirigido a cristianos de origen judío (ca. 64-68 d.C.) tentados a retroceder al ritualismo levítico y al templo de Jerusalén para evitar la persecución. El autor les muestra que abandonar a Cristo es abandonar la sustancia por la sombra.',
      step3_syntacticalAnalysis: 'Oración griega monumental de alta retórica literaria con aliteraciones en «pi» (Polymerōs kai polytropōs palai...). Culmina en el quiasmo de siete declaraciones majestuosas sobre la dignidad del Hijo.',
      step4_christocentricTheology: 'Cristo es el clímax de la historia de la salvación (Historia Salutis). En Él cesa la necesidad de revelaciones adicionales porque el Hijo es la Palabra encarnada final.',
      step5_systematicTheology: 'Trinidad, Providencia Soberana, Teología Pactual y Sola Scriptura.',
      step6_homiletics: {
        ptc: 'Dios ha culminado su revelación redentora en su Hijo Jesucristo, el Creador divino, Sustentador soberano y Sumo Sacerdote perfecto de su pueblo.',
        outline: [
          { point: '1. La Revelación Final: Dios habló en tiempos pasados, pero ahora nos habla en el Hijo (vv. 1-2a)', textRef: 'vv. 1-2a', explanation: 'La supremacía del Nuevo Pacto.' },
          { point: '2. La Gloria Divina del Hijo: Resplandor de la gloria y Creador del cosmos (vv. 2b-3a)', textRef: 'vv. 2b-3a', explanation: 'La plena deidad y providencia de Cristo.' },
          { point: '3. La Redención Consumada: Purificación de los pecados y entronización celestial (vv. 3b-4)', textRef: 'vv. 3b-4', explanation: 'El descanso y la victoria sacerdotal a la diestra del Padre.' }
        ],
        pastoralApplication: 'Aferrarse firmemente a Cristo sin mirar atrás, reconociendo que en Él tenemos la plenitud de la salvación y la comunión con Dios.'
      }
    }
  },

  // 10. SALMO 23:1-6
  {
    id: 'ps-23-1-6',
    reference: 'Salmo 23:1-6',
    title: 'El Señor Soberano es mi Pastor: Providencia y Seguridad Eterna',
    testament: 'Antiguo Testamento',
    division: 'Poéticos y Sabiduría',
    theologicalTheme: 'Providencia Soberana, Fidelidad Pactual y Seguridad del Creyente',

    rvr1960Full: 'Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará. Confortará mi alma; me guiará por sendas de justicia por amor de su nombre. Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento. Aderezas mesa delante de mí en presencia de mis angustiadores; unges mi cabeza con aceite; mi copa está rebosando. Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días.',

    lblaFull: 'El Señor es mi pastor, nada me faltará. En lugares de verdes pastos me hace descansar; junto a aguas de reposo me conduce. Él restaura mi alma; me guía por senderos de justicia por amor de su nombre. Aunque pase por el valle de sombra de muerte, no temeré mal alguno, porque tú estás conmigo; tu vara y tu cayado me infunden aliento. Tú preparas mesa delante de mí en presencia de mis enemigos; has ungido mi cabeza con aceite; mi copa está rebosando. Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa del Señor moraré por largos días.',

    ntvFull: 'El Señor es mi pastor; tengo todo lo que necesito. En verdes praderas me deja descansar; me conduce junto a arroyos tranquilos. Él renueva mis fuerzas. Me guía por sendas correctas, y así da honra a su nombre. Incluso cuando cruce por el oscuro valle de la muerte, no tendré miedo, porque tú estás a mi lado. Tu vara y tu cayado me protegen y me confortan. Me preparas un banquete en presencia de mis enemigos. Me honras ungiendo mi cabeza con aceite; mi copa se desborda de bendiciones. Ciertamente tu bondad y tu amor inagotable me seguirán todos los días de mi vida, y en la casa del Señor viviré por siempre.',

    verses: [
      {
        num: '1',
        rvr1960: 'Jehová es mi pastor; nada me faltará.',
        lbla: 'El Señor es mi pastor, nada me faltará.',
        ntv: 'El Señor es mi pastor; tengo todo lo que necesito.',
        originalKeyHighlight: 'יְהוָה רֹעִי לֹא אֶחְסָר (Yahweh rō‘î lō’ ’eḥsār)',
        theologicalNote: '«Yahweh Ro’i»: el Nombre sagrado del Dios del pacto unido a la relación íntima y personal de pastoreo.'
      },
      {
        num: '3',
        rvr1960: 'Confortará mi alma; me guiará por sendas de justicia por amor de su nombre.',
        lbla: 'Él restaura mi alma; me guía por senderos de justicia por amor de su nombre.',
        ntv: 'Él renueva mis fuerzas. Me guía por sendas correctas, y así da honra a su nombre.',
        originalKeyHighlight: 'נַפְשִׁי יְשׁוֹבֵב יַנְחֵנִי בְמַעְגְּלֵי־צֶדֶק לְמַעַן שְׁמוֹ',
        theologicalNote: '«Ləma‘an šəmô» (Por amor de su nombre): la máxima gloria de Dios es el fundamento supremo de su fidelidad y dirección a los suyos.'
      },
      {
        num: '4',
        rvr1960: 'Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento.',
        lbla: 'Aunque pase por el valle de sombra de muerte, no temeré mal alguno, porque tú estás conmigo; tu vara y tu cayado me infunden aliento.',
        ntv: 'Incluso cuando cruce por el oscuro valle de la muerte, no tendré miedo, porque tú estás a mi lado. Tu vara y tu cayado me protegen...',
        originalKeyHighlight: 'גַּם כִּי־אֵלֵךְ בְּגֵיא צַלְמָוֶת לֹא־אִירָא רָע כִּי־אַתָּה עִמָּדִי',
        theologicalNote: 'Transición poética de la tercera persona («Él») a la segunda persona íntima («Tú estás conmigo»): en el dolor más oscuro la comunión se vuelve inmediata.'
      },
      {
        num: '6',
        rvr1960: 'Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa de Jehová moraré por largos días.',
        lbla: 'Ciertamente el bien y la misericordia me seguirán todos los días de mi vida, y en la casa del Señor moraré por largos días.',
        ntv: 'Ciertamente tu bondad y tu amor inagotable me seguirán todos los días de mi vida, y en la casa del Señor viviré por siempre.',
        originalKeyHighlight: 'אַךְ טוֹב וָחֶסֶד יִרְדְּפוּנִי כָּל־יְמֵי חַיָּי וְשַׁבְתִּי בְּבֵית־יְהוָה לְאֹרֶךְ יָמִים',
        theologicalNote: '«Yirdəpûnî» (de rāḏap̄): no es solo seguir pasivamente, sino «perseguir» con celo pactual incesante. La gracia y el jesed de Dios persiguen al creyente.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'El texto más recitado de la literatura castellana. Soberbia belleza cadenciosa y consuelo eterno.',
      lblaStyle: 'Fidelidad al hebreo bíblico («Él restaura mi alma», «por senderos de justicia»).',
      ntvStyle: 'Sensibilidad pastoral contemporánea: «tengo todo lo que necesito... tu bondad y tu amor inagotable me seguirán todos los días de mi vida».'
    },

    originalLanguage: {
      language: 'Hebreo Bíblico',
      fullOriginal: 'יְהוָ֥ה רֹ֝עִ֗י לֹ֣א אֶחְסָֽר׃ בִּנְא֣וֹת דֶּ֭שֶׁא יַרְבִּיצֵ֑נִי עַל־מֵ֖י מְנֻח֣וֹת יְנַהֲלֵֽנִי׃ נַפְשִׁ֥י יְשׁוֹבֵ֑ב יַֽנְחֵ֥נִי בְמַעְגְּלֵי־צֶ֝֗דֶק לְמַ֣עַן שְׁמֽוֹ׃',
      fullTransliteration: 'Yahweh rō‘î lō’ ’eḥsār. Bin’ôṯ deše’ yarbîṣēnî, ‘al-mê mənuḥôṯ yənahălēnî. Nap̄šî yəšôḇēḇ, yanḥēnî ḇəma‘gəlê-ṣeḏeq ləma‘an šəmô...',
      manuscriptBasis: 'Biblia Hebraica Stuttgartensia (BHS), Códice de Leningrado B19A y rollos de Salmos de Qumrán (11QPs-a).',
      words: [
        {
          original: 'רֹעִי',
          transliteration: 'rō‘î',
          strong: 'H7462',
          morphology: 'Verbo Qal Participio Activo + Suf. 1s',
          morphologyExpanded: 'Rā‘āh (pastorear, alimentar, cuidar tiernamente) + sufijo mío',
          literal: 'mi pastor',
          explanation: 'Metáfora real y pactual de Dios como el Pastor Soberano que provee y defiende su rebaño.'
        },
        {
          original: 'צַלְמָוֶת',
          transliteration: 'ṣalmāweṯ',
          strong: 'H6757',
          morphology: 'Sustantivo compuesto',
          morphologyExpanded: 'Sombra profunda, oscuridad extrema como de la muerte misma',
          literal: 'valle de densas tinieblas',
          explanation: 'Cualquier circunstancia de peligro mortal o angustia profunda donde el creyente es sostenido por Dios.'
        },
        {
          original: 'חֶסֶד',
          transliteration: 'ḥeseḏ',
          strong: 'H2617',
          morphology: 'Sustantivo Masc. Sing.',
          morphologyExpanded: 'Jesed: amor pactual incondicional, lealtad y gracia firme e inquebrantable',
          literal: 'gracia pactual inagotable',
          explanation: 'El amor fiel del pacto de Yahvé que jamás abandona a sus elegidos.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-spurgeon-ps23',
        author: 'Charles Spurgeon',
        theologianEra: 'Príncipe de Predicadores',
        work: 'El Tesoro de David: Exposición del Salmo 23',
        text: '«Jehová es mi pastor». No dice "fue" ni "será", sino "es". En este mismo segundo, en medio de tu debilidad terrenal, el Creador de las galaxias está pastoreando tu alma. Si el Dios todopoderoso es tu Pastor, es infinitamente imposible que te falte nada de lo que sea para tu verdadero bien eterno.',
        focus: 'Providencia Divina y Descanso en el Pastor Soberano',
        crossReferences: ['Juan 10:11-15', 'Filipenses 4:19', '1 Pedro 5:7']
      }
    ],

    exegesis: {
      summary: 'El Salmo 23 es el cántico supremo de confianza teocéntrica de David, celebrando el cuidado protector de Yahvé como Pastor y como Anfitrión generoso.',
      step1_textualCriticism: 'Texto masorético perfectamente conservado en BHS.',
      step2_historicalContext: 'Compuesto por David desde su experiencia como pastor en Belén y como rey fugitivo perseguido por Saúl y Absalón.',
      step3_syntacticalAnalysis: 'Dos imágenes poéticas maestras: 1) El Buen Pastor en el campo (vv. 1-4); 2) El Anfitrión soberano del banquete de la victoria (vv. 5-6).',
      step4_christocentricTheology: 'Jesucristo es el Buen Pastor (Juan 10) que da su vida por las ovejas y el Gran Pastor resucitado (Hebreos 13:20).',
      step5_systematicTheology: 'Providencia Divina, Perseverancia de los Santos y Teología del Pacto.',
      step6_homiletics: {
        ptc: 'El Señor es el Pastor y Protector todopoderoso de su pueblo, guiándolos con fidelidad a través de las pruebas terrenales hasta su presencia celestial eterna.',
        outline: [
          { point: '1. La Provisión del Pastor: Reposo y dirección santa (vv. 1-3)', textRef: 'vv. 1-3', explanation: 'La suficiencia y guía de Dios.' },
          { point: '2. La Presencia del Pastor: Confort en el valle de oscuridad (v. 4)', textRef: 'v. 4', explanation: 'La victoria sobre el temor.' },
          { point: '3. El Banquete del Anfitrión: Gracia triunfal y morada eterna (vv. 5-6)', textRef: 'vv. 5-6', explanation: 'La comunión eterna con Yahvé.' }
        ],
        pastoralApplication: 'Descansar plenamente en la providencia soberana de Dios, sabiendo que su bondad y gracia nos persiguen cada día.'
      }
    }
  },

  // 11. GÉNESIS 1:1-5, 26-27
  {
    id: 'gen-1-1-5',
    reference: 'Génesis 1:1-5, 26-27',
    title: 'La Creación Soberana Ex-Nihilo y el Diseño del Imago Dei',
    testament: 'Antiguo Testamento',
    division: 'Pentateuco',
    theologicalTheme: 'Creación Ex-Nihilo, Teología Trinitaria e Imago Dei',

    rvr1960Full: 'En el principio creó Dios los cielos y la tierra. Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas. Y dijo Dios: Sea la luz; y fue la luz... Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza... Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.',

    lblaFull: 'En el principio creó Dios los cielos y la tierra. Y la tierra estaba sin orden y vacía, y las tinieblas cubrían la superficie del abismo, y el Espíritu de Dios se movía sobre la superficie de las aguas. Entonces dijo Dios: Sea la luz. Y hubo luz... Y dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza... Creó, pues, Dios al hombre a imagen suya, a imagen de Dios lo creó; varón y hembra los creó.',

    ntvFull: 'En el principio, Dios creó los cielos y la tierra. La tierra no tenía forma y estaba vacía, y la oscuridad cubría las aguas profundas; y el Espíritu de Dios se movía en el aire sobre la superficie de las aguas. Entonces Dios dijo: «Que haya luz»; y hubo luz... Entonces Dios dijo: «Hagamos a los seres humanos a nuestra imagen y semejanza... Así que Dios creó a los seres humanos a su propia imagen. A imagen de Dios los creó; hombre y mujer los creó.',

    verses: [
      {
        num: '1',
        rvr1960: 'En el principio creó Dios los cielos y la tierra.',
        lbla: 'En el principio creó Dios los cielos y la tierra.',
        ntv: 'En el principio, Dios creó los cielos y la tierra.',
        originalKeyHighlight: 'בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ (Bərē’šîṯ bārā’ ’ĕlōhîm ’ēṯ haššāmayim wə’ēṯ hā’āreṣ)',
        theologicalNote: '«Bara» (crear de la nada): verbo reservado exclusivamente en la Biblia para la acción originaria divina ex nihilo.'
      },
      {
        num: '2',
        rvr1960: 'Y la tierra estaba desordenada y vacía, y las tinieblas estaban sobre la faz del abismo, y el Espíritu de Dios se movía sobre la faz de las aguas.',
        lbla: 'Y la tierra estaba sin orden y vacía, y las tinieblas cubrían la superficie del abismo, y el Espíritu de Dios se movía sobre la superficie de las aguas.',
        ntv: 'La tierra no tenía forma y estaba vacía, y la oscuridad cubría las aguas profundas; y el Espíritu de Dios se movía en el aire sobre la superficie de las aguas.',
        originalKeyHighlight: 'וְרוּחַ אֱלֹהִים מְרַחֶפֶת עַל־פְּנֵי הַמָּיִם (wərûaḥ ’ĕlōhîm məraḥep̄eṯ ‘al-pənê hammāyim)',
        theologicalNote: '«Ruach Elohim» (El Espíritu de Dios): la Tercera Persona de la Trinidad incubando y ordenando la creación material.'
      },
      {
        num: '3',
        rvr1960: 'Y dijo Dios: Sea la luz; y fue la luz.',
        lbla: 'Entonces dijo Dios: Sea la luz. Y hubo luz.',
        ntv: 'Entonces Dios dijo: «Que haya luz»; y hubo luz.',
        originalKeyHighlight: 'וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי־אוֹר (wayyō’mer ’ĕlōhîm yəhî ’ôr wayhî-’ôr)',
        theologicalNote: 'El fiat divino creador: la creación obedece instantáneamente a la Palabra soberana del Creador.'
      },
      {
        num: '26',
        rvr1960: 'Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza; y señoree en los peces del mar...',
        lbla: 'Y dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza; y ejerza dominio sobre los peces del mar...',
        ntv: 'Entonces Dios dijo: «Hagamos a los seres humanos a nuestra imagen y semejanza. Que ellos reinen sobre los peces del mar...',
        originalKeyHighlight: 'וַיֹּאמֶר אֱלֹהִים נַעֲשֶׂה אָדָם בְּצַלְמֵנוּ כִּדְמוּתֵנוּ (na‘ăśeh ’āḏām bəṣalmēnû kiḏmûṯēnû)',
        theologicalNote: '«Na’aseh» (Hagamos en plural deliberativo): consejo trinitario y fundamento ontológico sagrado de la vida humana.'
      },
      {
        num: '27',
        rvr1960: 'Y creó Dios al hombre a su imagen, a imagen de Dios lo creó; varón y hembra los creó.',
        lbla: 'Creó, pues, Dios al hombre a imagen suya, a imagen de Dios lo creó; varón y hembra los creó.',
        ntv: 'Así que Dios creó a los seres humanos a su propia imagen. A imagen de Dios los creó; hombre y mujer los creó.',
        originalKeyHighlight: 'וַיִּבְרָא אֱלֹהִים אֶת־הָאָדָם בְּצַלְמוֹ... זָכָר וּנְקֵבָה בָּרָא אֹתָם',
        theologicalNote: 'El hombre y la mujer comparten de manera plena e igualitaria la dignidad del Imago Dei y el mandato de mayordomía.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción monumental que forjó el vocabulario teológico en lengua castellana.',
      lblaStyle: 'Precisión léxica que preserva la estructura morfológica hebrea («sin orden y vacía», «ejerza dominio»).',
      ntvStyle: 'Fluidez moderna y pedagógica («Que haya luz», «Dios creó a los seres humanos a su propia imagen»).'
    },

    originalLanguage: {
      language: 'Hebreo Bíblico',
      fullOriginal: 'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃ וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֙הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְה֑וֹם וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃',
      fullTransliteration: 'Bərē’šîṯ bārā’ ’ĕlōhîm ’ēṯ haššāmayim wə’ēṯ hā’āreṣ. Wəhā’āreṣ hāyəṯāh ṯōhû wāḇōhû wəḥōšeḵ ‘al-pənê ṯəhôm wərûaḥ ’ĕlōhîm məraḥep̄eṯ ‘al-pənê hammāyim.',
      manuscriptBasis: 'Biblia Hebraica Stuttgartensia (BHS), Códice de Leningrado (B19A, 1008 d.C.) y el Códice de Alepo.',
      words: [
        {
          original: 'בְּרֵאשִׁית',
          transliteration: 'Bərē’šîṯ',
          strong: 'H7225',
          morphology: 'Preposición בְּ + Sustantivo rē’šîṯ',
          morphologyExpanded: 'En el principio temporal y cósmico absoluto',
          literal: 'en el principio / en el origen primero',
          explanation: 'Marca el punto cero del tiempo y del universo creado por decreto divino.'
        },
        {
          original: 'בָּרָא',
          transliteration: 'bārā’',
          strong: 'H1254',
          morphology: 'Verbo Qal Perfecto 3ms',
          morphologyExpanded: 'Bara: crear ex-nihilo sin materia preexistente',
          literal: 'creó de la nada',
          explanation: 'Sujeto exclusivo de Dios en todo el Tanaj; jamás se usa con sujeto humano.'
        },
        {
          original: 'אֱלֹהִים',
          transliteration: '’ĕlōhîm',
          strong: 'H430',
          morphology: 'Sustantivo Masc. Plural de Majestad',
          morphologyExpanded: 'Plural intensivo de majestad con verbo en singular (bārā’)',
          literal: 'Dios / el Supremo Omnipotente',
          explanation: 'La gramática hebrea combina sujeto plural con verbo singular, anticipando la Trinidad.'
        },
        {
          original: 'הַשָּׁמַיִם',
          transliteration: 'haššāmayim',
          strong: 'H8064',
          morphology: 'Artículo הַ + Sustantivo Dual/Plural',
          morphologyExpanded: 'Los cielos siderales y celestiales',
          literal: 'los cielos',
          explanation: 'Merismo hebreo «los cielos y la tierra» que abarca la totalidad del cosmos.'
        },
        {
          original: 'נַעֲשֶׂה אָדָם',
          transliteration: 'na‘ăśeh ’āḏām',
          strong: 'H6213 + H120',
          morphology: 'Verbo Qal Cohortativo 1pl + Sustantivo',
          morphologyExpanded: 'Hagamos deliberadamente al ser humano',
          literal: 'hagamos al hombre',
          explanation: 'Consejo intradivino trinitario antes de la creación del ser humano.'
        },
        {
          original: 'בְּצַלְמֵנוּ',
          transliteration: 'bəṣalmēnû',
          strong: 'H6754',
          morphology: 'Preposición + Sustantivo tselem + Suf. 1pl',
          morphologyExpanded: 'Tselem: imagen, efigie representativa, reflejo moral y espiritual',
          literal: 'a nuestra imagen',
          explanation: 'El ser humano como mayordomo real y portador de la gloria refleja de Dios en la tierra.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-henry-gen1',
        author: 'Matthew Henry',
        theologianEra: 'Puritano / Clásico',
        work: 'Comentario Exegético-Devocional: Génesis',
        text: '«En el principio creó Dios los cielos y la tierra». El primer versículo de la Biblia derriba en una sola sentencia todo el edificio de los errores filosóficos del hombre: aniquila el ateísmo (Dios existe), el politeísmo (un solo Dios creó todo), el panteísmo (Dios es trascendente y distinto del cosmos) y el materialismo (la materia no es eterna, tuvo un principio por su palabra).',
        focus: 'Cosmovisión Teocéntrica y Creación Ex-Nihilo',
        crossReferences: ['Salmo 33:6-9', 'Juan 1:1-3', 'Colosenses 1:16', 'Hebreos 11:3']
      },
      {
        id: 'c-calvino-gen1',
        author: 'Juan Calvino',
        theologianEra: 'Reformador',
        work: 'Comentario al Libro del Génesis (Tomo I)',
        text: 'Moisés no escribió como un astrónomo o filósofo naturalista para satisfacer la curiosidad especulativa, sino como un teólogo guiado por el Espíritu Santo para revelar el teatro de la gloria divina. El universo es un espejo resplandeciente donde podemos contemplar la sabiduría infinita, la bondad soberana y el poder todopoderoso de nuestro Creador.',
        focus: 'El Universo como Teatro de la Gloria de Dios',
        crossReferences: ['Salmo 19:1-4', 'Romanos 1:19-20', 'Hechos 17:24-28']
      },
      {
        id: 'c-macarthur-gen1',
        author: 'John MacArthur',
        theologianEra: 'Contemporáneo',
        work: 'La Batalla por el Comienzo: La Creación según Génesis 1-11',
        text: 'Génesis 1:1 es el cimiento insoslayable de toda la revelación bíblica. Si no puedes confiar en las palabras de Dios cuando te revela cómo empezó el mundo en Génesis, ¿cómo confiarás en su mensaje cuando te dice cómo ser salvo del pecado en los Evangelios? Rechazar el relato histórico de la creación abre la puerta a la apostasía teológica.',
        focus: 'Inerrancia Bíblica y Soberanía Creadora de Dios',
        crossReferences: ['Éxodo 20:11', 'Marcos 10:6', '2 Pedro 3:5']
      }
    ],

    exegesis: {
      summary: 'Génesis 1:1-31 es el fundamento teológico de toda la Escritura: proclama la soberanía absoluta de Dios sobre el cosmos, la creación ex-nihilo por la palabra eficaz de su boca, y la dignidad intrínseca y sagrada del ser humano como portador del Imago Dei.',
      step1_textualCriticism: 'El Texto Masorético en el Códice de Leningrado (B19A) y el Rollo de Génesis de Qumrán (4QGen) atestiguan una preservación textual uniforme y pura sin variantes sustanciales.',
      step2_historicalContext: 'Moisés escribió el Génesis durante la travesía del desierto (c. 1446-1406 a.C.) para un pueblo recién liberado de Egipto. Confronta directamente las cosmogonías paganas del Antiguo Oriente Próximo (como el Enuma Elish babilónico y los mitos egipcios de Heliópolis), enseñando que el sol, la luna y los animales no son deidades a adorar, sino criaturas creadas por el único Dios vivo.',
      step3_syntacticalAnalysis: 'Construcción con diez fiats creadores («Y dijo Dios... y fue así»). Estructura simétrica perfecta en dos tríadas: Días 1-3 (Formación de los espacios habitables: luz, firmamento, tierra seca) y Días 4-6 (Llenado de los espacios: lumbreras, peces/aves, animales y el ser humano).',
      step4_christocentricTheology: 'Cristo es el Verbo Creador (Juan 1:1-3, Colosenses 1:16-17, Hebreos 1:2) por quien y para quien todas las cosas fueron hechas. Además, el primer Adán en Génesis 1 es tipo profético del Postrer Adán, Jesucristo (Romanos 5:14, 1 Corintios 15:45).',
      step5_systematicTheology: 'Doctrina de la Creación Ex-Nihilo, Teología Trinitaria (el Padre decreta, el Verbo crea, el Espíritu incuba), Providencia Ordinaria y Antropología Bíblica (Dignidad del Imago Dei frente al aborto y la eutanasia).',
      step6_homiletics: {
        ptc: 'Dios creó soberanamente el universo de la nada por el poder de su Palabra para manifestar su gloria y diseñó al ser humano a su imagen para tener comunión eterna con Él.',
        outline: [
          { point: '1. El Dios Soberano: Creador trascendente e increado de todo lo que existe (vv. 1-2)', textRef: 'vv. 1-2', explanation: 'La distinción Creador-Criatura.' },
          { point: '2. La Palabra Poderosa: Creación y orden por el decreto divino (vv. 3-25)', textRef: 'vv. 3-25', explanation: 'La eficacia invencible de la voz de Dios.' },
          { point: '3. El Diseño Supremo: El hombre y la mujer creados a imagen de Dios (vv. 26-27)', textRef: 'vv. 26-27', explanation: 'La dignidad y propósito eterno del ser humano.' }
        ],
        pastoralApplication: 'Vivir en constante reverencia ante la majestad del Creador, encontrando nuestro valor y propósito supremo en reflejar su santidad en el mundo.'
      }
    }
  },

  // 12. MATEO 28:18-20
  {
    id: 'mat-28-18-20',
    reference: 'Mateo 28:18-20',
    title: 'La Gran Comisión y la Autoridad Soberana de Cristo Resucitado',
    testament: 'Nuevo Testamento',
    division: 'Evangelios',
    theologicalTheme: 'Cristología, Eclesiología, Misión y Señorío Universal',

    rvr1960Full: 'Y Jesús se acercó y les habló diciendo: Toda potestad me es dada en el cielo y en la tierra. Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo; enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.',

    lblaFull: 'Acercándose Jesús, les dijo: Toda autoridad me ha sido dada en el cielo y en la tierra. Id, pues, y haced discípulos de todas las naciones, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo, enseñándoles a guardar todo lo que os he mandado; y he aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.',

    ntvFull: 'Jesús se acercó y dijo a sus discípulos: «Se me ha dado toda autoridad en el cielo y en la tierra. Por lo tanto, vayan y hagan discípulos de todas las naciones, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo. Enseñen a los nuevos discípulos a obedecer todos los mandatos que les he dado. Y tengan por seguro esto: yo estoy con ustedes todos los días, hasta el fin de los tiempos».',

    verses: [
      {
        num: '18',
        rvr1960: 'Y Jesús se acercó y les habló diciendo: Toda potestad me es dada en el cielo y en la tierra.',
        lbla: 'Acercándose Jesús, les dijo: Toda autoridad me ha sido dada en el cielo y en la tierra.',
        ntv: 'Jesús se acercó y dijo a sus discípulos: «Se me ha dado toda autoridad en el cielo y en la tierra.',
        originalKeyHighlight: 'Ἐδόθη μοι πᾶσα ἐξουσία ἐν οὐρανῷ καὶ ἐπὶ [τῆς] γῆς (Edothē moi pasa exousia)',
        theologicalNote: '«Pasa exousia» (toda autoridad y potestad soberana): la soberanía cósmica de Cristo resucitado es el fundamento inconmovible de la misión.'
      },
      {
        num: '19',
        rvr1960: 'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo;',
        lbla: 'Id, pues, y haced discípulos de todas las naciones, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo,',
        ntv: 'Por lo tanto, vayan y hagan discípulos de todas las naciones, bautizándolos en el nombre del Padre y del Hijo y del Espíritu Santo.',
        originalKeyHighlight: 'πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη... εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος',
        theologicalNote: 'El único verbo imperativo principal es «mathēteusate» (haced discípulos). «En el nombre» (singular: eis to onoma) proclama la unidad de la Trinidad.'
      },
      {
        num: '20',
        rvr1960: 'enseñándoles que guarden todas las cosas que os he mandado; y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo. Amén.',
        lbla: 'enseñándoles a guardar todo lo que os he mandado; y he aquí, yo estoy con vosotros todos los días, hasta el fin del mundo.',
        ntv: 'Enseñen a los nuevos discípulos a obedecer todos los mandatos que les he dado. Y tengan por seguro esto: yo estoy con ustedes todos los días, hasta el fin de los tiempos».',
        originalKeyHighlight: 'καὶ ἰδοὺ ἐγὼ μεθ’ ὑμῶν εἰμι πάσας τὰς ἡμέρας ἕως τῆς συντελείας τοῦ αἰῶνος',
        theologicalNote: '«Egō meth’ hymōn eimi» (Emanuel: Yo estoy con vosotros): la promesa divina de presencia continua y preservación pastoral de la iglesia.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción clásica y solemne leída en todas las ordenaciones ministeriales.',
      lblaStyle: 'Precisión gramatical: «haced discípulos de todas las naciones... a guardar todo lo que os he mandado».',
      ntvStyle: 'Claridad dinámica e instructiva: «Enseñen a los nuevos discípulos a obedecer... hasta el fin de los tiempos».'
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'Πορευθέντες οὖν μαθητεύσατε πάντα τὰ ἔθνη, βαπτίζοντες αὐτοὺς εἰς τὸ ὄνομα τοῦ πατρὸς καὶ τοῦ υἱοῦ καὶ τοῦ ἁγίου πνεύματος, διδάσκοντες αὐτοὺς τηρεῖν πάντα ὅσα ἐνετειλάμην ὑμῖν...',
      fullTransliteration: 'Poreuthentes oun mathēteusate panta ta ethnē, baptizontes autous eis to onoma tou patros kai tou huiou kai tou hagiou pneumatos, didaskontes autous tērein panta hosa eneteilamēn hymin...',
      manuscriptBasis: 'NA28, Códice Sinaítico (א 01), Códice Vaticano (B 03), Códice Washingtoniano (W 032).',
      words: [
        {
          original: 'ἐξουσία',
          transliteration: 'exousia',
          strong: 'G1849',
          morphology: 'Sustantivo Nominativo Fem. Sing.',
          morphologyExpanded: 'Exousia: autoridad legítima soberana y poder de gobierno pleno',
          literal: 'toda autoridad / potestad judicial y real',
          explanation: 'Cristo tiene supremacía sobre toda institución humana, espiritual o cósmica.'
        },
        {
          original: 'μαθητεύσατε',
          transliteration: 'mathēteusate',
          strong: 'G3100',
          morphology: 'Verbo Aoristo Activo Imperativo 2pl',
          morphologyExpanded: 'Mathēteuō: formar discípulos, aprendices dedicados que imitan a su Señor',
          literal: 'haced discípulos / formad aprendices',
          explanation: 'El mandato central de la Gran Comisión: formar vidas sujetas a las enseñanzas de Cristo.'
        },
        {
          original: 'εἰς τὸ ὄνομα',
          transliteration: 'eis to onoma',
          strong: 'G1519 + G3686',
          morphology: 'Preposición + Sustantivo Singular Acusativo',
          morphologyExpanded: 'En el único Nombre (singular) de las Tres Personas divinas',
          literal: 'en el Nombre (singular)',
          explanation: 'Fórmula trinitaria suprema: un solo Dios en tres Personas coiguales y coeternas.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-henry-mat28',
        author: 'Matthew Henry',
        theologianEra: 'Puritano / Clásico',
        work: 'Comentario al Evangelio según San Mateo',
        text: '«Toda potestad me es dada». El mandato de ir al mundo no descansa sobre nuestras fuerzas humanas ni estrategias sociológicas, sino sobre la omnipotencia de Aquel que venció a la muerte y al infierno. No hay pueblo, tribu o corazón rebelde que esté fuera de la jurisdicción del Rey Jesús.',
        focus: 'Señorío Universal de Cristo y Misión Eclesial',
        crossReferences: ['Daniel 7:13-14', 'Filipenses 2:9-11', 'Apocalipsis 1:18']
      },
      {
        id: 'c-spurgeon-mat28',
        author: 'Charles Spurgeon',
        theologianEra: 'Príncipe de Predicadores',
        work: 'La Promesa Cumbre de la Iglesia: Yo estoy con vosotros',
        text: 'Miren la doble promesa que cerca este mandato: comienza con toda autoridad y termina con toda presencia. ¿Cómo temeremos a la oposición del mundo cuando el Capitán de nuestra salvación marcha a nuestro lado en cada paso del camino?',
        focus: 'Presencia Divina Ininterrumpida y Fortaleza en la Evangelización',
        crossReferences: ['Josué 1:9', 'Hechos 18:9-10', 'Hebreos 13:5-6']
      }
    ],

    exegesis: {
      summary: 'Mateo 28:18-20 es la carta magna de la misión de la iglesia cristiana: Cristo encarga a sus apóstoles y a su iglesia proclamar el evangelio, bautizar en el nombre trinitario y enseñar la obediencia a sus mandamientos respaldados por su presencia eterna.',
      step1_textualCriticism: 'Aparato NA28 firme. La fórmula trinitaria está atestiguada por la totalidad de los manuscritos griegos antiguos y los primeros padres de la iglesia (Didaché cap. 7, Justino Mártir, Ireneo).',
      step2_historicalContext: 'En un monte de Galilea, tras su resurrección física triunfal, Jesús se reúne con los once discípulos y comisiona formalmente a la comunidad del Nuevo Pacto antes de su ascensión a la diestra del Padre.',
      step3_syntacticalAnalysis: 'Estructura gramatical con un verbo principal imperativo (mathēteusate) modificado por tres participios: poreuthentes (yendo), baptizontes (bautizando) y didaskontes (enseñando).',
      step4_christocentricTheology: 'Jesús como el Hijo del Hombre de Daniel 7 a quien se le da dominio eterno y reino universal sobre todas las naciones.',
      step5_systematicTheology: 'Trinidad, Teología del Bautismo, Autoridad de las Escrituras y Reino de Dios.',
      step6_homiletics: {
        ptc: 'La iglesia proclama con valentía el señorío de Jesucristo a todas las naciones, formando discípulos obedientes bajo la autoridad soberana y la presencia prometida de su Señor.',
        outline: [
          { point: '1. El Fundamento Soberano: Toda potestad en cielo y tierra pertenece a Cristo (v. 18)', textRef: 'v. 18', explanation: 'La autoridad ilimitada de Jesús.' },
          { point: '2. El Mandato Divino: Id y haced discípulos bautizando y enseñando (vv. 19-20a)', textRef: 'vv. 19-20a', explanation: 'El alcance mundial de la doctrina apostólica.' },
          { point: '3. El Consuelo Eterno: Yo estoy con vosotros todos los días hasta el fin (v. 20b)', textRef: 'v. 20b', explanation: 'La presencia infalible del Salvador.' }
        ],
        pastoralApplication: 'Comprometer la vida y los recursos de la iglesia local en la proclamación del evangelio puro y el discipulado bíblico centrado en Cristo.'
      }
    }
  },

  // 13. APOCALIPSIS 21:1-7
  {
    id: 'rev-21-1-7',
    reference: 'Apocalipsis 21:1-7',
    title: 'Cielo Nuevo y Tierra Nueva: La Morada Eterna de Dios con los Hombres',
    testament: 'Nuevo Testamento',
    division: 'Epístolas Generales',
    theologicalTheme: 'Escatología Consumada, Comunión Eterna y Victoria Final',

    rvr1960Full: 'Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron, y el mar ya no existía más. Y yo Juan vi la santa ciudad, la nueva Jerusalén, descender del cielo, de Dios, dispuesta como una esposa ataviada para su marido. Y oí una gran voz del cielo que decía: He aquí el tabernáculo de Dios con los hombres, y él morará con ellos; y ellos serán su pueblo, y Dios mismo estará con ellos como su Dios. Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron. Y el que estaba sentado en el trono dijo: He aquí, yo hago nuevas todas las cosas.',

    lblaFull: 'Y vi un cielo nuevo y una tierra nueva, porque el primer cielo y la primera tierra pasaron, y el mar ya no existe. Y vi la ciudad santa, la nueva Jerusalén, que descendía del cielo, de Dios, preparada como una novia ataviada para su esposo. Entonces oí una gran voz que decía desde el trono: He aquí, el tabernáculo de Dios está entre los hombres, y Él habitará entre ellos y ellos serán su pueblo, y Dios mismo estará entre ellos. Él enjugará toda lágrima de sus ojos, y ya no habrá muerte, ni habrá más duelo, ni clamor, ni dolor, porque las primeras cosas han pasado. Y el que está sentado en el trono dijo: He aquí, yo hago nuevas todas las cosas.',

    ntvFull: 'Entonces vi un cielo nuevo y una tierra nueva, porque el primer cielo y la primera tierra habían desaparecido y también el mar. Y vi la ciudad santa, la nueva Jerusalén, que descendía del cielo, desde la presencia de Dios, como una novia vestida para su novio. Oí una fuerte voz que salía del trono y decía: «¡Miren, el hogar de Dios ahora está entre su pueblo! Él vivirá con ellos, y ellos serán su pueblo. Dios mismo estará con ellos. Él les secará toda lágrima de los ojos, y no habrá más muerte ni tristeza ni llanto ni dolor. Todas esas cosas ya no existirán más». Y el que estaba sentado en el trono dijo: «¡Miren, hago nuevas todas las cosas!».',

    verses: [
      {
        num: '1',
        rvr1960: 'Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron, y el mar ya no existía más.',
        lbla: 'Y vi un cielo nuevo y una tierra nueva, porque el primer cielo y la primera tierra pasaron, y el mar ya no existe.',
        ntv: 'Entonces vi un cielo nuevo y una tierra nueva, porque el primer cielo y la primera tierra habían desaparecido y también el mar.',
        originalKeyHighlight: 'Καὶ εἶδον οὐρανὸν καινὸν καὶ γῆν καινήν (ouranon kainon kai gēn kainēn)',
        theologicalNote: '«Kainos» (nuevo en naturaleza cualitativa): no aniquilación sino gloriosa renovación y redención cósmica.'
      },
      {
        num: '3',
        rvr1960: 'He aquí el tabernáculo de Dios con los hombres, y él morará con ellos; y ellos serán su pueblo, y Dios mismo estará con ellos como su Dios.',
        lbla: 'He aquí, el tabernáculo de Dios está entre los hombres, y Él habitará entre ellos y ellos serán su pueblo, y Dios mismo estará entre ellos.',
        ntv: '«¡Miren, el hogar de Dios ahora está entre su pueblo! Él vivirá con ellos, y ellos serán su pueblo. Dios mismo estará con ellos.',
        originalKeyHighlight: 'Ἰδοὺ ἡ σκηνὴ τοῦ θεοῦ μετὰ τῶν ἀνθρώπων, καὶ σκηνώσει μετ’ αὐτῶν',
        theologicalNote: 'La promesa cumbre de toda la teología del pacto (Éxodo 29:45, Jeremías 31:33) consumada en gloria visible.'
      },
      {
        num: '4',
        rvr1960: 'Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni habrá más llanto, ni clamor, ni dolor; porque las primeras cosas pasaron.',
        lbla: 'Él enjugará toda lágrima de sus ojos, y ya no habrá muerte, ni habrá más duelo, ni clamor, ni dolor, porque las primeras cosas han pasado.',
        ntv: 'Él les secará toda lágrima de los ojos, y no habrá más muerte ni tristeza ni llanto ni dolor. Todas esas cosas ya no existirán más».',
        originalKeyHighlight: 'καὶ ἐξαλείψει πᾶν δάκρυον... καὶ ὁ θάνατος οὐκ ἔσται ἔτι (ho thanatos ouk estai eti)',
        theologicalNote: 'La muerte es destruida para siempre: el último enemigo es tragado por la victoria eterna del Cordero.'
      }
    ],

    versionAnalysis: {
      rvr1960Style: 'Traducción poética sublime llena de esperanza escatológica.',
      lblaStyle: 'Fidelidad al texto griego («Él enjugará toda lágrima... porque las primeras cosas han pasado»).',
      ntvStyle: 'Impacto devocional conmovedor: «¡Miren, el hogar de Dios ahora está entre su pueblo!». '
    },

    originalLanguage: {
      language: 'Griego Koiné',
      fullOriginal: 'Καὶ εἶδον οὐρανὸν καινὸν καὶ γῆν καινήν· ὁ γὰρ πρῶτος οὐρανὸς καὶ ἡ πρώτη γῆ ἀπῆλθαν... καὶ σκηνώσει μετ’ αὐτῶν, καὶ αὐτοὶ λαοὶ αὐτοῦ ἔσονται, καὶ αὐτὸς ὁ θεὸς μετ’ αὐτῶν ἔσται...',
      fullTransliteration: 'Kai eidon ouranon kainon kai gēn kainēn; ho gar prōtos ouranos kai hē prōtē gē apēlthan... kai skēnōsei met autōn, kai autoi laoi autou esontai, kai autos ho theos met autōn estai...',
      manuscriptBasis: 'NA28, Códice Alejandrino (A 02), Códice Efrem Rescripto (C 04).',
      words: [
        {
          original: 'καινόν',
          transliteration: 'kainon',
          strong: 'G2537',
          morphology: 'Adjetivo Acusativo Masc. Sing.',
          morphologyExpanded: 'Kainos: nuevo en calidad, frescura y carácter glorificado',
          literal: 'nuevo y renovado',
          explanation: 'Difiere de neos (nuevo en tiempo); denota la transformación gloriosa de la creación libre de maldición.'
        },
        {
          original: 'σκηνώσει',
          transliteration: 'skēnōsei',
          strong: 'G4637',
          morphology: 'Verbo Futuro Activo Indicativo 3s',
          morphologyExpanded: 'Skēnoō: plantar tabernáculo, habitar en comunión permanente',
          literal: 'habitará como en tabernáculo eterno',
          explanation: 'Dios ya no está oculto tras el velo; mora cara a cara con sus siervos redimidos.'
        }
      ]
    },

    commentaries: [
      {
        id: 'c-henry-rev21',
        author: 'Matthew Henry',
        theologianEra: 'Puritano / Clásico',
        work: 'Comentario al Libro de Apocalipsis',
        text: '¡Oh qué consuelo inefable para el peregrino cansado! En la Nueva Jerusalén no habrá cementerios, ni hospitales, ni cámaras de dolor, ni lágrimas de despedida. Dios mismo será el pañuelo divino que enjugará toda aflicción de los ojos de sus hijos.',
        focus: 'Consolación Eterna y la Comunión Cara a Cara con Dios',
        crossReferences: ['Isaías 25:8', '1 Corintios 15:26', 'Apocalipsis 7:17']
      },
      {
        id: 'c-macarthur-rev21',
        author: 'John MacArthur',
        theologianEra: 'Contemporáneo',
        work: 'Comentario MacArthur del NT: Apocalipsis 12-22',
        text: 'La culminación del plan redentor no es un espíritu flotando en las nubes, sino una creación física y tangible renovada donde los santos resucitados en cuerpos incorruptibles vivirán eternamente en la presencia del Dios Trino y del Cordero.',
        focus: 'Resurrección Corporal y la Tierra Nueva Renovada',
        crossReferences: ['Romanos 8:21-23', '2 Pedro 3:13', 'Isaías 65:17']
      }
    ],

    exegesis: {
      summary: 'Apocalipsis 21:1-7 describe la consumación gloriosa de la historia de la redención: el descenso de la Nueva Jerusalén, la comunión perfecta entre Dios y su pueblo redimido, y la erradicación total de la maldición del pecado y la muerte.',
      step1_textualCriticism: 'Aparato crítico NA28 sólido. La perícopa inaugura la visión final del libro (21:1 - 22:5).',
      step2_historicalContext: 'Escrito por el apóstol Juan desterrado en la isla de Patmos durante la feroz persecución imperial romana bajo Domiciano (c. 95 d.C.) para consolar a las iglesias atribuladas.',
      step3_syntacticalAnalysis: 'Construcción apodíctica solemne («Y el que estaba sentado en el trono dijo...»). Serie quíntuple de negaciones absolutas (ouk estai eti: no habrá más muerte, llanto, clamor ni dolor).',
      step4_christocentricTheology: 'El Cordero es el Esposo de la Iglesia (la Nueva Jerusalén ataviada) y el Templo eterno donde mora la gloria de Dios.',
      step5_systematicTheology: 'Escatología Cósmica, Estado Eterno, Teología del Pacto y Santidad.',
      step6_homiletics: {
        ptc: 'La promesa gloriosa de Dios garantiza que en la consumación de los siglos moraremos eternamente en su presencia en una creación renovada sin sufrimiento, muerte ni pecado.',
        outline: [
          { point: '1. La Creación Renovada: Un cielo nuevo y una tierra nueva (v. 1)', textRef: 'v. 1', explanation: 'La redención cósmica total.' },
          { point: '2. La Morada Divina: Dios habitando en comunión íntima con su pueblo (vv. 2-3)', textRef: 'vv. 2-3', explanation: 'El cumplimiento final del pacto de la gracia.' },
          { point: '3. El Fin del Sufrimiento: Lágrimas enjugadas y muerte abolida para siempre (vv. 4-7)', textRef: 'vv. 4-7', explanation: 'La victoria eterna del trono de Dios.' }
        ],
        pastoralApplication: 'Perseverar con firmeza en medio de las tribulaciones del tiempo presente con la mirada puesta en la patria celestial y en el retorno de Cristo.'
      }
    }
  }
];


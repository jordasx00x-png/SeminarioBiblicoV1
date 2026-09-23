import { Course } from '../../types';

export const doctoradoExegesis: Course = {
  id: 'doc-exegesis-hermeneutica',
  title: 'Doctorado en Exégesis y Hermenéutica Avanzada',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Investigación profunda sobre los métodos contemporáneos de interpretación bíblica, crítica textual y teología bíblica aplicada.',
  lessons: [
    {
      id: 'doc-exe-1',
      day: 1,
      title: 'Epistemología de la Interpretación y Crítica Textual',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoSistematica: Course = {
  id: 'doc-teologia-sistematica',
  title: 'Doctorado en Teología Sistemática y Dogmática',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Análisis exhaustivo de los grandes dogmas del cristianismo, su desarrollo histórico y su relevancia en el pensamiento posmoderno.',
  lessons: [
    {
      id: 'doc-sis-1',
      day: 1,
      title: 'Ontología y Revelación',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoArqueologia: Course = {
  id: 'doc-arqueologia-biblica',
  title: 'Doctorado en Arqueología Bíblica y Contexto Histórico',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Estudio de campo y teórico sobre las civilizaciones del Antiguo Cercano Oriente y el mundo grecorromano.',
  lessons: [
    {
      id: 'doc-arq-1',
      day: 1,
      title: 'Metodología de Campo en Arqueología Bíblica',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoEtica: Course = {
  id: 'doc-etica-filosofia',
  title: 'Doctorado en Ética Cristiana y Filosofía de la Religión',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Diálogo entre la fe y el pensamiento filosófico actual, abordando dilemas bioéticos y de justicia social.',
  lessons: [
    {
      id: 'doc-eti-1',
      day: 1,
      title: 'La Ética en la Ciudad Postsecular',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoLiderazgo: Course = {
  id: 'doc-liderazgo-misionologia',
  title: 'Doctorado en Liderazgo Eclesiástico y Misionología',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Estrategias de expansión misional y gestión de organizaciones eclesiásticas en contextos globales complejos.',
  lessons: [
    {
      id: 'doc-lid-1',
      day: 1,
      title: 'Modelos de Liderazgo Servidor y Eclesiología Transcultural',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoEducacionSuperior: Course = {
  id: 'doc-educacion-superior',
  title: 'Doctorado en Educación Superior Teológica',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Investigación sobre modelos pedagógicos avanzados, diseño curricular de posgrado y liderazgo institucional en el ámbito de la educación teológica superior.',
  lessons: [
    {
      id: 'doc-edu-1',
      day: 1,
      title: 'Epistemología y Pedagogía Teológica',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoPensamientoCristiano: Course = {
  id: 'doc-pensamiento-cristiano',
  title: 'Doctorado en Historia del Pensamiento Cristiano',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Análisis crítico del desarrollo de las ideas teológicas desde la patrística hasta la modernidad tardía, con énfasis en las controversias dogmáticas.',
  lessons: [
    {
      id: 'doc-hpc-1',
      day: 1,
      title: 'Historiografía y Metodología de Investigación',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoApologeticaTrascendental: Course = {
  id: 'doc-apologetica-trascendental',
  title: 'Doctorado en Apologética Trascendental',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Defensa filosófica y presuposicional de la fe cristiana frente a los desafíos del ateísmo, el naturalismo y el pluralismo religioso contemporáneo.',
  lessons: [
    {
      id: 'doc-apt-1',
      day: 1,
      title: 'La Prueba Trascendental de la Existencia de Dios',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoTeologiaCultura: Course = {
  id: 'doc-teologia-cultura',
  title: 'Doctorado en Teología de la Cultura y Transformación Social',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Investigación sobre la interacción entre el evangelio y la cultura, ética social y el papel de la iglesia en la transformación de la esfera pública.',
  lessons: [
    {
      id: 'doc-tcu-1',
      day: 1,
      title: 'Teología de la Esfera Pública',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoConsejeríaTeológica: Course = {
  id: 'doc-consejeria-teologica',
  title: 'Doctorado en Consejería Teológica y Cuidado de Almas',
  type: 'DOCTORADO',
  durationMonths: 18,
  description: 'Investigación avanzada sobre la cura animarum, antropología bíblica profunda y la aplicación de la teología dogmática a la restauración del ser humano.',
  lessons: [
    {
      id: 'doc-cta-1',
      day: 1,
      title: 'Antropología Bíblica y Patología Espiritual',
      blocks: [],
      finalExam: []
    }
  ]
};

export const doctoradoCourses: Course[] = [
  doctoradoExegesis,
  doctoradoSistematica,
  doctoradoArqueologia,
  doctoradoEtica,
  doctoradoLiderazgo,
  doctoradoEducacionSuperior,
  doctoradoPensamientoCristiano,
  doctoradoApologeticaTrascendental,
  doctoradoTeologiaCultura,
  doctoradoConsejeríaTeológica
];

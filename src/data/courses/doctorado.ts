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

export const doctoradoCourses: Course[] = [
  doctoradoExegesis,
  doctoradoSistematica,
  doctoradoArqueologia,
  doctoradoEtica,
  doctoradoLiderazgo
];

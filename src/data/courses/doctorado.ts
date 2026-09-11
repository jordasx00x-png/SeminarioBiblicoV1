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
      title: 'Epistemología de la Interpretación',
      blocks: [{ type: 'text', id: 'b1', content: 'Introducción a la base filosófica del conocimiento y su impacto en la lectura del texto sagrado.' }],
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
      blocks: [{ type: 'text', id: 'b1', content: 'El ser de Dios y la comunicación de su voluntad en la historia de la salvación.' }],
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
      title: 'Metodología de Campo en Arqueología',
      blocks: [{ type: 'text', id: 'b1', content: 'Técnicas de excavación y catalogación de hallazgos del periodo del Hierro II.' }],
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
      blocks: [{ type: 'text', id: 'b1', content: 'Desafíos del pluralismo moral y la respuesta de la academia cristiana.' }],
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
      title: 'Modelos de Liderazgo Servidor',
      blocks: [{ type: 'text', id: 'b1', content: 'Análisis de la autoridad espiritual en la eclesiología contemporánea.' }],
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

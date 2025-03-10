export enum GroupType {
    PROBLEM_FORMULATION = 'problem_formulation',
    COLLECTING_GENERATION = 'collecting_generation',
    PREPROCESSING_LABELING = 'preprocessing_labeling',
    DEVELOPMENT_CALIBRATION = 'development_calibration',
    IMPLEMENTATION = 'implementation'
  }
  
  export interface GroupStyles {
    backgroundColor: string;
    borderColor: string;
    label: string;
    fontSize?: string;
  }
  
  export const groupStyles: Record<GroupType, GroupStyles> = {
    [GroupType.PROBLEM_FORMULATION]: {
      backgroundColor: 'rgba(0, 0, 255, 0.1)',
      borderColor: '#0000FF',
      label: 'Problem Formulation',

    },
    [GroupType.COLLECTING_GENERATION]: {
      backgroundColor: 'rgba(255, 165, 0, 0.1)',
      borderColor: '#FFA500',
      label: 'Collecting/Generation'
    },
    [GroupType.PREPROCESSING_LABELING]: {
      backgroundColor: 'rgba(255, 255, 0, 0.1)',
      borderColor: '#FFD700',
      label: 'Pre-processing and Labeling'
    },
    [GroupType.DEVELOPMENT_CALIBRATION]: {
      backgroundColor: 'rgba(220, 20, 60, 0.1)',
      borderColor: '#DC143C',
      label: 'Development and Calibration'
    },
    [GroupType.IMPLEMENTATION]: {
      backgroundColor: 'rgba(0, 255, 0, 0.1)',
      borderColor: '#008000',
      label: 'Implementation'
    }
  };
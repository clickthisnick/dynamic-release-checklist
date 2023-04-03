/* tslint:disable:max-line-length */

export class Config {
  public static checklistSectionTitle() {
    return 'Stretch Checklist';
  }

  public static rolesSectionTitle() {
    return 'Fill Out Who Is Covering Each Role';
  }

  public static questionsSectionTitle() {
    return 'Stretch Questionaire';
  }

  public static questionTypes() {
    return [
      {value:'Stretch'},
    ];
  }

  public static QuestionButtonText() {
    return {
      defaultFalse:'No',
      defaultTrue:'Yes'
    };
  }

  public static roles() {
    return [
      {role:'Nick'},
      {role:'Other'}
    ];
  }

  public static questions() {
  return [
      // kitchen
      {id: 1, text: 'Test?', description: '', default: false},
    ];
  }

  public static tasks() {
    return [
        // ------------------ Kitchen ------------------ //
        // While hands are clean
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'2 leg down'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Butterfly'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Back twist left'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Back twist right'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Butterfly one leg right straight'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Butterfly one leg left straight'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Cobra'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'2 leg down'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'5 push ups'},

        // ------------------ Living Room ------------------ //

      ];
  }
}

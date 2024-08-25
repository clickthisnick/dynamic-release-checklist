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
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Set timer for 60 seconds'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'2 leg down'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'standing quad leg to back stretch right'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'standing quad leg to back stretch left'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Butterfly'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'30 Hand Crushes Each Hand'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'16 Right Hand 150lb Hand Squeeze'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'10 Left Hand 150lb Hand Squeeze'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Back twist left'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Back twist right'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Butterfly one leg right straight'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Butterfly one leg left straight'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'Cobra'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'2 leg down'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'25 push ups'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Stretch',task:'25 squats'},

        // ------------------ Living Room ------------------ //

      ];
  }
}

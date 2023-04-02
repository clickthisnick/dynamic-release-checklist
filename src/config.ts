export class Config {
  public static checklistSectionTitle() {
    return 'Example Checklist';
  }

  public static rolesSectionTitle() {
    return 'Fill Out Who Is Covering Each Role';
  }

  public static questionsSectionTitle() {
    return 'Example Questionnaire';
  }

  public static questionTypes() {
    return [
      {value:'Day Before'}
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
      {role:'Devops'}
    ];
  }

  public static questions() {
  return [
      {id: 1, text: 'Are you building a serverless application?',    description: '', default: false},
    ];
  }

  public static tasks() {
    return [
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Devops',type:'Day Before',task:'Example Task Name'},
      ];
  }

}

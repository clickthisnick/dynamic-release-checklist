/* tslint:disable:max-line-length */

export class Config {
  public static checklistSectionTitle() {
    return 'Moving Checklist';
  }

  public static rolesSectionTitle() {
    return 'Fill Out Who Is Covering Each Role';
  }

  public static questionsSectionTitle() {
    return 'Checklist Questions';
  }

  public static questionTypes() {
    return [
      {value:'Pre Move'},
      {value:'Moving Day'}
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
      {role:'Movee'},
      {role:'Movers'},
    ];
  }

  public static questions() {
  return [
      {id:1,text:'Do you have lamps',description:'',default:false},
      {id:2,text:'Do you have a metal bed frame',description:'',default:false},
      {id:3,text:'Do you have furniture like a dresser or tv stand with removable pieces like shelves/screws',description:'',default:false},
    ];
  }

  public static tasks() {
    return [
      {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Movee',type:'Moving Day',task:'Unscrew Lightbulbs and Pack. (Movers won\'t move with lightbulbs in)'},
      {questionsRequiredYes:[2],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Movee',type:'Moving Day',task:'Fold metal bed frame, leaving screws in frame'},
      {questionsRequiredYes:[3],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Movee',type:'Pre Move',task:'Put all removable screws/attachments/shelves etc from tv stands/shelves in a ziplock bag and label so they dont get lost'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Movee',type:'Pre Move',task:'Purchase boxes, around 38 medium for a 1 bedroom'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Movee',type:'Pre Move',task:'Purchase mattress cover'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Movee',type:'Pre Move',task:'Confirm move with both places'},
    ];
  }
}

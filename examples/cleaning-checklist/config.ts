/* tslint:disable:max-line-length */

export class Config {
  public static checklistSectionTitle() {
    return 'Cleaning Checklist';
  }

  public static rolesSectionTitle() {
    return 'Fill Out Who Is Covering Each Role';
  }

  public static questionsSectionTitle() {
    return 'Cleaning Questionaire';
  }

  public static questionTypes() {
    return [
      {value:'Clean'},
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
      {id: 1, text: 'Are the dishes in the dishwasher clean?', description: '', default: false},
      {id: 2, text: 'Is the trash can more than halfway full?', description: '', default: false},

      // washing machine
      {id: 3, text: 'Is there anything in the washing machine?', description: '', default: false},
      {id: 4, text: 'Is there anything in the dryer?', description: '', default: false},

      // living room
      {id: 5, text: 'Are there clothes in the living room?', description: '', default: false},
    ];
  }

  public static tasks() {
    return [
        // ------------------ Kitchen ------------------ //
        // While hands are clean
        {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put away the clean dishes in the dishwasher'},

        // Long running things
        {questionsRequiredYes:[4],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put clothes in dryer into clean hamper'},
        {questionsRequiredYes:[3],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put clean clothes into dryer'},
        {questionsRequiredYes:[5],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put away clothes in living room'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put dirty clothes into washing machine'},

        // Trash - increasing capacity for cleaning
        {questionsRequiredYes:[2],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Take trash'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Take out recycling'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put any trash from living room and kitchen into trash can'},

        // Clean top down 
        // Load Dishwasher
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put on gloves'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Fill a coffee cup mug full of water'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put all the utensils in the mug'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Stack all small plates with water inbetween'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Stack all large plates with water inbetween'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Wait 5 minutes'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put on gloves'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off utensils and load in silverware washer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off bowls and load in top washer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off small plates and load in sideways, facing you bottom washer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off large plates and load normally in washer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Load everyting else into wishwasher'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Start wishwasher'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Start wishwasher'},


        // ------------------ Living Room ------------------ //

      ];
  }
}

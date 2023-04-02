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
      {id: 6, text: 'Are there dirty dishes?', description: '', default: false},

      // washing machine
      {id: 3, text: 'Is there anything in the washing machine?', description: '', default: false},
      {id: 4, text: 'Is there anything in the dryer?', description: '', default: false},

      // living room
      {id: 5, text: 'Are there clothes in the living room?', description: '', default: false},

      // downstairs bathroom
      {id: 7, text: 'Does the downstairs bathroom need cleaning?', description: '', default: false},
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
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put on gloves'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Fill a coffee cup mug full of water'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put all the utensils in the mug'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Stack all small plates with water inbetween'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Stack all large plates with water inbetween'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Wait 5 minutes'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put on gloves'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off utensils and load in silverware washer'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off bowls and load in top washer'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off small plates and load in sideways, facing you bottom washer'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Bruch off large plates and load normally in washer'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Load everything else into dishwasher'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Start dishwasher'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Spray and wipe countertop'},

        // Clean Downstairs bathroom
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Organize vanity'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Put away/Remove all items from bathroom'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Spray mirror cleaner and wipe off'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Clean glass shelf'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Clean sink'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Use broom and brush off toilet'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Clean toilet'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Sweep floor'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Wash floor with paper towels'},
        {questionsRequiredYes:[7],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Clean',task:'Plugin in eucalpyous smelly thing'},

        // ------------------ Living Room ------------------ //

      ];
  }
}

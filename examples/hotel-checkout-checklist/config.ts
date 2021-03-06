/* tslint:disable:max-line-length */

export class Config {
  public static checklistSectionTitle() {
    return 'Hotel Checkout Checklist';
  }

  public static rolesSectionTitle() {
    return 'Fill Out Who Is Covering Each Role';
  }

  public static questionsSectionTitle() {
    return 'Checklist Questions';
  }

  public static questionTypes() {
    return [
      {value:'Pre Checkout'},
      {value:'Checkout'}
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
      {role:'Mom'},
      {role:'Dad'},
      {role:'Brother'},
      {role:'Sister'}
    ];
  }

  public static questions() {
  return [
      {id:1,text:'Do you need to turn in the key card',description:'',default:false},
      {id:2,text:'Is the car far away?',description:'',default:false}
    ];
  }

  public static tasks() {
    return [
      {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Mom',type:'Pre Checkout',task:'Get everyones keycard'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Dad',type:'Pre Checkout',task:'Check if any food is left in fridge'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Mom',type:'Pre Checkout',task:'Make sure nothing is left behind in the bathroom'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Sister',type:'Pre Checkout',task:'Check the closet to make sure nothing is left behind'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Brother',type:'Pre Checkout',task:'Look under the beds to make sure nothing is left behind'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Dad',type:'Checkout',task:'Carry suitcases downstairs'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Brother',type:'Checkout',task:'Help dad carry suitecases downstairs'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Brother',type:'Checkout',task:'Wait in lobby with suitcases'},
      {questionsRequiredYes:[2],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Dad',type:'Checkout',task:'Walk to car and bring to front of hotel'},
      {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Sister',type:'Checkout',task:'Do one final walkthrough of room to check for left items'},
      {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Mom',type:'Checkout',task:'Give receptionist the keycards'},
      {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Mom',type:'Checkout',task:'Check out of hotel/pay any fees'}
    ];
  }
}

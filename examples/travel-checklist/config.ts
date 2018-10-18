/* tslint:disable:max-line-length */

export class Config {
  public static checklistSectionTitle() {
    return 'Travel Checklist';
  }

  public static rolesSectionTitle() {
    return 'Fill Out Who Is Covering Each Role';
  }

  public static questionsSectionTitle() {
    return 'Travel Questionaire';
  }

  public static questionTypes() {
    return [
      {value:'Day Before'},
      {value:'Night Before'},
      {value:'Day Of'}
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
      {id: 1, text: 'Are you taking a plane?',    description: '', default: false},
      {id: 2, text: 'Do you have bread?',         description: '', default: false},
      {id: 3, text: 'Is your destination cold?',  description: '', default: false},
    ];
  }

  public static tasks() {
    return [
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Notify Any Mail Service You Are Going Away'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Wash Any Clothes You Want To Wear'},

        // Travel
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Pack Suitcase'},
        {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Take Screenshot / Print Boarding Pass'},
        {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Out Keys / Phone'},

        // Day Of Time Management
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Print An Itinerary https://www.clickthisnick.com/itinerary/itinerary.html'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Alarm To Wake Up'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Alarm 5 Minutes Before Having To Leave'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Alarm At Time Have To Leave'},

        // Tech For Tomorrow
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Charge Phone'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Charge Phone Battery Pack'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Charge Computer'},

        // Cleanup Before Gone For Awhile
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Eat / Remove Perishable Fridgerator / Cupboard Items You Wont Eat Day Of Travel'},

        // Phone
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Charger In Carry On'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Charger Cord In Carry On'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Battery Pack In Carry On'},

        // Bathroom
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Toothbrush'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Toothbrush Charger'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Toothpaste'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Floss'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Hairgel'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Retainer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Deordorant'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Cologne'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Face Trimmer'},

        // Misc
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Computer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Computer Charger'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Check You Have Drivers License'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Turn Off Air Conditioners / Heaters'},

        // Clean Up
        {questionsRequiredYes:[2],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Put Any Bread In Freezer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Eat / Remove Perishable Fridgerator / Cupboard Items'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Take Out Trash'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Clean Sink'},

        // Packing
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack One Pair Of Underwear Per Day'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack One T Shirt Per Day'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack One Pair Of Socks Per 2 Days'},

        // Staying Warm
        {questionsRequiredYes:[3],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Wear / Pack Hat And Gloves'},
        {questionsRequiredYes:[3],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack 1 Sweater For Every 3 Days Of Travel'},
      ];
  }
}

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
      {id: 2, text: 'Are you taking a bus?',      description: '', default: false},
      {id: 3, text: 'Do you have bread?',         description: '', default: false},
      {id: 4, text: 'Is your destination cold?',  description: '', default: false},
      {id: 5, text: 'Is your destination sunny?',  description: '', default: false},
    ];
  }

  public static tasks() {
    return [
        // ------------------ Day Before ------------------ //
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Notify Any Mail Service You Are Going Away'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Wash Any Clothes You Want To Wear'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Turn off phone block schedule'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Turn off Rhoomba schedule'},

        // ------------------ Night Before ------------------ //
        // Travel
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Pack Suitcase'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1,2],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Take Screenshot / Print Boarding Pass'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Out Keys / Phone'},

        // Day Of Time Management
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Print An <a href="https://www.clickthisnick.com/itinerary/itinerary.html" target="_blank">Itinerary</a>'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Alarm To Wake Up'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Alarm 5 Minutes Before Having To Leave'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Alarm At Time Have To Leave'},

        // Tech For Tomorrow
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Charge Phone'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Charge Computer'},

        // Clean Face
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Shave Face'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Shave Notrils'},

        // Cleanup Before Gone For Awhile
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Eat / Remove Perishable Refrigerator / Cupboard Items You Wont Eat Day Of Travel'},

        // ------------------ Day Off ------------------ //
        // Phone
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Charger In Carry On'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Charger Cord In Carry On'},

        // Bathroom
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Toothbrush'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Toothpaste'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Floss'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Hairgel'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Retainer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Retainer Cleaner'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Deodorant'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Cologne'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Face Trimmer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Face Lotion Wash'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Face Lotion Serum'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Face Lotion Eye Cream'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Face Lotion Moisturizer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Vitamin E Cream'},

        // Sunny
        {questionsRequiredYes:[5],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Sunglasses'},
        {questionsRequiredYes:[5],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Sunscreen'},

        // Misc
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Computer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Computer Charger'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Check You Have Drivers License'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Turn Off Air Conditioners / Heaters'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Hankerchief'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Sleep Mask'},

        // Clean Up
        {questionsRequiredYes:[3],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Put Any Bread In Freezer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Eat / Remove Perishable Refrigerator / Cupboard Items'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Take Out Trash'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Clean Sink'},

        // Packing
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack One Pair Of Underwear Per Day'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack One T Shirt Per Day'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack One Pair Of Socks Per 2 Days'},

        // Staying Warm
        {questionsRequiredYes:[4],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Wear / Pack Hat And Gloves'},
        {questionsRequiredYes:[4],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack 1 Sweater For Every 3 Days Of Travel'},

        // Prevent Accidents
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Go to Bathroom Before Leaving'},
      ];
  }
}

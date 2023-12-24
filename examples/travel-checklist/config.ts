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
      {role:'Me'},
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
      {id: 6, text: 'Will there be any pets (Aside from your own)?',  description: '', default: false},
      {id: 7, text: 'Are you taking your pets?',  description: '', default: false},
      {id: 8, text: 'Is the house going to be empty?',  description: '', default: false},
      {id: 9, text: 'Are you travelling Internationally?',  description: '', default: false},
    ];
  }

  public static tasks() {
    return [
        // ------------------ Day Before ------------------ //
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Get A Hair Cut'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Notify Any Mail Service You Are Going Away'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Wash Any Clothes You Want To Wear'},
        // {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Water Plants'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Delete All Game Apps'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Download Apple Maps Offline'},
        {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Download Flight App'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Before',task:'Download Movies/Podcasts Offline'},

        // ------------------ Night Before ------------------ //
        // Travel
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Pack Suitcase'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1,2],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Check-in To Transportation'},

        // {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Set Out Keys / Phone'},

        // Day Of Time Management
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Set an Alarm based on Itinerary app'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Set Alarm To Wake Up'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Set Alarm 5 Minutes Before Having To Leave'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Set Alarm At Time Have To Leave'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Set Alarm To Pack Retainer'},

        // Tech For Tomorrow
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Charge Phone'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Charge Computer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Charge Noise Cancelling Headphones'},

        // Hygiene
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Shave Face'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Shave Notrils'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Cut Fingernails'},

        // Cleanup Before Gone For Awhile
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Eat / Remove Perishable Refrigerator / Cupboard Items You Won\'t Eat Day Of Travel'},

        // Cleanup while on vacation
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Pack 1 Garbage Bag Per 2 Days'},

        // Packing clothes
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Pack One Pair Of Underwear Per Day'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Pack One T Shirt Per Day'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Pack One Pair Of Socks Per 2 Days'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Pack One Pair Of Pants Per 2 Days'},

        // Packing Warm Clothes
        {questionsRequiredYes:[4],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Pack 1 Sweater For Every 3 Days Of Travel'},

        // Misc
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before', task:'Pack Hankerchief'},
        {questionsRequiredYes:[9],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Check You Have Passport'},
        {questionsRequiredYes:[9],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Download airalo for sim card'},

        // Pet
        {questionsRequiredYes:[],questionsRequiredNo:[8],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Clean pet bathroom'},

        // Ensure bathroom items are packed - Duplicateda are packed in travel bag
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'All Tasks Belows Are To Ensure Item(s) Are in Travel Bag'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Toothpaste'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Floss Picks'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Hairgel'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Deodorant'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Cologne'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Face Trimmer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Chap Stick'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Bandaids'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Sleep Mask'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'Bluelight Blocking Glasses'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Night Before',task:'All Tasks Above Are To Ensure Item(s) Are in Travel Bag'},

        // ------------------ Day Of ------------------ //

        // Bathroom
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Retainer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Retainer Cleaner'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Face Lotion Wash'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Face Lotion Serum'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Face Lotion Eye Cream'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Face Lotion Moisturizer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Vitamin E Cream'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Other',type:'Day Of',task:'Pack Makeup Remover'},

        // Sunny
        {questionsRequiredYes:[5],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Sunscreen'},

        // Misc
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Computer'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Computer Charger'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Check You Have Drivers License'},
        {questionsRequiredYes:[8],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Unplug Electronics'},
        {questionsRequiredYes:[8],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Turn Off Air Conditioners / Heaters'},
        {questionsRequiredYes:[6],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Bring allergy medicine'},

        // Clean Up
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[3,8],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Put Any Bread In Freezer'},
        {questionsRequiredYes:[8],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Eat / Remove Perishable Refrigerator / Cupboard Items'},
        {questionsRequiredYes:[8],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Take Out Trash'},
        {questionsRequiredYes:[8],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Clean Sink'},

        // Staying Warm
        {questionsRequiredYes:[4],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Wear / Pack Hat And Gloves'},

        // Everyone Section
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Everything Below Is For Everyone'},
        {questionsRequiredYes:[5],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Sunglasses'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Water Bottle'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Noise Cancelling Headphones'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Headphone Charger'},
        // Phone
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Phone Charger In Carry On'},
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Pack Phone Charger Cord In Carry On'},

        // Prevent Accidents
        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Go to Bathroom Before Leaving'},

        {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Me',type:'Day Of',task:'Everything Above Is For Everyone'},
        // Everyone Section
      ];
  }
}

function checklistSectionTitle() {
  return "Travel Checklist";
}

function rolesSectionTitle() {
  return "Fill Out Who Is Covering Each Role";;
}

function questionsSectionTitle() {
  return "Travel Questionaire";
}

function questionTypes() {
  return [
  {value:'Day Before'},
  {value:'Night Before'},
  {value:'Day Of'}
  ];
}

function QuestonButtonText() {
  var btnMapping =   {
    defaultFalse:'No',
    defaultTrue:'Yes'
  };
  return btnMapping;
}

function roles() {
  return [
  {role:'Nick'},
  {role:'Other'}
  ];
}

function questions() {
return [
    {id: 1, text: 'Are you taking a plane?',    description: '', default: false},
    {id: 2, text: 'Do you have bread?',         description: '', default: false},
    {id: 3, text: 'Is your destination cold?',  description: '', default: false},
  ];
}

function tasks() {
return [

  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Notify Any Mail Service You Are Going Away'},
  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Before',task:'Wash Any Clothes You Want To Wear'},

  // Travel
  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Pack Suitcase'},
  {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Take Screenshot / Print Boarding Pass'},
  {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Set Out Keys / Phone'},

  // Day Of Time Management
  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Night Before',task:'Print An Itinerary https://cdn.rawgit.com/clickthisnick/itinerary/master/itinerary.html'},
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
  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Charger'},
  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Charger Cord'},
  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Pack Phone Battery Pack'},

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

  // Staying Warm
  {questionsRequiredYes:[3],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Nick',type:'Day Of',task:'Wear / Pack Hat And Gloves'},
  ];
}
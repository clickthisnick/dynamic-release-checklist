function checklistSectionTitle() {
  return 'Release Checklist - Copy & Paste Into Jira Ticket';
}

function rolesSectionTitle() {
  return 'Fill Out Who Is Covering Each Role';
}

function questionsSectionTitle() {
  return 'Release Questions';
}

function questionTypes() {
  return [
    {value:'Pre Release'},
    {value:'Release'},
    {value:'Post Release'}
  ];
}

function QuestonButtonText() {
  return {
    defaultFalse:'No',
    defaultTrue:'Yes'
  };
}

function roles() {
  return [
    {role:'QA'},
    {role:'BA'},
    {role:'SD'}
  ];
}

function questions() {
  return [
      {id:1,text:'Is this your first release for this program?',description:'',default:false},
      {id:2,text:'Will this release impact the availability scripts?',description:'',default:false},
      {id:3,text:'Does this release include any new batch jobs?',description:'',default:false},
      {id:4,text:'Does this release include any change to a Rule Engine?',description:'',default:false},
      {id:5,text:'Does this release require a planned downtime window?',description:'',default:false}
    ];
}

function tasks() {
  return [
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Pre Release',task:'Verify there is a version in JIRA associated with all stories in release. Make sure the version description and release date are accurate'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Pre Release',task:'Create Jira task for the release, add it to the appropriate sprint, and link to the wiki release checklist'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Pre Release',task:'Create and send release Outlook meeting invite to release team'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[1],questionsAnyNo:[],role:'QA',type:'Pre Release',task:'Ensure Website availability is set up '},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[2],questionsAnyNo:[],role:'QA',type:'Pre Release',task:'Suspend availability scripts / Update if needed'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[3],questionsAnyNo:[],role:'SD',type:'Pre Release',task:'Push Batch job(s) to production (should be disabled on initial push)'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Release',task:'Ensure all automated tests are passing, (unit, integration, UI where applicable) '},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[4],questionsAnyNo:[],role:'QA',type:'Release',task:'Ensure all Rule Engine TestSuites are passing.'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[5],questionsAnyNo:[],role:'QA',type:'Release',task:'Suspend availability Alarms during scheduled downtime '},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Release',task:'Ensure no Batch Jobs are running'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Release',task:'Make a copy of production'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Release',task:'Push code to production'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[5],questionsAnyNo:[],role:'SD',type:'Release',task:'Implement the Down Page'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[3],questionsAnyNo:[],role:'SD',type:'Release',task:'Enable Batch Jobs and verify their schedule'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[4],questionsAnyNo:[],role:'QA',type:'Release',task:'Push RuleEngine Code To Production'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Release',task:'Notify team that we are ready for smoke test'},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Release',task:'Smoke Test after notification received ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Release',task:'Smoke Test after notification received ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'BA',type:'Release',task:'Smoke Test after notification received ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[5],questionsAnyNo:[],role:'SD',type:'Release',task:'Remove down page',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Release',task:'Notify team of successful release by replying all to Outlook calendar invitation',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Pull the release branch ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Pull the master branch ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Merge release branch into master ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Push to master ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Merge master to any open release branches',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Create Release Tag on Master Branch ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Delete release branch if applicable',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Delete backup of production ',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'SD',type:'Post Release',task:'Notify team to GRPO and delete/re-pull Integration branches',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Post Release',task:'Do a Gitk to verify branch merging',owner:'',comment:''},
    {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Post Release',task:'Close the release task, verify checklist is complete and close the version, making sure the release date is accurate',owner:'',comment:''},
    {questionsRequiredYes:[2],questionsRequiredNo:[1],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Post Release',task:'Deploy/Unsuspend availability script',owner:'',comment:''},
    {questionsRequiredYes:[1],questionsRequiredNo:[2],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Post Release',task:'Deploy availability script',owner:'',comment:''},
    {questionsRequiredYes:[1,2],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'QA',type:'Post Release',task:'Deploy availability script',owner:'',comment:''}
  ];
}

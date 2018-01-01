## Is your release checklist full of fluff?

###That's why I created the Dynamic Release Checklist.

Only have **_relevant_** items in your checklist.

------

## Demo:

<a href="https://cdn.rawgit.com/clickthisnick/dynamic-release-checklist/7edf4834/examples/jira-release-checklist/checklist.html" target="_blank"> Click For Demo</a>


# The Problem:

Too many times I see release checklists full of items that **don't apply to this release.**

This teaches and reinforces people to gloss over items, sometimes missing crucial tasks.

Imagine the checklist below with **no downpage**

| Task                   | Needed With This Release?  |
| -------------| :-----:|
| Create Downpage     | *No* |
| Push Code      |    Yes |
| Remove Downpage |     *No* |

You now have two items ( Create Downpage and Remove Downpage ) that are no longer needed on your checklist.

-----

# The Solution:

##### Create questions that reduce your release checklist to only the _necessary_ items

First create a question

```javascript
function questions(){
return [
  {id:1,text:'Is there a downpage?',description:'',default:false}
  ];
}
```

Then tie the tasks to the question.

Push code has no questionsRequiredYes so that tasks shows no matter what.

The tasks Create Downpage and Remove Downpage only show when the question with an id of 1 is set to True.

```javascript
function tasks() {
return [
  {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Developer',type:'Release',task:'Create Downpage'},
  {questionsRequiredYes:[],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Developer',type:'Release',task:'Push Code'},
  {questionsRequiredYes:[1],questionsRequiredNo:[],questionsAnyYes:[],questionsAnyNo:[],role:'Developer',type:'Release',task:'Remove Downpage'}
];
}
```



## Further Explanation:
questionsRequiredYes => Put in any question ids that must be true for this item to be present

questionsRequiredNo => Put in any question ids that must be false for this item to be present

questionsAnyYes => If any of these questions are true this item will show

questionsAnyNo => If any of these questions are false this item will show

role => Who is responsible for this task

type => What section of the checklist will this task be put in


## More Examples:

Clone the repo and checkout the examples in the examples folder

## License

This project is licensed under the [Apache 2.0](LICENSE) license.

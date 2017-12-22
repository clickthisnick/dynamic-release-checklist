angular.module('Checklist', [])
.controller('Controller', function() {

  var checklist = this;

  checklist.checklistSectionTitle = checklistSectionTitle();
  checklist.rolesSectionTitle = rolesSectionTitle()
  checklist.questionsSectionTitle = questionsSectionTitle()

  checklist.questionTypes = questionTypes()

  checklist.QuestonButtonText = QuestonButtonText()

  checklist.roles = roles()

  checklist.questions = questions()

  checklist.tasks = tasks()

  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */
  /* DO NOT EDIT ANYTHING UNDERNEATH THESE LINES */


  checklist.changeRoleValue = function(roles, commonUniqueProperty, role, changeProperty, changeValue) {
    checklist.roles = changeRoleValue(roles, commonUniqueProperty, role, changeProperty, changeValue);
  };

  checklist.getTypes = function() {
    return checklist.questionTypes;
  };

  checklist.getValidTasks = function(type) {
    var tasks = deepCopyArray(checklist.tasks);
    const questions = deepCopyArray(checklist.questions);
    tasks = checklist.filterTasksByType(tasks,type.value);
    tasks = filterTasksByRequired(tasks,questions,true);
    tasks = filterTasksByRequired(tasks,questions,false);
    tasks = filterTasksByAny(tasks,questions,true);
    tasks = filterTasksByAny(tasks,questions,false);
    return tasks;
  };

  checklist.filterTasksByType = function(tasks,type) {
    return filterTasksByType(tasks,type);
  };

  checklist.filterTasksByRequired = function(tasks) {
    return filterTasksByRequired(tasks);
  };

  checklist.filterTasksByAny = function(tasks, questions, expectedBool) {
    return filterTasksByAny(tasks, questions, expectedBool);
  };

  checklist.getBtnStyle = function(button) {
    if (button.default){
      return "success";
    }
    return "danger";
  };

  checklist.getOwnerProperty = function(roles, propertyValue, property, returnProperty) {
    return getOwnerProperty(roles, propertyValue, property, returnProperty);
  };

  checklist.flipBtnStatus = function(button) {
    if (button.default) {
      button.default = false;
    } else {
      button.default = true;
    }
  };

  checklist.getBtnText = function(button) {
    if (button.default) {
      return checklist.QuestonButtonText.defaultTrue;
    }
    return checklist.QuestonButtonText.defaultFalse;
  };

  checklist.ngArrLoop = function(items,numberPerRow) {
    return NgArrRepeat.ngArrLoop(items,numberPerRow);
  };

  checklist.ngArrProp = function(images, index, columnTotal, column, property) {
    return NgArrRepeat.ngArrProp(images, index, columnTotal, column, property);
  };

});

function filterTasksByType(tasks, type) {
  return tasks.filter((task) => task.type === type);
}

function changeRoleValue(roles, commonUniqueProperty, role, changeProperty, changeValue) {

  if (!role[commonUniqueProperty]) {
    return roles;
  }

  for (var i = 0; i < roles.length; i++) {

    if (!roles[i][commonUniqueProperty]) {
      continue;
    }

    if (roles[i][commonUniqueProperty] == role[commonUniqueProperty]) {
      roles[i][changeProperty] = changeValue
    }

  }
  return roles;
}

function getQuestionsAnyProperty(expectedBool) {
  if (expectedBool){
    return 'questionsAnyYes';
  }
  return 'questionsAnyNo';
}

/**
 * Takes in an array of tasks and an array of questions and a desired boolean
 * Returns an array of tasks based on question boolean value
 * @param  {[type]} tasks        [description]
 * @param  {[type]} questions    [description]
 * @param  {[type]} expectedBool [description]
 * @return {[type]}              [description]
 */
function filterTasksByRequired(tasks, questions, expectedBool){
  const newTasks = [];
  const property = expectedBool ? 'questionsRequiredYes': 'questionsRequiredNo';

  for (var i = 0; i < tasks.length; i++) {
    var addToTasks = true;
    for (var x = 0; x < tasks[i][property].length; x++) {
      const question = findQuestion(questions, tasks[i][property][x]);
      console.log(question);

      if (question === undefined || question.default !== expectedBool){
        addToTasks = false;
        break;
      }
    }
    if (addToTasks){
      newTasks.push(tasks[i]);
    }
  }
  return newTasks;
}

function filterTasksByAny(tasks, questions, expectedBool) {
  const newTasks = [];
  const property = getQuestionsAnyProperty(expectedBool);

  for (var i = 0; i < tasks.length; i++) {

    if (tasks[i][property].length === 0){
      newTasks.push(tasks[i]);
      continue;
    }

    for (var x = 0; x < tasks[i][property].length; x++) {
      const question = findQuestion(questions,tasks[i][property][x]);

      if (question !== undefined && question.default === expectedBool){
        newTasks.push(tasks[i]);
        break;
      }
    }
  }
  return newTasks;
}

function findQuestion(questions, questionId) {
  return questions.find((x) => x.id === questionId);
}

function deepCopyArray(array) {
  var newArray=[];
  for(var i=0;i<array.length;i++) {
    newArray.push(array[i]);
  }
  return newArray;
}

function getOwnerProperty(roles, property, propertyValue, returnProperty) {
  const role = roles.find((x) => x[property] === propertyValue);

  if (role === undefined || role[returnProperty] === undefined) {
    return "";
  }

  return role[returnProperty];
}

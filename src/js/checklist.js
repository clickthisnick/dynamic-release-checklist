import { ChecklistFn } from './checklistfn';

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
    tasks = checklist.filterTasksByType(tasks, type.value);
    tasks = filterTasksByRequired(tasks, questions, true);
    tasks = filterTasksByRequired(tasks, questions, false);
    tasks = filterTasksByAny(tasks, questions, true);
    tasks = filterTasksByAny(tasks, questions, false);

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

  checklist.ngArrLoop = function(items, numberPerRow) {
    return NgArrRepeat.ngArrLoop(items, numberPerRow);
  };

  checklist.ngArrProp = function(images, index, columnTotal, column, property) {
    return NgArrRepeat.ngArrProp(images, index, columnTotal, column, property);
  };

});

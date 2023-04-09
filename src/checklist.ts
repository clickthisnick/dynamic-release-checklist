import { ChecklistFn } from './checklistfn';
import { Config } from './config';
import * as angular from 'angular';

export class CheckListController {
  checklistSectionTitle = Config.checklistSectionTitle();
  rolesSectionTitle = Config.rolesSectionTitle();
  questionsSectionTitle = Config.questionsSectionTitle();
  questionTypes = Config.questionTypes();
  questionButtonText = Config.QuestionButtonText();
  roles = Config.roles();
  questions = Config.questions();
  tasks = Config.tasks();
  taskIndex = 0;

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

  public changeRoleValue = (roles, role, changeValue) => {
    this.roles = ChecklistFn.changeRoleValue(roles, role, changeValue);
    console.log(this.roles)
  }

  public getTypes = () => {
    return this.questionTypes;
  }

  public getValidTasks = (type) => {
    let tasks = ChecklistFn.deepCopyArray(this.tasks);

    const questions = ChecklistFn.deepCopyArray(this.questions);
    tasks = this.filterTasksByType(tasks, type.value);
    tasks = ChecklistFn.filterTasksByRequired(tasks, questions, true);
    tasks = ChecklistFn.filterTasksByRequired(tasks, questions, false);
    tasks = ChecklistFn.filterTasksByAny(tasks, questions, true);
    tasks = ChecklistFn.filterTasksByAny(tasks, questions, false);

    return tasks;
  }

  public filterTasksByType = (tasks,type) => {
    return ChecklistFn.filterTasksByType(tasks,type);
  }

  public filterTasksByAny = (tasks, questions, expectedBool) => {
    return ChecklistFn.filterTasksByAny(tasks, questions, expectedBool);
  }

  public getBtnStyle = (button) => {
    if (button.default) {
      return 'success';
    }

    return 'danger';
  }

  public toggleItemStyle = (item) => {
    const doneStyle = "text-decoration:line-through; background-color:black"
    if ('style' in item) {
      if (item['style'] == doneStyle) {
        item['style'] = "";
      } else {
        item['style'] = doneStyle;
      }
    } else {
      item['style'] = doneStyle;
    }
  }

  public getItemStyle = (item) => {
    if ('style' in item) {
      return item['style']
    }
    return ""
  }

  public currentTaskIndex() {
    return this.taskIndex;
  }

  public getOwnerProperty = (roles, propertyValue, property, returnProperty) => {
    return ChecklistFn.getOwnerProperty(roles, propertyValue, property, returnProperty);
  }

  public anyRoles = () => {
    const roleNames = this.roles.map(role => {
      return 'name' in role;
    })

    const isTrue = (element) => element === true;
    return roleNames.some(isTrue)
  }

  public flipBtnStatus = (button) => {
    button.default = (button.default === null || button.default === true) ? false : true;
  }

  public getBtnText = (button) => {
    if (button.default) {
      return this.questionButtonText.defaultTrue;
    }

    return this.questionButtonText.defaultFalse;
  }

  // public ngArrLoop = (items, numberPerRow) => {
  //   return NgArrRepeat.ngArrLoop(items, numberPerRow);
  // }
  //
  // public ngArrProp = (images, index, columnTotal, column, property) => {
  //   return NgArrRepeat.ngArrProp(images, index, columnTotal, column, property);
  // }
}

const app = angular.module('Checklist', []);
app.controller('CheckListController', [CheckListController]);

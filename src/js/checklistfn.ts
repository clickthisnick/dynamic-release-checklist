export class ChecklistFn {
  public static filterTasksByType = (tasks, type) => {
    return tasks.filter((task) => task.type === type);
  }

  public static changeRoleValue(checklistRoles, role, changeValue) {
    for (const checklistRole of checklistRoles) {
      if (checklistRole.role === role.role) {
        checklistRole.name = changeValue;
      }

    }

    return checklistRoles;
  }

  /**
   * Takes in an array of tasks and an array of questions and a desired boolean
   * Returns an array of tasks based on question boolean value
   */
  public static filterTasksByRequired(tasks, questions, expectedBool) {
    const property = expectedBool ? 'questionsRequiredYes': 'questionsRequiredNo';

    return tasks.filter((task) => {
      // TODO Separate into another function
      const validTask = new Set(task[property].map((taskProperty) => {
        const question = this.findQuestion(questions, taskProperty);

        return question !== undefined && question.default === expectedBool;
      }));

      return !validTask.has(false);
    });
  }

  public static filterTasksByAny(tasks, questions, expectedBool) {
    const newTasks: any = [];
    const property = expectedBool ? 'questionsAnyYes' : 'questionsAnyNo';

    for (const task of tasks) {

      if (task[property].length === 0) {
        newTasks.push(task);
        continue;
      }

      for (const taskProperty of task[property]) {
        const question = this.findQuestion(questions, taskProperty);

        if (question !== undefined && question.default === expectedBool) {
          newTasks.push(task);
          break;
        }
      }

    }

    return newTasks;
  }

  public static findQuestion(questions, questionId) {
    return questions.find((x) => x.id === questionId);
  }

  public static deepCopyArray(array) {
    const newArray: any = [];

    for (const item of array) {
      newArray.push(item);
    }

    return newArray;
  }

  public static getOwnerProperty(roles, property, propertyValue, returnProperty) {
    const role = roles.find((x) => x[property] === propertyValue);

    if (role === undefined || role[returnProperty] === undefined) {
      return '';
    }

    return role[returnProperty];
  }
}

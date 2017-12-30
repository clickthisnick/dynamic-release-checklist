"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChecklistFn = (function () {
    function ChecklistFn() {
    }
    ChecklistFn.changeRoleValue = function (checklistRoles, role, changeValue) {
        for (var _i = 0, checklistRoles_1 = checklistRoles; _i < checklistRoles_1.length; _i++) {
            var checklistRole = checklistRoles_1[_i];
            if (checklistRole.role === role.role) {
                checklistRole.name = changeValue;
            }
        }
        return checklistRoles;
    };
    ChecklistFn.filterTasksByRequired = function (tasks, questions, expectedBool) {
        var _this = this;
        var property = expectedBool ? 'questionsRequiredYes' : 'questionsRequiredNo';
        return tasks.filter(function (task) {
            var validTask = task[property].map(function (taskProperty) {
                var question = _this.findQuestion(questions, taskProperty);
                return question !== undefined && question.default === expectedBool;
            });
            return !validTask.includes(false);
        });
    };
    ChecklistFn.filterTasksByAny = function (tasks, questions, expectedBool) {
        var newTasks = [];
        var property = expectedBool ? 'questionsAnyYes' : 'questionsAnyNo';
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var task = tasks_1[_i];
            if (task[property].length === 0) {
                newTasks.push(task);
                continue;
            }
            for (var _a = 0, _b = task[property]; _a < _b.length; _a++) {
                var taskProperty = _b[_a];
                var question = this.findQuestion(questions, taskProperty);
                if (question !== undefined && question.default === expectedBool) {
                    newTasks.push(task);
                    break;
                }
            }
        }
        return newTasks;
    };
    ChecklistFn.findQuestion = function (questions, questionId) {
        return questions.find(function (x) { return x.id === questionId; });
    };
    ChecklistFn.deepCopyArray = function (array) {
        var newArray = [];
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            newArray.push(item);
        }
        return newArray;
    };
    ChecklistFn.getOwnerProperty = function (roles, property, propertyValue, returnProperty) {
        var role = roles.find(function (x) { return x[property] === propertyValue; });
        if (role === undefined || role[returnProperty] === undefined) {
            return '';
        }
        return role[returnProperty];
    };
    ChecklistFn.filterTasksByType = function (tasks, type) {
        return tasks.filter(function (task) { return task.type === type; });
    };
    return ChecklistFn;
}());
exports.ChecklistFn = ChecklistFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tsaXN0Zm4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2hlY2tsaXN0Zm4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBa0ZBLENBQUM7SUE3RWUsMkJBQWUsR0FBN0IsVUFBOEIsY0FBYyxFQUFFLElBQUksRUFBRSxXQUFXO1FBQzdELEdBQUcsQ0FBQyxDQUF3QixVQUFjLEVBQWQsaUNBQWMsRUFBZCw0QkFBYyxFQUFkLElBQWM7WUFBckMsSUFBTSxhQUFhLHVCQUFBO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQ25DLENBQUM7U0FDRjtRQUVELE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDeEIsQ0FBQztJQU1hLGlDQUFxQixHQUFuQyxVQUFvQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVk7UUFBbEUsaUJBYUM7UUFaQyxJQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFBLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztRQUU5RSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQUk7WUFFdkIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLFlBQVk7Z0JBQ2hELElBQU0sUUFBUSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUU1RCxNQUFNLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FBQztZQUNyRSxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFD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
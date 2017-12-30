"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checklistfn_1 = require("./checklistfn");
var config_1 = require("./config");
var angular = require("angular");
var CheckListController = (function () {
    function CheckListController() {
        var _this = this;
        this.checklistSectionTitle = config_1.Config.checklistSectionTitle();
        this.rolesSectionTitle = config_1.Config.rolesSectionTitle();
        this.questionsSectionTitle = config_1.Config.questionsSectionTitle();
        this.questionTypes = config_1.Config.questionTypes();
        this.questonButtonText = config_1.Config.QuestonButtonText();
        this.roles = config_1.Config.roles();
        this.questions = config_1.Config.questions();
        this.tasks = config_1.Config.tasks();
        this.changeRoleValue = function (roles, role, changeValue) {
            _this.roles = checklistfn_1.ChecklistFn.changeRoleValue(roles, role, changeValue);
        };
        this.getTypes = function () {
            return _this.questionTypes;
        };
        this.getValidTasks = function (type) {
            var tasks = checklistfn_1.ChecklistFn.deepCopyArray(_this.tasks);
            var questions = checklistfn_1.ChecklistFn.deepCopyArray(_this.questions);
            tasks = _this.filterTasksByType(tasks, type.value);
            tasks = checklistfn_1.ChecklistFn.filterTasksByRequired(tasks, questions, true);
            tasks = checklistfn_1.ChecklistFn.filterTasksByRequired(tasks, questions, false);
            tasks = checklistfn_1.ChecklistFn.filterTasksByAny(tasks, questions, true);
            tasks = checklistfn_1.ChecklistFn.filterTasksByAny(tasks, questions, false);
            return tasks;
        };
        this.filterTasksByType = function (tasks, type) {
            return checklistfn_1.ChecklistFn.filterTasksByType(tasks, type);
        };
        this.filterTasksByAny = function (tasks, questions, expectedBool) {
            return checklistfn_1.ChecklistFn.filterTasksByAny(tasks, questions, expectedBool);
        };
        this.getBtnStyle = function (button) {
            if (button.default) {
                return 'success';
            }
            return 'danger';
        };
        this.getOwnerProperty = function (roles, propertyValue, property, returnProperty) {
            return checklistfn_1.ChecklistFn.getOwnerProperty(roles, propertyValue, property, returnProperty);
        };
        this.flipBtnStatus = function (button) {
            button.default = (button.default === null || button.default === true) ? false : true;
        };
        this.getBtnText = function (button) {
            if (button.default) {
                return _this.questonButtonText.defaultTrue;
            }
            return _this.questonButtonText.defaultFalse;
        };
    }
    return CheckListController;
}());
exports.CheckListController = CheckListController;
var app = angular.module('Checklist', []);
app.controller('CheckListController', [CheckListController]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tsaXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NoZWNrbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQUE0QztBQUM1QyxtQ0FBa0M7QUFDbEMsaUNBQW1DO0FBRW5DO0lBQUE7UUFBQSxpQkFzRkM7UUFyRkMsMEJBQXFCLEdBQUcsZUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdkQsc0JBQWlCLEdBQUcsZUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsMEJBQXFCLEdBQUcsZUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdkQsa0JBQWEsR0FBRyxlQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkMsc0JBQWlCLEdBQUcsZUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDL0MsVUFBSyxHQUFHLGVBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixjQUFTLEdBQUcsZUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLFVBQUssR0FBRyxlQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFrQmhCLG9CQUFlLEdBQUcsVUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVc7WUFDaEQsS0FBSSxDQUFDLEtBQUssR0FBRyx5QkFBVyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQTtRQUVNLGFBQVEsR0FBRztZQUNoQixNQUFNLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQztRQUM1QixDQUFDLENBQUE7UUFFTSxrQkFBYSxHQUFHLFVBQUMsSUFBSTtZQUMxQixJQUFJLEtBQUssR0FBRyx5QkFBVyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFbEQsSUFBTSxTQUFTLEdBQUcseUJBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVELEtB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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Config = (function () {
    function Config() {
    }
    Config.checklistSectionTitle = function () {
        return 'Hotel Checkout Checklist';
    };
    Config.rolesSectionTitle = function () {
        return 'Fill Out Who Is Covering Each Role';
    };
    Config.questionsSectionTitle = function () {
        return 'Checklist Questions';
    };
    Config.questionTypes = function () {
        return [
            { value: 'Pre Checkout' },
            { value: 'Checkout' }
        ];
    };
    Config.QuestonButtonText = function () {
        return {
            defaultFalse: 'No',
            defaultTrue: 'Yes'
        };
    };
    Config.roles = function () {
        return [
            { role: 'Mom' },
            { role: 'Dad' },
            { role: 'Brother' },
            { role: 'Sister' }
        ];
    };
    Config.questions = function () {
        return [
            { id: 1, text: 'Do you need to turn in the key card', description: '', default: false },
            { id: 2, text: 'Is the car far away?', description: '', default: false }
        ];
    };
    Config.tasks = function () {
        return [
            { questionsRequiredYes: [1], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Mom', type: 'Pre Checkout', task: 'Get everyones keycard' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Dad', type: 'Pre Checkout', task: 'Check if any food is left in fridge' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Mom', type: 'Pre Checkout', task: 'Make sure nothing is left behind in the bathroom' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Sister', type: 'Pre Checkout', task: 'Check the closet to make sure nothing is left behind' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Brother', type: 'Pre Checkout', task: 'Look under the beds to make sure nothing is left behind' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Dad', type: 'Checkout', task: 'Carry suitcases downstairs' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Brother', type: 'Checkout', task: 'Help dad carry suitecases downstairs' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Brother', type: 'Checkout', task: 'Wait in lobby with suitcases' },
            { questionsRequiredYes: [2], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Dad', type: 'Checkout', task: 'Walk to car and bring to front of hotel' },
            { questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Sister', type: 'Checkout', task: 'Do one final walkthrough of room to check for left items' },
            { questionsRequiredYes: [1], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Mom', type: 'Checkout', task: 'Give receptionist the keycards' },
            { questionsRequiredYes: [1], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [], role: 'Mom', type: 'Checkout', task: 'Check out of hotel/pay any fees' }
        ];
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZXhhbXBsZXMvaG90ZWwtY2hlY2tvdXQtY2hlY2tsaXN0L2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQUE7SUEyREEsQ0FBQztJQTFEZSw0QkFBcUIsR0FBbkM7UUFDRSxNQUFNLENBQUMsMEJBQTBCLENBQUM7SUFDcEMsQ0FBQztJQUVhLHdCQUFpQixHQUEvQjtRQUNFLE1BQU0sQ0FBQyxvQ0FBb0MsQ0FBQztJQUM5QyxDQUFDO0lBRWEsNEJBQXFCLEdBQW5DO1FBQ0UsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0lBQy9CLENBQUM7SUFFYSxvQkFBYSxHQUEzQjtRQUNFLE1BQU0sQ0FBQztZQUNMLEVBQUMsS0FBSyxFQUFDLGNBQWMsRUFBQztZQUN0QixFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUM7U0FDbkIsQ0FBQztJQUNKLENBQUM7SUFFYSx3QkFBaUIsR0FBL0I7UUFDRSxNQUFNLENBQUM7WUFDTCxZQUFZLEVBQUMsSUFBSTtZQUNqQixXQUFXLEVBQUMsS0FBSztTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUVhLFlBQUssR0FBbkI7UUFDRSxNQUFNLENBQUM7WUFDTCxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUM7WUFDWixFQUFDLElBQUksRUFBQyxLQUFLLEVBQUM7WUFDWixFQUFDLElBQUksRUFBQyxTQUFTLEVBQUM7WUFDaEIsRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDO1NBQ2hCLENBQUM7SUFDSixDQUFDO0lBRWEsZ0JBQVMsR0FBdkI7UUFDQSxNQUFNLENBQUM7WUFDSCxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLHFDQUFxQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQztZQUM5RSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLHNCQUFzQixFQUFDLFdBQVcsRUFBQyxF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
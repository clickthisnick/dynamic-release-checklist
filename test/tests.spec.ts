import { ChecklistFn } from '../src/checklistfn';

describe('Filtering by type', () => {
  const tasks = [
    {id: 1, type: 'apple'},
    {id: 2, type: 'banana'},
    {id: 3, type: 'apple'},
    {id: 4, type: 'pear'}
  ];

  it('returns the correct tasks', () => {
    const results = ChecklistFn.filterTasksByType(tasks, 'apple');

    expect(results.length).toBe(2);
    expect(results[0].id).toBe(1);
    expect(results[1].id).toBe(3);
  });

  it('returns a blank array when there are no matching types', () => {
    const results = ChecklistFn.filterTasksByType(tasks, 'applesauce');

    expect(results.length).toBe(0);
    expect(results).toEqual([]);
  });
});

describe('Filtering tasks by required answer', () => {
  it('returns the correct tasks when there is 1 required yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [1], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [2], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: true},
      {id: 2, text: '', description: '', default: false}
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there are 2 required yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [1, 2], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [3], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: true},
      {id: 2, text: '', description: '', default: true},
      {id: 3, text: '', description: '', default: false}
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there is 1 required no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [1], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [2], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: true}
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, false);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there are 2 required no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [1, 2], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [3], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: false},
      {id: 3, text: '', description: '', default: true}
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, false);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when questions dont exist required yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [1, 2], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [3], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: true},
      {id: 2, text: '', description: '', default: true},
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when questions dont exist required no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [1, 2], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [3], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: false},
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, false);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there are no questions required yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: false},
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, true);

    expect(results.length).toBe(2);
    expect(results[0].id).toBe(1);
    expect(results[1].id).toBe(2);
  });

  it('returns the correct tasks when there are no questions required no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: false},
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, false);

    expect(results.length).toBe(2);
    expect(results[0].id).toBe(1);
    expect(results[1].id).toBe(2);
  });

  it('returns the correct tasks when going from a task with no questions to a task with questions required yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [1], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: false},
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when going for a task with questions to a task with no questions required yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [1], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: false},
    ];
    const results = ChecklistFn.filterTasksByRequired(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(2);
  });
});

describe('Finding the value of a question', () => {
  const questions = [
    {id: 1, text: '', description: '', default: true},
    {id: 2, text: '', description: '', default: false}
  ];

  it('returns the correct questions value', () => {
    const results = ChecklistFn.findQuestion(questions, 1);
    expect(results).toEqual({id: 1, text: '', description: '', default: true});
  });

  it('returns undefined when question does not exist', () => {
    const results = ChecklistFn.findQuestion(questions, 3);
    expect(results).toBe(undefined);
  });
});

describe('Filtering tasks by the any answer property', () => {

  it('returns the correct tasks when there is 1 any yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [1], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [2], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: true},
      {id: 2, text: '', description: '', default: false},
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there are 2 any yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [1, 2], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [3], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: true},
      {id: 3, text: '', description: '', default: false}
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there is 1 any no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [1]},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [2]}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: true},
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, false);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there are 2 any no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [1, 2]},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [3]}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: true},
      {id: 2, text: '', description: '', default: false},
      {id: 3, text: '', description: '', default: true}
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, false);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when questions dont exist when any is no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [1, 2]},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: [5]}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: true},
      {id: 2, text: '', description: '', default: false},
      {id: 3, text: '', description: '', default: true}
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, false);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when questions dont exist when any is yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [1, 2], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [5], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: true},
      {id: 3, text: '', description: '', default: false}
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, true);

    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
  });

  it('returns the correct tasks when there are no where any is yes', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: true},
      {id: 3, text: '', description: '', default: false}
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, true);

    expect(results.length).toBe(2);
    expect(results[0].id).toBe(1);
    expect(results[1].id).toBe(2);
  });

  it('returns the correct tasks when there are no where any is no', () => {
    const tasks = [
      {id: 1, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []},
      {id: 2, type: '', questionsRequiredYes: [], questionsRequiredNo: [], questionsAnyYes: [], questionsAnyNo: []}
    ];
    const questions = [
      {id: 1, text: '', description: '', default: false},
      {id: 2, text: '', description: '', default: true},
      {id: 3, text: '', description: '', default: false}
    ];
    const results = ChecklistFn.filterTasksByAny(tasks, questions, false);

    expect(results.length).toBe(2);
    expect(results[0].id).toBe(1);
    expect(results[1].id).toBe(2);
  });
});

describe('Finding the owner of the task', () => {
  const roles = [
    {name: 1, value: 'apple'},
    {name: 2, value: 'pear'}
  ];

  it('returns the correct owner based on role', () => {
    const results = ChecklistFn.getOwnerProperty(roles, 'name', 1, 'value');
    expect(results).toBe('apple');
  });

  it('returns empty when there are no owners', () => {
    const results = ChecklistFn.getOwnerProperty(roles, 'name', 3, 'value');
    expect(results).toEqual('');
  });

  it('returns empty when the property does not exist in the role', () => {
    const results = ChecklistFn.getOwnerProperty(roles, 'name', 2, 'role');
    expect(results).toEqual('');
  });
});

describe('Changing the name of a role', () => {

  it('returns the roles array with correct values', () => {
    const role1 = {role: 'Mathematician', name: 'Wendy'};
    const role2 = {role: 'Sales', name: 'Steve'};
    const roles = [role1, role2];
    const results = ChecklistFn.changeRoleValue(roles, role2, 'Kurt');

    expect(results).toEqual([
      {role: 'Mathematician', name: 'Wendy'},
      {role: 'Sales', name: 'Kurt'}
    ]);
  });
});

const todoList = require('../index');
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
    beforeEach(() => {
        // Reset the todo list before each test
        all.length = 0;
    });

    test("Should add new todo", () => {
        const todoItemsCount = all.length;
        add({
            title: "Test todo",
            completed: false,
            dueDate: new Date("2024-01-01").toLocaleDateString("en-CA")
        });
        expect(all.length).toBe(todoItemsCount + 1);
    });

    test("Should mark a todo as complete", () => {
        add({
            title: "Test todo",
            completed: false,
            dueDate: new Date("2024-01-01").toLocaleDateString("en-CA")
        });

        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("Should retrieve overdue items", () => {
        // Add overdue todo
        add({
            title: "Overdue Todo",
            completed: false,
            dueDate: new Date("2023-01-01").toLocaleDateString("en-CA")
        });

        // Add non-overdue todo
        add({
            title: "Not Overdue Todo",
            completed: false,
            dueDate: new Date("2024-01-01").toLocaleDateString("en-CA")
        });

        const overdueItems = overdue();
        expect(overdueItems.length).toBe(1);
        expect(overdueItems[0].title).toBe("Overdue Todo");
    });

    test("Should retrieve items due today", () => {
        // Add a todo item due today
        add({
            title: "Due Today Todo",
            completed: false,
            dueDate: new Date("2024-01-01").toLocaleDateString("en-CA")
        });

        // Add a todo item not due today
        add({
            title: "Not Due Today Todo",
            completed: false,
            dueDate: new Date("2024-01-02").toLocaleDateString("en-CA")
        });

        const dueTodayItems = dueToday();
        expect(dueTodayItems.length).toBe(1);
        expect(dueTodayItems[0].title).toBe("Due Today Todo");
    });

    test("Should retrieve items due later", () => {
        // Add a todo item due later
        add({
            title: "Due Later Todo",
            completed: false,
            dueDate: new Date("2024-01-02").toLocaleDateString("en-CA")
        });

        // Add a todo item due today (to be excluded from dueLater)
        add({
            title: "Due Today Todo",
            completed: false,
            dueDate: new Date("2024-01-01").toLocaleDateString("en-CA")
        });

        const dueLaterItems = dueLater();
        expect(dueLaterItems.length).toBe(1);
        expect(dueLaterItems[0].title).toBe("Due Later Todo");
    });
});
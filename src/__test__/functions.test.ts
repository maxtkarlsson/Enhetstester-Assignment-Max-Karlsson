import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

describe("changeTodo", () => {
  test("should toggle done: false/true", () => {
    //Arrange
    let task = new Todo("Text", false);

    //Act
    changeTodo(task);
    //Assert

    expect(task.done).toBe(!false);
  });
});

describe("removeAllTodos", () => {
  test("Should empty a list", () => {
    //Arrange
    let aList = [new Todo("todo1", false), new Todo("todo2", false)];

    //Act
    removeAllTodos(aList);

    //Assert
    expect(aList.length).toBe(0);
  });
});

describe("addTodo", () => {
  test("Should add an todo to a list", () => {
    //Arrange
    let text: string = "Cykla";
    let todos: Todo[] = [];
    //Act
    addTodo(text, todos);
    //Assert
    expect(todos.length).toBe(1);
  });

  test("Should NOT add an todo to a list", () => {
    //Arrange
    let text: string = "Cy";
    let todos: Todo[] = [];
    //Act
    addTodo(text, todos);
    //Assert
    expect(todos.length).toBe(0);
  });
});

/**
 * @jest-environment jsdom
 */

import { Todo } from "../ts/models/Todo";

import * as functions from "./../ts/main";

describe("clearTodos", () => {
  test("Button for clearTodos", () => {
    //Arrange
    let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();

    document.body.innerHTML = `
  <button type="button" id="clearTodos">Rensa lista</button>
  `;
    functions.init();
    //Act
    document.getElementById("clearTodos")?.click();
    //Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

/* describe("newTodoForm", () => {
  test("should give input from HTML form element", () => {
    //Arrange
    let spy = jest.spyOn(functions, "createNewTodo").mockReturnValue();
    document.body.innerHTML = `
    <form id="newTodoForm">
    </form>
    `;
    functions.init();
    //Act
    document.getElementById("newTodoForm")?.onsubmit;

    //Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
}); */

describe("createNewTodo", () => {
  test("should create html with new todo", () => {
    //Arrange
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let text: string = "test";
    let list: Todo[] = [];

    //Act
    functions.createNewTodo(text, list);
    //Assert
    expect(spy).toBeCalledTimes(1);
  });

  test("should NOT create html with new todo", () => {
    //Arrange
    let spy = jest.spyOn(functions, "displayError").mockReturnValue();
    let text: string = "te";
    let list: Todo[] = [];

    //Act
    functions.createNewTodo(text, list);
    //Assert
    expect(spy).toBeCalledTimes(1);
  });
});

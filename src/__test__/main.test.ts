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

describe("displayError", () => {
  test("should add html to div", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;

    let text: string = "Error";
    let show: boolean = true;

    //Act
    functions.displayError(text, show);

    //Assert
    expect((document.getElementById("error") as HTMLDivElement).innerHTML).toBe(
      "Error"
    );
  });

  test("should add class to classlist", () => {
    //Arrange
    document.body.innerHTML = `<div id="error"></div>`;
    let div = document.getElementById("error") as HTMLDivElement;

    let text: string = "Error";
    let show: boolean = true;

    //Act
    functions.displayError(text, show);

    //Assert
    expect(div.classList.length).toBe(1);
  });

  test("should remove class from classlist", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="show"></div>`;
    let div = document.getElementById("error") as HTMLDivElement;

    let text: string = "Error";
    let show: boolean = false;

    //Act
    functions.displayError(text, show);

    //Assert
    expect(div.classList.length).toBe(0);
  });
});

describe("createNewTodo", () => {
  test("should create new todo", () => {
    //Arrange
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let text: string = "test";
    let list: Todo[] = [];

    //Act
    functions.createNewTodo(text, list);
    //Assert
    expect(spy).toBeCalledTimes(1);
  });

  test("should NOT new todo", () => {
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

describe("newTodoForm", () => {
  test("should give input from HTML form element", () => {
    //Arrange
    let spy = jest.spyOn(functions, "createNewTodo").mockReturnValue();
    document.body.innerHTML = `
    <form id="newTodoForm">
      <input type="text" id="newTodoText" />
      <button>Skapa</button>
    </form>
    `;
    functions.init();
    //Act
    document.querySelector("button")?.click();

    //Assert
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

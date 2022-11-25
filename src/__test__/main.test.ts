/**
 * @jest-environment jsdom
 */

import { Todo } from "../ts/models/Todo";

import * as functions from "./../ts/main";
import * as functions2 from "../ts/functions";

describe("createHTML", () => {
  test("should store list in localstorage", () => {
    //Arrange
    let list: Todo[] = [new Todo("text1", false), new Todo("text2", false)];

    //Act
    functions.createHtml(list);
    //Assert
    console.log(localStorage.length);

    expect(localStorage.length).toBeGreaterThan(1);
  });

  test("should empty innerHTML", () => {
    //Arrange
    let list: Todo[] = [new Todo("text1", false), new Todo("text2", false)];

    document.body.innerHTML = `<ul id="todos" class="todo">Test</ul>`;

    let ul: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;

    //Act
    functions.createHtml(list);

    //Assert
    expect(ul.innerHTML).toBe("");
  });
  /*
  test("should create HTML element", () => {
    //Arrange
    let list: Todo[] = [new Todo("text1", false), new Todo("text2", false)];
    document.body.innerHTML = `<ul id="todos" class="todo">Test</ul>`;
    let ul: HTMLUListElement = document.getElementById("todos");

    //Act
    functions.createHtml(list);
    //Assert
    expect;
  });
  */
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

describe("toggleTodo", () => {
  test("should call function changeTodo", () => {
    //Arrange
    let spy = jest.spyOn(functions2, "changeTodo").mockReturnValue();
    let todo = new Todo("text", false);

    //Act
    functions.toggleTodo(todo);

    //Assert
    expect(spy).toHaveBeenCalled();
  });

  test("should call function createHTML", () => {
    //Arrange
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let todo = new Todo("text", false);

    //Act
    functions.toggleTodo(todo);

    //Assert
    expect(spy).toHaveBeenCalled();
  });
});

describe("clearTodos", () => {
  test("should call function removeAllTodos", () => {
    //Arrange
    let spy = jest.spyOn(functions2, "removeAllTodos").mockReturnValue();
    let todos: Todo[] = [new Todo("text", false), new Todo("text2", true)];

    //Act
    functions.clearTodos(todos);
    //Assert
    expect(spy).toHaveBeenCalled();
  });

  test("should call function createHTML", () => {
    //Arrange
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let todos: Todo[] = [new Todo("text", false), new Todo("text2", true)];

    //Act
    functions.clearTodos(todos);
    //Assert
    expect(spy).toHaveBeenCalled();
  });

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

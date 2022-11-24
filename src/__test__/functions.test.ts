/**
 * @jest-environment jsdom
 */

import { changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

//Test of function changeTodo
test("should toggle done false/true", () => {
  //Arrange
  let task = new Todo("Text", false);

  //Act
  changeTodo(task);
  //Assert

  expect(task.done).toBe(!false);
});

//Test of function removeAllTodos
test("Should empty a list", () => {
  //Arrange
  let aList = [new Todo("todo1", false), new Todo("todo2", false)];

  //Act
  removeAllTodos(aList);

  //Assert
  expect(aList.length).toBe(0);
});

describe("addTodo", () => {
  test("Should add an todo to a list", () => {
    //Arrange
    //Act
    //Assert
  });

  test("Should NOT add an todo to a list", () => {
    //Arrange
    //Act
    //Assert
  });
});

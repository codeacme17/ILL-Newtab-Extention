import React, { Component } from "react";
import { nanoid } from "nanoid";

import ArrowupIcon from "../../../icons/arrowup";
import DeleteIcon from "../../../icons/delete";
import "./index.scss";

export default class Todo extends Component {
  getLocalData = () => {
    this.localData = JSON.parse(localStorage.getItem("_setting_data"));
  };

  setLocalData = () => {
    localStorage.setItem("_setting_data", JSON.stringify(this.localData));
  };

  state = {
    detailVisible: false,
    todoList: [],
  };

  componentDidMount = () => {
    this.getLocalData();
    this.setState({ detailVisible: this.localData.todo.open, todoList: this.localData.todo.list });
  };

  // Add todo task
  addTodo = (e) => {
    if (e.keyCode !== 13) return;
    if (!e.target.value.trim()) return;
    let isSameTodo = this.state.todoList.every((item) => {
      return item.content !== e.target.value;
    });
    if (!isSameTodo) return;

    this.getLocalData();

    const newTodoItem = { id: nanoid(), content: "", level: "" };
    const resValue = this.getTodoLevel(e.target.value);
    if (!resValue.value.trim()) return;
    newTodoItem.content = resValue.value;
    newTodoItem.level = resValue.level;

    this.state.todoList.push(newTodoItem);
    e.target.value = "";
    this.setState({ todoList: this.state.todoList });
    this.localData.todo.list = this.state.todoList;
    this.setLocalData();
  };

  // Get the level from user input
  getTodoLevel = (value) => {
    const levels = ["1", "2", "3"];
    const array = value.split("#");
    const level = array[array.length - 1];
    if (levels.indexOf(level.trim()) !== -1) {
      if (array.length === 2) return { value: array[0], level: level.trim() };
      if (array.length > 2)
        return { value: array.slice(0, array.length - 1).join("#"), level: level.trim() };
    }
    return { value, level: "1" };
  };

  // Cancel todo task
  cancelTodo = (index) => {
    this.getLocalData();
    this.state.todoList.splice(index, 1);
    this.setState({ todoList: this.state.todoList });
    this.localData.todo.list = this.state.todoList;
    this.setLocalData();
  };

  // Switch detail content visible handler
  switchDetailVisible = () => {
    this.getLocalData();
    this.localData.todo.open = !this.state.detailVisible;
    this.setState({ detailVisible: !this.state.detailVisible });
    this.setLocalData();
  };

  render() {
    const { detailVisible, todoList } = this.state;

    return (
      <section className="silder-item">
        <div className="header drag-handle">
          TODO
          <button
            className={`draw-btn ${detailVisible ? "rotate-0" : "rotate-180"}`}
            onClick={this.switchDetailVisible}
          >
            <ArrowupIcon />
          </button>
        </div>

        {/* Todo list */}
        <div className="content">
          <div className="p-3 pb-3 divide-y divide-dashed">
            {!todoList.length ? (
              <div className="text-main-600 dark:text-main-400">
                <p className="mb-1 text-sm">You can add some todos in here</p>
                <span className="text-xs italic">
                  📎 you can add # with number 1-3 in the end , to set level of the signal todo item
                  (default " 1 ")
                </span>
              </div>
            ) : (
              todoList.map((item, index) => {
                return (
                  /* Sigle tode item */
                  <div
                    className="todo_item flex justify-between py-2.5 pr-1 pl-1 border-main-400"
                    key={item.id}
                  >
                    <div className="font-semibold text-sm flex flex-1 pr-1 items-center justify-between">
                      <div
                        className={`w-1.5 h-[60%] rounded-xl pr-2 
                        ${item.level === "1" ? "bg-gray-400 dark:bg-gray-600" : ""} 
                        ${item.level === "2" ? "bg-sky-400 dark:bg-sky-600" : ""}
                        ${item.level === "3" ? "bg-rose-400 dark:bg-rose-600" : ""}
                        `}
                      />
                      <div className="flex-1 pl-2 break-words w-[272px]">{item.content}</div>
                    </div>

                    {detailVisible ? (
                      <button className="cancel_btn" onClick={() => this.cancelTodo(index)}>
                        <DeleteIcon />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Input text to add todo */}
          <div
            className={`ease-in-out duration-300 ${detailVisible ? "p-3 -mt-3 h-16" : "h-0 p-0"}`}
          >
            <input
              type="text"
              className="shadow-inner outline-none border-[1px] rounded-md px-3 py-1.5 text-sm dark:bg-main-600 dark:border-main-500 w-full placeholder:italic"
              onKeyUp={(e) => this.addTodo(e)}
              disabled={todoList.length >= 5}
              placeholder={"e.g : todo #1"}
            />
          </div>
        </div>
      </section>
    );
  }
}

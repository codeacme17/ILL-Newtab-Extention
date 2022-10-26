import React, { Component } from "react";
import { nanoid } from "nanoid";
import ArrowupIcon from "../../../icons/arrowup";

export default class Todo extends Component {
  state = {
    detailVisible: false,
    todoList: [],
  };

  componentDidMount = () => {
    // If there is none todo item in list,
    // Show the input bar to user
    if (!this.state.todoList.length) this.setState({ detailVisible: true });
  };

  // Switch detail content visible handler
  switchDetailVisible = () => {
    if (this.state.detailVisible) this.setState({ detailVisible: false });
    else this.setState({ detailVisible: true });
  };

  // Modify state of single todo item
  modifyTodoState = (id) => {
    const newList = this.state.todoList.map((item) => {
      if (item.id === id) {
        if (item.state) return { ...item, state: false };
        else return { ...item, state: true };
      } else return item;
    });
    this.setState({ todoList: newList });
  };

  // Add todo task
  addTodo = (e) => {
    if (e.keyCode !== 13) return;
    if (!e.target.value.trim()) return;
    const newTodoItem = {
      id: nanoid(),
      title: e.target.value,
      state: false,
    };
    this.state.todoList.push(newTodoItem);
    e.target.value = "";
    this.setState({ todoList: this.state.todoList });
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
              <div className="mb-2 text-sm italic text-main-600 dark:text-main-400">
                You can add some todos in here
              </div>
            ) : (
              todoList.map((item) => {
                return (
                  <label
                    className="flex justify-between cursor-pointer py-2 px-3 border-main-400"
                    key={item.id}
                  >
                    <div className="font-semibold text-sm">{item.title}</div>
                    {detailVisible ? (
                      <input
                        type="checkbox"
                        checked={item.state}
                        name="todoCheck"
                        id=""
                        onChange={() => this.modifyTodoState(item.id)}
                        className="w-3.5 cursor-pointer"
                      />
                    ) : (
                      ""
                    )}
                  </label>
                );
              })
            )}
          </div>

          {/* Input to add todo */}
          <div
            className={`ease-in-out duration-300 ${detailVisible ? "p-3 -mt-5 h-16" : "h-0 p-0"}`}
          >
            <input
              type="text"
              className="shadow-inner outline-none border-[1px] rounded-md px-3 py-1.5 text-sm dark:bg-main-600 dark:border-main-500 w-full"
              onKeyUp={(e) => this.addTodo(e)}
              disabled={todoList.length > 4}
            />
          </div>
        </div>
      </section>
    );
  }
}

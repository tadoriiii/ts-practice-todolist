import React from "react";
import "./style.scss";

import { useTodoInput } from "./Input";

export const ToDoList = () => {
  const {
    input,
    list,
    updateInput,
    edit,
    onChangeInput,
    onCreateItem,
    onDeleteItem,
    onOpenUpdate,
    onUpdate,
    onChangeUpdateInput,
  } = useTodoInput();

  return (
    <div className="pageJSX">
      <div className="listWrapper">
        <div className="header">To Do List</div>
        <div className="inputBox">
          <input
            className="input"
            placeholder="What To Do?"
            name="todo"
            value={input}
            onChange={onChangeInput}
          />
          <button className="inputButton" onClick={onCreateItem}>
            등록
          </button>
        </div>
        <div className="listBox">
          {list.map((item) => (
            <div className="list" key={item.key}>
              {edit === item.key ? (
                <input
                  className="updateInput"
                  name="todo"
                  value={updateInput}
                  onChange={onChangeUpdateInput}
                />
              ) : (
                <div className="listItem" onClick={() => onOpenUpdate(item)}>
                  {item.todo}
                </div>
              )}
              {edit === item.key ? (
                <button className="button" onClick={() => onUpdate(item.key)}>
                  수정
                </button>
              ) : (
                <button
                  className="button"
                  onClick={() => onDeleteItem(item.key)}
                >
                  삭제
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

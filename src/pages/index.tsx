import React from "react";
import "./style.scss";

import { Input } from "./Input";

export const ToDoList = () => {
  const {
    input,
    onChange,
    onClick,
    list,
    onRemove,
    onOpenUpdate,
    edit,
    updateInput,
    onChangeUpdate,
    onCloseUpdate,
  } = Input();

  return (
    <div className="pageJSX">
      <div className="listWrapper">
        <div className="header">To Do List</div>
        <div className="inputBox">
          <input
            className="input"
            placeholder="What To Do?"
            name="todo"
            value={input.todo}
            onChange={onChange}
          />
          <button className="inputButton" onClick={onClick}>
            등록
          </button>
        </div>
        <div className="listBox">
          {list.map((item) =>
            item.id === -1 ? (
              <div className="empty" />
            ) : (
              <div className="list" key={item.id}>
                {edit.id === item.id ? (
                  <input
                    className="updateInput"
                    name="todo"
                    value={updateInput.todo}
                    onChange={onChangeUpdate}
                  />
                ) : (
                  <div className="listItem" onClick={onOpenUpdate(item)}>
                    {item.todo}
                  </div>
                )}
                {edit.id === item.id ? (
                  <button className="button" onClick={onCloseUpdate(item.id)}>
                    수정
                  </button>
                ) : (
                  <button className="button" onClick={onRemove(item.id)}>
                    삭제
                  </button>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

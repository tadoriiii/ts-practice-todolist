import React, { useCallback, useState } from "react";

export type TItem = {
  key: number;
  todo: string;
};

type TUseTodoInput = {
  input: string;
  list: TItem[];
  updateInput: string;
  edit: number;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUpdateInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateItem: () => void;
  onDeleteItem: (key: number) => void;
  onOpenUpdate: (list: TItem) => void;
  onUpdate: (key: number) => void;
};

export const useTodoInput = (): TUseTodoInput => {
  const [key, setKey] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [updateInput, setUpdateInput] = useState<string>("");
  const [list, setList] = useState<TItem[]>([]);
  const [edit, setEdit] = useState<number>(-1);

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setInput(value);
    },
    []
  );

  const onCreateItem = useCallback((): void => {
    const item = { key, todo: input };

    setList((list) => [...list, item]);

    setKey((key) => (key += 1));
    setInput("");
  }, [key, input]);

  const onDeleteItem = useCallback(
    (key: number) => {
      const sortedList = list.filter((item) => item.key !== key);
      setList(sortedList);
    },
    [list]
  );

  const onChangeUpdateInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setUpdateInput(value);
    },
    []
  );

  const onOpenUpdate = useCallback((list: TItem) => {
    setEdit(list.key);
    setUpdateInput(list.todo);
  }, []);

  const onUpdate = useCallback(
    (key: number) => {
      const updatedList: TItem[] = list.map((item) => {
        if (item.key === key) return { key, todo: updateInput };
        else return item;
      });

      setList(updatedList);

      setUpdateInput("");
      setEdit(-1);
    },
    [list, updateInput]
  );

  return {
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
  };
};

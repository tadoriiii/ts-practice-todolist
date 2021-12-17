import React, { useCallback, useState } from "react";

export type TInput = {
  todo: string;
};

export type TList = TInput & { id: number };

export const Input = () => {
  const [input, setInput] = useState<TInput>({ todo: "" });
  const [list, setList] = useState<TList[]>([{ todo: "", id: -1 }]);
  // const [edit, setEdit] = useState<TList[]>([]);
  // const [edit, setEdit] = useState<boolean>(false);
  const [edit, setEdit] = useState<TList>({ todo: "", id: -1 });
  const [updateInput, setUpdateInput] = useState<TInput>({ todo: "" });

  // console.log("input", input);
  console.log("list", list);
  console.log("updateInput", updateInput);
  console.log("edit", edit);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInput({ ...input, [name]: value });
    },
    [setInput, input]
  );

  const onClick = useCallback(() => {
    const id = list.length === 0 ? 0 : list[list.length - 1].id + 1;
    setList((list) => [...list, { ...input, id }]);
    setInput({ todo: "" });
  }, [input, list]);

  const onRemove = useCallback(
    (id: number) => {
      return () => {
        setList(list.filter((list) => list.id !== id));
      };
    },
    [list]
  );

  const onOpenUpdate = useCallback(
    (item: TList) => {
      return () => {
        // console.log("updateInputId", item);
        setEdit({ ...edit, todo: item.todo, id: item.id });
        setUpdateInput({ todo: item.todo });
      };
    },
    [edit]
  );

  const onChangeUpdate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUpdateInput({ ...updateInput, [name]: value });
    },
    [updateInput]
  );

  const onCloseUpdate = useCallback(
    (id: number) => {
      return () => {
        setList(
          list.map((item) =>
            item.id === id ? { ...item, ...updateInput } : item
          )
        );
        setEdit({ todo: "", id: -1 });
      };
    },
    [list, updateInput]
  );

  return {
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
  };
};

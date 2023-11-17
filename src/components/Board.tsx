import { useState, ChangeEvent, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { BsThreeDots, BsPlus } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { getBoards, setBoards } from "../modules/BoardsSlice";
import { CardType, BoardType } from "../utils/types";
import Button from "./Button";
import Card from "./Card";

export type BoardPropsType = {
  id: string;
  title: string;
  cards: Array<CardType> | []
  onDelete: (boardId: string) => void;
}

const Board = (props: BoardPropsType) => {
  const { id, title, cards, onDelete } = props;

  const dispatch = useDispatch();
  const boards = useSelector(getBoards);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [openTitleField, setOpenTitleField] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>("");

  const onChangeCardTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCardTitle(e.target.value);
  };

  const onTitleField = () => {
    setOpenTitleField(true);
    textareaRef && textareaRef.current?.focus();
  };

  const onCancel = () => {
    setOpenTitleField(false);
    setCardTitle("");
  };

  const onSaveCardTitle = () => {
    setOpenTitleField(false);
    setCardTitle("");

    const newCard = {
      id: uuidv4(),
      title: cardTitle,
      description: ""
    };

    const newBoards = boards.map((board: BoardType) =>
      board.id === id
        ? { ...board, cards: [...board.cards, newCard] }
        : board
    );

    dispatch(setBoards({ boards: newBoards }));
  };

  return (
    <div className="flex h-fit w-[272px] shrink-0 flex-col rounded-sm bg-gray-100 px-2 pb-2">
      <div className="relative py-2.5">
        <div className="pl-2 pr-10 text-sm font-semibold leading-6 text-gray-600">{title}</div>
        <button onClick={() => onDelete(id)} className="absolute right-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-sm bg-transparent hover:bg-darkblue-200 hover:bg-opacity-[0.13]">
          <BsThreeDots className="text-gray-500" />
        </button>
      </div>
      <div>
        {cards?.map((card, index) => (
          <Card key={index} {...card} boardId={id} boardTitle={title} />
        ))}
      </div>
      <div className={`overflow-clip ${openTitleField ? "h-fit" : "h-0 w-0"}`}>
        <textarea
          ref={textareaRef}
          value={cardTitle}
          placeholder="Saisissez un titre pour cette carte..."
          rows={3}
          onChange={onChangeCardTitle}
          className="w-full rounded-sm p-2 text-sm text-black shadow-default outline-none"
        />
        <div className="flex items-center gap-2">
          <Button onClick={onSaveCardTitle} label="Ajouter une carte" />
          <AiOutlineClose onClick={onCancel} className="h-6 w-6 cursor-pointer text-gray-400 duration-75 hover:text-gray-600" />
        </div>
      </div>
      <button onClick={onTitleField} className={`${openTitleField ? "h-0" : "h-fit px-3 py-1.5"} flex items-center gap-1 overflow-clip rounded-sm bg-transparent hover:bg-darkblue-200 hover:bg-opacity-[0.08]`}>
        <BsPlus className="h-5 w-5 text-gray-600" />
        <div className="text-sm text-gray-500">Ajouter une carte</div>
      </button>
    </div>
  );
};

export default Board;
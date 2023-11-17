import "./App.css";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { setBoards, getBoards } from "./modules/BoardsSlice";
import { BoardType } from "./utils/types";
import { initialBoards } from "./utils/initialboards";
import Layout from "./layouts/Layout";
import Button from "./components/Button";
import Board from "./components/Board";

export type CardType = {
  id: number;
  title: string;
  viewed: boolean;
  description?: string;
  onClick?: () => void;
};

function App() {
  const dispatch = useDispatch();
  const boards = useSelector(getBoards);

  const inputRef = useRef<HTMLInputElement>(null);
  const [openEditor, setOpenEditor] = useState(false);
  const [title, setTitle] = useState<string>("");

  const onOpenEditor = () => {
    setOpenEditor(true);
    inputRef && inputRef.current?.focus();
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onCancelCreate = () => {
    setTitle("");
    setOpenEditor(false);
  };

  const onSaveTitle = () => {
    if (title) {
      setTitle("");
      setOpenEditor(false);
      const newBoard = {
        id: uuidv4(),
        title,
        cards: []
      };
      dispatch(setBoards({ boards: [...boards, newBoard] }));
    }
  };

  const onDeleteBoard = (id: string) => {
    const selectedBoard = boards.find((item: BoardType) => item.id === id);
    if (selectedBoard) {
      const isConfirmed = window.confirm(
        `Vous allez supprimer la liste nommée ${selectedBoard.title}.
  Appuyez sur "OK" pour continuer.
  Ou cliquez sur "Annuler" pour fermer.`);
      if (isConfirmed) {
        const newBoards = boards.filter((item: BoardType) => item.id !== id);
        dispatch(setBoards({ boards: newBoards }));
      }
    }
  };



  const onInit = () => {
    dispatch(setBoards({ boards: initialBoards }));
  };
  
  useEffect(() => {
    onInit();
  }, []);

  return (
    <Layout>
      <div className="flex items-center gap-5 p-2">
        <div className="pl-3 text-lg font-bold leading-8 text-white">Tableau principal</div>
        <Button onClick={onInit} label="Initialiser le jeu de données" />
      </div>
      <div className="flex grow gap-2 px-2">
        {boards.map((board: BoardType, index: number) => (
          <Board id={board.id} title={board.title} cards={board.cards} key={index} onDelete={onDeleteBoard} />
        ))}
        <div className={`${openEditor ? "bg-gray-100" : "bg-white bg-opacity-[0.24] hover:bg-opacity-[0.32]"} mr-2 h-fit w-[272px] shrink-0 items-center gap-2  rounded-sm p-1 text-white`}>
          <div onClick={onOpenEditor} className={`flex cursor-pointer items-center gap-2 overflow-clip ${openEditor ? "h-0 w-0" : "h-fit px-2 py-1.5"}`}>
            <BsPlus className="h-5 w-5" />
            <div className="text-sm">Ajouter une autre liste</div>
          </div>
          <div className={`overflow-clip ${openEditor ? "h-fit w-full" : "h-0 w-0"}`}>
            <input
              className="w-full resize-none rounded-sm px-3 py-2 text-sm text-black shadow-inner outline-none"
              ref={inputRef}
              tabIndex={-1}
              value={title}
              placeholder="Saisissez le titre de la liste..."
              onChange={onChangeTitle}
            />
            <div className="mt-1 flex items-center gap-2">
              <Button onClick={onSaveTitle} label="Ajouter une liste" />
              <AiOutlineClose onClick={onCancelCreate} className="h-6 w-6 cursor-pointer text-gray-400 duration-75 hover:text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;

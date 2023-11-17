import "react-responsive-modal/styles.css";
import { ChangeEvent, useState } from "react";
import { Modal } from "react-responsive-modal";
import { useDispatch, useSelector } from "react-redux";
import { BsJustifyLeft, BsEye, BsDash } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { BoardType } from "../utils/types";
import { getBoards, setBoards } from "../modules/BoardsSlice";
import Button from "./Button";

type CardPropsType = {
  id: string;
  title: string;
  followed: boolean;
  description?: string;
  boardId: string;
  boardTitle: string;
};

const Card = (props: CardPropsType) => {
  const { id, title, boardId, boardTitle, followed, description } = props;

  const boards = useSelector(getBoards);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditor, setOpenEditor] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string | undefined>();


  const updateCardDescription = (boardId: string, cardId: string, newDescription?: string) => {
    const newBoards = boards.map((board: BoardType) => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: board.cards.map((card) =>
            card.id === cardId ? { ...card, description: newDescription } : card
          ),
        };
      } else {
        return board;
      }
    });

    dispatch(setBoards({ boards: newBoards }));
  };

  const removeCard = (boardId: string, cardId: string) => {
    const newBoards = boards.map((board: BoardType) => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: board.cards.filter((card) => card.id !== cardId),
        };
      } else {
        return board;
      }
    });

    dispatch(setBoards({ boards: newBoards }));
  };

  const updateView = (boardId: string, cardId: string, followed: boolean) => {
    const newBoards = boards.map((board: BoardType) => {
      if (board.id === boardId) {
        return {
          ...board,
          cards: board.cards.map((card) =>
            card.id === cardId ? { ...card, followed: !followed } : card
          ),
        };
      } else {
        return board;
      }
    });

    dispatch(setBoards({ boards: newBoards }));
  };

  const onClick = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenEditor(false);
    setOpenModal(false);
  };

  const onOpenEditor = () => {
    setNewDescription(description);
    setOpenEditor(true);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
  };

  const onSaveDescription = () => {
    updateCardDescription(boardId, id, newDescription);
    setOpenEditor(false);
  };

  const onUpdateView = () => {
    updateView(boardId, id, followed);
  };

  const onCancel = () => {
    setOpenEditor(false);
  };

  const onDeleteCard = () => {
    const isConfirmed = window.confirm(
      `Vous allez supprimer la carte nommée ${title}.
Appuyez sur "OK" pour continuer.
Ou cliquez sur "Annuler" pour fermer.`
    );
    if (isConfirmed) {
      removeCard(boardId, id);
    }
  };

  return (
    <>
      <div onClick={onClick} className="mb-2 cursor-pointer rounded-sm bg-white p-2 shadow-default hover:bg-gray-200">
        <div className="truncate text-sm text-gray-600">{title}</div>
        {(followed || description) && <div className="flex items-center gap-2 px-1 pt-2 text-gray-400">
          {followed && <BsEye className="h-4 w-4" />}
          {description && <BsJustifyLeft />}
        </div>}
      </div>
      <Modal open={openModal} onClose={onCloseModal}>
        <div className="text-xl font-semibold">{title}</div>
        <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
          <div>Dans la liste</div>
          <span className="underline">{boardTitle}</span>
          {followed && <BsEye className="text-gray-400" />}
        </div>
        <div className="my-5 block items-start gap-5 md:flex">
          <div className="grow">
            <div className="w-full">
              <div className="mb-1 text-lg font-semibold text-gray-600">Description</div>
              <textarea
                tabIndex={-1}
                onClick={onOpenEditor}
                value={newDescription}
                rows={2}
                placeholder="Ajouter une description plus détaillée…"
                onChange={onChangeDescription}
                className={`w-full p-2 outline-none ${openEditor ? "rounded-sm p-3 text-sm outline-none focus:resize-y focus:shadow-inner" : "min-h-[50px] cursor-pointer resize-none rounded-sm bg-darkblue-200 bg-opacity-[0.04] text-sm text-gray-600 hover:bg-opacity-[0.08] hover:text-black"}`}
              />
              {openEditor && <div className="mt-2 flex items-center gap-2">
                <Button onClick={onSaveDescription} label="Enregistrer" />
                <AiOutlineClose onClick={onCancel} className="h-6 w-6 cursor-pointer text-gray-400 duration-75 hover:text-gray-600" />
              </div>}
            </div>
          </div>
          <div className="w-[190px]">
            <div className="mb-1 text-lg font-semibold text-gray-600">Actions</div>
            <div onClick={onUpdateView} className="relative mb-2 flex cursor-pointer items-center gap-2 rounded-sm bg-darkblue-200 bg-opacity-[0.04] p-2 text-gray-600 hover:bg-opacity-[0.08] hover:text-black">
              <BsEye className="text-gray-400" />
              <div className="text-sm">Suivre</div>
              {followed && <div className="absolute inset-y-0 right-1 my-auto h-fit">
                <div className="checkbox relative" />
              </div>}
            </div>
            <div onClick={onDeleteCard} className="mb-2 flex cursor-pointer items-center gap-2 rounded-sm bg-darkblue-200 bg-opacity-[0.04] p-2 text-gray-600 hover:bg-opacity-[0.08] hover:text-black">
              <BsDash className="text-gray-400" />
              <div className="text-sm">Supprimer</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Card;
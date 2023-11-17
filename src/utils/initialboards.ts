import { BoardType } from "./types";
export const initialBoards: BoardType[] = [
    {
        id: 'board-1',
        title: 'Tableau principal',
        cards: [
            {
                id: 'card-1',
                title: 'My first card',
                followed: false,
                boardTitle: 'My first list',
            },
            {
                id: 'card-2',
                title: 'My second card',
                followed: false,
                boardTitle: 'My first list',
            },
            {
                id: 'card-3',
                title: 'Followed card',
                followed: true,
                boardTitle: 'My first list',
            },
        ]
    },
    {
        id: 'board-2',
        title: 'My second list',
        cards: [
            {
                id: 'card-4',
                title: 'Followed card with description',
                followed: true,
                boardTitle: 'My second list',
                description: 'Description for followed card with description'
            }
        ]
    }
];
export type CardType = {
    id: string;
    title: string;
    followed: boolean;
    boardTitle: string;
    description?: string;
};

export type BoardType = {
    id: string;
    title: string;
    cards: Array<CardType> | []
}
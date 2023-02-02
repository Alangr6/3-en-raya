export const resetStorage = () => {
  localStorage.removeItem("board");
    localStorage.removeItem("turn");
}

export const saveGameStorage = ({ board, turn }) => {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

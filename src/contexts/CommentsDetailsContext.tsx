import { createContext } from 'react';

export const CommentsContext = createContext<{
  closeCommentsView: () => void;
  showCommentsView: (post_id: number) => void;
  isSheetVisible: boolean;
}>({
  closeCommentsView: () => {},
  showCommentsView: (post_id: number) => {},
  isSheetVisible: false
});

import TrashIcon from "@assets/TrashIcon";
import type { IComment } from "@/interfaces";
import "./style.css";
import Button from "@components/Button";
import { CommentStyled } from "./index.styled";

interface ICommentProps {
  comment: IComment;
  number: number;
  onDelete: () => void;
}

export default function Comment({ comment, number, onDelete }: ICommentProps) {
  return (
    <>
      <CommentStyled $number={number}>
        <span>{comment.text}</span>
        <Button Icon={TrashIcon} onButtonClick={onDelete} type="button" />
      </CommentStyled>
    </>
  );
}

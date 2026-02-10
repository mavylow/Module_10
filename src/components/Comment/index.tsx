import TrashIcon from "@assets/TrashIcon";
import type { IComment } from "@/interfaces";
import "./style.css";
import Button from "../Button";

interface ICommentProps {
  comment: IComment;
  number: number;
  onDelete: () => void;
}

export default function Comment({ comment, number, onDelete }: ICommentProps) {
  return (
    <>
      <li data-number={`#${number}.`} className="comment">
        <span>{comment.text}</span>
        <Button Icon={TrashIcon} onButtonClick={onDelete} type="button" />
      </li>
    </>
  );
}

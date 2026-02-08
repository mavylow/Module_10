import TrashIcon from "@assets/TrashIcon";
import type { IComment } from "@/interfaces";
import "./style.css";

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
        <button className="delete" onClick={onDelete}>
          <TrashIcon />
        </button>
      </li>
    </>
  );
}

import type { IComment } from "./Post";

export default function Comment({
  comment,
  number,
}: {
  comment: IComment;
  number: number;
}) {
  return (
    <>
      <li data-number={`#${number}.`}>{comment.description}</li>
    </>
  );
}

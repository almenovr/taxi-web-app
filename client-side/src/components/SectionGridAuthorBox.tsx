import React, { FC } from "react";

export interface SectionGridAuthorBoxProps {
  className?: string;
  blockText: string;
  blockTitle: string;
  heading?: string;
}


const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  blockText = "",
  blockTitle = "",
  heading = "h1",
}) => {
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      {heading === "h1" ? <h1 className="font-semibold text-4xl mt-5">{blockTitle}</h1> : null}
      {heading === "h2" ? <h2 className="font-semibold text-4xl mt-5">{blockTitle}</h2> : null}
      {heading === "h3" ? <h3 className="font-semibold text-4xl mt-5">{blockTitle}</h3> : null}
      {heading === "h4" ? <h4 className="font-semibold text-4xl mt-5">{blockTitle}</h4> : null}

      <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              {blockText}
        </span>
    </div>
  );
};

export default SectionGridAuthorBox;

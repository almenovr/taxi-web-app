import React, { FC } from "react";

export interface SectionGridAuthorBoxProps {
  className?: string;
  blockText: string;
  blockTitle: string;
}


const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  blockText = "",
  blockTitle = "",
}) => {
  return (
    <div
      className={`nc-SectionGridAuthorBox relative ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <h2 className="font-semibold text-4xl mt-5">{blockTitle}</h2>
      <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              {blockText}
        </span>
    </div>
  );
};

export default SectionGridAuthorBox;

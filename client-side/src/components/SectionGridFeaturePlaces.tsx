import React, { FC } from "react";


export interface SectionGridFeaturePlacesProps {
  blockTitle: string;
  blockText: string;
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
    blockTitle = "",
    blockText = "",
}) => {

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <h2 className="font-semibold text-4xl mt-5">{blockTitle}</h2>
      <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              {blockText}
        </span>


    </div>
  );
};

export default SectionGridFeaturePlaces;

import React, { FC } from "react";
import Link from "next/link";

export interface PropertyCardHProps {
  className?: string;
  imgSrc: string,
  title: string,
  price: number,
  cityOrigin: string,
  cityWhen: string,
  classAuto: string
}

const PropertyCardH: FC<PropertyCardHProps> = ({
   className = "",
   imgSrc = "",
   title = "",
   cityOrigin = "",
   cityWhen = "",
   price = 0,
   classAuto = "",
}) => {

  const renderSliderGallery = () => {
    return (
        <div className="flex-shrink-0 p-3 w-full sm:w-64 ">
            {imgSrc && <img src={imgSrc} width={500} height={500} alt="" />}
        </div>
    );
  };


  const renderContent = () => {
    return (
        <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
          <div className="space-y-4 w-full">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-medium capitalize">
                <span className="line-clamp-2">{title}</span>
              </h2>
            </div>
            <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
            <div className="flex w-full justify-between items-end">
            <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500">
                <Link href={`/checkout?cityOrigin=${cityOrigin}&cityWhen=${cityWhen}&price=${price}&classAuto=${classAuto}&imgSrc=${imgSrc}`}>от {`${price} руб`}</Link>
            </span>
            </div>
          </div>
        </div>
    );
  };

  return (
      <div
          className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
      >
          <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
              {renderSliderGallery()}
              {renderContent()}
          </div>
      </div>
  );
};

export default PropertyCardH;

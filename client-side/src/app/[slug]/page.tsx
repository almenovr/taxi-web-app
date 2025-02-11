"use client";

import React, {FC, useEffect, useState} from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PropertyCardH from "@/components/PropertyCardH";

export interface ListingCarDetailPageProps {
    params: {
        slug: string;
    }
}

async function getData(slug: string) {
    const response = await fetch(`http://localhost:1337/api/destinations?filters[slug][$eq]=${slug}` + "&populate=*");
    return await response.json();
}

type Props = {
    params: {
        slug: string;
    }
}


const ListingCarDetailPage: FC<ListingCarDetailPageProps> = ({params}   ) => {
  const [response, setData] = useState<{ data: any } | null>(null);
  useEffect(() => {
      const fetchData = async () => {
          const data = await getData(params.slug);
          setData(data);
      };
      fetchData();
    }, []);
  const data = (response as { data: any })?.data[0];



  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {data?.title}
        </h2>
        <div className="flex items-center space-x-4">
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">{data?.cityWhen}</span>
          </span>
        </div>
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

      </div>
    );
  };

  //

  const renderSection2 = (
      classAuto: string,
      imgSrc: string,
      title: string,
      price: number,
      text: string,
      cityOrigin: string,
      cityWhen: string
  ) => {
    if (classAuto) {
      return (
        <div className="listingSection__wrap">
            <h2 className="text-2xl font-semibold">{classAuto}</h2>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <PropertyCardH imgSrc={"http://localhost:1337" + imgSrc}
                           title={title}
                           price={price}
                           cityOrigin={cityOrigin}
                           cityWhen={cityWhen}
                           classAuto={classAuto}
            />
            <div className="text-neutral-6000 dark:text-neutral-300">

                <p>
                    {text}
                </p>
            </div>
        </div>
     );
    }
  };


  const renderSection8 = (title: string, text: string) => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* CONTENT */}
        <div>
          <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
            {text}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

      </div>
    );
  };

  const renderSidebarPrice = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            {`от ${data?.economPrice} руб.`}
          </span>
        </div>


        {/* SUBMIT */}
        <ButtonPrimary href={`/checkout?cityOrigin=${data?.cityOrigin}&cityWhen=${data?.cityWhen}`}>Перейти к оформлению заказа</ButtonPrimary>
      </div>
    );
  };

  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap lg:shadow-xl">
        <span className="text-2xl font-semibold block">
          Направление
        </span>
        <div className="mt-8 flex">
          <div className="flex-shrink-0 flex flex-col items-center py-2">
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
            <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          </div>
          <div className="ml-4 space-y-14 text-sm">
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Стартовая точка
              </span>
              <span className=" font-semibold">
                {data?.cityOrigin}
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Конечная точка
              </span>
              <span className=" font-semibold">
                {data?.cityWhen}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (

    <div className={` nc-ListingCarDetailPage `}>
      {/* SINGLE HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-4 gap-1 sm:gap-2">
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>

          {/*  */}

        </div>
      </header>

      {/* MAIn */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
          {renderSection1()}
          <div className="block lg:hidden">{renderSidebarDetail()}</div>
            {renderSection2(
                data?.economTitle,
                data?.economPhoto?.url,
                data?.economCars,
                data?.economPrice,
                data?.economDescription,
                data?.cityOrigin,
                data?.cityWhen,
            )}
            {renderSection2(
                data?.standartTitle,
                data?.standartPhoto?.url,
                data?.standartCars,
                data?.standartPrice,
                data?.standartDescription,
                data?.cityOrigin,
                data?.cityWhen,
            )}
            {renderSection2(
                data?.comfortTitle,
                data?.comfortPhoto?.url,
                data?.comfortCars,
                data?.comfortPrice,
                data?.comfortDescription,
                data?.cityOrigin,
                data?.cityWhen,
            )}
            {renderSection2(
                data?.businessTitle,
                data?.businessPhoto?.url,
                data?.businessCars,
                data?.businessPrice,
                data?.businessDescription,
                data?.cityOrigin,
                data?.cityWhen,
            )}
            {renderSection2(
                data?.minivenTitle,
                data?.minivenPhoto?.url,
                data?.minivenCars,
                data?.minivenPrice,
                data?.minivenDescription,
                data?.cityOrigin,
                data?.cityWhen,
            )}
          {renderSection8(data?.textTitle, data?.textDescription)}
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          {renderSidebarDetail()}
          <div className="hidden lg:block mt-10 sticky top-28">
            {renderSidebarPrice()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingCarDetailPage;

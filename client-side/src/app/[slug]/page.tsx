"use client";

import React, {FC, useEffect, useState} from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PropertyCardH from "@/components/PropertyCardH";
import { remark } from 'remark';
import html from 'remark-html'
import Showdown from 'showdown';
import MetaData from "@/app/(server-components)/MetaData";

export interface ListingCarDetailPageProps {
    params: {
        slug: string;
    }
}


async function getData(slug: string) {
    const response = await fetch(`https://natoladrad.beget.app/api/destinations?filters[slug][$eq]=${slug}` + "&populate[cars][populate]=*&populate[faqs][populate]=*&populate[textBlock][populate]=*");
    return await response.json();
}

async function getDescription(data: string) {
    const processedContent = await remark()
        .use(html)
        .process(data);
    return processedContent.toString();

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
  const converter = new Showdown.Converter();
  const contentHTML = converter.makeHtml(data?.description);
  const cars = data?.cars;
  const blocks = data?.textBlock;
  const htmlBlock = blocks?.map((block: any) => {
      return converter.makeHtml(block?.body);
  })


  const renderSection1 = () => {
          return (
      <center><div className="listingSection__wrap !space-y-6">
        <center><h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {data?.title}
        </h1></center>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

          {/* CONTENT */}
          <div
              id="single-entry-content"
              className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
          >
              <div dangerouslySetInnerHTML={{ __html: contentHTML }} />

          </div>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />


      </div></center>
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
      cityWhen: string,
      isBusiness: boolean,
      pricePerKm: number,
  ) => {
    if (classAuto && !isBusiness) {
      return (
        <div className="listingSection__wrap">
            <center><h3 className="text-2xl font-semibold">{classAuto}</h3></center>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <PropertyCardH imgSrc={"https://natoladrad.beget.app" + imgSrc}
                           title={title}
                           price={price}
                           cityOrigin={cityOrigin}
                           cityWhen={cityWhen}
                           classAuto={classAuto}
                           isBusiness={isBusiness}
                           pricePerKm={pricePerKm}
            />
            <div className="text-neutral-6000 dark:text-neutral-300">

                <p>
                    {text}
                </p>
            </div>
        </div>
     );
    } else if (classAuto && isBusiness) {
        return (
            <div className="listingSection__wrap">
                <center><h3 className="text-2xl font-semibold">{classAuto}</h3></center>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <PropertyCardH imgSrc={"https://natoladrad.beget.app" + imgSrc}
                               title={title}
                               price={price}
                               cityOrigin={cityOrigin}
                               cityWhen={cityWhen}
                               classAuto={classAuto}
                               isBusiness={isBusiness}
                />
                <div className="text-neutral-6000 dark:text-neutral-300">
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

    const renderSection9 = (faqs: any[]) => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h4 className="text-2xl font-semibold">Часто задаваемые вопросы (ЧАВО/FAQ):</h4>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

                {/* CONTENT */}
                <div>
                    {faqs?.map((faq: any) => (
                        <div key={faq.id}>
                            <p className="text-lg font-semibold" style={{paddingTop: "1rem"}}>{faq.faqTitle}</p>
                            <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
                                {faq.faqDescription}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

            </div>
        );
    };

    const renderSection10 = (link: string) => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <iframe src={link} width="100%" height="600"></iframe>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

            </div>
        );
    };

    const renderSection11 = (block: any) => {
        return (
            <div className="listingSection__wrap">
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
                <div
                    id="single-entry-content"
                    className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                >
                    <div dangerouslySetInnerHTML={{ __html: block }} />

                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

            </div>
        );
    };



  const renderSidebarPrice = (price: number) => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}


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
    const renderVideoDetail = () => {
        return (
            <div className="listingSection__wrap lg:shadow-xl">
                <iframe src="https://simfer-taxi.ru/wp-content/uploads/2019/07/vip-taksi-simferopol.mp4" width="100%" height="100%"></iframe>
            </div>
        );
    };

  return (

    <div className={` nc-ListingCarDetailPage `}>
      {/* SINGLE HEADER */}
      <header className="rounded-md sm:rounded-xl">
          <title>{data?.siteTitle}</title>
          <meta name="description" content={data?.siteDescription} />
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
            {cars?.map((car: { className: string, carImg: { url: string }, listCars: string, price: number, description: string, isBusiness: boolean, pricePerKm: number}) => (
                renderSection2(
                    car.className,
                    car.carImg.url,
                    car.listCars,
                    car.price,
                    car.description,
                    data?.cityOrigin,
                    data?.cityWhen,
                    car.isBusiness,
                    car.pricePerKm,
                )
            ))}


            {htmlBlock?.map((block: any) => (
                renderSection11(block)
            ))}
          {data?.faqs.length ? renderSection9(data?.faqs) : ""}
          {data?.mapLink ? renderSection10(data?.mapLink): ""}
        </div>

        {/* SIDEBAR */}
        <div className="block flex-grow mt-14 lg:mt-0">
          
          <div className="hidden lg:block mt-10 sticky top-28">
            {renderSidebarPrice(cars ? cars[0]?.price : 0)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingCarDetailPage;

import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PropertyCardH from "@/components/PropertyCardH";
import Showdown from "showdown";
import {Metadata} from "next";

interface Car {
    className: string;
    carImg: { url: string };
    listCars: string;
    price: number;
    description: string;
    isBusiness: boolean;
    pricePerKm: number;
}

interface Destination {
    title: string;
    description: string;
    cityOrigin: string;
    cityWhen: string;
    cars: Car[];
    faqs: { id: string; faqTitle: string; faqDescription: string }[];
    textBlock: { body: string }[];
    mapLink?: string;
    siteTitle: string;
    siteDescription: string;
}

interface ListingCarDetailPageProps {
    params: { slug: string };
}

interface Props {
    params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getData(params.slug);
    const data = post.data[0] || null;

    return {
        title: data?.siteTitle,
        description: data?.siteDescription,
    };
}

async function getData(slug: string): Promise<{ data: Destination[] }> {
    const response = await fetch(
        `https://natoladrad.beget.app/api/destinations?filters[slug][$eq]=${slug}&populate[cars][populate]=*&populate[faqs][populate]=*&populate[textBlock][populate]=*`,
        { cache: "no-store" } // Отключаем кэширование для SSR
    );
    if (!response.ok) throw new Error("Ошибка загрузки данных");
    return await response.json();
}

const ListingCarDetailPage: ({params}: { params: any }) => Promise<React.JSX.Element> = async ({ params }) => {
    let data: Destination | null = null;
    let error: string | null = null;

    try {
        const response = await getData(params.slug);
        data = response.data[0] || null;
    } catch (err) {
        error = "Ошибка при загрузке данных";
    }

    if (error) return <div>{error}</div>;
    if (!data) return <div>Данные не найдены</div>;

    const converter = new Showdown.Converter();
    const contentHTML = converter.makeHtml(data.description);
    const cars = data.cars;
    const blocks = data.textBlock;
    const htmlBlock = blocks?.map((block) => converter.makeHtml(block.body));

    const renderSection1 = () => (
        <div className="listingSection__wrap space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">{data?.title}</h1>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div
                id="single-entry-content"
                className="prose dark:prose-invert prose-sm max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                dangerouslySetInnerHTML={{ __html: contentHTML }}
            />
        </div>
    );

    const renderSection2 = (car: Car, cityOrigin: string, cityWhen: string) => {
        const { className, carImg, listCars, price, description, isBusiness, pricePerKm } = car;
        const text = converter.makeHtml(description);

        if (!className) return null;

        return (
            <div className="listingSection__wrap">
                <h3 className="text-2xl font-semibold text-center">{className}</h3>
                <PropertyCardH
                    imgSrc={`https://natoladrad.beget.app${carImg.url}`}
                    title={listCars}
                    price={price}
                    cityOrigin={cityOrigin}
                    cityWhen={cityWhen}
                    classAuto={className}
                    isBusiness={isBusiness}
                    pricePerKm={pricePerKm}
                    text={text}
                />
                
            </div>
        );
    };

    const renderSection9 = (faqs: Destination["faqs"]) => (
        <div className="listingSection__wrap">
            <h4 className="text-2xl font-semibold">Часто зада

                ваемые вопросы (ЧАВО/FAQ):</h4>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div>
                {faqs?.map((faq) => (
                    <div key={faq.id}>
                        <p className="text-lg font-semibold" style={{ paddingTop: "1rem" }}>
                            {faq.faqTitle}
                        </p>
                        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
              {faq.faqDescription}
            </span>
                    </div>
                ))}
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        </div>
    );

    const renderSection10 = (link: string) => (
        <div className="listingSection__wrap">
            <iframe src={link} width="100%" height="600" title="Map" />
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        </div>
    );

    const renderSection11 = (block: string) => (
        <div className="listingSection__wrap">
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
            <div
                id="single-entry-content"
                className="prose dark:prose-invert prose-sm max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
                dangerouslySetInnerHTML={{ __html: block }}
            />
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />
        </div>
    );

    const renderSidebarPrice = () => {
        if (!cars || cars.length === 0) return null;
        return (
            <div className="listingSectionSidebar__wrap shadow-xl">
                <ButtonPrimary href={`/checkout?cityOrigin=${data?.cityOrigin}&cityWhen=${data?.cityWhen}`}>
                    Перейти к оформлению заказа
                </ButtonPrimary>
            </div>
        );
    };

    return (
        <div className="nc-ListingCarDetailPage">
            <main className="relative z-10 mt-11 flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:pr-10 lg:space-y-10">
                    {renderSection1()}
                    {cars?.map((car) => renderSection2(car, data?.cityOrigin as string, data?.cityWhen as string))}
                    {htmlBlock?.map((block, index) => (
                        <div key={index}>{renderSection11(block)}</div>
                    ))}
                    {data.faqs.length ? renderSection9(data.faqs) : null}
                    {data.mapLink ? renderSection10(data.mapLink) : null}
                </div>
                <div className="block flex-grow mt-14 lg:mt-0">
                    <div className="hidden lg:block mt-10 sticky top-28">{renderSidebarPrice()}</div>
                </div>
            </main>
        </div>
    );
};

export default ListingCarDetailPage;

import React from "react";
import SectionHero from "@/app/(server-components)/SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import { TaxonomyType } from "@/data/types";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import BackgroundSection from "@/components/BackgroundSection";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import {Metadata} from "next";


async function getHomePageDataWithRelations() {
  const response = await fetch('http://localhost:1337/api/global?populate[destinations][populate]=*', {
    headers: { 'Cache-Control': 'no-cache' } });
  return response.json();
}

async function getHomePageData() {
  const response = await fetch('http://localhost:1337/api/global', {
    headers: { 'Cache-Control': 'no-cache' } });
  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  const response = await getHomePageData();
  return {
    title: response.data.siteName,
    description: response.data.siteDescription,
  }
}


async function PageHome() {
  const data = await getHomePageDataWithRelations();
  const popularDestinations: TaxonomyType[] = [];
  for (const destination of data.data.destinations) {
      popularDestinations.push({
          id: destination.id,
          href: destination.slug,
          name: destination.cityWhen,
          taxonomy: "category",
          count: 1,
          thumbnail: 'http://localhost:1337' + destination.displayImage?.url,
      });
  }
  return (
      <main className="nc-PageHome relative overflow-hidden">
          {/* GLASSMOPHIN */}
          <BgGlassmorphism/>

          <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
              {/* SECTION HERO */}
              <SectionHero className="pt-10 lg:pt-16 lg:pb-16" sliderTitle={data.data.sliderTitle}
                           sliderText={data.data.sliderText}/>

              {/* SECTION 1 */}
              <SectionSliderNewCategories categories={popularDestinations}/>

              <SectionOurFeatures blockText={data.data.blockText} blockTitle={data.data.blockTitle}/>

              <SectionGridFeaturePlaces blockText={data.data.blockText} blockTitle={data.data.blockTitle}/>

              <SectionHowItWork/>

              <div className="relative py-16">
                  <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 "/>
                  <SectionGridAuthorBox blockText={data.data.blockText} blockTitle={data.data.blockTitle}/>
              </div>
              <div className="relative py-16">
                  <iframe src="https://yandex.ru/map-widget/v1/?lang=ru_RU&amp;scroll=true&amp;source=constructor-api&amp;um=constructor%3Acb98237bacdbcc430408827bec889c5219a2110da3c013cd3afc65cf67a5f861" width="100%" height="400px"></iframe>
              </div>


          </div>

      </main>
  );
}

export default PageHome;

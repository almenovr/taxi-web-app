"use client";

import React, {FC, useRef, useState} from "react";
import {MapPinIcon} from "@heroicons/react/24/outline";
import ClearDataButton from "@/app/(client-components)/(HeroSearchForm)/ClearDataButton";
import {Popover} from "@headlessui/react";
import {useRouter} from "next/navigation";
import Button from "@/shared/Button";

export interface RentalCarSearchFormProps {}

const RentalCarSearchForm: FC<RentalCarSearchFormProps> = ({}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

  const [cityOrigin, setCityOrigin] = useState("");
  const [cityWhen, setCityWhen] = useState("");
  const [showPopover, setShowPopover] = useState(false);

  const handleClick = async (e: any) => {
      e.preventDefault();
      const response = await fetch(`https://natoladrad.beget.app/api/destinations?filters[$and][0][cityOrigin][$eq]=${cityOrigin}&filters[$and][1][cityWhen][$eq]=${cityWhen}`);
      const data = await response.json();
      if(data.data.length > 0)
        router.push(data.data[0].slug);
      else {
        router.push('/destination-not-found');
      }


  }

  return (

    <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
      <div className={`relative flex flex-row`} style={{width: '98rem'}}>
          <div className={`relative flex flex-1`} ref={containerRef}>
              <div
                  onClick={() => setShowPopover(true)}
                  className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
                      showPopover ? "nc-hero-field-focused" : ""
                  }`}
              >
                  <div className="text-neutral-300 dark:text-neutral-400">
                      <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                  </div>
                  <div className="flex-grow">
                      <input
                          className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                          placeholder="Город или место"
                          value={cityOrigin}
                          autoFocus={showPopover}
                          onChange={(e) => {
                              setCityOrigin(e.currentTarget.value);
                          }}
                          ref={inputRef}
                      />
                      <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!cityOrigin ? "Город или место" : "Откуда забрать?"}</span>
          </span>
                      {cityOrigin && showPopover && (
                          <ClearDataButton
                              onClick={() => {
                                  setCityOrigin("");
                              }}
                          />
                      )}
                  </div>
              </div>

              {showPopover && (
                  <div
                      className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 left-10 -right-0.5`}
                  ></div>
              )}
          </div>
          <div className={`relative flex flex-1`} ref={containerRef}>
              <div
                  onClick={() => setShowPopover(true)}
                  className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
                      showPopover ? "nc-hero-field-focused" : ""
                  }`}
              >
                  <div className="text-neutral-300 dark:text-neutral-400">
                      <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
                  </div>
                  <div className="flex-grow">
                      <input
                          className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                          placeholder="Город или место"
                          value={cityWhen}
                          autoFocus={showPopover}
                          onChange={(e) => {
                              setCityWhen(e.currentTarget.value);
                          }}
                          ref={inputRef}
                      />
                      <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!cityWhen ? "Город или место" : "Куда отвезти?"}</span>
          </span>
                      {setCityWhen   && showPopover && (
                          <ClearDataButton
                              onClick={() => {
                                  setCityWhen("");
                              }}
                          />
                      )}
                  </div>
              </div>

              {showPopover && (
                  <div
                      className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 -inset-x-0.5`}
                  ></div>
              )}
          </div>
          <Popover
              className={`RentalCarDatesRangeInput relative flex flex-1`}
          >
              {({ open }) => (
                  <>
                      <div
                          className={`flex-1 z-10 flex items-center focus:outline-none ${
                              open ? "nc-hero-field-focused" : ""
                          }`}
                      >

                              <div className="pr-2 xl:pr-4">
                                  <button
                                      onClick={handleClick}
                                      type="button"
                                      className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
                                  >
                                      <span className="mr-3 md:hidden">Search</span>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                      >
                                          <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={1.5}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                          />
                                      </svg>
                                  </button>
                              </div>
                      </div>

                      {open && (
                          <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
                      )}
                  </>
              )}
          </Popover>
      </div>
    </form>
  );
};

export default RentalCarSearchForm;

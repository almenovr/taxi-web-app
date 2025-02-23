"use client";

import React from "react";
import FooterNav from "./FooterNav";


const Footer: React.FC = () => {
  return (
    <>
      <FooterNav />

      <center><div className="nc-Footer relative py-24 lg:py-28 border-t border-neutral-200 dark:border-neutral-700" style={{paddingBottom: "3rem", paddingTop: "3rem"}}>
        <span>Междугороднее такси Встреча. Такси ЖД вокзал Симферополь, Такси аэропорт Симферополь (SIP). График работы 24/7, © 2009 Taxi Vstrecha</span>

      </div></center>
      <center><span style={{paddingBottom: "5rem", color: "blue"}}><a href="tel:+79780109992">Заказать такси сейчас +7 (978) 010–99-92</a></span></center>
    </>
  );
};

export default Footer;

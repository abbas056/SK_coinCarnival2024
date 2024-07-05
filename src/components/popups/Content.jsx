import React from "react";
import { guideContent } from "../../js/data";

function Content({ eidiToss, coinDazzle, danceParty, talentTree, eventGifitng, language }) {
  let current;
  language === "Urdu/Hindi" ? (current = guideContent.Urdu) : (current = guideContent.English);
  return (
    <div className="text-data">
      {eidiToss ? (
        <>{current.eidiToss}</>
      ) : coinDazzle ? (
        current.CoinDazzle
      ) : talentTree ? (
        current.talentTree
      ) : (
        <>
          {current.h1}
          {current.desc1}
          {current.h2}
          {current.desc2}
        </>
      )}
    </div>
  );
}

export default Content;

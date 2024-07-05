import React, { useContext, useEffect, useState } from "react";
import coinIcon from "../../assets/coin-icon.png";
import barInner from "../../assets/filled-bar.png";
import beanIcon from "../../assets/bean.png";
import openBeanBag from "../../assets/Open-bean-bag.png";
import closeBeanBag from "../../assets/close-bean-bag.png";
import { currencySlang } from "../../js/helpers";
import { ApiContext } from "../../services/Api";
function Tab2ProgressBar({ goldCoins }) {
  const { userInfo } = useContext(ApiContext);
  const [sumOfRewards, setSumOfRewards] = useState(0);
  const coinRewardConfigList = userInfo?.coinRewardConfigList;

  useEffect(() => {
    let sum = 0;
    coinRewardConfigList?.forEach((item) => {
      if (item.isComplete) {
        sum += item.rewards;
      }
    });
    setSumOfRewards(sum);
  }, [coinRewardConfigList]);

  return (
    <div className="tab2-progressBar m-auto d-flex fd-column al-center jc-center gap-1 f-tangoItalic">
      <div className="my-gold-coins d-flex al-center jc-center gap-1 c-white">
        <img src={coinIcon} alt="" />
        <span>My Gold Coins: {goldCoins ? goldCoins : 0}</span>
      </div>
      <div className="text">
        Collect Certain Gold Coins to get <br />
        <span style={{ color: "#0151aa" }}>Beans Bonus Rewards</span>
      </div>
      <div className="progress-bar m-auto d-flex al-center jc-center p-rel">
        <div className="icons p-abs d-flex fd-column" style={{ left: "1vw", top: "-1vw", gap: "7vw" }}>
          <img style={{ width: "4vw", height: "4vw" }} src={coinIcon} alt="" />
          <img style={{ width: "4vw", height: "4vw" }} src={beanIcon} alt="" />
        </div>
        <div className="bean-bags p-abs w-90 d-flex jc-center">
          {coinRewardConfigList?.map((item, i) => {
            const checkCoinCount = (id) => {
              if (id < 0 || id >= coinRewardConfigList.length) {
                console.error("Invalid id");
                return 0;
              }
              let currentTarget = coinRewardConfigList[id]?.target;
              let previousTarget = id > 0 ? coinRewardConfigList[id - 1]?.target : 0;
              let progressInChunk = 0;
              if (goldCoins >= previousTarget && goldCoins <= currentTarget) {
                progressInChunk = ((goldCoins - previousTarget) / (currentTarget - previousTarget)) * 100;
              } else if (goldCoins <= currentTarget) {
                progressInChunk = 0;
              } else {
                progressInChunk = (goldCoins / currentTarget) * 100;
              }
              return parseInt(progressInChunk);
            };
            const isComplete = item.isComplete;
            return (
              <div className="box d-flex fd-column al-end jc-center p-rel" key={i}>
                <div className="target d-flex al-center jc-end w-100 ">{item.target}</div>
                <div
                  className={
                    isComplete === true ? "bottom w-100 d-flex al-center jc-end p-rel gray-0" : "bottom w-100 d-flex al-center jc-end p-rel gray-1"
                  }
                  style={{ top: "3vw", left: "0vw" }}
                >
                  <img className="z-index-2" src={isComplete === true ? openBeanBag : closeBeanBag} alt="" style={{ width: "6vw", height: "7vw" }} />
                  <div className="beans d-flex al-center jc-center z-index-2 p-abs">{currencySlang(item.rewards)}</div>
                </div>
                <div className="bar-filled m-auto d-flex al-center p-abs">
                  <img className="inner" style={{ width: `${checkCoinCount(i)}%`, height: "2.5vw" }} src={barInner} alt="" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="total-beans d-flex al-center jc-center gap-1 c-white">
        <span>Total Beans Rewards:</span> <img src={openBeanBag} alt="" /> <span>{sumOfRewards ? sumOfRewards : 0}</span>{" "}
        <img src={beanIcon} alt="" />
      </div>
    </div>
  );
}

export default Tab2ProgressBar;

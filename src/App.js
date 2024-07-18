import { useContext, useEffect, useState } from "react";
import Header from "./assets/Header.png";
import MainTabButtons from "./components/MainTabButtons";
import Footer from "./components/common/Footer";
import PopupComponent from "./components/common/PopupComponent";
import { overFlowAuto, overFlowHidden } from "./js/helpers";
import LanguageBar from "./components/common/LanguageBar";
import { ApiContext } from "./services/Api";
import { baserUrl } from "./js/baserUrl";
import axios from "axios";
import Marque from "./components/Marquee";
import upBtn from "./assets/up-btn.png";
import "./App.scss";

function App() {
  let [language, setLanguage] = useState("English");
  const [gameRecords, setgameRecords] = useState([]);
  const [loadMore, setLoadMore] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useContext(ApiContext);
  const [showBtnUp, setShowBtnUp] = useState(false);

  const [mainTabs, setMainTabs] = useState({
    tab1: false,
    tab2: true,
    tab3: false,
    tab4: false,
  });

  let type;
  if (mainTabs.tab1) {
    type = 1;
  } else if (mainTabs.tab2) {
    type = 2;
  } else if (mainTabs.tab3) {
    type = 3;
  } else if (mainTabs.tab4) {
    type = 4;
  }

  const [popup, setPopup] = useState({
    guide: false,
    eventGifting: false,
    details: false,
    records: false,
  });

  const popupSwitch = (id) => {
    let newCat = {
      guide: false,
      eventGifting: false,
      details: false,
      records: false,
    };
    setPopup({ ...newCat, [id]: true });
    gameRecord();
    overFlowHidden();
  };

  const gameRecord = () => {
    setIsLoading(true);
    axios
      .get(
        `${baserUrl}api/activity/eidF/getRecordInfo?eventDesc=20240717_coins&rankIndex=21&pageNum=${loadMore}&pageSize=10&type=${type}&userId=${userId}`
      )
      .then((response) => {
        setgameRecords(response?.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const loadMoreHistory = () => {
    setLoadMore(loadMore + 1);
  };

  useEffect(() => {
    gameRecord();
  }, [loadMore]);

  const close = () => {
    setPopup(false);
    overFlowAuto();
    setLoadMore(1);
  };

  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 100) {
        setShowBtnUp(true);
      } else {
        setShowBtnUp(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="App">
        <div className="header">
          <img src={Header} alt="" />
        </div>
        <span id="extraContent"></span>
        <LanguageBar language={language} setLanguage={setLanguage} />
        <div className="popup-buttons">
          <button className="p-fix f-tangoItalic" onClick={() => popupSwitch("guide")}>
            Guide
          </button>
          <button className="p-fix f-tangoItalic" onClick={() => popupSwitch("eventGifting")}>
            Event <br /> Gifitng
          </button>
          <button
            className="p-abs f-tangoItalic"
            style={mainTabs.tab1 || mainTabs.tab2 || mainTabs.tab4 ? { top: "150vw" } : { top: "160vw" }}
            onClick={() => popupSwitch("details")}
          >
            Details
          </button>
          <button
            className="p-abs f-tangoItalic"
            style={mainTabs.tab1 || mainTabs.tab2 || mainTabs.tab4 ? { top: "150vw" } : { top: "160vw" }}
            onClick={() => popupSwitch("records")}
          >
            Records
          </button>
        </div>
        {mainTabs.tab1 ? <Marque /> : null}
        <MainTabButtons mainTabs={mainTabs} setMainTabs={setMainTabs} />
        <PopupComponent
          popup={popup}
          setPopup={setPopup}
          close={close}
          language={language}
          tab1={mainTabs.tab1}
          tab2={mainTabs.tab2}
          tab3={mainTabs.tab3}
          tab4={mainTabs.tab4}
          loadMore={loadMoreHistory}
          isLoading={isLoading}
          gameRecord={gameRecords}
        />
        <Footer />
        {showBtnUp && (
          <button className="btn-up" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={upBtn} alt="" />
          </button>
        )}
      </div>
    </>
  );
}

export default App;

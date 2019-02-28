import React, { useState, useEffect } from "react";
import TouchCarousel from "react-touch-carousel";
import NonPassiveTouchTarget from "./NonPassiveTouchTarget";
import VisibilitySensor from "react-visibility-sensor";

import styles from "./Carousel.module.css";

import icons from "../Icons";

const DATA = [
  {
    background: "white",
    title: "Jimmy Choo",
    tags: "duty free shop, brand",
    category: "fashion",
    price: "¥¥¥",
    hours: "06:00 AM - 12:30 AM",
    position: [35.5459998, 139.7688865]
  },
  {
    background: "white",
    title: "Okashi Kobo",
    tags: "japanese confectionery",
    category: "souvenirs",
    price: "¥¥",
    hours: "08:00 AM - 10:00 PM",
    position: [35.5470719, 139.7681807]
  },
  {
    background: "white",
    title: "Nenrin-ya",
    tags: "shop, baumkuchen",
    category: "souvenirs",
    price: "¥",
    hours: "06:00 AM - 09:00 PM",
    position: [35.5545559, 139.7872127]
  },
  {
    background: "white",
    title: "Airport Grill and Bar",
    tags: "restaurant, cafe",
    category: "western_food",
    price: "¥¥",
    hours: "06:30 AM - 09:30 PM",
    position: [35.5507228, 139.7885033]
  }
];

const enableLoop = true;

const w = window.innerWidth;

const cardSize = w > 350 ? 300 : w;
const cardPadCount = enableLoop ? DATA.length : 0;
const carouselWidth = cardSize;

// define padding by setting carouselWidth - cardSize

const Carousel = ({ onChange, onClick }) => {
  const [active, setActive] = useState(false);
  const handleChange = isVisible => {
    if (isVisible !== active) setActive(isVisible);
  };

  const handleUpdate = e => {
    const index = e;
    if (onChange) onChange(DATA[index] || DATA[0]);
  };

  // container
  const CarouselContainer = ({
    cursor,
    carouselState: { active, dragging },
    ...rest
  }) => {
    // cursor is the moving object according to index

    let current = -Math.round(cursor) % DATA.length;
    while (current < 0) {
      current += DATA.length;
    }
    // place current card at center
    const translateX =
      (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2;

    return (
      <NonPassiveTouchTarget
        className={
          styles.carouselContainer +
          (active ? " is-active" : "") +
          (dragging ? " is-dragging" : "")
        }
      >
        <NonPassiveTouchTarget
          className={styles.carouselTrack}
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
          {...rest}
        />

        {/* <div className={styles.carouselPaginationWrapper}>
          <ol className={styles.carouselPagination}>
            {DATA.map((_, index) => (
              <li key={index} className={current === index ? "current" : ""} />
            ))}
          </ol>
        </div> */}
      </NonPassiveTouchTarget>
    );
  };

  // items / cards
  const CarouselCard = (index, modIndex, cursor) => {
    const item = DATA[modIndex];
    return (
      <div
        key={index}
        className={styles.CarouselCard}
        onClick={e => (onClick ? onClick(e) : "")}
      >
        <div
          className={styles.carouselCardInner}
          style={{
            width: cardSize
          }}
        >
          <div
            style={{
              height: 85,
              margin: "0 10px",
              borderRadius: 8,
              backgroundColor: item.background || "whitesmoke",
              boxShadow: "1px 2px 5px lightgrey",
              padding: "18px 15px 13px 15px"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>
                  {item.title || "Books & Drugs North"}
                </h3>
                <h4
                  style={{
                    margin: "2px 0 0 0",
                    fontSize: 14,
                    fontWeight: 300
                  }}
                >
                  {item.tags || "medicine and travel goods"}
                </h4>
              </div>

              <img src={icons(item.category || "other")} alt="cat" />
            </div>

            <hr style={{ marginTop: 15, marginBottom: 0 }} />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start"
              }}
            >
              <h4
                style={{ fontSize: 16, margin: "8px 0 0 0", fontWeight: 300 }}
              >
                {item.price || "$"}
              </h4>
              <h4
                style={{ fontSize: 16, margin: "8px 0 0 0", fontWeight: 300 }}
              >
                {item.hours || "06:00 AM - 12:00 AM"}
              </h4>
            </div>
          </div>
          {/* no code allowed here */}
        </div>
      </div>
    );
  };

  return (
    <VisibilitySensor onChange={handleChange}>
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          zIndex: 1,
          width: "100%"
        }}
      >
        <TouchCarousel
          onRest={handleUpdate}
          component={CarouselContainer}
          cardCount={DATA.length}
          cardPadCount={cardPadCount}
          cardSize={cardSize}
          renderCard={CarouselCard}
          loop
          autoplay={active ? 5000 : 0}
        />
      </div>
    </VisibilitySensor>
  );
};

export default Carousel;

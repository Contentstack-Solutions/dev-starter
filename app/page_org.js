"use client";
import { useState, useEffect } from "react";
import Stack, { onEntryChange } from "../lib/index";
import Footer from "./components/Footer";
import TextBlock from "./components/TextBlock";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ImageGallery from "./components/ImageGallery";
import ProductBlock from "./components/ProductBlock";

export default function Home({ params }) {
  const [entry, setEntry] = useState({});
  const [loading, SetLoading] = useState(true);

  const getContent = async () => {
    const entry = await Stack.getElementByTypeWtihRefs(
      "home_page",
      ["hero_banner", "page_content.image_gallery.gallery_item.page"]
    );
    setEntry(entry[0][0]);
    SetLoading(false);
  };

  useEffect(() => {
    onEntryChange(getContent);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Hero content={entry.hero_banner[0]} />
      <div className={entry?.page_content?.length === 0 ? "visual-builder__empty-block-parent" : ""} {...entry?.$?.page_content}>
        {entry.page_content?.map((item, index) => {
          const key = item.url || `content-${index}`; // Updated to use item.url
          return (
            <div key={index} {...entry?.$?.['page_content__' + index]}>
              {item.hasOwnProperty("text_block") && (
                <TextBlock key={index} content={item.text_block} />
              )}
              {item.hasOwnProperty("image_gallery") && (
                <ImageGallery key={index} content={item.image_gallery} />
              )}
              {item.hasOwnProperty(item, "bigcommerce_product") && (
                <ProductBlock content={item.bigcommerce_product} />
              )}  
            </div>
          );
        })}
      </div>
      <Footer />
      {console.log('hello')}
    </>
  );
}
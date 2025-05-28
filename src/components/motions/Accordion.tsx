import * as React from "react";
import { useState, type ComponentProps } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface InterfaceAccordion {
    i: number;
    expanded: number| false;
    setExpanded: (index: number | false) => void;
    content:React.ReactNode
  }
  

export default function Accordion ({ i, expanded, setExpanded,content }:InterfaceAccordion)  {

  const isOpen = i === expanded;
console.log(isOpen)
  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {content}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};



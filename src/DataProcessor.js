import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, get } from "firebase/database";

function DataProcessor(props) {
  const [wordsSorted, setWordsSorted] = useState([]);
  const [anagramCount, setAnagramCount] = useState(0);

  const updateAnagramCount = () => {
    const userWordSorted = props.userText.split("").sort().join("");
    let count = 0;

    for (const word of wordsSorted) {
      if (word === userWordSorted) {
        count += 1;
      }
    }
    setAnagramCount(count);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = ref(database, "test");
        const fetchedDataObject = await get(dataRef);
        const fetchedData = fetchedDataObject.val();

        const convertedToHashmap = fetchedData.map((word) =>
          word.split("").sort().join("")
        );
        setWordsSorted(convertedToHashmap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateAnagramCount();
  }, [props.userText]);

  return <div>{anagramCount} anagrams found</div>;
}

export default DataProcessor;

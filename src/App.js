import React, { useState } from "react";
import "./App.css";
import mammoth from "mammoth";

function App() {
  const [fileName, setFileName] = useState();
  const [crossWord, setCrossWord] = useState("NA");
  const [fieldWord, setFieldWord] = useState("NA");
  const [backgroundWord, setBackgroundWord] = useState("NA");
  const [summaryWord, setSummaryWord] = useState("NA");
  const [drofDraWord, setDroofDraWord] = useState("NA");
  const [detaDesWord, setDetaDesWord] = useState("NA");
  const [claimedWord, setClaimedWord] = useState("NA");
  const [abstractWord, setAbstractWord] = useState("NA");
  const [fileContent, setFileContent] = useState("");
  // const [sections, setSections] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showFileContent, setShowFileContent] = useState(false);
  const [modifiedTitle, setModifiedTitle] = useState("NA");
  // const [originalTitle, setOriginalTitle] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [imgCount, setImgCount] = useState(0);
  // const [totalclaims, setTotalClaims] = useState(0);
  // const [independentClaims, setIndependentClaims] = useState(0);
  // const [dependentClaims, setDependentClaims] = useState(0);
  // const [dependentClaimNumbers, setDependentClaimNumbers] = useState(0);
  // const [paragraphsInClaims, setParagraphsInClaims] = useState(0);
  // const [paragraphCount, setParagraphCount] = useState(0);
  const [dependent, setdependent] = useState(0);
  const [independent, setIndependent] = useState(0);
  const [total, setTotal] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [showClaimContent, setShowClaimContent] = useState(false);
  const [independentClaimLists, setIndependentClaimLists] = useState("");
  const [dependentClaimLists, setDependentClaimLists] = useState("");
  // const [showQr, setShowQr] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fileWithdep = e.target.files[0].name;
    const filename = fileWithdep.replace(".docx", "");
    setFileName(filename);
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target.result;
      try {
        const result = await mammoth.extractRawText({ arrayBuffer: content });
        const text = result.value;

        const titleRegx =
          /([\s\S]*?)(cross-reference to related application|CROSS|Cross|CROSS REFERENCE TO RELATED APPLICATIONS|What is claimed is|Claims|CLAIMS|WHAT IS CLAIMED IS|abstract|ABSTRACT|Cross-reference to related application|CROSS-REFERENCE TO RELATED APPLICATION|field|background|summary|description of the drawing|$)/i;
        const titlesec = titleRegx.exec(text);
        if (titlesec) {
          const titlenames = titlesec[1];
          const titlename = titlenames.replace(/\[\d+\]/g, "");

          const wordss = titlename.split(/\s+/).filter(Boolean);
          setWordCount(wordss.length);
          setModifiedTitle(titlename);
        }
        const crossregex =
          /(?:CROSS-REFERENCE TO RELATED APPLICATION|CROSS REFERENCE TO RELATED APPLICATION|Cross-reference to related application|Cross-Reference To Related Application|Related Applications)([\s\S]*?)(?:TECHNICAL FIELD|FIELD|Field|Background|BACKGROUND|Summary|SUMMARY|DESCRIPTION OF (?: THE) DRAWING|Description Of(?: The)? Drawing|DETAILED DESCRIPTION|WHAT IS CLAIMED IS|ABSTRACT|$)/;

        const crosssec = crossregex.exec(text);
        if (crosssec) {
          const crosssection = crosssec[1];
          const filteredContentforCrossSection = crosssection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForCross = filteredContentforCrossSection
            .split(/\s+/)
            .filter(Boolean);
          const crosswordCount = wordsForCross.length;
          setCrossWord(crosswordCount);
          console.log("aea", crosswordCount);
        }

        const fieldregex =
          /(?:FIELD|TECHNICAL FIELD|FIELD OF THE INVENTION|Field|Technical Field)([\s\S]*?)(?:BACKGROUND|Background|BRIEF DESCRIPTION OF THE INVENTION|Summary|SUMMARY|DESCRIPTION OF (?: THE) DRAWING|Description of (?: the) Drawing|DETAILED DESCRIPTION|detailed description|What is claimed is|CLAIMS|Abstract|ABSTRACT|CROSS-REFERENCE TO RELATED APPLICATION|$)/;
        const fieldsec = fieldregex.exec(text);
        if (fieldsec) {
          const fieldsection = fieldsec[1];
          const filteredContentforFieldSection = fieldsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForField = filteredContentforFieldSection
            .split(/\s+/)
            .filter(Boolean);
          const fieldWordCount = wordsForField.length;
          setFieldWord(fieldWordCount);
          console.log("fiel", fieldWordCount);
        }

        const backgrdregex =
          /(?:background|background of the invention)([\s\S]*?)(?:summary|brief description of the invention|description of (?: the) drawings|detailed description|what is claimed is|abstract|cross-reference to related application|field|$)/i;
        const backgrdsec = backgrdregex.exec(text);
        if (backgrdsec) {
          const backgrdsection = backgrdsec[1];
          const filteredContentforBackgrdSection = backgrdsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForBackground = filteredContentforBackgrdSection
            .split(/\s+/)
            .filter(Boolean);
          const backgrdWordCount = wordsForBackground.length;
          setBackgroundWord(backgrdWordCount);
          console.log("back", backgrdWordCount);
        }

        const summregex =
          /(?:SUMMARY|BRIEF DESCRIPTION OF THE INVENTION|BRIEF SUMMARY)([\s\S]*?)(?:DESCRIPTION OF (?: THE)? DRAWINGS|BRIEF DESCRIPTION OF DRAWINGS|detailed description|what is claimed is|claims|abstract|cross-reference to related application|field|background|$)/i;
        const summsec = summregex.exec(text);
        if (summsec) {
          const summsection = summsec[1];
          const filteredContentforSumarySection = summsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForSummary = filteredContentforSumarySection
            .split(/\s+/)
            .filter(Boolean);
          const summaryWordCount = wordsForSummary.length;
          setSummaryWord(summaryWordCount);
          console.log("sum", summaryWordCount);
        }

        const dodregex =
          /(?:Description of(?: the)? Drawings|DESCRIPTION OF(?: THE)? DRAWINGS)([\s\S]*?)(?:DETAILED DESCRIPTION|\nDetailed Description|DESCRIPTION OF EMBODIMENTS|DESCRIPTION OF IMPLEMENTATIONS|DETAILED DESCRIPTION OF SPECIFIC EMBODIMENTS|What is claimed is|CLAIMS|ABSTRACT|CROSS-REFERENCE TO RELATED APPLICATION|FIELD|BACKGROUND|SUMMARY|BRIEF DESCRIPTION THE INVENTION|$)/;
        const dodsec = dodregex.exec(text);
        if (dodsec) {
          const dodsection = dodsec[1];
          const filteredContentforDodSection = dodsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForDod = filteredContentforDodSection
            .split(/\s+/)
            .filter(Boolean);
          const dodWordCount = wordsForDod.length;
          setDroofDraWord(dodWordCount);
          console.log("dod", dodWordCount);
        }

        const detDesregex =
          /(?:\nDetailed Description|DETAILED DESCRIPTION|DESCRIPTION OF EMBODIMENTS|DESCRIPTION OF IMPLEMENTATIONS|DETAILED DESCRIPTION OF SPECIFIC EMBODIMENTS)([\s\S]*?)(?:What is claimed is|Claims|WHAT IS CLAIMED IS|CLAIMS|abstract|ABSTRACT|Cross-reference to related application|CROSS-REFERENCE TO RELATED APPLICATION|FIELD|BACKGROUND|SUMMARY|$)/;

        const detDessec = detDesregex.exec(text);
        if (detDessec) {
          const detDessection = detDessec[1];
          const filteredContentforDetDesSection = detDessection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForDetDes = filteredContentforDetDesSection
            .split(/\s+/)
            .filter(Boolean);
          const detDesWordCount = wordsForDetDes.length;
          setDetaDesWord(detDesWordCount);
          console.log("det", detDesWordCount);
        }

        const claimregex =
          /(?:What is claimed is|Claims|CLAIMS|WHAT IS CLAIMED IS)([\s\S]*?)(?:abstract|ABSTRACT|Related Applications|Cross-reference to related application|CROSS-REFERENCE TO RELATED APPLICATION|FIELD|Field|BACKGROUND|SUMMARY|$)/;

        const claimsec = claimregex.exec(text);

        if (claimsec) {
          const claimsection = claimsec[1];
          const linesa = claimsection
            .split(/(?<=\.)\s+/)
            .filter((line) => line.includes("."));
          const filteredLines = linesa.filter(
            (line) =>
              line.trim().length >= 40 &&
              !/^\s*[\d\n\t\s]+\.?$|^:\s*\n{1,10}CLAIMS\s*\n{1,10}1\./.test(
                line
              )
          );

          console.log("claims", linesa);
          console.log("claims1", filteredLines);

          let independentClaimCount = 0;
          let dependentClaimCount = 0;
          const independentClaims = [];
          const dependentClaims = [];

          for (let i = 0; i < filteredLines.length; i++) {
            const line = filteredLines[i];
            const words = line.split(/\s+/).filter(Boolean);
            const wordCount = words.length;
            if (/claim\s+(\d+)/i.test(line)) {
              dependentClaims.push(`claim ${i + 1} - ${wordCount} words`);
              dependentClaimCount++;
            } else {
              independentClaims.push(`claim ${i + 1} - ${wordCount} words`);
              independentClaimCount++;
            }
          }

          setTotal(filteredLines.length);
          setIndependent(independentClaimCount);
          setdependent(dependentClaimCount);
          setIndependentClaimLists(independentClaims.join("\n"));
          setDependentClaimLists(dependentClaims.join("\n "));

          const filteredContentforClaimSection = claimsection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );

          const wordsForDetClaim = filteredContentforClaimSection
            .split(/\s+/)
            .filter(Boolean);
          const claimWordCount = wordsForDetClaim.length;
          setClaimedWord(claimWordCount);
          console.log("claim", claimWordCount);
        }

        const abstractregex =
          /(?: Abstract|ABSTRACT)([\s\S]*?)(?:What is claimed is|Claims|CLAIMS|CROSS-REFERENCE |cross-reference to related application|field|background|summary|description of the drawing|$)/;

        const abssec = abstractregex.exec(text);
        if (abssec) {
          const abssection = abssec[1];
          const filteredContentforAbstractSection = abssection.replace(
            /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
            ""
          );
          const wordsForDetAbs = filteredContentforAbstractSection
            .split(/\s+/)
            .filter(Boolean);
          const absWordCount = wordsForDetAbs.length;

          setAbstractWord(absWordCount);
          console.log("abs", absWordCount);
        }

        const figRegex =
          /(?:Description of(?: the)? Drawings|DESCRIPTION OF(?: THE)? DRAWINGS)([\s\S]*?)(?:DETAILED DESCRIPTION|\nDetailed Description|DESCRIPTION OF EMBODIMENTS|DESCRIPTION OF IMPLEMENTATIONS|DETAILED DESCRIPTION OF SPECIFIC EMBODIMENTS|What is claimed is|CLAIMS|ABSTRACT|CROSS-REFERENCE TO RELATED APPLICATION|FIELD|BACKGROUND|SUMMARY|BRIEF DESCRIPTION THE INVENTION|$)/;
        const descriptionMatches = figRegex.exec(text);
        debugger;
        if (descriptionMatches) {
          const descriptionText = descriptionMatches[1];
          const imageRegex1 =
            /(?:FIG(?:URE)?)\.?[-\s]?(?:\d+|[IVXLCDM]+)[A-Z]?(?:\([\w\s]+\))?\b/gi;
          const matches = descriptionText.match(imageRegex1);
          const uniqueMatches = [...new Set(matches)];
          const matchesWithoutanyWord = uniqueMatches.filter(
            (match) =>
              !/\bfigured\b/i.test(match) && !/\bfiguring\b/i.test(match)
          );

          const Rx1 = matchesWithoutanyWord.length;
          const figsRomanRegex =
            /FIGS(?:URES?)?\.\s(?:\d+|[IVXLCDM]+)(?:[A-Za-z]?(?:\sAND\s(?:\d+|[IVXLCDM]+)[A-Za-z]?)+)?/i;

          const matches2 = descriptionText.match(figsRomanRegex);
          const unique = [...new Set(matches2)];
          console.log("aaa", unique);
          const Rx2 = unique.length * 2;
          const totalFigs = Rx1 + Rx2;
          setImgCount(totalFigs);

          const imageRegex =
            /FIGS\.\s?\d+([A-Za-z\(\)]+)?\s?(?:to(?!.*and)|-(?!.*and))\s?\d+([A-Za-z\(\)]+)?/gi; //without and
          debugger;
          const matches1 = descriptionText.match(imageRegex);
          const uniqueMatches1 = [...new Set(matches1)];
          console.log("jii", uniqueMatches1);
        }
        setFileContent(text);
        setSentenceCount(text.split(".").length);
        setLineCount(text.split("\n").length);
        const a = text.split("\n");
        setLineCount(a.length);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error reading the .docx file.");
      }
    };

    reader.onerror = () => {
      setErrorMessage("Error reading the file.");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <div
        style={{
          letterSpacing: 0,
          top: 0,
          width: "100%",
          backgroundColor: "",
          color: "white",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h1>Patent Reader</h1>
      </div>
      <input type="file" onChange={handleFileChange} />
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="result">
        <p>Title: {modifiedTitle}</p>
        <p> Count of the Title :{wordCount}</p>
      </div>

      <div className="result">
        <p>Cross-Reference Section: {crossWord}</p>
        <p>Field Section:{fieldWord}</p>
        <p>Background Section:{backgroundWord}</p>
        <p>Summary Section : {summaryWord}</p>
        <p>Description of Drawing : {drofDraWord}</p>
        <p> Detailed Description : {detaDesWord}</p>
        <p>Claims Section :{claimedWord}</p>
        <p>Abstract Section : {abstractWord}</p>
        <p>Total Number of Figures:{imgCount}</p>
        <p>Total lines: {lineCount}</p>
        <p>
          Total word count: {fileContent.split(/\s+/).filter(Boolean).length}
        </p>
        <p>Total character count: {fileContent.replace(/\s/g, "").length}</p>
        <p>Total sentence count: {sentenceCount}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "2%",
        }}
      >
        <div>
          <button onClick={() => setShowFileContent(!showFileContent)}>
            {showFileContent ? "hide" : "view"} content
          </button>
        </div>
        <div>
          <button onClick={() => setShowClaimContent(!showClaimContent)}>
            {showClaimContent ? "hide" : "view"} Claims
          </button>
        </div>
      </div>

      {showFileContent && (
        <div className="file-content" style={{ textAlign: "center" }}>
          <h2 style={{ color: "white" }}>File Content : {"  " + fileName}</h2>
          <p
            style={{
              whiteSpace: "pre-wrap",
              textAlign: "left",
              backgroundColor: "white",
              margin: "0",
            }}
          >
            {fileContent
              .split("\n")
              .reduce((acc, line) => {
                const trimmedLine = line.trim();
                const modifiedLine = trimmedLine.replace(
                  /\[\d+\]|\b(?:[1-4]|[6-9])?\d{1,}(?:(?<!\[\d+)\b5\b)?\b/g,
                  ""
                );
                if (modifiedLine) {
                  acc.push(modifiedLine);
                } else if (!acc[acc.length - 1]) {
                  return acc;
                } else {
                  acc.push("");
                }
                return acc;
              }, [])
              .join("\n")}
          </p>
        </div>
      )}

      {showClaimContent && (
        <div className="claim-content">
          <h2>CLAIMS:</h2>
          <p>Total Claims:{total}</p>
          <p>Independent Claims:{independent}</p>
          <p>Dependent Claims:{dependent}</p>
          <p>
            <b>Independent Claims List:</b>
          </p>
          <pre>{independentClaimLists}</pre>
          <p>
            <b>Dependent Claims:</b>
          </p>
          <pre>{dependentClaimLists}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

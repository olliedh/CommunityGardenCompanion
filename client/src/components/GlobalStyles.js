import { createGlobalStyle } from "styled-components";
import Checkbox from "./ToolShedBooker/CheckBox";
// import img from "../assets/flower2buds.png"
const GlobalStyles = createGlobalStyle`

/******************************************/
//reset
/******************************************/

/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
    box-sizing: border-box;
  }
  /*
    2. Remove default margin
  */
  * {
    margin: 0;
  }
  /*
    3. Allow percentage-based heights in the application
  */
  html, body {
    height: 100%;
  }
  /*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  /*
    6. Improve media defaults
  */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  /*
    7. Remove built-in form typography styles
  */
  input, button, textarea, select {
    font: inherit;
  }
  /*
    8. Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  /*
    9. Create a root stacking context
  */
  #root, #__next {
    isolation: isolate;
  }

  ol, ul {
    list-style: none;
  }

  a:link {
      text-decoration: none;
}

a:visited {
      text-decoration: none;
}

a:hover {
      text-decoration: none;
}

a:active {
      text-decoration: none;
}
 
/******************************************/

/******************************************/
//Global styles
/******************************************/

:root {
  //main background colour (in standard theme)
--bone: hsla(38, 33%, 86%, 1);
--mango-tango: hsla(23, 85%, 63%, 1);
//metallic-sunburst is yellowish green
--metallic-sunburst: hsla(49, 46%, 41%, 1);
//dark brown for footer, maybe test
--dark-sienna: hsla(11, 62%, 14%, 1);
--liver-organ: hsla(13, 57%, 25%, 1);
--teal-blue: hsla(195, 37%, 41%, 1);

//bold green options:
--hunter-green: hsla(129, 44%, 23%, 1);
//night mode body text contender->
--middle-green: hsla(136, 31%, 46%, 1);
//subdued green options: 
--msu-green: hsla(162, 27%, 19%, 1);
--shiny-shamrock: hsla(128, 21%, 57%, 1);
//slightly warmer greens: 
--forest-green-traditional: hsla(131, 34%, 23%, 1);
--asparagus: hsla(94, 30%, 54%, 1);

//darks
--charleston-green: hsla(187, 22%, 15%, 1);
--dark-jungle-green: hsla(178, 77%, 7%, 1);
//night mode background->
--raisin-black: hsla(244, 17%, 16%, 1);
}


h1 {
    font-family: "MuseoModerno", sans-serif;
    font-weight: 700;
    color: var(--forest-green-traditional);
  }

  h2 {
    color: #7ca982;
    font-weight: 500;
    font-family: "hind", sans-serif;
    /* text-shadow: 1px 1px 4px rgba(0,0,0,0.3); */

  }
  h3{
    color: var(--hunter-green);
    font-weight: 500;
    font-family: "MuseoModerno", sans-serif;
  

  }

  h4, h5, h6 {
    color: var(--hunter-green);
    font-weight: 500;
    font-family: "hind", sans-serif;


  }
  p {
    color: var(--charleston-green);
    font-family: "hind", sans-serif;
  
  }


  body {
    //change later to bone?
    color: var(--charleston-green);
    font-family: "hind", sans-serif;
  
    background-color: var(--bone);
 

  }
table {
 border-collapse: collapse;
}

td {

  border: solid black 1px;
  /* &:nth-of-type(5n) {

    font-weight: bold;

    &:first-of-type {
      
    font-weight: bold;
    }
  } */

  
}


tr{

 
}

th {
 padding-left: 5px;
 color: var(--hunter-green);
}

a {
  color: var(--liver-organ);
 font-weight: 500;
 
}

a:visited {

  color: var(--metallic-sunburst);
}

a:hover{
  color: var(--mango-tango);

a:active{
  color: var(--mango-tango);
 
}
}
`



export default GlobalStyles;
import React from "react";
import PropTypes from "prop-types";
import { marked } from "marked";
import "./App.css";

const entry =
  "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)";
//Composant representant l'editeur de texte
class Editeur extends React.Component {
  render() {
    return (
      <textarea
        id="editor"
        value={this.props.input}
        onChange={this.props.handleChange}
      ></textarea>
    );
  }
}
Editeur.propTypes = {
  input: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

//Composant representant la sortie du code
class Preview extends React.Component {
  render() {
    return (
      <div id="preview">
        <div dangerouslySetInnerHTML={{ __html: this.props.output }} />
      </div>
    );
  }
}
Preview.propTypes = {
  output: PropTypes.string.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: entry,
      output: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newInput = event.target.value;
    this.setState({
      input: newInput,
      output: marked.parse(newInput), // Compile à chaque modification
    });
  }

  componentDidMount() {
    this.setState({ output: marked.parse(this.state.input) });
  }

  render() {
    return (
      <div id="main">
        <Editeur input={this.state.input} handleChange={this.handleChange} />
        <Preview output={this.state.output} />
      </div>
    );
  }
}

export default App;

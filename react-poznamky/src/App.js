import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from "./Components/Header/Header"
import Search from "./Components/Search/Search"
//import Poznamka from "./Components/Poznamka/Poznamka"
import Notes from "./Components/Notes"
import UUID from 'uuid'

class App extends Component {
  state = {
    notes: [
      { id: UUID.v4(), title: "Sample title", content: "With supporting text below as a natural lead-in to additional content.", date: "20. 2. 2019", badge: "Note" },
      { id: UUID.v4(), title: "Title too", content: "Something really similar to the first one.", date: "21. 2. 2019", badge: "Note" }
    ],
    filteredNotes: [],
    categories: [
      { categoryName: "All" },
      { categoryName: "Note" }
    ],
    newTitle: "",
    newContent: "",
    newBadge: "",//////////BADGE
    editModal: true,
    validInput: false,
    titleLength: 0,
  }

  componentDidMount() {
    this.initFilteredNotes()
  }

  getDate = () => {
    var day = new Date().getDate(); //Current Day
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    return day + '. ' + month + '. ' + year;
  }

  init = () => {
    this.setState({ newContent: "", newTitle: "", newBadge: "", validInput: false });
  }
  initFilteredNotes = () => {
    this.setState({
      filteredNotes: [...this.state.notes]
    })
  }

  addNote = () => {
    const newNote = {
      id: UUID.v4(),
      title: this.state.newTitle,
      content: this.state.newContent,
      badge: this.state.newBadge === "" ? "Note" : this.state.newBadge,
      date: this.getDate()
    }
    const newCategory = {

      categoryName: this.state.newBadge
    }

    let categoryExists = false;

    this.setState({ notes: [...this.state.notes, newNote], filteredNotes: [...this.state.filteredNotes, newNote] });

    //KONTROLA JEDNOTLIVYCH KATEGORII ZDA LI UZ TAKOVA NEEXISTUJE
    this.state.categories.map(category => (category.categoryName === this.state.newBadge) ? categoryExists = true : null)
    //POKUD NEEXISTUJE PRIDAM NOVOU KATEGORII
    if (categoryExists === false) {
      this.setState(
        this.state.newBadge !== "" ? { categories: [...this.state.categories, newCategory] } : null
      )
    }
    //INICIALIZUJU ZPET NA FALSE
    categoryExists = false;
    this.init();
    //}
  }

  editNote = (index, id) => {
    //EDIT PRES ID
    this.setState({
      notes: [...this.state.notes.map(
        note => (note.id === id ? { ...note, title: this.state.newTitle, content: this.state.newContent, badge: this.state.newBadge !== "" ? this.state.newBadge : "Note", date: this.getDate() } : note)
      )],
    });
    this.setState({
      filteredNotes: [...this.state.filteredNotes.map(
        note => (note.id === id ? { ...note, title: this.state.newTitle, content: this.state.newContent, badge: this.state.newBadge !== "" ? this.state.newBadge : "Note", date: this.getDate() } : note)
      )],
    });

    const newCategory = {
      categoryName: this.state.newBadge
    }
    let categoryExists = false;
    //KONTROLA JEDNOTLIVYCH KATEGORII ZDA LI UZ TAKOVA NEEXISTUJE
    this.state.categories.map(category => (category.categoryName === this.state.newBadge) ? categoryExists = true : null)
    //POKUD NEEXISTUJE PRIDAM NOVOU KATEGORII
    if (categoryExists === false) {
      this.setState(
        this.state.newBadge !== "" ? { categories: [...this.state.categories, newCategory] } : null
      )
    }
    //INICIALIZUJU ZPET NA FALSE
    categoryExists = false;


    //NUTNOST PRIDAT NOVOU KATEGORII POKUD JI PRIDA NA EDIT
  }

  validate = () => {
    if (this.state.newTitle.length > 0 && this.state.newTitle.length < 46) { // zde je problem i kdyz vse vymazu v inputu porad ma delku 1 ASI PROTOZE VZDY JE TO ON CHANGE, tzn posledni znak se nesmaze, uz tam neni ta zmena
      this.setState({ validInput: true });
    } else {
      this.setState({ validInput: false });
    }
  }

  getNewTitle = (e) => {
    this.setState({ newTitle: e.target.value })
    /*this.setState({ titleLength: e.target.value.length })
    let length = e.target.value.length;
    console.log(length)*/
  }
  getNewContent = (e) => {
    this.setState({ newContent: e.target.value })
  }
  getNewBadge = (e) => {
    this.setState({ newBadge: e.target.value })
  }
  removeNote = (id) => {
    this.setState({
      notes: [...this.state.notes.filter(note => note.id !== id)]
    });
    this.setState({
      filteredNotes: [...this.state.filteredNotes.filter(note => note.id !== id)]
    });
  }

  getIndex = (value, arr, prop) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  setIdContent = (index) => {
    const note = { ...this.state.notes[index] };
    this.setState({ newTitle: note.title })
    this.setState({ newContent: note.content })
    this.setState({ newBadge: note.badge })
  }

  searchEngine = (e) => {
    //console.log(e.target.value);
    const notesFilter = [...this.state.notes];
    this.setState({
      filteredNotes: notesFilter.filter(note => note.title.includes(e.target.value))
    });
  }

  onClickCategory = (e) => {
    console.log("test")
  }


  render() {

    return (
      <div className="App">
        <Header
          addNote={this.addNote}
          init={this.init}
          newTitle={this.getNewTitle}
          newContent={this.getNewContent}
          newBadge={this.getNewBadge}
          getValidation={this.state.validInput}
          validate={this.validate} />

        <Search searchEngine={this.searchEngine} categories={this.state.categories} onClickCategory={this.onClickCategory} />

        <Notes
          notes={this.state.filteredNotes.length !== this.state.notes.length ? this.state.filteredNotes : this.state.notes}
          remove={this.removeNote}
          init={this.init}
          getValidation={this.state.validInput}
          newContent={this.getNewContent}
          newTitle={this.getNewTitle}
          newBadge={this.getNewBadge}
          validate={this.validate}
          editNote={this.editNote}
          getIndex={this.getIndex}
          setIdContent={this.setIdContent}
          getDate={this.getDate}
        />
        <small id="endOL"> />End of list</small>
      </div >
    );
  }
}

export default App;

//RAZENI PODLE BADGŮ pridat BADGE V ADD NOTE NEBO HO EDITOVAT 
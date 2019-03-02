import React, { Component } from 'react'
import Note from './Note/Note'

export default class Notes extends Component {
    render() {
        return this.props.notes.slice(0).reverse().map((note) => (
            <Note
                note={note}
                notes={this.props.notes}
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                badge={note.badge}
                date={note.date}
                remove={this.props.remove}
                getValidation={this.props.getValidation}
                newTitle={this.props.newTitle}
                newContent={this.props.newContent}
                newBadge={this.props.newBadge}
                init={this.props.init}
                validate={this.props.validate}
                editNote={this.props.editNote}
                getIndex={this.props.getIndex}
                setIdContent={this.props.setIdContent}
                getDate={this.props.getDate}
            />

        ));
    }
}

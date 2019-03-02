import React, { Component } from 'react'
import {
    Card, Badge, CardBody,
    CardTitle, CardText,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input, FormText
} from 'reactstrap';

import "./Note.css"
//import { EventEmitter } from 'events';

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editOpen: false,
            length: 0,
            badgeValue: "",
            dateTime: this.props.getDate()
        };
    }


    toggle = () => {
        this.setState({ editOpen: !this.state.editOpen })

        //this.props.init();
    }

    getTitleLength = (e) => {
        this.setState({ length: e.target.value.length })
    }

    getBadgeValue = (e) => {
        this.setState({ badgeValue: e.target.value })
    }

    render() {
        const { id, title, content, date, badge } = this.props.note;
        return (
            <div className="poznamky">
                <Card onClick={() => { this.toggle(); this.props.setIdContent(this.props.getIndex(id, this.props.notes, 'id')) }}>
                    <CardBody>
                        <CardTitle><b>{title}</b>
                            <button type="button" className="close" aria-label="Close" onClick={() => { this.props.remove(id) }}>
                                <span aria-hidden="true">×</span>
                            </button>
                        </CardTitle>
                        <hr />
                        <CardText>{content}</CardText>
                        <CardText>
                            <small className="text-muted">Posted {date}</small>
                            {date === this.state.dateTime ?
                                <Badge color="secondary">New!</Badge> : <></>}
                            <Badge color="warning">{badge}</Badge>
                        </CardText>
                    </CardBody>
                </Card>

                <Modal isOpen={this.state.editOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit note</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input
                                    autoFocus
                                    type="text"
                                    placeholder=". . ."
                                    defaultValue={title}
                                    onChange={(event) => { this.props.newTitle(event); this.props.validate(); this.getTitleLength(event) }}
                                    ref={this.state.titleInput}
                                />
                                <FormText>Type 1-45 characters</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Content</Label>
                                <Input
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                    defaultValue={content}
                                    onChange={this.props.newContent}
                                    onLoad={this.getDataContent}
                                    ref={this.state.contentInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Category/Badge</Label>
                                <Badge color="warning">{this.state.badgeValue != "" ? this.state.badgeValue : "Note"/*ZDE CHYBA BADGE SE PRESNASTAVI SPATNE */}</Badge>
                                <Input
                                    type="text"
                                    placeholder=". . ."
                                    defaultValue={badge !== "Note" ? badge : ""}
                                    onChange={(event) => { this.props.newBadge(event); this.getBadgeValue(event) }} />

                                <FormText>Keep empty for default</FormText>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        {this.state.length < 0 || this.state.length > 45 ?
                            <Button color="primary" style={{ opacity: "0.2" }} >Edit Note</Button>
                            :
                            <Button color="primary" style={{ opacity: "1" }}
                                onClick={(event) => { this.props.editNote(this.props.getIndex(id, this.props.notes, 'id'), id); this.toggle(); }}>
                                Edit note
                            </Button>
                        }
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

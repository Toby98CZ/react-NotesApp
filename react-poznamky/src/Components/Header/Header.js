import React from 'react';
import './Header.css';
import {
    Navbar,
    Nav,
    NavItem,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Label, Input, FormText, Badge
} from 'reactstrap';
//import { throws } from 'assert';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            length: 0,
            badgeValue: "Note"
        };

        this.toggle = this.toggle.bind(this);
    }

    initBadge = () => {
        this.setState({ badgeValue: "Note" })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            length: 0
        }));
        this.props.init();
        this.initBadge();
    }

    getTitleLength = (e) => {
        this.setState({ length: e.target.value.length })
    }

    getBadgeValue = (e) => {
        this.setState({ badgeValue: e.target.value })
    }

    render() {
        return (
            <div id="headerK">
                <Navbar color="light" light expand="md">
                    <h5>Poznámky</h5>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <a href="./" onClick={(e) => { e.preventDefault(); this.toggle() }} className="round-button">+</a>
                        </NavItem>
                    </Nav>
                </Navbar>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add note</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Title</Label>
                                <Input type="text" placeholder=". . ." onChange={(event) => { this.props.newTitle(event); this.props.validate(); this.getTitleLength(event); }} />
                                <FormText>Type 1-45 characters</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleText">Content</Label>
                                <Input type="textarea" name="text" id="exampleText" onChange={this.props.newContent} />
                                <FormText>This area can be empty</FormText>
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Category/Badge</Label>
                                <Badge color="warning">{this.state.badgeValue !== "" ? this.state.badgeValue : "Note"}</Badge>
                                <Input
                                    type="text"
                                    placeholder=". . ."
                                    onChange={(event) => { this.props.newBadge(event); this.getBadgeValue(event) }} />

                                <FormText>Keep empty for default</FormText>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        {this.state.length < 1 || this.state.length > 45 ?
                            <Button color="primary" style={{ opacity: "0.2" }} >Add note</Button>
                            :
                            <Button color="primary" style={{ opacity: "1" }} onClick={(event) => { this.props.addNote(); this.toggle(); }}>Add note</Button>
                        }

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

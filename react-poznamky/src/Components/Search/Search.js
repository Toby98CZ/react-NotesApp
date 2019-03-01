import React, { Component } from 'react'
import { FormGroup, Input, FormText, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import "./Search.css";

export default class Search extends Component {

    state = {
        searchValue: "",
    }


    render() {
        return (
            <div id="inputSearch">
                <FormGroup>
                    <Input
                        type="search"
                        name="search"
                        id="exampleSearch"
                        placeholder="Search . . . "
                        onChange={this.props.searchEngine}
                    />
                    <FormText>Click on note to edit
                        <UncontrolledDropdown setActiveFromChild id="dropdownStyle">
                            <DropdownToggle tag="a" className="nav-link" caret>
                                Options
                        </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag="a" href="./">default</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </FormText>
                </FormGroup>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { FormGroup, Input, FormText, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import "./Search.css";
import DropItem from "./DropItem"

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
                                Categories
                        </DropdownToggle>
                            <DropdownMenu>
                                {this.props.categories.slice(0).reverse().map((category, index) => (
                                    <DropItem category={category} name={category.categoryName} key={index} onClickCategory={this.props.onClickCategory} />
                                ))}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </FormText>
                </FormGroup>
            </div>
        )
    }
}

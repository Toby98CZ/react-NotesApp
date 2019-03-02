import { DropdownItem } from 'reactstrap'
import React, { Component } from 'react'

export default class DropItem extends Component {
    render() {
        const { categoryName } = this.props.category;
        return (
            <>
                <DropdownItem tag="a" href="./">{categoryName}</DropdownItem>
            </>
        )
    }
}

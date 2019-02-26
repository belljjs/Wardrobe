import React, { Component } from 'react';
import axios from 'axios';
import Items from '../Items/Items';
import '../global.css' ;
import ItemFilter from '../ItemFilter/ItemFilter';
import SelectedItems from '../SelectedItems/SelectedItems';

//import Modal from '../UI/Modal/Modal';

class Closet extends Component {
    state = {
        itemsAll: [],
        itemsShown: [],
        itemsSelected: [],
        itemsFilter: ""
    }
   
    freshItemsShown = (filter) => {
        let itemsFiltered =[];
        console.log(".... freshItemsShown")
        
        console.log("filter in freshItemsShown",filter);
        
        let itemsAll = [...this.state.itemsAll];
        // return new array (itemsShown) fitered by filter argument
        itemsFiltered = filter === "all" ? itemsAll : itemsAll.filter( item => item.category === filter);
        
        console.log("itemsFiltered in freshItemsShown",itemsFiltered);
        
        return itemsFiltered
    }

    adjustItemsShown = (itemsShown, itemsSelected) => {
        console.log(".... adjustItemsShown")
        console.log("itemsShown before adjust",itemsShown)
        console.log("itemsSelected before adjust",itemsSelected)

        if (itemsSelected.length > 0) {
            let shownIndex = -1;
            itemsSelected.forEach(item => {
                console.log("item in ForEach",item)
                shownIndex = itemsShown.findIndex(i => {
                    return i.id === item.id}
                )
                if (shownIndex > -1) {
                    console.log(" ---- shownIndex",shownIndex);
                    itemsShown.splice(shownIndex,1)
                }
            })
        }   
        console.log("itemsShown after adjust",itemsShown)
        return itemsShown;
    }

    handleItemsFilterClicked = (filter)=> {
        console.log("---- In handleItemsFilterClicked")
        const itemsFiltered = this.freshItemsShown(filter)
        console.log("itemsFiltered:" ,itemsFiltered)

        const itemsShown = this.adjustItemsShown(
                 itemsFiltered,this.state.itemsSelected)
        this.setState({
            itemsFilter: filter,
            itemsShown: itemsShown
        }) 
    }

    handleItemsSelectedClicked = (itemsSelectedIndex) =>{
         console.log(".... handleItemsSelectedClicked")

        // remove the item from itemsSelected
        let itemsSelected = [...this.state.itemsSelected];  
        itemsSelected.splice(itemsSelectedIndex,1)

        console.log("this.state.itemsFilter",this.state.itemsFilter);
        const itemsShown = this.adjustItemsShown(
                this.freshItemsShown(this.state.itemsFilter),itemsSelected 
        )
        this.setState ({ 
            itemsSelected: itemsSelected,
            itemsShown: itemsShown
        }) 
    }

    handleItemsShownClicked = (itemsShownIndex) =>{
         console.log(".... in handleItemsShownClicked")
        let itemsShown = [...this.state.itemsShown];
        let itemsSelected = [...this.state.itemsSelected];
        itemsSelected.push(itemsShown[itemsShownIndex])
        itemsShown.splice(itemsShownIndex,1)
        this.setState({ itemsSelected: itemsSelected, itemsShown: itemsShown}  ) 
    }

    getItems = async () => {
        const response = await axios('/api/item/itemsAll')

        console.log("response of <itemsAll> : ", response);
        console.log("response.data of <itemsAll>: ", response.data);
        let itemsAll = response.data
        this.setState({ itemsAll: itemsAll, itemsShown:itemsAll })

        console.log("state.itemsAll ", this.state.itemsAll);
    };

    componentDidMount () {
        this.getItems();   // get all items of currnet_user in the begining
      }

    render() {
        return (
            <div>
                <h3 className="title">Closet</h3>
                <ItemFilter 
                    filterClicked={this.handleItemsFilterClicked}/>
                <Items 
                    itemsShown={this.state.itemsShown}
                    itemsClicked={this.handleItemsShownClicked}    />
                <SelectedItems 
                    itemsSelected={this.state.itemsSelected}
                    itemsSelectedClicked={this.handleItemsSelectedClicked} />
            </div>
        );
    }
}

export default Closet;
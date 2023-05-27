import React, {useEffect, useState} from 'react';
import "./ShoppingList.css"
import PageContainer from "../../components/PageContainer/PageContainer";
import Dashboard from "../../components/Dashboard/Dashboard";
import FilterSelector from "../../components/FilterSelector/FilterSelector";
import {useLiveQuery} from "dexie-react-hooks";
import {db} from "../../features/Database/db";

function ShoppingList(props) {
    const [sortOption, setSortOption] = useState("A-Z");
    const [sortedData, setSortedData] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const searchItems = async (query) => {
        if (query.trim() === "") {
            setSearchResults(null);
        } else {
            const results = await db.shoppinglist
                .where('name')
                .startsWithIgnoreCase(query)
                .toArray();
            setSearchResults(results);
        }
    };

    const myShoppingList = useLiveQuery(
        () => db.shoppinglist.toArray()
    );

    // DATABASE EFFECTS
    useEffect(() => {
        if (myShoppingList) {
            const sorted = [...myShoppingList].sort((a, b) => {
                if (sortOption === "type") {
                    return a.type.localeCompare(b.type);
                } else if (sortOption === "expiry") {
                    const dateA = new Date(a.expiryDate);
                    const dateB = new Date(b.expiryDate);

                    return dateA - dateB;
                } else {
                    return a.name.localeCompare(b.name);
                }
            });
            setSortedData(sorted);
        }
    }, [myShoppingList, sortOption]);

    // DATABASE FUNCTIONS
    async function addItem( name, unit, type, imagePath, amount, expiryDate ) {

        try{
            const id = await db.pantry.add( {
                name,
                unit,
                type,
                imagePath,
                amount,
                expiryDate
            } )
        } catch ( e ) {
            console.error( e )
        }
    }


    // HANDLERS
    const handleSortByAZ = () => {
        setSortOption("A-Z");
    };

    const handleSortByType = () => {
        setSortOption("type");
    };

    return (
        <div>
            <PageContainer
                title="Shopping list"
                searchPlaceHolder="items"
                onSearch={ () => {
                    console.log("Searching") } }
            >
                <div
                    id="shoppinglist-overview"
                    className="inner-container"
                >
                     <Dashboard className="dashboard">
                         <div>
                             <h3>Sort by:</h3>

                             <FilterSelector>
                                 <button onClick={ handleSortByAZ }>A-Z</button>
                                 <button onClick={ handleSortByType }>Type</button>
                             </FilterSelector>
                         </div>
                     </Dashboard>
                </div>

            </PageContainer>
        </div>
    );
}

export default ShoppingList;
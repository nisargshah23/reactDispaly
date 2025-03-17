import React, { useEffect, useState } from 'react'
import axios  from 'axios';
import "../style/display.css"

export const Display = () => {
    const [data, setData] = useState([]);
    const [tempdata, setTempData] = useState([]);
    const [searchData,setSsearchData]=useState("")
  
    useEffect(() => {
        async function fetchData() {
            try {
                let response = await axios.get("https://jsonplaceholder.typicode.com/posts");
                setData(response.data);
                setTempData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);

    function handleSearchInput(inputData){
        let tempData=[...tempdata];
        if(inputData!==""){
        setSsearchData(inputData)
        let filterData=[...tempData];
        let newdata=filterData.filter((data)=> {return(data.title.toLowerCase().indexOf(searchData.toLowerCase())!==-1)})
        setData(newdata)
    }
    else{
        setData(tempData)
        setSsearchData("")
    }
    }

    function filterdata(number){
        let tempData=[...tempdata];
        if(number!==""){
        let filterData=[...tempData];
        let newdata=filterData.filter((data)=> {return(data.userId==number)})
        setData(newdata)
    }
    else{
        setData(tempData)
        setSsearchData("")
    }
    }
    function sortByTitle(order) {
        let sortedData = [...data]; 
        if (order === "titleAsc") {
            sortedData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (order === "titleDes") {
            sortedData.sort((a, b) => b.title.localeCompare(a.title));
        }
        else if (order === "useridAsc") {
            sortedData.sort((a, b) => b.title.localeCompare(a.title));
        }
        else  if (order === "useridDes") {
            sortedData.sort((a, b) => b.title.localeCompare(a.title));
        }
        setData(sortedData);
    }

    return (
        <div>
            <h1>Cards</h1>
            <h3 style={{ display: "inline" }}>Sorting Option</h3>
            <select onChange={(e) => sortByTitle(e.target.value)}>
                <option value="">Select</option>
                <option value="titleAsc">Title ASC</option>
                <option value="titleDes">Title DESC</option> 
                <option value="titleDes">User ID DESC</option> 
                <option value="titleAsc">User ID Asc</option> 
            </select>
            <h3 style={{ display: "inline" }}>select filter Data</h3>
            <select onChange={(e) => filterdata(e.target.value)}>
                <option value="">Select</option>
                <option value="1">1</option>
                <option value="2">2</option> 
                <option value="3">3</option> 
                <option value="4">4</option> 
            </select>
            <h4 style={{ display: "inline" }}>search</h4>
            <input type="text" onChange={(e)=>handleSearchInput(e.target.value)} value={searchData}/>
            {
                data.map((d) => (
                    <div key={d.id} className='card'>
                        <div className='datadis'>
                            <h2>{d.title}</h2>
                            <p>{d.body}</p>
                            <p>User ID: {d.userId}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

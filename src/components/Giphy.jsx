import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Giphy = () => {

    const [data, setData] = useState([]);
    const [search, setsearch] = useState("");
    const [stat, setstat] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const results = await axios("https://api.giphy.com/v1/gifs/trending	", {
                params: {
                    api_key: "CrLqG5vwXmkrsb5qtdxFi2NjpxMazHIM",
                    limit: 20
                }
            });
            console.log(results);
            setData(results.data.data);
        }
        fetchData()
    },[])

    const renderGifs = () => {
        return data.map(el => {
            return (
                <div key={el.id} className="gif">
                    <img alt=''onClick={() => {setstat(el.images.fixed_height.url)
                    stat1()}} 

                    src={el.images.fixed_height.url} />
                </div>
            )
            
        });
    }
    function stat1 (){
        console.log(stat)
    }
    const handleSearchChange = event => {
        setsearch(event.target.value);
    };
    const handlesubmit = async event => {
        event.preventDefault();
        console.log(search)
        const results = await axios("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "CrLqG5vwXmkrsb5qtdxFi2NjpxMazHIM",
                q: search,
                limit: 20
            } 
        });
        setData(results.data.data);
    }
    return (
        <div align="center" className='m-2'>
            <form className='form-inline justify-content-center'>
                <input value={search} onChange={handleSearchChange} type="text" placeholder="search" className="form-lebal" />
                <button onClick={handlesubmit} type="submit" className="btn btn-primary">GO</button>
            </form>
            <div className="container gifs">{renderGifs()}</div>
        </div>
    )
}
export default Giphy
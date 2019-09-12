import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {  

  const [newsList,setNews] = useState([])
  const [filteredList, setFilterList] = useState([]);  
  const [search, setSearch] = useState('');
  const filterList = (mSearchKey) => {
    setSearch(mSearchKey)
    const matches = newsList.filter(s =>s.title.includes(mSearchKey))
    setFilterList(matches);  
  }

  useEffect(()=>{

    const fetchData = async ()=>{
        const result  = await axios('https://newsapi.org/v2/everything?q=bitcoin&from=2019-08-12&sortBy=publishedAt&apiKey=de56ce376bf249ff829cf6f95c1a0638')  
        setNews(result.data.articles);
        setFilterList(result.data.articles);
    }
    fetchData();
  },[]);

  return (
    <React.Fragment>    
      <input
        type="text"
        value={search}
        onChange={event => filterList(event.target.value)}
      />
      {filteredList.map((item,index) => (
        <div className={index%2===0?'row-container-with-background':'row-container'} key={index}>
            <h3>Author:{item.author}</h3>
            <p>Title:{item.title}</p>
        </div>
      ))}
    </React.Fragment>
  );
}
export default App;



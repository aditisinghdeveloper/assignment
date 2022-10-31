import React, {useState} from 'react'
import {useNavigate } from "react-router-dom";
import {Card, Col} from 'react-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import './SelectSourcePage.css';

function SelectSourcePage({id, name, tables,img}) {

    const [liked,setLiked] = useState(false);
    const navigate = useNavigate();

    function handleLiked(){
        setLiked(!liked);
      }

    return (
    <div >
      <div className="source-card" style={{ width:'7rem'}}>
      <Card.Img className="image" variant="top" src={img} />
      <Card.Body>
        <p className="source-name" onClick={()=> navigate("/selectTablePage", { state: { tables: tables, name: name }})}>{name}</p>
        <Col className="heart-icon" id={id} onClick={handleLiked}>{liked?<FavoriteIcon />:<FavoriteBorderSharpIcon/>}</Col>
      </Card.Body>
      </div>
    </div>
  )
}

export default SelectSourcePage
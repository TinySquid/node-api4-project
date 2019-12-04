import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from "./axiosWithAuth";
import { base_url } from './base_url';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const history = useHistory();

  const logout = () => {
    sessionStorage.removeItem('token');
    history.push('/');
  }

  const reorderColors = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    axiosWithAuth()
      .get(`${base_url}/api/colors`)
      .then(response => {
        setColorList(response.data);
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} reorderColors={reorderColors} logout={logout} />
      <Bubbles colors={colorList} refresh={refresh} />
    </>
  );
};

export default BubblePage;

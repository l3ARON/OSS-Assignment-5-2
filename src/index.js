import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ShowList from './component/ShowList';
import UpdatePage from './component/UpdatePage';
import AddPage from './component/AddPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Router>
    <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/list" element={<ShowList />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/add" element={<AddPage />} />
    </Routes>
</Router>
);

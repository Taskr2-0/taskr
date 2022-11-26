import React from "react";
import { createRoot } from "react-dom/client";
import App from './views/App.js';
import './styles.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <App />
);
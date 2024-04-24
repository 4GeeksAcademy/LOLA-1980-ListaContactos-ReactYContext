import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<div className="text-center mt-5">
		<Link to="/AddContact">
			<p>HOLA</p>
		</Link>
		<Link to="/Contact">
			<p>Lista de Contactos</p>
		</Link>
		<Link to="/EditContact">
			<button className='btn btn-success'>Go to Edit Contact</button>
		</Link>
	</div>
);

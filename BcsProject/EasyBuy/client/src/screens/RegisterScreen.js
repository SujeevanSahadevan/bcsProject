import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import FormContainer from "../components/formContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState("");

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split("=")[1] : "/";

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Password do not match");
		} else {
			//We have to dispatch Register here
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Sign up</h1>
			{message && <Message variant="danger">{message}</Message>}

			{error && <Message variant="danger">{error}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="name"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId="email">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder=" Email Address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder=" Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId="confirmPassword">
					<Form.Label>confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Already have an Account ?
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						{" "}
						Log In
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;

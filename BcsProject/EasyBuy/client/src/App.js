import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import UserEditScreen from "./screens/UserEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

///:id is a place holder and it can be anything as it will be looked at by the React router

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route exact path="/login" component={LoginScreen} />
					<Route path="/register" component={RegisterScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route exact path="/shipping" component={ShippingScreen} />
					<Route exact path="/payment" component={PaymentScreen} />
					<Route exact path="/placeorder" component={PlaceOrderScreen} />
					<Route exact path="/order/:id" component={OrderScreen} />

					<Route exact path="/product/:id" component={ProductScreen} />
					<Route exact path="/cart/:id?" component={CartScreen} />
					<Route exact path="/admin/userlist" component={UserListScreen} />
					<Route
						exact
						path="/admin/productlist"
						component={ProductListScreen}
					/>

					<Route
						exact
						path="/admin/productlist/:pageNumber"
						component={ProductListScreen}
					/>

					<Route exact path="/admin/user/:id/edit" component={UserEditScreen} />
					<Route
						exact
						path="/admin/product/:id/edit"
						component={ProductEditScreen}
					/>

					<Route exact path="/admin/orderlist" component={OrderListScreen} />

					<Route exact path="/" component={HomeScreen} />
					<Route path="/search/:keyword" component={HomeScreen} exact />
					<Route path="/page/:pageNumber" component={HomeScreen} />

					<Route
						exact
						path="/search/:keyword/page/:pageNumber"
						component={HomeScreen}
					/>

					{/* ? means id is optional */}
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;

import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((b) => (
					<LinkContainer
						key={b + 1}
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${b + 1}`
									: `/page/${b + 1}`
								: `/admin/productlist/${b + 1}`
						}>
						<Pagination.Item active={b + 1 === page}>{b + 1}</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
};

export default Paginate;

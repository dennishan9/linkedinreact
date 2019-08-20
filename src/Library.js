import React from 'react'
import PropTypes from 'prop-types'
import { Book } from './Book'
import { CheckingDate } from './CheckingDate'
import { Hiring } from './Hiring'
import { NotHiring } from './NotHiring'
import { Winner } from './Winner'
import { NotWinner } from './NotWinner'

class Library extends React.Component {

	static defaultProps = {
		books: [
			{ "title": "Tahoe Tales", "author": "Chet Whitley", "pages": 1000 }
		]
	}

	state = {
		open: true,
		freeBookmark: false,
		hiring: true,
		data: [],
		loading: false,
		winner: false,
		bgColor: 'blue'
	}

	componentDidMount() {
		this.setState({ loading: true })
		fetch('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
			.then(data => data.json())
			.then(data => this.setState({ data, loading: false }))

		if (CheckingDate() === 2019) {
			this.setState({
				hiring: false,
				winner: false
			});
		} else {
			this.setState({
				hiring: true,
				winner: true
			});
		}
	}

	componentDidUpdate() {
		console.log("The component just updated")
	}

	toggleOpenClosed = () => {
		this.setState(prevState => ({
			open: !prevState.open
		}))
	}

	toggleBgColor = () => {
		this.state.bgColor !== 'blue' ? this.setState({ bgColor: 'blue' }) : this.setState({ bgColor: 'notblue' })

		const overallDiv = document.querySelector('.overallDiv')
		this.state.bgColor === 'blue' ? overallDiv.style.backgroundColor = 'blue' : overallDiv.style.backgroundColor = '#ccc'
	}

	render() {
		const { books } = this.props
		return (
			<div className="overallDiv">
				{this.state.hiring ? <Hiring /> : <NotHiring />}
				{this.state.winner ? <Winner /> : <NotWinner />}
				{this.state.loading
					? "loading..."
					: <div>
						{this.state.data.map(product => {
							return (
								<div key={product.id}>
									<h3>Library Product of the Week!</h3>
									<h4>{product.name}</h4>
									<img alt={product.name} src={product.image} height={100} />
								</div>
							)
						})}

					</div>
				}
				<h1>The library is {this.state.open ? 'open' : 'closed'}</h1>
				<button onClick={this.toggleOpenClosed}>Change</button><br />
				<button onClick={this.toggleBgColor}>bg color</button>
				{
					books.map(
						(book, i) =>
							<Book
								key={i}
								title={book.title}
								author={book.author}
								pages={book.pages}
								freeBookmark={this.state.freeBookmark} />
					)
				}
			</div >
		)
	}
}

Library.propTypes = {
	books: PropTypes.array
}

Book.propTypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	pages: PropTypes.number,
	freeBookmark: PropTypes.bool
}

export default Library
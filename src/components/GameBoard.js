import React, { Component } from 'react';
import className from 'classnames';
import './GameBoard.scss';

class GameBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardNumbers: [],
            selectedCards: [],
            selectedCardIndex: [],
            hasMatch: false,
        };
    }

    componentDidMount() {
        this.setState({
            cardNumbers: [1, 2, 1, 2],
        });
    }

    componentWillUnmount() {
        this.setState({
            selectedCards: [],
            selectedCardIndex: [],
        });
    }

    handleCardClick = (cardNumber, cardIndex) => {
        const { selectedCards, selectedCardIndex } = this.state;
        const shouldSetSelectedCards =
            selectedCards.length < 2 && selectedCardIndex.length < 2;

        this.setState(
            (prevState) => ({
                selectedCards: [...prevState.selectedCards, cardNumber],
                selectedCardIndex: [...prevState.selectedCardIndex, cardIndex],
            }),
            () =>
                this.setState({
                    hasMatch:
                        this.state.selectedCards.length >= 2 &&
                        this.state.selectedCards[0] ===
                            this.state.selectedCards[1],
                })
        );

        if (!shouldSetSelectedCards) {
            this.setState({
                selectedCards: [],
                selectedCardIndex: [],
            });
        }
    };

    render() {
        const { cardNumbers, selectedCardIndex, hasMatch } = this.state;
        const cards = cardNumbers.map((cardNumber, cardIndex) => {
            const cardClasses = className('card', {
                'card--selected': selectedCardIndex.includes(cardIndex),
            });

            return (
                <div
                    className={cardClasses}
                    key={cardIndex}
                    onClick={this.handleCardClick.bind(
                        this,
                        cardNumber,
                        cardIndex
                    )}
                >
                    {cardNumber}
                </div>
            );
        });
        const confirmation = hasMatch
            ? 'They match!'
            : 'Not a match, try again.';

        return (
            <div className="board">
                {cards}
                <div className="confirmation">{confirmation}</div>
            </div>
        );
    }
}

export default GameBoard;

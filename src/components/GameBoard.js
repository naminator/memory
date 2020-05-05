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
            matchedCardIndex: [],
            hasMatch: false,
        };
    }

    componentDidMount() {
        const cardInts = [];
        let cardSets = [];
        let cardSetRandom = [];

        for (let index = 0; index < 5; index++) {
            cardInts.push(index + 1);
        }

        cardSets = [...cardInts, ...cardInts];

        for (let i = cardSets.length - 1; i > 0; i--) {
            const randomInt = Math.floor(Math.random() * i);
            const tempCardSet = cardSets[i];
            cardSets[i] = cardSets[randomInt];
            cardSets[randomInt] = tempCardSet;
        }

        this.setState({
            cardNumbers: [...cardSets],
        });
    }

    componentWillUnmount() {
        this.setState({
            selectedCards: [],
            selectedCardIndex: [],
            matchedCardIndex: [],
        });
    }

    handleCardClick = (cardNumber, cardIndex, matchedCardClicked) => {
        const {
            selectedCards,
            selectedCardIndex,
            matchedCardIndex,
        } = this.state;

        if (matchedCardClicked) {
            return;
        }

        const shouldSetSelectedCards =
            selectedCards.length < 2 && selectedCardIndex.length < 2;

        this.setState(
            (prevState) => ({
                selectedCards: [...prevState.selectedCards, cardNumber],
                selectedCardIndex: [...prevState.selectedCardIndex, cardIndex],
            }),
            () => {
                if (
                    this.state.selectedCards[0] === this.state.selectedCards[1]
                ) {
                    this.setState({
                        matchedCardIndex: [
                            ...matchedCardIndex,
                            ...this.state.selectedCardIndex,
                        ],
                        hasMatch: this.state.selectedCards.length >= 2,
                    });
                }
            }
        );

        if (!shouldSetSelectedCards) {
            this.setState({
                selectedCards: [],
                selectedCardIndex: [],
            });
        }
    };

    render() {
        const {
            cardNumbers,
            selectedCardIndex,
            matchedCardIndex,
            hasMatch,
        } = this.state;
        const cards = cardNumbers.map((cardNumber, cardIndex) => {
            const showSelected = selectedCardIndex.includes(cardIndex);
            const showMatched = matchedCardIndex.includes(cardIndex);
            const showCard = showSelected || showMatched;
            const cardClasses = className('card', {
                'card--selected': showSelected,
                'card--matched': showMatched,
            });

            return (
                <div
                    className={cardClasses}
                    key={cardIndex}
                    onClick={this.handleCardClick.bind(
                        this,
                        cardNumber,
                        cardIndex,
                        showMatched
                    )}
                >
                    {showCard && cardNumber}
                </div>
            );
        });
        const confirmation = hasMatch
            ? 'They match!'
            : 'Not a match, try again.';

        return (
            <div className="board">
                <div className="cards">{cards}</div>
                <p className="confirmation">{confirmation}</p>
            </div>
        );
    }
}

export default GameBoard;

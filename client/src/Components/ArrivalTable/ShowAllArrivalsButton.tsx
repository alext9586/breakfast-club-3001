import * as React from 'react';

export class ShowAllArrivalsButton extends React.Component<{}, {}> {
    constructor(props: Readonly<{}>) {
        super(props);
    }

    render() {
        return (
            <a className="btn btn-secondary btn-block" href="/arrivals">Show All Arrivals</a>
        );
    }
}

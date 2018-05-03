import * as React from 'react';

export class AboutPageContainer extends React.Component {
    render(): JSX.Element {
        return(
            <div>
                <a className="btn btn-secondary" href="/">Home</a>
                <h2>About Breakfast Club</h2>
                <p>
                    What is Breakfast Club, you say? Breakfast Club is a program
                    that we run here where you get your name on a list (no, not that list!
                    Townley’s Laundry Group signup is different thing) and every Friday (excluding
                    holidays) one person from the list will bring breakfast for the others on the list.
                    The list rotates every week.
                </p>

                <p>
                    In the days of yore, people brought a home-cooked breakfast. But today you’re
                    probably pressed for time so you can bring something store-bought such as breakfast
                    tacos, breakfast sandwiches, chicken biscuits, kolaches, or quiches.
                </p>

                <p>
                    The following items won’t win you any points: donuts, bagels, pastries, cereal,
                    and that BBQ place that shall not be named. Bagels and pastries are only OK if
                    it is part of a sandwich or is topped with meat.
                </p>

                <p>
                    So what happens if you can’t fulfill your week? Since the announcement goes out on
                    Thursdays, just make an announcement on the Slack channel to find an upcoming member
                    to cover your shift.
                </p>

                <p>
                    What if you don’t want to participate anymore? Well, you’ve got to provide breakfast
                    at least once after signing up before you can drop out. If you sign up again after
                    dropping out, you gotta provide breakfast at least once again (kinda like Columbia
                    House except I don’t make any money off this). You must submit your dropping-out notice
                    in triplicate with a cover page and green nail polish by 3PM (just kidding, but you
                    do need to submit your dropping-out in writing in the Slack channel or email the
                    Cruise Director).
                </p>
                <p>
                    This all sounds great, where do I sign up? Just send an email or a private message on
                    Slack to the Cruise Director with your name and Slack ID to get started!
                </p>
            </div>
        );
    }
}
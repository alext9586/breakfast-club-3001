import * as React from 'react';
import { CopyToClipboardService } from 'src/Services/CopyToClipboardService';

interface ICopyButtonProps {
    elementId: string;
}

export class CopyButton extends React.Component<ICopyButtonProps, {}> {
    constructor(props: ICopyButtonProps) {
        super(props);
        this.copyClick = this.copyClick.bind(this);
    }

    private copyClick() {
        let el = document.getElementById(this.props.elementId);
        if(el) {
            window.getSelection().selectAllChildren(el);
            CopyToClipboardService.copySelected();
        }
    }

    render() {
        return(
            <button type="button" className="btn btn-primary btn-sm" onClick={(e) => this.copyClick()}>
                Copy
            </button>
            );
    }
}
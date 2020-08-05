import React, {PureComponent} from 'react';
import {TextLine} from '@baidu/one-ui-pro';
import '@baidu/one-ui-pro/lib/index.css';

class FirstDemo extends PureComponent {
    render() {
        const textLineProps = {
            title: '关键词',
            maxLine: 10,
            maxLen: 5,
            minLine: 3,
            defaultValue: []
        };
        return (
            <div>
                <div>默认多行文本输入框-非受控</div>
                <br />
                <TextLine {...textLineProps}/>
                <br />
                <br />
            </div>
        );
    }
}

class SecondDemo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: []
        };
    }
    onChange = e => {
        this.setState({value: e.value})
    }
    render() {
        const textLineProps = {
            title: '关键词',
            maxLine: 10,
            maxLen: 5,
            minLine: 3,
            value: this.state.value,
            onChange: this.onChange
        };
        return (
            <div>
                <div>多行文本输入框，有标题、最大输入行数10、最小输入行数3、单行最多输入5个字符</div>
                <br />
                <TextLine {...textLineProps} />
            </div>
        );
    }
}

export default () => {
    return (
        <div>
            <FirstDemo />
            <SecondDemo />
        </div>
    )
};
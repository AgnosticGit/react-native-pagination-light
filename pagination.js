import React from 'react';
import styles from './styles'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            page_2: 2,
            page_3: 3,
            vPage_2: false,
            vPage_3: false,
            fDots: false,
            sDots: false,
            vPagination: false,
            color_1: true,
            color_2: false,
            color_3: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.array !== prevProps.array)
            this.whatToShow();
    }

    whereToGo(action) {
        switch (action) {
            case 'back':
                this.setOffset(this.state.offset - this.props.limit, () => this.Rules('back'));
                break;
            case 'forward':
                this.setOffset(this.state.offset + this.props.limit, () => this.Rules('forward'));
        }

        if (Math.ceil(this.props.array.length / this.props.limit) < 4) {
            return this.onMove(action)
        }
        this.onMove_2(action)

    }

    onMove(action) {
        switch (action) {
            case 1:
                this.setOffset(0, () => this.Rules());
                break;
            case 2:
                this.setOffset(this.props.limit, () => this.Rules());
                break;
            case 3:
                this.setOffset(this.props.limit * 2, () => this.Rules());
        }
    }

    onMove_2(action) {
        let x = Math.ceil(this.props.array.length / this.props.limit) * this.props.limit - this.props.limit;
        switch (action) {
            case 1:
                this.setOffset(null, () => this.Rules(), {offset: 0, page_2: 2});
                break;
            case 2:
                if (this.state.offset === 0)
                    this.setOffset(this.props.limit, () => this.Rules());
                if (this.state.offset === x)
                    this.setOffset(null, () => this.Rules(), {offset: this.props.limit * (this.state.page_2 - 1)});
                break;
            case 3:
                this.setOffset(null, () => this.Rules(), {
                    offset: x,
                    page_2: Math.ceil(this.props.array.length / this.props.limit) - 1
                });
        }
    }

    setOffset(offset, callback, params) {
        if (params)
            this.setState(params, () => {
                this.props.offset(this.state.offset);
                if (callback)
                    callback();
            });
        else
            this.setState({offset: offset}, () => {
                this.props.offset(this.state.offset);
                if (callback)
                    callback();
            });
    }

    Rules(action) {
        if (this.state.offset < 0)
            this.setOffset(0);
        if (this.state.offset > this.props.array.length - 1)
            this.setOffset(this.state.offset - this.props.limit);

        if (Math.ceil(this.props.array.length / this.props.limit) > 3 && action === 'back' && this.state.offset < Math.ceil(this.props.array.length / this.props.limit) * this.props.limit - this.props.limit * 2)
            this.setState({page_2: this.state.page_2 - 1}, () => {
                if (this.state.page_2 < 2)
                    this.setState({page_2: this.state.page_2 + 1});
                this.Rules()
            });

        if (Math.ceil(this.props.array.length / this.props.limit) > 3 && action === 'forward' && this.state.offset > this.props.limit)
            this.setState({page_2: this.state.page_2 + 1}, () => {
                if (this.state.page_2 === Math.ceil(this.props.array.length / this.props.limit))
                    this.setState({page_2: this.state.page_2 - 1});
                this.Rules()
            });

        if (this.state.page_2 > 2 && Math.ceil(this.props.array.length / this.props.limit) > 3) {
            this.setState({fDots: true});
        } else {
            this.setState({fDots: false});
        }

        if (this.state.page_2 >= Math.ceil(this.props.array.length / this.props.limit) - 1) {
            this.setState({sDots: false});
        } else {
            this.setState({sDots: true});
        }

        if (Math.ceil(this.props.array.length / this.props.limit) < 2)
            return this.setState({color_1: true, color_2: false, color_3: false});


        if (Math.ceil(this.props.array.length / this.props.limit) < 4) {
            if (this.state.offset === 0)
                this.setState({color_1: true, color_2: false, color_3: false});
            if (this.state.offset >= this.props.limit)
                this.setState({color_1: false, color_2: true, color_3: false});
            if (this.state.offset >= Math.ceil(this.props.array.length / this.props.limit) * this.props.limit - this.props.limit)
                this.setState({color_1: false, color_2: false, color_3: true});
            if (this.state.offset >= this.props.limit && Math.ceil(this.props.array.length / this.props.limit) === 2)
                this.setState({color_1: false, color_2: true, color_3: false});

        } else {
            if (this.state.offset === 0)
                this.setState({color_1: true, color_2: false, color_3: false});
            if (this.state.offset > 0 && this.state.offset < this.props.array.length - this.props.limit)
                this.setState({color_1: false, color_2: true, color_3: false});
            if (this.state.offset === Math.ceil(this.props.array.length / this.props.limit) * this.props.limit - this.props.limit)
                this.setState({color_1: false, color_2: false, color_3: true});
        }

    }

    whatToShow() {
        switch (Math.ceil(this.props.array.length / this.props.limit)) {
            case 1:
                break;
            case 2:
                this.setState({vPage_2: true});
                break;
            case 3:
                this.setState({vPage_2: true, vPage_3: true, sDots: false});
                break;
            default:
                this.setState({vPage_2: true, vPage_3: true, sDots: true});
        }
    }


    render() {
        return (
            <View>
                <View style={[styles.main, this.props.style.main]}>
                    <TouchableOpacity
                        style={[styles.move, this.props.style.move]}
                        onPress={() => {
                            this.whereToGo('back');
                        }}>
                        <Text>Назад</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.pages, this.props.style.pages]}
                        onPress={() => {
                            this.whereToGo(1);
                        }}>
                        <Text
                            style={this.state.color_1 ? [styles.colorText, this.props.style.colorText] : null}>1</Text>
                    </TouchableOpacity>

                    {this.state.fDots ? <Text style={styles.dots}>...</Text> : null}

                    {this.state.vPage_2 ? <TouchableOpacity
                        style={[styles.pages, this.props.style.pages]}
                        onPress={() => {
                            this.whereToGo(2);
                        }}>
                        <Text style={this.state.color_2 ? [styles.colorText, this.props.style.colorText] : null}>{this.state.page_2}</Text>
                    </TouchableOpacity> : null}

                    {this.state.sDots ? <Text style={styles.dots}>...</Text> : null}

                    {this.state.vPage_3 ? <TouchableOpacity
                        style={[styles.pages, this.props.style.pages]}
                        onPress={() => {
                            this.whereToGo(3);
                        }}>
                        <Text
                            style={this.state.color_3 ? [styles.colorText, this.props.style.colorText] : null}>{Math.ceil(this.props.array.length / this.props.limit)}</Text>
                    </TouchableOpacity> : null}

                    <TouchableOpacity
                        style={[styles.move, this.props.style.move]}
                        onPress={() => {
                            this.whereToGo('forward')
                        }}>
                        <Text>Вперед</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )

    }
}

Pagination.defaultProps = {
    array: [],
    limit: {},
    style: {}
};


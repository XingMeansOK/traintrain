import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Icon from 'react-native-vector-icons/Ionicons';
import { MAXSELECTEDPLAN } from './constant';

@inject("store") @observer
export default class PlanCard extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false, selected: false};
    this.icon = null;
  }
  handlePress = () => {
    this.setState({expanded: !this.state.expanded})
  }
  handleSelect = () => {
    if(!this.state.selected) {
      if(this.props.store.selectedPlan<MAXSELECTEDPLAN) {
        this.props.store.selectedPlan++;
        this.setState({selected: !this.state.selected});
      } else {
        // Alert('过分了奧');
      }

    } else {
      this.props.store.selectedPlan--;
      this.setState({selected: !this.state.selected});
    }

  }

  render() {
    const cardStyle = this.state.expanded? 'bigcard':'card';
    const iconName = this.state.selected? 'md-checkmark':'md-expand';
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View style={styles[cardStyle]}>
          <TouchableOpacity onPress={this.handleSelect}>
            <Icon name={iconName} style={styles.actionButtonIcon} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({

  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    height: 150,
    padding: 15,
  },
  bigcard: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    height: 250,
    padding: 15,
  },
  actionButtonIcon: {
    fontSize: 40,
    color: 'green',
  },
});

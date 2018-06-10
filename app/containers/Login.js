import React, {Component} from 'react'
import {StyleSheet, View, Text, ActivityIndicator, TextInput, ScrollView} from 'react-native'
import {connect} from 'react-redux'
// import Button from 'antd-mobile-rn/lib/button';

import {Button, InputItem, List, WhiteSpace, WingBlank} from 'antd-mobile-rn';


import {Touchable} from '../components'

import {createAction, NavigationActions} from '../utils'

const mapStateToProps = ({ login: { username } }) => ({ username })

@connect(mapStateToProps)
class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  }

  onLogin = () => {
    this.props.dispatch(createAction('app/login')())
  }

  onClose = () => {
    this.props.dispatch(NavigationActions.back())
  }

  _onUsernameChange = username => this.props.dispatch({
    type: 'login/updateState',
    payload: {
      username,
    }
  })

  render() {
    const {fetching, username, password} = this.props
    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator />
        ) : (
          <View>

            <WingBlank>
              <List >

                <InputItem
                  clear
                  value={username}
                  onChange={this._onUsernameChange}
                  placeholder="text"
                >
                  账号
                </InputItem>

                <InputItem
                  clear
                  type="password"
                  value={password}
                  onChange={(value) => {
                    this.setState({
                      password: value,
                    });
                  }}
                  placeholder="password"
                >
                  密码
                </InputItem>

              </List>
              <Button style={{marginTop:20}} onClick={this.onLogin} >登录</Button>
            </WingBlank>
          </View>

        )}
        {!fetching && (
          <Touchable style={styles.close} text="Close" onPress={this.onClose}>
            <Text>Close</Text>
          </Touchable>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 20,
    top: 40,
  },
})

export default Login

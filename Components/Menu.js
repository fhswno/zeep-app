import React from "react";
import styled from 'styled-components';
import { Animated, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import MenuItem from "./MenuItem";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action };
};

function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () => 
      dispatch({
        type: "CLOSE_MENU"
      })
  }
}

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  z-index: 100;
  border-radius: 10px;
  overflow: hidden;
`;

const Cover = styled.View`
  height: 142px;
  background: black;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View`
  height: ${windowHeight || 900}px;
  background: #f0f3f5;
  padding: 50px;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  padding-top: 50px;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
  margin-bottom: 20px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const windowHeight = Dimensions.get('window').height;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

class Menu extends React.Component {
  state = {
    top: new Animated.Value(900)
  };

  componentDidMount() {
    this.toggleMenu();
  };

  componentDidUpdate() {
    this.toggleMenu();
  };

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        toValue: 54,
        useNativeDriver: false,
      }).start();
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: windowHeight || 900,
        useNativeDriver: false,
      }).start();
    }

    StatusBar.setBarStyle("dark-content", true);
  };

  render () {
    return (
      <AnimatedContainer style={{ top: this.state.top  }}>
        <Cover>
          <Image source={require("../assets/background2.jpg")}/>
          <Title>Salman Hussain</Title>
          <Subtitle>Founder of Zeep</Subtitle>
        </Cover>
        <TouchableOpacity
          onPress={this.props.closeMenu}
          style={{ 
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            zIndex: 1,
          }}
        >
          <CloseView>
            <Ionicons name="ios-close" size={44} color="#546bfb" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Menu);

const items = [
  {
    icon: "ios-settings",
    title: "Preferences",
    text: "settings"
  },
  {
    icon: "ios-card",
    title: "Subscriptions",
    text: "payments",
  },
  {
    icon: "ios-compass",
    title: "Zeep Unpacked",
    text: "our homemade podcast!",
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "see you soon!",
  }
];

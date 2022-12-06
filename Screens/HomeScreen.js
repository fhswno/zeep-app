import React from 'react';
import { Animated, ScrollView, SafeAreaView, View, TouchableOpacity, Easing, StatusBar } from 'react-native';
import styled from 'styled-components';
import Card from '../Components/Card';
import { NotificationIcon } from '../Components/Icons';
import Logo from '../Components/Logo';
import Course from '../Components/Course';
import Menu from '../Components/Menu';
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { action: state.action };
};

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch({
      type: "OPEN_MENU"
    })
  }
}

// const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Container = styled.View`
  background: #f0f3f5;
  flex: 1;
  border-radius: 10px;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 20px;
  padding-left: 80px;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  top: 0;
  left: 0;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 25px;
  text-transform: uppercase;
`;

class HomeScreen extends React.Component {

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

  componentDidUpdate() {
    this.toggleMenu();
  };

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();
    }

    if (this.props.action == "closeMenu") {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
        useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
        useNativeDriver: false,
      })
    }

    StatusBar.setBarStyle("dark-content", true);
  };

  render () {
    return (
      // <AnimatedContainer style={{ transform: [{ scale: this.state.scale }] }}>
      <RootView>
        <Menu />
        <Container>
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                <TouchableOpacity 
                  onPress={this.props.openMenu} 
                  style={{ position: 'absolute' }}
                >
                  <Avatar source={require("../assets/avatar.jpg")} />
                </TouchableOpacity>
                <Title>Welcome back,</Title>
                <Name>Salman</Name>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {topics.map((topic, index) => (
                  <Logo key={index} image={topic.image} text={topic.text} />
                ))}
              </ScrollView>
              <Subtitle>Continue Listening</Subtitle>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    title={card.title}
                    image={card.image}
                    subtitle={card.subtitle}
                    caption={card.caption}
                    logo={card.logo}
                  />
                ))}
              </ScrollView>
              <Subtitle>Popular Podcasts</Subtitle>
              <View style={{ alignItems: "center", paddingTop: 10 }}>
                {courses.map((course, index) => (
                  <Course
                    key={index}
                    title={course.title}
                    image={course.image}
                    subtitle={course.subtitle}
                    caption={course.caption}
                    author={course.author}
                    logo={course.logo}
                    avatar={course.avatar}
                  />
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </Container>
      </RootView>
      // </AnimatedContainer>
    );
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)
(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const topics = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Crypto"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "NFTs"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Trading"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "IPOs"
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Green Stocks"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "ESG"
  },
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 episodes",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Styled Components",
    image: require("../assets/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 episodes",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Props and Icons",
    image: require("../assets/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 episodes",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 episodes",
    logo: require("../assets/logo-react.png")
  },
];

const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 episodes",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design and interactive prototype"
  },
  {
    title: "React for Designers",
    subtitle: "12 episodes",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn to design and code a React site"
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 episodes",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app"
  },
  {
    title: "Design System in Figma",
    subtitle: "10 episodes",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool"
  }
];
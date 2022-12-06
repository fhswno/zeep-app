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
                  <Avatar source={require("../assets/avatar2.png")} />
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
                {promoted.map((item, index) => (
                  <Card
                    key={index}
                    title={item.title}
                    image={item.image}
                    subtitle={item.subtitle}
                    caption={item.caption}
                    logo={item.logo}
                  />
                ))}
              </ScrollView>
              <Subtitle>Popular Podcasts</Subtitle>
              <View style={{ alignItems: "center", paddingTop: 10 }}>
                {podcasts.map((podcast, index) => (
                  <Course
                    key={index}
                    title={podcast.title}
                    image={podcast.image}
                    subtitle={podcast.subtitle}
                    caption={podcast.caption}
                    author={podcast.author}
                    logo={podcast.logo}
                    avatar={podcast.avatar}
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
    image: require("../assets/logo-bitcoin.png"),
    text: "Crypto"
  },
  {
    image: require("../assets/logo-nft1.png"),
    text: "NFTs"
  },
  {
    image: require("../assets/logo-pound1.png"),
    text: "Trading"
  },
  {
    image: require("../assets/logo-rivian1.png"),
    text: "IPOs"
  },
  {
    image: require("../assets/logo-leave1.png"),
    text: "Green Stocks"
  },
  {
    image: require("../assets/logo-earth1.png"),
    text: "ESG"
  },
];

const promoted = [
  {
    title: "Understanding Bitcoin",
    image: require("../assets/background11.jpg"),
    subtitle: "Bitcoin",
    caption: "1 of 12 episodes",
    logo: require("../assets/logo-bitcoin.png")
  },
  {
    title: "Decentralised, Unregulated",
    image: require("../assets/background12.jpg"),
    subtitle: "Bitcoin",
    caption: "2 of 12 episodes",
    logo: require("../assets/logo-bitcoin.png")
  },
  {
    title: "More Liquidity, More Problems",
    image: require("../assets/background13.jpg"),
    subtitle: "Bitcoin",
    caption: "3 of 12 episodes",
    logo: require("../assets/logo-bitcoin.png")
  },
  {
    title: "El Salvador adopts it.",
    image: require("../assets/background14.jpg"),
    subtitle: "Bitcoin",
    caption: "4 of 12 episodes",
    logo: require("../assets/logo-bitcoin.png")
  },
];

const podcasts = [
  {
    title: "FTX Crash: the End of Crypto?",
    subtitle: "7 episodes",
    image: require("../assets/background12.jpg"),
    logo: require("../assets/logo-ftx1.png"),
    author: "David Ohayon",
    avatar: require("../assets/avatar2.png"),
    caption: "Discussing the future of Crypto"
  },
  {
    title: "NFTs for the Health Industry",
    subtitle: "4 episodes",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-nft1.png"),
    author: "David Ohayon",
    avatar: require("../assets/avatar2.png"),
    caption: "NFT devs explain how NFTs will disrupt Healthcare"
  },
  {
    title: "ESG Talks with Elon Musk",
    subtitle: "6 episodes",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-earth1.png"),
    author: "Elon Musk",
    avatar: require("../assets/avatar2.png"),
    caption: "Relevant or Bullshit? Let Elon Musk speak his mind"
  },
  {
    title: "2023 Top IPOs to Watch",
    subtitle: "10 episodes",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-rivian1.png"),
    author: "David Ohayon",
    avatar: require("../assets/avatar2.png"),
    caption:
      "With a looming recession, 2023 could be a fantastic year for IPOs"
  }
];
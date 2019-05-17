import React, { Component } from 'react';
import { ScrollView, Text, Image, View, Dimensions, TouchableNativeFeedback, Linking, Platform, TouchableHighlight } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import HTML from 'react-native-render-html';

import { styles } from './styles';

const ImageWidth = Dimensions.get('window').width;
const ImageHeight = 250;
export default class Details extends Component{

  // Used in slideshow Carousel component
  renderPage(image, index) {
    return (
        <View key={index}>
            <Image style={{ width: ImageWidth, height: ImageHeight, resizeMode: 'contain' }} source={{ uri: image }} />
        </View>
    );
  }

  render(){
    // adds image urls to array
    var slideshow = [];
    slideshow.push(this.props.data.logo)
    for (var i = 1; i <= 5; i++) {
      this.props.data["picture" + i] != "" ? slideshow.push(this.props.data["picture" + i]) : null ;
    }

    return(
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
          <Carousel autoplay={false} loop index={0} pageSize={ImageWidth}>
            {slideshow.map((image, index) => this.renderPage(image, index))}
          </Carousel>
        </View>
        
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsTitle}>{this.props.data.name}</Text>
          { this.props.data.description != '' ?
            <HTML html={this.props.data.description} baseFontStyle={{fontFamily: 'Akrobat-SemiBold'}} imagesMaxWidth={Dimensions.get('window').width} />
          : null }
        </View>
        
        { this.props.data.website != "" ? Platform.OS == "android" ?
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(85, 75, 185, .24)')}>
            <View style={styles.detailsWebsiteWrapper}>
              <Text style={styles.detailsWebsiteText} onPress={() => Linking.openURL(this.props.data.website)}>WEBSITE</Text>
            </View>
          </TouchableNativeFeedback>
        : 
          <TouchableHighlight underlayColor={'rgba(85, 75, 185, .24)'}>
              <View style={styles.detailsWebsiteWrapper}>
                <Text style={styles.detailsWebsiteText} onPress={() => Linking.openURL(this.props.data.website)}>WEBSITE</Text>
              </View>
          </TouchableHighlight>
        : null}
      </ScrollView>
    );
  }
}
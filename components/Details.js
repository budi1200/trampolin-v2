import React, { Component } from 'react';
import { ScrollView, Text, Image, View, Dimensions, Linking } from 'react-native';
import Carousel from 'react-native-banner-carousel';
import HTML from 'react-native-render-html';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import DynamicButton from './DynamicButton';
import { openPersonDetails } from './customFunctions';
import { styles, primaryColor } from './styles';

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
    const startup = this.props.data;

    // adds image urls to array
    var slideshow = [];
    slideshow.push(this.props.data.logo)
    for (var i = 1; i <= 5; i++) {
      this.props.data["picture" + i] != "" ? slideshow.push(this.props.data["picture" + i]) : null ;
    }

    return(
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center'}}>
          <Carousel autoplay={false} loop index={0} pageSize={ImageWidth} activePageIndicatorStyle={{backgroundColor: primaryColor}}>
            {slideshow.map((image, index) => this.renderPage(image, index))}
          </Carousel>
        </View>
        
        <View style={styles.detailsWrapper}>
          <Text style={styles.detailsTitle}>{this.props.data.name}</Text>
          <View style={{paddingLeft: 2}}>
            { this.props.data.description != '' ?
              <HTML html={this.props.data.description} baseFontStyle={{fontFamily: 'Akrobat-Regular', fontSize: 16, color: 'black'}} imagesMaxWidth={Dimensions.get('window').width} />
            : null }
          </View>
        </View>

        <View style={{marginTop: 20, marginLeft: 16, marginRight: 16}}>
          <Text style={styles.detailsMembersTitle}>Team Members</Text>
          {startup.members.map((member, index) => {
            return(
              <DynamicButton key={index + member.first_name + member.last_name} style={styles.memberEntryWrapper} onPress={() => openPersonDetails(member, "Startups")}>
                <View style={styles.memberEntryInnerWrapper}>
                  <Image style={styles.memberEntryThumbnail} source={{ uri: member.picture }} />
                  <View style={styles.memberEntryDetails}>
                    <Text style={styles.memberEntryName}>{member.first_name + " " + member.last_name}</Text>
                    <Text style={styles.memberEntryPosition}>{member.position}</Text>
                  </View>
                  <MaterialCommunityIcons name={'chevron-right'} size={24} color={primaryColor}/>
                </View>           
              </DynamicButton>
            )
          })}
        </View>
        
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 14, marginTop: 10}}>
          <DynamicButton style={styles.detailsWebsiteWrapper} borderRadius={styles.detailsWebsiteWrapper.borderRadius} onPress={() => Linking.openURL(this.props.data.website)}>
            <View>
              <Text style={styles.detailsWebsiteText}>WEBSITE</Text>
            </View> 
          </DynamicButton>
        </View>

      </ScrollView>
    );
  }
}
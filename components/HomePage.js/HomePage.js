import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput
} from "react-native";
import Icon from "../../assets/heart";
import User from "../../assets/User";
import Bell from "../../assets/Bell";
import Slider2 from "./Slider2";
import Home from "../../assets/Home";
import Slider from "./Slider";
import filter from 'lodash.filter';
import Location from "../../assets/Location";
import { style } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import Footer from "./Footer";
import TopBar from "./TopBar";
// import { TextInput } from "react-native-paper";
import { styles } from "react-native-image-slider-banner/src/style";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const DonorButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={home.donorButtonContainer}>
    <Text style={home.donorButtonText}>{title}</Text>
  </TouchableOpacity>
);
const data =[
  {
    id:1,
    name:"Fortius Hospital",
    logo:"data:image/png;base64,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",
    Location:"Fortius cancer Institute Defence Colony",
    Rating:"5.0",
    Reviews:"1455 reviews"
  },
  {
    id:2,
    name:"Indraprastha Apollo Hospital",      
    logo:"data:image/png;base64,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",
    Location:"Fortius cancer Institute Defence Colony",
    Rating:"5.0",
    Reviews:"1455 reviews"
  },
  {
    id:3,
    name:"BLK Super Hospital",
    logo:"data:image/png;base64,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",
    Location:"Fortius cancer Institute Defence Colony",
    Rating:"5.0",
    Reviews:"1455 reviews"
  },
  {
    id:3,
    name:"Manipal Hospitals Dwarka",
    logo:"data:image/png;base64,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",
    Location:"Fortius cancer Institute Defence Colony",
    Rating:"5.0",
    Reviews:"1455 reviews"
  },
  {
    id:3,
    name:"IBS Institute of Brain and Spine",
    logo:"data:image/png;base64,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",
    Location:"Fortius cancer Institute Defence Colony",
    Rating:"5.0",
    Reviews:"1455 reviews"
  },
  {
    id:3,
    name:"Fortis Escorts Hospital",
    logo:"data:image/png;base64,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",
    Location:"Fortius cancer Institute Defence Colony",
    Rating:"5.0",
    Reviews:"1455 reviews"
  }
]
function HomePage() {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState(data);
  const [masterDataSource, setMasterDataSource] = useState(data)
  
  const navigation = useNavigation()


  const navigatepage = (e) =>{
    e.preventDefault();
    navigation.navigate("Hospage");
  }

  const item = ({item}) =>{
    return(
              <View style={{ flex: 1, backgroundColor: "white" ,marginBottom:5}}>
          <View style={home1.hospitalBox} >
      <View style={home1.logo} >
        <Image source={require('../../assets/logo1.png')}/>
                        </View>
      <View style={home1.details}>
        <Text style={home1.HospitalName} onPress={navigatepage}>{item.name}
        </Text>
        <Icon  style={home1.Fav}/>
          <Location style={home1.Location}/>
        <Text style={home1.HospitalAddress}>
          {item.Location}</Text>
        <Text style={home1.HospitalReview}> {item.Rating}      ({item.Reviews})</Text>
      </View>
    </View>
   </View>
    )
  }


  const searchName = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const user = useSelector(state=>state.currentUserreducer);
  console.log(user);
  return (
    <>
      <SafeAreaView style={home.droidSafeArea}>
        <KeyboardAvoidingView style={home.page}>
          {/*----------------------------------TOP BAR START---------------------------------------- */}
          <View style={home.topbar}>
            <Text style={home.profileName}>
              <Image
                source={require("../../assets/google.png")}
                style={home.ProfileImage}
              />{" "}
              {user.result.name}
            </Text>
            <DonorButton
              title="Become a donor"
              size="sm"
              backgroundColor="#007bff"
              onPress={() => {
                navigation.navigate("Second");
              }}
            />
          </View>
          {/* ------------------------------TOP BAR END------------------------------------------ */}
          <View style={home.body}>
            {/* <Text>Top bar</Text> */}
            <ScrollView style={home.scrollView}>
            <TextInput
            placeholder="Search Organ You Want?"
            style={home.textInputStyle}
            value={search}
            onChangeText={(text)=>{
              searchName(text);
            }}/>
            <Image style={home.icon} source={require("../../assets/search_icon.png")}/>
            <View style={{ flex: 0.1,marginBottom:15,marginTop:15}}>
              <Slider />
            </View>
            <Text style={home.heading}>List of nearest hospitals</Text>
              <Text
                style={{
                  color: "#7d7d7d",
                  marginLeft: "70%",
                  marginTop: "-3%",
                  fontSize: 14,
                }}
              >
                {" "}
                See all
              </Text>
              <View style={home.HospitalList}>
            <FlatList
            data={filteredDataSource}
            renderItem={item}
            keyExtractor={(item,index)=>index.toString()}/>
            </View>
            </ScrollView>
          </View>
          {/* --------------------------BODY ENDS HERE----------------------------------- */}
          <Footer/>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

export default HomePage;
const home = StyleSheet.create({
  icon:{
    height:30,
    width:30,
// borderWidth:2,
color:"gray",
position:"absolute",
top:18,
left:32
  },
  ProfileImage: {
    width: 40,
    height: 40,
    // paddingRight:40,
  },
  textInputStyle: {
    // height: 40,
    width: 368,
height: 45,
    borderWidth: 1,
    paddingLeft: 28,
    marginTop:10,
    marginLeft: 30,
    borderRadius:22,
    borderTopEndRadius:22,
    borderTopStartRadius:22,
    // borderBottomWidth:0,
    borderColor: 'white',
    backgroundColor: '#F9F9FF',
  },
  donorButtonContainer: {
    elevation: 8,
    width: 180,
    height: 50,
    backgroundColor: "#2AA05D",
    borderRadius: 100,
    marginTop: 15,
    // alignSelf:''
    paddingVertical: 13,
    // paddingHorizontal: 12,
  },  
  scrollView: {
    // backgroundColor: 'pink',
    marginHorizontal: 1,
  },
  donorButtonText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "400",
    alignSelf: "center",
    // marginBottom:10,
    // textTransform: "uppercase",
  },
  profileName: {
    marginLeft: 10,
    flex: 1,
  },
  topbar: {
    flex: 0.09,
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: "space-between",
    // backgroundColor:'red'
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  HospitalList: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    flex: 0.1,
    paddingLeft: 40,
    color: "#2AA05D",
    fontSize: 20,
    fontWeight: "600",
  },


  page: {
    flex: 1,
    marginTop: 5,
    // backgroundColor: "pink",
  },
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },

});
const home1=StyleSheet.create({
  HospitalReview: {
    transform: [{ translateX: 80 }],
  },

  HospitalAddress: {
    color: "#A8ABB3",
    fontSize: 14,
    width: 200,
    transform: [{ translateX: 24 }, { translateY: -24 }],
  },
  Location: {
    // display:''
    marginTop: -20,
    marginLeft: -5,
    transform: [{ scale: 0.9 }],
  },
  Fav: {
    transform: [{ translateX: 200 }, { translateY: -50 }, { scale: 0.6 }],
  },
  HospitalName: {
    color: "#7d7d7d",
    fontSize: 20,
    width: 150,
    height: 50,
    // flex:0.5,
    flexDirection: "row",
  },
  hospitalBox: {
    // flex:0.5,
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 10,
    marginLeft: 30,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

    width: "85%",
    height: 160,
  },
  details: {
    flex: 1,
    // backgroundColor:'purple',
    padding: 10,
    // flexWrap:'wrap',
    // flexDirection:'row'
  },
  logo: {
    flex: 0.4,
    // backgroundColor:'pink',
    // justifyContent:'center',
    paddingTop: 20,
    alignItems: "center",
  },
})
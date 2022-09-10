import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, Image,StyleSheet} from 'react-native';
import DropDownCard from '../Components/DropDownCard';
import BookImg from '../assets/images/book-icon.png';
import FlagImg from '../assets/images/flag-icon.png';
import Education from '../assets/images/degree.png';
import FeeImg from '../assets/images/fee-icon.png';
import DropdownComponent from '../Components/DropDownComponent';

export default function HomeScreen() {
  const data = {
    'Exam Fee': {
      INDIAN: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 400,
          },
        },
      },
      FOREIGN: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 100,
          },
        },
      },
      NRI: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 600,
          },
        },
      },
      SAARC: {
        ALL_COURSES: {
          ALL_LEVEL: {
            amount: 600,
          },
        },
      },
    },
    'Application Fee': {
      INDIAN: {
        ALL_COURSES: {
          UG: {
            amount: 200,
          },
          'UG-DIPLOMA': {
            amount: 300,
          },
          PG: {
            amount: 500,
          },
        },
      },
      FOREIGN: {
        ALL_COURSES: {
          UG: {
            amount: 400,
          },
          'UG-DIPLOMA': {
            amount: 400,
          },
          PG: {
            amount: 700,
          },
        },
      },
    },
  };
  const Courses = [
    {label: 'Ayurveda', value: 'Ayurveda'},
    {label: 'Dental', value: 'Dental'},
    {label: 'Medical', value: 'Medical'},
  ];
  const Levels = [
    {label: 'UG', value: 'UG'},
    {label: 'PG', value: 'PG'},
    {label: 'UG-DIPLOMA', value: 'UG-DIPLOMA'},
    {label: 'Ph.D', value: 'Ph.D'},
  ];

  //to create array which is suitable to pass item data to dropdown
  const makingArray = array => {
    let array1 = [];
    for (let i of array) {
      let arr = {};

      arr['label'] = i;
      arr['value'] = i;
      array1.push(arr);
    }
    console.log('array1 is', array1);
    return array1;
  };
  const [feeType, setFeeType] = useState();
  const [nation, setNation] = useState();
  const [course, setCourse] = useState();
  const [level, setLevel] = useState();
  const [feeTypes, setFeeTypes] = useState(makingArray(Object.keys(data)));
  const [nations, setNations] = useState();
  const [allCourses, setAllCourses] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [nationError, setNationError] = useState();
  const [levelError, setLevelError] = useState();
  const [fee, setFee] = useState();
  //to find fee on basis of type,nation,course,level
  const findFee = (feeType, nation, course, level) => {
    if (feeType && nation && level && course) {
      if (feeType === 'Application Fee') {
        if (
          (nation === 'INDIAN' || nation === 'FOREIGN') &&
          (level === 'UG' || level === 'PG' || level === 'UG-DIPLOMA')
        ) {
          setFee(data[feeType][nation]['ALL_COURSES'][level]['amount']);
        } else {
          if (!(nation === 'INDIAN' || nation === 'FOREIGN')) {
            setNationError('please select valid nation');
          } else {
            setLevelError('please select valid level');
          }
        }
      } else {
        setFee(data[feeType][nation]['ALL_COURSES']['ALL_LEVEL']['amount']);
      }
    }
  };

  //to find levels based on fee type and nation selected
  const Findlevels = (feeType, nation) => {
    if (feeType === 'Application Fee' && nation) {
      let levels = makingArray(
        Object.keys(data[feeType][nation]['ALL_COURSES']),
      );
      setAllLevels(levels);
    } else {
      setAllLevels(Levels);
    }
    setAllCourses(Courses);
  };
  useEffect(() => {
    Findlevels(feeType, nation);
    findFee(feeType, nation, course, level);
  }, [feeType, nation, course, level]);

  const onSelectFeeType = value => {
    console.log('value is', value);
    setFeeType(value);

    let nations = makingArray(Object.keys(data[value]));
    setNations(nations);
    if (value === 'Application Fee') {
      if (nation && !(nation === 'INDIAN' || nation === 'FOREIGN')) {
        setNation();
        setNationError('please select valid nation');
      }
      if (
        level &&
        !(level === 'UG' || level === 'PG' || level === 'UG-DIPLOMA')
      ) {
        setLevel();
        setLevelError('please select valid level');
      }
    }
  };

  const onSelectNation = value => {
    console.log('nation is', value);
    setNation(value);
    if (nationError) {
      setNationError();
    }
  };

  const onSelectAllLevel = value => {
    console.log('level is', value);
    setLevel(value);
    if (levelError) {
      setLevelError();
    }
  };
  const onSelectAllCourse = value => {
    console.log('course is', value);
    setCourse(value);
  };

  return (
    <SafeAreaView
      style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <DropDownCard
          image={FeeImg}
          title={'Fee Type'}
          backgroundColor={'#A7E9AF'}
          data={feeTypes}
          value={feeType}
          onChange={onSelectFeeType}
          placeholder={'Select Fee Type'}
        />
        
        <View>
        <DropDownCard
          image={FlagImg}
          title={'Nationality'}
          backgroundColor={'#F69E7B'}
          data={nations}
          value={nation}
          onChange={onSelectNation}
          placeholder={'Select Nation'}
        />
        {
            nationError?<Text style={styles.ErrorText}>{nationError}</Text>:null}
        
        </View>
      </View>
      <View style={styles.subContainer}>
        <DropDownCard
          image={Education}
          title={'Course'}
          backgroundColor={'#94B3FD'}
          data={allCourses}
          value={course}
          onChange={onSelectAllCourse}
          placeholder={'Select Course'}
        />
        <View>
        <DropDownCard
          image={BookImg}
          title={'Specification'}
          backgroundColor={'#ED8BCA'}
          data={allLevels}
          value={level}
          onChange={onSelectAllLevel}
          placeholder={'Select Level'}
        />
         {
            levelError?<Text style={styles.ErrorText}>{levelError}</Text>:null}
        </View>

      </View>

      {feeType && nation && course &&level ? (
      <View style={{marginVertical:20}}>
        <Text style={{fontWeight:'600'}}>FEES TO BE PAID : {fee}</Text>
      </View>
      ):null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    mainContainer:{
        margin: 10, alignItems: 'center', justifyContent: 'center'
    },
    subContainer:{
        flexDirection:'row'
    },
    ErrorText:{color:'red',fontSize:12,alignSelf:'center'}
 
})
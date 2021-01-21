import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';


import * as DocumentPicker from 'expo-document-picker';

const CraquagePage = (props) => {


    const [message, setMessage] = useState("");
    const [algo, setAlgo] = useState("md5")
    const [enableShift, setEnableShift] = useState(false)
    const [resultat, setResultat] = useState(null)
    const [file, setFile] = useState(null)





    let upload = async () => {


        fetch("http://332c23ccff7a.ngrok.io/craquage/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    algo
                })
            }).then(res => res.json()).then(data => {
                setResultat(data.resultat);
            })
    };













    //view 

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
            <View  style={{  paddingHorizontal : 10 , paddingVertical : 5 }}>

                <TextInput
                    style={styles.inputStyle}
                    label='Message'
                    value={message}
                    placeholder={'enter the message'}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMessage(text)}
                />



                <DropDownPicker
                    items={[
                        { label: 'MD5', value: 'md5' },
                        { label: 'SHA1', value: 'sha1' },
                        { label: 'SHA256', value: 'sha256' },
                        { label: 'SHA512', value: 'sha512' },
                        { label: 'MD5', value: 'md5' },
                    ]}
                    defaultValue={algo}
                    containerStyle={{ height: 40 }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => setAlgo(item.value)
                    }
                />



                <Button theme={{ colors: { primary: '#03a5fc' } }} style={styles.inputStyle} raised icon="check-circle-outline" mode="contained" onPress={() => upload()}>
                    Crack password
                 </Button>


                {resultat != null && resultat != "-1" ?
                    <View>
                        <Text style={{textAlign:'center', fontSize:14 , fontWeight: 'bold', color: 'red'}}>Bravo vous avez craqué le mot de passe : {resultat}</Text>
                        < TextInput
                            style={styles.inputStyle}
                            label='Cipher '
                            value={resultat}
                            placeholder={'hashed message'}
                            mode="outlined"
                            theme={{ colors: { primary: '#03a5fc' } }}
                            onChangeText={() => { }}
                        />
                    </View>
                    :
                    resultat != null && resultat == "-1" ?
                        <Text style={{textAlign:'center' , fontSize:14 , fontWeight: 'bold', paddingTop:10 ,color: 'red'}}>Password ne peut pas etre craqué</Text>
                        :
                        null
                }




            </View>

        </KeyboardAvoidingView>
    );

}


const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 5,
    },
    pop: {
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 10,

    },
    modalview: {

        position: 'absolute',
        bottom: 2,
        width: "100%",
        backgroundColor: '#ffffff',

    }

});

export default CraquagePage; 
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, FlatList, Text, Clipboard } from 'react-native';

import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-paper';

const DeCrypSym = (props) => {





    const [message, setMessage] = useState("");
    const [algo, setAlgo] = useState("AES");
    const [enableShift, setEnableShift] = useState(false);
    const [key, setKey] = useState("");
    const [resultat, setResultat] = useState("");
    






    const decryptMessage = () => {
        fetch("http://332c23ccff7a.ngrok.io/dechiffrement_sym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    algo: algo,
                    cle: key
                })
            }).then(res => res.json()).then(data => {
                setResultat(data.resultat);
               
            })
    }



    const findAlgo = () => {
        fetch("http://332c23ccff7a.ngrok.io/generation_cle_sym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message

                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                setAlgo(data)
            })
    }







    //view 

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
            <View style={{  paddingHorizontal : 10 , paddingVertical : 5 }}>

                <TextInput
                    style={styles.inputStyle}
                    label='Crypted message'
                    value={message}
                    placeholder={'enter the message'}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMessage(text)}
                />



                <TextInput
                    style={styles.inputStyle}
                    label='Algo'
                    value={algo}
                    placeholder={'the algo is '}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setAlgo(text)}
                />

                <TextInput
                    style={styles.inputStyle}
                    label='Key'
                    value={key}
                    placeholder={'enter your key '}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setKey(text)}
                />


                <Button theme={{ colors: { primary: '#03a5fc' } }} style={styles.inputStyle} raised icon="check-circle-outline" mode="contained" onPress={() =>  decryptMessage()}>
                    DeCrypt
                 </Button>


                {resultat ?
                    < TextInput
                        style={styles.inputStyle}
                        label='Message '
                        value={resultat}
                        placeholder={'Message en clair'}
                        mode="outlined"
                        theme={{ colors: { primary: '#03a5fc' } }}
                        onChangeText={text => { }}
                    />
                    : null}




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

    },

    mycard: {
        margin: 3,

    },
    CardView: {

        flexDirection: 'row',
        padding: 2,

    },
    text: {
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 10,
        right: 0,
        bottom: 0,
    },




});

export default DeCrypSym; 
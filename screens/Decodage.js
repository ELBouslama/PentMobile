import React, { useState } from 'react';
import { StyleSheet, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const Decodage = (props) => {

    const getDetails = (type) => {
        if (props.route.params) {
            switch (type) {
                case "name":
                    return props.route.params.name
                case "email":
                    return props.route.params.email
                case "tel":
                    return props.route.params.tel
                case "salary":
                    return props.route.params.salary
                case "position":
                    return props.route.params.position
                case "picture":
                    return props.route.params.picture
            }
        } else
            return "";

    }



    const [message, setMessage] = useState("");
    const [resultat, setResultat] = useState("")

    const [enableShift, setEnableShift] = useState(false)



    const submitData = () => {
        fetch("http://332c23ccff7a.ngrok.io/decodage/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   message
                })
            }).then(res => res.json()).then(data => {
                setResultat(data.resultat) ;
            })
    }









    //view 

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
            <View style={{ paddingHorizontal : 10 , paddingVertical : 5 }}>

                <TextInput
                    style={styles.inputStyle}
                    label='Message codé'
                    value={message}
                    placeholder={'enter the message to decode'}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMessage(text)}
                />



                <Button theme={{ colors: { primary: '#03a5fc' } }} style={styles.inputStyle} raised icon="check-circle-outline" mode="contained" onPress={() => submitData()}>
                    DeCode
            </Button>
       
                {resultat ? 
                    < TextInput
                style={styles.inputStyle}
                label='Message brut'
                value={resultat}
                placeholder={'message originale'}
                mode="outlined"
                theme={{ colors: { primary: '#03a5fc' } }}
                onChangeText={text => {}}
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

    }

});

export default Decodage; 
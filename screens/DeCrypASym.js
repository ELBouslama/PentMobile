import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView, FlatList, Text, Clipboard } from 'react-native';

import { TextInput, Button, } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import { Card } from 'react-native-paper';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const CrypASym = (props) => {





    const [message, setMessage] = useState("");
    const [mdp, setMdp] = useState("");
    const [algo, setAlgo] = useState("");
    const [enableShift, setEnableShift] = useState(false);
    const [key, setKey] = useState({ pk: "01", name: "key A", public: "aaaa", private: "bbbbb" });
    const [resultat, setResultat] = useState(null);
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState("decrypt")
    const [signature, setSig] = useState(null);
    var radio_props = [
        { label: 'Decrypt', value: "decrypt" },
        { label: 'verify', value: "verify" }
    ];


    const fetchData = () => {

        fetch("http://332c23ccff7a.ngrok.io/liste_cle_asym/"
        ).then((res) => res.json()).then((vals) => {

            setKeys(vals)
            setLoading(false)
        }).catch(err => {
            Alert.alert("something went wrong , try later");
        })

    }
    useEffect(() => {
        fetchData()
    }, [])




    const submitDeCryptData = () => {
        fetch("http://332c23ccff7a.ngrok.io/dechiffrement_asym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    private: key.private,
                    mdp: mdp

                })
            }).then(res => res.json()).then(data => {
                console.log("this is crypt option")
                setAlgo(data.algo);
                setResultat(data.resultat);

            })
    }

    const submitVerifyData = () => {
        fetch("http://332c23ccff7a.ngrok.io/verification_asym/",
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    signature: signature,
                    public: key.public

                })
            }).then(res => res.json()).then(data => {
                console.log(data);
                setAlgo(data.algo);
                setResultat(data.resultat);
                setLoading(false);
            })
    }





    const renderList = ((item) => {
        return (

            <Card style={styles.mycard} key={item.pk}

                onPress={async (data) => {
                    console.log(item)
                    Alert.alert("Key selected  !");
                    setKey(item);

                }}
            >
                <View style={item.public != key.public ? styles.CardView : [styles.CardView, { backgroundColor: '#ADD8E6' }]}>

                    <View style={{
                        marginLeft: 15,
                    }}>
                        <Text style={styles.text} >{item.name}</Text>
                    </View>

                </View>
            </Card>

        );

    });




    //view 

    return (
        <KeyboardAvoidingView behavior="position" style={styles.root} enabled={enableShift}>
            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>


                <TextInput
                    style={styles.inputStyle}
                    label='Message'
                    value={message}
                    placeholder={'enter the message'}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMessage(text)}
                />



                <TextInput
                    style={styles.inputStyle}
                    label='mot de passe'
                    value={mdp}
                    placeholder={'enter votre mot de passe'}
                    mode="outlined"
                    secureTextEntry={true}
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setMdp(text)}
                />




                {keys ?
                    <FlatList
                        style={{ marginTop: 20 }}
                        data={keys}
                        renderItem={({ item }) => {

                            return renderList(item);
                        }}
                        keyExtractor={item => item._id}
                        onRefresh={() => { fetchData() }}
                        refreshing={loading}
                        extraData={keys}
                    />
                    : null}

                <RadioForm
                    style={{ marginTop: 20 }}
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value) => { console.log(value); setCheck(value); }}
                />
                {check == "verify" ?
                    <TextInput
                        style={styles.inputStyle}
                        label='signature'
                        value={signature}
                        placeholder={'enter votre signature'}
                        mode="outlined"
                        theme={{ colors: { primary: '#03a5fc' } }}
                        onChangeText={text => setSig(text)}
                    />


                    : null

                }

                <TextInput
                    style={styles.inputStyle}
                    label='Algo'
                    value={algo}
                    placeholder={'Algo du hach'}
                    mode="outlined"
                    theme={{ colors: { primary: '#03a5fc' } }}
                    onChangeText={text => setAlgo(algo)}
                />


                <Button theme={{ colors: { primary: '#03a5fc' } }} style={styles.inputStyle} raised icon="check-circle-outline" mode="contained" onPress={() => { check == "decrypt" ? submitDeCryptData() : submitVerifyData() }}>
                    Send
                 </Button>




                {resultat ?
                    < TextInput
                        style={styles.inputStyle}
                        label='Cipher '
                        value={resultat}
                        placeholder={'hashed message'}
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

export default CrypASym; 